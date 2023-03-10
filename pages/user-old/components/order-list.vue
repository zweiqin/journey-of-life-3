<template>
  <view class="order-list">
    <view class="tabs">
      <view
        class="tab"
        :class="{ active: currentTab === index }"
        v-for="(item, index) in tabs"
        @click="switchTab(index)"
        :key="index"
        >{{ item.name }}</view
      >

      <view :style="{ left: scrollBarLeft + 'px' }" class="scroll-bar"></view>
    </view>

    <swiper
      :current="currentTab"
      class="swiper"
      circular
      style="height: 120upx"
      :indicator-dots="false"
      :autoplay="false"
      @change="handleChangeSwiper"
    >
      <swiper-item>
        <Tabs @click="$emit('click', $event)" padding="20upx 10upx" :data="shopMenus"></Tabs>
      </swiper-item>
      <swiper-item>
        <Tabs @click="$emit('click', $event)" padding="20upx 10upx" :data="communityMenus"></Tabs>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { shopMenus, communityMenus } from "../../../data/user";
export default {
  data() {
    return {
      currentTab: 0,
      tabs: Object.freeze([
        {
          name: "商城订单",
        },
        {
          name: "社区订单",
        },
      ]),
      scrollBarLeft: 0,
      shopMenus: Object.freeze(shopMenus),
      communityMenus: Object.freeze(communityMenus),
    };
  },

  mounted() {
    this.setScrollBar();
  },

  methods: {
    // 设置滑块的位置
    setScrollBar() {
      const _this = this;
      const query = uni.createSelectorQuery().in(this);
      query
        .select(".active")
        .boundingClientRect((data) => {
          console.log(data);
          _this.scrollBarLeft = data.left - 12;
        })
        .exec();
    },

    // 切换tab
    switchTab(index) {
      this.currentTab = index;
      this.$nextTick(() => {
        this.setScrollBar();
      });
    },

    // swiper 切换
    handleChangeSwiper(e) {
      const { current } = e.detail;
      this.switchTab(current);
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1upx solid #d8d8d8;

  .scroll-bar {
    position: absolute;
    width: 24px;
    height: 4upx;
    background-color: #fe9f21;
    bottom: -2upx;
    transition: all 350ms;
  }

  .tab {
    color: #777;
    margin-right: 30upx;
    padding-bottom: 20upx;
    transition: all 350ms;

    &.active {
      color: #000;
      font-weight: 500;
    }
  }
}
</style>