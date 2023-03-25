export default [
  {
    name: 'phone',
    rule: ['required', 'isMobile'],
    msg: ['请输入电话号码', '请输入正确的手机号'],
  },
  {
    name: 'password',
    rule: ['required', 'minLength:6'],
    msg: ['请输入密码', '密码最少是六位'],
  },
]

export const verificationCodeRule = [
  {
    name: 'phone',
    rule: ['required', 'isMobile'],
    msg: ['请输入电话号码', '请输入正确的手机号'],
  },
  {
    name: 'code',
    rule: ['required'],
    msg: ['请输入手机验证码'],
  },
]

export const yunxingRule = [
  {
    name: 'customerName',
    rule: ['required'],
    msg: ['请输入姓名'],
  },
  {
    name: 'customerPhone',
    rule: ['required', 'isMobile'],
    msg: ['请输入手机号', '请输入正确的手机号'],
  },
  {
    name: 'customerGender',
    rule: ['required'],
    msg: ['请选择性别'],
  },
]
