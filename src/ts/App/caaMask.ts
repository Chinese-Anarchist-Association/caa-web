import {shallowRef} from "vue";
import {useFavicon} from "@vueuse/core";
import {decryptUint8Array} from "@/utils/crypto.ts";
import defPw from "@/json/defPw.json";
import {loadGlobalLocale} from "@/utils/i18nUtils.ts";
import isTrueCaa from "@/ts/global/isTrueCaa.ts";
import {useCookies} from "@vueuse/integrations/useCookies";
import isUseCaaMask from "@/ts/env/isUseCaaMask.ts";

export default function (){
    const ChessAmateurAssociation:any=shallowRef(null);

    function isTrueCaa_trueDo() {
        import('@/glob/encImg.ts').then(mod=>{
            fetch(mod.default['/src/assets/img/logo/favicon.png.enc'] as string).then(res=>{
                res.text().then(rt=>{
                    useFavicon().value=URL.createObjectURL(
                        new Blob([
                            decryptUint8Array(rt,defPw.value) as BlobPart
                        ], { type: 'image/png' })
                    );
                });
            });
        });
        loadGlobalLocale();
    }

    isTrueCaa.value = (()=>{
        const ck:boolean|undefined=useCookies().get('itcaa');
        if (ck!=undefined || !(isUseCaaMask==='true')) {
            isTrueCaa_trueDo();
            return true;
        }
        else {
            //动态按需加载caa页面
            import("@/views/ChessAmateurAssociation/ChessAmateurAssociation.vue").then(mod=>{
                ChessAmateurAssociation.value=mod.default;
            });
            useFavicon().value='/ChessAmateurAssociation/favicon.png';
            return false;
        }
    })();
    function itcaaSwitchHandler(){
        useCookies().set('itcaa',true,{
            path: '/',
            maxAge: 60*60*24*365,
            secure: true,
            sameSite: 'strict',
        });
        isTrueCaa_trueDo();
        isTrueCaa.value=true;
    }

    return{
        ChessAmateurAssociation,
        itcaaSwitchHandler,
    };
}