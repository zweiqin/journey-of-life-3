<template>
  <view class="goods-detail-container" v-if="goodsDetail">
    <tui-toast ref="toast"></tui-toast>
    <!-- 轮播图 -->
    <view class="carousel-wrapper">
      <Carousel
        :list="
          goodsDetail.info.gallery.length
            ? goodsDetail.info.gallery
            : [goodsDetail.info.picUrl]
        "
        :height="390"
        :top="0"
        :radius="0"
      ></Carousel>

      <view class="header-top" :style="{ opacity: !showTopNav ? 1 : 0 }">
        <view>
          <image
            @click="handleBack"
            src="../../static/images/detail/back.png"
            mode=""
          />
        </view>

        <view style="display: flex">
          <image
            style="margin-right: 20upx"
            @click="empty()"
            src="../../static/images/detail/brand.png"
            mode=""
          />

          <TuanWxShare ref="tuanWxShareRef" @click="handleShareGoods">
            <!-- <image
              @click=""
              src="../../static/images/detail/share.png"
              mode=""
            /> -->
            <image src="../../static/images/detail/share.png" mode="" />
          </TuanWxShare>
        </view>
      </view>

      <view
        class="scroll-top-nav"
        :style="{
          opacity: showTopNav && isShowTop ? 1 : 0,
          'z-index': showTopNav ? 100 : -1,
        }"
      >
        <!-- #ifdef H5 -->
        <image
          @click="handleBack"
          src="../../static/images/detail/top-back.png"
          mode=""
        />
        <!-- #endif -->

        <view class="center">
          <view
            class="item"
            :class="{ active: currentMoveTag == 0 }"
            @click="moveToDetail(0)"
            >商品</view
          >

          <view
            :class="{
              active: currentMoveTag == 1,
            }"
            class="item"
            @click="moveToDetail(1)"
          >
            评价
          </view>
          <view
            class="item"
            :class="{
              active: currentMoveTag == 2,
            }"
            @click="moveToDetail(2)"
            v-if="goodsDetail.info.detail"
          >
            详情
          </view>
        </view>
      </view>
    </view>

    <view class="pane goods-info">
      <view class="detail-price">
        ￥
        <text class="price-text"
          ><text :class="{ normalPrice: vipPrice }">{{
            goodsDetail.info.counterPrice
          }}</text>
          <text v-show="vipPrice">{{ vipPrice }}</text>
        </text>

        起

        <text class="watch-vip-price" @click="handleWatchVipPrice"
          >{{ vipPrice ? "隐藏" : "查看" }}会员价</text
        >
      </view>

      <view class="goods-name">{{ goodsDetail.info.name }}</view>

      <view class="salsed">
        <text>月销100+</text>
        <!-- <image
          class="share-tran"
          src="../../static/images/detail/share-tran.png"
          mode=""
        /> -->
      </view>

      <view class="sub-info">
        <view class="item" v-for="(item, index) in subInfoConfig" :key="index">
          <image :src="item.icon" mode="" />
          <text>{{ item.label }}</text>
          <text class="attribute">{{ item.default }}</text>
        </view>
      </view>

      <view class="buy-info">
        <view
          class="item"
          v-for="(item, index) in goodsInfoConfig"
          :key="index"
          @click="handleClickMenu(item)"
        >
          <image :src="item.icon" mode="" />
          <view>
            <view class="label">{{
              selectForm[item.model] || item.label
            }}</view>
            <view class="desc" v-if="item.desc">{{ item.desc }}</view>
          </view>
        </view>
      </view>

      <view class="eval">
        <text>评价(0)</text>
        <image src="../../static/images/detail/right-arrow.png" mode="" />
      </view>

      <!-- 店铺信息 -->
      <view
        class="brand-wrapper"
        v-if="goodsDetail.brand && goodsDetail.brand.name && isShowBrand"
      >
        <view class="top">
          <image
            class="image"
            :src="goodsDetail.brand.picUrl"
            mode=""
            v-if="goodsDetail.brand.picUrl"
          />
          <view v-else class="image image-avatar">{{
            goodsDetail.brand.name
          }}</view>

          <view class="brand-info">
            <view class="brand-name">{{ goodsDetail.brand.name }}</view>
            <view class="brand-desc">{{ goodsDetail.brand.desc }}</view>
            <view class="serve">
              <text>
                宝贝描述
                <text class="apponit">4.5</text>
              </text>
              <text>
                卖家服务
                <text class="apponit">4.8</text>
              </text>
              <text>
                物流服务
                <text class="apponit">4.7</text>
              </text>
            </view>
          </view>
        </view>
        <!-- TODO  -->
        <!-- <view class="bottom">
          <button class="uni-btn">进店逛逛</button>
          <button class="uni-btn">全部商品</button>
        </view> -->
      </view>

      <!-- 店铺推荐 -->
      <!-- <view
        class="brand-recommend"
        v-if="brandOtherGoods && brandOtherGoods.length"
      >
        <view class="sub-title">
          <text>店铺推荐</text>
          <image src="../../static/images/detail/right-arrow.png" mode="" />
        </view>

        <view class="wrapper">
          <view
            class="item"
            v-for="item in brandOtherGoods"
            @click="go('/pages/prod/prod?goodsId=' + item.id)"
            :key="item.id"
          >
            <image :src="item.picUrl" mode="" />

            <view class="recommend-goods-name">{{ item.name }}</view>

            <text class="recommend-goods-price">
              ￥
              <text>{{ item.counterPrice }}</text>
            </text>
          </view>
        </view>
      </view> -->
    </view>

    <!-- 宝贝详情 -->
    <view class="goods-detail" id="goods-detail" v-if="goodsDetail.info.detail"
      ><text>宝贝详情</text></view
    >

    <u-parse
      v-if="goodsDetail.info.detail"
      :content="goodsInfoDetail"
    ></u-parse>

    <!-- 详情 -->

    <!-- 为你推荐 -->
    <view class="recommd-container">
      <view class="goods-detail"><text>更多好物</text></view>
    </view>

    <RecommendGoods :showTitle="false" :id="goodsId"></RecommendGoods>

    <view class="footer">
      <view class="icon-wrapper">
        <view class="item" @click="go('/user/sever/shopCar/shopCar')">
          <image src="../../static/images/detail/shap-active.png" mode="" />
          <text>购物车</text>
          <view class="number" v-if="shopCarNumber">{{ shopCarNumber }}</view>
        </view>

        <!-- <view
          class="item"
          @click="go('/user/sever/customer-service/customer-service')"
        > -->
        <view class="item" @click="handleChat">
          <image src="../../static/images/detail/kefu.png" mode="" />
          <text>客服</text>
        </view>

        <view class="item">
          <image
            @click="handleCollect"
            :src="
              isCollect
                ? '../../static/images/detail/collection-active .png'
                : '../../static/images/detail/collection.png'
            "
            mode=""
          />
          <text>收藏</text>
        </view>
      </view>

      <view class="buttons">
        <button class="uni-btn" @click="addShopCar(selectInfo)">
          加入购物车
        </button>
        <button class="uni-btn" @click="fastBuy(selectInfo)">立即购买</button>
      </view>
    </view>

    <TSpecification
      :btn-text="btnStatus"
      @confirm="handleChooseSp"
      :data="goodsDetail"
      ref="specificationRef"
      :bottom="0"
      v-model="showSpecification"
    ></TSpecification>

    <TuanChatKF ref="tuanChatKFRef"></TuanChatKF>
  </view>
