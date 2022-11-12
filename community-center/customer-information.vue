<template>
  <view class="customer-information">
    <view class="title-list">
      <img
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
        alt=""
        class="return"
        @click="handleBack"
      />
      <view class="title">完善服务信息</view>
    </view>
    <view class="top">
      <view class="address-list">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ihtpa3x378wrofqdiqrj.png"
          alt=""
          class="location"
        />
        <view class="text">填写上门地址</view>
      </view>
      <JCity @confirm="City($event.area)" :text="address"> </JCity>

      <view class="add-list">
        <view class="detail-address">详细地址</view>
        <view class="addDetail">
          <textarea
            class="address"
            v-model="addressDetail"
            placeholder="请输入详细地址"
            placeholder-class="input-placeholder"
          />
        </view>
      </view>

      <!-- <view class="content"></view> -->
      <!-- <view class="people-list">
        <img src="" alt="" class="people" />
        <view class="text">联系人</view>
      </view> -->
      <!-- <view class="content"></view> -->
      <view class="iphone-list">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/vfu5gpaxvj4hbez4k7mr.png"
          alt=""
          class="iphone"
        />
        <view class="text">联系方式</view>
      </view>

      <view class="name-list">
        <view class="man">联系人</view>
        <view class="name">
          <input
            class="contact"
            v-model="addname"
            placeholder="姓名/称呼"
            placeholder-class="input-placeholder"
          />
        </view>
      </view>

      <view class="number-list">
        <view class="dihua">联系电话</view>
        <view class="phone-number">
          <input
            class="phone"
            v-model="phoneNumber"
            placeholder="手机号"
            placeholder-class="input-placeholder"
          />
        </view>
      </view>

      <!-- <view class="content"></view> -->
      <view class="time-list">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/t0ktlzvrfi9ionu9rr10.png"
          alt=""
          class="time"
        />
        <view class="text">上门时间</view>
        <!-- 
        <uni-section
          :title="'日期时间用法：' + datetimesingle"
          type="line"
        ></uni-section> -->

        <view class="example-body">
          <uni-datetime-picker
            class="datatime"
            type="datetime"
            v-model="datetimesingle"
            @change="changeLog"
            :clear-icon="false"
            :border="false"
          />
        </view>

        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/unclmibq0dktn12nodz0.png"
          alt=""
          class="more"
        />
      </view>
    </view>
    <view class="middle1">
      <view class="detail">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/tppymsocx2829zumrqls.png"
          alt=""
          class="goods"
        />
        <view class="item">
          <view class="text">{{ name1 }}</view>
          <template v-if="pricingType == 1">
            <view class="price-list">
              <view class="logo">￥</view>
              <view class="number">{{ price1 }}</view>
              <view class="point">.00</view>
              <view class="xie">/</view>
              <view class="unit">{{ unit1 }}</view>
            </view>
          </template>
          <!-- <view v-if="pricingType == 2"></view> -->
        </view>
      </view>
      <view class="add">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ie5tzuaheizwyypdp78e.png"
          alt=""
          class="img"
          @click="goodsdelete"
        />
        <view class="number">{{ number }}</view>
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/zvm9f03y096iyrjgbuk2.png"
          alt=""
          class="img"
          @click="goodsadd"
        />
      </view>
    </view>
    <view v-if="id2 == 97" class="middle2">
      <view class="detail">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/tppymsocx2829zumrqls.png"
          alt=""
          class="goods"
        />
        <view class="item">
          <view class="text">匹数</view>
          <!-- <view class="price-list">
            <view class="logo">￥</view>
            <view class="number">150</view>
            <view class="point">.00</view>
            <view class="xie">/</view>
            <view class="unit">台</view>
          </view> -->
        </view>
      </view>
      <view class="add">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ie5tzuaheizwyypdp78e.png"
          alt=""
          class="img"
          @click="piecedelete"
        />
        <view class="number">{{ specsId }}</view>
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/zvm9f03y096iyrjgbuk2.png"
          alt=""
          class="img"
          @click="pieceadd"
        />
      </view>
    </view>
    <view class="main">
      <template v-if="pricingType == 1">
        <view class="total-list">
          <view class="total">订单总额</view>
          <view class="price-list">
            <view class="logo">￥</view>
            <view class="number">{{ sumPrice }}</view>
          </view>
        </view>
        <view class="coupon-list">
          <view class="coupon">优惠券</view>
          <view class="text-list">
            <view class="text">暂无</view>
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/unclmibq0dktn12nodz0.png"
              alt=""
              class="more"
            />
          </view>
        </view>
        <view class="pay-list">
          <view class="pay">应付</view>
          <view class="price-list">
            <view class="logo">￥</view>
            <view class="number">{{ oughtPrice }}</view>
          </view>
        </view>
      </template>
    </view>
    <view class="foot1" v-if="pricingType == 1">
      <view class="price-list">
        <view class="logo">￥</view>
        <view class="number">{{ oughtPrice }}</view>
        <view class="point">.00</view>
      </view>
      <!-- <view v-else></view> -->
      <view class="to-pay" @click="handleToServiceConfirmOrder">确认下单</view>
    </view>

    <view class="foot2" v-if="pricingType == 2">
      <view class="to-pay" @click="handleToServiceConfirmOrder">确认下单</view>
    </view>
  </view>
