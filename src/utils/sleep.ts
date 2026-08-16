//来源：https://github.com/MJYY-MC/mjyy-web-old/blob/93d4a635b3e9d050058548de37d66cd46e5372ed/src/ts/global/sleep.ts
export function sleep(interval:number) {
    return new Promise((resolve) => {
        setTimeout(resolve, interval);
    });
}