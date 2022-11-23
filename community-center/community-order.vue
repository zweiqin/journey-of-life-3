<template>
  <view class="community-order">
    <view class="title-list">
      <img
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
        alt=""
        class="return"
        @click="handleBack"
      />
      <view class="title">完善服务信息</view>
    </view>

    <view class="top" v-if="price">
      <view class="goods">
        <img
          :src="
            serverImgUrl ||
            'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9k786yg2qqbj7u35zwr5.png'
          "
          alt=""
          class="shop"
        />
      </view>
      <view class="title-name">{{ name }}</view>
      <view class="price-list">
        <view class="logo">￥</view>
        <view class="number">{{ price }}</view>
        <view class="point"></view>
        <view class="slash">/</view>
        <view class="unit">{{ unit }}</view>
      </view>
      <view class="choice-list">
        <view class="choice">已选</view>
        <view class="type">{{ type }}</view>

        <!-- <view class="logo">￥</view>
        <view class="number">{{ price }}</view> -->
      </view>
    </view>
    <template v-if="id == 97">
      <view class="specs-list">
        <view class="name">规格</view>
        <view class="w-list">
          <view
            class="w"
            v-for="item in air"
            :class="{ active: item.value == currentTab }"
            :key="item.value"
            @click="switchTab(item.value)"
          >
            <view class="specs">{{ item.label }}</view>
            <view class="logo">+</view>
            <view class="money">{{ item.money }}</view>

            <view class="unit">元</view>
            <view class="qi"></view>
          </view>
        </view>
      </view>
    </template>
    <view class="body">
      <template v-if="!price">
        <view class="top-list">
          <view class="item-type">
            <view class="tag">*</view>
            <view class="type">服务类型</view>
          </view>
          <view class="text-type">{{ name }}</view>
        </view>
      </template>
      <view class="item-image">
        <view class="tag">*</view>
        <view class="name">物品图片</view>
      </view>

      <view class="upload-list">
        <view class="upload-pane">
          <!-- <view class="left"></view> -->

          <view style="display: flex; flex-wrap: wrap">
            <view
              v-for="img in images"
              :key="img"
              style="
                position: relative;
                width: 160upx;
                height: 160upx;
                margin-right: 20upx;
                margin-bottom: 20upx;
              "
            >
              <img :src="img" alt="" class="img1" />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/qqzm2u887derediugqlf.png"
                alt=""
                class="img2"
                @click="removeBackground(img)"
              />
            </view>
          </view>

          <view
            @click="chooseImg"
            class="upload"
            v-if="!imgUrl"
            style="margin-right: 6upx"
            >+</view
          >

          <image
            v-else-if="imgUrl"
            class="iamge-background"
            :src="imgUrl"
            mode=""
          />
        </view>
      </view>

      <view class="explain">
        <view class="text1">需求说明</view>
        <view class="text2">(选填)</view>
      </view>
      <view class="jx">
        <view class="content">
          <!-- <input type="text" class="show" placeholder="说明内容实例" /> -->
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            class="show"
            placeholder="请填写尺寸、体积、重量等信息,方便师傅带齐工具,并为您准确提供准确的报价(您上传的照片非常重要哦~)"
            v-model="text"
          ></textarea>

          <view class="list">
            <view class="number">{{ text.length }}/140</view>
            <view class="example">示例</view>
          </view>
        </view>
      </view>
      <view class="foot">
        <view class="on" @click="handleToServiceInformation">确认</view>
      </view>
    </view>
  </view>
</template>






