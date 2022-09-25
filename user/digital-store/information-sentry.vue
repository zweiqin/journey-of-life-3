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
          @input="handleSearchFn"
          :value="query.search"
        />
      </view>
    </div>

    <view class="navs">
      <view
        class="item"
        :class="{ active: query.status === item.value }"
        v-for="item in navs"
        :key="item.label"
        @click="changeCurrentTab(item.value)"
        >{{ item.label }}</view
      >
    </view>

    <view class="main" v-show="list.length">
      <view v-show="query.status === 1">
        <CollectPane
          @success="handleConversionSuccess"
          v-for="item in list"
          :key="item.id"
          :info="item"
        ></CollectPane>
      </view>

      <view v-show="query.status === 2">
        <ConversionPane
          v-for="item in list"
          :key="item.id"
          :info="item"
          @success="handleConversionSuccess"
        ></ConversionPane>
      </view>

      <view v-show="query.status === 3">
        <PursueSalePane
          v-for="item in list"
          :key="item.id"
          :info="item"
          @success="handleConversionSuccess"
        ></PursueSalePane>
      </view>

      <view v-show="query.status === 4">
        <StanPane
          v-for="item in list"
          :key="item.id"
          :info="item"
          @success="handleConversionSuccess"
        ></StanPane>
      </view>
    </view>

    <NoData v-show="!list.length"></NoData>

    <img
      class="add-icon"
      @click="handleToAdd"
      v-show="query.status !== 4"
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/8osmldqpu5nthwxlwha9.png"
      alt=""
    />

    <AddPopup
      :words="words"
      :type="query.status"
      :list="list"
      ref="addPopupRef"
    ></AddPopup>
  </view>
</template>

<script>
import { informationSentryNavs } from "./config";
import CollectPane from "./components/collect-pane.vue";
import ConversionPane from "./components/conversion-pane.vue";
import PursueSalePane from "./components/pursue-sale-pane.vue";
import StanPane from "./components/stan-pane.vue";
import { getMsgSentryListApi, getWordsApi } from "../../api/user";
import { getUserId } from "../../utils";
import NoData from "../../components/no-data";
import { WORDS_LIST, SELECT_WORDS } from "../../constant";
import AddPopup from "./components/add-popup.vue";
const { debounce } = require("../../utils/util");

export default {
  data() {
    return {
      searchActive: false,
      navs: informationSentryNavs,
      currentTab: 1,
      query: {
        userId: getUserId(),
        status: 1,
        search: "",
      },
      list: [],
      popupVisiable: false,
      words: "",
      handleSearchFn: null,
    };
  },

  components: {
    CollectPane,
    ConversionPane,
    PursueSalePane,
    StanPane,
    NoData,
    AddPopup,
  },

  created() {
    this.getListData();
    this.handleSearchFn = debounce(this.search, 500);
  },

  methods: {
    // 点击搜索icon
    handleSearch() {
      this.searchActive = true;
    },

    // 点击切换tab
    changeCurrentTab(tab) {
      this.query.status = tab;
      this.getListData();
      this.getWordsList();
      this.$refs.addPopupRef.clear();
      uni.setStorageSync(SELECT_WORDS, "");
    },

    // 回退
    handleBack() {
      uni.navigateBack();
    },

    // 获取列表数据
    async getListData() {
      uni.showLoading({
        title: "加载中",
      });
      const res = await getMsgSentryListApi(this.query);

      if (res.errno === 0) {
        console.log(res);
      } else {
        uni.showToast({
          title: "您还不是业务员，无法访问",
          duration: 2000,
          icon: "none",
        });

        setTimeout(() => {
          uni.switchTab({
            url: "/pages/user/user",
          });
        }, 2000);
      }

      uni.hideLoading();
    },

    // 转化成功
    handleConversionSuccess() {
      this.getListData();
    },

    // 获取话术列表
    async getWordsList() {
      const res = await getWordsApi(this.query.status);
      uni.setStorageSync(WORDS_LIST, res);
    },

    handleToAdd() {
      if (this.query.status === 1) {
        uni.navigateTo({
          url: "/user/digital-store/add",
        });
      } else {
        this.$refs.addPopupRef.open();
      }
    },

    search(e) {
      this.query.search = e.detail.value;
      this.getListData();
    },
  },

  onShow() {
    this.words = uni.getStorageSync(SELECT_WORDS);
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

  .add-icon {
    position: fixed;
    right: 30px;
    bottom: 30px;
    width: 60px;
    height: 60px;
  }
}
</style>