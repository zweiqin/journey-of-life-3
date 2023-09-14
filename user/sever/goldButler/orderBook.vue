<template>
  <view class="orderbook">
    <image src="../../../static/images/center/back.png" mode="" @click="handleBack" class="back" />
    <view class="main">
      <view class="type">
        <view class="t-left">服务类型</view>
        <view class="t-right">{{ orderInfo.serverContent }}</view>
      </view>
      <view class="time">
        <view class="time-name">上门时间</view>
        <view class="time-number">
          <view class="tiem-list">
            <chooseTime @choose="handleChoose" v-model="show" style="z-index: 1"></chooseTime>
            <view class="choice-time" @click="show = true">
              <view class="input">{{ datetimerange || '请选择上门时间' }}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="img-upload">
        <view class="img-name">图片上传</view>
        <view class="upload-list">
          <view class="upload-pane">
            <view style="display: flex; flex-wrap: wrap">
              <view v-for="img in images" :key="img" style="position: relative; width: 110upx; height: 110upx; margin-right: 20upx; margin-bottom: 20upx">
                <img :src="img" alt="" class="img1" />
                <img
                  src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/qqzm2u887derediugqlf.png"
                  alt=""
                  class="img2"
                  @click="removeBackground(img)"
                />
              </view>
            </view>

            <view @click="chooseImg" class="upload" v-if="!imgUrl" style="margin-right: 6upx">+</view>

            <image v-else-if="imgUrl" class="iamge-background" :src="imgUrl" mode="" />
          </view>
        </view>
      </view>
      <view class="notice">
        <view class="notice-name">备注</view>
        <view class="notice-content">
          <view class="content">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              class="show"
              placeholder="请填写尺寸、体积、重量等信息,方便师傅带齐工具(您上传的照片非常重要哦~)"
              v-model="text"
            ></textarea>
            <view class="list">
              <view class="number">{{ text.length }}/140</view>
              <view class="example">示例</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="foot">
      <view class="book" @click="handleToOrder">提交预约</view>
    </view>
  </view>
</template>

<script>
import { getSetMealListApi, reservationServiceApi } from '../../../api/user';
import { USER_TOKEN, COMMUNITY_ORDER_NO } from '../../../constant';
import { getUserId } from '../../../utils';
import chooseTime from '../../../community-center/componts/choose-time.vue';
export default {
  components: { chooseTime },
  name: 'OrderBook',
  props: {
    imgUrl: String
  },
  data() {
    return {
      img: '',
      images: [],
      text: '',
      show: false,
      datetimerange: '',
      typeName: '',

      // 代文辉
      orderInfo: {}
    };
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
    //提交预约
    handleToOrder() {
      if (!this.datetimerange || !this.images) {
        uni.showToast({
          title: '请完善服务信息',
          icon: 'none',
          duration: 2000
        });
      } else {
        this.reservationService();
      }
    },
    //图片上传
    chooseImg() {
      const _this = this;
      uni.chooseImage({
        success: (chooseImageRes) => {
          for (const imgFile of chooseImageRes.tempFiles) {
            uni.showLoading();
            uni.uploadFile({
              url: 'https://www.tuanfengkeji.cn:9527/dts-app-api/wx/storage/upload',
              filePath: imgFile.path,
              name: 'file',
              formData: {
                token: USER_TOKEN,
                userId: getUserId()
              },
              success: (uploadFileRes) => {
                uni.hideLoading();
                _this.images.push(JSON.parse(uploadFileRes.data).data.url);
              }
            });
          }
          return;
        }
      });
    },
    removeBackground(img) {
      const _this = this;
      uni.showModal({
        title: '提示',
        content: '确定删除当前图片吗？',
        success: function (res) {
          if (res.confirm) {
            const index = _this.images.findIndex((item) => item === img);
            _this.images.splice(index, 1);
          }
        }
      });
    },
    handleChoose(time) {
      console.log(time);
      this.datetimerange = time;
      this.show = false;
    },
    //获取套餐列表
    async getSetMealList() {
      const res = await getSetMealListApi({
        userId: getUserId()
      });
      this.getdata = res.data;
      this.belongsToZzUserId = this.getdata[0].belongsToZzUserId;
      console.log('belongsToZzUserId', this.belongsToZzUserId);
      this.parentOrderNo = this.getdata[0].orderNo;
      this.price = this.getdata[0].price;
      this.actualPrice = this.getdata[0].actualPrice;
      this.consigneeName = this.getdata[0].consigneeName;
      this.consigneeMobile = this.getdata[0].consigneeMobile;
      this.consigneeAddress = this.getdata[0].consigneeAddress;
      this.consigneeAddressDetail = this.getdata[0].consigneeAddressDetail;
      this.serverName = this.getdata[0].serverName;
    },
    //预约服务
    async reservationService() {
      uni.showLoading({
        title: '提交预约中...',
        mask: true
      });
      const res = await reservationServiceApi({
        // belongsToZzUserId: this.belongsToZzUserId,
        // parentOrderNo: this.parentOrderNo,
        // isVipSetmeal: 1,
        // userId: getUserId(),
        // orderType: 1,
        // pricingType: 1,
        // paymentMethod: 1,
        // deliveryType: 4,
        // price: this.price,
        // actualPrice: this.actualPrice,
        // consigneeName: this.consigneeName,
        // consigneeMobile: this.consigneeMobile,
        // consigneeAddress: this.consigneeAddress,
        // consigneeAddressDetail: this.consigneeAddressDetail,
        // remarks: this.text,
        // installDate: this.datetimerange,
        // dictName: this.typeName,
        // serverName: this.serverName,
        // orderGoodsList: this.images.map(item => { return { goodsType: '团蜂', goodsUrl: item } })

        belongsToZzUserId: this.orderInfo.belongsToZzUserId,
        parentOrderNo: this.orderInfo.orderNo, // TODO: parentOrderNo 还是 orderNo
        isVipSetmeal: 1,
        userId: getUserId(),
        orderType: 1,
        pricingType: 1,
        paymentMethod: 1,
        deliveryType: 4,

        price: this.orderInfo.price,
        actualPrice: this.orderInfo.actualPrice,
        consigneeName: this.orderInfo.consigneeName,
        consigneeMobile: this.orderInfo.consigneeMobile,
        consigneeAddress: this.orderInfo.consigneeAddress,
        consigneeAddressDetail: this.orderInfo.consigneeAddressDetail,
        remarks: this.text,
        installDate: this.datetimerange,
        dictName: this.orderInfo.serverContent,
        serverName: this.orderInfo.serverName,
        orderGoodsList: this.images.map((item) => {
          return { goodsType: '团蜂', goodsUrl: item };
        })
      });

      uni.hideLoading();

      this.orderNoData = res.data;

      this.ttoast('预约成功');
      setTimeout(() => {
        // uni.navigateTo({ url: '/community-center/order' })
        uni.switchTab({
          url: '/pages/order/order'
        });
      }, 1000);
    }
  },
  created() {},
  onLoad(options) {
    // console.log(options)
    // this.typeName = options.name
    // console.log('服务类型', this.typeName);
    // uni.removeStorageSync(COMMUNITY_ORDER_NO)
    // this.getSetMealList()
    // // this.reservationService()

    console.log(JSON.parse(options.orderInfo));

    this.orderInfo = JSON.parse(options.orderInfo);
  }
};
</script>

