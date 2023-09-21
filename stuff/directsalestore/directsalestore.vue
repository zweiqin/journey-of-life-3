<template>
  <view class="directsalestore">
    <suspenButton
      @top="shopCar"
      @left="backHome"
      @bottom="service"
    ></suspenButton>
    <view class="info">
      <img
        class="bgm"
        :src="
          picUrl ||
          'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/s2ghz5p3xzct9ksc4kfy.jpg'
        "
        alt=""
      />

      <img
        class="back"
        @click="handleBack"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/bpxhsjmf5zhejt921o75.png"
        alt=""
      />

      <view class="store-info">
        <img
          class="avatar"
          :src="
            picUrl ||
            'https://img2.baidu.com/it/u=3949966856,2992083594&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
          "
          alt=""
        />

        <view class="wrapper">
          <view class="name">{{ name || "暂无简介" }}</view>
          <view class="rate">
            综合体验分<Rate :rate="4"></Rate>粉丝数102.5万
          </view>
          <view class="tags">
            <view class="tag">官方直营</view>
            <view class="tag">品质保障</view>
            <view class="order">订阅</view>
          </view>
        </view>
      </view>
    </view>

    <view class="main">
      <view class="about-me">
        <view class="title">官方直营</view>
        <view class="my-info">
          {{ desc || "暂无简介" }}

          <view class="address">
            <view>地址：{{ address || "暂无地址" }}</view>
            <view class="mobile">电话：{{ phone || "暂无电话" }} </view>
            <view class="bot">
              <view class="map">
                <view class="text">地图</view>
                <image
                  src="../../static/images/stuff/global-fill.png"
                  mode="scaleToFill"
                  class="icon"
                />
              </view>
              <view class="ask">
                <view class="text">在线咨询</view>
                <image
                  src="../../static/images/stuff/message-3-fill.png"
                  mode="scaleToFill"
                  class="icon"
                />
              </view>
              <view class="ops">
                <view>
                  到这里去
                  <img
                    class="icon"
                    src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
                    alt=""
                  />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <Carousel
        :height="311"
        :list="[
          'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/2rbz9wpljd6mj4u9p7td.png',
          'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/zspzmfjzb1fj05nckjva.png',
          'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/f1g2lacmqqrbypqf0ak0.png',
        ]"
      ></Carousel>

      <view class="navs1" ref="navsRef">
        <view
          class="sub"
          :class="{ active: sub.value == current }"
          v-for="sub in navs1"
          :key="sub.value"
          @click="clickTab(sub.value)"
          >{{ sub.label }}
        </view>
      </view>

      <view class="navs2" ref="navs2Ref" v-if="current == 1">
        <view
          class="item"
          :class="{ active: item.id == currentTab }"
          v-for="item in catalogList"
          :key="item.id"
          @click="switchTab(item.id)"
          >{{ item.name }}</view
        >
      </view>

      <!-- <view class="split-title-wrapper" v-if="currentTab == 0">
        <view class="split-title">热销产品</view>
      </view> -->

      <view class="goods-wrapper" v-if="current == 1">
        <Goods
          v-for="item in goodsList"
          :key="item.id"
          :id="item.id"
          :name="item.name"
          :sname="item.brief"
          :price="item.counterPrice"
          :url="item.picUrl"
        ></Goods>
      </view>

      <view
        class="white"
        v-if="current !== 1"
        style="
          display: flex;
          justify-content: center;
          padding-top: 20upx;
          color: #888;
        "
        >此服务尚未开通,敬请期待</view
      >
    </view>
  </view>
</template>

<script>
import Rate from "../../components/rate";
import { navs2 } from "../../pages/stuff/config";
import { navs1 } from "../../pages/stuff/config";
import Carousel from "../../components/carousel";
import Goods from "../../components/goods";
import {
  getBrandDetailApi,
  getBrandListBySelectApi,
  getCatalogIdByBrandApi,
} from "../../api/brand";
import { goodsListApi } from "../../api/goods";
import suspenButton from "../../components/px-suspen-button";

