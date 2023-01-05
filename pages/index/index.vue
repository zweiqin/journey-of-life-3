<template>
  <view class="index-container" :style="{ paddingTop: paddingTop + 'px' }">
    <view class="header-container header-view">
      <HeaderView ref="headerRef" class="pane"></HeaderView>
      <view class="navs-wrapper">
        <Navs
          ref="navsRef"
          :value="currentIndex"
          @input="handleSwitchTab"
        ></Navs>
      </view>
    </view>

    <view class="main">
      <SearchFurniture
        ref="searchFurnitureRef"
        v-if="currentIndex === 0"
        @reachBottom="handleReachBottom"
      ></SearchFurniture>
      <BrandFactory
        ref="brandFactoryRef"
        :height="headerHeight"
        v-if="currentIndex === 1"
      ></BrandFactory>
      <IntelligentSelection
        ref="intelligentSelectionRef"
        :height="headerHeight"
        v-if="currentIndex === 3"
      ></IntelligentSelection>
      <uni-load-more :status="loadingStatus"></uni-load-more>
    </view>
  </view>
</template>

<script>
import HeaderView from "./components/header.vue";
import SearchFurniture from "./components/search-furniture";
import IntelligentSelection from "./components/intelligent-selection/intelligent-selection";
import BrandFactory from "./brandFactory/index.vue";
import Navs from "./components/Navs.vue";

export default {
  components: {
    HeaderView,
    SearchFurniture,
    IntelligentSelection,
    BrandFactory,
    Navs,
  },
  data() {
    return {
      swiperHeight: 500,
      currentIndex: 0,
      paddingTop: 0,
      headerPosition: {},
      searchGoodsList: [],
      navHeight: 76,
      headerHeight: 104,
      loadingStatus: "loading",
    };
  },
  onLoad() {
    uni.pageScrollTo({
      scrollTop: 0,
    });
  },
  mounted() {
    this.getSize();
  },

  onShow() {
    this.$refs.navsRef && this.$refs.navsRef.setBarPosition();
  },
  methods: {
    async getSize() {
      const _this = this;
      const query = uni.createSelectorQuery().in(this);
      query
        .select(".header-view")
        .boundingClientRect((postion) => {
          _this.paddingTop = postion.height;
          _this.headerHeight = postion.height;
          _this.headerPosition = postion;
        })
        .exec();
    },

    handleSwitchTab(e) {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      });
      this.currentIndex = e;
      if (e == 0) {
        this.paddingTop = 0;
        return;
      }

      this.$nextTick(async () => {
        const mapCpn = {
          0: this.$refs.searchFurnitureRef,
          1: this.$refs.brandFactoryRef,
          3: this.$refs.intelligentSelectionRef,
        };
        const height = await mapCpn[e].getPosition();
        this.paddingTop = this.headerPosition.height + height + 15;
      });
    },
  },

  onReachBottom() {
    const mapCpn = {
      0: this.$refs.searchFurnitureRef,
      1: this.$refs.brandFactoryRef,
      3: this.$refs.intelligentSelectionRef,
    };
    this.loadingStatus = mapCpn[this.currentIndex].reachBottom() || "loading";
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
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

  .navs-wrapper {
    overflow: hidden;
    transition: all 100ms;
  }
}
</style>