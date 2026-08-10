import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
//import utc from 'dayjs/plugin/utc';
//import timezone from 'dayjs/plugin/timezone';
//import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.locale('zh-cn');
//dayjs.extend(utc);
//dayjs.extend(timezone);
//dayjs.extend(advancedFormat);


/**
 * 获取易读时间并携带时区
 * @param targetTime 将被转换的时间
 */
export function getFormatTimeWithTimezone(targetTime:string){
    return dayjs(targetTime)//.format('YYYY年M月D日 dddd HH:mm:ss [UTC]Z (z)');
        .format('YYYY年M月D日 dddd HH:mm:ss [UTC]Z');
}