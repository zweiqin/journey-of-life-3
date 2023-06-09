export default [
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
  {
    name: 'password',
    rule: ['require', 'minLength:6'],
    msg: ['请输入密码', '密码最少是六位'],
  },
]
