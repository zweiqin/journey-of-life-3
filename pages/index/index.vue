<template>
  <view
    class="index-container"
    :style="{
      paddingTop: paddingTop + 'px',
      backgroundColor: currentIndex == 2 ? '#fff' : '',
    }"
  >
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

      <view class="Whole-house-customization" v-if="currentIndex === 2">
        暂无数据
      </view>
      <uni-load-more
        v-show="loadingStatus !== 'none'"
        :status="loadingStatus"
      ></uni-load-more>
    </view>
  </view>
</template>

<script>
import HeaderView from './components/header.vue'
import SearchFurniture from './components/search-furniture'
import IntelligentSelection from './components/intelligent-selection/intelligent-selection'
import BrandFactory from './brandFactory/index.vue'
import Navs from './components/Navs.vue'

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
      loadingStatus: 'loading',
    }
  },
  onLoad() {
    uni.pageScrollTo({
      scrollTop: 0,
    })
  },
  mounted() {
    this.getSize()
  },

  onShow() {
    this.$refs.navsRef && this.$refs.navsRef.setBarPosition()
  },
  methods: {
    async getSize() {
      const _this = this
      const query = uni.createSelectorQuery().in(this)
      query
        .select('.header-view')
        .boundingClientRect(postion => {
          _this.paddingTop = postion.height
          _this.headerHeight = postion.height
          _this.headerPosition = postion
        })
        .exec()
    },

    handleSwitchTab(e) {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      })
      this.currentIndex = e
      if (e == 0) {
        this.paddingTop = 92
        return
      } else if (e === 2) {
        this.loadingStatus = 'none'
      }

      this.$nextTick(async () => {
        const mapCpn = {
          0: this.$refs.searchFurnitureRef,
          1: this.$refs.brandFactoryRef,
          3: this.$refs.intelligentSelectionRef,
        }
        const height = await mapCpn[e].getPosition()
        this.paddingTop = this.headerPosition.height + height + 15
      })
    },
  },

  onReachBottom() {
    const mapCpn = {
      0: this.$refs.searchFurnitureRef,
      1: this.$refs.brandFactoryRef,
      3: this.$refs.intelligentSelectionRef,
    }
    this.loadingStatus = mapCpn[this.currentIndex].reachBottom() || 'loading'
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
}
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

.Whole-house-customization {
  background-color: #fff;
  height: 200upx;
  text-align: center;
  line-height: 200upx;
  color: #ccc;
}
</style>
