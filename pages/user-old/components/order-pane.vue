<template>
  <view class="order-pane">
    <view class="tabs">
      <view
        class="item"
        :class="{ active: currentTab === item.name }"
        v-for="(item, index) in tabs"
        :key="index"
        @click="currentTab = item.name"
      >
        {{ item.name }}
      </view>
    </view>

    <view class="icons">
      <view
        class="item"
        @click="$emit('emit', item)"
        v-for="(item, index) in icons"
        :key="index"
      >
        <image :src="item.icon" mode="" />
        <view>{{ item.label }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { one, two } from "../config";
export default {
  data() {
    return {
      tabs: [{ name: "商品订单" }, { name: "社区订单" }],
      currentTab: "商品订单",
    };
  },

  computed: {
    icons() {
      return { 商品订单: one.menus, 社区订单: two.menus }[this.currentTab];
    },
  },
};
</script>

<style lang="less" scoped>
.order-pane {
  background-color: #fff;
  padding: 36upx 24upx;
  box-sizing: border-box;
  border-radius: 20upx;
  font-size: 28upx;

  .tabs {
    display: flex;
    align-items: center;
    border-bottom: 1upx solid #d8d8d8;

    .item {
      position: relative;
      margin-right: 30upx;
      color: #777;
      padding: 20upx 0;

      &.active {
        color: #000;
        font-weight: 500;

        &::after {
          width: 50%;
          content: "";
          display: block;
          position: absolute;
          height: 4upx;
          border-radius: 100px;
          background-color: #f25822;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
        }
      }
    }
  }

  .icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20upx;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      image {
        width: 48upx;
        height: 48upx;
        margin-bottom: 10upx;
      }
    }
  }
}
</style>