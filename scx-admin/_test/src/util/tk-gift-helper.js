/**
 * rmbPrice 单位为 分
 *
 */

const c = 1;

const TK_GIFT_LIST = [
    {
        name: "TikTok",
        platformPrice: 1,
        rmbPrice: 0,
    },
    {
        name: "Perfume",
        platformPrice: 20,
        rmbPrice: 0,
    },
    {
        name: "Doughnut",
        platformPrice: 30,
        rmbPrice: 0,
    },
    {
        name: "Cap",
        platformPrice: 99,
        rmbPrice: 0,
    },
    {
        name: "Corgi",
        platformPrice: 299,
        rmbPrice: 0,
    },

    {
        name: "Money Gun",
        platformPrice: 500,
        rmbPrice: 0,
    },
    {
        name: "星际穿越",
        platformPrice: 20000,
        rmbPrice: 0,
    },
    {
        name: "游艇",
        platformPrice: 20000,
        rmbPrice: 0,
    },
];

//给 rmbPrice 赋值
for (let d of TK_GIFT_LIST) {
    d.rmbPrice = d.platformPrice * c;
}

export {TK_GIFT_LIST};
