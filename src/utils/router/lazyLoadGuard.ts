import {defineComponent, h, shallowRef, watch} from "vue";
import isTrueCaa from "@/ts/global/isTrueCaa.ts";

//懒加载守卫
function lazyLoadGuard(loader: () => Promise<{ default: any }>){
    return defineComponent({
        setup() {
            const comp = shallowRef<any>(null);

            async function load(){
                if (!(isTrueCaa.value===true)) {//当条件不成立时，不返回目标组件
                    comp.value = null;
                    return;
                }
                if (comp.value)
                    return;

                comp.value = (await loader()).default;
            }

            //初始加载一次
            load().then();

            //监听值的变化
            watch(isTrueCaa, load);

            return () => {
                if (comp.value)
                    return h(comp.value);
                else
                    return;
            }
        }
    });
}
export default lazyLoadGuard;