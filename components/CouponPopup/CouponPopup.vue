<template>
  <tui-bottom-popup
    :zIndex="1002"
    :maskZIndex="1001"
    :show="value"
    @close="$emit('input', false)"
  >
    <view class="coupon-container">
      <view class="title-wrapper">
        可使用优惠劵
				<view class="close-icon">
					<tui-icon
						name="shut" :size="48" unit="rpx"
						color="#b3b2ad"
						margin="0" @click="$emit('input', false)"
					></tui-icon>
				</view>
      </view>
      <view class="coupon-list" v-if="couponList.length">
        <view
          class="coupon-item"
          @click="handleChooseCoupon(coupon)"
          v-for="coupon in couponList"
          :key="coupon.id"
        >
          <view class="coupon-info">
            <view class="coupon-main">
              <view class="coupon-name">{{ coupon.name }}</view>
              <view class="coupon-desc"
                >满{{ coupon.min }}减{{ coupon.discount }}</view
              >
              <view class="time"
                >{{ coupon.startTime }} - {{ coupon.endTime }}</view
              >
            </view>

            <view class="discount">
              <text>￥</text> {{ parseInt(coupon.discount) }}
            </view>
          </view>
          <tui-icon
            v-if="currentCouponId !== coupon.id"
            name="circle"
            :size="24"
          ></tui-icon>
          <tui-icon
            v-else
            name="circle-fill"
            color="#FFC117"
            :size="24"
          ></tui-icon>
        </view>
      </view>
      <view class="no-data" v-else>
        <tui-icon color="#ffc117" :size="40" name="coupon"></tui-icon>
        <text>暂无优惠劵~</text>
      </view>
      <view class="confirm-btn" v-if="couponList.length">
        <button
          class="uni-btn"
          :style="{ opacity: currentCouponId ? 1 : 0.5 }"
          @click="handleConfirm"
        >
          {{ currentCouponId ? '确定' : '不使用优惠劵' }}
        </button>
      </view>
    </view>
  </tui-bottom-popup>
</template>

<script>
import { getCanUseCouponListApi } from '../../api/goods'
import { getUserId } from '../../utils'
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },

    cartId: {
      type: Number,
    },
  },

  data() {
    return {
      couponList: [],
      currentCouponId: null,
      currentCouponPrice: null,
    }
  },

  watch: {
    cartId: {
      handler(value) {
        if (value || value === 0) {
          this.getCanUseCouponList()
        }
      },

      immediate: true,
    },
  },

  methods: {
    // 获取优惠卷列表
    async getCanUseCouponList() {
      const { data } = await getCanUseCouponListApi({
        userId: getUserId(),
        cartId: this.cartId,
      })

      this.couponList = data
    },

    // 选择优惠劵
    handleChooseCoupon(coupon) {
      if (coupon.id === this.currentCouponId) {
        this.currentCouponId = null
        this.currentCouponPrice = null
      } else {
        this.currentCouponId = coupon.id
        this.currentCouponPrice = coupon.discount
      }
    },

    // 确定选择
    handleConfirm() {
      if (this.currentCouponId) {
        this.$emit('confirm', {
          id: this.currentCouponId,
          price: this.currentCouponPrice,
        })
      } else {
        this.$emit('confirm', {
          id: -1,
          price: 0,
        })
      }

      this.$emit('input', false)
    },
  },
}
</script>

<style lang="less" scoped>
.coupon-container {
  height: 960upx;
  background-color: #fff;

  .title-wrapper {
    position: relative;
    height: 110upx;
    text-align: center;
    line-height: 110upx;
    font-weight: 500;
    font-size: 32upx;

    .close-icon {
      position: absolute;
      width: 48upx;
      height: 48upx;
      top: 30%;
      right: 32upx;
      transform: translateY(-50%);
    }
  }

  .coupon-list {
    height: 730upx;
    margin: 0 20upx;
    box-sizing: border-box;
    background-color: #f6f6f5;
    padding: 32upx;
    border-radius: 24upx 24upx 0 0;

    .coupon-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20upx;
    }

    .coupon-info {
      width: 566upx;
      height: 188upx;
      background-color: #ffc117;
      border-radius: 24upx;
      padding-left: 24upx;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .coupon-main {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding-left: 24upx;
        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;

        .coupon-name {
          font-weight: 500;
          font-size: 32upx;
          color: #141000;
        }

        .coupon-desc {
          margin: 10upx 0;
          color: #605d52;
          font-size: 26upx;
        }

        .time {
          color: #b3b2ad;
          font-size: 24upx;
        }
      }

      .discount {
        position: relative;
        width: 218upx;
        height: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffc117;
        font-size: 68upx;
        font-weight: bold;
				border-left: 1px dotted #141414;

        text {
          position: relative;
          top: 10upx;
          font-size: 42upx;
        }
      }
    }
  }

  .confirm-btn {
    height: 120upx;
    width: 100%;
    padding: 16upx 20upx;
    box-sizing: border-box;

    .uni-btn {
      width: 100%;
      height: 100%;
      background-color: #ffcb05;
      font-size: 32upx;
      border-radius: 100px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 200ms;
    }
  }
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 400upx;

  text {
    color: #ccc;
  }
}
</style>
