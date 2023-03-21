export default [
  {
    name: 'mobile',
    rule: ['required', 'isMobile'],
    msg: ['请输入电话号码', '请输入正确的手机号'],
  },
  {
    name: 'password',
    rule: ['require', 'minLength:6'],
    msg: ['请输入密码', '密码最少是六位'],
  },
  {
    name: 'confirmPassword',
    rule: ['require', 'minLength:6', 'isSame:password'],
    msg: ['请确认密码', '密码最少是六位', '两次密码输入不一致'],
  },
  
]
