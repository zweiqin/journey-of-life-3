<template>
  <view class="serve-detail">
    <img
      @click="back"
      src="../static/images/store/chevron-states.png"
      alt=""
      class="back"
    />
    <view class="goods-img">
      <img
        class="img"
        src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00674-4125.jpg"
        alt=""
      />
    </view>

    <!-- 保障 -->
    <view class="flex guarantee">
      <view class="name">保障</view>
      <view class="tag">每日测温</view>
      <view class="tag">工具消毒</view>
      <view class="tag">安装保障</view>
      <img src="../static/images/common/chevron-states.png" alt="" />
    </view>

    <!-- 主区域 -->
    <view class="main">
      <view class="title flex">
        <view class="tag">团蜂家居社区</view>
        <view class="text">空调安装</view>
      </view>

      <view class="total flex">
        <view class="text">已成单 <text class="number">100w+</text></view>
        <view class="text">好评率 <text class="number">99.9%</text></view>
      </view>

      <view class="rate flex">
        <view class="text">评论1000+条</view>
        <view class="text">晒图200+张</view>
        <view class="text">视频20+条</view>
      </view>

      <!-- 选择服务 -->
      <view class="serve">
        <view class="title">
          选择服务<text class="desc"
            >（仅为安装费用，不包含安装外的其他费用）</text
          >
        </view>

        <view class="serve-item">
          <view class="sub-title">尺寸</view>
          <view class="choose-items flex">
            <view class="item active">
              <view class="type-name">正1匹</view>
              <view class="type-price"
                >￥<text class="number">150</text>元/台</view
              >
            </view>
            <view class="item">
              <view class="type-name">正1匹</view>
              <view class="type-price"
                >￥<text class="number">150</text>元/台</view
              >
            </view>
            <view class="item">
              <view class="type-name">正1匹</view>
              <view class="type-price"
                >￥<text class="number">150</text>元/台</view
              >
            </view>
            <view class="item">
              <view class="type-name">正1匹</view>
              <view class="type-price"
                >￥<text class="number">150</text>元/台</view
              >
            </view>
            <view class="item">
              <view class="type-name">正1匹</view>
              <view class="type-price"
                >￥<text class="number">150</text>元/台</view
              >
            </view>
          </view>
        </view>
      </view>

      <LineBar v-for="item in orders" :key="item.label" :data="item">
        <template v-if="item.value === 0">
          <view class="desc">（请输入详细安装地址）</view>
        </template>

        <template v-if="item.value === 1">
          <view class="desc">最快两小时上门</view>
        </template>
      </LineBar>

      <!-- 说明 - 服务 - 评价 -->
      <view class="explain-item"> 费用说明 </view>
      <view class="explain-item"> 服务说明 </view>
      <view class="explain-item"> 用户评价 </view>
    </view>

    <!-- footer -->
    <view class="footer flex">
      <view class="kefu flex">
        <img class="img" src="../static/images/goods/kefu.png" alt="" />
        客服
      </view>

      <button class="btn">电话咨询</button>
      <button class="btn" @click="appointment">预约上门</button>
    </view>
  </view>
</template>

<script>
import PageHeader from "../components/page-header";
import LineBar from "../components/line-bar";
import { orderDetail } from "./config";
export default {
  components: {
    PageHeader,
    LineBar,
  },
  data() {
    return {
      orders: orderDetail(),
    };
  },
  methods: {
    /**
     * @description 回退
     */
    back() {
      uni.navigateBack();
    },

    /**
     * @description 点击预约
     */
    appointment() {
      uni.navigateTo({
        url: "/community-center/confirm-order",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  align-items: center;
}

.serve-detail {
  box-sizing: border-box;
  padding-bottom: 100upx;

  .back {
    width: 40upx;
    padding: 68upx 0 20upx 34upx;
  }

  .goods-img {
    width: 100%;

    .img {
      width: 100%;
      display: block;
    }
  }

  .guarantee {
    justify-content: space-between;
    height: 72upx;
    line-height: 72upx;
    padding: 0 36upx;
    background: #f0fffa;

    .name {
      color: #3d3d3d;
      font-size: 24upx;
    }

    .tag {
      position: relative;
      color: #07b9b9;
      font-size: 20upx;
      padding-left: 25upx;

      &::before {
        content: "";
        display: block;
        width: 22upx;
        height: 22upx;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: url("../static/images/common/gou.png");
        background-size: cover;
      }
    }
  }

  .main {
    padding: 10upx 34upx;

    .title {
      .tag {
        font-size: 20upx;
        background-color: #ff8f1f;
        padding: 4upx 34upx;
        border-radius: 20upx;
        color: #fff;
        margin-right: 22upx;
      }

      .text {
        color: #3d3d3d;
        font-size: 32upx;
      }
    }

    .total {
      font-size: 20upx;
      color: #3d3d3d;
      margin: 16upx 0 23upx 0;

      .text {
        margin-right: 46upx;
      }

      .number {
        color: #ff8f1f;
      }
    }

    .rate {
      .text {
        font-size: 20upx;
        margin-right: 46upx;
        font-weight: 100;
      }
    }

    .serve {
      .title {
        font-size: 28upx;
        font-weight: bold;
        margin: 18upx 0;

        .desc {
          color: #ccc;
          font-weight: 100;
          font-size: 24upx;
        }
      }

      .serve-item {
        .sub-title {
          font-size: 24upx;
          font-weight: 100;
          margin-bottom: 16upx;
        }

        .choose-items {
          flex-wrap: wrap;
          justify-content: space-between;

          .item {
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            width: 320upx;
            height: 100upx;
            background-color: #efefef;
            margin-bottom: 16upx;
            border-radius: 10upx;
            padding-left: 40upx;
            box-sizing: border-box;

            &.active {
              background-color: #fcdbdb;
            }

            .type-name {
              color: #3d3d3d;
              font-size: 28upx;
            }

            .type-price {
              font-size: 24upx;

              .number {
                color: #fa5151;
                font-size: 32upx;
              }
            }
          }
        }
      }
    }

    .desc {
      color: #999;
      font-size: 20upx;
    }

    .explain-item {
      background-color: #fff;
      margin: 10upx 0;
      text-align: center;
      height: 90upx;
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    height: 112upx;
    width: 100%;
    padding: 20upx 36upx;
    background-color: #fff;
    box-sizing: border-box;

    .kefu {
      color: #3d3d3d;
      font-size: 24upx;
      flex-direction: column;
      align-items: center;

      .img {
        width: 44upx;
      }
    }

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 256upx;
      height: 72upx;
      color: #fff;
      font-size: 36upx;

      &:nth-child(2) {
        background-color: #07b9b9;
      }
      &:nth-child(3) {
        background-color: #fa5151;
      }
    }
  }
}
</style>