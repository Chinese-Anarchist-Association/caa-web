import {onMounted, onUnmounted, ref, type Ref} from "vue";
import {sleep} from "@/utils/sleep.ts";

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
            const allPos:{x:number, y:number}[] = [];
            const fontSize=xmax/100;

            context.fillStyle="rgba(220, 20, 60, 1)";
            context.font=`${fontSize}px Arial, Helvetica, sans-serif`;

            context.strokeStyle="rgba(0, 8, 125, .8)";
            context.lineWidth=0.5;
            for (let num=0;num<50 && isRun;num++){
                const rx:number=Math.floor(Math.random()*xmax);
                const ry:number=Math.floor(Math.random()*ymax);


                context.fillText("Ⓐ",rx, ry);

                if(num!=0){
                    const rIndex=Math.floor(Math.random()*allPos.length);

                    context.beginPath();
                    context.moveTo(rx+fontSize/2, ry-fontSize/2);
                    context.lineTo(allPos[rIndex]!.x+fontSize/2, allPos[rIndex]!.y-fontSize/2);
                    context.stroke();
                }
                allPos.push({
                    x:rx,
                    y:ry,
                });

                console.log('test',rx,ry)
                await sleep(100);
            }
        }
    }

    return {
        weAreUnitedContainer,
    };
}