<template>
  <view class="header-wrapper">
    <view class="header">
      <TLocale :icon="false"></TLocale>
      <view class="search-wrapper">
        <image
          class="search-icon"
          src="../../../static/images/index/search.png"
          mode=""
        />
        <text class="text">输入你想搜索的产品</text>
        <image
          class="camera"
          src="../../../static/images/index/camera.png"
          mode=""
        />
      </view>
      <image
        class="chat"
        src="../../../static/images/user/daipingjia.png"
        mode=""
      />
    </view>

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
  data() {
    return {
      navs,
      currentNav: 0,
      barLeft: 0,
    };
  },

  mounted() {
    this.setBarPosition();
  },

  watch: {
    value() {
      this.setBarPosition();
    },
  },

  methods: {
    // 设置bar的滚动位置
    setBarPosition() {
      const _this = this;
      this.$nextTick(() => {
        const query = uni.createSelectorQuery().in(_this);
        let headerPosition = null;
        let barPosition = null;

        query
          .select(".header")
          .boundingClientRect((position) => {
            headerPosition = position;
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
              headerPosition.left +
              data.width / 2 -
              barPosition.width / 2;
          })
          .exec();
      });
    },

    // 切换tab
    handleClick(index) {
      this.$emit("input", index);
      this.setBarPosition();
    },

    // 获取尺寸
    getSize() {
      const query = uni.createSelectorQuery().in(this);
      return new Promise((resolve, reject) => {
        query
          .select(".header-wrapper")
          .boundingClientRect((data) => {
            resolve(data.height);
          })
          .exec();
      });
    },

    
  },
};
</script>

<style lang="less" scoped>
.header-wrapper {
  padding: 50upx 30upx 20upx;

  .header {
    display: flex;
    align-items: center;

    .local-wrapper {
      position: relative;
      margin-right: 20upx;
      &::after {
        content: "";
        border: 8upx solid #000000;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
        position: absolute;
        top: 50%;
        right: -10px;
      }
      /deep/ .locale {
        color: #000;
        font-size: 36upx;
        font-weight: 500;
      }
    }

    .chat {
      width: 33.2upx;
      height: 30upx;
      object-fit: cover;
    }

    .search-wrapper {
      flex: 1;

      background-color: #f1f2f6;
      height: 74upx;
      margin: 0 20upx;
      border-radius: 100px;
      padding: 0 26upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .search-icon {
        width: 26.6upx;
        height: 26.6upx;
      }

      .text {
        font-size: 24upx;
        color: #999999;
        margin-left: 20upx;
        padding-left: 20upx;
        border-left: 1upx solid #d8d8d8;
        flex: 1;
      }

      .camera {
        width: 33.2upx;
        height: 30upx;
        object-fit: cover;
      }
    }
  }

  .navs {
    position: relative;
    font-size: 28upx;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40upx;
    color: #000000;
    padding-bottom: 20upx;
    transition: all 350ms;

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
      transition: all 350ms;
      border-radius: 100px;
    }
  }
}
</style>