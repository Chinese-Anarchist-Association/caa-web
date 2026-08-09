//处理作者数组并返回字符串
export default function (input:string[]):string{
    let output='';
    for(let i=0;i<input.length;i++){
        output+=input[i];
        if (i+1<input.length){
            output+=', ';
        }
    }
    return output;
}