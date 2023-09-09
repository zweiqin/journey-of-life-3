export const navs = [
	{
		value: 1,
		name: '已购买'
	},
	{
		value: 2,
		name: '已使用'
	},
	{
		value: 3,
		name: '未使用'
	}
]
export const navs1 = [
	{
		value: 1,
		name: '可购买'
	}
]
export const service = [
	{
		value: 1,
		name: '电路检修 （全年）',
		icon: require('../../../static/images/center/dl.png')
	},
	{
		value: 2,
		name: '水管检修 （全年）',
		icon: require('../../../static/images/center/sg.png')
	},
	{
		value: 3,
		name: '通马桶服务一次',
		icon: require('../../../static/images/center/qx.png')
	},
	{
		value: 4,
		name: '水管清洗一次 （一厨两卫）',
		icon: require('../../../static/images/center/mt.png')
	}
]
export const contents = [
	{
		value: 1,
		serviceName: '水管清洗1次',
		name: '家庭小卫士',
		time: '2023-02-18'
	},
	{
		value: 2,
		serviceName: '电路检修',
		name: '家庭小卫士',
		time: '2023-02-18'
	},
	{
		value: 3,
		serviceName: '水管检修',
		name: '家庭小卫士',
		time: '2023-02-18'
	}
]

export const calcUseNumber = (totalVip2) => {
	const allServe = totalVip2[0].serverContent.split(',')

	const res = {}
	for (const item of allServe) {
		res[item] = totalVip2.length
	}

	for (const server of totalVip2) {
		for (const usedServe of server.recordList) {
			res[usedServe.serverContent] -= 1
		}
	}

	return res
}
