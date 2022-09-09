<template>
  <div class="baby-wrapper">
    <view class="navs">
      <view
        class="item"
        :class="{ active: currentTab === item.value }"
        v-for="item in navs"
        :key="item.value"
        @click="switchNav(item.value)"
        >{{ item.label }}</view
      >
    </view>

    <view class="main">
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
    </view>
  </div>
</template>

<script>
import Goods from "../../../../components/goods/index.vue";
export default {
  components: {
    Goods,
  },
  data() {
    return {
      navs: [
        {
          label: "综合",
          value: 0,
        },
        {
          label: "销量",
          value: 1,
        },
        {
          label: "新品",
          value: 2,
        },
      ],
      currentTab: 0,
    };
  },
  methods: {
    switchNav(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

<style lang="less" scoped>
.baby-wrapper {
  .navs {
    display: flex;
    align-items: center;
    margin: 20upx 0;

    .item {
      font-size: 20upx;
      margin-right: 36upx;
      font-size: 16upx;
      transition: all 200ms linear;

      &.active {
        color: #ff8f1f;
      }
    }
  }

  .main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>