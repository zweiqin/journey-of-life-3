<template>
  <view class="jurisdictionDetail">
    <view v-for="item in jurisdictionName" :key="item.value">
      <view class="entirety" v-if="item.type == type">
        <view class="name">{{ item.label }}</view>
        <view class="right">
          <view class="money" v-if="item.type == 0">￥{{ item.money }}</view>
          <image
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9yo50yiur0jjbtgdrpoa.png"
            mode="scaleToFill"
            class="rightImg" /></view
      ></view>
    </view>
  </view>
</template>

<script>
import { jurisdictionName } from "./config.js";
export default {
  name: "jurisdictionDetail",
  props: {
    type: [String, Number],
  },
  data() {
    return { jurisdictionName };
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
.jurisdictionDetail {
  border: 1px solid #d8d8d8;
  border-radius: 20upx;
  .entirety {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d8d8d8;
    margin: 20upx 56upx;
    padding: 20upx 0;
  }
  .name {
    font-size: 26upx;
  }
  .right {
    align-items: center;
    display: flex;
    .money {
      margin-right: 30upx;
      color: #fa5151;
      font-size: 26upx;
    }
    .rightImg {
      width: 32upx;
      height: 32upx;
    }
  }
}
</style>