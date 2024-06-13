/**
 * 质保卡状态：1=生效中 2=已申请 3=处理中 4=已完成 5=已失效
 * 质保卡申请处理状态 1=已申请 2=处理中 3=已完成 4=已取消
 */
export const qualityAssuranceCardStatus = [
  { name: '生效中', value: 1, icon: require('../../static/images/new-user/quality-assurance-card/effective.png'), color: '#ef530e', type: 'mine', disabled: false, applyText: '申请质保服务' },
  { name: '已申请', value: 2, icon: require('../../static/images/new-user/quality-assurance-card/apply.png'), color: '#ef530e', type: 'history,mine', disabled: false },
  { name: '处理中', value: 3, icon: require('../../static/images/new-user/quality-assurance-card/setting.png'), color: '#ef530e', type: 'history,mine', disabled: false },
  { name: '已完成', value: 4, icon: require('../../static/images/new-user/quality-assurance-card/finish.png'), color: '#979797', type: 'history,mine', disabled: false },
  {
    name: '已失效',
    value: 5,
    icon: require('../../static/images/new-user/quality-assurance-card/invalid.png'),
    color: '#979797',
    type: 'history,mine',
    disabled: false,
    applyText: '申请质保服务(已失效)'
  }
]

export const getCurrentStatusInfo = (status) => {
  const current = qualityAssuranceCardStatus.find((item) => item.value === status * 1)
  return current
    ? current
    : {
        name: '未知状态',
        value: -2,
        icon: '',
        color: '#979797'
      }
}
