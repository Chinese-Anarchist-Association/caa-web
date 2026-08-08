//来源：https://github.com/Hgnim/perweb/blob/01efbc88b96f7d8c571e55515cc6157887746a8d/src/utils/date.ts

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

/**
 * 获取相对时间
 * @param targetTime 将被转换的时间
 */
export function getFromNowTime(targetTime:string):string{
    return dayjs(targetTime).fromNow();
}

/**
 * 获取易读时间
 * @param targetTime 将被转换的时间
 */
export function getFormatTime(targetTime:string){
    return dayjs(targetTime).format('YYYY年M月D日 dddd HH:mm:ss');
}