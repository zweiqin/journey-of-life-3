/* eslint-disable complexity */
import { handleDoPay } from './payUtil'
import { getProductDetailsByIdApi, getBanziProductCanSaleApi, getGroupSettlementWorkApi, getSettlementOrderApi, updatePlaceOrderSubmitApi, addUserTrackReportDoPointerApi, updatePlatformBeeCurrencySaveBeeApi, updateSavePlatformComposeApi } from '../api/anotherTFInterface'
import { T_RECEIVE_ITEM } from '../constant'

/**
 * @description 处理商品详情数据。半子商品是否可售，对应规格值是否可点击。根据ifEnable，为0可选择，为1不可选择
 * @param {Object} goodsDetail 商品数据
 * @returns
 */

export const resolveGoodsDetailSkuSituation = (goodsDetailOrigin) => new Promise(async (resolve, reject) => {
	try {
		const goodsDetail = JSON.parse(JSON.stringify(goodsDetailOrigin))
		if (!goodsDetail.receive || !goodsDetail.receive.receiveId) {
			return resolve(goodsDetailOrigin)
		}
		const resCanSale = await getBanziProductCanSaleApi({
			productId: goodsDetail.productId,
			receiveId: goodsDetail.receive.receiveId,
			skus: Object.values(goodsDetail.map || {}).map((i) => ({ skuId: i.skuId, number: 1 }))
		})
		const banSku = (JSON.parse(resCanSale.data.bzResp || '{}').ban || []).map((i) => resCanSale.data.banziSkuId2skuIdsMap[i]).filter((i) => i)
		// const banSku = [
		// 	// 332746,
		// 	// 332754,
		// 	// 332761,
		// 	// 332747,
		// 	// 332753,
		// 	// 332745,
		// 	// 332764,
		// 	// 332748,
		// 	// 332756,
		// 	// 332763,
		// 	// 332762,
		// 	// 332743,
		// 	// 332750,
		// 	// 332744,
		// 	// 332751,
		// 	// 332741,
		// 	// 332742,
		// 	// 332749,
		// 	// 332752,
		// 	332755, // dnm+222+8888的不行
		// 	332757, // nmsl+111之下的不行
		// 	332758,
		// 	332759,
		// 	332760
		// ]
		// const banSku = [ 331670 ]
		Object.keys(goodsDetail.map || {}).forEach((skuValueCodeItem) => {
			if (banSku.includes(goodsDetail.map[skuValueCodeItem].skuId)) {
				goodsDetail.map[skuValueCodeItem].ifEnable = 1
			}
		})
		goodsDetail.names.forEach((nameItem) => {
			if (nameItem.values && nameItem.values.length) {
				nameItem.values.forEach((tag) => {
					tag.ifEnable = 0
					// 还要进行初始化判断。如第一个规格的第一个规格值相关的产品都不可选，则该规格值不可点击。
				})
			}
		})
		resolve(goodsDetail)
	} catch (e) {
		console.log(e)
		uni.hideToast()
		// setTimeout(() => {
		// 	uni.showToast({ title: JSON.stringify(e), icon: 'none' })
		// }, 3000)
		// reject(goodsDetailOrigin)
		resolve(goodsDetailOrigin)
	}
})

/**
 * @description 处理商品详情的规格数据。
 * @param {Object} goodsDetail 商品数据
 * @param {Object} selectedAttr 已选择的规格及其值的键值对对象
 * @returns
 */

export const resolveGoodsDetailTagsSituation = (goodsDetailOrigin, selectedAttrOrigin, nameCode, tagItem) => {
	try {
		const goodsDetail = JSON.parse(JSON.stringify(goodsDetailOrigin))
		const selectedAttr = JSON.parse(JSON.stringify(selectedAttrOrigin))

		const isEverSelected = Object.keys(selectedAttr).includes(nameCode) // 是否曾经选中
		// 是否重复点击
		if (isEverSelected && (selectedAttr[nameCode] === tagItem.valueCode)) {
			delete selectedAttr[nameCode]
			// this.$forceUpdate()
		} else {
			// this.$set(this.selectedAttr, nameCode, tagItem.valueCode) // 当前选中
			selectedAttr[nameCode] = tagItem.valueCode
		}
		const nameCodeSelectedList = Object.keys(selectedAttr)
		// 找出都存在已经选择的规格的关联的sku
		const associatedSkus = Object.values(goodsDetail.map).filter((skuItem) => nameCodeSelectedList.every((nameCodeItem) => skuItem.valueCodes.split(',').includes(selectedAttr[nameCodeItem])))
		goodsDetail.names.forEach((nameItem) => {
			if (nameItem.values && nameItem.values.length) {
				if (nameCodeSelectedList.includes(nameItem.nameCode)) { // 对于选过的的规格 // 已经选择的情况
					// if (isEverSelected) { // 如果点击的是曾经选过的
					if (nameItem.nameCode !== nameCode) {
						nameItem.values.forEach((tag) => {
							if (
								Object.values(goodsDetail.map).filter((skuItem) => nameCodeSelectedList.filter((nameCodeItem) => nameCodeItem !== nameItem.nameCode).every((nameCodeItem) => skuItem.valueCodes.split(',').includes(selectedAttr[nameCodeItem]) && skuItem.valueCodes.split(',').includes(tag.valueCode)))
									.some((skuItem) => !skuItem.ifEnable)
							) {
								tag.ifEnable = 0
							} else {
								tag.ifEnable = 1
							}
						})
					}
					// } else {
					// 	// 如果点击的是没选过的
					// }
				} else { // 对于没选过的规格 // 一个一个地选的情况
					nameItem.values.forEach((tag) => {
						// 判断筛选出关联的sku里含有某个规格值的sku，这些产品是否全部都无法选择，是则让该规格值不可选择
						if (associatedSkus.filter((skuItem) => skuItem.valueCodes.split(',').includes(tag.valueCode)).every((skuItem) => skuItem.ifEnable)) {
							tag.ifEnable = 1
						} else {
							tag.ifEnable = 0
						}
					})
				}
			}
		})
		return { goodsDetail, selectedAttr }
	} catch (e) {
		console.log(e)
		return { goodsDetailOrigin, selectedAttrOrigin }
	}
}

/**
 * @description 处理订单的sku数据，并进行判断处理。
 * @param {Array} skus 一些sku数据
 * @returns
 */

