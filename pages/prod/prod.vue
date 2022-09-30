<template>
  <view class="prod-wrapper">
    <view class="carousel">
      <Carousel
        v-if="goodsInfo.info"
        :list="[goodsInfo.info.picUrl]"
        :height="370"
        :top="0"
        :radius="0"
      ></Carousel>
      <img
        @click="back"
        class="back"
        src="../../static/images/store/chevron-states.png"
        alt=""
      />
    </view>

    <view class="promotion">
      <view class="left">
        <view class="top">
          ￥<text class="number">{{ goodsInfo.info.retailPrice }}</text>
          <!-- <view class="tag">
            新人价 <view class="price">￥<text class="number">1900</text></view>
          </view> -->
        </view>

        <view class="bottom">
          <view class="tag">厂家直销</view>
          <view class="tag">会员促销</view>
          <view class="tag">团蜂家具商城</view>
        </view>
      </view>
      <!-- <view class="right">
        <view class="fast">
          <img
            class="text"
            src="../../static/images/goods/maiosha.png"
            alt=""
          />
          <img
            class="icon"
            src="../../static/images/goods/miaosha.png"
            alt=""
          />
        </view>

        <view class="time">
          <view class="item">1</view>
          <view class="item">8</view>
          <view class="item">:</view>
          <view class="item">3</view>
          <view class="item">0</view>
        </view>

        <view class="on-time">准时开抢</view>
      </view> -->
    </view>

    <view class="main">
      <view class="line">
        <view class="left">
          <img
            class="img"
            src="../../static/images/goods/dingdanman.png"
            alt=""
          />
          <text class="coupons">订单满100-10</text>
        </view>
        <view class="right">
          <img class="img" src="../../static/images/goods/xinren.png" alt="" />
          <text class="coupons">新人 满1000-100</text>
        </view>

        <text class="coupons-btn">领劵</text>
      </view>

      <view class="info">
        <view class="left">
          <view class="name">{{ goodsInfo.info.name }}</view>
          <view class="style">家庭餐桌带椅子，白色/灰色</view>
          <view class="ranking"> 第二名 | 家具餐桌热销榜 </view>
        </view>
        <view class="right">
          <div class="item" @click="handleCollect">
            <img
              class="img"
              src="../../static/images/goods/shoucang.png"
              alt=""
            />
            <text class="text">收藏</text>
          </div>
          <div class="item">
            <img
              class="img"
              src="../../static/images/goods/fenxiang.png"
              alt=""
            />
            <text class="text" @click="handleShareGoods">分享</text>
          </div>
        </view>
      </view>

      <view class="selects">
        <!-- <view class="item">
          <view class="title">已选</view>
          <view class="value">灰色 1件 可选套餐</view>
        </view> -->

        <view class="item">
          <view class="title">服务</view>
          <view class="value">
            <view class="tags-wrapper">
              <view class="tags">
                <img
                  class="img"
                  src="../../static/images/goods/fufei.png"
                  alt=""
                />
                <view class="text">付费组装服务</view>
              </view>
              <view class="tags">
                <img
                  class="img"
                  src="../../static/images/goods/tuihuo.png"
                  alt=""
                />
                <view class="text">退货政策</view>
              </view>
              <view class="tags">
                <img
                  class="img"
                  src="../../static/images/goods/shejizixun.png"
                  alt=""
                />
                <view class="text">设计咨询</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 规格 -->
      <view class="specificationList" @click="handleChoosespecificationList">
        {{
          selectedSpecificationInfoStr
            ? `已选：${selectedSpecificationInfoStr}`
            : "请规格数量选择"
        }}
        <img
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qt4o7j0jglkweyicy1fw.png"
          class="right-arrow"
          alt=""
        />
      </view>
    </view>

    <!-- 商品参数 -->
    <view class="params" v-if="goodsInfo.attribute.length">
      <view class="title">商品参数</view>
      <view class="item" v-for="item in goodsInfo.attribute" :key="item.id">
        <text class="sub-title">{{ item.attribute }}</text>
        <text>{{ item.value }}</text>
      </view>
    </view>

    <view class="detail-img" v-html="goodsInfo.info.detail"></view>

    <!-- 常见问题 -->
    <view class="problems">
      <view class="title"></view>
      <ul>
        <li v-for="item in goodsInfo.issue" :key="item.id">
          <view class="question">{{ item.question }}</view>
          <view class="answer">{{ item.answer }}</view>
        </li>
      </ul>
    </view>

    <RecommendGoods :id="goodsId"></RecommendGoods>

    <view
      class="choose-specificationList"
      :style="{
        height: specificationListInfoVisible ? '100vh' : 0,
      }"
      ref="chooseSpecificationListRef"
    >
      <view class="mask" @click="handleCloseModal"></view>
      <view
        class="mask-main"
        ref="maskMainAreaRef"
        @transitionend="handleTransitionend"
      >
        <view class="info">
          <img
            :src="
              specificationListInfo.currentGoodsImg || goodsInfo.info.picUrl
            "
            alt=""
            class="goods-img"
          />
          <view class="info-chhose">
            <view class="item"
              >￥{{
                specificationListInfo.currentPrice || goodsInfo.info.retailPrice
              }}</view
            >
            <view class="item">{{
              selectedSpecificationInfoStr || "请选择规格数量"
            }}</view>
          </view>
        </view>

        <view
          class="area"
          v-for="(item, index) in goodsInfo.specificationList"
          :key="index"
        >
          <view class="sub-title">{{ item.name }}</view>
          <view class="values">
            <view
              class="value-item"
              :class="{
                active:
                  specificationListInfo.currentSpecification[item.name] ===
                  value.value,
              }"
              v-for="value in item.valueList"
              :key="value.id"
              @click="chooseCurrentSpecification(item.name, value)"
              >{{ value.value }}</view
            >
          </view>
        </view>

        <view class="choose-number">
          数量
          <uni-number-box
            v-model="specificationListInfo.number"
          ></uni-number-box>
        </view>
      </view>
    </view>

    <view class="footer">
      <view class="item">
        <img class="kefu" src="../../static/images/goods/kefu.png" alt="" />
        <text class="text">客服</text>
      </view>
      <view class="item" @click="toShopCar">
        <img class="car" src="../../static/images/goods/gouwuche.png" alt="" />
        <view class="bage" v-if="carGoodsNumer">{{ carGoodsNumer }}</view>
        <text class="text">购物车</text>
      </view>
      <view class="btns">
        <button @click="handleAddCar">加入购物车</button>
        <button @click="handlePayGoods">立即购买</button>
      </view>
    </view>
  </view>
