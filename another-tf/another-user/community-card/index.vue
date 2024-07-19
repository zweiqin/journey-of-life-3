<template>
	<view class="community-card-container">
		<JHeader title="社区卡包" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>

		<view style="padding: 0 24rpx;background-color: #ffffff;">
			<tui-tabs
				style="width: 702rpx;padding: 0 0rpx 0 0rpx;overflow: hidden;" :slider-width="72" :padding="24"
				item-width="234rpx" selected-color="#ef530e" bold slider-bg-color="#ef530e"
				:size="32"
				:tabs="[{ name: '待使用' }, { name: '已失效' }, { name: '已使用' }]" :current-tab="currentTab" @change="handleCurrentChange"
			></tui-tabs>
		</view>
		<!-- <view v-if="currentTab === 0" style="padding: 10rpx 18rpx 0;">
			<tui-radio-group
			:value="communityCardInfo.query.isUse"
			@change="(e) => communityCardInfo.query.isUse !== e.detail.value && ((communityCardInfo.query.isUse = e.detail.value) || true) && (communityCardInfo.query.page = 1) && getCommunityCardList()"
			>
			<view style="display: flex;flex-wrap: wrap;align-items: center;">
			<text style="font-size: 30rpx;">是否使用：</text>
			<tui-label v-for="(item, index) in [{ name: '待使用', value: '0' }, { name: '已使用', value: '1' }]" :key="index">
			<view style="display: flex;align-items: center;padding: 6rpx 10rpx;font-size: 28rpx;">
			<tui-radio
			:checked="communityCardInfo.query.isUse === item.value" :value="item.value" color="#07c160"
			border-color="#999" :scale-ratio="0.8"
			>
			</tui-radio>
			<text>{{ item.name }}</text>
			</view>
			</tui-label>
			</view>
			</tui-radio-group>
			</view> -->
		<view style="padding: 20rpx;">
			<view v-if="(currentTab === 0) || (currentTab === 2)">
				<view v-if="communityCardInfo.data && communityCardInfo.data.length">
					<view v-for="(item, index) in communityCardInfo.data" :key="index" style="margin-bottom: 20rpx;">
						<tui-collapse
							:index="index" :current="currentIndexMain" :arrow="false" hd-bg-color="#ffffff"
							@click="changeCurrentMain"
						>
							<template #title>
								<UserCommunityCard :card-data="item"></UserCommunityCard>
							</template>
							<template #content>
								<UserCommunityCard show-type="message" :card-data="item"></UserCommunityCard>
							</template>
						</tui-collapse>
					</view>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!communityCardInfo.isEmpty && !communityCardInfo.data.length
							? 'loading' : !communityCardInfo.isEmpty && communityCardInfo.data.length && (communityCardInfo.data.length >= communityCardInfo.listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="communityCardInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无卡包</tui-no-data>
				</view>
			</view>
			<view v-else-if="currentTab === 1">
				<view v-if="invalidCardInfo.data && invalidCardInfo.data.length">
					<view v-for="(item, index) in invalidCardInfo.data" :key="index" style="margin-bottom: 20rpx;">
						<tui-collapse
							:index="index" :current="currentIndexMain" :arrow="false" hd-bg-color="#ffffff"
							@click="changeCurrentMain"
						>
							<template #title>
								<UserCommunityCard :card-data="item"></UserCommunityCard>
							</template>
							<template #content>
								<UserCommunityCard show-type="message" :card-data="item"></UserCommunityCard>
							</template>
						</tui-collapse>
					</view>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!invalidCardInfo.isEmpty && !invalidCardInfo.data.length
							? 'loading' : !invalidCardInfo.isEmpty && invalidCardInfo.data.length && (invalidCardInfo.data.length >= invalidCardInfo.listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="invalidCardInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">
						暂无失效卡券
					</tui-no-data>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getAllCommunityCardHolderApi, getIsLoseAllCommunityCardHolderApi } from '../../../api/anotherTFInterface'
import UserCommunityCard from './components/UserCommunityCard.vue'

export default {
	name: 'CommunityCard',
	components: { UserCommunityCard },
	data() {
		return {
			currentTab: 0,

			communityCardInfo: {
				query: {
					page: 1,
					pageSize: 10,
					isUse: '0'
				},
				data: [
					{
						cardId: 111,
						activityId: 222,
						buyerUserId: 333,
						businessFields: 'sdhvuhjdsgbvsaj caoshceaoucvwo啊安哦我才2的2地基地2评分大家2配电间2',
						cardEffectiveTime: 'hdshvcsbudhvbeygvs',
						cardRange: 1,
						cardJson: '12121,12113,121231,13131,1233131',
						isLose: 1,
						isUse: 0,
						createTime: 'dbvuhsgvyervyrsdhvg',
						businessFieldsArr: [
							{
								'id': 311,
								'serverTypeId': 313,
								'serverInfoName': '挂机空调清洗（内机）',
								'serverInfoUrl': 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/hxsk7qdakyxb4tc2of00.png',
								'serverIntroduction': '蒸发器、接水盘、过滤网、外壳等深度清洗、杀菌、消毒wasegvdfbnfdxbfdba',
								'isArtificial': true,
								'serverPrice': 88.00,
								'preferentialPrice': 0.00,
								'serverUnit': '台',
								'whetherShelf': 1,
								'validityPeriod': 0,
								'createTime': '2023-04-11 09:00:44',
								'updateTime': '2024-07-01 11:55:28',
								'serverTypeName': '家电维保-清冼保养',
								'serverImageUrl': 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/5ub5gxq8btzj41dyewdk.png,https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/cbcl11hwac3imq3pm9bc.png,https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/k2y9voxtnik637lqk059.png,https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9clf6yvvfnwf9ltbh0p6.png',
								'serverChargeDetailsList': []
							},
							{
								'id': 312,
								'serverTypeId': 313,
								'serverInfoName': '方形柜机空调清洗（内机）',
								'serverInfoUrl': 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/3beh8k4uje504q24n48g.png',
								'serverIntroduction': '蒸发器、接水盘、过滤网、外壳等深度清洗、杀菌、消毒\n',
								'isArtificial': true,
								'serverPrice': 128.00,
								'preferentialPrice': null,
								'serverUnit': '台',
								'whetherShelf': 1,
								'validityPeriod': 0,
								'createTime': '2023-04-11 09:04:59',
								'updateTime': '2024-06-28 02:06:43',
								'serverTypeName': '家电维保-清冼保养',
								'serverImageUrl': 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/5ub5gxq8btzj41dyewdk.png,https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/cbcl11hwac3imq3pm9bc.png,https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/k2y9voxtnik637lqk059.png,https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9clf6yvvfnwf9ltbh0p6.png',
								'serverChargeDetailsList': []
							}
						]
					}, { cardId: 111, activityId: 222, buyerUserId: 333, businessFields: 'sdhvuhjdsgbvsaj caoshceaoucvwo啊安哦我才2的2地基地2评分大家2配电间2', cardEffectiveTime: 'hdshvcsbudhvbeygvs', cardRange: 1, cardJson: '12121,12113,121231,13131,1233131', isLose: 1, isUse: 1, createTime: 'dbvuhsgvyervyrsdhvg' }, {}
				],
				listTotal: 0,
				isEmpty: false
			},
			currentIndexMain: -1,
			invalidCardInfo: {
				query: {
					page: 1,
					pageSize: 10
				},
				data: [
					{
						cardId: 111,
						activityId: 222,
						buyerUserId: 333,
						businessFields: 'sdhvuhjdsgbvsaj caoshceaoucvwo啊安哦我才2的2地基地2评分大家2配电间2',
						cardEffectiveTime: 'hdshvcsbudhvbeygvs',
						cardRange: 1,
						cardJson: '12121,12113,121231,13131,1233131',
						isLose: 1,
						isUse: 1,
						createTime: 'dbvuhsgvyervyrsdhvg',
						businessFieldsArr: [
							{
								'id': 311,
								'serverTypeId': 313,
								'serverInfoName': '挂机空调清洗（内机）',
								'serverInfoUrl': 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/hxsk7qdakyxb4tc2of00.png',
								'serverIntroduction': '蒸发器、接水盘、过滤网、外壳等深度清洗、杀菌、消毒wasegvdfbnfdxbfdba',
								'isArtificial': true,
								'serverPrice': 88.00,
								'preferentialPrice': 0.00,
								'serverUnit': '台',
								'whetherShelf': 1,
								'validityPeriod': 0,
								'createTime': '2023-04-11 09:00:44',
								'updateTime': '2024-07-01 11:55:28',
								'serverTypeName': '家电维保-清冼保养',
								'serverImageUrl': 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/5ub5gxq8btzj41dyewdk.png,https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/cbcl11hwac3imq3pm9bc.png,https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/k2y9voxtnik637lqk059.png,https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9clf6yvvfnwf9ltbh0p6.png',
								'serverChargeDetailsList': []
							},
							{
								'id': 312,
								'serverTypeId': 313,
								'serverInfoName': '方形柜机空调清洗（内机）',
								'serverInfoUrl': 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/3beh8k4uje504q24n48g.png',
								'serverIntroduction': '蒸发器、接水盘、过滤网、外壳等深度清洗、杀菌、消毒\n',
								'isArtificial': true,
								'serverPrice': 128.00,
								'preferentialPrice': null,
								'serverUnit': '台',
								'whetherShelf': 1,
								'validityPeriod': 0,
								'createTime': '2023-04-11 09:04:59',
								'updateTime': '2024-06-28 02:06:43',
								'serverTypeName': '家电维保-清冼保养',
								'serverImageUrl': 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/5ub5gxq8btzj41dyewdk.png,https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/cbcl11hwac3imq3pm9bc.png,https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/k2y9voxtnik637lqk059.png,https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9clf6yvvfnwf9ltbh0p6.png',
								'serverChargeDetailsList': []
							}
						]
					}, { cardId: 111, activityId: 222, buyerUserId: 333, businessFields: 'sdhvuhjdsgbvsaj caoshceaoucvwo啊安哦我才2的2地基地2评分大家2配电间2', cardEffectiveTime: 'hdshvcsbudhvbeygvs', cardRange: 1, cardJson: '12121,12113,121231,13131,1233131', isLose: 1, isUse: 1, createTime: 'dbvuhsgvyervyrsdhvg' }, {}
				],
				listTotal: 0,
				isEmpty: false
			}
		}
	},
	onLoad() {
		this.getCommunityCardList()
	},
	methods: {
		handleCurrentChange(e) {
			this.currentIndexMain = -1
			this.currentTab = e.index
			// 缓存每个tab里的数据
			if (this.currentTab === 0) {
				this.communityCardInfo.query.isUse = '0'
				this.communityCardInfo.query.page = 1
				this.communityCardInfo.data = []
				this.communityCardInfo.listTotal = 0
				this.communityCardInfo.isEmpty = false
				this.getCommunityCardList()
			} else if (this.currentTab === 1) {
				if (!this.invalidCardInfo.isEmpty && !this.invalidCardInfo.data.length) this.getInvalidCardList()
			} else if (this.currentTab === 2) {
				this.communityCardInfo.query.isUse = '1'
				this.communityCardInfo.query.page = 1
				this.communityCardInfo.data = []
				this.communityCardInfo.listTotal = 0
				this.communityCardInfo.isEmpty = false
				this.getCommunityCardList()
			}
			// 每点一个tab就重新进行对它的请求
			// if ((this.currentTab === 0) || (this.currentTab === 2)) {
			// 	this.communityCardInfo.query.page = 1
			// 	this.communityCardInfo.data = []
			// 	this.communityCardInfo.listTotal = 0
			// 	this.communityCardInfo.isEmpty = false
			// 	this.getCommunityCardList()
			// } else if (this.currentTab === 1) {
			// 	this.invalidCardInfo.query.page = 1
			// 	this.invalidCardInfo.data = []
			// 	this.invalidCardInfo.listTotal = 0
			// 	this.invalidCardInfo.isEmpty = false
			// 	this.getInvalidCardList()
			// }
		},
		getCommunityCardList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getAllCommunityCardHolderApi({ ...this.communityCardInfo.query })
				.then((res) => {
					res.data.list = res.data.list.map((i) => ({ ...i, businessFieldsArr: i.businessFields ? JSON.parse(i.businessFields) : [] }))
					this.communityCardInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.communityCardInfo.data.push(...res.data.list)
					} else {
						this.communityCardInfo.data = res.data.list
					}
					this.communityCardInfo.isEmpty = this.communityCardInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getInvalidCardList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getIsLoseAllCommunityCardHolderApi({ ...this.invalidCardInfo.query })
				.then((res) => {
					res.data.list = res.data.list.map((i) => ({ ...i, businessFieldsArr: i.businessFields ? JSON.parse(i.businessFields) : [] }))
					this.invalidCardInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.invalidCardInfo.data.push(...res.data.list)
					} else {
						this.invalidCardInfo.data = res.data.list
					}
					this.invalidCardInfo.isEmpty = this.invalidCardInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		changeCurrentMain(e) {
			this.currentIndexMain = this.currentIndexMain == e.index ? -1 : e.index
		}
	},
	onReachBottom() {
		if ((this.currentTab === 0) || (this.currentTab === 2)) {
			if (this.communityCardInfo.data.length < this.communityCardInfo.listTotal) {
				++this.communityCardInfo.query.page
				this.getCommunityCardList(true)
			}
		} else if (this.currentTab === 1) {
			if (this.invalidCardInfo.data.length < this.invalidCardInfo.listTotal) {
				++this.invalidCardInfo.query.page
				this.getInvalidCardList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.community-card-container {
	min-height: 100vh;
	width: 100%;
	background-color: #f1f1f1;

	/deep/ .j-header-container {
		background-color: #ffffff;

		.title {
			font-size: 34rpx;
			color: #222229;
			font-weight: normal;
		}
	}

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -24rpx;
		}
	}

	.tui-collapse {
		/deep/ .tui-collapse-head {
			border-radius: 28rpx;
		}
	}
}
</style>
