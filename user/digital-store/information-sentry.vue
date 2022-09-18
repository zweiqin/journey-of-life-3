<template>
  <view class="information-sentry-container">
    <div class="header">
      <img
        class="back"
        @click="handleBack"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qt4o7j0jglkweyicy1fw.png"
        alt=""
      />
      <h2
        :style="{
          flex: searchActive ? 'none' : 1,
        }"
      >
        信息哨兵
      </h2>
      <view class="search" :class="{ active: searchActive }">
        <img
          @click="handleSearch"
          class="icon"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/lsomfvddr0bz7fdsltht.png"
          alt=""
        />

        <input
          ref="inputRef"
          class="search-input"
          placeholder="输入手机号昵称搜索"
          type="text"
        />
      </view>
    </div>

    <view class="navs">
      <view
        class="item"
        :class="{ active: currentTab === item.value }"
        v-for="item in navs"
        :key="item.label"
        @click="changeCurrentTab(item.value)"
        >{{ item.label }}</view
      >
    </view>

    <view class="main">
      <view v-show="currentTab === 0">
        <CollectPane></CollectPane>
      </view>

      <view v-show="currentTab === 1">
        <ConversionPane></ConversionPane>
        <ConversionPane></ConversionPane>
        <ConversionPane></ConversionPane>
        <ConversionPane></ConversionPane>
      </view>

      <view v-show="currentTab === 2">
        <PursueSalePane></PursueSalePane>
        <PursueSalePane></PursueSalePane>
        <PursueSalePane></PursueSalePane>
        <PursueSalePane></PursueSalePane>
      </view>

      <view v-show="currentTab === 3">
        <StanPane></StanPane>
        <StanPane></StanPane>
        <StanPane></StanPane>
        <StanPane></StanPane>
      </view>
    </view>
  </view>
</template>

<script>
import { informationSentryNavs } from "./config";
import CollectPane from "./components/collect-pane.vue";
import ConversionPane from "./components/conversion-pane.vue";
import PursueSalePane from "./components/pursue-sale-pane.vue";
import StanPane from "./components/stan-pane.vue";

export default {
  data() {
    return {
      searchActive: false,
      navs: informationSentryNavs,
      currentTab: 0,
    };
  },

  components: {
    CollectPane,
    ConversionPane,
    PursueSalePane,
    StanPane,
  },

  methods: {
    // 点击搜索icon
    handleSearch() {
      this.searchActive = true;
    },

    // 点击切换tab
    changeCurrentTab(tab) {
      this.currentTab = tab;
    },

    // 回退
    handleBack() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
@import "../../style/var.less";

.information-sentry-container {
  padding: 40upx 34upx;
  box-sizing: border-box;
  .header {
    .flex();

    .back {
      width: 48upx;
    }

    h2 {
      flex: 1;
      font-weight: normal;
      font-size: 32upx;
      color: @c0;
      margin-left: 34upx;
      flex-shrink: 0;
    }

    .search {
      position: relative;
      width: 32upx;
      display: flex;
      align-items: center;
      margin-left: 10px;
      transition: all 350ms;
      overflow: hidden;

      &.active {
        background-color: #efefef;
        padding: 2px 10px;
        border-radius: 20px;
        overflow: auto;
        flex: 1;

        .icon {
          margin-right: 10px;
        }

        .search-input {
          flex: 1;
        }
      }

      .icon {
        width: 32upx;
      }

      .search-input {
        width: 0;
      }
    }
  }

  .navs {
    padding: 34upx;
    .flex();
    color: @c9;
    font-size: 28upx;

    .item {
      transition: all 350ms;

      &.active {
        color: #ff8f1f;
      }
    }
  }
}
</style>