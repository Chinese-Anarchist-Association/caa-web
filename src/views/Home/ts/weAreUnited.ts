import {onMounted, onUnmounted, ref, type Ref} from "vue";
import {sleep} from "@/utils/sleep.ts";

type Pos={x:number, y:number};

export default function (){
    const weAreUnitedContainer:Ref<HTMLCanvasElement|null>= ref(null);
    let isRun:boolean = false;

    onMounted(()=>{
        start().then();
    });
    onUnmounted(()=>{
        isRun = false;
    });

    async function start(){
        if (!isRun && weAreUnitedContainer.value) {
            isRun = true;
            weAreUnitedContainer.value.width=weAreUnitedContainer.value.offsetWidth;
            weAreUnitedContainer.value.height=weAreUnitedContainer.value.offsetHeight;

            const context:CanvasRenderingContext2D=weAreUnitedContainer.value.getContext('2d')!;
            const xmax=weAreUnitedContainer.value.width;//weAreUnitedContainer.value.offsetWidth;
            const ymax=weAreUnitedContainer.value.height;//weAreUnitedContainer.value.offsetHeight;
            const maxObjNum=(()=>{
                const min=60;
                const max=80;
                return Math.floor(Math.random() * (max - min + 1)) + min;
            })();
            const allPos:Pos[] = [];
            const fontSize=xmax/100;

            context.fillStyle="rgba(220, 20, 60, 1)";
            context.font=`${fontSize}px Arial, Helvetica, sans-serif`;

            context.strokeStyle="rgba(0, 8, 125, .8)";
            context.lineWidth=xmax>1000?1:xmax/1000;
            for (let num=0;num<maxObjNum && isRun;num++){
                const rx:number=Math.floor(Math.random()*xmax);
                const ry:number=Math.floor(Math.random()*ymax);

                context.fillText("Ⓐ",rx, ry);

                if(num!=0){
                    const targetPos:Pos=(()=>{
                        let tryNum=0;
                        //距离更近的目标
                        let tpCloser:Pos|null = null;
                        while (true){
                            const tp:Pos=allPos[Math.floor(Math.random()*allPos.length)]!;
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