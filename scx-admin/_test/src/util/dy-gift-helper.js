/**
 * rmbPrice 单位为 分
 *
 */

const c = 10;

const DY_GIFT_LIST = [
    {
        name: "仙女棒",
        platformPrice: 1,
        rmbPrice: 0,
    },
    {
        name: "能力药丸",
        platformPrice: 10,
        rmbPrice: 0,
    },
    {
        name: "甜甜圈",
        platformPrice: 52,
        rmbPrice: 0,
    },
    {
        name: "能量电池",
        platformPrice: 99,
        rmbPrice: 0,
    },

    {
        name: "爱的爆炸",
        platformPrice: 199,
        rmbPrice: 0,
    },
    {
        name: "派对话筒",
        platformPrice: 299,
        rmbPrice: 0,
    },
    {
        name: "神秘空投",
        platformPrice: 520,
        rmbPrice: 0,
    },
    {
        name: "草莓甜点",
        platformPrice: 666,
        rmbPrice: 0,
    },
];

//给 rmbPrice 赋值
for (let d of DY_GIFT_LIST) {
    d.rmbPrice = d.platformPrice * c;
}

export {DY_GIFT_LIST};
