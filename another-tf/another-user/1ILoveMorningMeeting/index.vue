<template>
	<view class="i-love-morning-meeting-container">
		i-love-morning-meeting
		<JHeader title="测试用" width="50" height="50"></JHeader>
		<view>
			<view>
				<tui-input
					v-model="phone" placeholder="请输入用户id" is-fillet
					padding="6rpx 10rpx 6rpx 26rpx" background-color="transparent" :size="42"
					placeholder-style="color: #979797;font-size: 30rpx;"
				>
					<template #right>
						<tui-button
							type="danger" :size="28" width="80rpx"
							height="40rpx" shape="circle" @click="getUserInfo"
						>
							查询
						</tui-button>
					</template>
				</tui-input>
			</view>
		</view>
	</view>
</template>

<script>
import { getBandUserInfoApi } from '../../../api/anotherTFInterface'

export default {
	name: '1ILoveMorningMeeting',
	components: {
	},
	data() {
		return {
			isDetail: 0,

			phone: ''
		}
	},
	onLoad(options) {
	},
	methods: {
		getUserInfo() {
			uni.showLoading()
			getBandUserInfoApi({ type: 1, value: this.phone })
				.then((res) => {
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.i-love-morning-meeting-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
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