</template>

<script>
import Carousel from "../../components/carousel";
import { subInfoConfig, goodsInfoConfig } from "./config";
import uParse from "../../components/u-parse/u-parse.vue";
import { marked } from "marked";
import { PAY_GOODS, USER_ID, USER_INFO } from "../../constant";
import RecommendGoods from "../../components/recommend-goods";

import {
  getGoodsDetailApi,
  collectionApi,
  // getShopCarApi,
  addShopCarApi,
  getCarShopNumberApi,
  goodsListApi,
  watchVipPriceApi,
} from "../../api/goods";
import { getUserId } from "../../utils";

export default {
  components: {
    Carousel,
    uParse,
    RecommendGoods,
  },
  data() {
    return {
      subInfoConfig,
      goodsInfoConfig,
      goodsDetail: null,
      showSpecification: false,
      shopCarNumber: 0,
      isCollect: false,
      userId: null,
      brandOtherGoods: null,
      showTopNav: false,
      evalPosition: 0,
      detailPosition: 0,
      scrollTop: 0,
      currentMoveTag: 0,
      redirect: "/pages/prod/prod?goodsId=",
      isShowTop: false,
      btnStatus: "确定",
      selectInfo: null,
      selectForm: {
        spsStr: "",
      },
      isShowBrand: false,
      vipPrice: null,
    };
  },
  onLoad(options) {
    this.isShowBrand = !!options.showBrand;
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 0,
    });
    this.goodsId = options.goodsId * 1;
    this.redirect += this.goodsId;
    this.userId = uni.getStorageSync(USER_ID);
    this.getGoodsDetail();
    if (this.userId) {
      this.getCarShopNumber();
    }
  },

  methods: {
    // 回退
    handleBack() {
      uni.navigateBack();
    },
    // 获取商品详情
    async getGoodsDetail() {
      uni.showLoading();
      const res = await getGoodsDetailApi(this.goodsId, this.userId);
      uni.hideLoading();
      if (res.errno === 0) {
        this.goodsDetail = res.data;
        // #ifdef H5
        this.$nextTick(() => {
          this.handleShareGoods(true);
        });
        // #endif
        this.isCollect = !!res.data.userHasCollect;
        this.getBrandOtherGoods(res.data.brand.id);
      } else {
        uni.showToast({
          title: "商品不存在",
          duration: 2000,
          icon: "none",
        });

        setTimeout(() => {
          uni.navigateBack();
        }, 500);
      }
    },

    // 加入购物车
    async addShopCar(selectInfo) {
      this.btnStatus = "确定加入购物车";
      let goodsInfo = null;
      if (!selectInfo || !this.selectInfo) {
        goodsInfo = await this.getSpacification();
      } else {
        goodsInfo = selectInfo;
      }

      const data = {
        userId: getUserId(),
        goodsId: this.goodsDetail.info.id,
        number: goodsInfo.number,
        productId: goodsInfo.product.id,
      };

      const res = await addShopCarApi(data);
      if (res.errno === 0) {
        uni.showToast({
          title: "添加成功",
          icon: "none",
        });
        this.showSpecification = false;
        this.getCarShopNumber();
      } else {
        uni.showToast({
          title: "购物车添加失败",
          icon: "none",
        });
      }
    },
    // 立即购买
    async fastBuy(selectInfo) {
      this.btnStatus = "立即购买";
      let goodsInfo = null;
      if (!selectInfo || !this.selectInfo) {
        goodsInfo = await this.getSpacification();
      } else {
        goodsInfo = selectInfo;
      }
      uni.setStorageSync(PAY_GOODS, {
        currentGoodsImg: goodsInfo.product.url || this.goodsDetail.info.picUrl,
        currentSpecification: goodsInfo.spStr,
        currentPrice: goodsInfo.product.price,
        number: goodsInfo.number,
        status: 0,
        ...this.goodsDetail,
        selectedProduct: goodsInfo,
        brandId: this.goodsDetail.brand.id,
      });

      uni.navigateTo({
        url: "/pages/pre-order/pre-order",
      });
    },

    // 获取商品规格参数
    getSpacification() {
      if (!this.userId) {
        uni.showModal({
          title: "提示",
          content: "您还未登录，请先登录",
          success: ({ confirm }) => {
            if (confirm) {
              uni.navigateTo({
                url: "/pages/login/login?to=" + this.redirect,
              });
            }
          },
        });

        return;
      }
      return new Promise((resolve, reject) => {
        if (this.showSpecification) {
          const goodsInfo = this.$refs.specificationRef.getVal();
          if (goodsInfo.number > goodsInfo.product.number) {
            this.$showToast("该货品库存为" + goodsInfo.product.number);
            reject();
          }
          resolve(goodsInfo);
        } else {
          this.showSpecification = true;
        }
      });
    },

    // 获取购物车数量
    async getCarShopNumber() {
      const res = await getCarShopNumberApi();
      if (res.errno === 0) {
        this.shopCarNumber = res.data;
      }
    },

    // 获取品牌商的其他商品
    async getBrandOtherGoods(id) {
      if (!id) return;
      const res = await goodsListApi({
        page: 1,
        size: 6,
        brandId: id,
      });

      if (res.errno === 0) {
        this.brandOtherGoods = res.data.goodsList;
        console.log(this.brandOtherGoods);
      } else {
        uni.showLoading({
          title: res.errmsg,
          icon: "none",
        });
      }
    },

    // 添加收藏
    async handleCollect() {
      if (!this.userId) {
        uni.showModal({
          title: "提示",
          content: "您还未登录，请先登录",
          success: ({ confirm }) => {
            if (confirm) {
              uni.navigateTo({
                url: "/pages/login/login",
              });
            }
          },
        });

        return;
      }

      uni.showLoading();

      const res = await collectionApi({
        userId: getUserId(),
        type: 0,
        valueId: this.goodsId,
      });

      uni.hideLoading();

      if (res.errno === 0) {
        uni.showToast({
          title: res.data.type === "add" ? "收藏成功" : "取消收藏成功",
          duration: 2000,
        });

        this.isCollect = !this.isCollect;
      } else {
        uni.showLoading({
          title: "操作失败",
          icon: "none",
        });
      }
    },

    handleKefu() {
      uni.showLoading({
        title: "暂未开放",
        icon: "none",
        duration: 1000,
      });
    },

    // 获取移动的位置
    initMovePosition() {
      const _this = this;
      const query = uni.createSelectorQuery().in(this);
      query
        .select(".eval")
        .boundingClientRect((data) => {
          _this.evalPosition = data.top;
        })
        .exec();

      query
        .select("#goods-detail")
        .boundingClientRect((data) => {
          _this.detailPosition = data.top;
        })
        .exec();

      this.isShowTop = true;
    },

    // 点击移动到对应的位置
    moveToDetail(tag) {
      const _this = this;
      // this.currentMoveTag = tag;
      switch (tag) {
        case 0:
          uni.pageScrollTo({
            scrollTop: 0,
            duration: 200,
          });
          break;
        case 1:
          uni.pageScrollTo({
            scrollTop: _this.evalPosition,
            duration: 200,
          });
          break;

        case 2:
          uni.pageScrollTo({
            scrollTop: _this.detailPosition,
            duration: 200,
          });
          break;
      }
    },

    // 点击
    handleClickMenu(item) {
      if (item.key == "sp") {
        this.btnStatus = "确定";
        this.showSpecification = true;
      }
    },

    // 确定选择规格
    async handleChooseSp() {
      console.log(1);
      const sps = await this.getSpacification();
      // this.showSpecification = false
      // debugger
      if (this.btnStatus === "确定加入购物车") {
        this.addShopCar(sps);
      } else if (this.btnStatus === "立即购买") {
        this.fastBuy(sps);
      } else {
        this.selectInfo = sps;
        this.selectForm.spsStr = "已选" + sps.spStr;
        this.showSpecification = false;
      }
    },

    // 查看会员价
    handleWatchVipPrice() {
      const userInfo = uni.getStorageSync(USER_INFO);

      console.log(userInfo.userLevel);

      if (!userInfo || !this.userId) {
        uni.showModal({
          title: "提示",
          content: "登录后方可查看",
          success: ({ confirm }) => {
            if (confirm) {
              uni.navigateTo({
                url: "/pages/login/login",
              });
            }
          },
        });
        return;
      }

      if (userInfo.userLevel == 5 && !userInfo.isRegionAgent) {
        uni.showModal({
          title: "提示",
          content: "你还不是会员，是否去升级？",
          success: ({ confirm }) => {
            if (confirm) {
              uni.navigateTo({
                url: "/user/sever/userUp/partner-appay",
              });
            }
          },
        });

        return;
      }

      const _this = this;

      if (this.vipPrice) {
        this.vipPrice = null;
      } else {
        watchVipPriceApi({
          id: this.goodsId,
        }).then(({ data }) => {
          _this.vipPrice = data;
        });
      }
    },

    // 分享
    handleShareGoods(isQuit) {
      const _this = this;
      const data = {
        data: {
          title: _this.goodsDetail.info.name,
          desc: _this.goodsDetail.productList
            .map((item) => {
              return item.specifications.join(",");
            })
            .join(","),

          link:
            "https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/pages/prod/prod?goodsId=" +
            _this.goodsId,
          imageUrl:
            _this.goodsDetail.shareImage || _this.goodsDetail.info.picUrl,
        },
        successCb: () => {},
        failCb: () => {},
      };

      this.$refs.tuanWxShareRef.share(
        data,
        isQuit,
        "/pages/prod/prod?goodsId" + this.goodsId
      );
    },

    // 打开客服
    handleChat() {
      this.$refs.tuanChatKFRef.show();
    },
  },

  watch: {
    goodsDetail: {
      handler(value) {
        if (value && this.brandOtherGoods) {
          this.$nextTick(() => {
            this.initMovePosition();
          });
        }
      },

      immediate: true,
      deep: true,
    },

    brandOtherGoods: {
      handler(value) {
        if (value && this.goodsDetail) {
          this.$nextTick(() => {
            this.initMovePosition();
          });
        }
      },

      immediate: true,
      deep: true,
    },
  },

  computed: {
    goodsInfoDetail() {
      return this.goodsDetail.info.detail
        ? marked(this.goodsDetail.info.detail)
        : "";
    },
  },

  onPullDownRefresh() {
    this.getGoodsDetail();
    if (this.userId) {
      this.getCarShopNumber();
    }
    uni.stopPullDownRefresh();
  },

  onPageScroll(e) {
    this.showTopNav = !!e.scrollTop;
    this.scrollTop = e.scrollTop;
    if (this.detailPosition) {
      if (e.scrollTop < this.evalPosition - 60) {
        this.currentMoveTag = 0;
      } else if (
        e.scrollTop >= this.evalPosition - 60 &&
        e.scrollTop < this.detailPosition - 60
      ) {
        this.currentMoveTag = 1;
      } else if (e.scrollTop > this.detailPosition - 60) {
        this.currentMoveTag = 2;
      }
    } else {
      if (e.scrollTop < this.evalPosition - 60) {
        this.currentMoveTag = 0;
      } else if (e.scrollTop >= this.evalPosition - 60) {
        this.currentMoveTag = 1;
      }
    }
  },
};
</script>