<script>
import { air } from "./config";
import { USER_TOKEN } from "../constant";
import { getUserId } from "../utils";
export default {
  name: "Community-order",
  props: {
    imgUrl: String,
  },
  data() {
    return {
      air,
      img: "",
      currentTab: 0,
      name: "",
      price: "",
      unit: "",
      id: "",
      text: "",
      images: [],
      priceType: "",
      serverImgUrl: "",
      length: "",
      // isArtificialArtificial:true
    };
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
    handleToServiceInformation() {
      // uni.navigateTo({
      //   url: `/community-center/customer-information?id1=${this.id}&specsId=${this.specsId}&price=${this.price}&priceType1=${this.priceType}&name=${this.name}&unit=${this.unit}&detailId1=${this.detailId1}&text=${this.text}`,
      // });
      uni.showToast({
        title: "请上传物品图片",
        icon: "none",
        duration: 2000,
      });
      if (this.id != 97 && this.images.length) {
        console.log("id", this.id);
        uni.navigateTo({
          url: `/community-center/customer-information?id1=${this.id}&specsId=${this.specsId}&price=${this.price}&priceType1=${this.priceType}&name=${this.name}&unit=${this.unit}&detailId1=${this.detailId1}&text=${this.text}&imgUrl=${this.serverImgUrl}`,
        });
      } else if (this.id == 97 && this.specsId && this.images.length) {
        console.log("id", this.id && this.images);
        uni.navigateTo({
          url: `/community-center/customer-information?id1=${this.id}&specsId=${this.specsId}&price=${this.price}&priceType1=${this.priceType}&name=${this.name}&unit=${this.unit}&detailId1=${this.detailId1}&text=${this.text}&imgUrl=${this.serverImgUrl}`,
        });
      } else {
        console.log("no", this.id);
      }
    },

    switchTab(item1) {
      console.log("规格", item1);
      this.currentTab = item1;
      this.specsId = item1;
    },

    chooseImg() {
      const _this = this;
      uni.chooseImage({
        success: (chooseImageRes) => {
          uni.uploadFile({
            url: "https://www.tuanfengkeji.cn:9527/jf-app-api/wx/storage/upload",
            filePath: chooseImageRes.tempFiles[0].path,
            name: "file",
            formData: {
              token: USER_TOKEN,
              userId: getUserId(),
            },
            success: (uploadFileRes) => {
              _this.images.push(JSON.parse(uploadFileRes.data).data.url);
            },
          });
        },
      });
    },

    removeBackground(img) {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "确定删除当前图片吗？",
        success: function (res) {
          if (res.confirm) {
            const index = _this.images.findIndex((item) => item === img);
            _this.images.splice(index, 1);
          }
        },
      });
    },
  },
  created() {},
  onLoad(options) {
    console.log(options);
    this.name = options.name;
    this.price = options.serverPrice;
    this.unit = options.serverUnit;
    this.type = options.serverInfoName;
    this.id = options.id;
    this.serverImgUrl = options.imgUrl;

    this.detailId1 = options.detailId;
    this.priceType = options.priceType;
    console.log("是否一口价", this.priceType);
    // if (a === "true") {
    //   this.priceType = 1;
    // } else {
    //   this.priceType = 2;
    // }
  },
};
</script>






