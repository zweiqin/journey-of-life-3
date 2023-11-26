export const advantageList = [
  {
    label: '精选服务',
    animateClass: 'ad-1-animate'
  },
  {
    label: '一键响应',
    animateClass: 'ad-2-animate'
  },
  {
    label: '快速上门',
    animateClass: 'ad-3-animate'
  },
]

export const validateOrderForm = orderForm => {
  if (!orderForm.consigneeName) {
    return '请填写联系人'
  }

  if (!orderForm.consigneeMobile) {
    return '请填写联系人电话'
  }

  if (!orderForm.consigneeAddress) {
    return '请选择公司地址'
  }

  if (!orderForm.consigneeAddressDetail) {
    return '请填写公司详细地址'
  }

  if (!orderForm.shopId) {
    return '请选择服务网点'
  }

  if (!orderForm.installDate) {
    return '请选择期望服务时间'
  }


  const serverInfo = orderForm.extraInfo.serverInfo

  if (!serverInfo) {
    return '请选择服务分类'
  }

  if (Array.isArray(serverInfo) && serverInfo.length) {
    for (const serverItem of serverInfo) {
      if (!serverItem.images.length) {
        return `请上传【${serverItem.serverName}】的服务图片`
      }
    }
  }
}