export const filters = [
  {
    label: '设计价格',
    value: 0,
    icon: 'arrowdown',
    key: 'pricePopupVisible',
    isAnimate: true,
  },
  {
    label: '服务范围',
    value: 1,
    icon: 'arrowdown',
    key: 'servePopupVisible',
    isAnimate: true,
  },
  {
    label: '全部筛选',
    value: 2,
    icon: 'screen',
    key: 'allPopupVisible',
    isAnimate: false,
  },
]

export const tempData = [
  {
    id: 0,
    logo: require('../../../static/images/new-index/temp/shoumeng.png'),
    name: '首檬设计公司',
    text1: '设计工作室',
    text2: '从业31年',
    text3: '￥500-1000/㎡',
    images: [
      require('../../../static/images/new-index/temp/shou1.png'),
      require('../../../static/images/new-index/temp/shou2.png'),
      require('../../../static/images/new-index/temp/shou3.png'),
      require('../../../static/images/new-index/temp/shou4.png'),
    ],
    dis: '32.1',
    taoImgs: [
      require('../../../static/images/new-index/temp/quwu/tao2.png'),
      require('../../../static/images/new-index/temp/quwu/tao3.png'),
      require('../../../static/images/new-index/temp/quwu/tao4.png'),
      require('../../../static/images/new-index/temp/quwu/tao1.png'),
    ],
  },
  {
    id: 1,
    logo: require('../../../static/images/new-index/temp/yi1.png'),
    name: '佑泽设计',
    text1: '个人设计师',
    text2: '从业14年',
    text3: '￥80-200/㎡',
    images: [
      require('../../../static/images/new-index/temp/yi2.png'),
      require('../../../static/images/new-index/temp/yi3.png'),
      require('../../../static/images/new-index/temp/yi4.png'),
      require('../../../static/images/new-index/temp/yi5.png'),
    ],
    dis: '13.9',
    taoImgs: [
      require('../../../static/images/new-index/temp/quwu/t3.png'),
      require('../../../static/images/new-index/temp/quwu/t4.png'),
      require('../../../static/images/new-index/temp/quwu/t1.png'),
      require('../../../static/images/new-index/temp/quwu/t2.png'),
    ],
  },
  {
    id: 3,
    logo: require('../../../static/images/new-index/temp/logo.png'),
    name: '前齐设计公司',
    text1: '设计工作室',
    text2: '从业8年',
    text3: '￥60-150/㎡',
    images: [
      require('../../../static/images/new-index/temp/image-2.png'),
      require('../../../static/images/new-index/temp/image-3.png'),
      require('../../../static/images/new-index/temp/image-4.png'),
      require('../../../static/images/new-index/temp/image-5.png'),
    ],
    dis: '13.9',
    taoImgs: [
      require('../../../static/images/new-index/temp/quwu/ta1.png'),
      require('../../../static/images/new-index/temp/quwu/ta4.png'),
      require('../../../static/images/new-index/temp/quwu/ta3.png'),
      require('../../../static/images/new-index/temp/quwu/ta2.png'),
    ],
  },
]

export const allFilters = [
  {
    title: '类型',
    items: ['设计工作室', '个人设计师'],
  },
  {
    title: '风格',
    items: [
      '北欧',
      '现代简约',
      '混搭',
      '日式',
      '轻奢',
      '中式',
      '复古',
      '美式',
      '欧式',
      '工业',
      '台式',
      '新中式',
    ],
  },
  {
    title: '搭配',
    items: [
      '色彩搭配',
      '全屋定制',
      '户型改造',
      '旧房改造',
      '儿童房设计',
      '复式别墅',
      '商业空间',
      '软装搭配',
      '灯光设计',
      '收纳规划',
    ],
  },
]
