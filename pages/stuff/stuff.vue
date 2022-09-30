<template>
  <view class="stuff-container">
    <!-- 搜索 -->
    <view class="search-bar">
      <view class="local-wrapper">
        <img
          class="location"
          src="../../static/images/index/location.png"
          alt=""
        />
        <text class="locale">佛山市</text></view
      >
      <input type="text" />
      <img class="location" src="../../static/images/store/search.png" alt="" />
    </view>

    <!-- 轮播 -->
    <view class="banner">
      <swiper
        class="swiper"
        indicator-dots
        autoplay
        indicator-color="#fff"
        indicator-active-color="#fff"
      >
        <swiper-item>
          <img
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/w8v0c8qw8juyl5pnhf2i.jpg"
            alt=""
          />
        </swiper-item>
        <swiper-item>
          <img
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/x20ln5fw3vse5k9utba6.jpg"
            alt=""
          />
        </swiper-item>
        <swiper-item>
          <img
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/s1ufx6r67xxz4eyvyrdg.jpg"
            alt=""
          />
        </swiper-item>
        <swiper-item>
          <img
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/cwom158kn14893wt9top.jpg"
            alt=""
          />
        </swiper-item>
      </swiper>
    </view>

    <!-- nav -->

    <view class="navs" style="padding: 16px 13px 6px">
      <view class="item" v-for="item in navs.slice(0, 5)" :key="item.label">
        <view
          :style="{
            background: item.bgc,
          }"
          class="icon-wrapper"
        >
          <img :src="item.icon" class="icon" :alt="item.label" />
        </view>
        <view class="name">{{ item.label }}</view>
      </view>
    </view>

    <view class="navs">
      <view class="item" v-for="item in navs.slice(5)" :key="item.label">
        <view
          :style="{
            background: item.bgc,
          }"
          class="icon-wrapper"
        >
          <img :src="item.icon" class="icon" :alt="item.label" />
        </view>
        <view class="name">{{ item.label }}</view>
      </view>
    </view>

    <!-- main -->
    <view class="main">
      <!-- <view class="more-wrapper">
        <img
          @click="handleShowMore"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/x9xze79iv60dy6rt1eb6.png"
          class="more"
          alt=""
        />
      </view> -->

      <view class="navs2" ref="navs2Ref">
        <view
          class="item"
          :class="{ active: item.value === currentTab }"
          v-for="item in navs2"
          :key="item.label"
          @click="switchTab(item.value)"
          >{{ item.label }}</view
        >

        <view class="modal" ref="modalRef">
          <view
            class="item"
            :class="{ active: item.value === currentTab }"
            v-for="item in navs2"
            :key="item.label"
            @click="switchTab(item.value)"
            >{{ item.label }}</view
          >
        </view>
      </view>

      <Pane title="供求信息">
        <img
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/t5vvz7sdgpruaq7actgm.png"
          style="width: 100%"
          alt=""
        />

        <!-- <Tables></Tables> -->
      </Pane>

      <Pane title="价格指数">
        <img
          style="width: 100%"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/wilav6bgzf3pq8aggn3a.png"
          alt=""
        />
        <img
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/7094z8pue08ld6ndubcx.png"
          style="width: 100%"
          alt=""
        />
        <Carousel
          height="74"
          :list="[
            'https://img1.baidu.com/it/u=1412719983,2107220829&fm=253&fmt=auto&app=138&f=JPEG?w=1180&h=492',
            'https://img0.baidu.com/it/u=1849283036,1575466364&fm=253&fmt=auto&app=138&f=JPEG?w=840&h=350',
            'https://img0.baidu.com/it/u=3042247612,2856662613&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=427',
          ]"
        ></Carousel>
      </Pane>

      <Pane
        title="行业信息"
        v-if="informationList.length"
        route="/stuff/industry/infomation-list"
      >
        <IndustryInformation
          v-for="item in informationList"
          :key="item.id"
          :title="item.title"
          :img="item.imgUrl"
          :id="item.id"
          :time="item.updateTime"
        ></IndustryInformation>
      </Pane>

      <Pane title="店铺推荐">
        <view class="wrapper">
          <StuffStore></StuffStore>
          <StuffStore></StuffStore>
          <StuffStore></StuffStore>
          <StuffStore></StuffStore>
        </view>
      </Pane>
    </view>
  </view>
</template>

<script>
import { navs, navs2 } from "./config";
import Pane from "./components/pane.vue";
import Table from "./components/table.vue";
import IndustryInformation from "./components/industry-information-pane.vue";
import StuffStore from "./components/stuff-store.vue";
import Carousel from "../../components/carousel";
import { checkWhoami } from "../../utils";
import {
  getIndustryInformationListApi,
  getSupplyListApi,
} from "../../api/stuff";
import Tables from "../../stuff/components/table";

