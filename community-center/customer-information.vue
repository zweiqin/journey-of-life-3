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
      <view class="iphone-list">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/vfu5gpaxvj4hbez4k7mr.png"
          alt=""
          class="iphone"
        />
        <view class="text">联系电话</view>
      </view>

      <view class="name-list">
        <view class="man">联系人</view>
        <view class="name">
          <input
            class="contact"
            v-model="addname"
            placeholder="(请输入姓名)"
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
            placeholder="请输入手机号"
            placeholder-class="input-placeholder"
          />
        </view>
      </view>
      <view class="address-list">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ihtpa3x378wrofqdiqrj.png"
          alt=""
          class="location"
        />
        <view class="text">填写上门地址</view>
      </view>

      <view
        class="area"
        style="
          position: relative;
          display: flex;
          justify-content: space-between;
          margin-top: 30upx;
          border-bottom: 2upx solid #d8d8d8;
        "
      >
        <view
          class="diqu"
          style="
            height: 90upx;
            display: flex;
            align-items: center;
            font-size: 32upx;
            color: #3662ec;
          "
          >所在地区</view
        >
        <JCity
          @confirm="City($event.area)"
          :text="address"
          style="
            padding-top: 24upx;
            width: 78%;
            height: 90upx;
            border-radius: 20upx;
            padding-left: 20upx;
            box-sizing: border-box;
            font-size: 30upx;
          "
        >
        </JCity>

        <!-- <JIcon
          type="locale"
          width="34"
          height="40"
          style="position: absolute; top: 20upx; right: 20upx"
        ></JIcon> -->
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/kl48nylx52l3vy6f5bj9.png"
          alt=""
          class="location"
          style="
            width: 40upx;
            height: 40upx;
            position: absolute;
            top: 20upx;
            right: 20upx;
          "
        />
      </view>

      <view class="add-list">
        <view class="detail-address">详细地址</view>
        <view class="addDetail">
          <textarea
            name="input"
            class="address"
            v-model="addressDetail"
            placeholder="(请输入详细地址)"
            placeholder-class="input-placeholder"
          />
        </view>
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/zq3azkzz4bf57d9dh753.png"
          alt=""
          class="edit"
          style="
            width: 32upx;
            height: 32upx;
            position: absolute;
            right: 20upx;
            bottom: 30upx;
          "
        />
      </view>

      <view class="time-list">
        <view class="left">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/t0ktlzvrfi9ionu9rr10.png"
            alt=""
            class="time"
          />
          <view class="text">期望上门时间</view>
        </view>

        <view class="right">
          <!-- <uni-section
            :title="'日期时间范围用法：' + '[' + datetimerange + ']'"
            type="line"
          ></uni-section>
          <view class="example-body">
            <uni-datetime-picker
              v-model="datetimerange"
              type="datetimerange"
              rangeSeparator="至"
            />
          </view> -->

          <template>
            <view class="tiem-list">
              <chooseTime @choose="handleChoose" v-model="show"></chooseTime>
              <!-- <button class="btn-show-btn" @click="show = true"></button> -->

              <view class="choice-time" @click="show = true">
                <view class="input">{{ datetimerange || "选择时间" }}</view>
                <img
                  src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/unclmibq0dktn12nodz0.png"
                  alt=""
                  class="btn-show-btn"
                />
              </view>
            </view>
          </template>
        </view>
      </view>
    </view>

    <view class="middle">
      <view class="middle1">
        <view class="detail">
          <img
            :src="
              imgUrl ||
              'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9k786yg2qqbj7u35zwr5.png'
            "
            alt=""
            class="goods"
          />
          <view class="item">
            <view class="text">{{ name1 }}</view>
            <template v-if="pricingType == 1">
              <view class="price-list">
                <view class="logo">￥</view>
                <view class="number">{{ price1 }}</view>
                <view class="point"></view>
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
            :src="
              imgUrl ||
              'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9k786yg2qqbj7u35zwr5.png'
            "
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
    <view
      class="foot1"
      :style="{
        transform: show ? 'translateY(168upx)' : 'translateY(0)',
      }"
      v-if="pricingType == 1"
    >
      <view class="price-list">
        <view class="logo">￥</view>
        <view class="number">{{ oughtPrice }}</view>
        <view class="point"></view>
      </view>
      <!-- <view v-else></view> -->
      <view class="to-pay" @click="handleToServiceConfirmOrder">确认下单</view>
    </view>
    <view
      class="foot2"
      :style="{
        transform: show ? 'translateY(168upx)' : 'translateY(0)',
      }"
      v-if="pricingType == 2"
    >
      <view class="to-pay" @click="handleToServiceConfirmOrder">确认下单</view>
    </view>
  </view>