<style lang="scss" scoped>
.orderbook {
  width: 100vw;
  min-height: 100vh;
  background: #f6f6f5;

  .back {
    width: 24upx;
    height: 48upx;
    padding-top: 36upx;
    padding-left: 40upx;
  }

  .main {
    margin: 36upx 20upx 0 20upx;
    background: #ffffff;
    padding: 68upx 28upx 54upx 28upx;
    border-radius: 24upx;

    .type {
      white-space: nowrap;
      padding-bottom: 60upx;
      font-size: 28upx;
      color: #141000;
      display: flex;

      .t-left {
        padding-right: 46upx;
      }

      .t-right {
      }
    }

    .time {
      white-space: nowrap;
      padding-bottom: 50upx;
      font-size: 28upx;
      color: #141000;
      display: flex;

      .time-name {
        padding-right: 46upx;
      }

      .time-number {
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
              font-size: 28upx;
              color: #141000;
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
      }
    }

    .img-upload {
      padding-bottom: 22upx;
      font-size: 28upx;
      color: #141000;
      display: flex;

      .img-name {
        white-space: nowrap;
        padding-right: 46upx;
      }

      .upload-list {
        .upload-pane {
          border-radius: 20upx;
          display: flex;
          flex-wrap: wrap;

          .delete-icon {
            width: 32upx;
            height: 36upx;
          }

          .img1 {
            width: 90upx;
            height: 90upx;
            border-radius: 20upx;
          }

          .img2 {
            width: 40upx;
            height: 40upx;
            position: absolute;
            right: -15upx;
            top: -15upx;
            background: white;
            border-radius: 50%;
          }

          .left {
            display: flex;
            align-items: center;
          }

          .upload {
            margin: 0;
            width: 90upx;
            height: 90upx;
            background-color: #ececec;
            border-radius: 20upx;
            color: #767676;
            text-align: center;
            line-height: 160upx;
            font-size: 44upx;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .iamge-background {
            width: 160upx;
            height: 160upx;
            object-fit: cover;
          }
        }
      }
    }

    .notice {
      font-size: 28upx;
      color: #141000;

      .notice-name {
        padding-bottom: 26upx;
      }

      .notice-content {
        border-radius: 24upx;
        background: #f6f6f5;

        .content {
          padding: 32upx 16upx;
          height: 380upx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #f1f2f6;

          .show {
            font-size: 28upx;
            font-weight: 400;
            color: #3d3d3d;
            width: 100%;
            height: 80%;
          }

          .list {
            height: 34upx;
            display: flex;
            justify-content: flex-start;

            .number {
              font-size: 24upx;
              color: #999999;
              padding-right: 20upx;
            }

            .example {
              font-size: 24upx;
              color: #007aff;
            }
          }
        }
      }
    }
  }

  .foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 120upx;
    border-radius: 24upx 24upx 0upx 0upx;
    background: #ffffff;
    box-shadow: 0upx 0upx 2upx 0upx rgba(0, 0, 0, 0.16);
    display: flex;
    justify-content: center;
    align-items: center;

    .book {
      width: 686upx;
      height: 88upx;
      border-radius: 44upx;
      background: #ffc117;
      font-size: 32upx;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
