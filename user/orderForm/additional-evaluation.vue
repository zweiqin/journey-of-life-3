<template>
  <view class="additional-evaluation-container">
    <view class="close-wrapper">
      <tui-icon name="shut" @click="back" color="#3d3d3d" :size="24"></tui-icon>
    </view>

    <view class="pane goods-info">
      <image class="goods-img" :src="goodsInfo.picUrl"></image>

      <view class="info-detail">
        <view class="name">{{ goodsInfo.goodsName }}</view>
        <view class="goods-price">
          ￥{{ goodsInfo.price }} <text v-if="goodsInfo.unit">/ {{ goodsInfo.unit }}</text>
        </view>
      </view>
    </view>

    <view class="pane comment-wrapper">
      <view class="rate">
        <text class="rate-title">商品评价</text>
        <tui-rate :current="additionalData.rate3" :size="24" normal="#ccc" active="#ff7900" @change="handleSetRate"></tui-rate>
      </view>
      <tui-textarea
        class="text-area-wrapper"
        v-model="additionalData.content"
        autoHeight
        placeholder="请输入对该商品的评价"
        :borderTop="false"
        :borderBottom="false"
        maxlength="300"
        isCounter
        padding="20upx 0"
        :size="32"
      ></tui-textarea>

      <view class="btn-wrapper">
        <button @click="handleSendComment" class="uni-btn" :class="{ disabled: !additionalData.content }">
          <tui-icon name="send" color="#fff" :size="17"></tui-icon>
          <text class="btn-text">发送</text>
        </button>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getUserId } from '../../utils';
import { sendCommentAgainApi } from '../../api/order';

export default {
  onLoad(params) {
    this.goodsInfo.goodsName = params.goodsName;
    this.goodsInfo.price = params.price;
    this.goodsInfo.unit = params.unit;
    this.goodsInfo.picUrl = params.picUrl;
    this.additionalData.pid = params.commentId;
    this.additionalData.gid = params.goodsId;
    this.additionalData.oid = params.oid;
    this.additionalData.pJId = params.ocid;
    this.systermInfo = this.$store.getters.systermInfo;
  },
  data() {
    return {
      additionalData: {
        rate3: 5,
        oid: '',
        pJId: '',
        gid: '',
        ip: '',
        device: this.systermInfo ? this.systermInfo.ua : '',
        content: '',
        type: 2,
        pid: '',
        uid: getUserId()
      },
      goodsInfo: {
        unit: '',
        price: '',
        goodsName: '',
        picUrl: ''
      }
    };
  },

  methods: {
    handleSetRate(rateInfo) {
      const { index } = rateInfo;
      this.additionalData.rate3 = index;
    },

    back() {
      // uni.navigateTo({
      //   url: '/user/orderForm/order-form?type=5'
      // });

      uni.switchTab({
        url: '/pages/order/order?type=shop&status=5'
      });
    },

    async handleSendComment() {
      try {
        if (!this.additionalData.content) {
          this.ttoast({
            type: 'info',
            title: '请输入评论'
          });

          return;
        }

        const res = await sendCommentAgainApi(this.additionalData);
        if (res.errno === 0) {
          this.ttoast('追评成功');
          setTimeout(() => {
            this.back();
          }, 2000);
        } else {
          this.ttoast({
            type: 'fail',
            title: '追评失败',
            content: res.errmsg
          });
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '追评失败',
          content: error
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.additional-evaluation-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(120deg, #f3f1ff, #fce5df);
  padding: 20upx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .close-wrapper {
    width: 100%;
    margin-top: 40upx;
    display: flex;
    justify-content: flex-end;
  }

  .pane {
    padding: 20upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20upx;
    width: 100%;
  }

  .comment-wrapper {
    flex: 1;

    display: flex;
    flex-direction: column;
    margin-top: 40upx;

    .rate {
      border-bottom: 1upx solid #ccc;
      padding-bottom: 20upx;
      margin-bottom: 20upx;

      .rate-title {
        color: #3d3d3d;
        margin-right: 20upx;
        position: relative;
        top: -8upx;
        font-size: 28upx;
        font-weight: 500;
      }
    }

    .text-area-wrapper {
      flex: 1;
    }

    .btn-wrapper {
      width: 100%;
      height: 120upx;
      line-height: 120upx;
      text-align: right;

      .uni-btn {
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        background-color: #ff5b15;
        border-radius: 100upx;
        padding: 20upx 40upx;
        transition: all 350ms;

        &.disabled {
          background-color: #ffcab3;
        }

        .btn-text {
          font-size: 28upx;
          color: #fff;
          margin-left: 10upx;
        }
      }
    }

    /deep/ .tui-textarea__wrap {
      height: 100%;
    }

    /deep/ .tui-textarea__flex-1 {
      height: 100%;
    }

    /deep/ .tui-textarea__self {
      height: 80% !important;
    }
  }

  .goods-info {
    display: flex;
    align-items: center;
    margin-top: 40upx;
    .goods-img {
      width: 120upx;
      height: 120upx;
      border-radius: 10upx;
      flex-shrink: 0;
    }

    .info-detail {
      margin-left: 20upx;
      .name {
        font-size: 32upx;
        font-weight: 500;
      }

      .goods-price {
        font-size: 28upx;
        color: #808080;
        margin-top: 20upx;
      }
    }
  }
}
</style>
