//来源：https://github.com/MJYY-MC/MJYY_Web/blob/78c9730faec30640b578aa56ae99ca67a69cc4f5/src/ts/env/ssr.ts
//当前是否在服务端渲染
export const ssr:boolean = import.meta.env.SSR;
//当前是否为客户端
export const isClient:boolean = !ssr;
//当前是否为服务端
export const isServer:boolean = ssr;