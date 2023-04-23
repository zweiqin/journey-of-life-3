<template>
  <view class="header-nav" :class="{ fixed: scrollTop > 300 }">
    <view class="search-container">
      <view class="locale-wrapper">
        <TuanLocation>
          <text class="locale">{{
            $store.getters.currentCity || '龙江镇'
          }}</text>
        </TuanLocation>
        <image class="locale-icon" src="../../../../static/images/new-brand/index/down-arrow.png" mode="" />
      </view>

      <view class="search-wrapper">
        <image class="search-icon" src="../../../../static/images/new-brand/index/search-icon.png" mode="" />
        <input @click="go('/pages/search-page/search-page')" type="text" placeholder="请输入你想要的家具" />
      </view>

      <image @click="go('/user/sever/customer-service/customer-service')" class="message-icon"
        src="../../../../static/images/new-index/message.png" mode="" />
    </view>


    <!-- #ifdef H5 -->
    <view class="navs">
      <view class="item" v-for="(item, index) in menus" :class="{ active: index === current }" :key="index"
        @click="$emit('change', item.value)">{{ item.label }}</view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0,
    },

    scrollTop: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      menus: [
        { label: '搜家具', value: 0 },
        { label: '品牌工厂', value: 1 },
        { label: '全屋定制', value: 2 },
        { label: '智能选配', value: 3 },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.header-nav {
  position: relative;
  z-index: 10000;
  background-color: #fff;
  padding: 20upx;
  box-sizing: border-box;
  // #ifdef H5
  height: 206upx;
  // #endif

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .search-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .locale-wrapper {
      display: flex;
      align-items: center;

      .locale {
        font-size: 32upx;
        line-height: 48upx;
      }

      .locale-icon {
        width: 40upx;
        height: 40upx;
      }
    }

    .search-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      height: 72upx;
      background-color: #f6f6f5;
      border-radius: 100px;
      margin: 0 35upx 0 26upx;
      padding: 0 20upx;
      box-sizing: border-box;

      .search-icon {
        width: 32upx;
        height: 32upx;
        flex-shrink: 0;
        margin-right: 16px;
        padding-right: 16upx;
        border-right: 1upx solid #d5d4d1;
      }

      input {
        font-size: 28upx;
      }
    }

    .message-icon {
      width: 56upx;
      height: 56upx;
    }
  }

  .navs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 32upx 0 20upx 0;

    .item {
      position: relative;
      color: #8f8d85;
      font-size: 32upx;

      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 0;
        bottom: -14upx;
        left: 50%;
        transform: translateX(-50%);
        height: 8upx;
        border-radius: 100px;
        background-color: #ffc117;
        transition: width 350ms ease-in;
      }

      &.active {
        color: #141000;
        font-size: 32upx;
        font-weight: 500;

        &::after {
          width: 40upx;
        }
      }
    }
  }
}
</style>
