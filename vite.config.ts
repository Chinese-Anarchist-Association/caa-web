import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import { createHtmlPlugin } from 'vite-plugin-html';
import {isDev,isProd,mode} from "./src/ts/env/packMode.node.ts";
import renderMode from "./src/ts/env/renderMode.node.ts";
//import baseUrl from "./src/ts/env/baseUrl.node.ts";
import {baseUrl_get} from "./src/ts/env/baseUrl.node.ts";
import {md_libraryDocs_get} from "./src/ts/env/moduleDisable.node.ts";
//import postcssPrefixwrap from 'postcss-prefixwrap';
import resolveAlias from './ts/vite/resolveAlias.node.ts';
import jsObfuscator from 'vite-plugin-javascript-obfuscator';

const env = loadEnv(mode as string, process.cwd());
const distPath=path.resolve(__dirname, 'dist');

const ra={
    '@': path.resolve(__dirname, 'src'),
    ...resolveAlias(env,__dirname),
}
console.log(ra);

// https://vite.dev/config/
export default defineConfig(({}) =>{
    console.log(`当前模式：${mode}\nisDev: ${isDev}\nisProd: ${isProd}`);
    console.log(`当前渲染模式：${renderMode}`);
    console.log(`当前基路径：${baseUrl_get(env)/*baseUrl*/}`);

    console.log(`当前模块禁用情况（为true则表示被禁用）：`);
    console.log(`libraryDocs: ${md_libraryDocs_get(env)}`);
return {
    //base: './',//使用相对路径
    base: baseUrl_get(env),//baseUrl,
    plugins: [
        vue(),
        VueI18nPlugin({
            include: [path.resolve(__dirname, 'src/locales/**/*')],

            runtimeOnly: true,//只打包运行时，体积减小
            compositionOnly: true,//只使用Composition API，体积减小

            defaultSFCLang: 'json',//块中的默认语言
            globalSFCScope: false,//块默认是局部的

            exclude: ['*.d.ts', '*.ts', '*.js'], //只用JSON，排除脚本
        }),
        createSvgIconsPlugin({
            iconDirs: [
                path.resolve(__dirname, 'src/assets/_svg'),
            ],
            symbolId: 'svg-[dir]-[name]',
            customDomId: '__svg__icons__dom__',
            //使用示例：<svg class="bi" width="16" height="16"><use xlink:href="#bi-check2"></use></svg>
        }),
        createHtmlPlugin({
            minify: true,
        }),

        isProd && jsObfuscator(//生产环境构建时混淆
            {
                //要混淆的文件
                include: [
                    'src/locales/*.json',
                    'src/views/Library/json/**/*.json',
                    'src/views/**/*.vue',
                    'src/views/**/*.ts',
                    'src/components/**/*.vue',
                    'src/components/**/*.ts',
                    'src/ts/global/*.ts',
                    'src/ts/env/*.ts',
                    'src/json/**/*.json'
                ],
                //排除的文件
                exclude: [
                    'node_modules',
                    '.vite-ssg-temp',
                ],
                //打印匹配或排除文件的路径
                debugger: isProd,
                options: {
                    //代码压缩
                    compact: true,

                    //控制流扁平化，把if/else/for变成switch-case死循环
                    controlFlowFlattening: true,
                    //对多少代码启用
                    controlFlowFlatteningThreshold: 0.9,

                    //死代码注入，插入永远不会执行的垃圾代码
                    deadCodeInjection: true,
                    //插入多少的垃圾代码
                    deadCodeInjectionThreshold: 0.5,

                    //反调试，在DevTools打开时卡死或报错
                    //debugProtection: true, //开启时ssg预渲染会出现卡死
                    //每2秒检测一次调试器
                    //debugProtectionInterval: 2000,

                    //禁用console
                    //会导致构建时不输出报错与警告
                    //disableConsoleOutput: true,

                    //标识符（变量名）生成方式为十六进制乱码
                    identifierNamesGenerator: 'hexadecimal',

                    //保留字符串，包含的内容不会被提取到字符串数组
                    //以避免动态导入失败等问题
                    reservedStrings:[
                        'vue-pdf-embed',
                    ],
                    //把所有字符串提取到字符串数组里，通过索引调用
                    stringArray: true,
                    stringArrayEncoding: ['base64', 'rc4'],//双重编码
                    stringArrayThreshold: 1,
                    //对字符串数组索引做偏移计算
                    stringArrayIndexShift: true,
                    //打乱数组顺序
                    rotateStringArray: true,
                    //每次运行时随机打乱字符串数组顺序
                    shuffleStringArray: true,
                    //字符串数组包装器层数，多层嵌套以增加追踪难度
                    stringArrayWrappersCount: 4,
                    //为包装器使用链式调用
                    stringArrayWrappersChainedCalls: true,

                    //代码一旦被格式化（Prettier/Beautify）就自动报错，自我防御
                    //selfDefending: true, //开启时ssg预渲染会出现卡死

                    //关闭简化，否则某些混淆选项会被优化掉
                    simplify: false,

                    //Unicode转义
                    unicodeEscapeSequence: true,

                    //将数字字面量转换为表达式
                    numbersToExpressions: true,

                    //将长字符串拆分为多个短字符串后再拼接
                    splitStrings: false,
                    //字符串拆分成每块的长度
                    splitStringsChunkLength: 6,

                    //不生成map
                    sourceMap: false,

                    //运行环境为浏览器
                    target: 'browser',

                    //日志输出
                    log: true,//isProd,
                },
            }
        ),
    ],
    build: {
        //仅在开发模式下生成map
        sourcemap: isDev,
    },
    resolve: {
        alias: ra,
    },
    css: {
        preprocessorOptions: {
            scss: {
                //静默警告，避免bootstrap报一大堆警告
                quietDeps: true,//静默所有依赖警告
                silenceDeprecations: [
                    'import',//静默@import的警告
                    'color-functions',//静默red()/blue()的警告
                    'global-builtin',//静默mix()等函数的警告
                    'if-function',//静默if()的警告
                ]
            }
        },
        /*postcss: {
            plugins: [
                postcssPrefixwrap(

                ),
            ],
        },*/
    },
    ssgOptions: renderMode=='ssg' ? {
        onFinished() {
            {
                const targetPath=path.join(distPath, '.vite');
                if (fs.existsSync(targetPath)) {
                    fs.rmSync(targetPath, { recursive: true, force: true });
                    console.log(`[vite.config.ts] 已删除${targetPath}`);
                }
            }
        }
    } : {},
};
})
