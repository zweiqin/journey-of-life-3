<template>
  <!--pages/category/category.wxml-->

  <view class="container">
    <!-- 头部搜索区 -->
    <view class="search-bar">
      <view class="search-box" @tap="toSearchPage">
        <image src="/static/images/icon/search.png" class="search-img"></image>
        <text class="sear-input">搜索您想要的商品</text>
      </view>
    </view>
    <!-- 滚动内容区 -->
    <view class="main">
      <!-- 左侧菜单start -->
      <scroll-view scroll-y="true" class="leftmenu">
        <block v-for="(item, index) in categoryList" :key="index">
          <view
            :class="'menu-item ' + (selIndex == index ? 'active' : '') + ' '"
            :data-index="index"
            :data-id="item.categoryId"
            @tap="onMenuTab"
          >
            {{ item.categoryName }}
          </view>
        </block>
        <view v-if="!categoryList || !categoryList.length" class="ca-empty"
          >暂无分类</view
        >
      </scroll-view>
      <!-- 左侧菜单end -->

      <!-- 右侧内容start -->
      <scroll-view scroll-y="true" class="rightcontent">
        <view v-show="selIndex === 0">
          <Carousel :height="100"></Carousel>
          <view class="guess"></view>
        </view>
        <view v-if="configs[selIndex].length > 0" class="cont-item">
          <view
            class="item"
            @click="handleToDetail"
            v-for="item in configs[selIndex]"
            :key="item.label"
          >
            <img class="img" :src="item.url" alt="" />
            <view class="title">{{ item.label }}</view>
          </view>
        </view>
        <view v-else class="cont-item empty">
          {{
            categoryList && categoryList.length
              ? "该分类下暂无商品"
              : "暂无商品"
          }}</view
        >
        <!-- </block> -->
      </scroll-view>
      <!-- 右侧内容end -->
      <!-- </block> -->
    </view>
  </view>
</template>

<script module="wxs" lang="wxs" src="../../wxs/number.wxs"></script>

<script>
// pages/category/category.js
var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
import { config as configs } from "./config";
import Carousel from "../../components/carousel";
import { getStuffListApi } from "../../api/stuff";

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      selIndex: 0,
      categoryList: [
        {
          categoryId: 0,
          categoryName: "推荐",
        },
        {
          categoryId: 1,
          categoryName: "皮革",
        },
        {
          categoryId: 2,
          categoryName: "布料",
        },
        {
          categoryId: 3,
          categoryName: "海绵",
        },
        {
          categoryId: 4,
          categoryName: "弹簧",
        },
        {
          categoryId: 5,
          categoryName: "五金",
        },
        {
          categoryId: 6,
          categoryName: "木材",
        },
        {
          categoryId: 7,
          categoryName: "塑料",
        },
        {
          categoryId: 8,
          categoryName: "床垫",
        },
        {
          categoryId: 9,
          categoryName: "拉带",
        },
        {
          categoryId: 10,
          categoryName: "支架",
        },
        {
          categoryId: 11,
          categoryName: "油漆",
        },
        {
          categoryId: 12,
          categoryName: "玻璃",
        },
      ],
      productList: [{}],
      categoryImg: "",
      prodid: "",
      configs,
      query: {
        // id: null,
        goodsType: 1,
      },
    };
  },

  mounted() {
    this.getStuffList();
  },

  methods: {
    // 加载类目数据
    async getStuffList() {
      const res = await getStuffListApi(this.query);
      console.log(res);
    },

    /**
     * 分类点击事件
     */
    onMenuTab: function (e) {
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index; // this.getProdList(id);

      // this.getProdList(this.categoryList[index].categoryId);
      this.setData({
        categoryImg: this.categoryList[index].pic,
        selIndex: index,
      });
    },
    // 跳转搜索页
    toSearchPage: function () {
      uni.navigateTo({
        url: "/pages/search-page/search-page",
      });
    },

    handleToDetail() {
      uni.navigateTo({
        url: "/stuff/detail",
      });
    },

    getProdList(categoryId) {
      //加载分类列表
      var params = {
        url: "/prod/pageProd",
        method: "GET",
        data: {
          categoryId: categoryId,
        },
        callBack: (res) => {
          // console.log(res);
          this.setData({
            productList: res.records,
          });
        },
      };
      http.request(params);
    },

    //跳转商品详情页
    toProdPage: function (e) {
      var prodid = e.currentTarget.dataset.prodid;
      uni.navigateTo({
        url: "/pages/prod/prod?prodid=" + prodid,
      });
    },
  },
};
</script>
<style>
@import "./category.css";
</style>