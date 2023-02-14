<template>
  <view class="header-wrapper">
    <view class="header">
      <TLocale :icon="false"></TLocale>
      <view
        class="search-wrapper"
        @click="go('/pages/goods-filter/goods-filter')"
      >
        <image
          class="search-icon"
          src="../../../static/images/index/search.png"
          mode=""
        />
        <text class="text">输入你想搜索的产品</text>
        <!-- <image
          class="camera"
          src="../../../static/images/index/camera.png"
          mode=""
        /> -->
      </view>
      <image
        class="chat"
        src="../../../static/images/user/daipingjia.png"
        mode=""
      />
    </view>

    <view class="navs-wrapper" :style="{ height: navsHeight + 'px' }"> </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      navsHeight: 0,
    };
  },

  methods: {
    // 获取尺寸
    getSize() {
      const query = uni.createSelectorQuery().in(this);
      return new Promise((resolve, reject) => {
        query
          .select(".header-wrapper")
          .boundingClientRect((data) => {
            resolve(data.height);
          })
          .exec();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.header-wrapper {
  padding: 30upx;
  padding-bottom: 0;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;

    .local-wrapper {
      position: relative;
      margin-right: 20upx;
      &::after {
        content: "";
        border: 8upx solid #000000;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
        position: absolute;
        top: 50%;
        right: -10px;
      }
      /deep/ .locale {
        color: #000;
        font-size: 36upx;
        font-weight: 500;
      }
    }

    .chat {
      width: 33.2upx;
      height: 30upx;
      object-fit: cover;
    }

    .search-wrapper {
      flex: 1;

      background-color: #f1f2f6;
      height: 74upx;
      margin: 0 20upx;
      border-radius: 100px;
      padding: 0 26upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .search-icon {
        width: 26.6upx;
        height: 26.6upx;
      }

      .text {
        font-size: 24upx;
        color: #999999;
        margin-left: 20upx;
        padding-left: 20upx;
        border-left: 1upx solid #d8d8d8;
        flex: 1;
      }

      .camera {
        width: 33.2upx;
        height: 30upx;
        object-fit: cover;
      }
    }
  }

  .navs-wrapper {
    transition: all 350ms;
    overflow: hidden;
  }
}
</style>