<template>
  <div class="hotGoods">
    <view>
      <img
        :src="
          picUrl ||
          'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/vemrcr6ct9dfyois7ary.png'
        "
        alt=""
        class="left"
      />
    </view>
    <view class="right">
      <view class="name">{{ name || "革沙布料真皮荔枝纹皮料子" }}</view>
      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/zjakw6b6bvktnmvqm8p1.png "
        alt=""
        class="giveMoney"
      />
      <view class="stockSales">
        <view class="sales">已售{{ salse || "1000+ " }}</view>
        <view class="stockNumber">库存仅剩：{{ repertory || "100+" }} </view>
      </view>
      <view class="money">
        <view class="now">￥{{ currentPrice || 19.9 }}</view>
        <view class="formerly">原价:￥{{ originalPrice || 39.9 }}</view>
      </view>
      <!-- <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qvdgezlbkfu7j58vxf6k.png "
        alt=""
        class=""
      /> -->
      <view class="nowBuy nowText" @click="handeViewDetail">立即下单</view>
    </view>
  </div>
</template>

<script>
import { number } from "echarts";
export default {
  name: "hotGoods",
  props: {
    name: String,
    originalPrice: Number,
    currentPrice: Number,
    goodsId: Number,
    salse: Number,
    picUrl: String,
    repertory:Number,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    handeViewDetail() {
      if (!this.goodsId) {
        return;
      }
      uni.navigateTo({
        url: `/pages/prod/prod?goodsId=${this.goodsId}`,
      });
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
.hotGoods {
  display: flex;
  padding: 10upx 27upx;
  .left {
    padding: 21upx;
    height: 239upx;
    width: 239upx;
    margin-right: 56upx;
  }

  .right {
    margin-top: 5upx;
    .name {
      font-size: 28upx;
      width: 320upx;
      font-weight: 600;
      margin-bottom: 10upx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .giveMoney {
      width: 140upx;
      margin-bottom: 10upx;
      height: 34upx;
    }
    .stockSales {
      display: flex;
      margin-bottom: 10upx;
      font-size: 24upx;
      .sales {
      }
      .stockNumber {
        padding-left: 20upx;
        color: #3662ec;
      }
    }

    .nowBuy {
      width: 236upx;
      height: 62upx;
    }
    .money {
      display: flex;
      margin-bottom: 5upx;
      align-items: flex-end;
      .formerly {
        color: #999999;
        font-size: 24upx;
        font-weight: 400;
        margin-left: 14upx;
      }
      .now {
        color: #fa5151;
        font-size: 36upx;
        font-weight: 600;
      }
    }
    .nowText {
      color: white;
      font-weight: 600;
      font-size: 36upx;
      display: flex;
      align-items: center;
      background: url(https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qvdgezlbkfu7j58vxf6k.png)
        no-repeat;
      background-size: cover;
      padding-left: 20upx;
    }
  }
}
</style>