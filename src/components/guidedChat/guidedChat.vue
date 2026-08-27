<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {onMounted, ref, type Ref} from "vue";
import {isClient} from "@/ts/env/ssr.ts";
import {sleep} from "@/utils/sleep.ts";

const {lt:t}=autoUseI18n();

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
  while (autoOwbw_isRunning) {
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

function sendContent_click(e:PointerEvent,id:number){
  //console.log(id)
  const elem:HTMLDivElement=e.target as HTMLDivElement;
  addChatContent(elem.innerText,'user');
  send.value!.replaceChildren();
}

onMounted(()=>{
  if (isClient){
    addChatContent(t('txt-0'),'sys');
    addChatContent(t('txt-1'),'sys');
    addSendContent(['开始对话']);
  }
});
</script>

<template>
<div id="guidedChat">
  <div id="chat" ref="chat">
    <!--<div class="chat-content sys">{{t('txt-0')}}</div>
    <div class="chat-content sys">{{t('txt-1')}}</div>-->
  </div>
  <div id="send" ref="send">
    <!--<div class="send-content">test</div>
    <div class="send-content">test2</div>-->
  </div>
</div>
</template>

<style scoped lang="scss" src="./scss/gc.scss"/>

<i18n>
{
  "zh-CN": {
    "txt-0": "欢迎使用CAA引导式交流终端。",
    "txt-1": "我们的交谈将全程匿名，不会记录你的任何信息。",
    "txt-2": "开始对话"
  }
}
</i18n>