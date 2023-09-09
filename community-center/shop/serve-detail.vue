<template>
  <view class="serve-detail-containter" v-if="serveDeatil">
    <view class="serve-header">
      <image @click="handleBack" class="back-icon" src="../../static/images/new-community/shop/order-detail-back.png"></image>
      <view class="serve-name">{{ serveDeatil.goodsName }}</view>
    </view>

    <view class="image-list">
      <swiper class="swiper-container" autoplay>
        <swiper-item class="swiper-item">
          <view class="image-wtapper">
            <image class="swiper-img" src="https://img1.baidu.com/it/u=749926179,730497842&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800"></image>
          </view>
        </swiper-item>
      </swiper>

      <!-- 背景板 -->
      <image src="../../static/images/new-community/shop/imagebg.png" class="container-bg"></image>
      <!-- 服务内容 -->
      <view class="serve-name">{{ serveDeatil.goodsName }}</view>
      <!-- 原价 -->
      <view class="serve-price">
        ￥<text class="price-text">{{
          serveDeatil.preferentialPrice && serveDeatil.preferentialPrice < serveDeatil.goodsPrice ? serveDeatil.preferentialPrice : serveDeatil.goodsPrice
        }}</text>
      </view>
      <!-- 价格tag -->
      <view class="price-tag">{{ serveDeatil.preferentialPrice && serveDeatil.preferentialPrice < serveDeatil.goodsPrice ? '优惠价' : '一口价' }}</view>
    </view>

    <view class="serve-base-info">
      <view class="serve-name">{{ serveDeatil.goodsName }}</view>
      <!-- <view class="description">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur repellendus ab, quae alias optio voluptas debitis? Quod quis debitis consequatur
        voluptatum natus saepe asperiores, expedita, libero odio temporibus incidunt amet!
      </view> -->

      <view class="price-mode">
        <view class="tabs">
          <button @click="handleSwitchTab(0)" :class="{ active: currentMode === 0 }" class="uni-btn">一口价</button>
          <button @click="handleSwitchTab(1)" :class="{ active: currentMode === 1 }" class="uni-btn">人工报价</button>
        </view>

        <swiper style="height: 90upx" :duration="100" disable-touch :current="currentMode">
          <swiper-item>
            <view class="price-info">
              ￥
              <text class="price-value">{{
                serveDeatil.preferentialPrice && serveDeatil.preferentialPrice < serveDeatil.goodsPrice ? serveDeatil.preferentialPrice : serveDeatil.goodsPrice
              }}</text>
            </view>
          </swiper-item>
          <swiper-item>
            <view class="tip"> 请点击预约之后，点击下单，等待店长为您报价，之后请在个人中心社区订单处点击支付 </view>
          </swiper-item>
        </swiper>
      </view>

      <button class="uni-btn order-btn" @click="handleOrder">立即预约</button>
    </view>

    <view class="safeguard-description">
      <view class="item-title">保障</view>
      <view class="item-value">售后质保 · 服务专业 · 极速退款 · 意外承包</view>
    </view>

    <view class="serve-detail" v-if="serveDeatil && serveDeatil.goodsInfo">
      <uParse :content="serveDetail"></uParse>
    </view>

    <tui-modal :show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？" @click="_handleClickTuiModel($event, 'login')"></tui-modal>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { marked } from 'marked';
import { getShopGoodsDetailApi } from '../../api/community-center';
import uParse from '../../components/u-parse/u-parse.vue';
import showModalMixin from '../../mixin/showModal';

export default {
  components: { uParse },
  mixins: [showModalMixin()],
  data() {
    return {
      serveDeatil: null,
      currentMode: 0
    };
  },

  onLoad(params) {
    this.serveId = params.id;
    this.shopId = params.shopId;
  },

  mounted() {
    this.getShopDetail();
  },

  methods: {
    async getShopDetail() {
      try {
        const res = await getShopGoodsDetailApi({
          goodsId: this.serveId
        });

        if (res.statusCode === 20000) {
          this.serveDeatil = res.data;
        } else {
          this.ttoast({
            type: 'fail',
            title: res.statusMsg || '服务详情获取失败'
          });
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '服务详情获取失败',
          content: error
        });
      }
    },

    handleSwitchTab(newModeIndex) {
      this.currentMode = newModeIndex;
    },
    // 点击预约
    handleOrder() {
      if (!this.isLogin()) {
        this.$data._isShowTuiModel = true;
        return;
      }
      uni.navigateTo({
        url: `/community-center/shop/shop-order?name=${this.serveDeatil.goodsName}&id=99&priceType=false&imgUrl=${this.serveDeatil.goodsLogo}&price=${this.serveDeatil.goodsPrice}&pprice=${this.serveDeatil.preferentialPrice}&shopId=${this.serveDeatil.shopId}`
      });
    },
    // 点击返回
    handleBack() {
      uni.navigateBack();
    }
  },

  computed: {
    serveDetail() {
      return this.serveDeatil && this.serveDeatil.goodsInfo ? marked(this.serveDeatil.goodsInfo) : '';
    }
  }
};
</script>

