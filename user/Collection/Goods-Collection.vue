<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-05 17:08:18
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-25 15:55:17
 * @FilePath: \tuan-uniapp\user\sever\shop-car.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <view class="shop-car-container">
    <!-- 标题页 -->
    <view class="title">
      <view class="left-view">
        <view>
          <img
            class="back"
            @click="handleBack"
            src="../../static/images/store/chevron-states.png"
          />
        </view>
        <view class="shop-car-text">喜欢的商品</view>
      </view>
      <view class="right-view" v-if="collectstatus == 1">
        <img
          @click="gotoshopcar"
          class="collection-shop-car"
          src="../../static/images/lqb/collection/shop-car.png"
          alt=""
        />
        <view v-if="goodsnumber == 0" style="padding-right: 30upx"></view>
        <view class="shop-car-redbackground-number" v-else>
          <view class="shop-car-redbackground-text">{{ goodsnumber }}</view>
        </view>
        <view class="right-view-text" @click="collect"> 编辑</view>
      </view>
      <view class="right-view" v-if="collectstatus == 2">
        <img
          @click="gotoshopcar"
          class="collection-shop-car"
          src="../../static/images/lqb/collection/shop-car.png"
          alt=""
        />
        <view v-if="goodsnumber == 0" style="padding-right: 30upx"></view>
        <view class="shop-car-redbackground-number" v-else>
          <view class="shop-car-redbackground-text">{{ goodsnumber }}</view>
        </view>
        <view class="right-view-text" @click="collect"> 完成</view></view
      >
    </view>
    <!-- 商品详情页 -->
    <view class="nogoods" v-if="dataLength == 0"
      >没有喜欢的商品，快去选择吧！</view
    >
    <view
      class="shop-car-goodsDetail"
      v-for="(item, id) in collectList"
      :key="id"
      :data-list="item"
      @click="listDetail"
    >
      <view class="left-chose" v-if="collectstatus == 2">
        <img
          class="shop-car-goods-choes"
          src="../../static/images/lqb/collection/delete-badgoods.png"
          alt=""
          @click="chosebadgoods"
        />
      </view>
      <img class="shop-car-img" :src="item.picUrl" />
      <view class="shop-car-view-right">
        <view class="shop-car-goodsName">
          {{ item.name }}
        </view>
        <view class="shop-car-view-right-top">
          <!-- <view class="shop-car-goodsSpec">家庭餐桌带椅子</view>
          <view class="shop-car-goodsColor">灰色</view> -->
        </view>
        <view style="display: flex; justify-content: space-between">
          <view class="shop-car-money">
            ￥<text>{{ item.retailPrice }}</text>
          </view>
          <view
            ><img
              @click="addshopcar"
              src="../../static/images/lqb/collection/collectionadd.png"
              alt=""
              class="love-img"
          /></view>
        </view>
      </view>
    </view>
    <!-- 猜你喜欢 -->
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
        <!-- <RecommendGoods :id="12"></RecommendGoods> -->
      </view>
    </view>
    <!-- 底部导航栏 -->
    <view v-if="collectstatus == 1"> </view>

    <view v-if="collectstatus == 2" class="shop-car-collect">
      <view class="bottom-left">
        <radio class="shop-car-choseall" value="" checked="false" color="">
        </radio>
        <view class="shop-car-choseall-text">全选</view>
      </view>
      <view style="display: flex">
        <view class="delete-badgoods">
          <img
            class="delete-badgoods-img"
            src="../../static/images/lqb/collection/delete-badgoods.png"
            alt=""
          />
          <view class="delete-badgoods-text">清除失效商品</view>
        </view>
        <view class="delete">删除</view>
      </view>
    </view>
  </view>
</template>

