<template>
  <view class="filter-pane-container">
    <view id="wrapper">
      <view class="filter-item" @click="handleFilter">
        <text>价格</text>
        <image src="../../../static/images/common/tag.png" mode="" />
      </view>
      <view class="filter-item" @click="handleFilter">
        <text>风格</text>
        <image src="../../../static/images/common/tag.png" mode="" />
      </view>
      <view class="filter-item" @click="handleFilter">
        <text>产地</text>
        <image src="../../../static/images/common/tag.png" mode="" />
      </view>
      <view class="filter-item" @click="handleFilter">
        <text>材质</text>
        <image src="../../../static/images/common/tag.png" mode="" />
      </view>
    </view>

    <view
      class="filter-container"
      :style="{
        top: position + 'px',
        transform: isShowPane ? 'scaleY(1)' : 'scaleY(0)',
      }"
    >
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      position: 0,
      isShowPane: false,
    };
  },
  mounted() {
    this.setTop();
  },
  methods: {
    setTop() {
      const _this = this;
      const query = uni.createSelectorQuery().in(this);
      query
        .select("#wrapper")
        .boundingClientRect((data) => {
          _this.position = data.height + data.top / 2;
        })
        .exec();
    },

    handleFilter() {
      return
      this.isShowPane = !this.isShowPane;
    },
  },
};
</script>

<style lang="less" scoped>
.filter-pane-container {
  width: 100%;
  // background-color: aqua;
  padding: 26upx 20upx 0 20upx;
  box-sizing: border-box;
  position: relative;

  #wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .filter-item {
    display: flex;
    align-items: center;
  }

  image {
    width: 18upx;
    height: 9upx;
    margin-left: 10upx;
    margin-top: 4upx;
  }

  .filter-container {
    position: absolute;
    top: 65px;
    background-color: #fff;
    width: 100%;
    z-index: 1000;
    left: 0;
    transform: scaleY(0);
    transform-origin: top center;
    transition: all 200ms;
    padding: 20upx;
    box-sizing: border-box;
  }
}
</style>