export type btfpPath={
    //路径
    path:string,
    //文件名称
    name:string,
    //文件被点击时执行的函数
    clickFunc:()=>void,
};
export type btfpNode={
    //文件名
    //为null则代表在根
    name:string|null,
    //完整路径，包含文件名
    //为null则代表在根
    fullPath:string|null,
    //是否为目录
    isDirectory:boolean,
    //被点击时执行的函数，仅非目录时
    //为null则代表是目录
    clickFunc:(()=>void)|null,
    //子
    //为null则代表非目录
    children:btfpNode[]|null,
};
/**
 * 将扁平路径节点数组转换为嵌套树结构
 * @param paths 输入的路径组
 * @returns 节点数据
 */
export function buildTreeFromPaths(paths:btfpPath[]):btfpNode {
    //根
    const root:btfpNode = {
        name:null,
        fullPath:null,
        isDirectory:true,
        clickFunc:null,
        children: [],
    };

    paths.forEach(path => {
        //去除了首尾斜杠了的路径
        const thePath = (path.path || '').replace(/^\/+|\/+$/g, '');//移除首尾斜杠
        //路径的各个部分
        const pathParts = thePath ? thePath.split('/') : [];

        //用于动态进入目录进行操作
        let currentDir = root.children!;

        pathParts.forEach(part => {//检查目标文件的所有父目录是否存在
            if (!part) return;
            let dir = currentDir.find(
                item => (item.name === part && item.isDirectory)//根据目标名和其是否为目录判断当前层级的父目录是否存在
            );
            if (!dir) {
                dir = {//创建目录
                    name: part,
                    fullPath: '',//先留空，最后写入所有路径
                    isDirectory: true,
                    clickFunc: null,
                    children: []
                };
                currentDir.push(dir);
            }
            currentDir = dir.children!;//进入当前子目录继续寻找
        });

        currentDir.push({
            name: path.name,
            fullPath: `/${thePath}/${path.name}`,
            isDirectory: false,
            clickFunc: path.clickFunc,
            children: null,
        });
    });

    //遍历并补全目标下的所有路径
    function setPath(nodes:btfpNode[], parentPath = '') {
        nodes.forEach(node => {
            node.fullPath = parentPath + '/' + node.name;
            if (node.children) {
                setPath(node.children, node.fullPath);
            }
        });
    }
    setPath(root.children!);

    return root;
}