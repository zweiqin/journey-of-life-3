import {
	shopRequest,
	request2
} from '../../utils'

// 校验登录
export const whoami = id => {
	return shopRequest('/auth/checkLogin', {
		userId: id,
	})
}

// 注册
export const userRegisterApi = data => {
	return shopRequest('/auth/register', data)
}

// 登录
export const userLoginApi = data => {
	return shopRequest('/auth/login', data)
}

// 退出登录
export const layoutApi = id => {
	return shopRequest('/auth/checkLogin', {
		userId: id
	})
}

// 重置密码
export const resetPasswodApi = data => {
	return shopRequest('/auth/reset', data)
}

// 获取公共号配置
export const getConfigApi = data => {
	return shopRequest('/qrCode/getSignature', data, 'get')
}

// 2.0

// 获取验证码
export const getCodeApi = data => {
	return request2({
		url: '/auth/getCode',
		method: 'get',
		data,
	})
}

// 注册账号
export const registerApi = data => {
	return request2({
		url: '/auth/checkCode',
		data,
		loading: true,
	})
}

// 重置密码
export const resetPasswordApi = data => {
	return request2({
		url: '/auth/reset',
		data,
		loading: true,
	})
}

// 登录
export const loginApi = data => {
	return request2({
		url: '/auth/login',
		data,
		loading: true,
	})
}

// 验证码登录
export const verificationCodeApi = data => {
	return request2({
		url: '/auth/loginByPhone',
		data,
		loading: true,
	})
}

// 微信登录
export const wxLoginApi = data => {
	return request2({
		url: '/api/wechat/userInfo',
		data,
		loading: true,
		method: 'get',
	})
}


// 绑定手机号
export const bindMobileForWXApi = data => {
	return request2({
		url: '/api/wechat/wxBindPhone',
		loading: true,
		method: 'POST',
		data
	})
}

// 注销账户
export const destoryAccountApi = data => {
	return request2({
		url: '/auth/cancellationAccount',
		data
	})
}