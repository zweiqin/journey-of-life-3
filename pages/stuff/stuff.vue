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
    <view style="padding: 10upx">
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
              class="img9"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/frinmcnc1ozzv9pwahig.jpg "
              alt=""
            />
          </swiper-item>
          <swiper-item>
            <img
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/szzgw6dxoibrsxh1cwh0.jpg"
              class="img9"
              alt=""
            />
          </swiper-item>
          <swiper-item>
            <img
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/dp5o8q1l34utxsj8mkba.jpg"
              class="img9"
              alt=""
            />
          </swiper-item>
          <swiper-item>
            <img
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/37nqp8lds95nbn3efi6j.jpg "
              class="img9"
              alt=""
            />
          </swiper-item>
        </swiper>
      </view>
    </view>
    <!-- nav -->
    <view class="navs">
      <view class="item" v-for="item in navs" :key="item.label">
        <view class="icon-wrapper" @click="bindtapStuff(item)">
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
          :key="item.value"
          @click="switchTab(item.value)"
          >{{ item.label }}</view
        >
        <!-- <view class="modal" ref="modalRef">
          <view
            class="item"
            :class="{ active: item.value === currentTab }"
            v-for="item in navs2"
            :key="item.label"
            @click="switchTab(item.value)"
            >{{ item.label }}</view
          >
        </view> -->
      </view>

      <view class="tradeLeads">
        <view class="topchose" style="margin-bottom: 10px">
          <view
            @click="changeTab(0)"
            :class="{ active: currentTab1 === 0 }"
            class="item"
            >我的采购</view
          >
          <view
            @click="changeTab(1)"
            :class="{ active: currentTab1 === 1 }"
            class="item"
            >我的供应</view
          >
        </view>
        <view class="border" v-if="currentTab1 == 0" @click="gongqiu(0)">
          <view class="top">
            <view class="text">日期</view>
            <view class="text1">类别</view>
            <view class="text2">地区</view>
            <view class="text3">颜色</view>
            <view class="text4">数量</view>
            <view class="text5">联系方式</view>
          </view>
          <view class="text-border"></view>
          <view v-for="(item1, id1) in PcToday" :key="id1">
            <view class="detail">
              <view class="time">{{ item1.addTime | formatTime }}</view>
              <view class="name">{{ item1.materialsCategory }}</view>
              <view class="address">{{ item1.materialsRegion }}</view>
              <view class="color">{{ item1.materialsColor }}</view>
              <view class="number">{{ item1.materialsNumber }}</view>
              <view class="phone">{{
                item1.materialsPhone | replacestar
              }}</view>
            </view>
            <view class="text-border"></view>
          </view>
        </view>
        <!-- 供应 -->
        <view class="border" v-if="currentTab1 == 1" @click="gongqiu(1)">
          <view class="top">
            <view class="text">类别</view>
            <view class="text1">地区</view>
            <view class="text2">材质</view>
            <view class="text3">销量</view>
            <view class="text4">参考价</view>
            <view class="text5">联系方式</view>
          </view>
          <view class="text-border"></view>

          <view v-for="(item, id) in supplyList" :key="id">
            <view class="detail">
              <view class="time1">{{ item.materialsCategory }}</view>
              <view class="name">{{ item.materialsRegion }}</view>
              <view class="address">{{ item.materialsTexture }}</view>
              <view class="color1">{{ item.sales }}</view>
              <view class="number">￥{{ item.referenceMoney }}</view>
              <view class="phone">{{ item.materialsPhone | replacestar }}</view>
            </view>
            <view class="text-border"></view>
          </view>
        </view>
      </view>
      <view class="list-type"> </view>
      <Pane title="价格指数">
        <img
          style="width: 100%"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gxawxw339ne2sb1isdw8.png "
          alt=""
        />
        <view class="Prices">
          <view class="border">
            <view class="list-title">
              <view class="name">类别</view>
              <view class="sname">品名</view>
              <view class="sku">规格</view>
              <view class="stuff">材质</view>
              <view class="quality">品质</view>
              <view class="money">价格</view>
              <view class="unit">单位</view>
            </view>
            <view class="text-border"></view>
            <view v-for="(item2, id2) in PricesList" :key="id2">
              <view class="list-detail">
                <view class="nametext">{{ item2.materialsCategory }}</view>
                <view class="snametext">{{ item2.materialsName }}</view>
                <view class="skutext">{{ item2.materialsSku }}</view>
                <view class="stufftext">{{ item2.materialsTexture }}</view>
                <view class="qualitytext">{{ item2.materialsQuality }}</view>
                <view class="moneytext">{{ item2.materialsMoney }}</view>
                <view class="unittext">{{ item2.materialsUnit }}</view>
              </view>
              <view class="text-border"></view>
            </view>
          </view>
        </view>
        <Carousel
          :height="240"
          :indicationPoint="false"
          :list="[
            'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/jg96690py71mw8mdbodb.jpg',
            'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/raxb244t6ncjb99cozm8.jpg ',
            'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/aujfb3gezbdn541j4efw.jpg ',
            'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/r02d64jabo6awjob1kz0.png ',
          ]"
        ></Carousel>
      </Pane>

      <Pane title="店铺推荐">
        <view class="wrapper">
          <StuffStore
            v-for="item in brandList"
            :key="item.id"
            :name="item.name"
            :picUrl="item.picUrl"
            :desc="item.desc"
            :id="item.id"
          ></StuffStore>
        </view>
      </Pane>

      <Pane
        title="行业信息"
        v-if="informationList.length"
        v-show="currentTab == 0"
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
    </view>
  </view>
