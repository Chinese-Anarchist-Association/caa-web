import {ref, type Ref} from "vue";

export default function (){
    const easterEgg:Ref<HTMLDivElement|null>=ref(null);
    const isReady:Ref<boolean>=ref(false);

    function easterEgg_click(){
        if (!isReady.value){
            isReady.value = true;
        }
    }

    return{
        easterEgg,easterEgg_click,isReady,
    };
}