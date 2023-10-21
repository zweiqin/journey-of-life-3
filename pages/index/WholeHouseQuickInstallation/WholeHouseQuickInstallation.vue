<template>
  <view class="whole-house-quick-installation-container">
    <view class="banner-wrapper">
      <image class="banner-img" src="@/static/images/new-index/kuaizhuang/kuaizhuang-banner.png"></image>
    </view>

    <view class="main">
      <!-- 四个单项 -->
      <view class="menu-pane">
        <view class="menu-list">
          <view class="menu-item">
            <view class="menu-name">客厅翻新</view>
            <image src="@/static/images/new-index/kuaizhuang/ketingfanxin.png" class="menu-img"></image>
          </view>
          <view class="menu-item">
            <view class="menu-name">卧室翻新</view>
            <image src="@/static/images/new-index/kuaizhuang/woshifanxin.png" class="menu-img"></image>
          </view>
          <view class="menu-item">
            <view class="menu-name">餐厅翻新</view>
            <image src="@/static/images/new-index/kuaizhuang/cantingfanxin.png" class="menu-img"></image>
          </view>
          <view class="menu-item">
            <view class="menu-name">全屋整装</view>
            <image src="@/static/images/new-index/kuaizhuang/quanwuzhengzhuang.png" class="menu-img"></image>
          </view>
        </view>

        <button class="uni-btn">咨询预约</button>

        <view class="tip">
          <image src="https://img0.baidu.com/it/u=142583684,3035502695&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" class="user-avatar"></image>
          戴* 179****4891 刚刚咨询预约
        </view>
      </view>

      <!-- 活动优惠 -->
      <view class="active-preferential">
        <view class="title-wrapper">
          <view class="left-bar"></view>
          <view class="title-text">活动优惠</view>
          <view class="right-bar"></view>
        </view>

        <view class="active-pane-list">
          <view class="item">
            <image class="active-iamge" src="../../../static/images/new-index/kuaizhuang/a-1.png"></image>
            <view class="active-title"><text style="color: #ef530e">免费</text>上门量房</view>
          </view>
          <view class="item">
            <image class="active-iamge" src="../../../static/images/new-index/kuaizhuang/a-2.png"></image>
            <view class="active-title"><text style="color: #ef530e">免费</text>老房诊断</view>
          </view>
          <view class="item">
            <image class="active-iamge" src="../../../static/images/new-index/kuaizhuang/a-3.png"></image>
            <view class="active-title"><text style="color: #ef530e">免费</text>门型规划</view>
          </view>
        </view>
      </view>

      <!-- 精选案例 -->
      <view class="" hover-class="none" hover-stop-propagation="false">
        
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@border-bolor: #d8d8d8;
@main-color: #222229;

.whole-house-quick-installation-container {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fcff 0%, #edf3ff 20%, #f6f6f8 72%);

  .banner-wrapper {
    width: 100%;
    height: 499upx;

    .banner-img {
      width: 100%;
      height: 100%;
    }
  }

  .main {
    position: relative;
    z-index: 1;
    width: 100%;
    margin-top: -100upx;
    padding: 0 30upx;
    box-sizing: border-box;

    .menu-pane {
      background-color: #fff;
      padding: 30upx 26upx;
      box-sizing: border-box;
      border-radius: 20upx;

      .menu-list {
        position: relative;
        width: 638upx;
        height: 363upx;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        background-color: #f6f6f8;
        padding: 35upx 29upx;
        box-sizing: border-box;

        &::after {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          content: '';
          display: block;
          width: 1upx;
          height: 294upx;
          background-color: #d8d8d8;
        }

        &::before {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          content: '';
          display: block;
          width: 579.5upx;
          height: 1upx;
          background-color: #d8d8d8;
        }

        .menu-item {
          width: 50%;
          height: 50%;
          display: flex;
          align-items: center;

          &:nth-child(2n) {
            justify-content: center;
          }

          color: @main-color;
          font-size: 32upx;
          font-weight: 500;

          .menu-img {
            width: 84upx;
            height: 84upx;
            margin-left: 30upx;
          }
        }
      }

      .uni-btn {
        width: 100%;
        height: 88upx;
        border-radius: 100px;
        color: #fff;
        background-color: #ef530e;
        font-size: 32upx;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 44upx 0 24upx 0;
      }
    }

    .tip {
      display: flex;
      align-items: center;
      width: 543upx;
      height: 65upx;
      background-color: #edf3ff;
      margin: 0 auto;
      border-radius: 100px;
      padding-left: 48upx;
      font-size: 28upx;
      color: @main-color;

      .user-avatar {
        width: 43upx;
        height: 43upx;
        border-radius: 50%;
        margin-right: 20upx;
      }
    }

    .active-preferential {
      .title-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 40upx 0;

        .left-bar {
          width: 94upx;
          height: 4upx;
          background-color: #ef530e;
          background: linear-gradient(to right, #fff, #0e1e37);
        }

        .title-text {
          color: #08377f;
          font-size: 37upx;
          font-weight: bold;
          margin: 0 29upx;
        }

        .right-bar {
          width: 94upx;
          height: 4upx;
          background-color: #ef530e;
          background: linear-gradient(to right, #0e1e37, #fff);
        }
      }

      .active-pane-list {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item {
          width: 215upx;
          height: 228upx;
          border-radius: 20upx;
          background-color: #fff;

          .active-iamge {
            height: 164upx;
            width: 100%;
          }

          .active-title {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26upx;
            line-height: 1.5;
          }
        }
      }
    }
  }
}
</style>
