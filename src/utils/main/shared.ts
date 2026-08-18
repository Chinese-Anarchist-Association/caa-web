import {isDev} from "@/ts/env/packMode.ts";

export default function () {
    if (isDev) {
        console.log('当前为开发模式');
    }
}