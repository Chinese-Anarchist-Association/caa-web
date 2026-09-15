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
                    wait: 500,
                    content: t(`${lp}.txt-1`),
                }
            },

            {
                caaChat:{
                    wait: 280,
                    content: t(`${lp}.q-1`),
                }
            },
            {
                userSend:{
                    opt:[
                        {
                            content:t(`${lp}.q-1-2`),
                            addShowKey:["q-1-2"]
                        },
                        {
                            content:t(`${lp}.q-1-3`),
                            addShowKey:["q-1-3"]
                        },
                        {
                            content:t(`${lp}.q-1-0`),
                            addShowKey:["q-1-0"]
                        },
                        {
                            content:t(`${lp}.q-1-1`),
                            addShowKey:["q-1-1"]
                        },
                    ]
                }
            },

            {
                caaChat:{
                    wait: 280,
                    content: t(`${lp}.q-2`),
                }
            },
            {
                userSend:{
                    opt:[
                        {
                            content:t(`${lp}.q-2-1`),
                            addShowKey:["q-2-1"]
                        },
                        {
                            content:t(`${lp}.q-2-2`),
                            addShowKey:["q-2-2"]
                        },
                        {
                            content:t(`${lp}.q-2-0`),
                            addShowKey:["q-2-0"]
                        },
                        {
                            content:t(`${lp}.q-2-3`),
                            addShowKey:["q-2-3"]
                        }
                    ]
                }
            },

            {
                caaChat:{
                    wait: 280,
                    content: t(`${lp}.q-3`),
                }
            },
            {
                userSend:{
                    opt:[
                        {
                            content:t(`${lp}.q-3-1`),
                            addShowKey:["q-3-1"]
                        },
                        {
                            content:t(`${lp}.q-3-2`),
                            addShowKey:["q-3-2"]
                        },
                        {
                            content:t(`${lp}.q-3-0`),
                            addShowKey:["q-3-0"]
                        },
                        {
                            content:t(`${lp}.q-3-3`),
                            addShowKey:["q-3-3"]
                        }
                    ]
                }
            },

            {
                caaChat:{
                    wait: 280,
                    content: t(`${lp}.q-4`),
                }
            },
            {
                userSend:{
                    opt:[
                        {
                            content:t(`${lp}.q-4-0`),
                            addShowKey:["q-4-0"]
                        },
                        {
                            content:t(`${lp}.q-4-2`),
                            addShowKey:["q-4-2"]
                        },
                        {
                            content:t(`${lp}.q-4-3`),
                            addShowKey:["q-4-3"]
                        },
                        {
                            content:t(`${lp}.q-4-1`),
                            addShowKey:["q-4-1"]
                        },
                    ]
                }
            },

            {
                caaChat:{
                    wait: 280,
                    content: t(`${lp}.q-5`),
                }
            },
            {
                userSend:{
                    opt:[
                        {
                            content:t(`${lp}.q-5-2`),
                            addShowKey:["q-5-2"]
                        },
                        {
                            content:t(`${lp}.q-5-0`),
                            addShowKey:["q-5-0"]
                        },
                        {
                            content:t(`${lp}.q-5-3`),
                            addShowKey:["q-5-3"]
                        },
                        {
                            content:t(`${lp}.q-5-1`),
                            addShowKey:["q-5-1"]
                        },
                    ]
                }
            },

            {
                caaChat:{
                    wait: 280,
                    content: t(`${lp}.q-6`),
                }
            },
            {
                userSend:{
                    opt:[
                        {
                            content:t(`${lp}.q-6-3`),
                            addShowKey:["q-6-3"]
                        },
                        {
                            content:t(`${lp}.q-6-1`),
                            addShowKey:["q-6-1"]
                        },
                        {
                            content:t(`${lp}.q-6-0`),
                            addShowKey:["q-6-0"]
                        },
                        {
                            content:t(`${lp}.q-6-2`),
                            addShowKey:["q-6-2"]
                        },
                    ]
                }
            },

            {
                caaChat:{
                    wait: 280,
                    content: t(`${lp}.q-7`),
                }
            },
            {
                userSend:{
                    opt:[
                        {
                            content:t(`${lp}.q-7-2`),
                            addShowKey:["q-7-2"]
                        },
                        {
                            content:t(`${lp}.q-7-1`),
                            addShowKey:["q-7-1"]
                        },
                        {
                            content:t(`${lp}.q-7-3`),
                            addShowKey:["q-7-3"]
                        },
                        {
                            content:t(`${lp}.q-7-0`),
                            addShowKey:["q-7-0"]
                        },
                    ]
                }
            },

            {
                caaChat:{
                    wait: 280,
                    content: t(`${lp}.q-8`),
                }
            },
            {
                userSend:{
                    opt:[
                        {
                            content:t(`${lp}.q-8-0`),
                            addShowKey:["q-8-0"]
                        },
                        {
                            content:t(`${lp}.q-8-3`),
                            addShowKey:["q-8-3"]
                        },
                        {
                            content:t(`${lp}.q-8-1`),
                            addShowKey:["q-8-1"]
                        },
                        {
                            content:t(`${lp}.q-8-2`),
                            addShowKey:["q-8-2"]
                        },
                    ]
                }
            },

            {
                caaChat:{
                    wait: 280,
                    content: t(`${lp}.q-9`),
                }
            },
            {
                userSend:{
                    opt:[
                        {
                            content:t(`${lp}.q-9-3`),
                            addShowKey:["q-9-3"]
                        },
                        {
                            content:t(`${lp}.q-9-1`),
                            addShowKey:["q-9-1"]
                        },
                        {
                            content:t(`${lp}.q-9-2`),
                            addShowKey:["q-9-2"]
                        },
                        {
                            content:t(`${lp}.q-9-0`),
                            addShowKey:["q-9-0"]
                        },
                    ]
                }
            },

            {
                caaChat:{
                    wait: 280,
                    content: t(`${lp}.q-10`),
                }
            },
            {
                userSend:{
                    opt:[
                        {
                            content:t(`${lp}.q-10-1`),
                            addShowKey:["q-10-1"]
                        },
                        {
                            content:t(`${lp}.q-10-3`),
                            addShowKey:["q-10-3"]
                        },
                        {
                            content:t(`${lp}.q-10-0`),
                            addShowKey:["q-10-0"]
                        },
                        {
                            content:t(`${lp}.q-10-2`),
                            addShowKey:["q-10-2"]
                        },
                    ]
                }
            },

            {
                caaChat:{
                    wait: 280,
                    content: t(`${lp}.q-11`),
                }
            },
            {
                userSend:{
                    opt:[
                        {
                            content:t(`${lp}.q-11-1`),
                            addShowKey:["q-11-1"]
                        },
                        {
                            content:t(`${lp}.q-11-0`),
                            addShowKey:["q-11-0"]
                        },
                        {
                            content:t(`${lp}.q-11-2`),
                            addShowKey:["q-11-2"]
                        },
                        {
                            content:t(`${lp}.q-11-3`),
                            addShowKey:["q-11-3"]
                        }
                    ]
                }
            },

            {
                caaChat:{
                    wait: 280,
                    content: t(`${lp}.q-12`),
                }
            },
            {
                userSend:{
                    opt:[
                        {
                            content:t(`${lp}.q-12-0`),
                            addShowKey:["q-12-0"]
                        },
                        {
                            content:t(`${lp}.q-12-1`),
                            addShowKey:["q-12-1"]
                        },
                        {
                            content:t(`${lp}.q-12-2`),
                            addShowKey:["q-12-2"]
                        },
                        {
                            content:t(`${lp}.q-12-3`),
                            addShowKey:["q-12-3"],
                        }
                    ]
                }
            },

            {
                caaChat:{
                    content: t(`${lp}.txt-2`),
                }
            },

            {
                userSend:{
                    showKey:{
                        showKeyAnd:[
                            "q-1-0","q-2-0","q-3-0","q-4-0","q-5-0","q-6-0","q-7-0","q-8-0","q-9-0","q-10-0","q-11-0","q-12-0"
                        ]
                    },
                    opt:[
                        {
                            content: t(`${lp}.yes`),
                            addShowKey: ["yes","r-0"]
                        },
                        {
                            content:t(`${lp}.no`),
                            addShowKey:["no"]
                        }
                    ]
                }
            },
            {
                userSend:{
                    showKey:{
                        showKeyAnd:[
                            "q-1-0","q-3-0","q-4-0","q-9-0"
                        ],
                        showKeyNot:[
                            "yes","no",
                            "q-2-2","q-2-3","q-5-2","q-5-3","q-6-2","q-6-3","q-7-2","q-7-3","q-8-2","q-8-3","q-10-2","q-10-3","q-11-2","q-11-3","q-12-2","q-12-3"
                        ]
                    },
                    opt:[
                        {
                            content: t(`${lp}.yes`),
                            addShowKey: ["yes","r-1"]
                        },
                        {
                            content:t(`${lp}.no`),
                            addShowKey:["no"]
                        }
                    ]
                }
            },
            {
                userSend:{
                    showKey:{
                        showKeyNot:[
                            "yes","no",
                            "q-1-2","q-1-3","q-2-3","q-3-2","q-3-3","q-4-2","q-4-3","q-5-2","q-5-3","q-6-2","q-6-3","q-7-3","q-8-2","q-8-3","q-9-3","q-10-3","q-11-3","q-12-3"
                        ]
                    },
                    opt:[
                        {
                            content: t(`${lp}.yes`),
                            addShowKey: ["yes","r-2"]
                        },
                        {
                            content:t(`${lp}.no`),
                            addShowKey:["no"]
                        }
                    ]
                }
            },
            {
                userSend:{
                    showKey:{
                        showKeyNot:[
                            "yes","no",
                            "q-1-3","q-2-3","q-3-3","q-4-3","q-5-3","q-6-3","q-7-3","q-10-3","q-11-3"
                        ]
                    },
                    opt:[
                        {
                            content: t(`${lp}.yes`),
                            addShowKey: ["yes","r-3"]
                        },
                        {
                            content:t(`${lp}.no`),
                            addShowKey:["no"]
                        }
                    ]
                }
            },
            {
                userSend:{
                    showKey:{
                        showKeyAnd: [
                            "q-1-3","q-2-3","q-3-3","q-4-3","q-5-3","q-6-3","q-7-3","q-8-3","q-9-3","q-10-3","q-11-3","q-12-3"
                        ],
                        showKeyNot:[
                            "yes","no",
                        ]
                    },
                    opt:[
                        {
                            content: t(`${lp}.yes`),
                            addShowKey: ["yes","r-5"]
                        },
                        {
                            content:t(`${lp}.no`),
                            addShowKey:["no"]
                        }
                    ]
                }
            },
            {
                userSend:{
                    showKey:{
                        showKeyOr:[
                            "q-1-3","q-2-3","q-3-3","q-4-3","q-5-3","q-6-3","q-7-3","q-8-3","q-9-3","q-10-3","q-11-3","q-12-3"
                        ],
                        showKeyNot:[
                            "yes","no",
                        ]
                    },
                    opt:[
                        {
                            content: t(`${lp}.yes`),
                            addShowKey: ["yes","r-4"]
                        },
                        {
                            content:t(`${lp}.no`),
                            addShowKey:["no"]
                        }
                    ]
                }
            },

            {
                caaChat:{
                    content: t(`${lp}.txt-3`),
                    showKey: {
                        showKeyAnd:["yes"]
                    }
                }
            },
            {
                caaChat:{
                    wait: 1500,
                    content: t(`${lp}.r-0`),
                    showKey: {
                        showKeyAnd:["yes","r-0"]
                    }
                }
            },
            {
                caaChat:{
                    wait: 1500,
                    content: t(`${lp}.r-1`),
                    showKey: {
                        showKeyAnd:["yes","r-1"]
                    }
                }
            },
            {
                caaChat:{
                    wait: 1500,
                    content: t(`${lp}.r-2`),
                    showKey: {
                        showKeyAnd:["yes","r-2"]
                    }
                }
            },
            {
                caaChat:{
                    wait: 1500,
                    content: t(`${lp}.r-3`),
                    showKey: {
                        showKeyAnd:["yes","r-3"]
                    }
                }
            },
            {
                caaChat:{
                    wait: 1500,
                    content: t(`${lp}.r-4`),
                    showKey: {
                        showKeyAnd:["yes","r-4"]
                    }
                }
            },
            {
                caaChat:{
                    wait: 1500,
                    content: t(`${lp}.r-5`),
                    showKey: {
                        showKeyAnd:["yes","r-5"]
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-4`),
                    showKey: {
                        showKeyAnd:["yes"]
                    }
                }
            },
            {
                caaChat:{
                    content: t(`${lp}.txt-5`),
                }
            },
        ];
    };

    return{
        getGcCfc,
    };
}