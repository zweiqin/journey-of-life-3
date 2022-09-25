<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-05 17:08:18
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-25 20:22:31
 * @FilePath: \tuan-uniapp\user\sever\shop-car.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <view class="shop-car-container">
    <view class="title">
      <view class="left-view">
        <view>
          <img
            class="back"
            @click="handleBack"
            src="../../static/images/store/chevron-states.png"
          />
        </view>
        <view class="shop-car-text">购物车</view>
      </view>
      <block>
        <view class="right-view" @click="collect" v-if="collectstatus == 1"
          >编辑</view
        >
        <view class="right-view" @click="collect" v-if="collectstatus == 2"
          >完成</view
        >
      </block>
    </view>
    <view class="nogoods" v-if="listLength == 0">购物车没有商品，快去选择吧！</view>
    <view v-for="(item, id) in cartList" :key="id">
      
      <view
        class="shop-car-goodsDetail"
        v-for="(item1, id1) in item.cartList"
        :data-list="item1"
        :key="id1"
        @click="window"
      >
      
        <view v-if="collectstatus == 1">
          <img
            v-if="item1.checked"
            class="shop-car-chose"
            src="../../static/images/lqb/site/site-defaule.png"
            alt=""
            :data-list="item1"
            @click="chosechecked(item1)"
          />
          <img
            v-else
            class="shop-car-chose"
            src="../../static/images/lqb/site/site-nodefaule.png"
            alt=""
            :data-list="item1"
            @click="chosechecked(item1)"
          />
        </view>
        <view
          class="shop-car-chose"
          v-if="collectstatus == 2"
          @click="goodsgetout"
        >
          x
        </view>
        <img class="shop-car-img" :src="item1.picUrl" />
        <view class="shop-car-view-right">
          <view class="shop-car-goodsName">
            {{ item1.goodsName }}
          </view>
          <view class="shop-car-view-right-top">
            <view class="shop-car-goodsSpec">{{ item1.goodsSn }}</view>
          </view>
          <view style="display: flex; justify-content: space-between">
            <view class="shop-car-money"
              >￥<text>{{ item1.price }}</text></view
            >
            <view class="shop-car-goods-add">
              <view class="reduce" @click="goodsdelete">- </view>
              <view class="shop-car-goodsNumber" style="font-size: 12px">{{
                item1.number
              }}</view>
              <view class="add" @click="goodsadd"> + </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="shop-car-love">
      <!-- <view class="shop-car-love-title">
        <img
          src="../../static/images/common/guesslove-left.png"
          alt=""
          class="guessloveleft"
        />
        <view class="shop-car-love-name">猜你喜欢</view>
        <img
          src="../../static/images/common/guesslove-right.png"
          alt=""
          class="guessloveright"
        />
      </view> -->
      <view class="shop-car-love-goods">
        <RecommendGoods :id="12"></RecommendGoods>
      </view>
    </view>

    <view v-if="collectstatus == 1" class="shop-car-paymoney">
      <view class="bottom-left">
        <!-- <radio class="shop-car-choseall" value="" checked="false" color="">
        </radio>
        <view class="shop-car-choseall-text">全选</view> -->
      </view>
      <view class="bottom-middle">
        <view class="shop-car-allmoneytext">合计：</view>

        <view class="shop-car-allmoney">￥ {{ this.goodsallmoney }}</view>
      </view>
      <view class="bottom-right">
        <view class="shop-car-givemoney">结算</view>
      </view>
    </view>

    <view v-if="collectstatus == 2" class="shop-car-collect">
      <view class="bottom-left">
        <!-- <radio class="shop-car-choseall" value="" checked="false" color="">
        </radio>
        <view class="shop-car-choseall-text">全选</view> -->
      </view>
      <view style="display: flex">
        <view class="addcollect">移入收藏</view>
        <view class="delete">删除</view>
      </view>
    </view>
  </view>
</template>

<script>
import RecommendGoods from "../../components/recommend-goods";

