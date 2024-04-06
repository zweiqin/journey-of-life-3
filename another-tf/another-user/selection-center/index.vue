<template>
	<view class="selection-center-container">
		<JHeader title="选品中心" width="50" height="50"></JHeader>

		<view
			style="display: flex;align-items: center;justify-content: space-around;padding: 20rpx 0;font-size: 26rpx;"
		>
			<view
				:style="{ color: selectionGoodsInfo.query.ifNew == 1 ? '#ff7911' : '#000000' }"
				@click="handleGoodsSortTap(1)"
			>
				<text>新品</text>
			</view>
			<view :style="{ color: sortGoodsIndex == 2 ? '#ff7911' : '#000000' }" @click="handleGoodsSortTap(2)">
				<text>价格</text>
				<tui-icon
					:name="selectionGoodsInfo.query.type == 1 ? 'turningup' : selectionGoodsInfo.query.type == 2 ? 'turningdown' : ''"
					color="#666666" :size="16"
				></tui-icon>
			</view>
			<view :style="{ color: sortGoodsIndex == 3 ? '#ff7911' : '#000000' }" @click="handleGoodsSortTap(3)">
				<text>销量</text>
				<tui-icon
					v-if="[1, 2].includes(selectionGoodsInfo.query.volume)"
					:name="selectionGoodsInfo.query.volume == 1 ? 'turningup' : selectionGoodsInfo.query.volume == 2 ? 'turningdown' : ''"
					color="#666666" :size="16"
				></tui-icon>
			</view>
			<view
				:style="{ color: selectionGoodsInfo.query.groupId ? '#ff7911' : '#000000' }"
				@click="selectionTagShowFalg = true"
			>
				<text>{{ classifyName || '分类' }}</text>
			</view>
		</view>
		<view v-if="selectionGoodsInfo.data && selectionGoodsInfo.data.length" style="width: 100%;">
			<tui-waterfall :list-data="selectionGoodsInfo.data" :type="2">
				<template #left="{ entity }">
					<ATFShopGoods
						:shop-id="entity.shopId" :c-item="entity" show-sales
						:show-icon="false" show-brief detailed-parameters="&isSelection=1"
					>
						<template #line="obj">
							<tui-button
								v-if="[3, 4, 5].includes(levelType)"
								type="warning" width="106rpx" height="54rpx"
								margin="0" shape="circle"
								@click="handleSelectSelection(obj.data)"
							>
								选择
							</tui-button>
						</template>
					</ATFShopGoods>
				</template>
				<template #right="{ entity }">
					<ATFShopGoods
						:shop-id="entity.shopId" :c-item="entity" show-sales
						:show-icon="false" show-brief detailed-parameters="&isSelection=1"
					>
						<template #line="obj">
							<tui-button
								v-if="[3, 4, 5].includes(levelType)"
								type="warning" width="106rpx" height="54rpx"
								margin="0" shape="circle"
								@click="handleSelectSelection(obj.data)"
							>
								选择
							</tui-button>
						</template>
					</ATFShopGoods>
				</template>
			</tui-waterfall>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!selectionGoodsInfo.isEmpty && !selectionGoodsInfo.data.length
					? 'loading' : !selectionGoodsInfo.isEmpty && selectionGoodsInfo.data.length && (selectionGoodsInfo.data.length >= selectionGoodsInfo.listTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="selectionGoodsInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据</tui-no-data>
		</view>

		<tui-picker
			layer="3" :show="selectionTagShowFalg" :picker-data="allTabData"
			@hide="selectionTagShowFalg = false" @change="handleSelectionPickerChange"
		>
		</tui-picker>
	</view>
</template>

<script>
import { getSelectLevelPlatformRelationApi, getShopClassifyApi, getBuyerSelectionLibraryApi, getBuyerSelectionSelectApi } from '../../../api/anotherTFInterface'
export default {
	name: 'SelectionCenter',
	data() {
		return {
			levelType: '',
			allTabData: [],
			selectionTagShowFalg: false,
			classifyName: '',
			sortGoodsIndex: '',
			selectionGoodsInfo: {
				query: {
					ifNew: 0,
					type: 1,
					volume: 0,
					page: 1,
					pageSize: 20,
					groupId: ''
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			}
		}
	},
	onLoad() {
		getSelectLevelPlatformRelationApi({})
			.then((res) => {
				this.levelType = res.data.levelType
			})
		getShopClassifyApi({
			shopId: ''
		}).then((res) => {
			this.allTabData = this.allTabData.concat(res.data.filter((item) => JSON.stringify(item) !== '{}'))
			this.allTabData = [
				{
					classifyId: 0,
					classifyName: '全部',
					depth: 1,
					groupPid: 0,
					classify: []
				},
				...res.data
			].map((item) => {
				item.text = item.classifyName
				item.value = item.classifyId
				item.children = [{
					classifyId: item.classifyId,
					classifyName: '全部',
					depth: 2,
					groupPid: item.groupPid,
					classify: []
				}, ...item.classify || []]
					.map((section) => {
						section.text = section.classifyName
						section.value = section.classifyId
						section.children = [{
							classifyId: section.classifyId,
							classifyName: '全部',
							depth: 3,
							groupPid: section.groupPid,
							classify: []
						}, ...section.classify || []]
							.map((part) => {
								part.text = part.classifyName
								part.value = part.classifyId
								part.children = []
								return part
							})
						return section
					})
				return item
			})
		})
		this.getSelectionGoodsTemplate()
	},
	methods: {
		getSelectionGoodsTemplate(isLoadmore) {
			uni.showLoading()
			getBuyerSelectionLibraryApi(this.selectionGoodsInfo.query)
				.then((res) => {
					this.selectionGoodsInfo.listTotal = res.data.page.total
					if (isLoadmore) {
						this.selectionGoodsInfo.data.push(...res.data.page.list)
					} else {
						this.selectionGoodsInfo.data = res.data.page.list
					}
					this.selectionGoodsInfo.isEmpty = this.selectionGoodsInfo.data.length === 0
					uni.hideLoading()
					this.selectionGoodsInfo.data = [
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 11680,
							'orderProductId': 0,
							'skuId': 331670,
							'productName': '茶位',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1705734982230-茶位2元一位.jpeg',
							'originalPrice': 2,
							'price': 2,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 0,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 6943,
							'orderProductId': 0,
							'skuId': 36382,
							'productName': '米汤桑叶',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700212573541-73e523e06fdc4c87995a851d3b39a522.jpeg',
							'originalPrice': 28,
							'price': 28,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 5,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 7068,
							'orderProductId': 0,
							'skuId': 44202,
							'productName': '姜茸蒸胜瓜',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700289699976-aec136c330464443bdb5c7239973d83a.jpg',
							'originalPrice': 33,
							'price': 33,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 6,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 7095,
							'orderProductId': 0,
							'skuId': 44282,
							'productName': '瑶柱炖花胶',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700291967994-01d7f056f8df8532f875a9446ea955.jpg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 1,
							'voucherPrice': 88,
							'presenterVoucher': 0,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 6977,
							'orderProductId': 0,
							'skuId': 43306,
							'productName': '香酥脆金枝',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700272878087-38a1129a67b947078e6c71bff61f68ee.jpeg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 6980,
							'orderProductId': 0,
							'skuId': 43369,
							'productName': '大良炸牛奶',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700273382352-2hxR5W_qSkPFkzOsDqqDNcNVT21q9pUls92n_ERHU3hoiBktvQII5H1EHxzyMYbmTYGVDmosZWTLal1WbWRW3A.jpg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 6989,
							'orderProductId': 0,
							'skuId': 43558,
							'productName': '元宝云吞',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700274708405-src=http___ss2.meipian.me_users_75117170_f360d917a3153ac3875cef27b31ab93b.jpg_meipian-raw_bucket_ivwen_key_dXNlcnMvNzUxMTcxNzAvZjM2MGQ5MTdhMzE1M2FjMzg3NWNlZjI3YjMxYWI5M2IuanBn_sign_9caff11df590f989.webp.jpg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 7019,
							'orderProductId': 0,
							'skuId': 43707,
							'productName': '麻婆豆腐',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700276338287-u=2659417770,2222043550&fm=253&fmt=auto&app=138&f=JPEG.webp.jpg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 7048,
							'orderProductId': 0,
							'skuId': 44094,
							'productName': '梅菜肉饼蒸水蛋',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700288002485-u=3815684582,110057390&fm=253&fmt=auto&app=138&f=JPEG.webp.jpg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 7061,
							'orderProductId': 0,
							'skuId': 44167,
							'productName': '榄菜心形豆腐',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700288952117-微信图片_20231118142636.png',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 7081,
							'orderProductId': 0,
							'skuId': 44261,
							'productName': '凉拌黑鸡脚',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700290599807-liangbanheijizhua_7317227.jpg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 7084,
							'orderProductId': 0,
							'skuId': 44271,
							'productName': '凉拌皮蛋',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700290802708-17ed5047a6104c8d8b5960263aca94ea.jpeg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 7089,
							'orderProductId': 0,
							'skuId': 44276,
							'productName': '凉拌小蚌片',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700291302564-u=1853457209,2376764145&fm=253&fmt=auto&app=138&f=JPEG.webp.jpg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 6903,
							'orderProductId': 0,
							'skuId': 36162,
							'productName': '五柳炸蛋',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700207166215-4034970a304e251f2b164af04197b11f7e3e53eb.jpeg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 6942,
							'orderProductId': 0,
							'skuId': 36369,
							'productName': '荷塘月色',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700212453310-t016c8c2984091b1be3.jpg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 11495,
							'orderProductId': 0,
							'skuId': 331249,
							'productName': '窝蛋桑叶',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1705137230985-窝蛋桑叶38.png',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 6972,
							'orderProductId': 0,
							'skuId': 43239,
							'productName': '椒盐方块豆腐',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700272234836-1481613633679859.jpg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 6973,
							'orderProductId': 0,
							'skuId': 43251,
							'productName': '椒盐玉米条',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700272322274-8898bf56dd89466ebf7320d92e937a3b.jpeg',
							'originalPrice': 38,
							'price': 38,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 7,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 6941,
							'orderProductId': 0,
							'skuId': 36356,
							'productName': '罗汉斋',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700212336107-795.jpg',
							'originalPrice': 48,
							'price': 48,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 9,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						},
						{
							'shopId': 268,
							'shopName': '百丈园（龙江店）',
							'shopLogo': '',
							'productId': 6975,
							'orderProductId': 0,
							'skuId': 43259,
							'productName': '头抽啫酿辣椒',
							'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700272609701-bf5cf8e6df41458f99e1c4ba08243039.jpg',
							'originalPrice': 48,
							'price': 48,
							'users': 0,
							'productBrief': '',
							'activityType': 0,
							'number': 0,
							'total': 0,
							'sortId': 0,
							'map': {},
							'voucherId': 0,
							'voucherPrice': 0,
							'presenterVoucher': 9,
							'manufacturerBasePrice': 0,
							'skuDetails': []
						}
					]
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleGoodsSortTap(index) {
			this.selectionGoodsInfo.query.page = 1
			this.selectionGoodsInfo.data = []
			if (index == 1) {
				this.selectionGoodsInfo.query.ifNew = this.selectionGoodsInfo.query.ifNew != 0 ? 0 : 1,
				this.selectionGoodsInfo.query.type = 1,
				this.selectionGoodsInfo.query.volume = 1,
				this.sortGoodsIndex = index
			} else if (index == 2) {
				this.selectionGoodsInfo.query.ifNew = 0,
				this.selectionGoodsInfo.query.type = this.selectionGoodsInfo.query.type != 1 ? 1 : 2,
				this.selectionGoodsInfo.query.volume = 1,
				this.sortGoodsIndex = index
			} else if (index == 3) {
				this.selectionGoodsInfo.query.ifNew = 0,
				this.selectionGoodsInfo.query.type = 1,
				this.selectionGoodsInfo.query.volume = this.selectionGoodsInfo.query.volume != 1 ? 1 : 2,
				this.sortGoodsIndex = index
			}
			this.getSelectionGoodsTemplate()
		},
		handleSelectionPickerChange(e) {
			this.selectionGoodsInfo.query.groupId = e.value[e.value.length - 1]
			this.classifyName = e.text.filter((i) => i !== '全部').reverse()[0] || '全部'
			this.getSelectionGoodsTemplate()
		},
		handleSelectSelection(item) {
			uni.showLoading()
			getBuyerSelectionSelectApi({ productId: item.productId })
				.then((res) => {
					this.$showToast('操作成功')
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.selectionGoodsInfo.data.length < this.selectionGoodsInfo.listTotal) {
			++this.selectionGoodsInfo.query.page
			this.getSelectionGoodsTemplate(true)
		}
	}
}
</script>

<style lang="less" scoped>
.selection-center-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