<script>
import RecommendGoods from "../../components/recommend-goods";
import Goods from "../../components/goods";
import { getCollectListApi, getCollectAddordeleteApi } from "../../api/collect";
import { getUserId } from "../../utils";
export default {
  components: {
    Goods,
    RecommendGoods,
  },

  data() {
    return {
      collectstatus: 1,
      goodsnumber: 0,
      goodsmoney: 1900,
      goodsallmoney: 0,
      badgoodschose: 0,
      collectList: [],
      dataLength: "",
      valueId: "",
    };
  },

  methods: {
    listDetail: function (e) {
      console.log(e);
      this.valueId = e.currentTarget.dataset.list.valueId;
      console.log(this.valueId);
    },
    async getCollectAddordelete() {
      const res = await getCollectAddordeleteApi({
        userId: getUserId(),
        type: 0,
        valueId: this.valueId,
      });
      console.log(res);
      this.collectList = res.data.collectList;
    },
    async getCollectList() {
      const res = await getCollectListApi({
        userId: getUserId(),
        type: 0,
      });
      console.log(res);
      this.collectList = res.data.collectList;
      this.dataLength = res.data.collectList.length;
    },
    handleBack() {
      uni.navigateBack();
    },
    addshopcar() {
      this.goodsnumber = this.goodsnumber + 1;
    },
    chosebadgoods() {
      setTimeout(() => {
        this.getCollectAddordelete();
      }, 10);
      setTimeout(() => {
        // window.location.reload();
        this.getCollectList();
      }, 100);
    },
    collect() {
      let collectstatus = this.collectstatus;
      if (collectstatus == 1) {
        this.collectstatus = 2;
      } else {
        this.collectstatus = 1;
      }
    },

    gotoshopcar() {
      uni.navigateTo({
        url: "../sever/shop-car",
      });
    },
  },

  computed: {
    totalMoney() {
      return this.goodsnumber * this.goodsmoney;
    },
  },
  onLoad() {
    this.getCollectList();
  },
};
</script>
// 当心css，没有嵌套
<style lang="less" scoped>
.left-chose {
  margin: auto 0;
}
.nogoods {
  height: 100upx;
  text-align: center;
  color: #999999;
  line-height: 100upx;
}
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
    display: flex;
    font-size: 32upx;
    margin-right: 46upx;
  }
  .shop-car-img {
    width: 120upx;
    height: 120upx;
    margin-left: 32upx;
  }
  .shop-car-goodsDetail {
    margin-top: 56upx;
    display: flex;
    margin-left: 40upx;
  }
  .shop-car-goodsName {
    height: 34upx;
    font-size: 24upx;
    margin-bottom: 14upx;
    font-weight: 500;
    color: #3d3d3d;
    font-weight: 100%;
  }
  .shop-car-view-right-top {
    display: flex;
  }
  .shop-car-view-right {
    margin-left: 50upx;
    flex: 1;
  }
  .shop-car-money {
    font-size: 28upx;
    color: #fa5151;
    margin-top: 8upx;
    font-weight: 350;
  }
  .shop-car-goodsSpec {
    font-size: 20upx;
    color: #3d3d3d;
    margin-right: 26upx;
    font-weight: 350;
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
    // padding: 26upx;
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
.love-img {
  width: 37upx;
  height: 37upx;
  margin-right: 40upx;
}
.collection-shop-car {
  height: 40upx;
  width: 40upx;
}
.shop-car-redbackground-number {
  background: #fa5151;
  border-radius: 50%;
  position: relative;
  width: 30upx;
  height: 30upx;
  left: -6px;
  top: -6px;
}
.shop-car-redbackground-text {
  font-size: 24upx;
  position: absolute;
  right: 2upx;
  top: -2upx;
  color: white;
}
.delete-badgoods {
  display: flex;
  align-items: center;
  .delete-badgoods-img {
    height: 40upx;
    width: 40upx;
  }
  .delete-badgoods-text {
    font-size: 28upx;
    color: #999999;
  }
}
.shop-car-goods-choes {
  height: 34upx;
  width: 34upx;
}
</style>