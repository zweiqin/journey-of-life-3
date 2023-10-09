import { getCommentListApi, getCanCommentAgainListApi, getCommentedListApi } from '../../api/community-center';

export const getOrderStatusList = () => {
  return [
    {
      label: '全部',
      value: -1
    },
    {
      label: '待报价',
      value: 2
    },
    {
      label: '待支付',
      value: 0
    },

    {
      label: '待评价',
      value: -3
    },
    {
      label: '待接单',
      value: 1
    },
    {
      label: '待分配',
      value: 3
    },
    {
      label: '已分配',
      value: 4
    },
    {
      label: '待到场',
      value: 5
    },
    {
      label: '服务中',
      value: 31
    },
    {
      label: '已完成',
      value: 6
    },
    {
      label: '已取消',
      value: 7
    },
    {
      label: '二次追加',
      value: -2
    },
    {
      label: '其他(异常)',
      value: 8
    }
  ];
};

export const communityAppendOrderNavs = [
  {
    label: '待支付',
    value: 0
  },
  {
    label: '已付款',
    value: 1
  },
  {
    label: '已拒绝',
    value: 2
  }
];

export const communityCommentOrder = [
  {
    label: '待评价',
    value: 0,
    api: getCommentListApi,
    list: 'commentOrderList'
  },
  {
    label: '已评价',
    value: 1,
    api: getCommentedListApi,
    list: 'commentedOrderList'
  },
  {
    label: '可追评',
    value: 2,
    api: getCanCommentAgainListApi,
    list: 'commentAppendOrderList'
  }
];

export const shopOrderType = [
  {
    label: '全部',
    value: -1,
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
  // {
  //   label: '申请退款',
  //   key: 'refund',
  //   color: '#FFC117'
  // },
  // {
  //   label: '再次购买',
  //   key: 'rebuy',
  //   color: '#FFC117'
  // },
  {
    label: '去评论',
    key: 'comment',
    color: '#FFC117'
  }
];

export const businessSubNavs = [
  {
    label: '服务',
    value: 1
  },
  {
    label: '商品',
    value: 2
  }
];

export const mapBusinessOrderStatus = [
  {
    label: '待支付',
    value: 0
  },
  {
    label: '待接单',
    value: 1
  },
  {
    label: '已接单',
    value: 2
  },
  {
    label: '已收货',
    value: 3
  },
  {
    label: '已完成',
    value: 4
  },
  {
    label: '已取消',
    value: 7
  }
];

export const businessOrderOPButtons = [
  {
    label: '支付',
    key: 'pay',
    color: '#FFC117',
    show(orderInfo) {
      return orderInfo.orderStatus === 0;
    }
  },
  {
    label: '取消订单',
    key: 'cancel',
    color: '#ccc',
    show(orderInfo, type = 'shop') {
      return type === 'shop' ? [0, 1].includes(orderInfo.orderStatus) : [0, 1, 2].includes(orderInfo.orderStatus);
    }
  },
  {
    label: '删除订单',
    key: 'delete',
    color: '#FFC117',
    show(orderInfo) {
      return orderInfo.orderStatus === 7;
    }
  }
];
