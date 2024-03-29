export const homeTopNavs = [
  {
    name: '爆品家具',
    iconUrl: require('../../static/images/new-index/index-1/hot.png'),
    // url: '/pages/hot/hot'
    // url: '/pages/index/ExplosiveFurniture/index'
    url: '/pages/index/Explosive/category'
    // url: '/pages/furniture/furniture?goodsType=100101741&id=null'
  },
  {
    name: '兑换专区',
    iconUrl: require('../../static/images/new-index/index-1/duihuan.png'),
    url: '/pages/index/voucher-zone'
  },
  {
    name: '品牌家居',
    iconUrl: require('../../static/images/new-index/index-1/pinpai.png'),
    url: '/another-tf/another-user/brand-factory/index'
  },
  {
    name: '智能选配',
    iconUrl: require('../../static/images/new-index/index-1/aixp.png'),
    url: '/pages/index/IntelligentSelection/index'
  }
];

// export const homeTopNavs = [
//   {
//     name: '家具严选',
//     iconUrl: require('../../static/images/new-index/index-1/jiajuyanxuan.png'),
//     url: '/pages/goods-filter/goods-filter?id=100101533&sub=100101561'
//   },
//   {
//     name: '全屋快装',
//     iconUrl: require('../../static/images/new-index/index-1/quanwukuaizhuang.png'),
//     url: '/pages/index/WholeHouseQuickInstallation/WholeHouseQuickInstallation'
//   },
//   {
//     name: '全屋套餐',
//     iconUrl: require('../../static/images/new-index/index-1/quanwutaozhuang.png'),
//     url: '/pages/index/WholehouseCustomization/index'
//   },
//   {
//     name: '智能选配',
//     iconUrl: require('../../static/images/new-index/index-1/zhinengxuanpei.png'),
//     url: '/pages/index/IntelligentSelection/index'
//   }
// ];

// export const voucherNavs = [
//   {
//     label: '精品家具',
//     icon: require('../../static/images/new-index/index-1/jingpinjiaju.png'),
//     value: 100101726
//   },
//   {
//     label: '日用百货',
//     icon: require('../../static/images/new-index/index-1/jiajuriyong.png'),
//     // value: 100101727
//     value: 100101742
//   },
//   {
//     label: '母婴亲子',
//     icon: require('../../static/images/new-index/index-1/muyingqinzi.png'),
//     value: 100101728
//   },
//   {
//     label: '美妆个护',
//     icon: require('../../static/images/new-index/index-1/meizhuanggehu.png'),
//     value: 100101729
//   },
//   {
//     label: '箱包皮具',
//     icon: require('../../static/images/new-index/index-1/xiangbaopiiju.png'),
//     value: 100101730
//   },
//   {
//     label: '数码电子',
//     icon: require('../../static/images/new-index/index-1/shumadianzi.png'),
//     value: 100101731
//   },
//   {
//     label: '服饰配饰',
//     icon: require('../../static/images/new-index/index-1/fuzhuangpeishi (2).png'),
//     value: 100101732
//   },
//   {
//     label: '餐厨器具',
//     icon: require('../../static/images/new-index/index-1/canchuqiju.png'),
//     value: 100101733
//   },
//   {
//     label: '宠物用品',
//     icon: require('../../static/images/new-index/index-1/chongwuyongpin.png'),
//     value: 100101734
//   },
//   {
//     label: '住宿酒店',
//     icon: require('../../static/images/new-index/index-1/zhjusujiudian.png'),
//     value: 100101735
//   }
// ];

export const proDropList =  [{
  listName: '排序',
  paramsKey: 'order',
  paramsVallue: '',
  listActiveIndex: 0,
  list: [{
    name: '升序',
    params: 'asc'
  }, {
    name: '降序',
    params: 'desc'
  }]
}, {
  name: '排序条件',
  paramsKey: 'sort',
  paramsVallue: 'retail_price',
  listActiveIndex: 0,
  list: [ {
    name: '价格',
    params: 'retail_price'
  } ]
}, {
  name: '新品',
  paramsKey: 'isNew',
  paramsVallue: '',
  listActiveIndex: 0,
  list: [{
    name: '开启新品筛选',
    params: 'true'
  }, {
    name: '关闭新品筛选',
    params: 'false'
  }]
}]