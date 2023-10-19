<template>
	<view class="RewardPage">
		<JHeader width="50" height="50" title=""></JHeader>
		<view style="display: flex;align-items: center;margin: 34upx 0 0;">
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

		<view style="display: flex;align-items: center;margin-top: 20upx;">
			<TuanIcon :size="28" style="width: fit-content;border-radius: 50%;overflow: hidden;" :src="userInfo.avatarUrl">
			</TuanIcon>
			<text style="padding-left: 12upx;;font-size: 26upx;">{{ userInfo.nickName }}</text>
		</view>

		<view style="background-color: #f6f6f8;padding: 26upx 0 0;">
			<view style="background-color: #ffffff;">
				<view style="display: flex;align-items: flex-start;padding: 40upx 0 0;">
					<text style="font-weight: bold;">文章归属地：</text>
					<JCity :control="false" :text="cityText" @confirm="handleChooseCity"></JCity>
				</view>
				<view>
					<tui-input
						v-model="redPacketInfo.totalAmount" label="投放金额" type="number" placeholder="输入投放金额"
						size="30"
						placeholder-style="font-size: 30upx;" padding="40upx 18upx 0 0" background-color="transparent"
					>
						<template #right>
							<text style="font-size: 24upx;color: #888889;">元</text>
						</template>
					</tui-input>
					<view style="font-size: 24upx;color: #888889;">最低1元</view>
				</view>
				<view>
					<tui-input
						v-model="redPacketInfo.totalPacket" label="投放数量" type="digit" placeholder="输入投放数量"
						size="30"
						placeholder-style="font-size: 30upx;" padding="40upx 18upx 0 0" background-color="transparent"
					>
						<template #right>
							<text style="font-size: 24upx;color: #888889;">个</text>
						</template>
					</tui-input>
					<view style="font-size: 24upx;color: #888889;">最低1个</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;padding: 40upx 18upx 0 0;">
					<text>红包金额是否随机</text>
					<tui-radio-group
						v-model="redPacketInfo.isRandom"
						style="flex: 1;display: flex;justify-content: flex-end;flex-wrap: wrap;"
						@change="(e) => {}"
					>
						<tui-label
							v-for="(part, index) in [{ name: '随机', value: '1' }, { name: '等额', value: '0' }]"
							:key="index"
						>
							<tui-list-cell padding="16upx">
								<view>
									<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
									</tui-radio>
									<text>{{ part.name }}</text>
								</view>
							</tui-list-cell>
						</tui-label>
					</tui-radio-group>
				</view>
				<view>
					<tui-input
						v-model="redPacketInfo.link" label="广告链接" placeholder="输入广告链接" size="30"
						placeholder-style="font-size: 30upx;" padding="40upx 18upx 0 0" background-color="transparent"
					>
					</tui-input>
				</view>
			</view>
		</view>

		<view
			style="position: fixed;bottom: 0;left: 0;z-index: 2;width: 100%;padding: 10upx 0 0;background-color: #f6f6f8;box-sizing: border-box;"
		>
			<view style="background-color: #ffffff;padding: 20upx 26upx 32upx;">
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
import { payOrderGoodsApi, payOrderGoodsAPPApi } from '../../../api/goods'
import { getUserId } from '../../../utils'
import { USER_INFO } from '../../../constant'

export default {
	name: 'RewardPage',
	props: {
		formData: {
			type: Object,
			required: true
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
	methods: {
		handleChooseCity(data) {
			this.cityText = data.area
			this.region = (data.county.code || data.city.code || data.province.code) + ''
		},
		handleRelease() {
			if (!this.formData.publishUserId) return this.$showToast('缺少发布者信息')
			if (!this.formData.postTitle) return this.$showToast('缺少文章标题')
			if (!this.formData.postContent) return this.$showToast('缺少文章内容')
			if (!this.formData.postCover) return this.$showToast('缺少文章封面')
			if (!this.region) return this.$showToast('缺少文章归属地')
			if (this.redPacketInfo.totalAmount < 1) return this.$showToast('投放金额最低为1元')
			if (!this.redPacketInfo.isRandom) return this.$showToast('请选择是否随机')
			addPublishArticleApi({ ...this.formData, region: this.region, redPacketInfo: this.redPacketInfo })
				.then(async ({ data: lastData }) => {
					if (this.$store.state.app.isInMiniProgram || getApp().globalData.isInMiniprogram) {
						const payAppesult = await payOrderGoodsAPPApi({
							userId: getUserId(),
							orderNo: lastData.redPacketId,
							payType: 8
						})
						if (payAppesult.errno === 0) {
							let query = ''
							for (const key in payAppesult.data) {
								query += key + '=' + payAppesult.data[key] + '&'
							}
							wx.miniProgram.navigateTo({
								url: '/pages/loading/loading?' + query + 'orderNo=' + lastData.redPacketId + '&userId=' + getUserId(),
								fail: () => {
									uni.switchTab({
										url: '/pages/order/order?type=shop&status=1'
									})
								}
							})
						}
					} else {
						// #ifdef H5
						payOrderGoodsApi({
							orderNo: lastData.redPacketId,
							userId: getUserId(),
							payType: 8
						}).then((res) => {
							const payData = JSON.parse(res.data.h5PayUrl)
							const data = JSON.parse(payData.data)
							const form = document.createElement('form')
							form.setAttribute('action', payData.url)
							form.setAttribute('method', 'POST')
							let input
							for (const key in data) {
								input = document.createElement('input')
								input.name = key
								input.value = data[key]
								form.appendChild(input)
							}
							document.body.appendChild(form)
							form.submit()
							document.body.removeChild(form)
						})
						// #endif
						// #ifdef APP
						const payAppesult = await payOrderGoodsAPPApi({
							userId: getUserId(),
							orderNo: lastData.redPacketId,
							payType: 8
						})
						if (payAppesult.errno === 0) {
							let query = ''
							for (const key in payAppesult.data) {
								query += key + '=' + payAppesult.data[key] + '&'
							}
							plus.share.getServices(
								function (res) {
									let sweixin = null
									for (const i in res) {
										if (res[i].id == 'weixin') {
											sweixin = res[i]
										}
									}
									console.log(sweixin)
									if (sweixin) {
										sweixin.launchMiniProgram({
											id: 'gh_e64a1a89a0ad',
											type: 0,
											path: 'pages/orderDetail/orderDetail?' + query
										})
									}
								},
								function (e) {
									console.log('获取分享服务列表失败：' + e.message)
								}
							)
						}
						// #endif
					}
				})
		}
	}
}
</script>

<style lang="less" scoped>
.RewardPage {
	width: 100vw;
	min-height: 100vh;
	padding: 40upx 24upx 140upx;
	overflow-y: auto;
	box-sizing: border-box;
}
</style>
