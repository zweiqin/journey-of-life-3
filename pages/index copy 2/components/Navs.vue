<template>
  <view class="navs">
    <view
      class="nav-item"
      :class="{ active: index === value }"
      v-for="(nav, index) in navs"
      @click="handleClick(index)"
      :key="index"
      >{{ nav.label }}</view
    >

    <view class="bar" :style="{ left: barLeft + 'px' }"></view>
  </view>
</template>

<script>
const navs = [
  {
    label: "搜家具",
  },
  {
    label: "品牌工厂",
  },
  {
    label: "全屋定制",
  },
  {
    label: "智能选配",
  },
];
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.setBarPosition();
  },

  data() {
    return {
      navs,
      currentNav: 0,
      barLeft: 0,
      navsPosition: null,
    };
  },

  methods: {
    // 切换tab
    handleClick(index) {
      this.$emit("input", index);
      this.setBarPosition();
    },

    // 设置bar的滚动位置
    setBarPosition() {
      const _this = this;
      this.$nextTick(() => {
        const query = uni.createSelectorQuery().in(_this);
        let barPosition = null;

        query
          .select(".navs")
          .boundingClientRect((position) => {
            this.navsPosition = position;
          })
          .exec();

        query
          .select(".bar")
          .boundingClientRect((data) => {
            barPosition = data;
          })
          .exec();

        query
          .select(".active")
          .boundingClientRect((data) => {
            _this.barLeft =
              data.left -
              this.navsPosition.left +
              data.width / 2 -
              barPosition.width / 2;
          })
          .exec();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.navs {
  position: relative;
  font-size: 28upx;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding-top: 20upx;
  color: #000000;
  // padding-bottom: 20upx;
  transition: all 350ms;
  background-color: #fff;
  padding: 20upx 30upx;
  box-sizing: border-box;

  .nav-item {
    &.active {
      color: #e95d20;
    }
  }

  .bar {
    position: absolute;
    height: 4upx;
    background-color: #e95d20;
    width: 40upx;
    left: 0;
    bottom: 0upx;
    transition: all 350ms -350ms;
    border-radius: 100px;
  }
}
</style>