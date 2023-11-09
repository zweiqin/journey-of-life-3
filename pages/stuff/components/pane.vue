<template>
	<view class="pane-container">
		<view class="header">
			<view class="title">{{ title }}</view>
			<view v-show="showMore" class="more" @click="handleViewMore">
				<text class="text">更多</text>
				<tui-icon name="arrowleft" color="#b4b4b4" :size="12" unit="upx"></tui-icon>
			</view>
		</view>
		<view class="body" style="padding: 10px 0">
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		route: String,
		showMore: {
			type: Boolean,
			default: false
		}
	},

	methods: {
		handleViewMore() {
			if (!this.route) {
				return
			}

			uni.navigateTo({
				url: this.route
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../../style/var.less";
@import "../../../style/mixin.less";

.pane-container {
  margin: 26upx auto 20upx auto;
  background-color: #fff
}

.header {
  .flex();
  font-size: @f14;
  color: @c0;
  font-weight: bold;
  padding-left: 14upx;
  border-left: 4upx solid #fa5151;
}

.text {
  font-size: @f12;
  font-weight: normal;
  margin-right: 8upx;
}
</style>
