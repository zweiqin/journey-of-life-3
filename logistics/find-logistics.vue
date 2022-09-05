<template>
  <view class="value-added-services">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">佛山-全国</view>
    </view>

    <view class="main">
      <view class="find-wuliu">
        <view class="search">
          <view class="from">佛山</view>
          <img
            class="icon"
            src="../static/images/wuliu/wuliu-icon.png"
            alt=""
          />
          <view class="to desc">选择到达</view>
        </view>

        <button class="find-btn" @click="handleFindWuliu">查找物流</button>
      </view>
      <view class="wuliu-list">
        <img
          @click="toDetail"
          class="img"
          src="../static/temp/矩形 179.png"
          alt=""
        />
        <img
          @click="toDetail"
          class="img"
          src="../static/temp/矩形 180.png"
          alt=""
        />
        <img
          @click="toDetail"
          class="img"
          src="../static/temp/矩形 181.png"
          alt=""
        />
        <img
          @click="toDetail"
          class="img"
          src="../static/temp/矩形 182.png"
          alt=""
        />
        <img
          @click="toDetail"
          class="img"
          src="../static/temp/矩形 183.png"
          alt=""
        />
        <img
          @click="toDetail"
          class="img"
          src="../static/temp/矩形 184.png"
          alt=""
        />
        <img
          @click="toDetail"
          class="img"
          src="../static/temp/矩形 185.png"
          alt=""
        />
        <img
          @click="toDetail"
          class="img"
          src="../static/temp/矩形 186.png"
          alt=""
        />
        <img
          @click="toDetail"
          class="img"
          src="../static/temp/矩形 191.png"
          alt=""
        />
        <img
          @click="toDetail"
          class="img"
          src="../static/temp/矩形 192.png"
          alt=""
        />
        <img
          @click="toDetail"
          class="img"
          src="../static/temp/矩形 193.png"
          alt=""
        />
        <img
          @click="toDetail"
          class="img"
          src="../static/temp/矩形 194.png"
          alt=""
        />
      </view>
    </view>
  </view>
</template>



<script>
export default {
  methods: {
    // 返回
    back() {
      uni.navigateBack();
    },

    // 去物流详情
    toDetail() {
      uni.navigateTo({
        url: "/logistics/wuliu-detail",
      });
    },

    /**
     * @description 点击搜索物流
     */
    handleFindWuliu() {
      uni.navigateTo({
        url: "/logistics/search-wuliu",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.value-added-services {
  padding: 60upx 26upx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #07b9b9 0%, #ffffff 100%);

  .header {
    display: flex;
    align-items: center;

    .back {
      width: 16upx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 32upx;
    }
  }

  .main {
    background-color: #fff;
    padding: 30upx;
    border-radius: 20upx;
    margin-top: 40upx;

    .find-wuliu {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-bottom: 1upx solid #d8d8d8;

      .search {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3d3d3d;
        font-size: 36upx;
        font-weight: bold;

        .icon {
          width: 72upx;
          margin: 0 110upx;
        }

        .desc {
          color: #999999;
        }
      }

      .find-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 260upx;
        height: 72upx;
        border-radius: 20upx;
        background-color: #07b9b9;
        color: #fff;
        margin: 40upx 0;
      }
    }

    .wuliu-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .img {
        width: 300upx;
        height: 136upx;
        margin: 32upx 0;
      }
    }
  }
}
</style>