<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-12 16:17:05
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-22 17:27:42
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\pages\index\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!--index.wxml-->
  <view class="container">
    <!-- <accountcement></accountcement> -->
    <!-- 头部 -->
    <view class="header" ref="headerRef">
      <TLocale></TLocale>

      <!-- <img
        v-if="currentNav === 0"
        class="img"
        :src="require('../../static/images/index/location.png')"
        alt="定位"
      /> -->

      <!-- <text class="loaction" v-if="currentNav === 0">佛山市</text> -->
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
      <view class="flex">
        <view class="brief" v-for="item in briefIntroduction" :key="item.value">
          <img :src="item.icon" class="brief-img" />
          <view class="brief-text">{{ item.lable }}</view>
        </view>
      </view>
    </view>
    <view class="affiche" v-if="currentNav === 0">
      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/93wpaaxvpg67whbtul3e.png "
        alt=""
        class="bell"
      />
      <view class="title">近期公告</view>
      <swiper
        :indicator-dots="false"
        autoplay
        :circular="true"
        :vertical="true"
        class="text-swiper"
      >
        <swiper-item
          class="swiper-text"
          v-for="item in affiche"
          :key="item.value"
        >
          <view>{{ item.lable }}</view>
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
        :brandList="brandList"
        :guessLike="guessLike"
        :goodlist1="goodlist1"
        :goodlist2="goodlist2"
        :goodlist3="goodlist3"
        v-show="currentNav === 0"
      ></StrictSelection>
      <BrandFactory
        :BrandFactory="BrandFactory"
        v-show="currentNav === 1"
      ></BrandFactory>
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
      <view class="item" @click="handleToShopCar">
        <img :src="require('../../static/images/index/shop-car.png')" alt="" />
      </view>
      <view class="item" @click="backToTop">
        <img
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/5eyamrkxkolwe4ebzf4p.png"
          alt=""
        />
      </view>
    </view>
  </view>
</template>

<script module="wxs" lang="wxs" src="../../wxs/number.wxs"></script>

<script>
//index.js
//获取应用实例
import { navs, briefIntroduction, affiche } from "./config.js";
import StrictSelection from "./components/StrictSelection/index.vue";
import BrandFactory from "./components/BrandFactory/index.vue";
import { getBrandListApi } from "../../api/brand";
import { getGoodsByIdApi } from "../../api/home";
import { goodsListApi } from "../../api/goods";
import Design from "./components/Design";
import Carousel from "../../components/carousel";
import Goods from "../../components/goods";
import lqbtitle from "./components/lqbTitle";
import lqbCompany from "./components/lqbCompany";
import accountcement from "./components/lqbAnnouncement";
import {
  getGoodsTypesApi,
  getIndexDataApi,
  getTypeDetailList,
} from "../../api/home";
import { checkWhoami } from "../../utils/DWHutils.js";
export default {
  data() {
    return {
      title: "爆款专区",
      englishTitle: "EXPLOSIVE SECTION",
      navs,
      affiche,
      brandList: [],
      guessLike: [],
      BrandFactory: [],
      goodlist1: [],
      page: 1,
      size: "",
      goodlist2: [],
      goodlist3: [],
      currentNav: 0,
      briefIntroduction,
      strictSelectionBanner: [
        {
          id: 1,
          url: "https://img0.baidu.com/it/u=4086366480,1335391394&fm=253&fmt=auto&app=138&f=JPEG?w=1280&h=500",
        },
        {
          id: 2,
          url: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/rfhy2z3or8ksz65xv01t.png",
        },
        {
          id: 3,
          url: "https://img2.baidu.com/it/u=1592211744,900572881&fm=253&fmt=auto&app=138&f=JPEG?w=1067&h=500",
        },
      ],
      channel: [], // 风格
      explosion: [], // 爆款专区
      discount: [], // 优惠
    };
  },
  components: {
    StrictSelection,
    BrandFactory,
    Design,
    Carousel,
    accountcement,
    Goods,
    lqbtitle,
    lqbCompany,
  },
  props: {},
  onLoad: function () {},
  mounted() {
    this.getData();
    this.getIndexData();
    this.getTehui();
    this.getBrandList();
    this.getGoodsById();
    this.getBrandFactory();
    this.getgoodsList();
    this.moreGoodsList();
    // checkWhoami();
  },
  onShow: function () {},
  onPullDownRefresh: function () {},
  methods: {
    async moreGoodsList() {
      const res = await goodsListApi({
        page: this.page,
        size: this.size,
      });

      console.log("allgoods", res);
      if (this.goodlist3.length == 0) {
        this.goodlist3 = res.data.goodsList;
      } else {
        this.goodlist3.push(...res.data.goodsList);
      }
    },
    async getgoodsList() {
      const res = await goodsListApi({
        brandId: 1001199,
        size: 100,
      });
      console.log("goodsList", res);
      const fklist = res.data.goodsList;
      this.goodlist1 = fklist.slice(31, 37);
      this.goodlist2 = fklist.slice(38, 42);
    },

    async getBrandFactory() {
      const res = await getBrandListApi({
        brandgenreId: 23,
        page: 1,
        size: 10,
      });
      console.log("品牌工厂", res);
      // this.BrandFactory= res.data.brandList
      this.BrandFactory = res.data.brandList.slice(0, 3);
      console.log("品牌工厂1", this.BrandFactory);
    },
    async getGoodsById() {
      let number = Math.ceil(Math.random() * 10) + 1; //ceil向上取整，即生成1-10的随机整数，取0的概率极小
      console.log("123", number);
      const res = await getGoodsByIdApi({
        page: number,
        size: 20,
      });
      console.log("guessLike", res.data.goodsList);
      this.guessLike = res.data.goodsList;
    },
    async getBrandList() {
      const res = await getBrandListApi({
        brandgenreId: 0,
        page: "",
        size: "",
      });

      this.brandList = res.data.brandList;
    },
    shopCar() {
      uni.navigateTo({
        url: "../../user/sever/shop-car",
      });
    },
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
        console.log(res);
        // this.strictSelectionBanner = res.data.banner;
        this.explosion = res.data.hotGoodsList;
        this.discount = res.data.newGoodsList;
        this.explosion = this.explosion.slice(0, 6);
        this.discount = this.discount.slice(0, 6);

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

    handleToShopCar() {
      uni.navigateTo({
        url: "/user/sever/shop-car",
      });
    },
  },
  watch: {
    currentNav(val) {
      console.log("nav-切换了", val);
    },
  },
  onReachBottom() {
    if (this.page == this.goodlist3.totalPages) {
      uni.showToast({
        title: "已经到底",
        duration: 2000,
        icon: "none",
      });
    } else {
      this.page = this.page + 1;
      this.moreGoodsList();
    }
  },
};
</script>
<style scope lang="less">
@import "./index.less";
.flex {
  display: flex;
  justify-content: space-around;
  margin-top: 20upx;
  .brief {
    display: flex;
    .brief-img {
      width: 32upx;
      height: 32upx;
      margin-right: 6upx;
    }
    .brief-text {
      color: #999;
      font-size: 24upx;
    }
  }
}
.affiche {
  display: flex;
  align-items: center;
  .bell {
    width: 40upx;
    height: 40upx;
  }
  .title {
    color: #fa5151;
    font-size: 28upx;
    margin-left: 22upx;
  }
  .text-swiper {
    flex: 1;
    height: 45upx;
    .swiper-text {
      height: 40upx;
      display: flex;
      align-items: center;
      margin-left: 22upx;
      view {
        overflow: hidden;
        color: rgba(0, 0, 0, 0.85);
        font-size: 28upx;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>