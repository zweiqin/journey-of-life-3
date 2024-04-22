export const orderTypeEnum = {
	1: '待付款',
	2: '待发货',
	3: '待收货',
	4: '已完成',
	5: '交易关闭（已取消）',
	6: '待成团',
	7: '待售后',
	8: '待核销（未付款）',
	9: '待核销（已付款）',
	10: '已核销'
}

export const orderPatternEnum = {
	'1': {
		text: '等待买家付款',
		message: '待支付'
	},
	'2': {
		text: '等待卖家发货',
		message: '付款后2-5个工作日发货'
	},
	'3': {
		text: '卖家已发货',
		message: ''
	},
	'4': {
		text: '交易成功',
		message: '感谢您的使用'
	},
	'5': {
		text: '交易关闭',
		message: '您已关闭了这笔交易'
	},
	'5.5': {
		text: '拼团失败',
		message: '剩余时间 00:00:00'
	},
	'6': {
		text: '待成团',
		message: ''
	},
	'7': {
		text: '待售后',
		message: ''
	},
	'8': {
		text: '待核销（未付款）',
		message: ''
	},
	'9': {
		text: '待核销（已付款）',
		message: ''
	},
	'10': {
		text: '已核销',
		message: ''
	},
	'0': {
		text: '出错了-0',
		message: '出错了-0'
	},
	'undefined': {
		text: '出错了-',
		message: '出错了-'
	},
	'': {
		text: '--',
		message: '--'
	}
}

export function afterConditionEnum(afterState, afterType) {
	if (afterType === 1) { // 退款
		return {
			'-1': '无退货',
			'1': '退款审核中',
			'2': '退款中',
			'4': '退款完成',
			'5': '退款失败',
			'6': '审核不通过',
			'7': '评审中',
			'9': '撤销申请',
			'10': '审核通过'
		}[String(afterState)] || '出错了'
	} else if (afterType === 2) { // 退货
		return {
			'-1': '无退货',
			'1': '退款审核中',
			'2': '退款中',
			'3': '退货中',
			'4': '退款完成',
			'5': '退款失败',
			'6': '审核不通过',
			'7': '评审中',
			'8': '退货完成，拒绝退款',
			'9': '撤销申请',
			'10': '审核通过'
		}[String(afterState)] || '出错了'
	}
	return {
		'-1': '无退货',
		'1': '审核中',
		'2': '退款中',
		'3': '退货中',
		'4': '退款完成', // 退款成功
		'5': '退款失败',
		'6': '审核不通过',
		'7': '评审中',
		'8': '退货完成，拒绝退款',
		'9': '撤销申请', // isPlaformState-平台介入拒绝-审核失败 // 退款关闭 // 退货关闭
		'10': '审核通过'
	}[String(afterState)] || '出错了'
}
