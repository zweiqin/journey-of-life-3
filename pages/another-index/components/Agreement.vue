<template>
	<tui-modal :show="privacyShow" :custom="true" :fadein="true">
		<view class="Put-box1">
			<view class="text-align fs34 fs-bold">
				协议与隐私政策
			</view>
			<p class="mar-top-20">欢迎来到shop！我们根据最新的法律、法规、监管政策要求，更新了shop隐私政策。</p>
			<view class="flex-display flex-sp-between">
				<view class="btn submit" @click="privacyShow = false">
					同意
				</view>
			</view>
		</view>
	</tui-modal>
</template>

<script>
import { T_STORAGE_KEY } from '../../../constant'

export default {
	name: 'Agreement',
	data() {
		return {
			privacyShow: false
		}
	},
	created() {
		// this.privacyShow = true
		if (!uni.getStorageSync(T_STORAGE_KEY)) {
			// #ifdef APP
			this.privacyShow = true
			// #endif
		}
	},
	methods: {}
}
</script>

<style
    lang="scss"
    scoped
>
.Put-box1 {
	.btn {
		text-align: center;
		margin-top: 40rpx;
		border: 1px solid #333333;
		height: 80upx;
		line-height: 80upx;
		width: 100%;
		color: #333333;
	}

	.submit {
		background-color: #333333;
		color: #FFEBC4;
	}
}
</style>
