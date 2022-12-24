<template>
  <view class="navs">
    <view class="item active">节日促销</view>
    <view class="item">全部爆款</view>
    <view class="item">爆款秒杀</view>
    <view class="item">工厂直销</view>
    <view class="bar"></view>
  </view>
</template>

<script>
export default {
  methods: {
    setBar(){

    }
  },
};
</script>

<style lang="less" scoped>
.navs{
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-weight: 500;

  .bar{
    position: absolute;
  }

  .item{
    &.active{
      color: #FA5151;
    }
  }

  .bar{
    height: 6upx;
    width: ;
  }
}
</style>