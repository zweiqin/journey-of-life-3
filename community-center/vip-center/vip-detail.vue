<template>
  <view class="vip-detail-conatiner">
    <view class="header">
      <img
        style="width: 100%"
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/wt2xsw30pkqpznisbd9m.png"
        alt=""
      />
      <JIcon @click="handleClickBack" class="back" type="red-back"></JIcon>

      <view class="main">
        <PackagePane
          v-for="item in vipList"
          :key="item.name"
          :data="item"
        ></PackagePane>
      </view>
    </view>

    <Tabbar></Tabbar>
  </view>
</template>

<script>
import PackagePane from "./components/package-pane.vue";
import Tabbar from "./components/tabbar.vue";
import { vipList } from "./config";
export default {
  components: {
    PackagePane,
    Tabbar,
  },
  data() {
    return {
      vipList,
    };
  },
  methods: {
    handleClickBack() {
      uni.switchTab({
        url: "/",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.vip-detail-conatiner {
  background-color: #fa5151;
  font-size: 32upx;
  padding-bottom: 110upx;

  .header {
    position: relative;
    .back {
      position: absolute;
      top: 40upx;
      left: 30upx;
      width: 60upx;
      height: 60upx;
    }
  }

  .main {
    padding: 22upx;
    box-sizing: border-box;
  }
}
</style>