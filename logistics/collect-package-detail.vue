<template>
  <view class="value-added-services" v-if="orderInfo">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">订单详情</view>
    </view>

    <view class="order-no item"> 订单号：{{ orderInfo.orderNo }} </view>

    <view
      class="order-info item"
      v-if="orderInfo.orderStatusLogList && orderInfo.orderStatusLogList.length"
    >
      <!-- <view class="status-item">
        <view class="status active">
          <view class="status-text">已签收</view>
          <view class="time">08-17 10：55</view>
        </view>

        <view>您的快递已签收，签收人：白大拿</view>
        <view
          >快递已送达，如有疑问请联系：13800138000 投诉电话：13800138000</view
        >
      </view> -->

      <view
        class="status-item"
        v-for="(item, index) in orderInfo.orderStatusLogList"
        :key="item.key"
      >
        <view class="status" :class="{ active: index === 0 }">
          <view class="status-text">{{ item.statusMsg }}</view>
          <!-- <view class="time">龙江镇亚洲国际材料城团蜂科技</view> -->
        </view>

        <view>{{ item.createTime }}</view>
      </view>
    </view>

    <view class="item sender-info">
      <view class="title">寄件人</view>
      <view class="main">
        <view
          >{{ orderInfo.senderName }}
          <text class="call-phone" @click="call(orderInfo.senderMobile)">{{
            orderInfo.senderMobile
          }}</text>
        </view>
        <view class="address">
          {{ orderInfo.senderAddress + orderInfo.senderAddressDetail }}
        </view>
      </view>
    </view>

    <view class="item sender-info">
      <view class="title">寄件人</view>
      <view class="main">
        <view
          >{{ orderInfo.consigneeName }}
          <text class="call-phone" @click="call(orderInfo.consigneeMobile)">{{
            orderInfo.consigneeMobile
          }}</text>
        </view>
        <view class="address">
          {{ orderInfo.consigneeAddress + orderInfo.consigneeAddressDetail }}
        </view>
      </view>
    </view>

    <view class="item sender-info">
      <view class="title">承运商</view>
      <view class="main">
        <view
          >{{ orderInfo.shipSimpleName }}
          <text
            class="call-phone"
            @click="call(orderInfo.warehouseContactPhone)"
            >{{ orderInfo.warehouseContactPhone }}</text
          >
        </view>
        <view class="address">
          {{ orderInfo.warehouseAddress }}
        </view>
      </view>
    </view>

    <view class="item sender-info">
      <view class="title-blo">增值服务</view>
      <view class="main">
        <view>
          <text class="name">送货要求：</text>
          <text class="value">{{
            mapDeliveryType(orderInfo.deliveryType)
          }}</text>
        </view>

        <view>
          <text class="name">支付方式：</text>
          <text class="value">{{ mapPayType(orderInfo.payType) }}</text>
        </view>

        <view>
          <text class="name">提货要求：</text>
          <text class="value">{{
            orderInfo.isPickUp === 0 ? "不上门" : "上门提货"
          }}</text>
        </view>

        <view>
          <text class="name">控货要求：</text>
          <text class="value">{{
            mapCategoryControlType(orderInfo.cargoControlType)
          }}</text>
        </view>
      </view>
    </view>

    <view class="item goods-info">
      <view class="title-blo">货物信息</view>
      <view class="main">
        <view
          class="order-item"
          v-for="goods in orderInfo.orderGoodsList"
          :key="goods.id"
        >
          <view class="good-name">{{ goods.goodName }}</view>
          <view class="tags">
            <view class="tag">{{ goods.packType }}</view>
            <view class="tag">{{ goods.packAmount }}箱</view>
            <view class="tag">{{ goods.weight }}kg</view>
            <view class="tag">{{ goods.volume }}方</view>
          </view>
        </view>
      </view>
    </view>

    <view class="item sender-info" v-if="orderInfo.remarks">
      <view class="title">备注</view>
      <view class="main">
        {{ orderInfo.remarks }}
      </view>
    </view>

    <view class="order-info">
      <view class="sender-info"> </view>
      <view class="con-info"></view>
    </view>
  </view>
