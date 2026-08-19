import anyBase, {DEC, HEX} from 'any-base';
import {BASE1024, /*BASE64*/} from './base1024.ts';
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
    /*const set = new Set(BASE1024);
    console.log('字符长度：', BASE1024.length);
    console.log('去重长度：', set.size);
    console.log('是否重复：', set.size !== BASE1024.length);
    console.log(BASE1024R,BASE1024R.length,BASE1024,BASE1024R.length);*/

    /*const smallB64ToB1024R=anyBase(BASE64,BASE1024R,{preserveLeading:true});
    const smallB1024RToB64=anyBase(BASE1024R,BASE64,{preserveLeading:true});

    const base64ToBase1024R:anyBase.Converter=(number:string)=>{
    }
    const base1024RToBase64:anyBase.Converter=(number:string)=>{
    }*/

    const smallB10ToB1024R=anyBase(DEC,BASE1024R/*,{}*/);
    const smallB1024RToB10=anyBase(BASE1024R,DEC/*,{}*/);
    const smallB16ToB1024R=anyBase(HEX,BASE1024R/*,{}*/);
    const smallB1024RToB16=anyBase(BASE1024R,HEX/*,{}*/);
    const base16ToBase1024R:anyBase.Converter=(number:string)=>{
        //十六进制，每五位分一组
        const hexGroup:string[]=[];
        //是否在末尾包含位数额外信息
        let haveExtra:boolean=false;
        {
            let hexTemp:string = '';
            for (let i = 0; i < number.length; i++) {//将十六进制字符串拆分为每五个一组
                hexTemp+=number.slice(i, i+1);
                if (hexTemp.length==5){
                    hexGroup.push(hexTemp);
                    hexTemp='';
                }
            }
            if (hexTemp!=''){
                hexGroup.push(hexTemp);
                hexGroup.push(hexTemp.length.toString());//附上最后一组数的位数
                haveExtra = true;
            }
        }
        let output:string='';
        for (let i=0;i<hexGroup.length;i++){
            const cv=smallB16ToB1024R(hexGroup[i]!);
            const op=
                (
                    cv.length==2
                    || (!(i+1<hexGroup.length) && haveExtra)//如果是最后一组，且包含额外数据，则不添加前导零
                )
                ?cv
                :cv.padStart(2,smallB10ToB1024R('0'))
            output+=op;
            //console.log(hexGroup[i]!,cv,op);
        }
        //console.log(number, output)
        return output;
    };
    const base1024RToBase16:anyBase.Converter=(number:string)=>{
        //一千零二十四进制，每两位分一组
        const b1024Group:string[]=[];
        //是否在末尾包含位数额外信息
        let haveExtra:boolean=false;
        {
            let b1024Temp:string = '';
            for (let i = 0; i < number.length; i++) {
                b1024Temp+=number.slice(i, i+1);
                if (b1024Temp.length==2){
                    b1024Group.push(b1024Temp);
                    b1024Temp='';
                }
            }
            if (b1024Temp!=''){//如果出现单个，则表示末尾有位数额外信息
                b1024Group.push(b1024Temp);
                haveExtra=true;
            }
        }
        let output:string = '';
        {
            const maxNum = haveExtra ? b1024Group.length - 1 : b1024Group.length
            for (let i = 0; i < maxNum; i++) {
                const cv = smallB1024RToB16(b1024Group[i]!);
                const op=(()=>{
                   if (!(i+1<maxNum) && haveExtra){//如果是最后一组数据且包含额外数据，则根据额外数据中的内容判断该组数据有多少位
                       return cv.padStart(Number(smallB1024RToB10(b1024Group[b1024Group.length-1]!)),'0');
                   }else{
                       return cv.length == 5 ? cv : cv.padStart(5, '0');
                   }
                })()
                output += op;
                //console.log(b1024Group[i], cv, op);
            }
        }
        //console.log(number, output)
        return output;
    };

    return {
        //base64ToBase1024R,base1024RToBase64
        base16ToBase1024R,base1024RToBase16,
    };
}