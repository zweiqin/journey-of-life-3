<template>
  <view class="styles-container">
    <view class="header">
      <img
        class="back"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qt4o7j0jglkweyicy1fw.png"
        alt=""
        @click="handleBack"
      />
      <view class="search-wrapper" :class="{ active: isSearch }">
        <input
          type="text"
          :value="searchValue"
          @input="handleSearchInput"
          @blur="handleSearchBlur"
          class="search-input"
        />

        <img
          @click="handleShowSearchValue"
          class="search"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/lsomfvddr0bz7fdsltht.png"
          alt=""
        />
      </view>
    </view>

    <view class="navs" ref="navsRef">
      <view class="nav" @click="handleChoose('style')">风格</view>
      <view class="nav" @click="handleChoose('tag')">标签</view>
      <!-- <view class="nav" @click="handleChoose('stock')">库存</view> -->
      <view class="nav" @click="handleChoose('price')">价格</view>
    </view>

    <view v-show="list.length" class="wrapper">
      <Goods></Goods>
    </view>

    <NoData v-show="!list.length"></NoData>

    <view class="modal" ref="modalRef">
      <view class="mask" @click="closeModal"></view>
      <view class="main">
        <StylePanel
          v-show="currentCondition === 'style'"
          @changeStyle="query.id = $event + ''"
          :styleId="query.id"
          :categoryId="query.category"
          @search="handleSearch"
        ></StylePanel>

        <HotPane
          @change="handleChooseTag"
          :hot="query.isHot"
          :new="query.isNew"
          v-show="currentCondition === 'tag'"
        ></HotPane>

        <PricePane
          @change="handleSearchPrice"
          :select="query.order"
          v-show="currentCondition === 'price'"
        ></PricePane>
      </view>
      <!-- <view class="footer">
        <button class="btn">重置</button>
        <button class="btn">确定</button>
      </view> -->
    </view>
  </view>
</template>

<script>
const { debounce } = require("../utils/util");
import Goods from "../components/goods";
import { getTypeDetailList, getGoodsById } from "../api/home";
import StylePanel from "./components/style-pane.vue";
import NoData from "../components/no-data";
import HotPane from "./components/hot-pane.vue";
import PricePane from "./components/price-pane.vue";

export default {
  components: {
    Goods,
    StylePanel,
    NoData,
    HotPane,
    PricePane,
  },
  data() {
    return {
      isSearch: false,
      handleSearchInput: null,
      isShow: false,
      modalPositionTop: 0,
      list: [],
      currentCondition: "",
      searchValue: "",
      query: {
        id: "",
        category: "",
        isHot: false,
        isNew: false,
        sort: "retail_price",
        order: "",
        page: 1,
        size: 30,
      },

      totalPage: 0,
    };
  },
  mounted() {
    this.handleSearchInput = debounce(this.searchGoods, 300);
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
    // 点击搜索icon，打开搜索
    handleShowSearchValue() {
      this.isSearch = true;
    },

    // 搜索框失去交焦点
    handleSearchBlur() {
      if (!this.query.searchValue) {
        this.isSearch = false;
      }
    },

    // 文本框搜索
    searchGoods(e) {
      this.searchValue = e.detail.value;

      console.log(e.detail.value);
    },

    // 获取数据
    async getData() {
      const res = await getTypeDetailList({
        id: this.query.id,
      });

      console.log("", res);
    },

    // 点击筛选弹出弹框
    handleChoose(type) {
      this.currentCondition = type;
      const local = this.$refs.navsRef.$el.getBoundingClientRect();
      this.modalPositionTop = local.top + local.height;
      this.$refs.modalRef.$el.style.top = this.modalPositionTop + "px";
      this.$refs.modalRef.$el.style.opacity = 1;
      this.$refs.modalRef.$el.style.zIndex = 10;
    },

    closeModal() {
      this.modalPositionTop = 0;
      this.$refs.modalRef.$el.style.top = 0;
      this.$refs.modalRef.$el.style.opacity = 0;
      this.$refs.modalRef.$el.style.zIndex = -20;
    },

    /**
     * 获取筛选的详情
     */
    async handleSearch(id) {
      this.query.category = id + "";
      const res = await getGoodsById({
        categoryId: this.query.id,
        isNew: this.query.isNew,
        isHot: this.query.isHot,
        order: this.query.order,
        sort: this.query.sort,
        page: this.query.page,
        size: this.query.size,
      });

      this.closeModal();

      if (res.errno === 0) {
        console.log(res.data);
        this.list = res.data.goodsList;
        this.totalPage = res.data.totalPages;

        // TODO 触底加载
      } else {
        uni.showToast({
          title: res.errmsg,
          duration: 2000,
        });
      }
    },

    // 选择tag
    handleChooseTag(tag) {
      this.query.isHot = tag === "爆款专区";
      this.query.isNew = tag === "新品专区";

      this.handleSearch();
    },

    // 筛选价格
    handleSearchPrice(value) {
      this.query.order = value;
      this.handleSearch();
    },
  },
  onLoad(options) {
    this.query.id = options.id;
    this.getData();
  },
};
</script>

<style lang="less" scoped>
@import "../style/var.less";
@import "../style/mixin.less";

.styles-container {
  padding: 30upx 30upx;
  box-sizing: border-box;

  .header {
    .flex();

    .back {
      width: 56upx;
    }

    .search-wrapper {
      .flex();
      width: 32upx;
      height: 32upx;
      overflow: hidden;
      padding: 10upx;
      border-radius: 20upx;
      transition: all 350ms;

      .search-input {
        flex: 1;
        box-sizing: border-box;
      }

      &.active {
        flex: 1;
        background-color: #d8d8d8;

        .search-input {
          padding-left: 20px;
        }
      }
    }

    .search {
      width: 32upx;
      margin-left: 5px;
    }
  }

  .navs {
    .flex();
    font-size: @f12;
    color: @c3d;
    padding: 28upx 24upx;
    border-bottom: 1upx solid #e8e8e8;

    .nav {
      position: relative;
      padding-right: 40upx;

      &::before {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border: 10upx solid #ccc;
        right: 0;
        top: 50%;
        transform: translateX(-50%);
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }
    }
  }

  .wrapper {
    .flex();
    padding: 20px 0;
    flex-wrap: wrap;
  }

  .modal {
    position: fixed;
    opacity: 0;
    left: 0;
    top: 0;
    width: 100%;
    background-color: rgb(255, 255, 255);
    z-index: -10;
    // padding-bottom: 228upx;
    transition: all 350ms;

    .mask {
      width: 100%;
      height: 100vh;
      position: absolute;
      background-color: rgba(153, 153, 153, 0.6);
      content: "";
      z-index: -1;
    }

    .main {
      box-sizing: border-box;
      padding: 30upx 58upx 30upx 58upx;
      z-index: 2;
      background-color: @cw;

      .title {
        font-size: @f12;
        color: @c0;
        font-weight: bold;
        margin-bottom: 24upx;
      }

      .values {
        font-size: @f12;
        color: @c3d;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 12px;

        .item {
          margin-right: 20px;
        }
      }
    }

    .footer {
      width: 100%;
      height: 80upx;
      .flex();
      background-color: @cw;

      .btn {
        font-size: @f14;
        color: @c3d;
        height: 100%;
        width: 50%;
        border-radius: 0;
        // margin-top: 228upx;

        &:nth-child(1) {
          background-color: #d8d8d8;
          color: @c3d;
        }

        &:nth-child(2) {
          background-color: #ff8f1f;
          color: @cw;
        }
      }
    }
  }
}
</style>