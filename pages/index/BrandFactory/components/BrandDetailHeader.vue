<template>
  <view class="brand-detail-header-container">
    <view class="page-header-container">
			<tui-icon
				name="arrowleft" :size="38" unit="rpx"
				color="#000000"
				margin="0" @click="handleBack"
			></tui-icon>
      <view class="search-wrapper">
        <image class="search-icon" src="../../../../static/images/new-index/brandFactory/search-icon.png"></image>
        <view class="placeholder">请输入您想搜索的商品</view>
      </view>
      <view class="follow-wrapper" @click="$emit('follow')">
        <image class="follow-icon" src="../../../../static/images/new-index/brandFactory/follow-icon.png"></image>
        {{ !isFollow ? '关注' : '取消关注' }}
      </view>

      <image @click="$emit('share')" class="share-icon" src="../../../../static/images/new-index/brandFactory/share.png">
      </image>
    </view>
    <view class="nav-container">
      <view @click="$emit('changeTab', 0)" class="nav-item" :class="{ active: active === 0 }">看工厂</view>
      <view @click="$emit('changeTab', 1)" class="nav-item" :class="{ active: active === 1 }">找产品</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: 0
    },

    isFollow: {
      type: [Number, Boolean],
      default: false
    }
  },

  mounted() {
    const query = uni.createSelectorQuery().in(this);
    query.select('.brand-detail-header-container').boundingClientRect(data => {
      const pageHeaderHeight = data.height
      if (pageHeaderHeight) {
        this.$emit('setScrollBar', pageHeaderHeight)
      }
    }).exec();
  },

  methods: {
    handleBack() {
      uni.navigateBack();
    }
  },
}
</script>

<style lang="less" scoped>
.brand-detail-header-container {
  .page-header-container {
    height: 88upx;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 30upx;
    box-sizing: border-box;


    .search-wrapper {
      flex: 1;
      height: 48upx;
      padding: 8upx 12upx;
      background: #F6F6F6;
      border-radius: 8upx;
      box-sizing: border-box;
      margin-left: 25upx;
      font-size: 24upx;
      color: #adadad;
      display: flex;
      align-items: center;

      .search-icon {
        width: 32upx;
        height: 32upx;
        flex-shrink: 0;
        margin-right: 12upx;
      }

    }

    .back-icon {
      width: 22.97upx;
      height: 39.66upx;
      flex-shrink: 0;
    }

    .share-icon {
      width: 38upx;
      height: 38upx;
      flex-shrink: 0;
    }

    .follow-wrapper {
      background-color: #F6F6F6;
      border-radius: 8upx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24upx;
      color: #222229;
      height: 48upx;
      width: 110upx;
      margin: 0 35upx;

      .follow-icon {
        width: 32upx;
        height: 32upx;
        flex-shrink: 0;
        margin-right: 6upx;
      }
    }
  }

  .nav-container {
    padding-top: 40upx;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .nav-item {
      position: relative;
      color: #222229;
      font-size: 32upx;

      &:nth-child(1) {
        padding-right: 30upx;
      }

      &:nth-child(2) {
        padding-left: 30upx;
      }

      &.active {
        font-size: 38upx;
        font-weight: 500;

        &::after {
          position: absolute;
          content: '';
          width: 100upx;
          height: 10upx;
          border-radius: 100upx;
          display: block;
          background: linear-gradient(90deg, #EF530E 0%, rgba(255, 255, 255, 0) 100%);
          bottom: -20upx;
          left: 50%;
          transform: translateX(-60%);
        }

        &:nth-child(2) {
          &::after {
            transform: translateX(-35%);

          }
        }
      }
    }
  }
}
</style>