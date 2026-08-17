import {onMounted, onUnmounted, ref, type Ref} from "vue";
import {sleep} from "@/utils/sleep.ts";
import seedrandom from 'seedrandom';
import dayjs from "dayjs";
import {isClient} from "@/ts/env/ssr.ts";

type Pos={x:number, y:number};

export default function (){
    const weAreUnitedContainer:Ref<HTMLCanvasElement|null>= ref(null);
    let isRun:boolean = false;

    onMounted(()=>{
        if (isClient)
            start().then();
        /*
        //test
        const sr=seedrandom('test');
        for (let i=0;i<50;i++){
            console.log('seedrandom test: ',sr());
        }
        console.log(Math.random());
        console.log(dayjs().format('YYYYMMDD'));
        */
    });
    onUnmounted(()=>{
        isRun = false;
    });

    //种子随机，以日期年月日为种子
    const sRandom0=seedrandom(dayjs().format('YYYYMMDD'));
    //种子随机，以日期年月日为种子。单独隔离，用于对不稳定因素随机，避免扰乱sRandom0
    const sRandom1=seedrandom(`${dayjs().format('YYYYMMDD')}-1`);
    async function start(){
        if (!isRun && weAreUnitedContainer.value) {
            isRun = true;
            const dpr = window.devicePixelRatio || 1;
            //console.log(dpr)
            weAreUnitedContainer.value.width=weAreUnitedContainer.value.offsetWidth * dpr;
            weAreUnitedContainer.value.height=weAreUnitedContainer.value.offsetHeight * dpr;

            const context:CanvasRenderingContext2D=weAreUnitedContainer.value.getContext('2d')!;
            const xmax=weAreUnitedContainer.value.width;//weAreUnitedContainer.value.offsetWidth;
            const ymax=weAreUnitedContainer.value.height;//weAreUnitedContainer.value.offsetHeight;
            const maxObjNum=(()=>{
                const min=60;
                const max=80;
                return Math.floor(sRandom0() * (max - min + 1)) + min;
            })();
            const allPos:Pos[] = [];
            const fontSize=(xmax/100)*dpr;

            context.fillStyle="rgba(220, 20, 60, 1)";
            context.font=`${fontSize}px Arial, Helvetica, sans-serif`;

            context.strokeStyle="rgba(0, 8, 125, .8)";
            context.lineWidth=xmax>1000?(1*dpr):(xmax/1000)*dpr;
            for (let num=0;num<maxObjNum && isRun;num++){
                const rx:number=Math.floor(sRandom0()*xmax);//采用种子随机，在一天内，每个对象的数量和位置都是一样的
                const ry:number=Math.floor(sRandom0()*ymax);

                context.fillText("Ⓐ",rx, ry);

                if(num!=0){
                    const targetPos:Pos=(()=>{
                        let tryNum=0;
                        //距离更近的目标
                        let tpCloser:Pos|null = null;
                        while (true){
                            const tp:Pos=allPos[Math.floor(sRandom1()*allPos.length)]!;//采用种子随机，但窗口大小不是固定值，所以对象之间的连线可能有差别
                            //x轴上与目标的距离
                            const xFar:number = Math.abs(tp.x-rx);
                            //y轴上与目标的距离
                            const yFar:number = Math.abs(tp.y-ry);
                            if (xFar>(xmax/10) || yFar>(ymax/10)){//条件成立则判断为距离过远
                                if (tryNum>allPos.length){
                                    if (tpCloser!=null)
                                        return tpCloser;
                                    else
                                        return tp;
                                }
                                else {
                                    if (tpCloser!=null){
                                        if(xFar+yFar<Math.abs(tpCloser.x-rx)+Math.abs(tpCloser.y-ry)){//尽可能寻找更小距离的目标。但无需绝对，所以采用随机寻找
                                            tpCloser=tp;
                                        }
                                    }
                                    else tpCloser=tp;
                                    tryNum++;
                                }
                            }else
                                return tp;
                        }
                    })();

                    context.beginPath();
                    context.moveTo(rx + fontSize / 2, ry - fontSize / 2);
                    context.lineTo(targetPos.x + fontSize / 2, targetPos.y - fontSize / 2);
                    context.stroke();
                }
                allPos.push({
                    x:rx,
                    y:ry,
                });

                await sleep(100);
            }
        }
    }

    return {
        weAreUnitedContainer,
    };
}