</template>

<script>
import { navs, navs2 } from "./config";
import Pane from "./components/pane.vue";
import Table from "./components/table.vue";
import IndustryInformation from "./components/industry-information-pane.vue";
import StuffStore from "./components/stuff-store.vue";
import { goodsListApi } from "../../api/goods";
import Carousel from "../../components/carousel";
import { checkWhoami } from "../../utils";
import {
  getIndustryInformationListApi,
  getSupplyListApi,
  getPcTodayListApi,
  getPricesListApi,
} from "../../api/stuff";
import { getBrandTypeApi } from "../../api/brand";
import Tables from "../../stuff/components/table";
import { getBrandListApi } from "../../api/brand";
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
      navs2: [],
      currentTab: 0,
      currentTab1: 0,
      currentForOfferTab: 0,
      showMoreVisible: false,
      informationList: [],
      supplyList: [],
      brandList: [],
      PcToday: [],
      PricesList: [],
      brandgenreId: "",
      page: 1,
    };
  },
  filters: {
    formatTime(time) {
      const a = time.split(" ")[0].split("-");
      return a[1] + "-" + a[2];
    },
  },
  methods: {
    async stuffGoodsList() {
      const res = await goodsListApi({
        goodsType: 2,
      });
      console.log(res);
      this.navs2 = res.data.filterCategoryList;
      this.navs2.unshift({ label: "综合", value: 0 });
    },
    gongqiu() {
      uni.navigateTo({
        url: "../../stuff/gongqiu/gongqiu",
      });
    },
    bindtapStuff(item) {
      console.log(item.Url);

      uni.navigateTo({
        url: item.Url,
      });
    },
    changeTab(tab) {
      this.currentTab1 = tab;
      if (this.currentTab1 == 0) {
        this.getPcTodayList();
      } else if (this.currentTab1 == 1) {
        this.getSupplyList();
      }
      console.log(this.currentTab1);
    },
    switchTab(index) {
      this.currentTab = index;
      this.brandgenreId = index;
      // console.log(this.brandgenreId);
      if (this.brandgenreId == 0) {
      } else {
        uni.navigateTo({
          // url: `../../stuff/stuffGoods/index?id=${index}`,
          url:"../../pages/payAccomplish/index"
        });
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
    // 门店分类
    async getBrandType() {
      const res = await getBrandTypeApi({
        storeName: "",
      });
      console.log("门店分类", res.data.items);
      this.navs2 = res.data.items;
      this.navs2.unshift({ storeName: "综合", id: 0 });
      const a = this.navs2.findIndex((item) => {
        return item.storeName == "品牌工厂";
      });
      // console.log(a);
      const b = this.navs2.splice(a, 1);
      // console.log(this.navs2);
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
    // 价格列表
    async getPricesList() {
      const res = await getPricesListApi();
      if (res.errno === 0) {
      } else {
        uni.showToast({
          title: "价格列表失败",
          duration: 2000,
        });
      }
      console.log("价格列表", res.data.items);
      this.PricesList = res.data.items;
      this.PricesList = this.PricesList.slice(0, 6);
      this.PricesList.sort(function (x, y) {
        return x.materialsCategory.length > y.materialsCategory.length ? 1 : -1;
      });
    },
    // 供应列表
    async getSupplyList() {
      const res = await getSupplyListApi();
      if (res.errno === 0) {
      } else {
        uni.showToast({
          title: "供应列表失败",
          duration: 2000,
        });
      }
      this.supplyList = res.data.items;
      this.supplyList = this.supplyList.slice(0, 8);
      console.log("供应列表", this.supplyList);
    },
    // 采购列表
    async getPcTodayList() {
      const res = await getPcTodayListApi();
      if (res.errno === 0) {
      } else {
        uni.showToast({
          title: "采购列表失败",
          duration: 2000,
        });
      }

      console.log("采购列表", res.data);
      this.PcToday = res.data.items;
      this.PcToday = this.PcToday.slice(0, 8);
    },
    //店铺列表
    async getBrandList() {
      const res = await getBrandListApi({
        brandgenreId: "",
        page: this.page,
        size: 100,
      });
      // 佛山市奥丽思家具五金配件有限公司;
      // 大创家具材料店;
      // 成鑫木业有限公司;
      // 里翎皮革;
      console.log(res);
      this.brandList = res.data.brandList;
      console.log(this.brandList);
      this.brandList = this.brandList.filter(
        (item) =>
          item.name == "佛山市奥丽思家具五金配件有限公司" ||
          item.name == "大创家具材料店" ||
          item.name == "成鑫木业有限公司" ||
          item.name == "里翎皮革"
      );
    },
    //点击后触发
    async touchBrandList() {
      const res = await getBrandListApi({
        brandgenreId: this.brandgenreId,
        page: this.page,
      });
      console.log(res);
      this.brandList = res.data.brandList;
    },
  },
  created() {},
  onLoad() {
    this.getBrandList();
  },

  mounted() {
    // this.$refs.modalRef.$el.style.width = document.body.clientWidth + "px";
    // checkWhoami();
    this.getIndustryInformationList();
    this.getSupplyList();
    this.getPcTodayList();
    this.getPricesList();
    this.getBrandType();
    this.stuffGoodsList();
  },
};
</script>




<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";
.text-border {
  border: 0.5px solid #d8d8d8;
  width: 97%;
  margin: 0 auto;
}
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
  padding-top: 90upx;

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
    top: 14upx;
    left: 50%;
    padding: 16upx 24upx;
    transform: translateX(-50%);
    background-color: white;
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
    border-radius: 20upx;
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
    padding: 32upx 0upx;
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
      width: 20%;
      box-sizing: border-box;

      .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80upx;
        height: 80upx;
        border-radius: 10px;

        .icon {
          width: 80upx;
        }
      }

      .name {
        font-size: 28upx;
        color: @c3d;
        margin: 20upx auto 30upx auto;
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
    .tradeLeads {
      padding-top: 20upx;
      .topchose {
        display: flex;
        padding-left: 14upx;
        border-left: 4upx solid #fa5151;
        .item {
          padding-right: 24upx;
          color: #3d3d3d;
          font-weight: bold;
          font-size: 28upx;

          &.active {
            font-weight: bold;
            color: #3662ec;
            font-size: 28upx;
          }
        }
      }
      .border {
        border-radius: 5px;
        background: #ffffff;
        border: 0.5px solid #999999;
        padding: 10upx 0 20upx 0;
        .top {
          display: flex;
          font-size: 20upx;
          font-weight: 400;
          padding: 5upx 10upx;
          .text {
            width: 15%;
            color: #999999;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .text1 {
            width: 15%;
            color: #999999;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .text2 {
            width: 15%;
            color: #999999;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .text3 {
            width: 15%;
            color: #999999;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .text4 {
            width: 15%;
            color: #999999;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .text5 {
            width: 25%;
            color: #999999;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .detail {
          display: flex;
          font-size: 20upx;
          font-weight: 400;
          padding: 5upx 10upx;
          .time {
            color: #fa5151;
            width: 15%;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .time1 {
            width: 15%;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .name {
            width: 15%;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .address {
            width: 15%;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .color {
            width: 15%;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .color1 {
            color: #00b578;
            width: 15%;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .number {
            color: #fa5151;
            width: 15%;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .phone {
            color: #3662ec;
            width: 25%;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
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

    .list {
      display: flex;

      font-size: 20upx;
      .title {
        padding-right: 30upx;
      }
    }
    .list-type {
    }
  }

  .wrapper {
    .flex();
    flex-wrap: wrap;
  }
}
.Prices {
  .border {
    border-radius: 5px;
    background: #ffffff;
    border: 0.5px solid #999999;
    padding: 10upx 0 20upx 0;
    .list-title {
      display: flex;
      font-size: 20upx;
      color: #999999;
      font-weight: 350;
      padding-bottom: 10upx;
      .name {
        text-align: center;
        width: 14%;
      }
      .sname {
        text-align: center;
        width: 14%;
      }
      .sku {
        text-align: center;
        width: 14%;
      }
      .stuff {
        text-align: center;
        width: 14%;
      }
      .quality {
        text-align: center;
        width: 14%;
      }
      .money {
        text-align: center;
        width: 15%;
      }
      .unit {
        width: 15%;
        text-align: center;
      }
    }
    .list-detail {
      display: flex;
      font-size: 20upx;
      font-weight: 400;
      padding: 10upx 0;
      .nametext {
        width: 14%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .snametext {
        width: 14%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .skutext {
        width: 14%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .stufftext {
        width: 14%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #ff8f1f;
      }
      .qualitytext {
        width: 14%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .moneytext {
        width: 15%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fa5151;
      }
      .unittext {
        width: 15%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>