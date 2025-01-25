import dayjs from "dayjs/esm/index.js";
import duration from "dayjs/esm/plugin/duration/index.js";

dayjs.extend(duration);

function durationFormat(duration) {
    let time = dayjs.duration(duration);
    let str = "";
    if (duration >= 1000 * 60 * 60 * 24 * 30 * 12) {
        str = str + time.years() + "年";
    }
    if (duration >= 1000 * 60 * 60 * 24 * 30) {
        str = str + time.months() + "月";
    }
    if (duration >= 1000 * 60 * 60 * 24) {
        str = str + time.days() + "天";
    }
    if (duration >= 1000 * 60 * 60) {
        str = str + time.hours() + "小时";
    }
    if (duration >= 1000 * 60) {
        str = str + time.minutes() + "分";
    }
    return str + time.seconds() + "秒";
}

export {durationFormat};