import Goods from "../../components/goods";
import {
  getCartIndexApi,
  getCartGoodscountApi,
  getCartCheckedApi,
  getCartUpdateApi,
  getCartDeleteApi,
  getCartCheckoutApi,
} from "../../api/cart";
import { getUserId } from "../../utils";
export default {
  components: {
    Goods,
    RecommendGoods,
  },
  data() {
    return {
      goodsCount: "",
      checkedGoodsCount: "",
      collectstatus: 1,
      goodsnumber: 1,
      goodsmoney: 1900,
      goodsallmoney: 0,
      badgoodschose: 0,
      cartList: [],
      goodsId: "",
      number: "",
      productId: "",
      checked: "",
      isChecked: "",
      id: "",
      data: [],
      goodsallmoney: "",
      listLength:""
    };
  },

  methods: {
    window: function (e) {
      console.log(e);
      this.number = e.currentTarget.dataset.list.number;
      this.productId = e.currentTarget.dataset.list.productId;
      this.goodsId = e.currentTarget.dataset.list.goodsId;
      this.checked = e.currentTarget.dataset.list.checked;
      this.id = e.currentTarget.dataset.list.id;
    },
    chosechecked: function (item1) {
      console.log(item1.productId);
      this.productId = item1.productId;
      if (item1.checked) {
        this.isChecked = 0;
        console.log("isChecked", this.isChecked);
      } else {
        this.isChecked = 1;
        console.log("isChecked", this.isChecked);
      }

      this.getCartChecked();
    },
    handleBack() {
      uni.navigateBack();
    },
    collect() {
      let collectstatus = this.collectstatus;
      if (collectstatus == 1) {
        this.collectstatus = 2;
      } else {
        this.collectstatus = 1;
      }
    },
    goodsadd() {
      setTimeout(() => {
        this.getCartUpdateadd();
      }, 10);
    },
    goodsdelete() {
      setTimeout(() => {
        this.getCartUpdateminus();
      }, 10);
    },
    goodsgetout() {
      setTimeout(() => {
        this.getCartDelete();
      }, 10);
    },
    // 获取购物车信息
    async getCartIndex() {
      // console.log("1");
      const res = await getCartIndexApi({
        userId: getUserId(),
      });
      console.log("商品信息", res);
      this.cartList = res.data.brandCartgoods;
      this.goodsallmoney = res.data.cartTotal.goodsAmount;
      this.listLength = res.data.brandCartgoods.length
      // console.log(this.cartList);
    },
    // 获取购物车商品数量
    async getCartGoodscount() {
      console.log("1");
      const res = await getCartGoodscountApi({
        userId: getUserId(),
      });
      console.log(res);
    },
    // 获取购物车商品勾选状态
    async getCartChecked() {
      // console.log("1");
      const res = await getCartCheckedApi({
        userId: getUserId(),
        isChecked: this.isChecked * 1,
        // productIds: this.productId *1,
        // isChecked: 1,
        productIds: [this.productId],
      });
      console.log(res);
      this.getCartIndex();
    },
    // 修改购物车商品数量 加
    async getCartUpdateadd() {
      // console.log("1");
      const res = await getCartUpdateApi({
        userId: getUserId(),
        goodsId: this.goodsId,
        productId: this.productId,
        number: this.number * 1 + 1,
        id: this.id,
      });
      console.log(res);
      this.getCartIndex();
    },
    // 减
    async getCartUpdateminus() {
      // console.log("1");
      if (this.number == 1) {
        console.log("删除");
      } else {
        const res = await getCartUpdateApi({
          userId: getUserId(),
          goodsId: this.goodsId,
          productId: this.productId,
          number: this.number * 1 - 1,
          id: this.id,
        });
      }
      this.getCartIndex();

      // console.log(res);
    },
    // 商品信息删除
    async getCartDelete() {
      console.log("1");
      const res = await getCartDeleteApi({
        userId: getUserId(),
        productIds: [1],
      });
      console.log(res);
    },
    // 购物车结算
    async getCartCheckout() {
      console.log("1");
      const res = await getCartCheckoutApi({
        userId: getUserId(),
        cartId: 858,
        // 是否使用代金券
        useVoucher: 1,
        // 收货地址id
        addressId: "",
        couponId: "",
        grouponRulesId: "",
      });
      console.log(res);
    },
  },

  computed: {
    totalMoney() {
      return this.goodsnumber * this.goodsmoney;
    },
  },
  onLoad() {
    this.getCartIndex();
    this.getCartGoodscount();
    // this.getCartChecked();
    // this.getCartUpdate();
    // this.getCartDelete();
    // this.getCartCheckout();
  },
};
</script>

