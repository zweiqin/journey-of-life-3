<template>
	<view class="activity-package-container">
		<view class="left-container" @click="go('/another-tf/another-user/user-upgrade/purchase-chain-goods')">
			<image src="../../../static/images/new-business/home/user-upgrade-goods.png" style="width: 100%;height: 100%;" mode="aspectFit"></image>
			<view style="position: absolute;top: 8upx;width: 100%;font-size: 38upx;font-weight: bold;color: #ffffff;text-align: center;">
				<view>特殊产品</view>
				<view style="margin-top: 12upx;">会员升级必买</view>
				<view style="margin-top: 16upx;">关系链专用</view>
			</view>
		</view>

		<view class="right-container">
			<view class="right-item" @click="empty()">
				<view class="item-title">充话费享折扣</view>
				<image class="zhe" src="../../../static/images/new-business/home/zhe.png"></image>
				<view class="button-wrapper">
					<button class="item-btn uni-btn">立即体验</button>
					<image class="bao" src="../../../static/images/new-business/home/bao.png"></image>
				</view>
			</view>

			<view class="right-item oli" @click="empty()">
				<view class="title-wrapper">
					<view class="title">加油券</view>
					<view class="count">100+领取</view>
				</view>
				<image src="../../../static//images//new-business/home/car.png" class="car"></image>
				<image src="../../../static//images//new-business/home/cao.png" class="cao"></image>
				<view class="button-wrapper">
					<button class="item-btn uni-btn">立即体验</button>
				</view>
			</view>
		</view>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
export default {
	props: {
		scrollTop: {
			type: Number,
			default: 0
		}
	}
}
</script>

<style lang="less" scoped>
.activity-package-container {
  height: 517upx;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item-btn {
    width: 153upx;
    height: 43upx;
    border-radius: 100px;
    border: 2upx solid #EF530E;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #EF530E;
    font-size: 24upx;
  }

  .left-container {
		position: relative;
    height: 517upx;
    width: 355upx;
    overflow: hidden;
  }

  .right-container {
    height: 517upx;
    width: 316upx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    .right-item {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 28upx 23upx;
      box-sizing: border-box;
      position: relative;
      width: 316upx;
      height: 248upx;
      background: linear-gradient(180deg, #FCE8B4 0%, #FFFFFF 45%);
      border-radius: 20upx;
      overflow: hidden;

      .zhe {
        position: absolute;
        right: -28upx;
        bottom: -40upx;
        width: 184upx;
        height: 227upx;

      }

      .item-title {
        color: #222229;
        font-size: 32upx;
        font-weight: 500;
      }

      .button-wrapper {
        position: relative;

        .bao {
          width: 153.86upx;
          height: 84.94upx;
          position: absolute;
          top: -84upx;
          left: 10upx;
        }
      }
    }

    .oli {
      background: linear-gradient(180deg, #FCDECC 0%, #FFFFFF 52%);

      .car {
        position: absolute;
        width: 257.34upx;
        height: 172.58upx;
        top: 57upx;
        right: -96upx;
      }

      .cao {
        position: absolute;
        width: 191upx;
        height: 84upx;
        top: 94upx;
        left: -20upx;
      }

      .title-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #222229;

        .title {
          font-size: 32upx;
          font-weight: 500;
        }

        .count {
          font-size: 24upx;
        }
      }
    }
  }
}
</style>