</template>

<script>
import Carousel from "../../components/carousel";
import {
  getGoodsDetailApi,
  collectionApi,
  getShopCarApi,
  addShopCarApi,
  getCarShopNumberApi,
} from "../../api/goods";
import { getUserId } from "../../utils";
import RecommendGoods from "../../components/recommend-goods";
import { PAY_GOODS } from "../../constant";

export default {
  components: {
    Carousel,
    RecommendGoods,
  },
  data() {
    return {
      goodsId: "",
      goodsInfo: {},
      specificationListInfo: {
        number: 0,
        currentSpecification: {},
        currentGoodsImg: "",
        currentPrice: "",
      },
      specificationListInfoVisible: false,
      selectedSpecificationInfoStr: "",
      shopCarList: [],
      carGoodsNumer: 0,
    };
  },
  methods: {
    back() {
      uni.navigateBack();
    },

    async getGoodsDetail() {
      const res = await getGoodsDetailApi(this.goodsId);
      if (res.errno === 0) {
        this.goodsInfo = res.data;
        console.log(res.data.info.detail);
        this.goodsInfo.info.detail = this.goodsInfo.info.detail.replaceAll(
          "width=",
          ""
        );
        this.goodsInfo.info.detail = this.goodsInfo.info.detail.replaceAll(
          "<img",
          "<img width='100%' "
        );
        this.goodsInfo.info.detail = this.goodsInfo.info.detail.replaceAll(
          "height=",
          ""
        );

        this.specificationListInfo.currentGoodsImg = res.data.info.picUrl;
      } else {
        uni.showToast({
          title: res.errmsg,
          duration: 2000,
        });
      }
    },

    async handleCollect() {
      const res = await collectionApi({
        userId: getUserId(),
        type: 0,
        valueId: this.goodsId,
      });

      uni.showToast({
        title: res.data.type === "add" ? "收藏成功" : "取消收藏成功",
        duration: 2000,
      });
    },

    // 点击选择规格
    handleChoosespecificationList() {
      // this.specificationListInfoVisible = true;
      this.$refs.maskMainAreaRef.$el.style.transform = "scaleY(1)";
      // this.$refs.maskMainAreaRef.$el.style.transform = 'sca'
    },

    // 点击阴影关闭
    handleCloseModal() {
      this.$refs.maskMainAreaRef.$el.style.transform = "scaleY(0)";
    },

    // 监听动画完成
    handleTransitionend() {
      this.specificationListInfoVisible = !this.specificationListInfoVisible;
    },

    // 点击选择规格
    chooseCurrentSpecification(name, item) {
      this.specificationListInfo.currentSpecification[`${name}`] = item.value;
      this.selectedSpecificationInfoStr = "";

      for (const key in this.specificationListInfo.currentSpecification) {
        this.selectedSpecificationInfoStr +=
          this.specificationListInfo.currentSpecification[key] + ", ";
      }

      this.selectedSpecificationInfoStr +=
        this.specificationListInfo.number + "件";
    },

    // 获取购物车数据
    async getShopCar() {
      const res = await getShopCarApi();
      this.shopCarList = res.data.brandCartgoods;
    },

    // 点击添加购物车
    async handleAddCar() {
      if (!this.selectedSpecificationInfoStr) {
        this.handleChoosespecificationList();
        return;
      }

      if (!this.specificationListInfo.number) {
        uni.showToast({
          title: "请选择规格数量",
          duration: 2000,
          icon: "none",
        });

        this.handleChoosespecificationList();
        return;
      }

      const productInfo = this.goodsInfo.productList.find((item) => {
        let tag = true;
        for (const key in this.specificationListInfo.currentSpecification) {
          tag = item.specifications.includes(
            this.specificationListInfo.currentSpecification[key]
          );
        }

        if (tag) {
          return item;
        }
      });

      if (!productInfo) {
        uni.showToast({
          title: "该商品暂无库存",
          duration: 2000,
          icon: "none",
        });

        return;
      }

      const data = {
        userId: getUserId(),
        goodsId: this.goodsId,
        number: this.specificationListInfo.number,
        productId: productInfo.id,
      };

      const res = await addShopCarApi(data);
      if (res.errno === 0) {
        uni.showToast({
          title: "添加成功",
          duration: 2000,
        });
        this.handleCloseModal();
        this.getCarShopNumber();
      } else {
        uni.showToast({
          title: res.errmsg,
          duration: 2000,
          icon: "none",
        });
      }
    },

    // 获取购物车商品数量
    async getCarShopNumber() {
      const res = await getCarShopNumberApi();
      this.carGoodsNumer = res.data;
    },

    // 去购物车
    toShopCar() {
      uni.navigateTo({
        url: "/user/sever/shop-car",
      });
    },

    // handleShareGoods
    handleShareGoods() {
      // uni.share({
      //   type: 2,
      //   href: '',
      //   imageUr: ''
      // })
    },

    // 立即购买
    handlePayGoods() {
      if (this.specificationListInfo.number) {
        const productInfo = this.goodsInfo.productList.find((item) => {
          let tag = true;
          for (const key in this.specificationListInfo.currentSpecification) {
            tag = item.specifications.includes(
              this.specificationListInfo.currentSpecification[key]
            );
          }

          if (tag) {
            return item;
          }
        });

        if (!productInfo) {
          uni.showToast({
            title: "该商品暂无库存",
            duration: 2000,
            icon: "none",
          });

          return;
        }
        uni.setStorageSync(PAY_GOODS, {
          ...this.specificationListInfo,
          status: 0,
          ...this.goodsInfo,
          selectedProduct: productInfo,
        });
        uni.navigateTo({
          url: "/pages/pre-order/pre-order",
        });
      } else if (
        this.selectedSpecificationInfoStr &&
        !this.specificationListInfo.number
      ) {
        uni.showToast({
          title: "请选择购买数量",
          duration: 2000,
          icon: "none",
        });
      } else {
        this.handleChoosespecificationList();
      }
    },
  },

  watch: {
    "specificationListInfo.number": {
      handler(value) {
        const infoArr = this.selectedSpecificationInfoStr.split(",");
        const index = infoArr.findIndex((item) => item.includes("件"));
        if (index !== -1) {
          infoArr.splice(index, 1);
        }
        infoArr.push(`${value}件`);
        this.selectedSpecificationInfoStr = infoArr.join(",");
      },
    },
  },

  onLoad(options) {
    this.goodsId = options.goodsId;
    this.getGoodsDetail();
    this.getShopCar();
    this.getCarShopNumber();
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.prod-wrapper {
  padding-bottom: 160upx;

  .carousel {
    position: relative;
    z-index: 10;
    .back {
      position: fixed;
      top: 28upx;
      left: 10upx;
      width: 48upx;
      height: 48upx;
    }
  }

  .promotion {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 28upx;
    background-color: #089a9d;
    box-sizing: border-box;
    border-radius: 20upx 20upx 0 0;
    margin-top: -28upx;
    z-index: 11;

    .left {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      box-sizing: border-box;
      flex: 1;
      height: 100%;
      background-color: #09b8b8;
      padding-top: 16upx;
      padding-left: 28upx;
      padding-bottom: 12upx;

      .top {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 24upx;
        margin-bottom: 16upx;
        .number {
          font-size: 36upx;
        }

        .tag {
          color: #3b4a50;
          padding: 14upx 24upx;
          border-radius: 20upx 20upx 20upx 0;
          margin-left: 22upx;
          background: linear-gradient(
            276deg,
            #c7f5f5 53%,
            #ffffff 100%,
            rgba(199, 245, 245, 0) 100%
          );

          .price {
            padding: 0;
          }
        }
      }

      .bottom {
        color: #fff;
        font-size: 16upx;
        display: flex;
        align-items: center;

        .tag {
          padding: 2upx 22upx;
          background-color: #1f9695;
          color: #fff;
          border-radius: 20upx;
          margin-right: 18upx;
        }
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: #09b8b8;
      padding-top: 16upx;
      padding-right: 28upx;
      padding-bottom: 12upx;
      box-sizing: border-box;

      .fast {
        .text {
          width: 100upx;
        }

        .icon {
          width: 30upx;
        }
      }

      .time {
        display: flex;
        margin: 6upx 0;

        .item {
          width: 12upx;
          height: 28upx;
          text-align: center;
          line-height: 28upx;
          background-color: #fff;
          padding: 4upx;
          margin-right: 8upx;
          font-size: 20upx;
        }
      }

      .on-time {
        font-size: 20upx;
        color: #fff;
      }
    }
  }

  .main {
    box-sizing: border-box;
    padding: 16upx 22upx;

    .line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48upx;
      background-color: #f9eeed;
      padding: 0 28upx;

      .left,
      .right {
        position: relative;

        .coupons {
          width: 100%;
          position: absolute;
          top: 4upx;
          left: 50%;
          font-size: 20upx;
          transform: scale(0.8) translateX(-50%);
        }
      }

      .coupons-btn {
        color: #fa5151;
        font-size: 20upx;
        transform: scale(0.8);
      }

      .img {
        width: 228upx;
        height: 28upx;
      }
    }

    .info {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin: 18upx 0;

      .name {
        color: #3d3d3d;
        font-size: 28upx;
        line-height: 32upx;
        font-weight: bold;
        margin-bottom: 16upx;
      }

      .style {
        font-size: 24upx;
        color: #999;
      }

      .ranking {
        color: #aa5b0d;
        padding: 8upx 14upx;
        margin: 12upx auto 0 auto;
        font-size: 24upx;
        background: linear-gradient(
          209deg,
          #ffd54e 0%,
          rgba(255, 195, 0, 0) 100%
        );
        border-radius: 10upx;
        border: 1px solid #ffc300;
      }

      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-right: 34upx;
          &:nth-child(2) {
            margin-right: 0;
          }

          .img {
            width: 34upx;
          }

          .text {
            color: #999;
            font-size: 16upx;
            transform: scale(0.9);
          }
        }
      }
    }

    .selects {
      .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 24upx 0;
        border-bottom: 1upx solid #d8d8d8;

        .title {
          color: #999999;
          font-size: 24upx;
          margin-right: 52upx;
        }

        .value {
          color: #3d3d3d;
          font-size: 24upx;

          .tags-wrapper {
            width: 100%;
            display: flex;
            align-items: center;

            .tags {
              display: flex;
              align-items: center;
              color: #0256ff;
              margin-right: 50upx;

              .img {
                width: 20upx;
                margin-right: 6upx;
              }
            }
          }
        }
      }
    }
  }

  .params {
    background: @cw;
    margin: 20upx 0;
    box-sizing: border-box;
    padding: 16upx 22upx;

    .title {
      font-size: @f14;
      color: @c3d;
      margin-bottom: 10px;
    }

    .item {
      background-color: #f2f2f2;
      padding: 20upx 10upx;
      margin-bottom: 5px;
      font-size: @f12;

      .sub-title {
        margin-right: 30px;
      }
    }
  }

  // 常见问题
  .problems {
    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 50%;
      height: 1px;
      border-top: 1upx solid black;
      margin: 20px 0 20px 0;

      &::before {
        position: absolute;
        content: "常见问题";
        display: block;
        background-color: @cw;
        padding: 0 20px;
        font-size: @f14;
        top: -10px;
        left: 50%;
        white-space: nowrap;
        transform: translateX(-50%);
      }
    }

    ul {
      box-sizing: border-box;
      padding: 16upx 22upx 16upx 40upx;

      .question {
        position: relative;
        font-size: @f14;
        color: @c3d;
        font-weight: bold;
        margin-bottom: 3px;

        &::before {
          position: absolute;
          top: 50%;
          left: -9px;
          transform: translateY(-50%);
          content: "";
          display: block;
          width: 4px;
          height: 4px;
          background-color: red;
          border-radius: 50%;
        }
      }

      .answer {
        font-size: @f12;
        color: @c3d;
        line-height: 2;
        margin-bottom: 10px;
      }
    }
  }

  .specificationList {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: @f14;
    color: @c3d;
    height: 90upx;
    line-height: 90upx;
    border-bottom: 0.5px solid #ccc;

    .right-arrow {
      width: 40upx;
      transform: rotate(180deg);
    }
  }

  .choose-specificationList {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 200;
    transition: all 200ms;

    .mask {
      height: 100%;
      background-color: rgba(153, 153, 153, 0.6);
    }

    .mask-main {
      position: absolute;
      width: 100%;
      background-color: @cw;
      bottom: 140upx;
      padding: 40upx;
      box-sizing: border-box;
      border-radius: 20upx 20upx 0 0;
      transform: scaleY(0);
      transform-origin: bottom;
      transition: all 200ms;

      .info {
        display: flex;
        padding-bottom: 30upx;
        border-bottom: 1upx solid #ccc;

        .goods-img {
          .img(160upx, 10upx);
          flex-shrink: 0;
          margin-right: 20upx;
        }

        .info-choose {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .item {
          display: flex;
          margin: 20upx 0;
          font-size: @f14;
        }
      }

      .area {
        font-size: @f14;
        color: @c3d;

        .sub-title {
          margin: 20upx 0;
        }

        .values {
          display: flex;
          flex-wrap: wrap;

          .value-item {
            font-size: @f12;
            padding: 10upx 20upx;
            border-radius: 20px;
            margin-right: 10px;
            margin-bottom: 10px;

            &.active {
              background-color: #fbdcd9;
              color: #e05c5b;
              border: 1upx solid #e05c5b;
            }
          }
        }
      }

      .choose-number {
        font-size: @f14;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 116upx;
    display: flex;
    align-items: center;
    padding: 14upx 22upx;
    background-color: #fff;
    z-index: 201;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 20upx;
      position: relative;

      .kefu {
        width: 40upx;
      }

      .bage {
        position: absolute;
        top: -10px;
        right: 5px;
        font-size: 10px;
        padding: 2upx 10upx;
        background-color: #fa5151;
        border-radius: 8px;
        color: @cw;
      }

      .text {
        color: #3d3d3d;
        font-size: 16uxp;
        transform: scale(0.8);
      }

      .car {
        width: 34upx;
      }
    }

    .btns {
      display: flex;
      margin-top: -20upx;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 88upx;
        padding: 20upx 40upx;
        color: #fff;
        font-size: 36upx;
        background-color: #07b9b9;

        &:nth-child(1) {
          border-radius: 40upx 0 0 40upx;
        }

        &:nth-child(2) {
          background-color: #fa5151;
          border-radius: 0 40upx 40upx 0;
        }
      }
    }
  }
}
</style>