export const resolveShowCanNotBuyMsg = (skusOrigin) => new Promise(async (resolve, reject) => {
	const canNotBuySkuList = []
	const canNotSaleSkuList = []
	try {
		const skus = JSON.parse(JSON.stringify(skusOrigin))
		// 循环sku，获取商品详情，并且判断库存
		uni.showLoading()
		const goodsDetailList = []
		for (const skusIndex in skus) {
			const skuItem = skus[skusIndex]
			let { data: goodsDetail } = await getProductDetailsByIdApi({
				shopId: skuItem.shopId,
				productId: skuItem.productId,
				skuId: skuItem.skuId,
				terminal: 1
			})
			goodsDetail = await resolveGoodsDetailSkuSituation(goodsDetail)
			goodsDetailList[skusIndex] = goodsDetail
		}
		uni.hideLoading()
		// 判断库存和可售状态
		for (const goodsDetailIndex in goodsDetailList) {
			const findSku = Object.values(goodsDetailList[goodsDetailIndex].map).find((skuItem) => skuItem.skuId === skus[goodsDetailIndex].skuId)
			if (findSku) {
				if (skus[goodsDetailIndex].number > findSku.stockNumber) {
					canNotBuySkuList.push(skus[goodsDetailIndex])
					// uni.showToast({ title: `“${skus[goodsDetailIndex].productName}”库存不足`, icon: 'none' })
					// break
				}
				if (findSku.ifEnable) {
					canNotSaleSkuList.push(skus[goodsDetailIndex])
					// uni.showToast({ title: `“${skus[goodsDetailIndex].productName}”不可售`, icon: 'none' })
					// break
				}
			}
		}
		if (canNotBuySkuList.length) {
			uni.showToast({ title: `“${canNotBuySkuList.map((i) => i.productName).join('，')}”库存不足`, icon: 'none' })
		} else if (canNotSaleSkuList.length) {
			uni.showToast({ title: `“${canNotSaleSkuList.map((i) => i.productName).join('，')}”不可售`, icon: 'none' })
		}
		resolve({ canNotBuySkuList, canNotSaleSkuList })
	} catch (e) {
		console.log(e)
		uni.hideToast()
		// reject(goodsDetailOrigin)
		resolve({ canNotBuySkuList, canNotSaleSkuList })
	}
})

// 订单结算
/**
 * @description 计算sku在整个运单价格中的剩余价值 1元的订单，打1折优惠之后，剩余价值就是0.1元。
 * @param {Object} settlement 一些数据
 * @returns
 */

export const resolveCalcSkuRemainMap = (params = {}) => {
	const { settlement, selectedPlatformCoupon, totalPrice } = Object.assign({
		settlement: { shops: [], skuCreditMap: {} },
		selectedPlatformCoupon: { couponId: '' },
		totalPrice: 0
	}, params)
	const skuRemainMapObj = {}
	for (let i = 0; i < settlement.shops.length; i++) {
		const curShop = settlement.shops[i]
		let checkedShopCoupon
		curShop.shopCoupons.forEach((item) => {
			if (item.checked) checkedShopCoupon = item
		})
		for (let j = 0; j < curShop.skus.length; j++) {
			const curSku = curShop.skus[j]
			// 不是定价捆绑，并且有配置可抵扣的积分，才有必要计算比例
			if (!curSku.priceId && (settlement.skuCreditMap[curSku.skuId] > 0)) {
				let remainSkuMoney = curSku.price * curSku.number
				if (checkedShopCoupon) {
					if (checkedShopCoupon.couponType === 1) {
						// 这个规格商品要支付的金额=原来的金额-优惠的金额（满减*这个规格商品在这个店铺所有商品里所占的比例）
						remainSkuMoney = remainSkuMoney - checkedShopCoupon.reduceMoney * (remainSkuMoney / curShop.total)
					} else {
						remainSkuMoney = remainSkuMoney * checkedShopCoupon.reduceMoney / 10
					}
				}
				// 使用平台券
				if (selectedPlatformCoupon && selectedPlatformCoupon.couponId && (remainSkuMoney > 0)) {
					if (selectedPlatformCoupon.couponType === 1) { // 满减
						// 这个规格商品要支付的金额=原来的金额-优惠的金额（满减*这个规格商品在所有店铺所有商品里所占的比例）
						remainSkuMoney = remainSkuMoney - selectedPlatformCoupon.reduceMoney * (remainSkuMoney / totalPrice)
					} else { // 折扣
						remainSkuMoney = remainSkuMoney * selectedPlatformCoupon.reduceMoney / 10
					}
				}
				skuRemainMapObj[curSku.skuId] = remainSkuMoney
			}
		}
	}
	return skuRemainMapObj
}

/**
 * @description 处理订单的积分计算。
 * @param {Object} settlement 一些数据
 * @returns
 */

export const resolveCalcCredit = (params = {}) => {
	const { settlement, selectedPlatformCoupon, totalPrice: totalPriceOrigin, integralRatio, selectIntegral: selectIntegralOrigin } = Object.assign({
		settlement: { shops: [], skuCreditMap: {} },
		selectedPlatformCoupon: { couponId: '' },
		totalPrice: 0,
		integralRatio: 0,
		selectIntegral: true
	}, params)
	let integralNum = 0
	let totalPrice = totalPriceOrigin
	let selectIntegral = selectIntegralOrigin
	const skuRemainMapObj = resolveCalcSkuRemainMap({ settlement, selectedPlatformCoupon, totalPrice })
	if (settlement.skuCreditMap && Object.values(settlement.skuCreditMap).length && (integralRatio > 0)) {
		// 只有订单金额达到阈值，并且用户还有剩余的积分，才能进行积分抵扣
		if ((totalPrice >= settlement.orderCreditThreshold) && (settlement.userTotalCredit > 0) && (settlement.creditDeductLimit > 0)) { // orderCreditThreshold: 0, // 满多少元可以抵扣
			for (let i = 0; i < settlement.shops.length; i++) {
				const curShop = settlement.shops[i]
				for (let j = 0; j < curShop.skus.length; j++) {
					const skuId = curShop.skus[j].skuId
					if ((settlement.skuCreditMap[skuId] > 0) && (skuRemainMapObj[skuId] > 0) && (settlement.userTotalCredit > 0) && ((Math.round((totalPrice + Number.EPSILON) * 100) / 100) > 0)) {
						// 抵扣之后，必须保证整个订单至少还有0.01元，可用于支付
						if ((settlement.creditDeductLimit - skuRemainMapObj[skuId]) < 0.01) skuRemainMapObj[skuId] -= 0.01
						// 按照比例换算成需要多少积分抵扣(取整)
						let finalSkuCredit = parseInt((skuRemainMapObj[skuId] / integralRatio).toString())
						// 优先以商家配置的商品可抵扣积分为准
						if (settlement.skuCreditMap[skuId] < finalSkuCredit) finalSkuCredit = settlement.skuCreditMap[skuId]
						// 不能超过用户剩余积分
						if (finalSkuCredit > settlement.userTotalCredit) finalSkuCredit = settlement.userTotalCredit
						// 不能超过整个订单可抵扣积分
						if (finalSkuCredit > settlement.creditDeductLimit) finalSkuCredit = settlement.creditDeductLimit
						curShop.skus[j].cachedCredit = finalSkuCredit
						integralNum += finalSkuCredit
					}
				}
			}
		}
		// 计算抵扣价格
		integralNum = parseInt(integralNum)
		if (integralNum) { // 有积分抵扣
			if (selectIntegral) totalPrice = totalPrice - (integralNum * integralRatio)
		}
	}
	if (!integralNum && selectIntegral) selectIntegral = false // 没积分抵扣
	return { integralNum, totalPrice, selectIntegral }
}

