<template>
	<view style="box-sizing: border-box;">
		<tui-modal :show="isShow" :custom="true" :fade-in="true">
			<view class="Put-box1">
				<view class="text-align fs34 fs-bold">
					温馨提示
				</view>
				<view class="mar-top-40 text-align">
					您确定删除选中的商品吗？
				</view>
				<view class="flex-display flex-sp-between">
					<view class="btn" @click="$emit('update:showTip', false)">
						点错了
					</view>
					<view class="btn submit" @click="$emit('confirm')">
						确认删除
					</view>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
export default {
	name: 'DeleteModal',
	props: {
		showTip: {
			type: Boolean
		}
	},
	data() {
		return {
			isShow: false
		}
	},
	watch: {
		showTip(val) {
			this.isShow = val
		}
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
.Put-box1 {
	.btn {
		text-align: center;
		margin-top: 40rpx;
		border: 1px solid #333333;
		height: 80upx;
		line-height: 80upx;
		width: 240upx;
		color: #333333;
	}

	.submit {
		background-color: #333333;
		color: #FFEBC4;
	}
}
</style>
