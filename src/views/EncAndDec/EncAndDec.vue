<script setup lang="ts">
import { ref } from 'vue';
import { encryptUint8Array, decryptUint8Array } from '@/utils/crypto.ts';
import defPw from '@/json/defPw.json';

//region 加密
const encPassword = ref('');
let encFileData: Uint8Array | null = null;
let encFileName:string ='';

function handleEncryptFile(event: Event) {
  const elem = event.target as HTMLInputElement;
  const file = elem.files?.[0];
  if (!file) return;
  encFileName = file.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    const buffer = e.target?.result as ArrayBuffer;
    encFileData = new Uint8Array(buffer);
  };
  reader.readAsArrayBuffer(file);
}

function encryptFile() {
  if (!encFileData) {
    alert('未选择待加密文件');
    return;
  }
  const password = encPassword.value.trim() || defPw.value;
  try {
    const encryptedBase64 = encryptUint8Array(encFileData, password);
    const url = URL.createObjectURL(
        //将base64结果保存为文本文件
        new Blob([encryptedBase64], { type: 'text/plain;charset=utf-8' })
    );
    //创建临时a元素触发下载
    const a = document.createElement('a');
    a.href = url;
    a.download = `${encFileName}.enc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);//释放
  } catch (err) {
    alert('加密失败：' + (err as Error).message);
  }
}
//endregion
//region 解密
const decPassword = ref('');
let decFileData: string | null = null;
let decFileName:string ='';

function handleDecryptFile(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  decFileName = file.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    decFileData = e.target?.result as string;
  };
  reader.readAsText(file, 'utf-8');
}

function decryptFile() {
  if (!decFileData) {
    alert('未选择待解密文件');
    return;
  }
  const password = decPassword.value.trim() || defPw.value;
  try {
    const decryptedData = decryptUint8Array(decFileData, password);
    const url = URL.createObjectURL(
        //保存为原始文件
        new Blob([decryptedData as BlobPart])
    );
    //临时创建触发下载
    const a = document.createElement('a');
    a.href = url;
    a.download = (()=>{
      const tg='.enc';
      if (decFileName.endsWith(tg))
        return decFileName.slice(0,-tg.length);
      else
        return decFileName;
    })();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);//释放
  } catch (err) {
    alert('解密失败：' + (err as Error).message);
  }
}
//endregion
</script>

<template>
  <div>
    <h2>文件加密</h2>
    <div>
      <label>选择待加密文件：</label>
      <input type="file" @change="handleEncryptFile" />
    </div>
    <div>
      <label>密码：</label>
      <input v-model="encPassword" placeholder="留空将使用默认密码" type="text" />
    </div>
    <button @click="encryptFile">加密并下载</button>
    <hr />
    <h2>文件解密</h2>
    <div>
      <label>选择待解密文件：</label>
      <input type="file" @change="handleDecryptFile" accept=".enc,text/plain" />
    </div>
    <div>
      <label>密码：</label>
      <input v-model="decPassword" placeholder="留空将使用默认密码" type="text" />
    </div>
    <button @click="decryptFile">解密并下载</button>
  </div>
</template>

<style scoped lang="scss">

</style>