<style lang="less" scoped>
.goods-detail-container {
  font-size: 28upx;
  padding-bottom: 100upx;
}

/deep/ .wxParse {
  image,
  img {
    display: block;
  }
}

.watch-vip-price {
  margin-left: 20upx;
  color: #3d3d3d;
}

.pane {
  padding: 16upx 30upx;
  box-sizing: border-box;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 780upx;

  .header-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 34upx 20upx;
    box-sizing: border-box;

    image {
      width: 64upx;
      height: 64upx;

      &:last-child {
        margin-left: 20upx;
      }
    }
  }

  .scroll-top-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100upx;
    padding: 0 18upx;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 28upx;
    transition: opacity 350ms;

    image {
      position: absolute;
      top: 50%;
      left: 36upx;
      transform: translateY(-50%);
      height: 28upx;
      width: 16upx;
    }

    .center {
      display: flex;
      align-items: flex-end;

      .item {
        width: 160upx;
        height: 100upx;
        line-height: 100upx;
        text-align: center;
        box-sizing: border-box;
        border-bottom: 6upx solid transparent;
        transition: all 300ms;

        &.active {
          border-bottom-color: #fe9f21;
        }
      }
    }
  }
}

//
.sub-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 26upx;
  padding-top: 26upx;
  box-sizing: border-box;
  font-weight: bold;

  image {
    width: 32upx;
    height: 32upx;
  }
}

