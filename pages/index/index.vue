<template>
  <view class="index-container" :style="{ paddingTop: paddingTop + 'px' }">
    <HeaderView
      ref="headerRef"
      v-model="currentIndex"
      class="pane header-view"
    ></HeaderView>

    <view class="main">
      <SearchFurniture @reachBottom="handleReachBottom"></SearchFurniture>
    </view>
  </view>
</template>

<script>
import HeaderView from "./components/header.vue";
import SearchFurniture from "./components/search-furniture";
export default {
  components: {
    HeaderView,
    SearchFurniture,
  },
  data() {
    return {
      swiperHeight: 500,
      currentIndex: 0,
      paddingTop: 0,

      // 手指事件
      startPosition: 0,
      startTime: 0,
      endPosition: 0,
    };
  },
  onLoad() {},
  mounted() {
    this.getSize();
  },
  methods: {
    handleSwitch(e) {
      this.currentIndex = e.detail.current;
    },

    async getSize() {
      const size = await this.$refs.headerRef.getSize();
      this.paddingTop = size;
    },
  },

  onReachBottom() {
    uni.showLoading({
      title: "加载中",
    });

    setTimeout(() => {
      uni.hideLoading();
    }, 2000);
  },
};
</script>

<style lang="less" scoped>
.index-container {
  // overflow: hidden;
  background-color: #efefef;
  padding-bottom: 120upx;

  .pane {
    background-color: #fff;
  }

  .header-view {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 10;
    box-sizing: border-box;
  }
}
</style>