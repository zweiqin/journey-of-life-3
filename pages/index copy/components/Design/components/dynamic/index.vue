<template>
  <view class="dynamic-container">
    <view class="header flex-center">
      <img
        src="https://img1.baidu.com/it/u=3110197796,104262627&fm=253&fmt=auto&app=138&f=JPEG?w=556&h=500"
        alt=""
        class="avatar"
      />
      <view class="name">团蜂家居设计</view>
    </view>

    <view class="time-link flex-center">
      <view class="link" @click="handleToViewDesginDetail">家装修案例#</view>
      <view class="time">2022-08-15 发布了动态</view>
    </view>

    <view class="desc">
      装修是一件很重要的繁琐事，对于绝大部分人来说，不仅经济上
      要投入很多钱，时间精力上要劳心劳力，情感上是一家人长期居
      住的地方，但是和爱的人住在新家，咱操心也是幸福...
      <text class="showDetail">展开</text>
    </view>

    <view class="imgs">
      <img
        class="img"
        src="https://img1.baidu.com/it/u=3647323879,2010356188&fm=253&fmt=auto&app=138&f=JPEG?w=735&h=500"
        alt=""
      />
      <img
        class="img"
        src="https://img1.baidu.com/it/u=3647323879,2010356188&fm=253&fmt=auto&app=138&f=JPEG?w=735&h=500"
        alt=""
      />
      <img
        class="img"
        src="https://img1.baidu.com/it/u=3647323879,2010356188&fm=253&fmt=auto&app=138&f=JPEG?w=735&h=500"
        alt=""
      />
      <img
        class="img"
        src="https://img1.baidu.com/it/u=3647323879,2010356188&fm=253&fmt=auto&app=138&f=JPEG?w=735&h=500"
        alt=""
      />
      <img
        class="img"
        src="https://img1.baidu.com/it/u=3647323879,2010356188&fm=253&fmt=auto&app=138&f=JPEG?w=735&h=500"
        alt=""
      />
      <view class="img"></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    handleToViewDesginDetail() {
      uni.navigateTo({
        url: "/home/design-detail",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dynamic-container {
  margin-top: 40upx;
  .header {
    font-size: 24upx;
    color: #999999;

    .avatar {
      width: 48upx;
      height: 48upx;
      border-radius: 50%;
      margin-right: 18upx;
    }
  }

  .time-link {
    font-size: 20upx;
    margin: 12upx 0 18upx 0;
    box-sizing: border-box;
    padding-left: 100upx;
    justify-content: space-between;

    .link {
      position: relative;
      color: #3662ec;

      &::before {
        position: absolute;
        display: block;
        content: "";
        width: 28upx;
        height: 28upx;
        left: -34upx;
        background: url("../../../../../../static/images/index/link.png");
        background-size: cover;
      }
    }

    .time {
      color: #999999;
    }
  }

  .desc {
    font-size: 24upx;
    color: #3d3d3d;
    line-height: 1.5;

    .showDetail {
      color: #07b9b9;
      margin-left: 20upx;
    }
  }

  .imgs {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20upx;

    .img {
      width: 222upx;
      height: 222upx;
      object-fit: cover;
      border-radius: 10upx;
      margin-bottom: 10upx;
    }
  }
}
</style>