</template>

<script>
import { getOrderDetailApi } from "../api/logistics";
import { mapDeliveryType, mapPayType, mapCategoryControlType } from "./config";

export default {
  data() {
    return {
      orderNo: "",
      orderInfo: {},
    };
  },
  methods: {
    // 点击复制
    copy() {
      uni.setClipboardData({
        data: "单号",
        success: function (res) {
          uni.showToast({
            title: "复制成功",
          });
        },
      });
    },

    // 返回
    back() {
      uni.navigateBack();
    },

    /**
     * @description 点击打电话
     */
    call(mobile) {
      if (!mobile) return;
      uni.makePhoneCall({
        phoneNumber: mobile,
      });
    },

    async getOrderDetail() {
      try {
        const res = await getOrderDetailApi(this.orderNo);
        if (res.statusCode === 20000) {
          this.orderInfo = res.data;
          console.log(this.orderInfo);
        } else {
          uni.showToast({
            title: "标题",
            duration: 2000,
            icon: "none",
          });
        }
      } catch (error) {
        uni.showToast({
          title: "订单详情获取失败",
          duration: 2000,
          icon: "none",
        });
      }
    },

    mapDeliveryType,
    mapPayType,
    mapCategoryControlType,
  },

  onLoad(options) {
    this.orderNo = options.orderNo;
    this.getOrderDetail();
  },
};
</script>

<style lang="less" scoped>
.value-added-services {
  padding: 30upx 26upx;
  min-height: 100vh;
  height: auto;
  box-sizing: border-box;
  background: linear-gradient(180deg, #00b578 0%, #ffffff 100%);

  .header {
    display: flex;
    align-items: center;

    .back {
      width: 16upx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 32upx;
    }
  }

  .item {
    width: 100%;
    padding: 38upx 32upx;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 20upx;
    margin-top: 26upx;
  }

  .sender-info {
    display: flex;

    .title {
      margin-right: 30upx;
      color: #989898;
      flex-shrink: 0;
    }

    .title-blo {
      color: #000;
      font-weight: bold;
      margin-right: 30upx;
    }

    .name {
      color: #989898;
    }

    .value {
      color: #000;
    }

    .address {
      color: #0078d4;
    }
  }

  .order-info {
    font-size: 28upx;
    color: #3d3d3d;
    line-height: 40upx;

    .status {
      &-item {
        padding-left: 50upx;
        margin-top: 26upx;

        .status {
          display: flex;
          position: relative;
          margin-bottom: 20upx;
          font-weight: bold;

          &.active {
            color: #fa5151;

            &::before {
              background-color: #fa5151;
              border-color: #fa5151;
            }
          }

          &::before {
            position: absolute;
            content: "";
            display: block;
            left: -54upx;
            width: 32upx;
            height: 32upx;
            border-radius: 50%;
            border: 1upx solid #999999;
          }

          .status-text {
            margin-right: 36upx;
          }
        }
      }
    }
  }

  .wuliu {
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24upx;

      .avatar {
        width: 50upx;
        height: 50upx;
        border-radius: 50%;
        margin-right: 26upx;
      }

      .orderNo {
        flex: 1;
      }
    }
  }

  .op {
    .copy {
      padding-right: 20upx;
      border-right: 1upx solid #999999;
      margin-right: 20upx;
    }

    .phone {
      color: #3d3d3d;
      text-decoration: none;
    }
  }

  .goods-info {
    display: block;

    .title-blo {
      font-weight: bold;
      margin-bottom: 10upx;
    }

    .main {
      .order-item {
        padding: 10upx 0;

        &:not(:last-child) {
          border-bottom: 1upx dotted #000;
        }

        .tags {
          margin: 10upx 0;
          display: flex;

          .tag {
            padding: 2px 4px;
            border: 1px solid #0078d4;
            color: #0078d4;
            border-radius: 4px;
            margin-right: 12upx;
          }
        }
      }
    }
  }
}
</style>