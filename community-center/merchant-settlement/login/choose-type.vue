<template>
  <view class="choose-type-page">
    <view style="display: flex; align-items: center; justify-content: flex-end">
      <!-- <tui-icon :size="30" name="toleft"></tui-icon> -->
      <button class="uni-btn skip-btn">跳过</button>
    </view>

    <view class="page-title-wrapper">
      <view class="main-title">欢迎进入商家端</view>
      <view class="tip">选择您的门店标签 </view>
    </view>

    <view class="style-list">
      <view class="style-header">
        <view class="title">行业标签</view>
        <view class="choose-all">
          <view class="circle">
            <!-- <tui-icon v-show="" :size="16" color="#EF530E" name="check"></tui-icon> -->
          </view>
          <text class="text"> 全选 </text>
        </view>
      </view>

      <view class="list">
        <view class="item" v-for="item in styleList" @click="handleChooseStyle(item)">
          <view class="image-wrapper">
            <image class="icon" :src="item.icon"></image>
            <view class="choose" v-if="item.label">
              <tui-icon v-show="currentSelectStyle.includes(item.label)" :size="16" color="#EF530E" name="check"></tui-icon>
            </view>
          </view>

          <view class="style-name">{{ item.label }}</view>
        </view>
      </view>
    </view>

    <view class="footer">
      <button class="uni-btn">已选1种商圈类型</button>
    </view>
  </view>
</template>

<script>
import { styleList } from './config';
export default {
  data() {
    return {
      styleList: Object.freeze(styleList),
      currentSelectStyle: []
    };
  },
  methods: {
    handleChooseStyle(styleInfo) {
      if (this.currentSelectStyle.includes(styleInfo.label)) {
        this.currentSelectStyle = this.currentSelectStyle.filter((label) => label !== styleInfo.label);
      } else {
        this.currentSelectStyle.push(styleInfo.label);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@main-color: #222229;
.choose-type-page {
  padding: 30upx;
  box-sizing: border-box;

  .skip-btn {
    color: @main-color;
    font-size: 28upx;
  }

  .page-title-wrapper {
    margin: 24upx 0 48upx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .main-title {
      font-size: 38upx;
      font-weight: 500;
      color: @main-color;
      margin-bottom: 24upx;
    }

    .tip {
      color: #888889;
      font-size: 28upx;
    }
  }

  .style-list {
    .style-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        color: @main-color;
        font-size: 32upx;
      }

      .choose-all {
        display: flex;
        align-items: center;
        font-size: 24upx;
        color: #888889;

        .circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32upx;
          height: 32upx;
          border-radius: 50%;
          border: 1upx solid @main-color;
        }

        .text {
          margin-left: 8upx;
        }
      }
    }

    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 55upx;
      padding: 0 30upx;
      box-sizing: border-box;

      .item {
        margin-right: 36upx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 30upx;

        &:nth-child(5n) {
          margin-right: 0;
        }
      }

      .image-wrapper {
        position: relative;
        width: 80upx;
        height: 80upx;
        position: relative;
        margin-bottom: 20upx;

        .choose {
          position: absolute;
          top: -16upx;
          right: -22upx;
          width: 34upx;
          height: 34upx;
          border-radius: 50%;
          border: 1upx solid #222229;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon {
          width: 100%;
          height: 100%;
        }
      }

      .style-name {
        font-size: 24upx;
        color: #222229;
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120upx;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0px -1px 0px 0px #e6e6e8;

    .uni-btn {
      width: 690upx;
      height: 88upx;
      background-color: #3982f1;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32upx;
    }
  }
}
</style>
