import {ref, type Ref} from "vue";
import {sleep} from "@/utils/sleep.ts";
import {type ChatCompletionMessageParam, CreateMLCEngine, MLCEngine} from "@mlc-ai/web-llm";
import {isDev} from "@/ts/env/packMode.ts";

export type ContentCssClass='sys'|'ai'|'user';
export type ChatOutputData={
    content:string,
    cssClass:ContentCssClass,
}
export default function (
    chat:Ref<HTMLDivElement|null>,
    isAlive:Ref<boolean>,
    outputString:string[],
){
    let aiEngine:MLCEngine|null=null;
    //是否禁用发送
    const isDisSend:Ref<boolean>=ref(false);
    //主流程是否将用户发送禁用
    let callDisSend_main:boolean=false;
    function disSendUpdate(){
        isDisSend.value=(callDisSend_main||callDisSend_autoOwbw||callDisSend_manualOwbw);
    }

    const autoOwbw_data:{
        elem:HTMLDivElement,
        content:string,
    }[]=[]
    let autoOwbw_isRunning:boolean=false;
    //自动逐字输出是否将用户发送禁用
    let callDisSend_autoOwbw:boolean=false;
    /**
     * 自动逐字输出，Auto Output word by word
     */
    function autoOwbw(){
        if (!autoOwbw_isRunning){
            autoOwbw_isRunning = true;

            callDisSend_autoOwbw=true;
            disSendUpdate();

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

                callDisSend_autoOwbw=false;
                disSendUpdate();
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
    let manualOwbw_elem:HTMLDivElement|null=null;
    //手动逐字输出在活动期间是否将用户发送禁用
    let callDisSend_manualOwbw:boolean=false;
    /**
     * 手动逐字输出，Manual Output word by word
     */
    function manualOwbw(content:string){
        if (manualOwbw_elem) {
            manualOwbw_elem.textContent += content;
            if (chat.value){
                chat.value.scrollTop = chat.value.scrollHeight;
            }
        }
    }
    async function manualOwbw_start(cssClass:ContentCssClass){
        if (chat.value) {
            callDisSend_manualOwbw=true;
            disSendUpdate();

            if (autoOwbw_isRunning) await wait_autoOwbw();
            manualOwbw_elem = document.createElement('div');
            manualOwbw_elem.className = `chat-content ${cssClass}`;
            chat.value.appendChild(manualOwbw_elem);
        }
    }
    function manualOwbw_done(){
        manualOwbw_elem=null;

        callDisSend_manualOwbw=false;
        disSendUpdate();
    }


    function chatOutput(cod:ChatOutputData){
        if (chat.value){
            const elem=document.createElement('div');
            elem.className = `chat-content ${cod.cssClass}`;
            chat.value.appendChild(elem);
            //elem.innerText = content;
            autoOwbw_data.push({
                elem:elem,
                content:cod.content,
            });
            autoOwbw();
        }
    }


    async function start(){
        for (let i=0;i<=2;i++)
            chatOutput({content:outputString[i]!,cssClass:'sys'});
    }

    const aiMessages: ChatCompletionMessageParam[]=[
        { role: "system", content: "你是一个AI，回答用户的问题" },
    ];
    async function send(content:string){
        chatOutput({content:content,cssClass:'user'});
        if (aiEngine!=null){
            aiMessages.push({role:"user",content:content});
            const chunks = await aiEngine.chat.completions.create({
                messages: aiMessages,
                stream: true,
            });
            await manualOwbw_start('ai');
            let allMsg:string='';
            for await (const chunk of chunks) {
                const delta = chunk.choices[0]?.delta?.content ?? "";
                manualOwbw(delta);
                allMsg+=delta;
            }
            aiMessages.push({role:"assistant",content:allMsg});
            manualOwbw_done();
        }else{
            if (content=='y'){
                callDisSend_main=true;
                disSendUpdate();

                try {
                    chatOutput({content:outputString[3]!,cssClass:'sys'});
                    aiEngine = await CreateMLCEngine("Llama-3.2-1B-Instruct-q4f32_1-MLC", {
                        initProgressCallback: (progress) => {
                            if (isDev)
                                console.debug("模型加载进度：", progress);
                            chatOutput({content: progress.text, cssClass: 'sys'});
                        },
                    });
                }catch (e){
                    if (isDev) console.error(e);
                    chatOutput({content:outputString[4]!,cssClass:'sys'});
                }

                callDisSend_main=false;
                disSendUpdate();
            }else{
                chatOutput({content:outputString[2]!,cssClass:'sys'});
            }
        }
    }
    return {
        chatOutput,
        wait_autoOwbw,
        start,
        send,
        isDisSend,
    };
}