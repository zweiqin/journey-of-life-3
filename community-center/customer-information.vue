<template>
  <view class="customer-information">
    <!--顶部完善服务信息-->
		<JHeader title="完善服务信息" width="50" height="50"></JHeader>
    <view class="top">
      <!--联系电话-->
      <view class="iphone-list">
				<tui-icon name="mobile" :size="40" unit="rpx" color="#fa5151" margin="0"></tui-icon>
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
      <!--填写上门地址-->
      <view class="address-list">
				<tui-icon name="gps" :size="40" unit="rpx" color="#fa5151" margin="0"></tui-icon>
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
          >所在地区
        </view>
        <view
          @click="handleChooseAddress"
          style="
            padding-top: 24upx;
            width: 78%;
            min-height: 90upx;
            border-radius: 20upx;
            padding-left: 20upx;
            box-sizing: border-box;
            font-size: 30upx;
            padding-right: 70rpx;
          "
        >
          <text v-if="!address" style="color: #808080">请选择服务地址</text>
          <text v-else>{{ address }}</text>
        </view>
				<view style="position: absolute;top: 20upx;right: 20upx;">
					<tui-icon name="mobile" :size="40" unit="rpx" color="#3662ec" margin="0"></tui-icon>
				</view>
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
				<view style="position: absolute;right: 20upx;bottom: 30upx;">
					<tui-icon name="feedback" :size="40" unit="rpx" color="#3662ec" margin="0"></tui-icon>
				</view>
      </view>
      <!--期望上门时间-->
      <view class="time-list">
        <view class="left">
					<tui-icon name="clock" :size="40" unit="rpx" color="#fa5151" margin="0"></tui-icon>
          <view class="text">期望上门时间</view>
        </view>

        <view class="right">
          <template>
            <view class="tiem-list">
              <chooseTime @choose="handleChoose" v-model="show"></chooseTime>
              <view class="choice-time" @click="show = true">
                <view class="input">{{ datetimerange || "选择时间" }}</view>
								<tui-icon name="arrowright" :size="40" unit="rpx" color="#999999" margin="0"></tui-icon>
              </view>
            </view>
          </template>
        </view>
      </view>
    </view>
    <!--服务数量加减-->
    <view class="middle">
      <view class="middle1">
        <view class="detail">
          <img
            :src="
              imgUrl ||
              require('../static/images/new-user/default-user-avatar.png')
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
					<tui-icon name="offline-fill" :size="48" unit="rpx" color="#d8d8d8" margin="0" @click="goodsdelete"></tui-icon>
          <view class="number">{{ number }}</view>
					<tui-icon name="add-fill" :size="48" unit="rpx" color="#e95d20" margin="0" @click="goodsadd"></tui-icon>
        </view>
      </view>
      <view v-if="id2 == 97" class="middle2">
        <view class="detail">
          <img
            :src="
              imgUrl ||
              require('../static/images/new-user/default-user-avatar.png')
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
					<tui-icon name="offline-fill" :size="48" unit="rpx" color="#d8d8d8" margin="0" @click="goodsdelete"></tui-icon>
          <view class="number">{{ specsId }}</view>
					<tui-icon name="add-fill" :size="48" unit="rpx" color="#e95d20" margin="0" @click="goodsadd"></tui-icon>
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
						<tui-icon name="arrowright" :size="40" unit="rpx" color="#999999" margin="0"></tui-icon>
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
    <!--底部按钮-->
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

    <!-- 选择地址 -->
    <TuanCity @confirm="handleConfirmAddress" ref="TuanCityRef"></TuanCity>
  </view>
</template>

