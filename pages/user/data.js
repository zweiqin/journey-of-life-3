/**
import { status } from './../../user/digital-store/newBusiness/config';
 * external: 跳转外部网页， 跳转路径：/user/view
 */

import store from 'store';

export const shopOrderMneus = [
  {
    name: '待付款',
    icon: require('../../static/images/new-user/orders/await-pay.png'),
    url: '/user/orderForm/order-form?type=1'
  },
  {
    name: '待发货',
    icon: require('../../static/images/new-user/orders/await-fa.png'),
    url: '/user/orderForm/order-form?type=2'
  },
  {
    name: '待收货',
    icon: require('../../static/images/new-user/orders/await-shou.png'),
    url: '/user/orderForm/order-form?type=3'
  },
  {
    name: '待评价',
    icon: require('../../static/images/new-user/orders/await-ping.png'),
    url: '/user/orderForm/order-form?type=4'
  },
  {
    name: '所有订单',
    icon: require('../../static/images/new-user/orders/all.png'),
    url: '/user/orderForm/order-form?type=0'
  }
];

export const shequOrderMenus = [
  {
    name: '待付款',
    icon: require('../../static/images/new-user/orders/await-pay.png'),
    url: '/community-center/order',
    numberKey: 'WAIT_PAY'
  },
  {
    name: '待接单',
    icon: require('../../static/images/new-user/orders/await-jie.png'),
    url: '/community-center/order',
    numberKey: 'WAIT_ACCEPT'
  },
  {
    name: '已分配',
    icon: require('../../static/images/new-user/orders/await-fen.png'),
    url: '/community-center/order',
    numberKey: 'ALREADY_DISTRIBUTION'
  },
  {
    name: '配送中',
    icon: require('../../static/images/new-user/orders/await-fa.png'),
    url: '/community-center/order',
    numberKey: 'DISTRIBUTION'
  },
  {
    name: '所有订单',
    icon: require('../../static/images/new-user/orders/all.png'),
    url: '/community-center/order'
  }
];

export const shequTwiceOrder = [
  {
    name: '待支付',
    icon: require('../../static/images/user/await-pay.png'),
    url: '/community-center/twice-order?type=0',
    numberKey: '',
    value: 0
  },
  {
    name: '已付款',
    icon: require('../../static/images/user/payed.png'),
    url: '/community-center/twice-order?type=1',
    numberKey: '',
    value: 1
  },
  {
    name: '拒绝',
    icon: require('../../static/images/user/refused.png'),
    url: '/community-center/twice-order?type=2',
    numberKey: '',
    value: 2
  }
];

export const myEquity = [
  {
    name: '小账本',
    icon: require('../../static/images/new-user/equity/account-book.png'),
    // url: '/user/account-book/index' // 老的
    url: '/user/commission-statistics/commission-statistics',
    permission: () => {
      const status = store.getters.regimentalCommanderStatus;
      if (!status) return '你的等级不够，请先申请成为团长';
      if (status === 3) {
        return null;
      } else {
        switch (status) {
          case 0:
            return '您的等级不够，请先去申请成为团长';
          case 1:
            return `您的申请正在审核中，请耐心等待`;
          case 2:
            return `您的申请正在审核中，请耐心等待`;
          case 3:
            return '您的申请被驳回了，请联系管理人员';
          case 5:
            return '您的团长身份已取消，请联系店长恢复';
        }
      }
    }
  },
  {
    name: '微店',
    icon: require('../../static/images/new-user/equity/microstore.png'),
    role: [1, 6, 7],
    url: '/user/sever/microstore/microstore'
  },
  // {
  //   name: "会员升级",
  //   icon: require("../../static/images/new-user/equity/apply-store.png"),
  //   url: "/user/sever/userUp/partner-appay",
  // },
  {
    name: '申请团长',
    icon: require('../../static/images/new-user/equity/group.png'),
    url: '/user/sever/regimental-commander/regimental-commander',
    permission: () => {
      const status = store.getters.regimentalCommanderStatus;
      if (!status) return null;
      if (status === 3) {
        return '您已经是团长了';
      } else {
        switch (status) {
          case 0:
            return null;
          case 1:
            return `您的申请正在审核中，请耐心等待`;
          case 2:
            return `您的申请正在审核中，请耐心等待`;
          case 3:
            return '您的申请被驳回了，请联系管理人员';
          case 5:
            return '您的团长身份已取消，请联系店长恢复';
        }
      }
    }
  },
  {
    name: '区域代理',
    icon: require('../../static/images/new-user/equity/regional-agent.png'),
    url: '/user/sever/regional-agent/regional-agent'
  },
  {
    name: '我的推广',
    icon: require('../../static/images/new-user/equity/popularize.png'),
    url: '/user/sever/group-code/group-code',
    permission: () => {
      const status = store.getters.regimentalCommanderStatus;
      if (!status) return '你的等级不够，请先申请成为团长';
      if (status === 3) {
        return null;
      } else {
        switch (status) {
          case 0:
            return '您的等级不够，请先去申请成为团长';
          case 1:
            return `您的申请正在审核中，请耐心等待`;
          case 2:
            return `您的申请正在审核中，请耐心等待`;
          case 3:
            return '您的申请被驳回了，请联系管理人员';
          case 5:
            return '您的团长身份已取消，请联系店长恢复';
        }
      }
    }
  },
  {
    name: '申请开店',
    icon: require('../../static/images/new-user/equity/apply-for.png'),
    url: '/user/sever/applyStore/index',
    role: [1, 6, 7]
  },
  {
    name: '智能画册',
    icon: require('../../static/images/new-user/equity/smart-album.png'),
    url: '/user/smartAlbum/index'
  },
  {
    name: '活动中心',
    icon: require('../../static/images/new-user/equity/sharing-activities.png'),
    url: '/user/sever/activityCenter/index'
  }
];

export const myServe = [
  {
    name: '地址管理',
    icon: require('../../static/images/new-user/serve/address.png'),
    url: '/user/site/site-manage'
  },
  {
    name: '联系客服',
    icon: require('../../static/images/new-user/serve/chat.png'),
    url: '/user/sever/customer-service/customer-service'
  },
  {
    name: '师傅端',
    icon: require('../../static/images/new-user/serve/sf.png'),
    type: 'external',
    url: 'https://www.zhult.com/shifu/#/login'
  },
  {
    name: '店长端',
    icon: require('../../static/images/new-user/serve/zz.png'),
    type: 'external',
    url: 'https://www.zhult.com/zhanzhang/#/login'
  }
];

export const mapGroupStatus = (status) => {
  return { 0: '未审核', 1: '待审核', 2: '审核中', 3: '审核通过', 4: '不通过', 5: '已取消' }[status];
};