// 商品信息
.goods-info {
  /* #ifdef APP */
  margin-top: 30upx;
  /* #endif */

  /* #ifdef H5 */
  margin-top: -34upx;
  /* #endif */

  .detail-price {
    color: #fa5151;

    .price-text {
      font-weight: bold;
      font-size: 48upx;
      margin: 0 4upx;
    }

    .normalPrice {
      color: #3d3d3d;
      font-size: 28upx;
      text-decoration: line-through;
    }
  }

  .goods-name {
    font-weight: bold;
    color: #000;
    font-size: 32upx;
    margin-top: 10upx;
  }

  .salsed {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #999;
    margin-top: 10upx;

    image {
      width: 40upx;
      height: 40upx;
      object-fit: cover;
    }
  }

  .sub-info {
    display: flex;
    justify-content: space-around;
    margin-top: 30upx;
    font-size: 24upx;
    color: #3d3d3d;
    padding: 34upx 0;
    background-color: #f9f9f9;

    image {
      width: 48upx;
      height: 48upx;
      object-fit: cover;
    }

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    text {
      margin: 8upx 0 18upx 0;
    }

    .attribute {
      font-weight: bold;
      font-size: 28upx;
      margin: 0;
    }
  }

  .buy-info {
    padding: 40upx 28upx;
    box-sizing: border-box;
    margin-top: 20upx;
    background-color: #f9f9f9;

    .item {
      display: flex;
      align-items: flex-start;
      color: #3d3d3d;
      margin-bottom: 66upx;

      &:last-child {
        margin-bottom: 0;
      }
    }

    image {
      width: 48upx;
      height: 48upx;
      object-fit: cover;
      margin-right: 20upx;
    }
  }

  .eval {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26upx;
    box-sizing: border-box;
    background-color: #f9f9f9;
    margin-top: 24upx;

    image {
      width: 32upx;
      height: 32upx;
      object-fit: cover;
    }
  }

  .brand-wrapper {
    margin-top: 24upx;
    background-color: #f9f9f9;

    .top {
      display: flex;
      padding: 30upx 12upx;
      box-sizing: border-box;

      .image {
        width: 160upx;
        height: 160upx;
        object-fit: cover;
        border-radius: 10upx;
        flex-shrink: 1;
        margin-right: 20upx;
      }

      .image-avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: #fff;
        background-color: #e95d20;
      }

      .brand-info {
        flex: 1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;

        .brand-name {
          font-weight: bold;
          font-size: 36upx;
          width: 480upx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .brand-desc {
          margin: 10upx 0;
          width: 480upx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .serve {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .apponit {
            color: #fa5151;
          }
        }
      }
    }

    .bottom {
      display: flex;
      border-top: 1upx solid #eee;

      .uni-btn {
        flex: 1;
        padding: 24upx;
        font-size: 28upx;
        border-radius: 0;
        // font-weight: 500;

        &::after {
          border: none;
        }

        &:first-child {
          border-right: 1upx solid #eee;
        }
      }
    }
  }

  .brand-recommend {
    margin-top: 24upx;

    // background-color: #f9f9f9;
    .sub-title {
      padding: 0;
    }

    .wrapper {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: flex-start;
      margin-top: 12upx;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-bottom: 20upx;

        image {
          width: 224upx;
          height: 224upx;
          border-radius: 10upx;
        }

        .recommend-goods-name {
          width: 210upx;
          font-size: 26upx;
          margin: 4upx 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .recommend-goods-price {
          font-size: 24upx;
          color: #fa5151;

          text {
            font-weight: 500;
            font-size: 36upx;
          }
        }
      }
    }
  }
}

.goods-detail {
  position: relative;
  width: 100%;
  height: 65upx;
  background-color: #f1f2f6;
  display: flex;
  justify-content: center;
  align-items: center;

  text {
    position: relative;
    z-index: 2;
    background-color: #f1f2f6;
    padding: 0 4px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 400upx;
    height: 1upx;
    background-color: #d8d8d8;
    top: 50%;
    z-index: 1;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.recommd-container {
  .goods-detail {
    text {
      color: #e95d20;
    }

    &::after {
      background-color: #e95d20;
    }
  }
}

.footer {
  left: 0;
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 100upx;
  background-color: #fff;
  padding: 0 20upx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  z-index: 10000000;

  .icon-wrapper {
    display: flex;
    flex: 1;
    justify-content: space-between;

    .item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-right: 40upx;
      font-size: 24upx;
      white-space: nowrap;

      .number {
        width: 40upx;
        height: 40upx;
        text-align: center;
        line-height: 40upx;
        color: #fff;
        border-radius: 50%;
        position: absolute;
        background-color: #e95d20;
        top: -20upx;
        right: -16upx;
      }
    }

    image {
      width: 40upx;
      height: 40upx;
      object-fit: cover;
    }
  }

  .buttons {
    width: 440upx;
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, #ffd100, #fe753f);
    border-radius: 100px;
    overflow: hidden;

    .uni-btn {
      width: 220upx;
      font-size: 28upx;
      color: #fff;
      font-weight: bold;
      height: 80upx;
      text-align: center;
      line-height: 80upx;
    }
  }
}
</style>
