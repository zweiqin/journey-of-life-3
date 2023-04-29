<template>
  <view class="myBrand">
    <view class="background">
      <view class="title">
        <img
          class="whiteBack"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ld1vgoq9115xcsy2ho6l.png "
          alt=""
          @click="back" />
        <view class="titleText">品牌工厂</view>
        <view class="whiteBack"></view
      ></view>
    </view>
    <view class="brandDetail">
      <view class="detailTop">
        <view class="left">
          <img v-if="picUrl" :src="picUrl" alt="" class="brandLogo" />
          <view class="LogoBackground" v-else>
            <text class="logoText">{{ name.slice(0, 4) || "团蜂家具" }}</text>
          </view>
        </view>
        <view class="right">
          <view class="top">
            <view class="brandName">{{ name || "团蜂家具" }}</view>
            <view class="subscription">订阅</view>
          </view>
          <view class="bottom">
            <view class="bottomLeft">
              <img
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/tk3ayg0sglz44lavgru6.png "
                alt=""
                class="badgeImg"
              />
              <view class="redBrand">品牌工厂</view>
              <view class="blueLable">官方直营</view>
            </view>
          </view>
        </view></view
      >
      <view class="detailBottom">
        <view class="detailFirst">
          <view class="brandDetailName">{{ name || "团蜂家具" }}</view>
          <view class="navigation">
            <img
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ixheodgerarfr9rrr0xj.png "
              alt=""
              class="navigationImg"
            />
            <view class="navigationText">导航</view>
          </view>
        </view>
        <view class="detailSecord">
          <img
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/pzsclu2sjzgt8pgglwpd.png "
            alt=""
            class="gradeImg"
          />
          <view class="gradeText">5.0</view>
        </view>
        <view class="detailThire">
          <view class="brandDesc" :class="{ brandDescAll: descType }">
            {{ desc || "暂无简介" }}
          </view>
          <view class="open" @click="openDesc" v-if="!descType">展开</view>
          <view class="open" @click="openDesc" v-else-if="descType">收起</view>
        </view>
      </view>
    </view>
    <view class="choseType">
      <view
        @click="touchType(item.value)"
        v-for="item in choseType"
        :key="item.value"
        class="typeText"
        :class="{ choseText: item.value == currentTab }"
      >
        {{ item.label }}
      </view>
    </view>
    <img
      v-if="currentTab == 1"
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4crfis0q3gd9ckh2d44j.png "
      alt=""
      class="showImg"
    />
    <view v-if="currentTab == 1">
      <brandTitle v-for="item in title" :key="item.value" :title="item.label">
        <view v-if="item.value == 1" class="goods1">
          <goods
            v-for="item in hotGooodsList"
            :key="item.id"
            :name="item.name"
            :sname="item.goodsSn"
            :price="item.retailPrice"
            :id="item.id"
            :url="item.picUrl"
          ></goods>
        </view>
        <view class="goods1" v-if="item.value == 2">
          <goods
            v-for="item in newGoodsList"
            :key="item.id"
            :name="item.name"
            :sname="item.goodsSn"
            :price="item.retailPrice"
            :id="item.id"
            :url="item.picUrl"
          ></goods> </view></brandTitle
    ></view>
    <view v-else-if="currentTab == 2">
      <brandGoods
        :allGoodsList="allGoodsList"
        :filterCategoryList="filterCategoryList"
        @getCateGoryId="getCateGoryId($event)"
      ></brandGoods>
    </view>
  </view>
</template>

<script>
import { choseType, title } from "./config";
import brandTitle from "./brandTitle";
import { getBrandDetailApi } from "../../api/brand";
import { goodsListApi } from "../../api/goods";
import goods from "../../components/goods";
import brandGoods from "./brandGoods";
export default {
  components: {
    brandTitle,
    goods,
    brandGoods,
  },
  data() {
    return {
      id: "",
      choseType,
      title,
      descType: false,
      name: "",
      desc: "",
      picUrl: "",
      currentTab: 1,
      page: 1,
      brandParticular: [],
      hotGooodsList: [],
      newGoodsList: [],
      allGoodsList: [],
      filterCategoryList: [],
      categoryId: "",
    };
  },
  methods: {
    async getCateGoryId(item) {
      this.categoryId = item;
      this.page = 1;
      this.getgoodsList();
    },
    async getBrandDetail() {
      const res = await getBrandDetailApi({
        id: this.id,
      });
      if (res.errno == 0) {
        console.log(res);
        this.brandParticular = res.data.brand;
        this.name = res.data.brand.name;
        this.desc = res.data.brand.desc;
        this.picUrl = res.data.brand.picUrl;
      } else {
        uni.showToast({
          title: "获取失败",
          icon: "none",
          mask: true,
        });
      }
    },
    async getgoodsList() {
      const res = await goodsListApi({
        brandId: this.id,
        size: 12,
        categoryId: this.categoryId,
        page: this.page,
      });
      if (res.errno == 0) {
        console.log(res);
        this.hotGooodsList = res.data.goodsList.slice(0, 6);
        this.newGoodsList = res.data.goodsList.slice(6, 12);
        this.allGoodsList = res.data.goodsList;
        this.filterCategoryList = res.data.filterCategoryList;
        this.filterCategoryList.unshift({
          value: 0,
          label: "热销",
        });
      } else {
        uni.showToast({
          title: "获取商品失败",
          icon: "none",
          mask: true,
        });
      }
    },
    async getBottomGoods() {
      const res = await goodsListApi({
        brandId: this.id,
        size: 12,
        categoryId: this.categoryId,
        page: this.page,
      });
      if (res.errno == 0) {
        console.log(this.page);
        if (this.page * 10 <= res.data.count) {
          this.allGoodsList.push(...res.data.goodsList);
        } else {
          uni.showToast({
            title: "商品加载完毕",
            icon: "none",
            mask: true,
          });
        }
      } else {
        uni.showToast({
          title: "获取后续失败",
          icon: "none",
          mask: true,
        });
      }
    },
    touchType(tab) {
      this.currentTab = tab;
    },
    openDesc() {
      this.descType = !this.descType;
    },
    back() {
      uni.navigateBack({});
    },
  },

  onLoad(options) {
    this.id = options.id;
    this.getBrandDetail();
    this.getgoodsList();
  },
  onReachBottom() {
    if (this.currentTab == 1) {
      uni.showModal({
        title: "提示",
        content: "热销商品加载完毕，是否查看更多商品？",
        showCancel: true,
        success: ({ confirm, cancel }) => {
          if (confirm) {
            this.currentTab = 2;
            uni.pageScrollTo({
              scrollTop: 0, //滚动到距离顶部为0
              duration: 500, //滚动时长
            });
          }
        },
      });
    } else if (this.currentTab == 2) {
      this.page = this.page + 1;
      this.getBottomGoods();
    }
  },
};
</script>