/**
 * @description 计算总价，商家券的优惠计算，在调用本方法之前已经计算好在shops[].totalAfterDiscount
 * @param {Object} settlement 一些数据
 * @returns
 */

export const resolveCalcOrderTotal = (params = {}) => {
	const { settlement, selectedPlatformCoupon, integralRatio, selectIntegral: selectIntegralOrigin } = Object.assign({
		settlement: { shops: [], skuCreditMap: {} },
		selectedPlatformCoupon: { couponId: '' },
		integralRatio: 0,
		selectIntegral: true
	}, params)
	let integralNum = 0
	let totalPrice = 0
	let selectIntegral = selectIntegralOrigin
	let shopSumPrice = 0
	for (let i = 0; i < settlement.shops.length; i++) {
		totalPrice += parseFloat(Number(settlement.shops[i].totalAfterDiscount))
		shopSumPrice += parseFloat(Number(settlement.shops[i].totalAfterDiscount))
	}
	if (selectedPlatformCoupon && selectedPlatformCoupon.couponId) {
		const couponType = selectedPlatformCoupon.couponType
		const reduceMoney = selectedPlatformCoupon.reduceMoney
		if (couponType === 1 && totalPrice - reduceMoney > 0) { // 满减
			totalPrice = shopSumPrice - reduceMoney
		} else if (couponType === 2 && reduceMoney > 0) { // 折扣
			const useMoney = selectedPlatformCoupon.useMoney
			totalPrice = (shopSumPrice - useMoney) + useMoney * reduceMoney / 10
		}
	}
	const creditObj = resolveCalcCredit({ // 积分支付计算
		settlement,
		selectedPlatformCoupon,
		totalPrice,
		integralRatio,
		selectIntegral
	})
	integralNum = creditObj.integralNum
	selectIntegral = creditObj.selectIntegral
	totalPrice = creditObj.totalPrice
	// 加上每个商家的运费
	settlement.shops.forEach((item) => {
		totalPrice = totalPrice + (item.distribution.distributionPrice || 0)
	})
	return { integralNum, selectIntegral, totalPrice }
}

/**
 * @description 积分选择处理。积分价格计算
 * @param {Number} totalPrice 总价
 * @returns
 */

export const resolveIntegralSelect = (params = {}) => {
	const { vm, settlement, totalPrice: totalPriceOrigin, integralNum, integralRatio, selectIntegral: selectIntegralOrigin, payInfo } = Object.assign({
		vm: {},
		settlement: { shops: [] },
		selectIntegral: true,
		totalPrice: 0,
		integralNum: 0,
		integralRatio: 0,
		payInfo: { paymentMode: '', huabeiPeriod: -1 }
	}, params)
	let selectIntegral = selectIntegralOrigin
	let totalPrice = totalPriceOrigin
	if ((payInfo.paymentMode === 11) && (selectIntegral === false)) {
		selectIntegral = true
		vm && vm.$nextTick && vm.$nextTick(() => {
			vm.selectIntegral = false
		})
		uni.showToast({ title: '已选择代金券支付，无法使用其它优惠', icon: 'none' })
	} else if (settlement.shops.some((a) => a.skus.some((b) => b.counterType === 1)) && (selectIntegral === false)) {
		selectIntegral = true
		vm && vm.$nextTick && vm.$nextTick(() => {
			vm.selectIntegral = false
		})
		uni.showToast({ title: '包含兑换专柜商品，无法使用积分！', icon: 'none' })
	} else {
		selectIntegral = !selectIntegral
		if (selectIntegral) {
			totalPrice = totalPrice - (integralNum * integralRatio)
		} else {
			totalPrice = totalPrice + (integralNum * integralRatio)
		}
	}
	return { selectIntegral, totalPrice }
}

/**
 * @description 处理使用店铺优惠券相关计算和判断。
 * @param {Object} settlement 一些数据
 * @returns
 */

