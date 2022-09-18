<template>
  <view class="value-added-services">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">查找物流</view>
    </view>

    <view class="main" v-if="list && list.length">
      <view
        class="item"
        v-for="item in list"
        :key="item.qiyeId"
        @click="handleToDetail(item)"
      >
        <img class="img" :src="item.logo" alt="" />
        <view class="info">
          <view class="name">{{ item.name }}</view>
          <view class="address">地 址: {{ item.address }}</view>
        </view>
      </view>
    </view>

    <view class="no-data" v-else> 未搜到该线路的物流公司 </view>
  </view>
</template>



<script>
import { searchWuliuApi } from "../api/logistics";
export default {
  data() {
    return {
      query: {
        start: "佛山市",
        end: "",
        pageNo: 1,
        pageSize: 20,
      },

      listTotal: null,
      list: [],
    };
  },
  methods: {
    back() {
      uni.navigateBack();
    },

    async searchWuliu() {
      const res = await searchWuliuApi(this.query);
      if (res.statusCode === 20000) {
        this.listTotal = res.data.total;
        this.list = res.data.records;
      } else {
        uni.showToast({
          title: res.statusMsg,
          icon: "none",
          duration: 2000,
        });
      }
    },

    handleToDetail(info) {
      uni.navigateTo({
        url: "/logistics/wuliu-detail?id=" + info.qiyeId,
      });
      console.log(info);
    },
  },
  onLoad(options) {
    this.query.end = options.to;
    this.searchWuliu();
  },
};
</script>

<style lang="less" scoped>
.value-added-services {
  background: linear-gradient(180deg, #07b9b9 0%, #ffffff 100%);
  padding: 60upx 24upx;
  box-sizing: border-box;
  height: auto;
  min-height: 100vh;

  .header {
    display: flex;
    align-items: center;

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

  .main {
    padding: 32upx 10upx;
    border-radius: 20upx;
    background-color: #fff;
    margin-top: 26upx;
    height: 100%;

    .item {
      display: flex;
      margin-top: 36upx;

      .img {
        width: 244upx;
        height: 110upx;
      }

      .info {
        display: flex;
        flex-direction: column;
        margin: 0 38upx;

        .name {
          color: #3d3d3d;
          font-size: 28upx;
          font-weight: bold;
        }

        .address {
          font-size: 24upx;
        }
      }
    }
  }

  .no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 40upx;
    background-color: #fff;
    padding: 40upx;
    box-sizing: border-box;
    border-radius: 30upx;
    color: gray;
    letter-spacing: 4upx;
  }
}
</style>