<script>
import JCity from "../components/JCity/JCity.vue";
import chooseTime from "./componts/choose-time.vue";
import { T_SELECTED_ADDRESS, SF_INVITE_CODE } from "../constant";
import { getServicePriceApi } from "../api/community-center";
import { getUserId, getAdressDetailByLngLat } from "../utils";
import { getUserInfoByIdApi } from "../api/community-center";
import { getIsOpenServerAreaApi } from "../api/community-center";
import { getServiceOrderApi } from "../api/community-center";
export default {
  components: { JCity, chooseTime },
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
      // console.log(time)
      this.datetimerange = time;
      this.show = false;
    },

    changeLog(e) {
      // console.log('change事件:', e)
      this.time = e;
    },
    City(item) {
      // console.log(item)
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
        // console.log(this.phoneNumber.length)
        uni.showToast({
          title: "手机号格式错误",
          duration: 2000,
          icon: "none",
        });
      } else {
        this.getServiceOrder((abc) => {
          uni.redirectTo({
            url: `/community-center/confirm-order?name1=${
              this.name1
            }&oughtPrice=${this.oughtPrice}&content=${this.content}
        &consigneeName=${this.addname}&consigneeMobile=${
              this.phoneNumber
            }&consigneeAddress=${this.address}&consigneeAddressDetail=${
              this.addressDetail
            }
        &installDate=${this.datetimerange}&pricingType=${
              this.pricingType
            }&images=${JSON.stringify(this.images)}&data=${this.data}`,
          });
        });
      }
    },

    //新建社区订单
    async getServiceOrder(abc) {
      const partnerCode = uni.getStorageSync(SF_INVITE_CODE) || null;
      const data = {
        spotOrder: 0,
        isVipSetmeal: 0,
        userId: getUserId(),
        orderType: 1,
        pricingType: this.pricingType,
        paymentMethod: 1,
        deliveryType: 4,
        price: this.oughtPrice,
        actualPrice: this.oughtPrice,
        consigneeName: this.addname,
        consigneeMobile: this.phoneNumber,
        consigneeAddress: this.address,
        consigneeAddressDetail: this.addressDetail,
        remarks: this.content,
        installDate: this.datetimerange,
        dictName: this.name1,
        orderGoodsList: this.imgList,
        pullIn: this.name1 === "空调清洗服务" ? 2 : 1,
        
      };

      if (partnerCode) {
        data.partnerCode = partnerCode;
        data.spotOrder = 1;
      }
      const getServiceOrder = await getServiceOrderApi(data);
      uni.removeStorageSync(SF_INVITE_CODE);
      this.data = getServiceOrder.data;
      abc && typeof abc === "function" && abc(getServiceOrder.data);
      // console.log('订单号', this.data);
      uni.setStorageSync("communityOrder", this.data);
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
        // console.log('已经最少了')
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
        // console.log('已经最少了')
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
          price: this.price1,
          // userId: 127,
          // serverInfoId: 42,
          // quantity: 1,
          // horsepower: 0 ,
        });
        this.orderPrice = res.data;
        // console.log('订单报价', this.orderPrice)
        this.sumPrice = this.orderPrice.sumPrice;
        this.oughtPrice = this.orderPrice.oughtPrice;
      } else {
        const res = await getServicePriceApi({
          userId: getUserId(),
          serverInfoId: this.detailId2,
          quantity: this.number,
          price: this.price1,

          // userId: 127,
          // serverInfoId: 42,
          // quantity: 1,
          // horsepower: 0 ,
        });
        this.orderPrice = res.data;
        // console.log('订单报价', this.orderPrice)
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
      // console.log(res)
      // console.log('this.info', this.info)
      this.addname = this.info && this.info.contactName;
      // console.log('用户名', this.addname)
      this.phoneNumber = this.info && this.info.contactPhone;
      // console.log('手机号码', this.phoneNumber)
    },

    async a() {
      const res = await getIsOpenServerAreaApi({
        address: this.address,
      });

      // console.log('res', res)
      this.tips = res.data;
      // console.log('tips', this.tips)
      this.type = this.tips ? 1 : 2;
      // console.log('type', this.type)

      if (this.type == 2) {
        // console.log('区域判断', this.type)
        uni.showModal({
          title: "提示",
          content: "你选择的区域不在接单范围内",
          showCancel: true,
          // success: ({ confirm, cancel }) => {}
          success: function (res) {
            if (res.confirm) {
              // console.log('确定')
            } else if (res.confirm) {
              // console.log('取消')
            }
          },
        });
      }
    },

    //根据用户地址判断该区域是否开通了站长
    async getIsOpenServerArea() {
			// #ifdef APP
			const lastAddress = uni.getStorageSync(T_SELECTED_ADDRESS) || { data: {} }
			const currentAddress = (lastAddress.data.province || '') + (lastAddress.data.city || '') + (lastAddress.data.district || '') + (lastAddress.data.town || '')
			this.address = currentAddress
			this.a()
			this.s = lastAddress.data.detailAddress
			this.addressDetail = this.s.slice(this.address.length)
			// #endif
			// #ifndef APP
			await this.$store.dispatch('location/getCurrentLocation', (data) => {
				this.address = data.province + data.city + data.district
				this.a()
				this.addressDetail = data.detailAddress.slice(this.address.length)
			})
			// #endif
    },

    // 点击选择地址
    handleChooseAddress() {
      this.$refs.TuanCityRef.show();
    },

    // 确定选择地址
    handleConfirmAddress(selectInfo) {
      this.address = selectInfo.formatAddress4;
      this.a();
    },
  },
  created() {},
  onLoad(options) {
    // console.log(options)
    this.id2 = options.id1;
    // console.log('服务详情id', this.id2)
    this.specsId = options.specsId;
    this.price1 = options.price;
    this.name1 = options.name;
    this.unit1 = options.unit;
    this.detailId2 = options.detailId1;
    this.content = options.text;
    this.imgUrl = options.imgUrl;
    const a = options.priceType1;
    // console.log('是否一口价', a)
    if (a === "true") {
      this.pricingType = 1;
    } else {
      this.pricingType = 2;
    }

    this.images = JSON.parse(options.images);
    // console.log('images', this.images);
    const imgList = this.images.map((item) => {
      return { goodsType: "团蜂", goodsUrl: item };
    });
    // console.log('imgList', imgList);
    this.imgList = imgList;

    this.getServicePrice();
    this.getUserInfoById();
    this.getIsOpenServerArea();
  },
};
</script>

<style lang="less" scoped>
.customer-information {
  // background: #f1f2f6;
  padding-bottom: 168upx;

	/deep/ .j-header-wrapper {
    padding: 40upx 34upx 20upx 26upx;
		.title {
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