<style lang="less" scoped>
.community-order {
  padding-bottom: 180upx;
  .title-list {
    padding: 40upx 54upx 36upx 16upx;
    display: flex;
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
    .goods {
      width: 100%;
      height: 340upx;
      display: flex;
      justify-content: center;
      .shop {
        width: 588upx;
        height: 340upx;
      }
    }
    .title-name {
      padding-left: 30upx;
      padding-top: 30upx;
      padding-bottom: 36upx;
      font-size: 36upx;
      font-weight: bold;
      color: #3d3d3d;
    }
    .price-list {
      display: flex;
      align-items: center;
      padding-left: 30upx;
      padding-bottom: 36upx;
      .logo {
        font-size: 28upx;
        font-weight: 400;
        color: #fa5151;
      }
      .number {
        font-size: 36upx;
        font-weight: bold;
        color: #fa5151;
      }
      .point {
        font-size: 36upx;
        font-weight: bold;
        color: #fa5151;
      }
      .slash {
        font-size: 28upx;
        font-weight: 400;
        color: #000000;
      }
      .unit {
        font-size: 28upx;
        font-weight: 400;
        color: #000000;
      }
    }
    .choice-list {
      padding-left: 30upx;
      padding-bottom: 36upx;
      display: flex;
      align-items: center;
      .choice {
        font-size: 28upx;
        font-weight: 350;
        color: #3d3d3d;
      }
      .type {
        padding-left: 18upx;
        font-size: 32upx;
        color: #3d3d3d;
      }
      .logo {
        font-size: 32upx;
        color: #3d3d3d;
      }
      .number {
        font-size: 32upx;
        color: #3d3d3d;
      }
    }
  }
  .specs-list {
    padding-left: 30upx;
    .name {
      padding-bottom: 18upx;
      font-size: 32upx;
      font-weight: 500;
      color: #3d3d3d;
    }

    .w-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .w {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 260upx;
        height: 80upx;
        margin: 10upx 94upx 10upx 0upx;
        border-radius: 10upx;
        box-sizing: border-box;
        border: 2upx solid #999999;
        color: #999999;
        &.active {
          // border: 2upx solid #007aff;
          color: white;
          background: linear-gradient(270deg, #e95e20 0%, #ff8f1f 100%);
        }
        .specs {
          font-size: 28upx;
          font-weight: 400;
        }
        .logo {
          font-size: 36upx;
          font-weight: 400;
          // color: #999999;
        }
        .money {
          font-size: 36upx;
          font-weight: 400;
          // color: #999999;
        }
        .slash {
          font-size: 28upx;
          font-weight: 400;
          // color: #000000;
        }
        .unit {
          font-size: 28upx;
          font-weight: 400;
          // color: #999999;
        }
        .qi {
          font-size: 28upx;
          font-weight: 400;
          // color: #3d3d3d;
        }
      }
    }
  }
  .body {
    padding: 36upx 30upx 0upx 30upx;

    .top-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-type {
        display: flex;
        align-items: center;
        .tag {
          font-weight: 600;
          color: #fa5151;
        }
        .type {
          font-size: 32upx;
          font-weight: 500;
          color: #3d3d3d;
        }
      }
      // .please {
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      //   width: 156upx;
      //   .choice {
      //     font-size: 28upx;
      //     font-weight: 500;
      //     color: #3d3d3d;
      //   }
      //   .more {
      //     width: 40upx;
      //     height: 40upx;
      //   }
      // }
    }
    .text-type {
      // padding-top: 20upx;
      font-size: 32upx;
      color: #3d3d3d;
    }
    .item-image {
      display: flex;
      align-items: center;
      padding-top: 36upx;
      padding-bottom: 28upx;
      .tag {
        font-weight: 600;
        color: #fa5151;
      }
      .name {
        font-size: 32upx;
        font-weight: 500;
        color: #3d3d3d;
      }
    }

    .upload-pane {
      border-radius: 20upx;
      display: flex;
      flex-wrap: wrap;

      .delete-icon {
        width: 32upx;
        height: 36upx;
      }

      .img1 {
        width: 160upx;
        height: 160upx;
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
        width: 160upx;
        height: 160upx;
        background-color: #ececec;
        border-radius: 20upx;
        color: #767676;
        text-align: center;
        line-height: 160upx;
        font-size: 60upx;
      }

      .iamge-background {
        width: 160upx;
        height: 160upx;
        object-fit: cover;
      }
    }

    .explain {
      margin-top: 84upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 220upx;
      height: 44upx;
      .text1 {
        font-size: 32upx;
        font-weight: 500;
        color: #3d3d3d;
      }
      .text2 {
        font-size: 28upx;
        font-weight: 500;
        color: #999999;
      }
    }
    .jx {
      margin-top: 56upx;
      // width: 690upx;
      width: 100%;
      // height: 800upx;
      border-radius: 10upx;

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
    .foot {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30upx 30upx 30upx 30upx;
      width: 100%;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #ffffff;
      border-top: 8upx solid #f7f8fa;
      .on {
        font-size: 32upx;
        font-weight: bold;
        color: #ffffff;
        width: 408upx;
        height: 80upx;
        border-radius: 100upx;
        background: linear-gradient(270deg, #e95e20 0%, #ff8f1f 100%);
        text-align: center;
        line-height: 80upx;
      }
    }
  }
}
</style>