</template>




<script>
import JCity from "../components/JCity/JCity.vue";
import chooseTime from "./componts/choose-time.vue";
import { getServicePriceApi } from "../api/community-center";
import { getUserId } from "../utils";
import { getAdressDetailByLngLat } from "../utils/DWHutils";
import { getUserInfoByIdApi } from "../api/community-center";
import { getIsOpenServerAreaApi } from "../api/community-center";

export default {
  components: { JCity, Location, chooseTime },
  name: "Customer-information",
  props: {},
  data() {
    return {
      show: false,
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
      datetimerange: "",
      time: "",
      pricingType: "",
      orderPrice: [],
      info: [],
      sumPrice: "",
      oughtPrice: "",
      name1: "",
      unit1: "",
      addname: "",
      horsepower: "",
      imgUrl: "",
      length: "",
      contactName: "",
      contactPhone: "",
      // userId:127,
      // serverInfoId:1,
    };
  },

  methods: {
    handleChoose(time) {
      console.log(time);
      this.datetimerange = time;
    },

    changeLog(e) {
      console.log("change事件:", e);
      this.time = e;
    },
    City(item) {
      console.log(item);
      this.address = item;
      this.a();

      // if( this.type ==2 ){
      //   console.log("区域判断", this.type);
      //   uni.showModal({
      //     title: "提示",
      //     content: "你所在区域不在接单范围内",
      //     showCancel: true,
      //     // success: ({ confirm, cancel }) => {}
      //     success: function (res) {
      //       if (res.confirm) {
      //         console.log("确定");
      //         // uni.navigateTo({
      //         //   url: `/community-center/community-detail?id=${id}&serverNameThree=${name}&serverImageUrl=${item.serverImageUrl}`,
      //         // });
      //       } else if (res.confirm) {
      //         console.log("取消");
      //       }
      //     },
      //   });
      // }
    },
    handleBack() {
      uni.navigateBack();
    },

    handleToServiceConfirmOrder() {
      // uni.showToast({
      //   title: "请完善服务信息",
      //   icon: "none",
      //   duration: 2000,
      // });

      if (
        !this.address ||
        !this.addressDetail ||
        !this.addname ||
        !this.phoneNumber ||
        !this.datetimerange
      ) {
        console.log(
          this.address &&
            this.addressDetail &&
            this.addname &&
            this.phoneNumber &&
            this.datetimerange
        );
        // uni.navigateTo({
        //   url: `/community-center/confirm-order?name1=${this.name1}&oughtPrice=${this.oughtPrice}&content=${this.content}
        // &consigneeName=${this.addname}&consigneeMobile=${this.phoneNumber}&consigneeAddress=${this.address}&consigneeAddressDetail=${this.addressDetail}
        // &installDate=${this.datetimesingle}&pricingType=${this.pricingType}`,
        // });

        uni.showToast({
          title: "请完善服务信息",
          icon: "none",
          duration: 2000,
        });
      } else if (this.phoneNumber.length !== 11) {
        console.log(this.phoneNumber.length);
        uni.showToast({
          title: "手机号格式错误",
          duration: 2000,
          icon: "none",
        });
      } else {
        uni.navigateTo({
          url: `/community-center/confirm-order?name1=${this.name1}&oughtPrice=${this.oughtPrice}&content=${this.content}
        &consigneeName=${this.addname}&consigneeMobile=${this.phoneNumber}&consigneeAddress=${this.address}&consigneeAddressDetail=${this.addressDetail}
        &installDate=${this.datetimerange}&pricingType=${this.pricingType}`,
        });
      }
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

    //查询用户过往信息
    async getUserInfoById() {
      const res = await getUserInfoByIdApi({
        userId: getUserId(),
      });
      this.info = res.data;
      console.log(res);
      console.log("this.info", this.info);
      this.addname = this.info.contactName;
      console.log("用户名", this.addname);
      this.phoneNumber = this.info.contactPhone;
      console.log("手机号码", this.phoneNumber);
    },

    async a() {
      console.log(123456);
      const res = await getIsOpenServerAreaApi({
        address: this.address,
      });

      console.log("res", res);
      this.tips = res.data;
      console.log("tips", this.tips);
      this.type = this.tips ? 1 : 2;
      console.log("type", this.type);

      if (this.type == 2) {
        console.log("区域判断", this.type);
        uni.showModal({
          title: "提示",
          content: "你选择的区域不在接单范围内",
          showCancel: true,
          // success: ({ confirm, cancel }) => {}
          success: function (res) {
            if (res.confirm) {
              console.log("确定");
            } else if (res.confirm) {
              console.log("取消");
            }
          },
        });
      }
    },

    //根据用户地址判断该区域是否开通了站长
    async getIsOpenServerArea() {
      const _this = this;
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          getAdressDetailByLngLat(res.latitude, res.longitude).then((res) => {
            if (res.status === 0) {
              const result = res.result;
              // _this.addressDetail = result.address_reference.town.title;
              // console.log("this.addressDetail", _this.addressDetail);
              _this.address =
                result.address_component.province +
                result.address_component.city +
                result.address_component.district;
              console.log("this.address", _this.address);
              
              _this.a();

              _this.addressDetail = result.address_reference.town.title;
              console.log("this.addressDetail", _this.addressDetail);
            }
          });
        },
      });
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
    this.imgUrl = options.imgUrl;
    const a = options.priceType1;
    console.log("是否一口价", a);
    if (a === "true") {
      this.pricingType = 1;
    } else {
      this.pricingType = 2;
    }

    this.getServicePrice();
    this.getUserInfoById();
    this.getIsOpenServerArea();

    // const _this = this;
    // uni.getLocation({
    //   type: "gcj02",
    //   success: function (res) {
    //     getAdressDetailByLngLat(res.latitude, res.longitude).then((res) => {
    //       if (res.status === 0) {
    //         const result = res.result;
    //         _this.address =
    //           result.address_component.province +
    //           result.address_component.city +
    //           result.address_component.district;

    //         _this.addressDetail = result.address_component.street_number;
    //       }
    //     });
    //   },
    // });
  },
};
</script>




