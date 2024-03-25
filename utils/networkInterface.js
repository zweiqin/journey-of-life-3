import { getBanziProductCanSaleApi } from '../api/anotherTFInterface'

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
		Object.keys(goodsDetail.map || {}).forEach((skuValueCodeItem) => {
			if (banSku.includes(goodsDetail.map[skuValueCodeItem].skuId)) {
				goodsDetail.map[skuValueCodeItem].ifEnable = 1
			}
		})
		goodsDetail.names.forEach((nameItem) => {
			if (nameItem.values && nameItem.values.length) {
				nameItem.values.forEach((tag) => {
					tag.ifEnable = 0
				})
			}
		})
		resolve(goodsDetail)
	} catch {
		uni.hideToast()
		// reject(goodsDetailOrigin)
		resolve(goodsDetailOrigin)
	}
})