export const resolveUseShopCoupon = (params = {}) => {
	const { settlement: settlementOrigin, shopIndex, couponIndex } = Object.assign({
		settlement: { shops: [] },
		shopIndex: 0,
		couponIndex: 0
	}, params)
	const settlement = JSON.parse(JSON.stringify(settlementOrigin))
	const couponItem = settlement.shops[shopIndex].shopCoupons[couponIndex]
	if (!couponItem) return false
	const curShop = settlement.shops[shopIndex]
	curShop.totalAfterDiscount = 0
	let isUseShopCoupon = false
	const matchCouponNormalSkuList = []
	const matchCouponPriceSkuList = []
	if (couponItem.applyType !== 1) {
		// 符合优惠券商品列表中的普通sku价格综合
		let matchCouponNormalPrice = 0
		// 符合定价捆绑且在优惠券商品列表中的价格综合
		let matchCouponPricePrice = 0
		// 符合定价捆绑活动的sku数量
		let priceCount = 0
		for (let idx = 0; idx < curShop.skus.length; idx++) {
			if (curShop.skus[idx].priceId) priceCount++
			if (couponItem.ids.indexOf(curShop.skus[idx].productId) > -1) {
				if (curShop.skus[idx].priceId) {
					matchCouponPriceSkuList.push(curShop.skus[idx])
				} else {
					matchCouponNormalSkuList.push(curShop.skus[idx])
					matchCouponNormalPrice = matchCouponNormalPrice + curShop.skus[idx].price * curShop.skus[idx].number
				}
			}
		}
		// 如果定价捆绑的所有sku都符合优惠券
		if (priceCount === matchCouponPriceSkuList.length) matchCouponPricePrice = curShop.priceAfterDiscount
		// 符合的sku的price加起来是否满足满减的条件
		const priceFinal = matchCouponPricePrice + matchCouponNormalPrice
		if (priceFinal < couponItem.fullMoney || (couponItem.couponType === 1 && priceFinal <= couponItem.reduceMoney)) return false
		// 判断是满减，还是折扣
		if (couponItem.couponType === 1) {
			curShop.totalAfterDiscount = curShop.total - couponItem.reduceMoney
			isUseShopCoupon = true
		} else {
			const tmpTotal = curShop.total - (priceFinal * ((10 - couponItem.reduceMoney) / 10)).toFixed(2) // total减去折扣
			if (tmpTotal.toFixed(2) > 0) {
				curShop.totalAfterDiscount = tmpTotal.toFixed(2)
				isUseShopCoupon = true
			}
		}
		if (isUseShopCoupon) {
			// 满足的sku设置buyerShopCouponId
			if (priceCount === matchCouponPriceSkuList.length) {
				for (let idx = 0; idx < matchCouponPriceSkuList.length; idx++) {
					matchCouponPriceSkuList[idx].buyerShopCouponId = couponItem.shopCouponId
				}
			}
			for (let idx = 0; idx < matchCouponNormalSkuList.length; idx++) {
				matchCouponNormalSkuList[idx].buyerShopCouponId = couponItem.shopCouponId
			}
		}
	} else {
		if (couponItem.couponType === 1) {
			if (curShop.total > couponItem.reduceMoney) {
				curShop.totalAfterDiscount = curShop.total - couponItem.reduceMoney
				isUseShopCoupon = true
			}
		} else if (curShop.total > couponItem.fullMoney) {
			const tmpTotal = curShop.total - (curShop.total * ((10 - couponItem.reduceMoney) / 10)).toFixed(2)
			if (tmpTotal.toFixed(2) > 0) {
				curShop.totalAfterDiscount = tmpTotal.toFixed(2)
				isUseShopCoupon = true
			}
		}
		if (isUseShopCoupon) {
			for (let idx = 0; idx < curShop.skus.length; idx++) {
				curShop.skus[idx].buyerShopCouponId = couponItem.shopCouponId
			}
		}
	}
	return { settlement, isUseShopCoupon }
}

/**
 * @description 处理使用店铺优惠券选择。
 * @param {Object} settlement 一些数据
 * @returns
 */

export const resolveShopCouponItemSelect = (params = {}) => {
	const { settlement: settlementOrigin, shopIndex, couponIndex, isShowShopCoupons: isShowShopCouponsOrigin, selectedShopCouponList: selectedShopCouponListOrigin, selectedPlatformCoupon } = Object.assign({
		settlement: { shops: [] },
		shopIndex: 0,
		couponIndex: 0,
		isShowShopCoupons: false,
		selectedShopCouponList: [],
		selectedPlatformCoupon: { couponId: '' }
	}, params)
	let settlement = JSON.parse(JSON.stringify(settlementOrigin))
	let couponItem = settlement.shops[shopIndex].shopCoupons[couponIndex]
	let isShowShopCoupons = isShowShopCouponsOrigin
	let selectedShopCouponList = JSON.parse(JSON.stringify(selectedShopCouponListOrigin))
	let isSuccess = false
	// 取消选择优惠券
	if (couponItem.checked) {
		couponItem.checked = false
		settlement.shops[shopIndex].totalAfterDiscount = settlement.shops[shopIndex].total
		settlement.shops[shopIndex].currentCoupon = {}
		isShowShopCoupons = false
		selectedShopCouponList = []
		isSuccess = true
	} else if (settlement.shops.some((a) => a.skus.some((b) => b.counterType === 1))) {
		uni.showToast({ title: '包含兑换专柜商品，无法使用商家券！', icon: 'none' })
	} else if (settlement.shops[shopIndex].total < couponItem.fullMoney) {
		uni.showToast({ title: '不满足优惠券使用条件！', icon: 'none' })
	} else if ((couponItem.couponType === 1) && (settlement.shops[shopIndex].total <= couponItem.reduceMoney)) {
		uni.showToast({ title: '不可使用大于或等于商品金额的优惠劵！', icon: 'none' }) // 优惠券优惠金额不能大于等于合计金额！
	} else if (selectedPlatformCoupon && selectedPlatformCoupon.couponId) {
		uni.showToast({ title: '此券不可与平台券叠加！', icon: 'none' })
	} else { // 选择优惠券
		isShowShopCoupons = false
		// console.log(couponItem === settlement.shops[shopIndex].shopCoupons[couponIndex]) // true
		const useShopCouponObj = resolveUseShopCoupon({ settlement, shopIndex, couponIndex })
		settlement = useShopCouponObj.settlement
		// console.log(couponItem === settlement.shops[shopIndex].shopCoupons[couponIndex]) // false
		couponItem = settlement.shops[shopIndex].shopCoupons[couponIndex]
		if (useShopCouponObj.isUseShopCoupon) {
			for (let i = 0; i < settlement.shops[shopIndex].shopCoupons.length; i++) {
				settlement.shops[shopIndex].shopCoupons[i].checked = false
			}
			selectedShopCouponList = selectedShopCouponList.filter((item) => item.id !== couponItem.id)
			couponItem.checked = true
			settlement.shops[shopIndex].currentCoupon = couponItem
			settlement.shops[shopIndex].skus.forEach((item) => {
				if (item.buyerShopCouponId && (item.buyerShopCouponId !== couponItem.shopCouponId)) item.buyerShopCouponId = null
			})
			selectedShopCouponList.push(JSON.parse(JSON.stringify(couponItem)))
		} else {
			settlement.shops[shopIndex].totalAfterDiscount = settlement.shops[shopIndex].total
		}
		isSuccess = true
	}
	return { settlement, isShowShopCoupons, selectedShopCouponList, isSuccess }
}

/**
 * @description 处理使用平台优惠券选择。
 * @param {Object} settlement 一些数据
 * @returns
 */

