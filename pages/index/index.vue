<template>
  <view class="index-container" :style="{ paddingTop: paddingTop + 'px' }">
    <HeaderView
      ref="headerRef"
      :value="currentIndex"
      @input="handleSwitchTab"
      class="pane header-view"
    ></HeaderView>

    <view class="main">
      <SearchFurniture
        :goodsList="searchGoodsList"
        @reachBottom="handleReachBottom"
      ></SearchFurniture>
    </view>
  </view>
</template>

<script>
import { getHomeGoodsListApi } from "../../api/home";
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

      // 分页数据
      queryInfo: {
        page: 1,
        size: 200,
      },
      totalPages: 0,
      searchGoodsList: [],
    };
  },
  onLoad() {},
  mounted() {
    this.getSize();
    this.getGoodsList();
  },

  onShow() {
    this.$refs.headerRef && this.$refs.headerRef.setBarPosition();
  },
  methods: {
    async getSize() {
      const size = await this.$refs.headerRef.getSize();
      this.paddingTop = size;
    },

    handleSwitchTab(e) {
      if (e === 1) {
        uni.navigateTo({ url: "/pages/brandFactory/index" });
        return;
      }

      // this.currentIndex = e;
    },

    async getGoodsList(isLoadmore) {
      uni.showLoading();
      const res = await getHomeGoodsListApi({ ...this.queryInfo });
      if (res.errno === 0) {
        this.totalPages = res.data.totalPages;

        if (isLoadmore) {
          this.searchGoodsList.push(...res.data.goodsList);
        } else {
          this.searchGoodsList = res.data.goodsList;
        }
        uni.hideLoading();
      } else {
        uni.hideLoading();
        uni.showToast({
          title: res.errmsg,
        });
      }
    },
  },

  onReachBottom() {
    if (this.totalPages <= this.queryInfo.page) {
      return;
    }

    if (this.searchGoodsList.length < this.queryInfo.size) {
      return;
    }

    this.queryInfo.page++;
    this.getGoodsList(true);
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