import ids from 'virtual:svg-icons-names';

/**
 * 通过函数获取ids以实现动态导入
 */
export function get_ids():string[]{
    return ids as string[];
}