export const resolvePlatformCouponItemSelect = (params = {}) => {
	const { settlement: settlementOrigin, couponIndex, isShowPlatformCoupon: isShowPlatformCouponOrigin, selectedPlatformCoupon: selectedPlatformCouponOrigin, selectedShopCouponList } = Object.assign({
		settlement: { shops: [], coupons: [] },
		couponIndex: 0,
		isShowPlatformCoupon: false,
		selectedPlatformCoupon: { couponId: '' },
		selectedShopCouponList: []
	}, params)
	const settlement = JSON.parse(JSON.stringify(settlementOrigin))
	const couponItem = settlement.coupons[couponIndex]
	let isShowPlatformCoupon = isShowPlatformCouponOrigin
	let selectedPlatformCoupon = JSON.parse(JSON.stringify(selectedPlatformCouponOrigin))
	let isSuccess = false
	if (settlement.shops.some((a) => a.skus.some((b) => b.counterType === 1))) return uni.showToast({ title: '包含兑换专柜商品，无法使用平台券！', icon: 'none' })
	if (!couponItem.checked && selectedShopCouponList.length) return uni.showToast({ title: '不可与商家券叠加使用！', icon: 'none' })
	if (couponItem.checked) { // 已选中的情况下取消选中
		couponItem.checked = false
		isShowPlatformCoupon = false
		selectedPlatformCoupon = { couponId: '' }
		settlement.shops.forEach((shopItem) => {
			shopItem.skus && shopItem.skus.forEach((skuItem) => {
				skuItem.buyerCouponId = null
			})
		})
		isSuccess = true
	} else {
		settlement.coupons && settlement.coupons.forEach((item) => {
			item.checked = false // 先把所有已选中的平台优惠券改为未选中
		})
		let totalPrice = 0 // 订单总价
		let matchCouponSkuList = []
		for (let i = 0; i < settlement.shops.length; i++) {
			let matchCouponNormalPrice = 0
			let priceCount = 0
			const curShop = settlement.shops[i]
			const tmpPriceSkuList = []
			for (let j = 0; j < settlement.shops[i].skus.length; j++) {
				const curSku = curShop.skus[j]
				if (curSku.priceId) {
					priceCount++
				}
				if (couponItem.ids.indexOf(curSku.productId) > -1) {
					if (curSku.priceId) {
						tmpPriceSkuList.push(curSku)
					} else {
						matchCouponSkuList.push(curSku)
						matchCouponNormalPrice = matchCouponNormalPrice + curSku.price * curSku.number
					}
				}
			}
			if (priceCount === tmpPriceSkuList.length) {
				totalPrice += curShop.priceAfterDiscount
				matchCouponSkuList = matchCouponSkuList.concat(tmpPriceSkuList)
			}
			totalPrice += matchCouponNormalPrice
		}
		if (settlement.shops.every((item) => item.total < couponItem.fullMoney)) {
			uni.showToast({ title: '不满足优惠券使用条件！', icon: 'none' })
		} else if ((couponItem.couponType === 1) && (couponItem.reduceMoney >= totalPrice)) {
			uni.showToast({ title: '不可使用大于等于合计金额的优惠劵！', icon: 'none' })
		} else {
			// 如果是折扣券，需要记录，在什么基数上打折
			couponItem.useMoney = totalPrice
			isShowPlatformCoupon = false
			selectedPlatformCoupon = couponItem
			matchCouponSkuList.forEach((item) => {
				item.buyerCouponId = couponItem.couponId
			})
			couponItem.checked = true // 选中优惠券
			isSuccess = true
		}
	}
	return { settlement, isShowPlatformCoupon, selectedPlatformCoupon, isSuccess }
}

/**
 * @description 组装结算数据
 * @param {Object} settlement 一些数据
 * @returns
 */

export const resolveOrderPackageData = (params = {}) => {
	const { settlement, userAddressInfo, skuItemMsgList, skuItemInfo, selectedPlatformCoupon, selectIntegral, integralRatio, totalPrice, otherInfo } = Object.assign({
		settlement: { shops: [] },
		userAddressInfo: { receiveId: '' },
		skuItemMsgList: [],
		skuItemInfo: {},
		selectedPlatformCoupon: { couponId: '' },
		selectIntegral: true,
		integralRatio: 0,
		totalPrice: 0,
		otherInfo: {}
	}, params)
	uni.showLoading({ mask: true, title: '订单提交中...' })
	let pointProductIds = ''
	let sumitType = ''
	if (skuItemMsgList) {
		if (skuItemMsgList[0].shopDiscountId) {
			sumitType = 4
		} else if (skuItemMsgList[0].shopSeckillId) {
			sumitType = 3
		}
	} else if (skuItemInfo) {
		sumitType = skuItemInfo.type // 1发起拼团(单独开团)，2参与拼团(拼团)
	}
	const data = {
		shopDiscountId: null,
		collageId: (skuItemInfo && skuItemInfo.collageId) || 0,
		type: sumitType, // 1发起拼团，2参与拼团，3秒杀活动，4限时折扣活动
		// type: this.fromType, // 1立即购买，2购物车结算，3拼团商品立即购买
		shopGroupWorkId: (skuItemInfo && skuItemInfo.shopGroupWorkId) || 0,
		receiveId: userAddressInfo.receiveId,
		areaId: userAddressInfo.areaId,
		communityId: userAddressInfo.communityId,
		couponId: (selectedPlatformCoupon && selectedPlatformCoupon.couponId) || 0,
		price: totalPrice,
		remark: otherInfo.remark,
		shops: [],
		discountPrice: 0,
		shopSeckillId: null,
		franchiseePhone: otherInfo.benefitinFranchiseesPhone, // 加盟商号码。不是加盟商就不用传。
		communityPhone: otherInfo.communityPhone, // 选择的小区的ID
		franchiseeRule: otherInfo.commissionSharingRatio || [], // 小区店和加盟商分佣比例。
		// voucherId: settlement.voucherList[0] && settlement.voucherList[0].platformVoucherId || ''
		voucherId: otherInfo.voucherId || '' // 选择代金券支付后选择的代金券Id
	}
	if (skuItemMsgList && skuItemMsgList.length) {
		if (skuItemMsgList[0].shopDiscountId) {
			data.shopDiscountId = skuItemMsgList[0].shopDiscountId
		} else if (skuItemMsgList[0].shopSeckillId) {
			data.shopSeckillId = skuItemMsgList[0].shopSeckillId
		}
	}
	for (let shopIndex = 0; shopIndex < settlement.shops.length; shopIndex++) {
		const shopObj = {}
		shopObj.shopId = settlement.shops[shopIndex].shopId
		shopObj.sceneId = settlement.shops[shopIndex].sceneId
		shopObj.distribution = {}
		shopObj.skus = []
		if (settlement.shops[shopIndex].currentCoupon) shopObj.id = settlement.shops[shopIndex].currentCoupon.id
		data.shops.push(shopObj)
		data.shops[shopIndex].distribution.distributionPrice = settlement.shops[shopIndex].distribution.distributionPrice
		data.shops[shopIndex].distribution.distributionName = settlement.shops[shopIndex].distribution.distributionName
		for (let m = 0; m < settlement.shops[shopIndex].skus.length; m++) {
			const skusobj = {}
			const curSku = settlement.shops[shopIndex].skus[m]
			skusobj.skuId = curSku.skuId
			skusobj.number = curSku.number
			skusobj.ifLogistics = curSku.ifLogistics
			skusobj.distribution = curSku.distribution
			skusobj.selected = curSku.selected
			skusobj.platformSeckillId = curSku.platformSeckillId
			skusobj.platformDiscountId = curSku.platformDiscountId
			skusobj.platformCurrencyId = curSku.platformCurrencyId
			skusobj.platformComposeId = curSku.platformComposeId
			skusobj.shopSeckillId = curSku.shopSeckillId
			skusobj.shopDiscountId = curSku.shopDiscountId
			skusobj.sceneId = curSku.sceneId
			skusobj.priceId = curSku.priceId
			skusobj.useMember = curSku.useMember
			skusobj.composeId = curSku.composeId
			pointProductIds += curSku.productId + ',' // 处理埋点id
			if (selectIntegral && curSku.cachedCredit) { // 积分传参
				skusobj.useCredit = curSku.cachedCredit
				skusobj.useCreditAmount = (curSku.cachedCredit * integralRatio).toFixed(2)
			}
			data.shops[shopIndex].skus.push(skusobj)
		}
	}
	if (pointProductIds.endsWith(',')) pointProductIds = pointProductIds.slice(0, -1) // 去除最后一个,
	uni.hideLoading()
	return { data, pointProductIds }
}