<style lang="less" scoped>
.serve-detail-containter {
  min-height: 100vh;
  background-color: #f1f2f6;

  .serve-header {
    width: 100%;
    height: 100upx;
    padding: 0 30upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 32upx;
    background-color: #fff;

    .back-icon {
      width: 64upx;
      height: 64upx;
      border-radius: 50%;
      flex-shrink: 0;
      margin-right: 20upx;
    }
  }

  .image-list {
    position: relative;
    height: 640upx;
    width: 100%;

    .container-bg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100vw;
      height: 640upx;
    }

    .serve-name {
      position: absolute;
      left: 48upx;
      bottom: 32upx;
      width: 390upx;
      height: 84upx;
      font-size: 56upx;
      color: #ffffff;
      font-weight: bold;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      z-index: 101;
    }

    .serve-price {
      position: absolute;
      bottom: 28upx;
      right: 60upx;
      z-index: 101;
      width: 200upx;
      height: 70upx;
      text-align: center;
      line-height: 70upx;
      font-size: 45upx;
      font-weight: bold;
      color: #fff;

      .price-text {
        font-size: 50upx;
      }
    }

    .price-tag {
      position: absolute;
      bottom: 106upx;
      right: 72upx;
      width: 146upx;
      height: 44upx;
      text-align: center;
      line-height: 44upx;
      border-radius: 100upx;
      z-index: 101;
      font-size: 28upx;
      color: #0519d4;
      font-weight: bold;
    }

    .swiper-container {
      width: 100%;
      height: 100%;

      // .swiper-item {
      //   background: url('https://img1.baidu.com/it/u=749926179,730497842&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800') no-repeat;
      //   background-size: cover;
      //   z-index: 0;
      //   filter: blur(10px);
      // }

      .image-wtapper {
        position: absolute;
        left: 24upx;
        top: 70upx;
        width: 698upx;
        height: 396upx;

        .swiper-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .serve-base-info {
    padding: 42upx 30upx;
    box-sizing: border-box;
    background-color: #fff;

    .serve-name {
      color: #141000;
      font-weight: bold;
      font-size: 32upx;
    }

    .description {
      margin: 12upx 0;
      line-height: 1.5;
      font-size: 24upx;
      color: #b3b2ad;
    }

    .uni-btn.order-btn {
      background-color: #fa741a;
      padding: 30upx;
      color: #fff;
      margin-top: 20upx;
      font-size: 28upx;
      transition: all 350ms;

      &:active {
        opacity: 0.8;
      }
    }

    .price-mode {
      .tabs {
        display: flex;
        align-items: center;
        margin-top: 20upx;
        border-bottom: 1upx solid #f6f6f6;
        padding-bottom: 30upx;
        margin-bottom: 10upx;
        margin-top: 40upx;

        .uni-btn {
          font-size: 28upx;
          color: #585858;
          margin-right: 30upx;

          &.active {
            color: #141000;
            font-weight: 500;
          }
        }
      }

      .price-info {
        font-size: 30upx;
        font-weight: bold;
        color: #fc4023;

        .price-value {
          font-size: 60upx;
        }
      }

      .tip {
        font-size: 28upx;
        margin-top: 10upx;
        color: #000;
      }
    }
  }

  .safeguard-description {
    display: flex;
    align-items: center;
    padding: 42upx 30upx;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10upx;

    .item-title {
      font-size: 28upx;
      color: #3d3d3d;
      font-weight: 500;
      margin-right: 32upx;
    }

    .item-value {
      color: #777777;
      font-size: 28upx;
      font-weight: 500;
    }
  }

  .serve-detail {
    padding: 42upx 30upx;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10upx;
  }
}
</style>
