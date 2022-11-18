/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-12 16:17:05
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-27 17:20:32
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\pages\user\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const tools = [
  {
    icon: require("../../static/images/user/erweima.png"),
  },
  {
    icon: require("../../static/images/user/shezhi.png"),
  },
  {
    icon: require("../../static/images/user/xinxi.png"),
  },
];

export const one = {
  title: null,
  menus: [
    {
      label: "待付款",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6oy1doklr6qy59uida1r.png ",
      url: "/user/orderForm/order-form?type=1",
      showType: 1,
    },
    {
      label: "待发货",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/zufcag92apxavgddfdx1.png ",

      url: "/user/orderForm/order-form?type=2",
      showType: 2,
    },
    {
      label: "待收货",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qb8dsznp8mkh5f5oumi8.png ",
      url: "/user/orderForm/order-form?type=3",
      showType: 3,
    },
    {
      label: "待评价",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/g5stm4mlnteyf71nnedx.png ",
      url: "/user/orderForm/order-form?type=4",
      showType: 4,
    },
    {
      label: "所有订单",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/tj750f4yk1bv8z972ubf.png ",
      url: "/user/orderForm/order-form?type=0",
      showType: 0,
    },
  ],
};
export const two = {
  title: null,
  menus: [
    {
      label: "待付款",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6oy1doklr6qy59uida1r.png ",
      url: "/community-center/order",
    },
    {
      label: "待发货",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/zufcag92apxavgddfdx1.png ",
      url: "/community-center/order",
    },
    {
      label: "待安装",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/kx30q97obt0wxhy6qk9f.png ",
      url: "/community-center/order",
    },
    {
      label: "待评价",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/g5stm4mlnteyf71nnedx.png ",
      url: "/community-center/order",
    },
    {
      label: "所有订单",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/tj750f4yk1bv8z972ubf.png ",
      url: "/community-center/order",
    },
  ],
};

export const three = {
  title: null,
  menus: [
    {
      label: "待付款",
      icon: require("../../static/images/user/daifukuan.png"),
      url: "/user/orderForm/order-form",
      showType: 1,
    },
    {
      label: "待发货",
      icon: require("../../static/images/user/daifahuo.png"),
      url: "/user/orderForm/order-form",
      showType: 2,
    },
    {
      label: "待收货",
      icon: require("../../static/images/user/daishouhuo.png"),
      url: "/user/orderForm/order-form",
      showType: 3,
    },
    {
      label: "待评价",
      icon: require("../../static/images/user/daipingjia.png"),
      url: "/user/orderForm/order-form",
      showType: 4,
    },
    {
      label: "所有订单",
      icon: require("../../static/images/user//suoyoudingdan.png"),
      url: "/user/orderForm/order-form",
      showType: 0,
    },
  ],
};
export const serve = {
  title: "我的服务",
  menus: [
    {
      label: "商品收藏",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/v5yond28i8fx4lyu5ulv.png",
      url: "/user/Collection/Goods-Collection",
    },
    {
      label: "我的拼团",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/amhee3jrsp4gvj52s7gj.png ",
    },
    {
      label: "地址管理",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/r76h31omvpyz32bqpfs6.png ",
      url: "/user/site/site-manage",
    },
    {
      label: "购物车",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/j75unnyxcbtnf3wwfsrs.png ",
      url: "/user/sever/shop-car",
    },
    {
      label: "优惠劵",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4u948ko5bu56bbw0v0cd.png ",
      url: "/user/sever/coupon",
    },
    {
      label: "联系客服",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1wtntegtsfarlxi4e1p1.png ",
    },
    {
      label: "社区管家",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/8bqv4rk32snko0cncwr6.png ",
      url: "/user/sever/userUp",
    },
    {
      label: "推广码",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qreq9r6so29qkurcjeoc.png ",
      // url: "/pages/stuff/brand/index",
    },
  ],
};

export const digitalStore = {
  title: "数字化营销门店",
  menus: [
    {
      label: "营销画像",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ovt68z4ewzdqba6l8yte.png ",
      url: "/user/digital-store/marketing-portrait",
    },
    {
      label: "信息哨兵",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/uyp6zsta1v2iookr5af9.png ",
      url: "/user/digital-store/information-sentry",
    },
    {
      label: "业绩哨兵",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ct6nqpua5ttw22rvr4ih.png ",
      url: "/user/digital-store/performance",
    },
    {
      label: "业务管理",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/w0dp1m3i5no3deeuv34e.png ",
      url: "/user/digital-store/business/index"
    },
  ],
};

export const marketingTools = {
  title: "营销工具",
  menus: [
    {
      label: "门店申请",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/dmr04pozfeiw33qvoqgq.png",
      url: "/user/sever/shopUp",

    },
    {
      label: "我的名片",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/exu48rqu12mmp283gf7u.png",
      url: "/user/postCard/index"
    },
    {
      label: "每日签到",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/z9sw8wqqfm3pw67z1yce.png ",
    },
    {
      label: "门店看板",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4fbzhcn6vvipxzta6fs8.png ",
    },
    {
      label: "智能画册",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gd7fnlasc89w4bwgo7ox.png ",
    },
    {
      label: "秒杀活动",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/zbi9v1dns5mb7uyzyhkx.png ",
    },
    {
      label: "分享券",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/d5c5ihwrrrfzxc670l1d.png ",
    },
    {
      label: "推广中心",
      icon: "https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/gox9z18bukb6ws0l2595.png",
    },
  ],
};
export const communityServices = {
  title: "社区服务",
  menus: [
    {
      label: "师傅",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/xypr9jh25oftnzjd7m22.png",
      url: "/pages/otherUrl/otherUrl?url=https://www.zhult.com/shifu/#/login"
    },
    {
      label: "城市合伙人",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/nbpf99anaovw4jivc085.png",
      url: "/pages/otherUrl/otherUrl?url=https://www.zhult.com/zhanzhang/#/login"
    }, {
      label: "",
      icon: "",
      url: ""
    },
    {
      label: "",
      icon: "",
      url: ""
    },
  ]
}

export const otherServe = {
  title: "其他服务",
  menus: [
    {
      label: "进销存",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/hgmuqnspah5ik2jzh1pl.png",
    },
    {
      label: "关注物流",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/tu5v33oy9x1vabhnyyg8.png ",
      url: "/logistics/appoint",
    },
    {
      label: "",
      icon: "",
      url: ""
    },
    {
      label: "",
      icon: "",
      url: ""
    },
    // {
    //   label: "代金券充值",
    //   icon: require("../../static/images/user/daijinjuanchongzhi.png"),
    // },
    // {
    //   label: "代金券转赠",
    //   icon: require("../../static/images/user/daijinjuanzhuanzeng.png"),
    // },

  ],
};