/**
 * @description 提交订单@return {Promise<void>}
 * @param {Object} settlement 一些数据
 * @returns
 */

export const resolveSubmitOrder = async (params = {}) => {
	const { isPayImmediately, settlement, userAddressInfo, skuItemMsgList, skuItemInfo, selectedPlatformCoupon, selectIntegral, integralRatio, totalPrice, otherInfo, payInfo, hasPrice, shamPriceText } = Object.assign({
		isPayImmediately: false,
		settlement: { shops: [] },
		userAddressInfo: { receiveId: '' },
		skuItemMsgList: [],
		skuItemInfo: {},
		selectedPlatformCoupon: { couponId: '' },
		selectIntegral: true,
		integralRatio: 0,
		totalPrice: 0,
		otherInfo: {},
		payInfo: {},
		hasPrice: false,
		shamPriceText: '支付金额必须大于零'
	}, params)
	if (otherInfo.isCanPay) {
		if (isPayImmediately) {
			await handleDoPay({ collageId: otherInfo.collageId, money: totalPrice, orderId: otherInfo.orderId, ...payInfo, type: 2 }, 1, '')
		} else {
			// 检查提交表单
			if (hasPrice && (Number(totalPrice) <= 0)) return uni.showToast({ title: shamPriceText, icon: 'none' })
			if (settlement.shops.some((a) => a.skus.some((b) => b.counterType === 1))) {
				if (!settlement.userVoucherDeductLimit) {
					return uni.showToast({ title: '代金券数量不足！', icon: 'none' })
				} else if (!settlement.userVoucherDeductLimit) {
					return uni.showToast({ title: '商品不支持代金券！', icon: 'none' })
				} else if (payInfo.paymentMode !== 11) {
					return uni.showToast({ title: '包含兑换专柜商品，只能用代金券支付！', icon: 'none' })
				}
			}
			if (!payInfo.paymentMode) return uni.showToast({ title: '请选择支付方式', icon: 'none' })
			if (!userAddressInfo.receiveId) return uni.showToast({ title: '请选择收货地址', icon: 'none' })
			// 处理表单
			const orderPackageDataObj = resolveOrderPackageData({
				settlement,
				userAddressInfo,
				skuItemMsgList,
				skuItemInfo,
				selectedPlatformCoupon,
				selectIntegral,
				integralRatio,
				totalPrice,
				otherInfo
			})
			uni.showLoading({ mask: true, title: '结算中...' })
			try {
				const res = await updatePlaceOrderSubmitApi({ ...orderPackageDataObj.data, paymentMode: payInfo.paymentMode, _isShowToast: false }) // 通过_isShowToast为false更全面
				// 下单成功处理埋点
				addUserTrackReportDoPointerApi({
					eventType: 3,
					productIds: orderPackageDataObj.pointProductIds
				})
				if (settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId))) {
				} else {
					updatePlatformBeeCurrencySaveBeeApi({
						orderId: res.data.orderId
					})
				}
				if (settlement.shops.every((a) => a.skus.every((b) => !b.platformComposeId))) {
				} else {
					updateSavePlatformComposeApi({
						orderId: res.data.orderId
					})
				}
				// type订单类型1-父订单2-子订单
				await handleDoPay({ ...res.data, ...payInfo, type: 1 }, 1, { 1: 'shoppingMall', 2: 'businessDistrict' }[settlement.shopType] || 'DEFAULT')
			} catch (e) {
				if (e.data) uni.showToast({ title: `${e.data.message}-${e.data.errorData}`, icon: 'none' })
				else uni.showToast({ title: `请求：${e.errMsg}`, icon: 'none' }) // 请求失败或请求错误
			} finally {
				uni.hideLoading()
			}
		}
	} else {
		uni.showToast({ title: '无法结算', icon: 'none' })
	}
}

/**
 * @description 处理使用代金券数据。
 * @param {Object} settlement 一些数据
 * @returns
 */

