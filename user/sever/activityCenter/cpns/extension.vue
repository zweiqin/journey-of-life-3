<template>
	<view class="pane-container">
		<view class="content-container">
			<view class="slot-pane">
				<view class="item">
					<view>累计收益</view>
					<view id="ex_1" class="value">
						￥{{ data.accumulated || 0 }}
					</view>
				</view>
				<view class="item">
					<view>累计提现</view>
					<view id="ex_2" class="value">
						￥{{ data.withdrawal || 0 }}
					</view>
				</view><view class="item">
					<view>当前收益</view>
					<view id="ex_3" class="value">
						￥{{ data.before || 0 }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			required: true
		}
	}
	// methods: {
	// },
}
</script>

<style lang="less" scoped>
.pane-container {
  width: 100%;
  color: #000;
  padding: 4upx 24upx 44upx;
  box-sizing: border-box;
  margin-top: 2upx; // 72upx+32px+20upx
  margin-bottom: 20upx;
  border-radius: 20upx;
  // background-color: #fff;
  font-size: 28upx;

  .content-container {
    margin-top: 20upx;
  }
}
</style>
