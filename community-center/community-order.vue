<template>

  <view class="community-order">
    <!-- <view v-if="isArtificialArtificial">123</view>
    <view v-else-if="!isArtificialArtificial">223</view> -->
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
      <img
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9k786yg2qqbj7u35zwr5.png"
        alt=""
        class="shop"
      />
      <view class="title-name">{{ name }}</view>
      <view class="price-list">
        <view class="logo">￥</view>
        <view class="number">{{ price }}</view>
        <view class="point">.00</view>
        <view class="slash">/</view>
        <view class="unit">{{ unit }}</view>
      </view>
      <view class="choice-list">
        <view class="choice">已选</view>
        <view class="type">{{ type }}</view>
        <view class="logo">￥</view>
        <view class="number">{{ price }}</view>
      </view>
      <view class="specs-list">
        <view v-if="id" class="name">规格</view>
        <view class="w-list">
          <view
            class="w"
            v-for="item in air"
            :class="{ active: item.value === currentTab }"
            :key="item.value"
            @click="switchTab(item.value)"
          >
            <view class="specs">{{ item.label }}</view>
            <view class="logo">￥</view>
            <view class="money">{{ item.money }}</view>
            <view class="slash">/</view>
            <view class="unit">{{ unit }}</view>
            <view class="qi">起</view>
          </view>
        </view>
      </view>
    </view>

    <view class="body">
      <view class="top-list">
        <view class="item-type">
          <view class="tag">*</view>
          <view class="type">服务类型</view>
        </view>
        <view class="please">
          <view class="choice">请选择</view>
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/63apnwjyguuyva9itx9k.png"
            alt=""
            class="more"
          />
        </view>
      </view>
      <input
        type="text"
        class="text"
        placeholder="（服务类型可以自动填写数量/尺寸/体积/重量/面积）"
      />
      <view class="item-image">
        <view class="tag">*</view>
        <view class="name">物品图片</view>
      </view>
      <view class="upload">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/11y7t9j0dh9s74bcyoz5.png"
          alt=""
          class="img"
        />
        <view class="text">上传图片</view>
      </view>
      <view class="explain">
        <view class="text1">需求说明</view>
        <view class="text2">(选填)</view>
      </view>
      <view class="jx">
        <view class="content">
          <input type="text" class="show" placeholder="说明内容实例" />
          <view class="list">
            <view class="number">0/150</view>
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
export default {
  name: "Community-order",
  props: {},
  data() {
    return {
      air,
      currentTab: 1,
      name: "",
      price: "",
      unit: "",
      id: 97,
      // isArtificialArtificial:true
    };
  },
  methods: {
    switchTab(item) {
      console.log(item);
      this.currentTab = item;
    },
    handleBack() {
      uni.navigateBack();
    },
    handleToServiceInformation() {
      uni.navigateTo({
        url: `/community-center/customer-information`,
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
    this.id =options.serverTypeId;
  },
};
</script>






<style lang="less" scoped>
.community-order {
  .title-list {
    padding: 88upx 34upx 36upx 26upx;
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
    .shop {
      width: 100%;
    }
    .title-name {
      padding-left: 30upx;
      padding-bottom: 36upx;
      // padding-top: 30upx;
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
          &.active {
            border: 2upx solid #fa5151;
          }
          .specs {
            font-size: 28upx;
            font-weight: 400;
            color: #3d3d3d;
          }
          .logo {
            font-size: 36upx;
            font-weight: 400;
            color: #fa5151;
          }
          .money {
            font-size: 36upx;
            font-weight: 400;
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
            color: #3d3d3d;
          }
          .qi {
            font-size: 28upx;
            font-weight: 400;
            color: #3d3d3d;
          }
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
      .please {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 156upx;
        .choice {
          font-size: 28upx;
          font-weight: 500;
          color: #3d3d3d;
        }
        .more {
          width: 40upx;
          height: 40upx;
        }
      }
    }
    .text {
      padding-top: 16upx;
      font-size: 24upx;
      color: #999999;
    }
    .item-image {
      display: flex;
      align-items: center;
      padding-top: 36upx;
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
    .upload {
      margin-top: 34upx;
      width: 160upx;
      height: 160upx;
      border-radius: 10upx;
      background: #f1f2f6;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img {
        width: 60upx;
        height: 60upx;
      }
      .text {
        font-size: 24upx;
        font-weight: 500;
        color: #d8d8d8;
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
      height: 800upx;
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
          color: #999999;
        }
        .list {
          width: 120upx;
          height: 34upx;
          display: flex;
          justify-content: space-between;
          .number {
            font-size: 24upx;
            color: #999999;
          }
          .example {
            font-size: 24upx;
            color: #ea5f1f;
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
