import type {ChatFlowContents} from "@/components/guidedChat/ts/gc.ts";

export default function (t:any, lp:string){
    const getGcCfc:()=>ChatFlowContents=()=>{
        return [
            {
                caaChat:{
                    content: t(`${lp}.txt-0`),
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-10`),
                    wait: 200,
                }
            },
            {
                userSend: {
                    opt: [
                        {
                            content: t(`${lp}.yes`),
                            addShowKey: ['3-0']
                        },
                        {
                            content: t(`${lp}.no`),
                            addShowKey: ['3-1']
                        }
                    ]
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-11`),
                    wait: 150,
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-1`),
                    wait: 500,
                }
            },
            {
                userSend: {
                    opt: [
                        {
                            content: t(`${lp}.yes`),
                            addShowKey: ['0-0']
                        },
                        {
                            content: t(`${lp}.no`),
                            addShowKey: ['0-1']
                        }
                    ]
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-2`),
                    wait: 200,
                }
            },
            {
                userSend: {
                    opt: [
                        {
                            content: t(`${lp}.txt-3`),
                            addShowKey: ['1-0']
                        },
                        {
                            content: t(`${lp}.txt-4`),
                            addShowKey: ['1-1']
                        }
                    ]
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-5`),
                    wait: 260,
                    showKey: {
                        showKeyAnd:['1-1']
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-6`),
                    wait: 200,
                }
            },
            {
                userSend: {
                    opt: [
                        {
                            content: t(`${lp}.txt-7`),
                            addShowKey: ['2-0']
                        },
                        {
                            content: t(`${lp}.txt-8`),
                            addShowKey: ['2-1']
                        }
                    ]
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-9`),
                    wait: 100,
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-12`),
                    wait: 300,
                    showKey: {
                        showKeyAnd: ['3-0']
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-13`),
                    wait: 200,
                    showKey: {
                        showKeyAnd: ['2-1'],
                        showKeyNot:['3-0'],
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-14`),
                    wait: 280,
                    showKey: {
                        showKeyAnd: ['2-1'],
                        showKeyNot:['3-0'],
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-15`),
                    wait: 800,
                    showKey: {
                        showKeyAnd: ['2-1'],
                        showKeyNot:['3-0'],
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-23`),
                    wait: 800,
                    showKey: {
                        showKeyAnd: ['2-1'],
                        showKeyNot:['3-0'],
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-16`),
                    wait: 260,
                    showKey: {
                        showKeyNot:['3-0'],
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-17`),
                    wait: 200,
                    showKey: {
                        showKeyNot:['3-0'],
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-21`),
                    wait: 200,
                    showKey: {
                        showKeyNot:['3-0'],
                    }
                }
            },
            {
                userSend: {
                    opt: [
                        {
                            content: t(`${lp}.yes`),
                            addShowKey: ['4-0']
                        },
                        {
                            content: t(`${lp}.no`),
                            addShowKey: ['4-1']
                        }
                    ],
                    showKey:{
                        showKeyNot:['3-0'],
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-18`),
                    wait: 260,
                    showKey: {
                        showKeyAnd: ['4-0'],
                        showKeyNot:['3-0'],
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-19`),
                    wait: 100,
                    showKey: {
                        showKeyAnd: ['4-0'],
                        showKeyNot:['3-0'],
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-22`),
                    wait: 100,
                    showKey: {
                        showKeyAnd: ['4-1'],
                        showKeyNot:['3-0'],
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-20`),
                    wait: 500,
                }
            }
        ];
    };

    return{
        getGcCfc,
    };
}