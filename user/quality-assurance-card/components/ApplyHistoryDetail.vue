<template>
  <view class="apply-history-detail-container">
    <tui-collapse @click="$emit('changeCurrent', tag)" :index="tag" :current="currentCollapseIndex">
      <template v-slot:title>
        <view class="header" :style="{ 'border-bottom': tag === currentCollapseIndex ? '1rpx solid #cccc' : 'none' }">空调清洗服务 - ZB123465498631</view>
      </template>
      <template v-slot:content>
        <view class="title flex-items flex-sp-between">
          申请详情
          <view class="status">处理中</view>
        </view>
        <view class="main">
          <view class="detail-info">
            <view class="item flex-items">
              <view class="label">申请编号：</view>
              <view class="value">447847854555454515552</view>
            </view>
            <view class="item flex-items">
              <view class="label">申请时间：</view>
              <view class="value">2024年5月27日 12:00:00</view>
            </view>
            <view class="item flex-items">
              <view class="label">申请人：</view>
              <view class="value">梁先生</view>
            </view>
            <view class="item flex-items">
              <view class="label">联系电话：</view>
              <view class="value">13588996655</view>
            </view>
            <view class="item flex-items">
              <view class="label">服务类型：</view>
              <view class="value">空调清洗服务</view>
            </view>
            <view class="item flex-items">
              <view class="label">处理人：</view>
              <view class="value">蔡志伟</view>
            </view>
            <view class="item flex-items">
              <view class="label">处理人电话：</view>
              <view class="value">15866332211</view>
            </view>

            <button class="comment-btn" @click="$emit('cancel', info.qualityAssuranceCardSerialNumber)">取消申请</button>
          </view>
        </view>

        <!-- <view class="title flex-items flex-sp-between">
          服务评价

          <tui-rate :current="currentRate" :size="20" normal="#ccc" active="#ff7900" @change="setRate"></tui-rate>
        </view>

        <view class="rate-test-wrapper">
          <tui-textarea isCounter :borderBottom="false" :borderTop="false" :size="24" padding="24rpx" backgroundColor="#ebebeb" placeholder="说点啥吧"></tui-textarea>

          <button class="comment-btn">提交评价</button>
        </view> -->
      </template>
    </tui-collapse>
  </view>
</template>

<script>
export default {
  props: {
    currentCollapseIndex: {
      type: Number,
      required: true
    },

    tag: {
      type: Number,
      required: true
    },

    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentRate: 5
    }
  },

  methods: {
    setRate(e) {
      this.currentRate = e.index
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .tui-textarea__wrap {
  border-radius: 10rpx;
}
.apply-history-detail-container {
  margin-bottom: 30rpx;
  .header {
    padding: 30rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-radius: 10rpx;
  }

  .title {
    position: relative;
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    height: 64rpx;
    color: #222229;
    font-weight: bold;
    background-color: #fff;

    .status {
      color: #ef530e;
    }

    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      position: absolute;
      left: -10rpx;
      top: 50%;
      transform: translateY(-50%);
      background-color: #ef530e;
      border-radius: 50%;
    }
  }

  .rate-test-wrapper {
    padding: 30rpx 22rpx;
    background-color: #fff;
  }

  .comment-btn {
    background-color: #ef530e;
    font-size: 35rpx;
    color: #fff;
    font-weight: bold;
    margin-top: 30rpx;
  }

  .main {
    .detail-info {
      padding: 10rpx 24rpx;
      box-sizing: border-box;
      background-color: #fff;
      .item {
        height: 64rpx;
        font-size: 24rpx;
        color: #000;

        .label {
          width: 148rpx;

          margin-right: 64rpx;
          line-height: 64rpx;
        }
      }
    }
  }
}
</style>
