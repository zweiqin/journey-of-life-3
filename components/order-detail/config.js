export const getBaseInfo = (type, obj) => {
  const config = [
    {
      label: '姓名',
      icon: require('../../static/images/con-center/name.png'),
      id: 0
    }, {
      label: '地址',
      icon: require('../../static/images/index/location.png'),
      id: 2
    }
  ]

  if (type === 'serve') {
    config.splice(1, 0, {
      label: '预约时间',
      icon: require('../../static/images/con-center/time.png'),
      id: 1
    })
  }

  return config
}