export const resolveVoucherData = (params = {}) => {
	const { settlement, voucherObj: voucherObjOrigin } = Object.assign({
		settlement: { shops: [] },
		voucherObj: { isCanVoucher: false, noVoucherText: '无法使用代金券支付' }
	}, params)
	let voucherObj = JSON.parse(JSON.stringify(voucherObjOrigin))
	if (settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId))) {
		if (settlement.shops.every((a) => a.skus.every((b) => !b.platformComposeId))) {
			if (settlement.voucherTotalAll) { // 所有商品可使用多少代金券抵扣
				if (settlement.shops.some((item) => settlement.userVoucherDeductLimit >= item.voucherTotal)) { // 用户代金券余额-某个店铺的所有订单商品可使用多少代金券抵扣
					voucherObj = { isCanVoucher: true, noVoucherText: '' }
				} else {
					voucherObj = { isCanVoucher: false, noVoucherText: '代金券数量不足！' }
				}
			} else {
				voucherObj = { isCanVoucher: false, noVoucherText: '商品不支持代金券！' }
			}
		} else {
			voucherObj = { isCanVoucher: false, noVoucherText: '包含组合活动商品，无法使用代金券！' }
		}
	} else {
		voucherObj = { isCanVoucher: false, noVoucherText: '包含消费金活动商品，无法使用代金券！' }
	}
	return { voucherObj }
}

/**
 * @description 处理使用代金券支付选择。
 * @param {Object} settlement 一些数据
 * @returns
 */

export const resolveVoucherPaySelect = (params = {}) => {
	const { settlement: settlementOrigin, selectedPlatformCoupon: selectedPlatformCouponOrigin, selectedShopCouponList: selectedShopCouponListOrigin, selectIntegral: selectIntegralOrigin } = Object.assign({
		settlement: { shops: [], coupons: [] },
		selectedPlatformCoupon: { couponId: '' },
		selectedShopCouponList: [],
		selectIntegral: true
	}, params)
	const settlement = JSON.parse(JSON.stringify(settlementOrigin))
	let selectedShopCouponList = JSON.parse(JSON.stringify(selectedShopCouponListOrigin))
	let selectedPlatformCoupon = JSON.parse(JSON.stringify(selectedPlatformCouponOrigin))
	let selectIntegral = selectIntegralOrigin
	// 清除店铺优惠券数据
	for (let i = 0; i < settlement.shops.length; i++) {
		for (let cIndex = 0; cIndex < settlement.shops[i].shopCoupons.length; cIndex++) {
			settlement.shops[i].shopCoupons[cIndex].checked = false
		}
		settlement.shops[i].currentCoupon = {}
		settlement.shops[i].totalAfterDiscount = settlement.shops[i].total
	}
	selectedShopCouponList = []
	// 清除平台优惠券数据
	settlement.coupons && settlement.coupons.forEach((item) => {
		item.checked = false
	})
	selectedPlatformCoupon = { couponId: '' }
	settlement.shops.forEach((shopItem) => {
		if (shopItem.skus) {
			shopItem.skus.forEach((skuItem) => {
				skuItem.buyerCouponId = null
			})
		}
	})
	selectIntegral = false // 取消选择积分
	return { settlement, selectedShopCouponList, selectedPlatformCoupon, selectIntegral }
}

// /**
//  * @description 处理使用代金券选择。
//  * @param {Object} settlement 一些数据
//  * @returns
//  */

// export const resolveVoucherSelect = (params = {}) => {
// 	const { settlement: settlementOrigin, voucherId, selectedPlatformCoupon: selectedPlatformCouponOrigin, selectedShopCouponList: selectedShopCouponListOrigin, selectIntegral: selectIntegralOrigin, voucherObj: voucherObjOrigin } = Object.assign({
// 		settlement: { shops: [], coupons: [] },
// 		voucherId: 0,
// 		selectedPlatformCoupon: { couponId: '' },
// 		selectedShopCouponList: [],
// 		selectIntegral: true,
// 		voucherObj: { voucherTotalAll: 0, isVoucher: false, voucherId: 0 }
// 	}, params)
// 	const settlement = JSON.parse(JSON.stringify(settlementOrigin))
// 	let selectedShopCouponList = JSON.parse(JSON.stringify(selectedShopCouponListOrigin))
// 	let selectedPlatformCoupon = JSON.parse(JSON.stringify(selectedPlatformCouponOrigin))
// 	let selectIntegral = selectIntegralOrigin
// 	const voucherObj = JSON.parse(JSON.stringify(voucherObjOrigin))
// 	let isSuccess = false
// 	let isFail = false
// 	if (voucherId) {
// 		if (settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId))) {
// 			if (settlement.shops.every((a) => a.skus.every((b) => !b.platformComposeId))) {
// 				if (settlement.voucherTotalAll) { // 所有商品可使用多少代金券抵扣
// 					if (settlement.shops.some((item) => settlement.userVoucherDeductLimit >= item.voucherTotal)) { // 用户代金券余额-某个店铺的所有订单商品可使用多少代金券抵扣
// 						// 清除店铺优惠券数据
// 						for (let i = 0; i < settlement.shops.length; i++) {
// 							for (let cIndex = 0; cIndex < settlement.shops[i].shopCoupons.length; cIndex++) {
// 								settlement.shops[i].shopCoupons[cIndex].checked = false
// 							}
// 							settlement.shops[i].currentCoupon = {}
// 							settlement.shops[i].totalAfterDiscount = settlement.shops[i].total
// 						}
// 						selectedShopCouponList = []
// 						// 清除平台优惠券数据
// 						settlement.coupons && settlement.coupons.forEach((item) => {
// 							item.checked = false
// 						})
// 						selectedPlatformCoupon = { couponId: '' }
// 						settlement.shops.forEach((shopItem) => {
// 							if (shopItem.skus) {
// 								shopItem.skus.forEach((skuItem) => {
// 									skuItem.buyerCouponId = null
// 								})
// 							}
// 						})
// 						selectIntegral = false // 取消选择积分
// 					} else {
// 						uni.showToast({ title: '代金券数量不足！', icon: 'none' })
// 						isFail = true
// 					}
// 				} else {
// 					uni.showToast({ title: '商品不支持代金券！', icon: 'none' })
// 					isFail = true
// 				}
// 			} else {
// 				uni.showToast({ title: '包含组合活动商品，无法使用代金券！', icon: 'none' })
// 				isFail = true
// 			}
// 		} else {
// 			uni.showToast({ title: '包含消费金活动商品，无法使用代金券！', icon: 'none' })
// 			isFail = true
// 		}
// 	}
// 	if (isFail) {
// 		voucherObj.voucherTotalAll = 0
// 		voucherObj.isVoucher = false
// 		voucherObj.voucherId = 0
// 	} else {
// 		voucherObj.voucherTotalAll = voucherId === 0 ? 0 : settlement.voucherTotalAll
// 		voucherObj.isVoucher = voucherId !== 0
// 		voucherObj.voucherId = voucherId
// 	}
// 	isSuccess = true
// 	return { settlement, selectedShopCouponList, selectedPlatformCoupon, selectIntegral, voucherObj, isSuccess, isFail }
// }

