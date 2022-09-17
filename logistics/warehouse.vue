<template>
  <view class="value-added-services">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">落货点列表</view>
    </view>

    <view class="list">
      <view class="item" v-for="item in list" :key="item.warehouseId">
        <view class="name">{{ item.warehouseName }}</view>
        <view class="text">联系人：{{ item.contactName }}</view>
        <view class="text"
          >地 址：{{
            item.warehouseAddress + item.warehouseAddressDetail
          }}</view
        >
      </view>
    </view>
  </view>
</template>



<script>
import { getDropOffPointApi } from "../api/logistics";
export default {
  data() {
    return {
      qiyeId: null,
      list: [],
    };
  },
  created() {
    this.getDropOffPoint();
  },
  methods: {
    back() {
      uni.navigateBack();
    },

    async getDropOffPoint() {
      const res = await getDropOffPointApi({
        qiyeId: this.qiyeId,
      });

      if (res.statusCode === 20000) {
        this.list = res.data;
      } else {
        uni.showToast({
          title: res.statusMsg,
          icon: "none",
          duration: 2000,
        });
      }
    },
  },

  onLoad(options) {
    this.qiyeId = options.id;
  },
};
</script>

<style lang="less" scoped>
.value-added-services {
  .text {
    color: #3d3d3d;
    font-size: 24upx;
    line-height: 40upx;
  }

  .header {
    display: flex;
    align-items: center;
    background-color: #3662ec;
    padding: 60upx 24upx 40upx;

    .back {
      width: 16upx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 32upx;
    }
  }

  .list {
    padding: 20upx 56upx;

    .item {
      padding: 40upx 0;
      border-bottom: 1upx solid #d8d8d8;

      .name {
        font-size: 28upx;
        margin-bottom: 20upx;
      }
    }
  }
}
</style>