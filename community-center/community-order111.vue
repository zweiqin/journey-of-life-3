<template>
  <view class="community-order-container">
    <!-- 返回键 -->
    <view class="head">
      <image
        class="back-icon"
        src="../static/images/con-center/order-back.png"
      ></image>
    </view>

    <!-- 上门地址 -->
    <view
      class="choose-address-wrapper section animate"
      @click="go('/user/site/site-manage?appoint=true')"
    >
      <view class="address-container" v-if="defualtAddress">
        <view class="address-1">{{
          defualtAddress.detailedAddress.split(" ")[0]
        }}</view>
        <view class="address-2">{{
          defualtAddress.detailedAddress.split(" ")[1]
        }}</view>
        <view class="user-info">
          <text class="user-name">{{ defualtAddress.name }}</text>
          <text class="user-mobile">{{
            defualtAddress.mobile.slice(0, 3) +
            "****" +
            defualtAddress.mobile.slice(7)
          }}</text>
        </view>
      </view>

      <view v-else class="section-title">请添加上门地址</view>

      <image
        class="address-icon"
        src="../static/images/con-center/address-icon.png"
      ></image>
    </view>

    <!-- 服务项目 -->
    <view class="serve-info section">
      <view class="title-wrapper">
        <view class="section-title">服务类型</view>
        <view class="serve-name"
          >{{ currentServeInfo.name }}
          <text class="serve-price" v-if="currentServeInfo.serverPrice"
            ><text class="price-text">￥{{ currentServeInfo.serverPrice }}</text
            >/{{ currentServeInfo.serverUnit }}</text
          ></view
        >
      </view>

      <view class="car-info">
        <image class="serve-img" :src="currentServeInfo.imgUrl"></image>
        <view class="number-control">
          <view
            @click="handleChangeServeNumber(-1)"
            class="item mult"
            :class="{ disabled: orderForm.quantity == 1 }"
            >-</view
          >
          <view class="number item">{{ orderForm.quantity }}</view>

          <view @click="handleChangeServeNumber(1)" class="item add">+</view>
        </view>
      </view>
    </view>

    <!-- 期望上门时间 -->
    <view class="serve-time section animate" @click="chooseTimeVisible = true">
      <view class="header-wrapper">
        <view class="section-title">请选择期望上门时间</view>
        <image
          class="address-icon"
          src="../static/images/con-center/order-time.png"
        ></image>
      </view>

      <view class="choose-time">{{ orderForm.datetimerange }}</view>
    </view>

    <!-- 维修商品 -->
    <view class="serve-user-goods-info section">
      <view class="section-title">维修物品图片</view>
      <view class="image-list">
        <view class="add-img-icon item">
          <image
            class="add-icon"
            src="../static/images/con-center/add-icon.png"
          ></image>
        </view>
      </view>

      <view class="section-title">需求说明（选填）</view>

      <tui-textarea
        padding="20rpx"
        :size="28"
        radius="20"
        :borderTop="false"
        :borderBottom="false"
        backgroundColor="#F1F1F0"
        minHeight="247rpx"
        placeholder="请填写尺寸、体积、重量等信息,方便师傅带齐工具,并为您准确提供准确的报价(您上传的照片非常重要哦~)"
      ></tui-textarea>
    </view>

    <!-- 确认按钮 -->
    <view class="btn-wrapper">
      <button class="uni-btn">确认</button>
    </view>

    <ChooseTime @choose="onChooseTime" v-model="chooseTimeVisible"></ChooseTime>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getUserId } from "utils";
