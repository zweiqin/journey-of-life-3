<template>
  <view class="design-container" @click="toDetail">
    <view class="header">
      <img
        src="https://img2.baidu.com/it/u=1995726441,2152548729&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=509"
        alt=""
        class="avatar"
      />
      <view class="info">
        <view class="text">广告设计</view>
        <view class="desc">设计费：咨询</view>
      </view>

      <button class="consult">免费咨询</button>
    </view>
    <view class="main">
      <scroll-view class="scroll-view_H" :scroll-x="true" scroll-left="120">
        <view class="item">
          <img
            class="img"
            src="https://img2.baidu.com/it/u=3990862136,2888876021&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
            alt=""
          />

          <view class="title text"
            >大型户外设计、公司宣传手册设计、海报设计大型户外设计、公司宣传手册设计、海报设计</view
          >

          <view class="footer">
            <view class="tag">佛山</view>
            <view class="tag">广告</view>
            <view class="tag">原创</view>
          </view>
        </view>

        <view class="item">
          <img
            class="img"
            src="https://img2.baidu.com/it/u=2287502323,3141509394&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
            alt=""
          />

          <view class="title text"
            >大型户外设计、公司宣传手册设计、海报设计大型户外设计、公司宣传手册设计、海报设计</view
          >

          <view class="footer">
            <view class="tag">佛山</view>
            <view class="tag">广告</view>
            <view class="tag">原创</view>
          </view>
        </view>

        <view class="item">
          <img
            class="img"
            src="https://img1.baidu.com/it/u=2424222942,2292738143&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
            alt=""
          />

          <view class="title text"
            >大型户外设计、公司宣传手册设计、海报设计大型户外设计、公司宣传手册设计、海报设计</view
          >

          <view class="footer">
            <view class="tag">佛山</view>
            <view class="tag">广告</view>
            <view class="tag">原创</view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="footer"></view>
  </view>
</template>

<script>
export default {
  methods: {
    toDetail() {
      uni.navigateTo({
        url: "/pages/index/design-detail",
        animationType: "pop-in",
        animationDuration: 500,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.design-container {
  margin-top: 16upx;
  background-color: #fff;
  padding-bottom: 12upx;
  border-bottom: 1upx solid #e9e9e9;

  .text {
    font-size: 28upx;
    color: #3d3d3d;
    font-weight: bold;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6upx 15upx;

    .avatar {
      width: 100upx;
      height: 100upx;
      object-fit: cover;
      box-sizing: border-box;
      margin-right: 24upx;
    }

    .info {
      flex: 1;
      .desc {
        font-size: 20upx;
        line-height: 20px;
      }
    }

    .consult {
      color: #fff;
      font-size: 24upx;
      background-color: #07b9b9;
      padding: -2upx 10upx;
    }
  }

  .main {
    margin: 14upx 0;
    .scroll-view_H {
      white-space: nowrap;

      /deep/ .uni-scroll-view-content {
        display: flex;
      }

      /deep/ ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
        color: transparent;
      }

      .item {
        width: 586upx;
        float: left;
        margin-right: 8upx;
      }

      .img {
        width: 100%;
        height: 284upx;
        object-fit: cover;
        border-radius: 10upx;
      }

      .title {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 10upx;
      }

      .footer {
        display: flex;
        align-items: center;

        .tag {
          color: #999999;
          font-size: 20upx;
          padding: 0 18upx;
          border-right: 1upx solid #999999;

          &:first-child {
            padding-left: 0;
          }

          &:last-child {
            border: none;
          }
        }
      }
    }
  }
}
</style>