<style lang="less" scoped>
.customer-information {
  // background: #f1f2f6;
  padding-bottom: 168upx;

  .title-list {
    padding: 40upx 34upx 20upx 26upx;
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
    padding: 20upx 30upx 0upx 30upx;
    background: #ffffff;
    .address-list {
      display: flex;
      align-items: center;
      // width: 36%;
      width: 250upx;
      justify-content: space-between;
      margin-top: 50upx;
      .location {
        width: 40upx;
        height: 40upx;
      }
      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #000000;
      }

      .more {
        width: 40upx;
        height: 40upx;
      }
    }

    .add-list {
      position: relative;
      display: flex;
      // justify-content: space-between;
      width: 100%;
      height: 140upx;
      padding-top: 30upx;
      border-bottom: 2upx solid #d8d8d8;
      .detail-address {
        height: 100%;
        display: flex;
        margin-top: 10upx;
        font-size: 32upx;
        // font-weight: bold;
        color: #3662ec;
      }

      .addDetail {
        margin-left: 0upx;
        padding-top: 12upx;
        width: 70%;
        height: 100%;
        // background: #f1f2f6;
        border-radius: 20upx;

        .address {
          line-height: 40upx;
          width: 100%;
          height: 100%;
          border-radius: 20upx;
          // background: #f1f2f6;
          margin-bottom: 0upx;
          padding-left: 42upx;
          box-sizing: border-box;
          font-size: 30upx;
        }
        .input-placeholder {
          // display: flex;
          // align-items: center;
          padding-left: 0upx;
          box-sizing: border-box;
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
      justify-content: space-between;
      padding-top: 0upx;
      // width: 27%;
      width: 186upx;
      .iphone {
        width: 40upx;
        height: 40upx;
      }
      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #000000;
      }
    }

    .name-list {
      border-bottom: 2upx solid #d8d8d8;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 80upx;
      // margin-top: 30upx;
      .man {
        display: flex;
        align-items: center;
        font-size: 32upx;
        // font-weight: bold;
        color: #3662ec;
      }
      .name {
        margin-left: 0upx;
        padding-top: 0upx;
        width: 78%;
        height: 100%;

        .contact {
          width: 100%;
          height: 100%;
          border-radius: 20upx;
          // background: #f1f2f6;
          padding-left: 20upx;
          box-sizing: border-box;
          font-size: 30upx;
        }
        .input-placeholder {
          padding-left: 0upx;
          box-sizing: border-box;
        }
      }
    }

    .number-list {
      border-bottom: 2upx solid #d8d8d8;
      margin-top: 30upx;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 80upx;
      .dihua {
        display: flex;
        align-items: center;
        font-size: 32upx;
        // font-weight: bold;
        color: #3662ec;
      }
      .phone-number {
        width: 78%;
        height: 100%;
        margin-left: 0upx;
        padding-top: 0upx;

        .phone {
          width: 100%;
          height: 100%;
          border-radius: 20upx;
          // background: #f1f2f6;
          padding-left: 20upx;
          box-sizing: border-box;
          font-size: 30upx;
        }
        .input-placeholder {
          padding-left: 0upx;
          box-sizing: border-box;
        }
      }
    }

    .time-list {
      // display: flex;
      // align-items: center;
      // justify-content: space-between;
      padding-top: 50upx;
      padding-bottom: 40upx;
      width: 100%;

      .left {
        // width: 27%;
        width: 250upx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .time {
          width: 40upx;
          height: 40upx;
          // padding-right: 16upx;
        }
        .text {
          font-size: 32upx;
          font-weight: 500;
          color: #000000;
          // flex: 1;
        }
      }
      .right {
        // display: flex;
        // align-items: center;
        // justify-content: flex-end;
        // width: 60%;
        // width: 290upx;
        padding-top: 30upx;
        width: 100%;
        .tiem-list {
          .choice-time {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .input {
              // padding-left: 300upx;
              text-align: center;
              width: 100%;
              white-space: nowrap;
              font-size: 32upx;
              color: #fa5151;
              // border: 2upx solid #d8d8d8;
            }
            .btn-show-btn {
              width: 40upx;
              height: 40upx;
              // z-index: 1;
              position: static;

              &::after {
                position: static;
              }
            }
          }
        }

        .example-body {
          .uni-input-input {
            color: #fa5151;
            font-size: 32upx;
          }

          .datatime {
          }
        }
      }

      // .number {
      //   font-size: 32upx;
      //   color: #fa5151;
      //   flex: 2;
      // }
    }
  }

  .middle {
    background: #f1f2f6;
    padding-top: 20upx;
    padding-bottom: 20upx;
    .middle1 {
      width: 100%;
      height: 170upx;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
      // height: 170upx;
      background: #ffffff;
      margin-top: 20upx;
      display: flex;
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
  }

  .main {
    background: #ffffff;
    padding: 46upx 22upx 20upx 34upx;
    width: 100%;
    // height: 800upx;
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
        align-items: center;
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
    transform: translateY(-168upx);
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
      font-weight: bold;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      // text-align: center;
      // line-height: 70upx;
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
      font-weight: bold;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      // text-align: center;
      // line-height: 70upx;
    }
  }

  // .btn-show-btn {
  //   z-index: 1;
  //   position: static;

  //   &::after {
  //     position: static;
  //   }
  // }
}
</style>
