import readline from 'readline';

/*const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('i: ', (answer) => {
    console.log('o: ', answer);
    rl.close();
});*/

let baseNum=0;
let baseStr='';

const input0= readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
input0.question('需要扩展到多少个：',(baseNumIpt)=>{
    baseNum = Number(baseNumIpt);
    input0.close();
    const input1=readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    input1.question('原内容（可选）：',(baseStrIpt)=>{
        baseStr=baseStrIpt;
        input1.close();

        //console.log(baseStr,baseNum)

        {
            const baseChars = Array.from(baseStr);
            const bcUsed = new Set(baseChars);

            for (let charCode = 0x4e00; charCode <= 0x9fff && baseChars.length < baseNum; charCode++) {
                const char = String.fromCharCode(charCode);
                if (!bcUsed.has(char)) {
                    bcUsed.add(char);
                    baseChars.push(char);
                }
            }

            const result = baseChars.join("");

            console.log("总长度：", result.length);
            console.log(result);
        }
    });
});