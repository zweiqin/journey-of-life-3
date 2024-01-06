<template>
	<view class="bind-phone-container">
		<JHeader title="绑定手机号" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view>绑定手机号页</view>
	</view>
</template>

<script>
import { getVerifyCodeApi } from '../../../api/anotherTFInterface'
export default {
	name: 'BindPhone',
	components: {
	},
	onLoad() {
	},

	computed: {
	}
}
</script>

<style lang="less" scoped>
.container {
  min-height: 100vh;
	box-sizing: border-box;
}
</style>
