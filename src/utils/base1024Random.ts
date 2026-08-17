import anyBase from 'any-base';
import {BASE1024, BASE64} from './base1024.ts';
import seedrandom from 'seedrandom';

/**
 * 初始化
 * @param seed 种子
 */
export default function (seed:string){
    const sr=seedrandom(seed);
    function getRandomNumber(min:number,max:number){
        return Math.floor(sr() * (max - min + 1)) + min;
    }
    const BASE1024R:string=(()=>{
        let output:string=BASE1024;
        //let output:string[]=Array.from(BASE1024);
        //打乱次数
        const loopNum:number=getRandomNumber(10,200);
        for (let i=0;i<loopNum;i++){
            const start=getRandomNumber(0,output.length-1);
            const end=getRandomNumber(start+1,output.length);

            //提取的内容
            const ext=output.slice(start,end);
            //剩余的内容
            const rem=output.slice(0,start)+output.slice(end);
            /*let rem=output.slice(0,start);
            rem.push(...output.slice(end));*/

            output=rem+ext;
            /*output=ext;
            output.push(...rem);*/
        }
        //console.log('done');
        //console.log(output.length);
        return output;
        //return output.join('');
    })();
    //console.log(BASE1024R,BASE1024R.length);

    const base64ToBase1024R=anyBase(BASE64,BASE1024R);
    const base1024RToBase64=anyBase(BASE1024R,BASE64);

    return {base64ToBase1024R,base1024RToBase64};
}