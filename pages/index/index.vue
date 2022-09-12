<template>
  <!--index.wxml-->
  <view class="container" @scroll="handleScroll">
    <!-- 头部 -->
    <view class="header" :class="{ 'header-fixed': scroll }" ref="headerRef">
      <img
        v-if="currentNav === 0"
        class="img"
        :src="require('../../static/images/index/location.png')"
        alt="定位"
      />

      <text class="loaction" v-if="currentNav === 0">佛山市</text>
      <view class="search">
        <img :src="require('../../static/images/icon/search.png')" alt="" />
        <input type="text" />
      </view>
      <img class="img" :src="require('../../static/images/index/ling.png')" alt="响铃" />
    </view>

    <!-- banner -->
    <view class="banner" v-if="currentNav === 0">
      <swiper
        class="swiper"
        indicator-dots
        autoplay
        indicator-color="#fff"
        indicator-active-color="#fff"
      >
        <swiper-item>
          <img :src="require('../../static/images/index/banner1.webp')" alt="" />
        </swiper-item>
        <swiper-item>
          <img :src="require('../../static/images/index/banner1.webp')" alt="" />
        </swiper-item>
        <swiper-item>
          <img :src="require('../../static/images/index/banner1.webp')" alt="" />
        </swiper-item>
      </swiper>
    </view>

    <!-- nav -->
    <view class="nav">
      <view
        class="item"
        :class="{ active: currentNav === item.value }"
        v-for="item in navs"
        :key="item.label"
        @click="handleSwitchPanel(item.value)"
      >
        <img class="img" :src="item.icon" alt="" />
        <span>{{ item.label }}</span>
      </view>
    </view>

    <!-- main -->
    <view class="main">
      <StrictSelection v-show="currentNav === 0"></StrictSelection>
      <BrandFactory v-show="currentNav === 1"></BrandFactory>
      <Design v-show="currentNav === 2"></Design>
      <view v-show="currentNav === 3">
        <Carousel></Carousel>

        <view class="goods-wrapper">
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
        </view>
      </view>
    </view>

    <!-- sider -->
    <view class="silder">
      <view class="item">
        <img :src="require('../../static/images/index/shop-car.png')" alt="" />
      </view>
      <view class="item" @click="backToTop">
        <img :src="require('../../static/images/index/up.png')" alt="" />
      </view>
    </view>
  </view>
</template>

<script module="wxs" lang="wxs" src="../../wxs/number.wxs"></script>

<script>
//index.js
//获取应用实例
var config = require("../../utils/config.js");
const app = getApp();
import { navs } from "./config.js";
import StrictSelection from "./components/StrictSelection/index.vue";
import BrandFactory from "./components/BrandFactory/index.vue";
import Design from "./components/Design";
import Carousel from "../../components/carousel";
import Goods from "../../components/goods";

export default {
  data() {
    return {
      navs,
      currentNav: 0,
      scroll: false,
    };
  },
  components: { StrictSelection, BrandFactory, Design, Carousel, Goods },
  props: {},
  onLoad: function () {},
  mounted() {
    const _this = this;
    window.addEventListener("scroll", function (e) {
      _this.scroll = document.documentElement.scrollTop !== 0;
    });
  },
  onShow: function () {},
  onPullDownRefresh: function () {},
  methods: {
    /**
     * @description 回到顶部
     */
    backToTop() {
      uni.pageScrollTo({
        scrollTop: 0,
      });
    },

    /**
     * @description 切换面板
     */
    handleSwitchPanel(value) {
      this.currentNav = value;
    },
  },
  watch: {
    currentNav(val) {
      console.log("nav-切换了", val);
    },
  },
};
</script>
<style scope>
@import "./index.css";
</style>