<style lang="less" scoped>
.myBrand{
}
.background {
  height: 400upx;
  width: 750upx;
  background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/r51a3a9t43oxhy63q9mi.png");
  background-size: cover;
  .title {
    padding-top: 20upx;
    display: flex;
    justify-content: space-between;
    .whiteBack {
      width: 48upx;
      height: 48upx;
    }
    .titleText {
      color: white;
      font-size: 36upx;
      font-weight: 600;
    }
  }
}
.brandDetail {
  background: white;
  padding: 20upx 20upx;
  position: relative;
  border-radius: 20upx 20upx 0 0;
  top: -20upx;
  .detailTop {
    display: flex;
    .left {
      width: 160upx;
      height: 160upx;
      position: relative;
      top: -40upx;
      padding-right: 20upx;
      .brandLogo {
        width: 160upx;
        border-radius: 20upx;
        height: 160upx;
      }
      .LogoBackground {
        background-color: #e95d20;
        width: 160upx;
        height: 160upx;
        border-radius: 20upx;
        .logoText {
          color: white;

          width: 160upx;
          font-size: 36upx;
          font-weight: 600;
          line-height: 160upx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          justify-content: center;
        }
      }
    }
    .right {
      flex: 1;
      .top {
        display: flex;
        justify-content: space-between;
        .brandName {
          font-size: 36upx;
          font-weight: 600;
        }
        .subscription {
          color: white;
          background-color: #e95d20;
          border-radius: 4upx;
          padding: 5upx 15upx;
          margin-top: 20upx;
        }
      }

      .bottom {
        display: flex;
        color: white;
        font-size: 28upx;
        font-weight: 700;
        .bottomLeft {
          display: flex;
          .badgeImg {
            width: 48upx;
            height: 48upx;
          }
          .redBrand {
            padding: 5upx 15upx;
            margin: 0 15upx;
            font-size: 26upx;
            border-radius: 10upx;
            background: linear-gradient(270deg, #e95d20 0%, #fa5151 100%);
          }
          .blueLable {
            border-radius: 10upx;
            font-size: 26upx;
            padding: 5upx 15upx;
            background: linear-gradient(90deg, #3588e2 0%, #3662ec 98%);
          }
        }
      }
    }
  }
  .detailBottom {
    .detailFirst {
      display: flex;
      justify-content: space-between;
      .brandDetailName {
        font-size: 28upx;
        padding-left: 5upx;
      }
      .navigation {
        display: flex;
        align-items: center;
        .navigationImg {
          width: 36upx;
          height: 36upx;
        }
        .navigationText {
          font-size: 28upx;
        }
      }
    }
    .detailSecord {
      display: flex;
      align-items: center;
      .gradeImg {
        width: 145upx;
        height: 30upx;
      }
      .gradeText {
        font-size: 28upx;
        color: #fa5151;
      }
    }
    .detailThire {
      background: linear-gradient(89deg, #ffe5cc 0%, #ffffff 101%);
      width: 100%;
      border-radius: 10upx;
      padding: 20upx 0;
      .brandDesc {
        font-size: 28upx;
        color: #777777;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding: 0 20upx;
        &.brandDescAll {
          font-size: 28upx;
          color: #777777;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 99;
          -webkit-box-orient: vertical;
        }
      }
      .open {
        font-size: 28upx;
        color: #3588e2;
        text-align: right;
      }
    }
  }
}
.choseType {
  display: flex;
  margin: 20upx 0;
  padding: 0 20upx;
  .typeText {
    font-size: 32upx;
    color: #3d3d3d;
    margin-right: 46upx;
    &.choseText {
      margin-right: 46upx;
      border-bottom: 2upx solid #e95d20;
    }
  }
}
.showImg {
  width: 710upx;
  height: 240upx;
  padding: 0 20upx;
}
.goods1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>