export default {
  components: {
    Rate,
    Carousel,
    Goods,
    suspenButton,
  },

  data() {
    return {
      currentTab: 0,
      current: 1,
      navs2,
      navs1,
      id: "",
      brandDetail: [],
      name: "",
      desc: "",
      phone: "",
      picUrl: "",
      shareUrl: "",
      address: "",
      picUrl: "",
      idcardConsUrl: "",
      brandId: "",
      goodsList: [],
      catalogList: [],
      categoryId: "",
    };
  },
  props: {
    // name: String,
    url: String,
    // desc: String,
  },

  methods: {
    switchTab(tab) {
      this.currentTab = tab;
      console.log(this.currentTab);
      this.categoryId = tab;
      if (this.currentTab == 0) {
        this.getBrandListBySelect();
      } else {
        this.getGoodsList();
      }
    },
    clickTab(index) {
      this.current = index;
      console.log(this.current);
    },
    async getGoodsList() {
      const res = await goodsListApi({
        categoryId: this.categoryId,
        brandId: this.brandId,
      });
      console.log(res);
      this.goodsList = res.data.goodsList;
    },
    shopCar() {
      console.log("购物车");
      uni.navigateTo({
        url: "../../user/sever/shop-car",
      });
    },
    backHome() {
      console.log("回到首页");
      uni.navigateTo({ url: "/pages/stuff/stuff" });
    },

    service() {
      const phone = this.phone;
      console.log("传入的电话", phone);
      const res = uni.getSystemInfoSync();
      // ios系统默认有个模态框
      if (res.platform == "ios") {
        uni.makePhoneCall({
          phoneNumber: phone,

          success() {
            console.log("拨打成功了");
          },
          fail() {
            console.log("拨打失败了");
          },
        });
      } else {
        //安卓手机手动设置一个showActionSheet
        uni.showActionSheet({
          itemList: [phone, "呼叫"],
          success: function (res) {
            console.log(res);
            if (res.tapIndex == 1) {
              uni.makePhoneCall({
                phoneNumber: phone,
              });
            }
          },
        });
      }

      // let text = "要复制的文本内容";

      // uni.setClipboardData({
      //   data: text,
      //   success: function (res) {
      //     console.log("复制的信息：", text);
      //     uni.showToast({
      //       title: "复制成功",
      //     });
      //   },
      // });
    },
    handleBack() {
      uni.navigateBack();
    },
    //门店详情接口
    async getBrandDetail() {
      const res = await getBrandDetailApi({
        id: this.brandId,
      });
      this.brandDetail = res.data.brand;
      console.log("brandDetail", this.brandDetail);
      this.id = this.id;
      this.desc = this.brandDetail.desc;
      this.name = this.brandDetail.name;
      this.address = this.brandDetail.address;
      this.phone = this.brandDetail.phone;
      this.picUrl = this.brandDetail.picUrl;
      this.idcardConsUrl = this.brandDetail.idcardConsUrl;
    },
    //品牌和前十商品列表
    async getBrandListBySelect() {
      const res = await getBrandListBySelectApi({
        id: this.brandId,
        name: "",
        page: "",
        limit: "",
        sort: "",
        order: "",
      });
      console.log(res);
      this.goodsList = res.data.brandList[0].goodsList;
    },
    async getCatalogIdByBrand() {
      const res = await getCatalogIdByBrandApi({
        brandId: this.brandId,
      });
      this.catalogList = res.data.catalogList;
      console.log(this.catalogList);
      const a = this.catalogList.unshift({ id: 0, name: "全部" });
    },

    //商品分类接口
  },
  //进入该界面就运行一次（仅一次）
  onLoad: function (option) {
    // 使用该方法
    // this.brandId为自己定义的变量
    this.brandId = option.id;
    console.log(this.brandId);
    this.getBrandDetail();
    this.getBrandListBySelect();
    this.getCatalogIdByBrand();
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.directsalestore {
  .info {
    position: relative;
    width: 100%;
    height: 376upx;
    padding: 74upx 20upx 20upx 20upx;
    box-sizing: border-box;

    .bgm {
      position: absolute;
      width: 100%;
      height: 376upx;
      top: 0;
      left: 0;
      object-fit: cover;
      z-index: -1;
    }

    .back {
      width: 48upx;
    }

    .store-info {
      .flex();
      margin-top: 60upx;

      .avatar {
        .img(100upx, 50%);
        margin-right: 32upx;
      }

      .wrapper {
        flex: 1;
        color: @cw;
        .name {
          font-size: @f14;
          font-weight: bold;
        }

        .rate {
          display: flex;
          align-items: center;
          font-size: 12px;
          margin: 10px 0;
        }
      }

      .tags {
        display: flex;
        align-items: center;

        .tag {
          font-size: 10px;
          padding: 4upx 20upx;
          background: linear-gradient(
            90deg,
            #ff0000 0%,
            rgba(255, 140, 0, 0) 100%
          );
          border-radius: @r5;
        }

        .order {
          background: #fff;
          color: #3662ec;
          padding: 4upx 16upx;
          font-size: 10px;
          border-radius: 10px;
          margin-left: 30px;
        }
      }
    }
  }

  .main {
    padding: 30upx;
    box-sizing: border-box;

    .about-me {
      font-size: @f12;
      color: @c3d;
      margin-bottom: 10px;

      .title {
        margin-bottom: 20upx;
        font-size: 24upx;
        color: #3d3d3d;
      }

      .my-info {
        padding: 16upx 24upx;
        box-sizing: border-box;
        border: 1upx solid @c9;
        border-radius: 10upx;
        line-height: 1.5;

        .address {
          margin-top: 20upx;
          padding-top: 10upx;
          border-top: 1upx solid #d8d8d8;
        }

        .mobile {
          padding-top: 8upx;
          .flex();
        }
        .bot {
          padding-top: 12upx;
          display: flex;
          .map {
            display: flex;
            align-items: center;
            margin-right: 30upx;
            .text {
              font-size: 20upx;
              font-weight: 350;
              color: #3662ec;
            }
            .icon {
              width: 40upx;
              height: 40upx;
              margin-left: 12upx;
              margin-right: 20upx;
            }
          }
          .ask {
            display: flex;
            align-items: center;
            margin-right: 30upx;
            .text {
              font-size: 20upx;
              font-weight: 350;
              color: #3662ec;
            }
            .icon {
              width: 32upx;
              height: 32upx;
              margin-left: 12upx;
              margin-right: 20upx;
            }
          }
          .ops {
            font-size: 20upx;
            font-weight: 350;
            color: #3662ec;

            .flex();
            .icon {
              width: 28upx;
              vertical-align: -2px;
              margin-left: 12upx;

              &:first-child {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }

    .split-title-wrapper {
      position: relative;
      width: 50%;
      height: 1px;
      border-bottom: 1upx solid #000;
      margin: 60upx auto 28upx;

      .split-title {
        position: absolute;
        top: -16upx;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        color: @c3d;
        background-color: #fff;
        font-weight: bold;
        padding: 0 30upx;
      }
    }

    .goods-wrapper {
      .flex();
      flex-wrap: wrap;
      margin-top: 24upx;
    }
  }

  .navs1 {
    padding-top: 36upx;
    border-bottom: 0.5px solid #d8d8d8;
    height: 64upx;
    display: flex;
    .sub {
      font-size: 32upx;
      font-weight: 500;
      padding-right: 46upx;
      &.active {
        color: #3662ec;
      }
    }
  }

  .navs2 {
    padding-top: 6upx;
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
      font-size: 28upx;
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
</style>