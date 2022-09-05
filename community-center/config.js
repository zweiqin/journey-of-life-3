export const orderDetail = () => {
  return [
    {
      label: '佛山',
      icon: require('../static/images/store/locale.png'),
      value: 0
    },
    {
      label: '上门时间',
      icon: require('../static/images/store/time.png'),
      value: 1
    }
  ]
}

export const getConfirmConfig = () => {
  return [
    {
      label: '佛山',
      icon: require('../static/images/store/locale.png'),
      id: 0
    },
    {
      label: '上门时间',
      icon: require('../static/images/store/time.png'),
      id: 1
    },
    {
      label: '备注',
      icon: require('../static/images/store/remarks.png'),
      id: 2
    }
  ]
}

export const getConfirmOther = () => {
  return [
    {
      label: '优惠',
      icon: require('../static/images/store/youhui.png'),
      id: 0,
      style: {
        background: '#fff',
        borderRadius: '5px',
        padding: '13px 13px',
        margin: '10px 0'
      }
    },
    {
      label: '其他服务明细',
      icon: require('../static/images/store/other.png'),
      id: 1,
      style: {
        background: '#fff',
        borderRadius: '5px',
        padding: '13px 13px'
      }
    }
  ]
}