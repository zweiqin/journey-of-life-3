<template>
  <view class="foot-print">
    <!-- <view class="timer">
      <image
        class="timer-icon"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/208t5z0ldi4odit8lbsn.png"
        mode=""
      />

      <view class="timer-title">时间</view>
      <JMonthPicker
        :value="currentTime"
        @confirm="handleChooseTime"
      ></JMonthPicker>
    </view> -->
    <view
      class="foot-print-item"
      v-for="(item, index) in historyData.data"
      :key="index"
    >
      <view class="foot-print-time">{{ index | fomartTime }}</view>
      <view class="foot-print-wrapper">
        <view
          @click="handleToViewDetail(goods.goodsId)"
          class="goods-item"
          v-for="goods in item"
          :key="goods.id"
        >
          <image class="goods-item-img" :src="goods.picUrl" mode="" />
          <view class="goods-item-price">￥{{ goods.retailPrice }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      historyData: {data: []},
      currentTime: "",
    };
  },
  filters: {
    fomartTime(value) {
      const timeArr = value.split("-");
      return `${timeArr[1]}月${timeArr[2]}`;
    },
  },
  methods: {
    setData(data) {
      // this.historyData = data
      this.$set(this.historyData, 'data', data)
      console.log(this.historyData);
      this.$forceUpdate();
    },

    handleToViewDetail(id) {
      uni.navigateTo({
        url: "/pages/prod/prod?goodsId=" + id,
      });
    },

    // 确定选择时间
    handleChooseTime(timeInfo) {
      const { value } = timeInfo;

      this.currentTime = `
        ${value.year}年  ${value.month}月
      `;
    },
  },
};
</script>

<style lang="less" scoped>
.timer {
  font-size: 28upx;
  color: #3d3d3d;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin: 32upx 0;

  .timer-icon {
    width: 40upx;
    height: 44upx;
  }

  .timer-title {
    margin: 0 80upx 0 22upx;
  }

  .j-icon {
    width: 30upx;
    height: 32upx;
    transform: rotate(90deg);
    margin-left: 20upx;
    vertical-align: -6upx;
  }
}

.foot-print {
  width: 100%;
  font-size: 24upx;
  color: #3d3d3d;
  padding-top: 20px;

  .foot-print-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .foot-print-item {
    margin-bottom: 20upx;
    .foot-print-time {
      font-weight: bold;
      margin-bottom: 24upx;
    }

    .goods-item {
      width: 202upx;
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-bottom: 44upx;

      .goods-item-img {
        width: 100%;
        height: 196upx;
        border-radius: 10upx;
      }

      .goods-item-price {
        color: #fa5151;
        margin-top: 18upx;
      }
    }
  }
}
</style>