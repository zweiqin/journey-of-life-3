<template>
  <view class="price1">
    <Ttitle :title="title" :search="search"></Ttitle>
  </view>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      title: "价格指数",
      search: true,
    };
  },
};
</script>

<style lang="less" scoped>
.price1 {
  padding: 72upx 30upx 40upx 30upx;
  
}
</style>