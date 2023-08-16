export const orderTypes = [
  {
    label: '全部',
    value: 0,
    key: 'all'
  },
  {
    label: '待付款',
    value: 1,
    key: 'awaitPay'
  },
  {
    label: '待发货',
    value: 2,
    key: 'awaitShipped'
  },
  {
    label: '待收货',
    value: 3,
    key: 'awaitReceipt'
  },
  {
    label: '待评价',
    value: 4,
    key: 'awaitEvaluate'
  },
  {
    label: '我的评价',
    value: 5,
    key: 'components'
  }
];

export const orderOpButtons = [
  {
    label: '删除订单',
    key: 'delete',
    color: '#FFC117'
  },
  {
    label: '取消订单',
    key: 'cancel',
    color: '#ccc'
  },
  {
    label: '去支付',
    key: 'pay',
    color: '#FFC117'
  },
  {
    label: '确认收货',
    key: 'confirm',
    color: '#FFC117'
  },
  {
    label: '申请退款',
    key: 'refund',
    color: '#FFC117'
  },
  {
    label: '再次购买',
    key: 'rebuy',
    color: '#FFC117'
  },
  {
    label: '去评论',
    key: 'comment',
    color: '#FFC117'
  }
];

export const rateOrderWholeList = [
  {
    label: '服务评分',
    key: 'rate1'
  },
  {
    label: '物流评分',
    key: 'rate2'
  },
  {
    label: '商品符合度',
    key: 'rate4'
  },
  {
    label: '商家服务',
    key: 'rate5'
  },
  {
    label: '快递包装',
    key: 'rate6'
  }
];
