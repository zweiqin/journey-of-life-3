<template>
  <div class="panel">
    <view class="header">
      <img
        class="avatar"
        src="https://img2.baidu.com/it/u=4244269751,4000533845&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        alt=""
      />
      <view class="info">
        <view class="name">GIVENCHY团蜂家具社区旗舰店</view>
        <view class="tem">
          <view class="rate">
            <img
              src="../../../../../static/images/index/star-active.png"
              alt=""
            />
            <img
              src="../../../../../static/images/index/star-active.png"
              alt=""
            />
            <img
              src="../../../../../static/images/index/star-active.png"
              alt=""
            />
            <img
              src="../../../../../static/images/index/star-active.png"
              alt=""
            />
            <img src="../../../../../static/images/index/star.png" alt="" />
          </view>
          <view class="type">家具店</view>
          <view class="year">10年老店</view>
        </view>
      </view>
      <button class="btn" @click="handleEnterStore">进店</button>
    </view>
    <view class="goods-layout">
      <img
        class="store"
        src="https://img2.baidu.com/it/u=1365692656,2723364399&fm=253&fmt=auto&app=138&f=PNG?w=702&h=462"
        alt=""
      />
      <view class="right">
        <img
          src="https://img2.baidu.com/it/u=4044691584,3728595922&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500"
          alt=""
        />

        <img
          src="https://img0.baidu.com/it/u=1624261074,370820778&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
        />
      </view>
    </view>
  </div>
</template>

<script>
export default {
  methods: {
    /**
     * @description 点击进店
     */
    handleEnterStore() {
      uni.navigateTo({
        url: "/pages/store/store",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.panel {
  margin-bottom: 20upx;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20upx;

    .avatar {
      width: 80upx;
      height: 80upx;
      border-radius: 50%;
      margin-right: 28upx;
    }

    .info {
      flex: 1;
      .name {
        color: #3d3d3d;
        font-size: 24upx;
        margin-bottom: 12upx;
      }
      .tem {
        display: flex;
        align-items: center;
      }
      .rate {
        margin-right: 6upx;
        img {
          width: 22upx;
          height: 22upx;
          vertical-align: -4upx;
          margin-right: 4upx;
        }
      }

      .tem,
      .year {
        color: #3d3d3d;
        font-size: 20upx;
      }

      .type {
        padding: 0 14upx 0 4upx;
        border-right: 4upx solid #ccc;
      }

      .year {
        padding-left: 14upx;
      }
    }

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 110upx;
      height: 36upx;
      background-color: #07b9b9;
      border-radius: 40upx;
      color: #fff;
      font-size: 20upx;
      padding-top: 2upx;
    }
  }

  .goods-layout {
    display: flex;
    justify-content: space-between;

    .store {
      width: 496upx;
      height: 300upx;
      border-radius: 20upx 0 0 20upx;
    }

    .right {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      img {
        height: 146upx;
        border-radius: 0 20upx 20upx 0;
      }
    }
  }
}
</style>