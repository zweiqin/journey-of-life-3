<template>
	<view class="shop-car-header">
		<view class="title-wrapper">
			<tui-icon
				color="#000"
				:size="28"
				name="arrowleft"
				@click="handleBack"
			></tui-icon>
			<text>我的客服</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../../style/mixin.less';
.shop-car-header {
  .h-flex();
  font-size: 28upx;
  width: 100%;
  height: 120upx;
  box-sizing: border-box;
  padding-right: 30upx;

  .uni-btn {
    font-size: 28upx;
  }

  .title-wrapper {
    .h-flex(flex-start);
  }
}
</style>
