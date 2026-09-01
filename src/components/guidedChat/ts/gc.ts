import {ref, type Ref} from "vue";
import {sleep} from "@/utils/sleep.ts";
import {useCookies} from "@vueuse/integrations/useCookies";

export type ChatFlowContent_ShowKey={
    //当前数据拥有所有目标键时为真，该项为空时为真
    showKeyAnd?:string[];
    //当前数据拥有其中某个键时为真，该项为空时为真
    showKeyOr?:string[];
    //当前数据没有拥有其中某个键时为真
    showKeyNot?:string[];
}
export type ChatFlowContent={
    //输出聊天消息
    caaChat?:{
        //内容
        content:string;
        //输出前的等待时间，留空则默认为0
        wait?:number;

        //需要所有目标都为真时，才会执行当前聊天消息输出
        showKey?:ChatFlowContent_ShowKey;
    },
    userSend?:{
        opt:{
            //内容
            content:string;
            //用户使用该选项将获得的键
            addShowKey?:string[];
        }[],
        //需要所有目标都为真时，才会显示该用户发送选项
        showKey?:ChatFlowContent_ShowKey;
    }
};
export type ChatFlowContents=ChatFlowContent[];

export type GcCookieKey={
    name:string,
    path:string,
}
export type GcCookieData={
    cfh:number[],
    cfsk:string[],
}

