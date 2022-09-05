<template>
  <view class="design-detail-container">
    <img
      src="https://img1.baidu.com/it/u=1538765772,440770622&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500"
      alt=""
      class="bg-img"
    />
    <view class="main r-10">
      <view class="name f-c-3d">复试设计</view>
      <view class="infos b-c r-10">
        <img
          src="https://img0.baidu.com/it/u=1571446645,3970465857&fm=253&fmt=auto&app=138&f=JPEG?w=516&h=500"
          alt=""
          class="logo"
        />
        <view class="info">
          <view class="font-14 f-c-3d">团蜂家居设计</view>
          <view class="font-10 f-c-9">广东 佛山</view>
        </view>
        <button class="btn-chat">免费咨询</button>
      </view>

      <view class="total">
        <view class="title font-12 f-c-3d">全部 预算60万</view>
        <view class="tags font-10 f-c-9">
          <view class="tag">
            <img
              class="icon"
              src="../static/images/index/mm.png"
              alt=""
            />200平方</view
          >
          <view class="tag">复式</view>
          <view class="tag">现代简约</view>
          <view class="tag">佛山</view>
        </view>
      </view>

      <view class="explain">
        <view class="title font-14 f-c-3d">设计展示</view>

        <view class="item">项目：顺德龙江自建房</view>
        <view class="item">面积：200平方</view>
        <view class="item">风格：现代简约</view>
        <view class="item">设计：团蜂家居设计</view>
      </view>

      <view class="exhibition">
        <view class="title font-14 f-c-3d">设计展示</view>

        <img
          class="img-exhibition"
          src="https://img1.baidu.com/it/u=1537924616,2820095280&fm=253&fmt=auto&app=138&f=JPEG?w=864&h=360"
          alt=""
        />

        <img
          class="img-exhibition"
          src="https://img1.baidu.com/it/u=1537924616,2820095280&fm=253&fmt=auto&app=138&f=JPEG?w=864&h=360"
          alt=""
        />

        <img
          class="img-exhibition"
          src="https://img1.baidu.com/it/u=1537924616,2820095280&fm=253&fmt=auto&app=138&f=JPEG?w=864&h=360"
          alt=""
        />

        <img
          class="img-exhibition"
          src="https://img1.baidu.com/it/u=1537924616,2820095280&fm=253&fmt=auto&app=138&f=JPEG?w=864&h=360"
          alt=""
        />
      </view>
    </view>

    <view class="footer">
      <button class="btn font-14">电话咨询</button>

      <view class="icons">
        <view class="wrapper">
          <img src="../static/images/goods/shoucang.png" alt="" class="icon" />
          <text class="title f-c-9 font-12">收藏</text>
        </view>

        <view class="wrapper">
          <img src="../static/images/index/msg.png" alt="" class="icon" />
          <text class="title f-c-9 font-12">评价</text>
        </view>
      </view>
    </view>

    <img src="../static/images/index/share.png" alt="" class="share">
  </view>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="less" scoped>
.design-detail-container {
  .bg-img {
    width: 100%;
    object-fit: cover;
    height: 552upx;
  }

  .main {
    position: relative;
    padding: 48upx 40upx;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: -40upx;
    z-index: 10;

    .name {
      font-size: 36upx;
      margin-bottom: 30upx;
      font-weight: bold;
    }

    .infos {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24upx 28upx 28upx 40upx;
      margin-bottom: 32upx;

      .logo {
        width: 80upx;
        height: 80upx;
        margin-right: 22upx;
        border-radius: 50%;
      }

      .info {
        flex: 1;
      }

      .btn-chat {
        font-size: 28upx;
        background-color: #07b9b9;
        border-radius: 100upx;
        color: #fff;
      }
    }

    .total {
      .title {
        font-weight: bold;
      }

      .tags {
        display: flex;
        align-items: center;
        margin: 20upx 0 56upx 0;

        .icon {
          width: 24upx;
          margin-right: 10upx;
          vertical-align: -1px;
        }

        .tag {
          padding: 0 36upx;
          border-right: 1upx solid #999;

          &:last-child {
            border: none;
          }

          &:first-child {
            padding-left: 0;
          }
        }
      }
    }

    .explain,
    .exhibition {
      margin-bottom: 36upx;

      .title {
        font-weight: bold;
        margin-bottom: 16upx;
      }

      .item {
        font-size: 24upx;
        color: #3d3d3d;
        line-height: 1.5;
      }

      .img-exhibition {
        width: 100%;
        height: 346upx;
        border-radius: 10upx;
        object-fit: cover;
        margin-bottom: 36upx;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 112upx;
    background-color: #fff;
    padding: 0 32upx;
    box-sizing: border-box;
    z-index: 11;

    .btn {
      color: #000000;
      border-radius: 40upx;
      background-color: #fff;
      border: 1upx solid #999999;
      margin: 0;
    }

    .icons {
      display: flex;
      align-items: center;

      .wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;

        &:first-child {
          margin-right: 80upx;
        }

        .icon {
          width: 44upx;
        }

        .title {
          line-height: 1.5;
        }
      }
    }
  }

  .share{
    position: absolute;
    top: 40px;
    right: 30px;
    width: 20px;
  }
}
</style>
