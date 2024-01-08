<template>
	<view class="bind-phone-container">
		<JHeader title="绑定手机号" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view>绑定手机号页</view>
		<view>{{ wechatOpenId }}</view>
		<view style="word-break: break-all;">{{ bindPhoneData }}</view>
	</view>
</template>

<script>
import { getVerifyCodeApi } from '../../../api/anotherTFInterface'
export default {
	name: 'BindPhone',
	components: {
	},
	data() {
		return {
			bindPhoneData: '',
			wechatOpenId: ''
		}
	},
	onLoad(options) {
		this.bindPhoneData = options.data
		this.wechatOpenId = options.wechatOpenId
	},

	computed: {
	}
}
</script>

<style lang="less" scoped>
.bind-phone-container {
  min-height: 100vh;
	box-sizing: border-box;
}
</style>
