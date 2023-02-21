<template>
  <view class="index-container">
    <HeaderNav
      :scrollTop="scrollTop"
      :current="current"
      @change="handleSwitchTab"
    ></HeaderNav>

    <view class="main-area">
      <SearchFurniture
        ref="searchFurnitureRef"
        v-show="current === 0"
      ></SearchFurniture>

      <BrandFactory v-show="current === 1"></BrandFactory>

      <WholehouseCustomization v-show="current === 2"></WholehouseCustomization>

      <IntelligentSelection v-show="current === 3"></IntelligentSelection>
    </view>
  </view>
</template>

<script>
import HeaderNav from './cpns/HeaderNav'
import SearchFurniture from './SearchFurniture'
import BrandFactory from './BrandFactory'
import WholehouseCustomization from './WholehouseCustomization'
import IntelligentSelection from './IntelligentSelection'
const mapRefs = {
  0: 'searchFurnitureRef',
}
export default {
  components: {
    HeaderNav,
    SearchFurniture,
    BrandFactory,
    WholehouseCustomization,
    IntelligentSelection,
  },

  data() {
    return {
      current: 0,
      scrollTop: 0,
    }
  },

  methods: {
    handleSwitchTab(value) {
      this.current = value
    },
  },

  onReachBottom() {
    const reachBottomFn = this.$refs[mapRefs[this.current]].reachBottom
    reachBottomFn && reachBottomFn()
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
}
</script>

<style lang="less" scoped>
.index-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f5;
  padding-bottom: 110upx;

  .main-area {
    // padding: 20upx;
    // box-sizing: border-box;
  }
}
</style>
