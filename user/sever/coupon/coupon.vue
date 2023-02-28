<template>
  <view class="coupon-container">
    <view class="coupo-header">
      <tui-icon @click="handleBack" name="arrowleft"></tui-icon>
      <view
        class="item"
        :class="{
          active: currentStatus === item.value,
        }"
        @click="handleSwitchTab(item)"
        v-for="item in couponStatusList"
        :key="item.value"
        >{{ item.name }}</view
      >
    </view>

    <view class="coupon-list" v-show="currentStatus === 3">
      <CouponItem
        @receive="handleReceiveCoupon"
        v-for="item in availableCouponList"
        :key="item.id"
        :data="item"
      ></CouponItem>

      <view class="no-data" v-show="!availableCouponList.length">
        <tui-icon color="#ffc117" :size="40" name="coupon"></tui-icon>
        <text>暂无优惠劵~</text>
      </view>
    </view>

    <view class="coupon-list" v-show="currentStatus !== 3">
      <CouponItem
        @receive="handleReceiveCoupon"
        v-for="item in holdCouponList"
        :key="item.id"
        :data="item"
      ></CouponItem>
      <view class="no-data" v-show="!holdCouponList.length">
        <tui-icon color="#ffc117" :size="40" name="coupon"></tui-icon>
        <text>暂无优惠劵~</text>
      </view>
    </view>
  </view>
</template>

<script>
import CouponItem from './cpns/coupon-item.vue'
import { couponStatusList } from './data'
import {
  getAvailableCouponListApi,
  receiveCouponApi,
  getCouponListApi,
} from '../../../api/user'
import { getUserId } from '../../../utils'

export default {
  components: { CouponItem },
  mounted() {
    this.getAvailableCouponList()
  },
  data() {
    return {
      couponStatusList: Object.freeze(couponStatusList),
      currentStatus: 3,
      // 可领取优惠劵
      availableCouponQuery: {
        page: 1,
        size: 10,
        userId: getUserId(),
      },
      availableCouponTotal: 0,
      availableCouponList: [],

      // 未使用
      holdCouponQuery: {
        page: 1,
        size: 10,
        status: 0,
        userId: getUserId(),
      },
      holdCouponTotal: 0,
      holdCouponList: [],
    }
  },

  methods: {
    handleSwitchTab(item) {
      this.currentStatus = item.value
      if (item.value !== 3) {
        this.holdCouponQuery.status = item.value
        this.getCouponList()
      } else {
        this.getAvailableCouponList()
      }
    },

    async getAvailableCouponList() {
      const { data } = await getAvailableCouponListApi(
        this.availableCouponQuery
      )
      this.availableCouponList = data.couponList
    },

    // 领取优惠劵
    async handleReceiveCoupon(currentCoupon) {
      await receiveCouponApi({
        userId: getUserId(),
        couponId: currentCoupon.id,
      })

      uni.showToast({
        title: '领取成功',
        duration: 2000,
      })

      this.getAvailableCouponList()
    },

    //
    async getCouponList() {
      const { data } = await getCouponListApi(this.holdCouponQuery)
      console.log(data)

      this.holdCouponTotal = data.count
      this.holdCouponList = data.data
    },

    handleBack() {
      uni.switchTab({
        url: '/pages/user/user',
      })
    },
  },
}
</script>

<style lang="less" scoped>
view,
text {
  line-height: 1.5;
}
.coupon-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f5;

  .coupo-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 120upx;
    padding: 0 50upx 0 20upx;
    box-sizing: border-box;
    font-size: 32upx;
    color: #8f8d85;
    background-color: #fff;
    border-radius: 0 0 24upx 24upx;

    .back {
      width: 18upx;
      height: 34upx;
    }

    .item {
      position: relative;

      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 8upx;
        border-radius: 100px;
        background-color: #ffc117;
        transition: all 350ms;
      }

      &.active {
        color: #141000;
        font-weight: 500;

        &::after {
          width: 40upx;
        }
      }
    }
  }

  .coupon-list {
    padding: 20upx;
    box-sizing: border-box;
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
