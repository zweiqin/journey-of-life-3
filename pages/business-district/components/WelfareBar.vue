<template>
	<view class="welfare-bar-container">
		<view class="item" @click="empty()">
			<view class="item-title">签到赚钱</view>
		</view>

		<view class="item" @click="empty()">
			<view class="item-title">天降福利</view>
		</view>

		<view class="item" @click="empty()">
			<view class="item-title">新人免单</view>
		</view>

		<view class="item" @click="empty()">
			<view class="item-title">限时秒杀</view>

		</view>

		<view class="item" @click="empty()">
			<view class="item-title">省钱团购</view>

		</view>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			startAnimation1: false,
			startAnimation2: false
		}
	},

	mounted() {
		this.startAnimation1 = true
		this.startAnimation2 = true
	}
}
</script>

<style lang="less" scoped>
@keyframes one-animate {
  0% {
    bottom: -100upx;
  }

  100% {}
}

@keyframes breath {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.welfare-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item {
    position: relative;
    width: 127upx;
    height: 140upx;
    border-radius: 10upx;
    overflow: hidden;

    .item-title {
      color: #222229;
      font-size: 28upx;
      font-weight: 500;
      margin-top: 18upx;
      margin-left: 10upx;
    }

    &:nth-child(1) {
			border: 1upx solid #f0527c;
      background: url('../../../static/images/new-business/home/tab-png1.png') center/cover no-repeat;
    }

    &:nth-child(2) {
			border: 1upx solid #fdd15e;
      background: url('../../../static/images/new-business/home/tab-png2.png') center/cover no-repeat;
    }

    &:nth-child(3) {
			border: 1upx solid #fb5546;
      background: url('../../../static/images/new-business/home/tab-png3.png') center/cover no-repeat;
    }

    &:nth-child(4) {
			border: 1upx solid #ee4775;
      background: url('../../../static/images/new-business/home/tab-png4.png') center/cover no-repeat;
    }

    &:nth-child(5) {
			border: 1upx solid #fdd262;
      background: url('../../../static/images/new-business/home/tab-png5.png') center/cover no-repeat;
    }
  }
}
</style>