export default function (isAlive:Ref<boolean>){
    //聊天流程的内容数据
    let chatFlowContents:ChatFlowContents;
    //聊天流程的键数据
    let chatFlowShowKey:string[];
    //聊天流程记录。数组长度代表当前索引进度，值为-1表示当前索引对应的不是用户可选项。用于重绘历史
    let chatFlowHistory:number[];
    //聊天流程数据是否已初始化
    let chatFlow_isInit:boolean=false;
    //是否包含没有绘制的历史记录，根据初始化时chatFlowHistory是否包含数据定义
    let chatFlow_haveHistory:number[]|null = null;

    //历史记录在cookie中的键名以及保存路径等数据
    let gcCookieKey:GcCookieKey;

    //初始化聊天流程数据
    function initChatFlow(cfc:ChatFlowContents,cck:GcCookieKey,cfsk:string[]=[],cfh:number[]=[]){
        chatFlowContents=cfc;
        chatFlowShowKey=cfsk;
        chatFlowHistory=cfh;
        if (cfh.length>0) chatFlow_haveHistory=cfh;
        gcCookieKey=cck;
        chatFlow_isInit=true;
    }

    const chat:Ref<HTMLDivElement|null>=ref(null);
    const send:Ref<HTMLDivElement|null>=ref(null);

    const autoOwbw_data:{
        elem:HTMLDivElement,
        content:string,
    }[]=[]
    let autoOwbw_isRunning:boolean=false;
    /**
     * 自动逐字输出，Auto Output word by word
     */
    function autoOwbw(){
        if (!autoOwbw_isRunning){
            autoOwbw_isRunning = true;
            (async ()=>{
                while (autoOwbw_data.length>0){
                    const ad = autoOwbw_data.shift();
                    if (ad){
                        for (let i=0;i<ad.content.length;i++){
                            ad.elem.textContent+=ad.content[i];
                            await sleep(10);

                            if (/*ad.elem.classList.contains('chat-content') &&*/ chat.value){
                                chat.value.scrollTop = chat.value.scrollHeight;
                            }
                        }
                    }
                }
                autoOwbw_isRunning = false;
            })();
        }
    }
    /**
     * 等待自动逐字输出完成
     */
    async function wait_autoOwbw(){
        while (autoOwbw_isRunning && isAlive.value) {
            await sleep(20);
        }
    }

    /**
     * 新增聊天内容
     * @param content 内容
     * @param cssClass css类，chat-content的子类
     */
    function addChatContent(content:string, cssClass:string){
        if (chat.value){
            const elem=document.createElement('div');
            elem.className = `chat-content ${cssClass}`;
            chat.value.appendChild(elem);
            //elem.innerText = content;
            autoOwbw_data.push({
                elem:elem,
                content:content,
            });
            autoOwbw();
        }
    }

    async function addSendContent(content:string[]){
        if(send.value){
            const elems:HTMLDivElement[]=[]
            for (let i=0;i<content.length;i++) {
                await wait_autoOwbw();

                elems.push(document.createElement('div'));
                elems[i]!.className = 'send-content dis';
                elems[i]!.onclick=(ev)=>{sendContent_click(ev, i);};
                send.value.appendChild(elems[i]!);
                autoOwbw_data.push({
                    elem:elems[i]!,
                    content:content[i]!,
                });
                autoOwbw();
            }
            await wait_autoOwbw();
            elems.forEach(elem=>{
                elem.classList.remove('dis');
            });
        }
    }


    /**
     * 推动流程
     * @param sendId 用户发送的消息id
     */
    async function flowPush(sendId:number){
        function saveCookie(){
            if (chatFlow_haveHistory==null)
                useCookies().set(
                    gcCookieKey.name,
                    JSON.stringify({
                        cfh: chatFlowHistory,
                        cfsk: chatFlowShowKey,
                    } as GcCookieData)
                    , {
                        path: gcCookieKey.path,
                        maxAge: 60 * 60 * 24 * 365,
                    });
        }
        function showKey_check(showKey:ChatFlowContent_ShowKey|undefined):boolean{
            if (showKey){//检查当前是否拥有目标的所有键
                let isHave=true;

                if (showKey.showKeyAnd && isHave) {
                    for (let sk of showKey.showKeyAnd) {
                        let isHave2 = false;
                        for (let cfsk of chatFlowShowKey) {
                            if (cfsk == sk) {
                                isHave2 = true;
                                break;
                            }
                        }
                        if (!isHave2) {
                            isHave = false;
                            break;
                        }
                    }
                }

                if (showKey.showKeyOr && isHave){
                    let isHave2=false;
                    for (let sk of showKey.showKeyOr){
                        for (let cfsk of chatFlowShowKey){
                            if (cfsk == sk) {
                                isHave2 = true;
                                break;
                            }
                        }
                    }
                    isHave=isHave2;
                }

                if (showKey.showKeyNot && isHave){
                    let isHave2=false;
                    for (let sk of showKey.showKeyNot){
                        for (let cfsk of chatFlowShowKey){
                            if (cfsk == sk) {
                                isHave2 = true;
                                break;
                            }
                        }
                    }
                    isHave=!isHave2;
                }

                return isHave;
            }else return true;
        }
        if (chatFlow_haveHistory!=null) chatFlowHistory=[];//清空重绘
        if (chatFlow_haveHistory==null){
            const cuCfc = chatFlowContents[chatFlowHistory.length];
            if (cuCfc && cuCfc.userSend) {
                const canShow:boolean=showKey_check(cuCfc.userSend.showKey);
                if (canShow) {
                    const sid = cuCfc.userSend.opt[sendId]!.addShowKey;
                    if (sid) {
                        chatFlowShowKey.push(...sid);
                    }
                    chatFlowHistory.push(sendId);
                    saveCookie();
                }
            }
        }
        let over=false;
        while (!over) {
            const cuCfc = chatFlowContents[chatFlowHistory.length];
            if (cuCfc) {
                if (cuCfc.caaChat) {
                    const canShow:boolean=showKey_check(cuCfc.caaChat.showKey);
                    if (canShow) {
                        if (chatFlow_haveHistory==null) {
                            if (cuCfc.caaChat.wait && cuCfc.caaChat.wait != 0) {
                                await wait_autoOwbw();
                                await sleep(cuCfc.caaChat.wait);
                            }
                        }
                        addChatContent(cuCfc.caaChat.content, 'caa');
                    }
                    chatFlowHistory.push(-1);
                    saveCookie();
                } else if (cuCfc.userSend) {
                    const canShow:boolean=showKey_check(cuCfc.userSend.showKey);
                    if (canShow) {
                        if (chatFlow_haveHistory == null) {
                            const usContent: string[] = [];
                            cuCfc.userSend.opt.forEach(us => {
                                usContent.push(us.content);
                            });
                            addSendContent(usContent).then();

                            over = true;
                        } else {
                            addChatContent(cuCfc.userSend.opt[chatFlow_haveHistory[chatFlowHistory.length]!]!.content, 'user');

                            chatFlowHistory.push(chatFlow_haveHistory[chatFlowHistory.length]!);
                            //saveCookie();
                        }
                    }else{
                        chatFlowHistory.push(-1);
                    }
                }else {
                    chatFlowHistory.push(-1);
                    saveCookie();
                }
            }else over = true;

            if (chatFlow_haveHistory!=null){
                if (chatFlowHistory.length==chatFlow_haveHistory.length)
                    chatFlow_haveHistory=null;
            }
        }

    }

    function sendContent_click(e:PointerEvent,id:number){
        //console.log(id)
        const elem:HTMLDivElement=e.target as HTMLDivElement;
        addChatContent(elem.innerText,'user');
        send.value!.replaceChildren();

        flowPush(id).then();
    }

    async function start(initOutputString:string[]){
        addChatContent(initOutputString[0]!,'sys');
        addChatContent(initOutputString[1]!,'sys');
        addChatContent(initOutputString[2]!,'sys');
        while (!chatFlow_isInit && isAlive.value){
            await sleep(500);
            //console.log('test')
        }
        addChatContent(initOutputString[3]!,'sys');
        if (chatFlow_haveHistory==null)
            addSendContent([initOutputString[4]!]).then();
        else {
            addChatContent(initOutputString[5]!,'sys');
            flowPush(-1).then();
        }
    }

    function getCookie(key:GcCookieKey){
        const c:GcCookieData/*string*/|undefined = useCookies().get(key.name);
        //console.log(c);
        return c;
        /*if (c)
            return JSON.parse(c) as GcCookieData;
        else
            return undefined;
         */
    }

    return{
        chat, send,
        start,
        initChatFlow,
        getCookie,
    }
}