/**
 * @description 获取订单信息
 * @param {Boolean} isGroup 是否是拼团
 * @returns
 */

export const resolveGetOrderSettlement = async (params = {}) => {
	const { isExchangeCounter, isProductPay, isGroup, fromType, brandId, skuItemInfo, skuItemMsgList, isShowShopCoupons: isShowShopCouponsOrigin, selectedShopCouponList: selectedShopCouponListOrigin, selectedPlatformCoupon } = Object.assign({
		isExchangeCounter: false,
		isProductPay: false,
		isGroup: false,
		fromType: 0,
		brandId: 0,
		skuItemInfo: {},
		skuItemMsgList: [],
		isShowShopCoupons: false,
		selectedShopCouponList: [],
		selectedPlatformCoupon: { couponId: '' }
	}, params)
	let isShowShopCoupons = isShowShopCouponsOrigin
	let selectedShopCouponList = JSON.parse(JSON.stringify(selectedShopCouponListOrigin))
	let userAddressInfo = { receiveId: '' }
	let settlement = { voucherList: [], shops: [] }
	let isSuccess = false
	uni.showLoading({ title: '加载中...' })
	if (uni.getStorageSync(T_RECEIVE_ITEM)) userAddressInfo = uni.getStorageSync(T_RECEIVE_ITEM)
	let _url = ''
	let _data = ''
	if (isGroup) { // 是否是拼团
		_url = getGroupSettlementWorkApi
		_data = skuItemInfo
	} else {
		_url = getSettlementOrderApi
		_data = {
			type: fromType,
			shopId: brandId,
			shops: skuItemMsgList,
			receiveId: userAddressInfo.receiveId
		}
	}
	await _url(_data).then((res) => {
		uni.hideLoading()
		// // 如果没有地址时进入购买宝贝页面对下面的商品件数和总计进行赋值
		// if (!res.data.receive.receiveId) totalPrice = res.data.shops.reduce((total, value, index, arr) => total + value.total, 0)
		// 初始化平台券选中状态
		res.data.coupons && res.data.coupons.forEach((item) => {
			item.checked = false
		})
		res.data.shops.forEach((item) => {
			item.totalAfterDiscount = item.total
		})
		// res.data.shops[0].shopCoupons = [
		// 	{ id: 111, ids: [ 12849 ], couponType: 1, reduceMoney: 4, fullMoney: 10, startTime: 'hvgdfbyhfd', endTime: 'hvgdfbyhfd' },
		// 	{ id: 222, ids: [ 12849 ], couponType: 2, reduceMoney: 8, fullMoney: 12, startTime: 'hvgdfbyhfd', endTime: 'hvgdfbyhfd' },
		// 	{ id: 333, ids: [ 12849 ], couponType: 1, reduceMoney: 6, fullMoney: 8, startTime: 'hvgdfbyhfd', endTime: 'hvgdfbyhfd' }
		// ]
		// res.data.coupons = [
		// 	{ couponId: 1111, ids: [ 12849 ], couponType: 1, reduceMoney: 4, startTime: 'hvgdfbyhfd', endTime: 'hvgdfbyhfd' },
		// 	{ couponId: 2222, ids: [ 12849 ], couponType: 2, reduceMoney: 8, startTime: 'hvgdfbyhfd', endTime: 'hvgdfbyhfd' },
		// 	{ couponId: 3333, ids: [ 12849 ], couponType: 1, reduceMoney: 6, startTime: 'hvgdfbyhfd', endTime: 'hvgdfbyhfd' }
		// ]
		for (let shopIndex = 0; shopIndex < res.data.shops.length; shopIndex++) {
			if (isExchangeCounter) {
				// 兑换专柜商品只能使用代金券支付
				res.data.shops[shopIndex].skus.forEach((item) => {
					item.counterType = 1
				})
			} else {
				// 默认选中商家的第一张优惠券
				if (res.data.shops[shopIndex].shopCoupons.length) {
					res.data.shops[shopIndex].shopCoupons.forEach((item) => {
						item.checked = false
					})
					const shopCouponItemSelectObj = resolveShopCouponItemSelect({
						settlement: res.data,
						shopIndex,
						couponIndex: 0,
						isShowShopCoupons,
						selectedShopCouponList,
						selectedPlatformCoupon
					})
					res.data = shopCouponItemSelectObj.settlement
					isShowShopCoupons = shopCouponItemSelectObj.isShowShopCoupons
					selectedShopCouponList = shopCouponItemSelectObj.selectedShopCouponList
					if (shopCouponItemSelectObj.isSuccess) isSuccess = true
				}
			}
		}
		if (res.data.shopType) { // res.data.shopType === 1 // 1品牌商家，2商圈商家
			if (res.data.shops.some((a) => a.skus.some((b) => !(b.counterType === 1)))) {
				if (isProductPay) { // 如果是付款码商品
					userAddressInfo = { receiveId: 581 }
				} else if (res.data.shopType !== 2) {
					if (uni.getStorageSync(T_RECEIVE_ITEM)) {
						userAddressInfo = uni.getStorageSync(T_RECEIVE_ITEM)
						userAddressInfo.receivePhone = (userAddressInfo.receivePhone && userAddressInfo.receivePhone.replace(/(\d{3})\d+(\d{4})$/, '$1****$2')) || ''
					} else if (res.data.receive) {
						userAddressInfo = res.data.receive || {}
						userAddressInfo.receivePhone = (userAddressInfo.receivePhone && userAddressInfo.receivePhone.replace(/(\d{3})\d+(\d{4})$/, '$1****$2')) || ''
					}
				} else {
					userAddressInfo = { receiveId: 485 }
				}
			} else { // 兑换专柜商品
				userAddressInfo = { receiveId: 485 }
			}
		} else {
			userAddressInfo = { receiveId: 485 }
		}
		uni.removeStorageSync(T_RECEIVE_ITEM)
		if (res.data.shops.some((i) => i.receiveNotMatch)) uni.showToast({ title: '当前地址不支持配送，请参考红色字提示', icon: 'none' }) // 根据地址判断是否能下单
		settlement = res.data
		isSuccess = true
		// console.log(settlement)
	})
		.catch((e) => {
			console.log(e)
			uni.hideLoading()
		})
	return { settlement, userAddressInfo, isShowShopCoupons, selectedShopCouponList, isSuccess }
}
