<template>
  <view class="industry-container">
    <Header title="行业信息"></Header>
    <view class="main">
      <view class="title">2022年9月21日 星期三</view>

      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
      <IndustryInformation></IndustryInformation>
    </view>
  </view>
</template>

<script>
import Header from "../../components/header";
import IndustryInformation from "../../pages/stuff/components/industry-information-pane.vue";
export default {
  components: {
    Header,
    IndustryInformation,
  },
};
</script>

<style lang="less" scoped>
.main {
  padding: 20upx 36upx;
  box-sizing: border-box;
}

.title {
  color: #999;
  font-size: 12px;
}

.p-container {
  &:not(:last-child) {
    border-bottom: 1upx solid #ccc;
  }
}
</style>