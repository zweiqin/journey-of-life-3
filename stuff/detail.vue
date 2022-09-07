<template>
  <view class="stuff-detail-container">
    <!-- 头部区域 -->
    <view class="header">
      <img
        class="back"
        src="../static/images/store/chevron-states.png"
        alt=""
      />
      <view class="title">皮革</view>
      <view class="search">
        <img
          src="../static/images/index/search.png"
          alt=""
          class="search-icon"
        />
      </view>
    </view>

    <!-- 筛选区域1 -->
    <scroll-view scroll-x="true" class="screen1">
      <img
        class="toggle breath"
        src="../static/images/common/toggle1.png"
        alt=""
      />
      <view class="scroll-view-item active">
        <img
          class="product-img"
          src="https://img2.baidu.com/it/u=3160836043,2019767882&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=723"
          alt=""
        />
        <text>全部</text>
      </view>
      <view class="scroll-view-item">
        <img
          class="product-img"
          src="https://img2.baidu.com/it/u=3160836043,2019767882&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=723"
          alt=""
        />
        <text>全部</text>
      </view>
      <view class="scroll-view-item">
        <img
          class="product-img"
          src="https://img2.baidu.com/it/u=3160836043,2019767882&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=723"
          alt=""
        />
        <text>全部</text>
      </view>
      <view class="scroll-view-item">
        <img
          class="product-img"
          src="https://img2.baidu.com/it/u=3160836043,2019767882&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=723"
          alt=""
        />
        <text>全部</text>
      </view>
      <view class="scroll-view-item">
        <img
          class="product-img"
          src="https://img2.baidu.com/it/u=3160836043,2019767882&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=723"
          alt=""
        />
        <text>全部</text>
      </view>
      <view class="scroll-view-item">
        <img
          class="product-img"
          src="https://img2.baidu.com/it/u=3160836043,2019767882&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=723"
          alt=""
        />
        <text>全部</text>
      </view>
      <view class="scroll-view-item">
        <img
          class="product-img"
          src="https://img2.baidu.com/it/u=3160836043,2019767882&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=723"
          alt=""
        />
        <text>全部</text>
      </view>
    </scroll-view>

    <!-- 筛选区域2 -->
    <view class="screen2">
      <ul>
        <li>综合排序</li>
        <li><Choose title="尺寸"></Choose></li>
        <li><Choose title="价格"></Choose></li>
        <li><Choose title="颜色"></Choose></li>
      </ul>
    </view>

    <!-- 商品区域 -->
    <view class="goods-container">
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
    </view>

    <!-- 选择 -->
    <view class="choose-area">
      <view class="mask"></view>
      <view class="content"> 123456 </view>
    </view>
  </view>
</template>

<script>
import Choose from "../components/choose";
import Goods from "../components/goods";
export default {
  components: {
    Choose,
    Goods,
  },
};
</script>

<style lang="less" scoped>
@import "../style/mixin.less";
@import "../style/var.less";
.stuff-detail-container {
  padding: 74upx 34upx 34upx 34upx;

  .header {
    .flex();
    color: @c3d;
    font-size: @f16;
    margin-bottom: 40upx;

    .back {
      width: 28px;
    }

    .search {
      .search-icon {
        width: 32upx;
      }
    }
  }

  .screen1 {
    position: relative;
    .toggle {
      position: absolute;
      .img(40upx);
      right: 10upx;
      top: 100upx;

      &.breath {
        animation: breath 1s linear infinite;
        transition: all 350ms linear;

        @keyframes breath {
          0% {
            transform: scale(0.9);
          }

          50% {
            transform: scale(1);
          }

          100% {
            transform: scale(0.9);
          }
        }
      }
    }

    /deep/ .uni-scroll-view-content {
      display: flex;
    }

    /deep/::-webkit-scrollbar {
      display: none;
      width: 0 !important;
      height: 0 !important;
      -webkit-appearance: none;
      background: transparent;
      color: transparent;
    }

    .scroll-view-item {
      width: 152upx;
      height: 224upx;
      flex-shrink: 0;
      margin-right: 30upx;
      padding: 18upx 10upx;
      text-align: center;
      // background-color: antiquewhite;
      color: @c3d;
      font-size: @f10;

      .product-img {
        .img(132upx);
        margin-bottom: 16upx;
      }

      &:last-child {
        margin-right: 0;
      }

      &.active {
        border-radius: @r10;
        .border();
      }
    }
  }

  .screen2 {
    ul {
      margin: 0;
      padding: 0;
      .flex();
      color: @c0;
      font-size: @f12;
      margin: 26upx 0;

      li {
        &:first-child {
          font-weight: bold;
        }
      }
    }
  }

  .goods-container {
    .flex();
    flex-wrap: wrap;
  }

  .choose-area {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 150upx;
    left: 0;

    .mask {
      width: 100%;
      height: 100%;
      background-color: aqua;
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
    }
  }
}
</style>