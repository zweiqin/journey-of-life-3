<template>
  <view class="package-pane-container" v-if="data">
    <view v-if="data.isTime" class="in-time">限时抢购</view>

    <view class="main">
      <view class="package-name">
        <view class="tags">
          <view class="tag"></view>
          <view class="tag"></view>
          <view class="tag"></view>
        </view>
        <view class="title"> {{ data.name }} </view>
      </view>

      <view v-if="data.subTitle" class="sub-title"> {{ data.subTitle }} </view>

      <ul class="list">
        <li v-for="(key, index) in data.desc" :key="index">{{ key }}</li>
      </ul>

      <view class="footer">
        <view class="real-price">
          <text class="text">￥{{ data.price }}</text
          >/年
        </view>
        <view class="now-price" v-if="data.originPrice"
          >原价:{{ data.originPrice }}</view
        >
        <button class="uni-btn">点击购买</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.package-pane-container {
  font-size: 32upx;
  width: 100%;
  background-color: #fff;
  border-radius: 20upx;
  overflow: hidden;
  margin-bottom: 40upx;

  .in-time {
    color: #fa5151;
    padding: 12upx 16upx;
    background: linear-gradient(180deg, #ffd100, #ffffff, #ffd100);
    display: inline-flex;
    border-radius: 0 0 10upx 0;
  }

  .main {
    padding: 24upx 34upx 32upx 34upx;
    box-sizing: border-box;
  }

  .package-name {
    font-size: 48upx;
    font-weight: bold;
    text-align: center;
    position: relative;
    margin-bottom: 22upx;

    .tags {
      .tag {
      }
    }

    .title {
    }
  }

  .sub-title {
    line-height: 2;
  }

  .list {
    padding: 0;
    li {
      line-height: 2;
    }
  }

  .footer {
    padding-top: 16upx;
    margin-top: 20upx;
    border-top: 1upx dotted #fa5151;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    .real-price {
      margin-right: 40upx;
      margin-top: 2upx;
      .text {
        color: #fa5151;
        font-size: 48upx;
      }
    }

    .now-price {
      font-size: 28upx;
      margin-right: 40upx;
      line-height: 1.5;
      color: #fa5151;
      text-decoration: line-through;
    }

    .uni-btn {
      margin: 0;
      width: 200upx;
      height: 60upx;
      line-height: 60upx;
      border-radius: 100px;
      background-color: #fa5151;
      border: none;
      font-size: 32upx;
      color: #fff;
      outline: none;
      // line-height: 1;
    }
  }
}
</style>