</template>




<script>
import JCity from "../components/JCity/JCity.vue";
import { getServicePriceApi } from "../api/community-center";
import { getUserId } from "../utils";
export default {
  components: { JCity },
  name: "Customer-information",
  props: {},
  data() {
    return {
      id2: "",
      serverInfoId: "",
      specsId: "",
      number: 1,
      price1: "",
      addressDetail: "",
      address: "",
      name: "",
      phoneNumber: "",
      datetimesingle: "",
      time: "",
      pricingType: "",
      orderPrice: [],
      sumPrice: "",
      oughtPrice: "",
      name1: "",
      unit1: "",
      addname: "",
      horsepower: "",
      // userId:127,
      // serverInfoId:1,
    };
  },
  methods: {
    changeLog(e) {
      console.log("change事件:", e);
      this.time = e;
    },
    City(item) {
      console.log(item);
      this.address = item;
    },
    handleBack() {
      uni.navigateBack();
    },
    handleToServiceConfirmOrder() {
      uni.navigateTo({
        url: `/community-center/confirm-order?name1=${this.name1}&oughtPrice=${this.oughtPrice}&content=${this.content}
        &consigneeName=${this.addname}&consigneeMobile=${this.phoneNumber}&consigneeAddress=${this.address}&consigneeAddressDetail=${this.addressDetail}
        &installDate=${this.datetimesingle}&pricingType=${this.pricingType}`,
      });
    },

    //安装数量加减
    goodsadd() {
      if (this.number > 0 || this.number == 1) {
        this.number++;
        this.getServicePrice();
      }
    },
    goodsdelete() {
      if (this.number < 0 || this.number == 1) {
        console.log("已经最少了");
      } else {
        this.number--;
        this.getServicePrice();
      }
    },

    //匹数加减
    pieceadd() {
      if (this.specsId > 0 || this.specsId == 1) {
        this.specsId++;
        this.getServicePrice();
      }
    },
    piecedelete() {
      if (this.specsId < 0 || this.specsId == 1) {
        console.log("已经最少了");
      } else {
        this.specsId--;
        this.getServicePrice();
      }
    },

    //获取订单报价
    async getServicePrice() {
      if (this.id2 == 97) {
        const res = await getServicePriceApi({
          userId: getUserId(),
          serverInfoId: this.detailId2 * 1,
          quantity: this.number,
          horsepower: this.specsId * 1,
          // userId: 127,
          // serverInfoId: 42,
          // quantity: 1,
          // horsepower: 0 ,
        });
        this.orderPrice = res.data;
        console.log("订单报价", this.orderPrice);
        this.sumPrice = this.orderPrice.sumPrice;
        this.oughtPrice = this.orderPrice.oughtPrice;
      } else {
        const res = await getServicePriceApi({
          userId: getUserId(),
          serverInfoId: this.detailId2,
          quantity: this.number,

          // userId: 127,
          // serverInfoId: 42,
          // quantity: 1,
          // horsepower: 0 ,
        });
        this.orderPrice = res.data;
        console.log("订单报价", this.orderPrice);
        this.sumPrice = this.orderPrice.sumPrice;
        this.oughtPrice = this.orderPrice.oughtPrice;
      }
    },
  },
  created() {},
  onLoad(options) {
    console.log(options);
    this.id2 = options.id1;
    console.log("服务详情id", this.id2);
    this.specsId = options.specsId;
    this.price1 = options.price;
    this.name1 = options.name;
    this.unit1 = options.unit;
    this.detailId2 = options.detailId1;
    this.content = options.text;
    const a = options.priceType1;
    console.log("是否一口价", a);
    if (a === "true") {
      this.pricingType = 1;
    } else {
      this.pricingType = 2;
    }

    this.getServicePrice();
  },
};
</script>




