<template>
  <view class="top-header-container" :style="{ background: `url(${common.seamingImgUrl('1712990221526-top-bg.png')}) no-repeat center top/cover`}">
    <h1>中国·龙江</h1>
    <h2>全球最大的家具材料产业集群</h2>

    <tui-icon @click="handleBack" name="arrowleft" class="back" color="#fff"></tui-icon>

    <view class="search-container">
      <TuanLocation>
        <view class="locale">
          <text>{{ $store.getters.currentCity || '定位失败' }}</text>
					<tui-icon name="turningdown" color="#312606" size="48" unit="rpx" margin="0"></tui-icon>
        </view>
      </TuanLocation>

      <view class="search-wrapper">
				<view class="search-icon">
					<tui-icon name="search" color="#b3b2ad" size="32" unit="rpx" margin="0"></tui-icon>
				</view>
        <input
          v-model="searchValue"
          confirm-type="search"
          type="text"
          @confirm="go('/pages/search-page/search-result?keywords=' + searchValue)"
          placeholder="科技布"
        />
      </view>

      <button class="uni-btn distribute" @click="go('/stuff/purchase/purchase')">
				<tui-icon name="add" color="#f98833" size="40" unit="rpx" margin="0"></tui-icon>
        <text>需求发布</text>
      </button>
    </view>

    <scroll-view scroll-x="true" :show-scrollbar="false">
      <view class="top-menus">
        <view class="item" @click="go(item.url)" v-for="item in topMenu" :key="item.label">{{ item.label }} </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { topMenu } from '../../config';
export default {
  data() {
    return {
      topMenu: Object.freeze(topMenu),
      searchValue: ''
    };
  },

  methods: {
    handleBack(){
      uni.switchTab({
        url: '/pages/user/user'
      })
    }
  },
};
</script>

<style lang="less" scoped>
.top-header-container {
  position: relative;
  padding: 40upx 20upx 0;
  box-sizing: border-box;
  height: 560upx;
  width: 100%;
  background-size: cover;

  .back {
    position: absolute;
    top: 40upx;
    left: 10upx;
  }

  h1 {
    line-height: 60upx;
    font-size: 40upx;
    font-weight: 900;
    text-align: center;
    margin-bottom: 16upx;
  }

  h2 {
    font-size: 32upx;
    line-height: 40upx;
    text-align: center;
  }

  .search-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40upx 0 48upx 0;

    .locale {
      display: flex;
      align-items: center;

      text {
        font-weight: 500;
        font-size: 32upx;
      }

      .locale-icon {
        flex: 1;
        width: 40upx;
        height: 40upx;
        flex-shrink: 0;
      }
    }

    .search-wrapper {
      display: flex;
      align-items: center;

      width: 348upx;
      height: 72upx;
      border-radius: 100px;
      background-color: #fff;
      padding: 20upx 24upx;
      box-sizing: border-box;

      .search-icon {
        flex-shrink: 0;
        padding-right: 16upx;
        margin-right: 16upx;
        border-right: 1upx solid #d5d4d1;
      }

      input {
        font-size: 26upx;
      }
    }

    .distribute {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 176upx;
      height: 72upx;
      border-radius: 100px;
      border: 3upx solid #f98833;
      background-color: #fff;

      .add-icon {
        width: 40upx;
        height: 40upx;
      }

      text {
        font-size: 22upx;
        color: #f98833;
        margin-left: 8upx;
      }
    }
  }

  .top-menus {
    display: flex;
    align-items: center;

    &::-webkit-scrollbar {
      display: none !important;
    }

    .item {
      white-space: nowrap;
      margin-right: 32upx;
      line-height: 52upx;
      font-size: 28upx;

      &:first-child {
        font-weight: bold;
        color: #141000;
        font-size: 34upx;
      }
    }
  }
}
</style>
