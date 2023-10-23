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
    logo: require('../../../static/images/new-user/default-user-avatar.png'),
    name: '首檬设计公司',
    text1: '设计工作室',
    text2: '从业31年',
    text3: '￥500-1000/㎡',
    images: [
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
    ],
    dis: '32.1',
    taoImgs: [
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
    ],
  },
  {
    id: 1,
    logo: require('../../../static/images/new-user/default-user-avatar.png'),
    name: '佑泽设计',
    text1: '个人设计师',
    text2: '从业14年',
    text3: '￥80-200/㎡',
    images: [
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
    ],
    dis: '13.9',
    taoImgs: [
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
    ],
  },
  {
    id: 3,
    logo: require('../../../static/images/new-user/default-user-avatar.png'),
    name: '前齐设计公司',
    text1: '设计工作室',
    text2: '从业8年',
    text3: '￥60-150/㎡',
    images: [
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
    ],
    dis: '13.9',
    taoImgs: [
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
      require('../../../static/images/new-user/default-user-avatar.png'),
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
