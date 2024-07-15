<template>
	<view class="RewardPage">
		<JHeader width="50" height="50" title=""></JHeader>
		<view style="display: flex;align-items: center;margin: 34upx 0 0;padding: 0rpx 30rpx;">
			<view
				style="flex: 1;width: 0;margin-right: 8upx;font-size: 34upx;font-weight: bold;word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
			>
				{{ formData.postTitle || '--' }}
			</view>
			<view
				style="padding-left: 12upx;font-size: 24upx;color: #888889;border-left: 1upx solid #D8D8D8;"
				@click="$emit('back')"
			>
				返回修改
			</view>
		</view>

		<view style="display: flex;align-items: center;margin-top: 20upx;padding: 0rpx 30rpx 20rpx 30rpx;">
			<BeeIcon :size="28" style="width: fit-content;border-radius: 50%;overflow: hidden;" :src="userInfo.avatarUrl">
			</BeeIcon>
			<text style="padding-left: 12upx;;font-size: 26upx;">{{ userInfo.nickName }}</text>
		</view>

		<view style="background-color: #f6f6f8;padding: 26upx 0 0;">
			<view style="background-color: #ffffff;">
				<view style="display: flex;align-items: flex-start;padding: 40upx 30rpx 0rpx 30rpx;">
					<text style="font-weight: bold;">文章归属地：</text>
					<JAnyArea :text="cityText" @confirm="handleSelectArea"></JAnyArea>
				</view>
				<view style="padding: 0rpx 30rpx;">
					<tui-input
						v-model="redPacketInfo.totalAmount" label="投放金额" type="number" placeholder="输入投放金额"
						size="30"
						placeholder-style="font-size: 30upx;" padding="40upx 18upx 0 0" background-color="transparent"
					>
						<template #right>
							<text style="font-size: 24upx;color: #888889;">元</text>
						</template>
					</tui-input>
					<view style="font-size: 24upx;color: #888889;margin-top:6rpx;">最低1元</view>
				</view>
				<view style="padding: 0rpx 30rpx;">
					<tui-input
						v-model="redPacketInfo.totalPacket" label="投放数量" type="digit" placeholder="输入投放数量"
						size="30"
						placeholder-style="font-size: 30upx;" padding="40upx 18upx 0 0" background-color="transparent"
					>
						<template #right>
							<text style="font-size: 24upx;color: #888889;">个</text>
						</template>
					</tui-input>
					<view style="font-size: 24upx;color: #888889;margin-top:6rpx;">最低1个</view>
				</view>
				<view
					style="display: flex;align-items: center;justify-content: space-between;padding: 40upx 18upx 0 0;padding: 0rpx 30rpx;margin-top:10rpx;"
				>
					<text>红包金额是否随机</text>
					<tui-radio-group
						v-model="redPacketInfo.isRandom"
						style="flex: 1;display: flex;justify-content: flex-end;flex-wrap: wrap;" @change="(e) => { }"
					>
						<tui-label v-for="(part, index) in [{ name: '随机', value: '1' }, { name: '等额', value: '0' }]" :key="index">
							<tui-list-cell padding="16upx">
								<view>
									<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
									</tui-radio>
									<text style="margin-left:10rpx;">{{ part.name }}</text>
								</view>
							</tui-list-cell>
						</tui-label>
					</tui-radio-group>
				</view>
				<view style="padding: 0rpx 30rpx;">
					<tui-input
						v-model="redPacketInfo.link" label="广告链接" placeholder="输入广告链接" size="30"
						placeholder-style="font-size: 30upx;" padding="30upx 18upx 0 0" background-color="transparent"
					>
					</tui-input>
				</view>
				<!-- <view class="selectGoods" style="padding: 0rpx 30rpx;">
					<tui-input
						v-model="redPacketInfo.link" label="商品广告选择" placeholder="请选择需要展示的商品" size="30"
						placeholder-style="font-size: 30upx;" background-color="transparent"
						disabled
					>
					</tui-input>
				</view> -->
			</view>
		</view>

		<view
			style="position: fixed;bottom: 0;left: 0;z-index: 2;width: 100%;padding: 10upx 0 0;background-color: #f6f6f8;box-sizing: border-box;"
		>
			<view style="background-color: #ffffff;">
				<tui-button
					type="danger" width="100%" height="92rpx" style="background: #ff380c!important;border-radius: 16upx;"
					@click="handleRelease"
				>
					确认发布
				</tui-button>
			</view>
		</view>
	</view>
</template>

<script>
import { addPublishArticleApi } from '../../../api/community-center/makeSmallFortune'
import { payFn } from '../../../utils'
import { USER_INFO } from '../../../constant'

export default {
	name: 'RewardPage',
	props: {
		formData: {
			type: Object,
			required: true
		},
		userShopInfo: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			userInfo: uni.getStorageSync(USER_INFO),
			cityText: '',
			region: '',
			redPacketInfo: {
				totalAmount: '',
				totalPacket: '',
				isRandom: '',
				link: ''
			}
		}
	},
	created() {
		if (this.$store.state.location.locationInfo.towncode) {
			this.cityText = this.$store.state.location.locationInfo.province + this.$store.state.location.locationInfo.city + this.$store.state.location.locationInfo.district
			this.region = this.$store.state.location.locationInfo.towncode
		} else if (this.$store.state.location.locationInfo.adcode) {
			this.cityText = this.$store.state.location.locationInfo.province + this.$store.state.location.locationInfo.city + this.$store.state.location.locationInfo.district + this.$store.state.location.locationInfo.township
			this.region = this.$store.state.location.locationInfo.adcode
		}
	},
	methods: {
		handleSelectArea(data) {
			this.cityText = data.area
			this.region = data.county.id || data.city.id || data.province.id
		},
		handleRelease() {
			if (!this.formData.publishUserId) return this.$showToast('缺少发布者信息')
			if (!this.formData.postTitle) return this.$showToast('缺少文章标题')
			if (!this.formData.postContent) return this.$showToast('缺少文章内容')
			if (!this.formData.postCover) return this.$showToast('缺少文章封面')
			if (!this.region) return this.$showToast('缺少文章归属地')
			if (this.redPacketInfo.totalAmount < 1) return this.$showToast('投放金额最低为1元')
			if (!this.redPacketInfo.isRandom) return this.$showToast('请选择是否随机')
			if (this.redPacketInfo.totalPacket < 1 || Number(this.redPacketInfo.totalAmount)/ Number(this.redPacketInfo.totalPacket) < 0.1) return this.$showToast('红包平均金额不得少于0.1')
			uni.showLoading()
			addPublishArticleApi({ ...this.formData, region: this.region, redPacketInfo: this.redPacketInfo })
				.then(({ data }) => {
					uni.hideLoading()
					payFn({ ...data, orderSn: data.redPacketId }, 8, false)
				})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.selectGoods:active {
	box-sizing: border-box;
	background-color: aqua;
	display: flex;
	align-items: center;
	padding: 20upx 26upx 32upx;
}
.RewardPage {
	width: 100vw;
	min-height: 100vh;
	// padding: 40upx 24upx 140upx;
	overflow-y: auto;
	box-sizing: border-box;
	padding-top: 10rpx;
}
</style>