export default {
  components: {
    Pane,
    Table,
    IndustryInformation,
    StuffStore,
    Carousel,
    Tables,
  },
  data() {
    return {
      navs,
      navs2,
      currentTab: 0,
      currentForOfferTab: 0,
      showMoreVisible: false,
      informationList: [],
      supplyList: [],
    };
  },

  methods: {
    switchTab(index) {
      this.currentTab = index;
      if (this.showMoreVisible) {
        this.handleShowMore();
      }

      // const currentNavs = this.$refs.navs2Ref.$el.querySelector(".item.active");
      // const local = currentNavs.getBoundingClientRect();
    },

    // 点击显示更多
    handleShowMore() {
      this.showMoreVisible = !this.showMoreVisible;
      const navs2Local = this.$refs.navs2Ref.$el.getBoundingClientRect();
      this.$refs.modalRef.$el.style.top =
        navs2Local.top + navs2Local.height + 5 + "px";

      if (this.showMoreVisible) {
        this.$refs.modalRef.$el.style.transform = "scaleY(1)";
        document.body.style.overflow = "hidden";
      } else {
        this.$refs.modalRef.$el.style.transform = "scaleY(0)";
        document.body.style.overflow = "auto";
      }
    },

    // 获取行业信息
    async getIndustryInformationList() {
      const res = await getIndustryInformationListApi({
        page: 1,
        limit: 5,
      });

      if (res.errno === 0) {
        this.informationList = res.data.items;
      } else {
        this.informationList = [];
      }

      console.log(res);
    },

    // 供应列表
    async getSupplyList() {
      const res = await getSupplyListApi();
      if (res.errno === 0) {
        this.supplyList = res.data;
        console.log(this.supplyList);
      } else {
        uni.showToast({
          title: "供应列表失败",
          duration: 2000,
        });
      }
    },
  },

  mounted() {
    this.$refs.modalRef.$el.style.width = document.body.clientWidth + "px";
    // checkWhoami();
    this.getIndustryInformationList();
    this.getSupplyList();
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.p-container {
  border-bottom: 1upx solid #ccc;

  &:last-child {
    border-bottom: none;
  }
}

.stuff-container {
  position: relative;
  background-color: #efefef;
  padding-bottom: 140upx;

  // 表格
  .table {
    border: 1upx solid #999999;
    border-radius: 10upx;
    padding: 10upx;
    box-sizing: border-box;

    .header {
      th {
        font-size: @f12;
        color: @c9;
        border-bottom: 1upx solid;
      }
    }
  }

  // 搜索
  .search-bar {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 95%;
    height: 72upx;
    top: 54upx;
    left: 50%;
    padding: 16upx 24upx;
    transform: translateX(-50%);
    background-color: #fff;
    color: #000000;
    font-size: 24upx;
    border-radius: 50upx;
    z-index: 200;

    .local-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .locale {
        padding: 0 10upx;
        border-right: 1px solid #ccc;
      }
    }

    .location {
      width: 40upx;
    }

    input {
      flex: 1;
      padding: 0 30upx;
    }
  }
  // 轮播
  .banner {
    width: 100%;
    height: 552upx;
    border-radius: 0 0 20upx 20upx;
    overflow: hidden;

    .swiper {
      width: 100%;
      height: 552upx;

      /deep/ .uni-swiper-dot-active {
        border-radius: 0;
        width: 40upx !important;
      }

      /deep/ .uni-swiper-dot {
        border-radius: 0px;
        height: 4upx;
        width: 4upx;
        margin-right: 6upx;
      }

      img {
        width: 100%;
        height: 552upx;
      }
    }
  }

  .navs {
    position: relative;
    padding: 12upx 26upx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: @cw;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;

      .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80upx;
        height: 80upx;
        border-radius: 10px;

        .icon {
          width: 40upx;
        }
      }

      .name {
        font-size: @f12;
        color: @c3d;
        margin: 20upx auto 10px auto;
      }
    }
  }

  .main {
    position: relative;
    width: 100%;
    margin-top: 14upx;
    padding: 20upx 26upx;
    box-sizing: border-box;
    background-color: @cw;

    .more-wrapper {
      width: 40upx;
      position: absolute;
      right: 0;
      top: 28upx;
      padding-right: 10px;
      background-color: #fff;
      // top: 10px;
      box-shadow: -6px 0 0 rgba(255, 255, 255, 0.64);
      z-index: 1000;

      .more {
        width: 40upx;
      }
    }

    .navs2 {
      position: relative;
      display: flex;
      align-items: center;
      overflow-x: scroll;

      .modal {
        position: fixed;
        width: 375px;
        left: 0;
        background-color: rgb(255, 255, 255);
        transform: scaleY(0);
        transform-origin: top center;
        transition: all 200ms;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 20upx;
        box-sizing: border-box;
        z-index: 300;

        .item {
          border: none;
          width: 24%;

          .active {
          }
        }
      }

      &::-webkit-scrollbar {
        display: none;
      }

      .item {
        font-size: @f12;
        color: @c3d;
        margin-right: 60upx;
        white-space: nowrap;
        padding: 10upx 0;
        border-bottom: 4upx solid transparent;
        transition: all 350ms;

        &.active {
          color: #3662ec;
          border-bottom-color: #3662ec;
        }
      }
    }
  }

  .wrapper {
    .flex();
    flex-wrap: wrap;
  }
}
</style>