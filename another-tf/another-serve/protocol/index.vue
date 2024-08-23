<template>
	<view class="protocol-container">
		<JHeader :title="`《${APPLY_NAME}》商城协议`" width="50" height="50"></JHeader>
		<view id="text">
			<rich-text :nodes="item.dictDescribe"></rich-text>
		</view>
	</view>
</template>

<script>
import { getQueryDictByNameApi } from '../../../api/anotherTFInterface'
import { APPLY_NAME } from '../../../config'

export default {
	name: 'Protocol',
	data() {
		return {
			APPLY_NAME,
			type: 'app_privacy_agreement',
			item: {}
		}
	},
	onLoad(item) {
		this.type = item.type
		let title = `《${APPLY_NAME}》商城用户协议`
		if (this.type === 'app_privacy_agreement') {
			title = `《${APPLY_NAME}》商城隐私协议`
		}
		uni.setNavigationBarTitle({
			title
		})
		this.getquery()
	},
	methods: {
		getquery() {
			getQueryDictByNameApi({ name: this.type }, 'GET')
				.then((res) => {
					this.item = res.data
				})
		}

	}
}
</script>

<style lang="less" scoped>
.protocol-container {

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	#text {
		padding: 40rpx;
	}
}
</style>
