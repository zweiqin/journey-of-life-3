<template>
  <view class="order-pane">
    <view class="section-title">订单渠道</view>
    <view class="order-overview">
      <view class="order-total-count title">{{ totalOrderNum }}</view>
      <!-- <view class="trend">
        <text class="trend-title">环比昨日</text>
        <text class="percentage">78%</text>
      </view> -->
    </view>

    <view class="list">
      <view class="item">
        <view class="title">商城订单</view>
        <view class="programs">
          <tui-progress :size="30" backgroundColor="#fff" :percent="data.mallOrderTotal"
            activeColor="linear-gradient(270deg, #FFBB00 0%, #FDE9B0 100%)"></tui-progress>
          <!-- <tui-progress style="margin-top: 4rpx;" :size="30" backgroundColor="#fff" :percent="10"
            activeColor="#ccc"></tui-progress> -->
        </view>

        <view class="item-order-count">{{ data.mallOrderTotal }}</view>
        <view class="item-trend">
          <text class="item-trend-percentage">{{ percentageData.mallOrderTotal || 0 }}%</text>
        </view>
      </view>


      <view class="item">
        <view class="title">物流订单</view>
        <view class="programs">
          <tui-progress :size="30" backgroundColor="#fff" :percent="data.logisticsOrderTotal"
            activeColor="linear-gradient(270deg, #007CFB 0%, #E6F3FF 100%)"></tui-progress>
          <!-- <tui-progress style="margin-top: 4rpx;" :size="30" backgroundColor="#fff" :percent="59"
            activeColor="#ccc"></tui-progress> -->
        </view>

        <view class="item-order-count">{{ data.logisticsOrderTotal }}</view>
        <view class="item-trend">
          <text class="item-trend-percentage">{{ percentageData.logisticsOrderTotal || 0 }}%</text>
        </view>
      </view>

      <view class="item">
        <view class="title">材料订单</view>
        <view class="programs">
          <tui-progress :size="30" backgroundColor="#fff" :percent="data.materialOrderTotal"
            activeColor="linear-gradient(270deg, #00B175 0%, #EEFBED 100%)"></tui-progress>
          <!-- <tui-progress style="margin-top: 4rpx;" :size="30" backgroundColor="#fff" :percent="12"
            activeColor="#ccc"></tui-progress> -->
        </view>

        <view class="item-order-count">{{ data.materialOrderTotal }}</view>
        <view class="item-trend">
          <text class="item-trend-percentage">{{ percentageData.materialOrderTotal || 0 }}%</text>
        </view>
      </view>

      <view class="item">
        <view class="title">社区订单</view>
        <view class="programs">
          <tui-progress :size="30" backgroundColor="#fff" :percent="data.communityOrderTotal"
            activeColor="linear-gradient(270deg, #FF6A00 0%, #FFF6DC 100%)"></tui-progress>
          <!-- <tui-progress style="margin-top: 4rpx;" :size="30" backgroundColor="#fff" :percent="78"
            activeColor="#ccc"></tui-progress> -->
        </view>

        <view class="item-order-count">{{ data.communityOrderTotal }}</view>
        <view class="item-trend">
          <text class="item-trend-percentage">{{ percentageData.communityOrderTotal || 0 }}%</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      percentageData: {},
      totalOrderNum: 0
    }
  },

  watch: {
    data: {
      handler(value) {
        if (JSON.stringify(value) !== '{}') {
          this.calcPercentage(value)
        }
      },

      immediate: true,
      deep: true
    }
  },

  methods: {
    calcPercentage(value) {
      const totalOrderNum = value.mallOrderTotal + value.materialOrderTotal + value.logisticsOrderTotal + value.communityOrderTotal
      this.percentageData = {
        mallOrderTotal: ((value.mallOrderTotal / totalOrderNum) * 100).toFixed(2),
        materialOrderTotal: ((value.materialOrderTotal / totalOrderNum) * 100).toFixed(2),
        logisticsOrderTotal: ((value.logisticsOrderTotal / totalOrderNum) * 100).toFixed(2),
        communityOrderTotal: ((value.communityOrderTotal / totalOrderNum) * 100).toFixed(2),
      }
      this.totalOrderNum = totalOrderNum
    }
  },
}
</script>

<style lang="scss" scoped>
.order-pane {
  .tag {
    width: 34upx;
    height: 34upx;
  }

  .section-title {
    font-size: 24upx;
    font-weight: 500;
    position: relative;
    margin-bottom: 20upx;
    color: #606972;
  }

  .order-overview {
    display: flex;
    align-items: center;

    .order-total-count {
      color: #000;
      font-size: 36upx;
      font-weight: bold;
    }

    .trend {
      display: flex;
      align-items: center;



      &-title {
        color: #777777;
        font-size: 24upx;
        margin-right: 17upx;
      }

      .percentage {
        font-size: 28upx;
        color: #00AE41;
        margin-right: 10upx;
      }
    }


  }

  .title {
    width: 145upx;
    text-align: left;
  }

  .item {
    display: flex;
    align-items: center;
    margin-top: 41upx;

    .programs {
      flex: 1;
      margin-right: 10upx;
    }

    .item-order-count {
      font-size: 28upx;
      color: #000000;
    }

    .item-trend {
      display: flex;
      align-items: center;
      margin-left: 44upx;

      &-percentage {
        font-size: 28upx;
        color: #00AE41;
        margin-left: 7upx;
      }
    }
  }
}

/deep/ .tui-progress__bar,
/deep/ .tui-progressbar__bg {
  height: 10upx !important;
  border-radius: 100px;
}
</style>