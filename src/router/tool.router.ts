import type { RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/tool',
        name: 'toolView',
        component: () => import('@/views/ToolView/ToolView.vue'),
        children:[
            {
                path: '',
                component: () => import('@/views/ToolView/ToolView.vue'),
            },
            {
                path: 'baseconversion',
                name: 'tool_baseConversion',
                component: () => import('@/views/tools/BaseConversion/BaseConversion.vue'),
                meta: {
                    toolId:'baseConversion',
                },
            },
            {
                path: 'textandbaseconvert',
                name: 'tool_stringAndBaseConversion',
                component:() => import('@/views/tools/StringAndBaseConversion/StringAndBaseConversion.vue'),
                meta: {
                    toolId: 'stringAndBaseConversion',
                }
            },
            {
                path: 'qrcode',
                name: 'tool_qrcode',
                component: () => import('@/views/tools/QRCode/QRCode.vue'),
                meta: {
                    toolId:'qrcode',
                },
                children:[
                    {
                        path:'create',
                        name:'tool_qrcode_create',
                        component:()=>import('@/views/tools/QRCode/component/createQRCode.vue'),
                    },
                    {
                        path:'parse',
                        name:'tool_qrcode_parse',
                        component:()=>import('@/views/tools/QRCode/component/parseQRCode.vue'),
                    },
                    {
                        path: 'scanparse',
                        name: 'tool_qrcode_scanparse',
                        component: () => import('@/views/tools/QRCode/component/scanParseQRCode/scanParseQRCode.vue'),
                    },
                ]
            },
            {
                path: 'markdownpane',
                name: 'tool_markdown-pane',
                component: () => import('@/views/tools/markdownPane/markdownPane.vue'),
                meta: {
                    toolId:'markdownPane',
                }
            },
            {
                path: 'colorpicker',
                name: 'tool_color-picker',
                component: () => import('@/views/tools/colorPicker/colorPicker.vue'),
                meta: {
                    toolId:'colorPicker',
                }
            }
        ],
    },
] as RouteRecordRaw[];