<template>
  <div class="lqbTitle">
    <lqbCompany :type="type" :title="companyTitle"></lqbCompany>
    <template v-if="status == 0 || status == 3">
      <view class="title1">
        <view class="border1"></view>
        <view class="text1">{{ title }}</view>
        <view class="border1"></view>
      </view>
      <view class="englishTitle1">{{ englishTitle }}</view>
    </template>
    <template v-else>
      <view class="title">
        <view class="border"></view>
        <view class="text">{{ title }}</view>
        <view class="border"></view>
      </view>
      <view class="englishTitle">{{ englishTitle }}</view>
    </template>
    <slot></slot>
  </div>
</template>

<script>
import { number } from 'echarts';
import { company } from "../../config";
import lqbCompany from "../lqbCompany";
export default {
  props: {
    title: String,
    englishTitle: String,
    status: Number,
    type: Boolean,
    companyTitle: String,
  },
  data() {
    return { company };
  },
  computed: {},
  components: {
    lqbCompany,
  },
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
.lqbTitle {
  padding: 11upx 0;
  color: #144978;
  background-color: white;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    .border {
      border-bottom: 2px solid #144978;
      width: 60upx;
      height: 0upx;
    }
    .text {
      margin: 0 56upx;
      font-size: 32upx;
      font-weight: 700;
    }
  }
  .englishTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24upx;
    font-weight: 700;
    margin-top: 10upx;
    margin-bottom: 20upx;
  }

  .title1 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    .border1 {
      border-bottom: 2px solid;
      width: 60upx;
      height: 0upx;
    }
    .text1 {
      margin: 0 56upx;
      font-size: 32upx;
      font-weight: 700;
    }
  }
  .englishTitle1 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24upx;
    font-weight: 700;
    margin-top: 10upx;
    color: black;
    margin-bottom: 20upx;
  }
}
</style>