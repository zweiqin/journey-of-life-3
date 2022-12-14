<template>
  <view class="newGoods">
    <image src="../image/img1.png" class="img" mode="scaleToFill" />
    <view class="goodsDetail">
      <view class="top">
        <view class="kill">秒杀</view>
        <view class="name">GLOSTAD 品牌沙发</view>
      </view>
      <view class="shopLabel">
        <view class="standard">旗舰店</view>
        <view class="qualityGoods">官方正品</view>
      </view>
      <view class="bottom">
        <view class="money">劵后￥1080</view>
        <view class="sales">1000+付款</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "newGoods",
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
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
.newGoods {
  height: 452upx;
  .img {
    height: 350upx;
    width: 324upx;
  }
  .goodsDetail {
    .top {
      display: flex;
      .kill {
        font-size: 24upx;
        font-weight: 600;
        border-radius: 4upx;
        color: white;
        background: #fa5151;
        margin: 0 12upx;
      }
      .name {
        font-size: 28upx;
      }
    }
    .shopLabel {
      display: flex;
      font-size: 24upx;
      .standard {
        
      }
      .qualityGoods {
      }
    }
  }
}
</style>