<template>
  <!--index.wxml-->
  <view class="container">
    <!-- 头部 -->
    <view class="header" ref="headerRef">
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
      <img
        class="img"
        :src="require('../../static/images/index/ling.png')"
        alt="响铃"
      />
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
        <swiper-item v-for="banner in strictSelectionBanner" :key="banner.id">
          <img :src="banner.url" alt="" />
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
      <StrictSelection
        :channel="channel"
        :discount="discount"
        :explosion="explosion"
        v-show="currentNav === 0"
      ></StrictSelection>
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
import { navs } from "./config.js";
import StrictSelection from "./components/StrictSelection/index.vue";
import BrandFactory from "./components/BrandFactory/index.vue";
import Design from "./components/Design";
import Carousel from "../../components/carousel";
import Goods from "../../components/goods";
import {
  getGoodsTypesApi,
  getIndexDataApi,
  getTypeDetailList,
} from "../../api/home";

export default {
  data() {
    return {
      navs,
      currentNav: 0,
      strictSelectionBanner: [
        {
          id: 1,
          url: "https://img0.baidu.com/it/u=4086366480,1335391394&fm=253&fmt=auto&app=138&f=JPEG?w=1280&h=500",
        },
        {
          id: 2,
          url: "https://img1.baidu.com/it/u=802717398,2482973253&fm=253&fmt=auto&app=138&f=JPEG?w=1024&h=345",
        },
        {
          id: 3,
          url: "https://img2.baidu.com/it/u=1592211744,900572881&fm=253&fmt=auto&app=138&f=JPEG?w=1067&h=500",
        },
        {
          id: 4,
          url: "https://img2.baidu.com/it/u=1799258866,161245570&fm=253&fmt=auto&app=138&f=JPEG?w=1500&h=500",
        },
      ],
      channel: [], // 风格
      explosion: [], // 爆款专区
      discount: [], // 优惠
    };
  },
  components: { StrictSelection, BrandFactory, Design, Carousel, Goods },
  props: {},
  onLoad: function () {},
  mounted() {
    this.getData();
    this.getIndexData();
    this.getTehui();
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

    /**
     * 获取首页相关信息
     */
    async getData() {
      const res = await getGoodsTypesApi({
        goodsType: 1,
      });

      if (res.errno === 0) {
        this.channel = res.data.categoryList;
      } else {
        uni.showToast({
          title: res.errmsg,
          duration: 2000,
        });
      }

      // console.log("操了", res);
      // console.log(res.data);
      // this.channel = res.data.channel;
      // this.strictSelectionBanner = res.data.banner;
      // this.explosion = res.data.hotGoodsList;
      // this.discount = res.data.newGoodsList;
    },

    async getIndexData() {
      const res = await getIndexDataApi();
      if (res.errno === 0) {
        // this.strictSelectionBanner = res.data.banner;
        this.explosion = res.data.hotGoodsList;
        this.discount = res.data.newGoodsList;

        console.log(this.explosion, this.discount);
      } else {
        uni.showToast({
          title: res.errmsg,
          duration: 2000,
        });
      }
    },

    async getTehui() {
      const res = await getTypeDetailList({
        id: 1001002,
      });
      console.log(res);
    },
  },
  watch: {
    currentNav(val) {
      console.log("nav-切换了", val);
    },
  },
};
</script>
<style scope lang="less">
@import "./index.less";
</style>