<style lang="less" scoped>
.customer-information {
  background: #f1f2f6;

  .title-list {
    padding: 20upx 34upx 20upx 26upx;
    display: flex;
    background: #ffffff;
    .return {
      width: 48upx;
      height: 48upx;
    }
    .title {
      flex: 1;
      text-align: center;
      font-size: 36upx;
      font-weight: bold;
      color: #3d3d3d;
    }
  }
  .top {
    padding: 30upx 12upx 0upx 12upx;
    background: #ffffff;
    .address-list {
      display: flex;
      align-items: center;
      width: 100%;
      .location {
        width: 40upx;
        height: 40upx;
        padding-right: 16upx;
      }
      .text {
        font-size: 32upx;
        font-weight: bold;
        color: #000000;
        flex: 1;
      }
      .example-body {
        .uni-input-input {
          color: #fa5151;
          font-size: 32upx;
        }
      }
      .more {
        width: 40upx;
        height: 40upx;
      }
    }

    .add-list {
      display: flex;
      justify-content: space-between;
      .detail-address {
        height: 140upx;
        display: flex;
        align-items: center;
      }

      .addDetail {
        margin-left: 0upx;
        padding-top: 20upx;
        width: 80%;
        height: 140upx;
        .address {
          // height: 90upx;
          line-height: 40upx;
          width: 100%;
          height: 110upx;
          border-radius: 10upx;
          background: #f1f2f6;
        }
        .input-placeholder {
          display: flex;
          align-items: center;
        }
      }
    }

    .content {
      width: 90%;
      border-bottom: 2upx solid #d8d8d8;
      margin: 30upx 0 20upx 54upx;
    }
    .people-list {
      display: flex;
      align-items: center;
      padding-top: 28upx;
      .people {
        width: 40upx;
        height: 40upx;
        padding-right: 16upx;
      }
      .text {
        font-size: 32upx;
        font-weight: bold;
        color: #000000;
      }
    }
    .iphone-list {
      display: flex;
      align-items: center;
      padding-top: 28upx;
      .iphone {
        width: 40upx;
        height: 40upx;
        padding-right: 16upx;
      }
      .text {
        font-size: 32upx;
        font-weight: bold;
        color: #000000;
      }
    }

    .name-list {
      display: flex;
      justify-content: space-between;
      .man {
        height: 140upx;
        display: flex;
        align-items: center;
      }
      .name {
        margin-left: 0upx;
        padding-top: 20upx;
        .contact {
          width: 580upx;
          height: 90upx;
          border-radius: 10upx;
          background: #f1f2f6;
        }
      }
    }


    .number-list{
      display: flex;
      justify-content: space-between;
      .dihua{
        height: 140upx;
        display: flex;
        align-items: center;
      }
    .phone-number {
      margin-left: 0upx;
      padding-top: 20upx;
      .phone {
        width: 580upx;
        height: 90upx;
        border-radius: 10upx;
        background: #f1f2f6;
      }
    }

  }

    .time-list {
      display: flex;
      align-items: center;
      padding-top: 28upx;
      padding-bottom: 80upx;
      width: 100%;
      .time {
        width: 40upx;
        height: 40upx;
        padding-right: 16upx;
      }
      .text {
        font-size: 32upx;
        font-weight: bold;
        color: #000000;
        flex: 1;
      }
      .number {
        font-size: 32upx;
        color: #fa5151;
        flex: 2;
      }
      .more {
        width: 40upx;
        height: 40upx;
      }
    }
  }
  .middle1 {
    width: 100%;
    height: 200upx;
    background: #ffffff;
    margin-top: 20upx;
    margin-bottom: 20upx;
    display: flex;
    padding-top: 52upx;
    justify-content: space-between;
    .detail {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 460upx;
      height: 100upx;
      // padding-top: 50upx;
      .goods {
        width: 212upx;
        height: 96upx;
      }
      .item {
        width: 200upx;
        .text {
          padding-left: 6upx;
          font-size: 32upx;
          color: #3d3d3d;
        }
        .price-list {
          display: flex;
          align-items: center;
          .logo {
            font-size: 36upx;
            font-weight: 500;
            color: #fa5151;
          }
          .number {
            font-size: 36upx;
            font-weight: 700;
            color: #fa5151;
          }
          .point {
            font-size: 36upx;
            font-weight: 700;
            color: #fa5151;
          }
          .xie {
            font-size: 28upx;
            font-weight: 400;
          }
          .unit {
            font-size: 28upx;
            font-weight: 400;
          }
        }
      }
    }
    .add {
      padding-top: 20upx;
      padding-right: 30upx;
      width: 160upx;
      height: 50upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .img {
        width: 48upx;
        height: 48upx;
      }
      .number {
        font-size: 32upx;
        font-weight: 500;
        color: #3d3d3d;
      }
    }
  }
  .middle2 {
    width: 100%;
    height: 200upx;
    background: #ffffff;
    margin-top: 20upx;
    margin-bottom: 20upx;
    display: flex;
    padding-top: 52upx;
    justify-content: space-between;
    .detail {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 460upx;
      height: 100upx;
      // padding-top: 50upx;
      .goods {
        width: 212upx;
        height: 96upx;
      }
      .item {
        width: 200upx;
        .text {
          padding-left: 6upx;
          font-size: 32upx;
          color: #3d3d3d;
        }
        .price-list {
          display: flex;
          align-items: center;
          .logo {
            font-size: 36upx;
            font-weight: 500;
            color: #fa5151;
          }
          .number {
            font-size: 36upx;
            font-weight: 700;
            color: #fa5151;
          }
          .point {
            font-size: 36upx;
            font-weight: 700;
            color: #fa5151;
          }
          .xie {
            font-size: 28upx;
            font-weight: 400;
          }
          .unit {
            font-size: 28upx;
            font-weight: 400;
          }
        }
      }
    }
    .add {
      padding-top: 20upx;
      padding-right: 30upx;
      width: 160upx;
      height: 50upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .img {
        width: 48upx;
        height: 48upx;
      }
      .number {
        font-size: 32upx;
        font-weight: 500;
        color: #3d3d3d;
      }
    }
  }
  .main {
    background: #ffffff;
    padding: 46upx 22upx 0upx 34upx;
    width: 100%;
    height: 800upx;
    box-sizing: border-box;
    .total-list {
      display: flex;
      width: 100%;
      .total {
        font-size: 32upx;
        font-weight: bold;
        color: #3d3d3d;
        flex: 1;
      }
      .price-list {
        display: flex;
        padding-right: 18upx;
        .logo {
          font-size: 32upx;
          font-weight: bold;
          color: #3d3d3d;
        }
        .number {
          font-size: 32upx;
          font-weight: bold;
          color: #3d3d3d;
        }
      }
    }
    .coupon-list {
      display: flex;
      width: 100%;
      padding-top: 40upx;
      .coupon {
        font-size: 32upx;
        font-weight: bold;
        color: #3d3d3d;
        flex: 1;
      }
      .text-list {
        display: flex;
        .text {
          font-size: 32upx;
          font-weight: 500;
          color: #999999;
        }
        .more {
          width: 40upx;
          height: 40upx;
        }
      }
    }
    .pay-list {
      display: flex;
      width: 100%;
      padding-top: 40upx;
      .pay {
        font-size: 32upx;
        font-weight: bold;
        color: #3d3d3d;
        flex: 1;
      }
      .price-list {
        display: flex;
        padding-right: 18upx;
        .logo {
          font-size: 32upx;
          font-weight: bold;
          color: #fa5151;
        }
        .number {
          font-size: 32upx;
          font-weight: bold;
          color: #fa5151;
        }
      }
    }
  }
  .foot1 {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #ffffff;
    width: 100%;
    height: 168upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26upx 20upx;
    box-sizing: border-box;
    border-top: 4upx solid #f1f2f6;
    .price-list {
      display: flex;
      .logo {
        font-size: 48upx;
        font-weight: bold;
        color: #fa5151;
      }
      .number {
        font-size: 48upx;
        font-weight: bold;
        color: #fa5151;
      }
      .point {
        font-size: 48upx;
        font-weight: bold;
        color: #fa5151;
      }
    }
    .to-pay {
      width: 310upx;
      height: 80upx;
      border-radius: 100upx;
      background: linear-gradient(270deg, #e95e20 0%, #ff8f1f 100%);
      font-size: 32upx;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      line-height: 70upx;
    }
  }
  .foot2 {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #ffffff;
    width: 100%;
    height: 168upx;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 26upx 20upx;
    box-sizing: border-box;
    border-top: 4upx solid #f1f2f6;
    .to-pay {
      width: 310upx;
      height: 80upx;
      border-radius: 100upx;
      background: linear-gradient(270deg, #e95e20 0%, #ff8f1f 100%);
      font-size: 32upx;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      line-height: 70upx;
    }
  }
}
</style>
