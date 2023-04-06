<template>
  <view class="article-list">
    <view class="tabs">
      <view class="item" @click="handleSwitch('experience')" :class="{ active: currentTab === 'experience' }">居家经验</view>
      <view class="item" @click="handleSwitch('share')" :class="{ active: currentTab === 'share' }">家居分享</view>
    </view>
    <view class="article-list">
      <view class="top">
        <TuanImage :width="345" :height="130" radius="20rpx 20rpx 0 0"
          :src="require('../../../static/images/con-center/new-home/f03ebfae94d6e6c55b283abb2e41118.png')"></TuanImage>
      </view>

      <view class="article-item">
        <view class="article-title">洗衣机细菌超标高达 81.3%。教你一招，不必请...</view>
        <TuanImage :width="100" radius="0" :height="60"
          :src="require('../../../static/images/con-center/new-home/zu.png')">
        </TuanImage>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'experience'
    }
  },

  methods: {
    handleSwitch(tab) {
      this.currentTab = tab
    }
  },
}
</script>

<style lang="less" scoped>
.article-list {
  padding-bottom: 100upx;

  .tabs {
    padding: 0 22upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .item {
      margin-right: 60upx;
      font-size: 36upx;
      position: relative;
      transition: 350ms font-weight;



      &::after {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        content: '';
        display: block;
        background: url('../../../static/images/con-center/new-home/line.png') no-repeat;
        background-size: cover;
        width: 84upx;
        height: 20upx;
        opacity: 0;
        transition: 350ms;
      }

      &.active {
        font-weight: bold;

        &::after {
          opacity: 1;
        }
      }
    }
  }

  .article-list {
    margin-top: 30upx;

    &:nth-child(:last-child) {
      border-bottom: none;
    }

    .article-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 30upx;
      box-sizing: border-box;
      border-bottom: 1upx solid #D8D8D8;



      .article-title {
        width: 410upx;
        font-weight: 500;
        color: #3d3d3d;
        font-size: 32upx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>