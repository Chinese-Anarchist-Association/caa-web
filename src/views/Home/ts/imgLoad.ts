import {onMounted, onUnmounted, ref, type Ref} from "vue";
import encImg from "@/glob/encImg.ts";
import {decryptUint8Array} from "@/utils/crypto.ts";
import defPw from "@/json/defPw.json";

export default function (){
    const allImgs:string[]=[
        encImg['/src/assets/img/logo/caa_transparentBackground.gif.enc'] as string,
        encImg['/src/assets/img/logo/caa_onlyIcon.png.enc'] as string,
        ...(()=>{
            const output:string[]=[];
            for (let i=1;i<=4;i++){
                output.push(encImg[`/src/assets/img/Home/photo-${i}.webp.enc`] as string);
            }
            return output;
        })(),
        encImg['/src/assets/img/Home/ngnm.png.enc'] as string,
    ]
    const imgsUrl:Ref<string[]>=ref(new Array(1).fill(''));
    onMounted(()=>{
        for (let i = 0; i < allImgs.length; i++){
            fetch(allImgs[i]!).then(res=>{
                if (res.ok) {
                    res.text().then(rt=>{
                        imgsUrl.value[i] = URL.createObjectURL(
                            new Blob([
                                decryptUint8Array(rt,defPw.value) as BlobPart
                            ])
                        );
                    });
                }
            });
        }
    });
    onUnmounted(()=>{
        imgsUrl.value.forEach(iurl=>{
            if (iurl){
                URL.revokeObjectURL(iurl);
            }
        });
    })

    return {imgsUrl};
}