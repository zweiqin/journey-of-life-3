import { getProductDetailsByIdApi, getBanziProductCanSaleApi } from '../api/anotherTFInterface'

/**
 * @description 处理商品详情数据。半子商品是否可售，对应规格值是否可点击。根据ifEnable，为0可选择，为1不可选择
 * @param {Object} goodsDetail 商品数据
 * @returns
 */

export const resolveGoodsDetailSkuSituation = (goodsDetailOrigin) => new Promise(async (resolve, reject) => {
	try {
		const goodsDetail = JSON.parse(JSON.stringify(goodsDetailOrigin))
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
