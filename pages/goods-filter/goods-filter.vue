<template>
  <div class="goods-filter">
    <view class="header-container">
      <view class="header">
        <image
          @click="handleBack"
          class="icon"
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
          mode=""
        />
        <TLocale :icon="false"></TLocale>
        <view class="search-wrapper">
          <image
            class="search-icon"
            src="../../static/images/index/search.png"
            mode=""
          />
          <text class="text">输入你想搜索的产品</text>
          <image
            class="camera"
            src="../../static/images/index/camera.png"
            mode=""
          />
        </view>
      </view>

      <MainMenus @choose="handleChooseItem" v-model="mainId"></MainMenus>

      <view :class="{ 'stic-top': scrollDis > 200 }">
        <FilterPane></FilterPane>
        <SubMenus
          ref="subMenusRef"
          :currentId="subId"
          @change="handleClickSubMenus"
        ></SubMenus>
      </view>
    </view>

    <view class="main">
      <Goods v-for="item in goodsList" :key="item.id" :data="item"></Goods>
      <load-after v-if="isShowLoading"></load-after>
    </view>

    <view class="main" v-show="!goodsList.length">
      <view class="no-data">暂无商品</view>
    </view>
  </div>
</template>

<script>
import Goods from "../index/components/search-furniture/goods.vue";
import MainMenus from "./components/main-menus.vue";
import SubMenus from "./components/sub-menus.vue";
import FilterPane from "./components/filter-pane.vue";
import { goodsListApi } from "../../api/goods";

export default {
  components: {
    Goods,
    MainMenus,
    SubMenus,
    FilterPane,
  },

  data() {
    return {
      mainId: null,
      subId: null,
      totalPages: 0,
      goodsList: [],
      isShowLoading: false,
      scrollDis: 0,
      queryInfo: {
        page: 1,
        size: 10,
      },
    };
  },

  onLoad(options) {
    console.log(options);
    this.mainId = options.id * 1;
    this.subId = options.sub * 1;
    this.setData();
  },

  methods: {
    handleChooseItem(onceId) {
      this.mainId = onceId;
      this.setData();
    },

    handleClickSubMenus(id) {
      this.subId = id;
      this.queryInfo.page = 1;
      this.getGoodsList();
    },

    setData() {
      this.$nextTick(() => {
        this.$refs.subMenusRef.getSubMenus(this.mainId);
      });
    },

    async getGoodsList(isLoadMore) {
      this.isShowLoading = true;
      uni.showLoading({
        title: "加载中",
      });

      // return
      const res = await goodsListApi({
        categoryId: this.subId === -1 ? this.mainId : this.subId,
        ...this.queryInfo,
      });

      if (res.errno === 0) {
        this.totalPages = res.data.totalPages;

        if (isLoadMore) {
          this.goodsList.push(...res.data.goodsList);
        } else {
          this.goodsList = res.data.goodsList;
        }
      }

      uni.hideLoading();
      this.isShowLoading = false;
    },

    // 回退
    handleBack() {
      uni.navigateBack();
    },
  },

  onReachBottom() {
    if (this.goodsList.length < this.queryInfo.size) {
      return;
    }

    if (this.totalPages === this.queryInfo.page) {
      return;
    }

    this.queryInfo.page++;
    this.getGoodsList(true);
  },

  onPageScroll(e) {
    this.scrollDis = e.scrollTop;
  },
};
</script>

<style lang="less" scoped>
.goods-filter {
  background-color: #f1f2f6;
  min-height: 100vh;
  font-size: 28upx;
}

.stic-top {
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.header-container {
  background-color: #ffffff;
  // padding: 32upx 32upx 20upx 32upx;
  box-sizing: border-box;
}
.header {
  display: flex;
  align-items: center;
  padding: 32upx 32upx 20upx 32upx;
  box-sizing: border-box;

  .icon {
    width: 48upx;
    height: 48upx;
  }

  .local-wrapper {
    position: relative;
    margin-right: 20upx;
    &::after {
      content: "";
      border: 4px solid #000000;
      border-bottom-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      position: absolute;
      top: 50%;
      right: -10px;
    }
    /deep/ .locale {
      color: #000;
      font-size: 32upx;
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
    margin-right: 0;
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

.filter-pane {
  background-color: #ffffff;
  width: 100%;
  margin-top: 20upx;
}

.main {
  padding: 20upx 20upx 20upx 20upx;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.no-data {
  text-align: center;
  line-height: 300upx;
  height: 300upx;
  color: #ccc;
  width: 100%;
}
</style>