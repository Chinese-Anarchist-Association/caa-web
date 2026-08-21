import {ref, type Ref} from "vue";
import router from "@/router";

export default function (){
    const easterEgg:Ref<HTMLDivElement|null>=ref(null);
    const isReady:Ref<boolean>=ref(false);

    function easterEgg_click(){
        if (!isReady.value){
            isReady.value = true;
        }else{
            router.push({name:'aParty'}).then();
        }
    }

    return{
        easterEgg,easterEgg_click,isReady,
    };
}