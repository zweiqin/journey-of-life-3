<template>
  <view class="serve-shop-container">
    <view class="bar" @click="go('/community-center/shop/shop')">
      <image class="bar-img" src="../../../static/images/new-community/home/wdnmdBanner.png"></image>
    </view>

    <view class="shop-list">
      <view class="content">
        <Articles v-for="(item, index) in renderData" :key="index" :datas="item"></Articles>
        <button class="Release">
          发布
        </button>
        <view class="more" @click="go('/community-center/makeSmallFortune/index')">
          <button class="uni-btn">
            查看更多
            <tui-icon :size="18" name="arrowright"></tui-icon>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Articles from './Articles.vue'
export default {
  name: "MakeSmallFortune",
  components: {
    Articles
  },
  props: {},
  data() {
    return {
        renderData: [
          {
            title: '',
            timer: '',
            isOver: false,
            readerAvata: [
              require('@/static/images/new-community/home/avatar1.png'),
              require('@/static/images/new-community/home/avatar2.png'),
              require('@/static/images/new-community/home/avatar3.png')
            ],
            maxPrice: '99',
            isReadNumber: '666',
            coverSheet: require('@/static/images/new-community/home/CoverSheet.png')
          },
          {
            title: '',
            timer: '',
            isOver: true,
            readerAvata: [
              require('@/static/images/new-community/home/avatar1.png'),
              require('@/static/images/new-community/home/avatar2.png'),
              require('@/static/images/new-community/home/avatar3.png')
            ],
            maxPrice: '99',
            isReadNumber: '666',
            coverSheet: require('@/static/images/new-community/home/CoverSheet.png')
          }
        ]
    }
  },
  computed: {},
  methods: {},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
.serve-shop-container {
  width: 100%;

  .bar {
    height: 257upx;
    background-color: #fffbf4;

    .bar-img {
      width: 100%;
      height: 100%;
    }
  }
    .shop-list {
      margin-top: -114upx;
      padding: 38upx 30upx;
      box-sizing: border-box;

      .content {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 20upx;
        background-color: #fff;
        padding: 38upx 0;
        box-sizing: border-box;
        z-index: 10;
      }
      .Release {
        width: 646rpx;
        height: 77rpx;
        line-height: 77rpx;
        border-radius: 50rpx;
        color: #fff;
        background: #EF530E;
      }
      .Release:active {
        background: #c64711;
      }
  }

  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24upx;

    .uni-btn {
      display: flex;
      align-items: center;
      font-size: 24upx;
      color: #9e9e9e;
    }
  }
}
</style>