<style lang="less" scoped>
.shop-car-container {
  .title {
    display: flex;
    justify-content: space-between;
    margin-top: 74upx;
  }
  .left-view {
    display: flex;
  }
  .back {
    width: 48upx;
    height: 48upx;
    margin-left: 32upx;
    margin-right: 32upx;
  }
  .shop-car-text {
    font-size: 32upx;
  }
  .right-view {
    font-size: 32upx;
    margin-right: 46upx;
  }
  .shop-car-img {
    width: 120upx;
    height: 120upx;
  }
  .shop-car-goodsDetail {
    margin-top: 56upx;
    display: flex;
    margin-left: 40upx;
  }
  .shop-car-goodsName {
    height: 34upx;
    width: 400upx;
    font-size: 24upx;
    margin-bottom: 14upx;
    font-weight: 500;
    color: #3d3d3d;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .shop-car-view-right-top {
    display: flex;
  }
  .shop-car-view-right {
    margin-left: 50upx;
  }
  .shop-car-money {
    font-size: 28upx;
    color: #fa5151;
    margin-top: 8upx;
    font-weight: 350;
  }
  .shop-car-goodsSpec {
    font-size: 20upx;
    width: 400upx;
    color: #3d3d3d;
    margin-right: 26upx;
    font-weight: 350;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .shop-car-goodsColor {
    font-size: 20upx;
    color: #3d3d3d;
    font-weight: 350;
  }
  .shop-car-goods-add {
    display: flex;
    width: 168upx;
    height: 40upx;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.04);
    background-color: #000000 4%;
    justify-content: space-between;
    align-items: center;
  }
  .reduce {
    margin-left: 20upx;
  }
  .add {
    margin-right: 20upx;
  }
  .shop-car-chose {
    margin-top: 40upx;
    margin-right: 28upx;
    height: 34upx;
    width: 34upx;
  }
  .shop-car-love-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 54upx;
    margin-bottom: 24upx;
  }
  .shop-car-love-name {
    margin: 0 12upx;
  }
  .guessloveleft {
    width: 46upx;
    height: 2upx;
  }
  .guessloveright {
    width: 46upx;
    height: 2upx;
  }

  .shop-car-love-goods {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 112upx;
  }
  .shop-car-paymoney {
    background-color: white;
    width: 100%;
    height: 112upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: 999;
  }
  .shop-car-givemoney {
    font-size: 18px;
    font-weight: 500;
    color: white;
  }
  .shop-car-choseall {
    margin-left: 44upx;
    margin-right: 38upx;
  }
  .bottom-left {
    display: flex;
  }
  .bottom-middle {
    display: flex;
  }
  .bottom-right {
    border-radius: 50px;
    background-color: #fa5151;
    padding: 10upx 64upx;
    margin-right: 40upx;
  }
  .shop-car-allmoney {
    color: #fa5151;
    font-size: 28upx;
  }
  .addcollect {
    display: flex;
    font-size: 28upx;
    font-weight: 350;
    border-radius: 100upx;
    background: #ffffff;
    box-sizing: border-box;
    border: 1upx solid #999999;
    padding: 5upx 20upx;
    width: 180upx;
    height: 68upx;
    align-items: center;
    justify-content: center;
  }
  .delete {
    display: flex;
    width: 180upx;
    height: 68upx;
    font-size: 28upx;
    font-weight: 350;
    border-radius: 100upx;
    background: #ffffff;
    box-sizing: border-box;
    border: 1upx solid #999999;
    padding: 5upx 20upx;
    margin-right: 30upx;
    margin-left: 56upx;
    align-items: center;
    justify-content: center;
  }
}
.shop-car-collect {
  background-color: white;
  width: 100%;
  height: 112upx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 999;
}
.nogoods {
  height: 100upx;
  text-align: center;
  color: #999999;
  line-height: 100upx;
}
</style>