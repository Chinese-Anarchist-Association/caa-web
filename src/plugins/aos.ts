//来源：https://github.com/MJYY-MC/MJYY_Web/blob/78c9730faec30640b578aa56ae99ca67a69cc4f5/src/views/Home/plugin/aos.ts
import {onMounted} from "vue";
import AOS from 'aos';

export default function (){
    onMounted(() => {
        AOS.init({
            duration: 800,
            delay: 200,
            once: true,
        });
    });
}