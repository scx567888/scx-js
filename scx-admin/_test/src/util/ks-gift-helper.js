/**
 * rmbPrice 单位为 分
 *
 */

const c = 10;

const KS_GIFT_LIST = [
    {
        name: "助威火炬",
        platformPrice: 1,
        rmbPrice: 0,
    },
    {
        name: "火花",
        platformPrice: 10,
        rmbPrice: 0,
    },
    {
        name: "一叶知秋",
        platformPrice: 19,
        rmbPrice: 0,
    },
    {
        name: "助威火箭",
        platformPrice: 52,
        rmbPrice: 0,
    },
    {
        name: "雪糕刺客",
        platformPrice: 99,
        rmbPrice: 0,
    },

    {
        name: "冲鸭",
        platformPrice: 199,
        rmbPrice: 0,
    },
    {
        name: "浪漫满屏",
        platformPrice: 299,
        rmbPrice: 0,
    },
    {
        name: "老铁666",
        platformPrice: 666,
        rmbPrice: 0,
    },
    {
        name: "爱心喷射机",
        platformPrice: 999,
        rmbPrice: 0,
    },
    {
        name: "火力全开",
        platformPrice: 5200,
        rmbPrice: 0,
    },
    {
        name: "兔比No.1",
        platformPrice: 8888,
        rmbPrice: 0,
    },
];

//给 rmbPrice 赋值
for (let d of KS_GIFT_LIST) {
    d.rmbPrice = d.platformPrice * c;
}

export {KS_GIFT_LIST};