import { debounce } from "lodash-es";
import { getAddressListApi } from "../api/address";
import { SELECT_ADDRESS } from "../constant";
import ChooseTime from "./componts/choose-time.vue";
import { getServicePriceApi } from "../api/community-center";
export default {
  components: { ChooseTime },
  data() {
    return {
      // 收货地址
      defualtAddress: null,
      // 当前选中的服务信息
      currentServeInfo: {},
      // 表单信息
      orderForm: {
        datetimerange: "", // 期望上门时间
        quantity: 1, // 数量
      },
      chooseTimeVisible: false,
      changeNumberFn: () => {},
    };
  },

  onLoad(options) {
    this.currentServeInfo = options;
    console.log(options);
  },

  onShow() {
    this.getAddressList();
  },

  methods: {
    // 获取收货地址
    async getAddressList() {
      const choosedAddress = uni.getStorageSync(SELECT_ADDRESS);
      if (choosedAddress) {
        this.defualtAddress = choosedAddress;
        return;
      }
      const { data } = await getAddressListApi({
        userId: getUserId(),
      });

      if (data.length) {
        this.defualtAddress = data.find((item) => item.isDefault);
      } else {
        this.defualtAddress = data[0];
      }

      console.log(this.defualtAddress);
    },

    // 获取选择的上门时间
    onChooseTime(time) {
      this.orderForm.datetimerange = time;
    },

    // 修改服务数量
    handleChangeServeNumber(number) {
      if (number < 0 && this.orderForm.quantity == 1) {
        this.ttoast({
          type: "fail",
          title: "最小服务单位是1",
        });
        return;
      }
      this.orderForm.quantity += number;
    },

    // 获取订单报价
    async handleGetOrderPrice() {
      const res = await getServicePriceApi({
        userId: getUserId(),
        serverInfoId: this.currentServeInfo.detailId,
        quantity: this.orderForm.quantity,
        price: this.currentServeInfo.price,
      });

      console.log(res);
    },
  },

  watch: {
    "orderForm.quantity": {
      handler: debounce(function () {
        this.handleGetOrderPrice();
      }, 500),
    },
  },
};
</script>

<style lang="less" scoped>
.community-order-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f6;
  padding-bottom: 160upx;

  .head {
    height: 120upx;
    padding: 13upx 42upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0 0 24upx 24upx;
    display: flex;
    align-items: center;

    .back-icon {
      width: 18upx;
      height: 34upx;
    }
  }

  .section {
    padding: 40upx 30upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 24upx;
    margin-top: 20upx;
    margin: 20upx 20upx 0;
    transition: all 350ms;

    &.animate {
      &:active {
        background-color: #d3d3d3;
      }
    }

    &-title {
      color: #605d52;
      font-size: 28upx;
    }
  }

  .serve-time {
    .header-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      .section-title {
        flex: 1;
      }
    }
    .choose-time {
      color: #e95d20;
      font-size: 32upx;
    }
    .address-icon {
      width: 64upx;
      height: 64upx;
      border-radius: 50%;
      flex-shrink: 0;
      margin-left: 10upx;
    }
  }

  .choose-address-wrapper {
    display: flex;
    align-items: center;

    .address-icon {
      width: 64upx;
      height: 64upx;
      border-radius: 50%;
      flex-shrink: 0;
      margin-left: 10upx;
    }

    .section-title {
      flex: 1;
    }

    .address-container {
      flex: 1;

      .address-1 {
        color: #605d52;
        font-size: 28upx;
      }

      .address-2 {
        color: #141000;
        font-weight: 500;
        margin: 4upx 0 24upx 0;
      }
    }
  }

  .serve-info {
    .title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .serve-name {
        color: #000;
        font-size: 28upx;
      }

      .serve-price {
        margin-left: 10upx;

        .price-text {
          font-weight: bold;
          font-size: 32upx;
          color: #ff5917;
        }
      }
    }

    .car-info {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 30upx;

      .serve-img {
        width: 150upx;
        height: 120upx;
        border-radius: 12upx;
      }

      .number-control {
        display: flex;
        align-items: center;
        width: 200upx;
        border: 2upx solid #f1f1f0;
        border-radius: 100px;
        overflow: hidden;

        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24upx;
          color: #141000;

          &.disabled {
            background-color: #f0f0f0;
          }

          &:nth-of-type(1) {
            border-right: 1upx solid #f1f1f0;
          }

          &:nth-of-type(3) {
            border-left: 1upx solid #f1f1f0;
          }
        }

        .number {
          flex: 1;
        }

        .add,
        .mult {
          width: 56upx;
          height: 48upx;
        }
      }
    }
  }

  .serve-user-goods-info {
    .image-list {
      display: flex;
      align-items: center;
      margin: 30upx 0;

      .item {
        width: 180upx;
        height: 180upx;
        border-radius: 12upx;
        background-color: #f1f1f0;

        &.add-img-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          &:active {
            .add-icon {
              transform: scale(1.3);
            }
          }
        }

        .add-icon {
          width: 64upx;
          height: 64upx;
          transition: all 350ms;
        }
      }
    }
  }
}

/deep/ .tui-textarea__wrap {
  border-radius: 10upx;
  margin-top: 20upx;
}

.btn-wrapper {
  height: 120upx;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  .uni-btn {
    width: 552upx;
    height: 88upx;
    border-radius: 100px;
    background: linear-gradient(90deg, #ff8c2e 3%, #ff5917 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
