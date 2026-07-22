import {isDev} from "@/ts/env/packMode.ts";

export default function () {
    if (isDev) {
        console.log('当前为开发模式');
        import('@/utils/vite-plugin-svg-icons/get_svg-icons-names').then(({get_ids}) => {
            console.debug("[main/shared.ts] 'vite-plugin-svg-icons'的所有svg图标id：", get_ids());
        });
    }
}