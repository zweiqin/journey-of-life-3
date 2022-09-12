<template>
  <view class="mail">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">寄件</view>
    </view>

    <!-- 收发货人信息 -->
    <view class="item info">
      <view class="info-item" @click="changeServe('/logistics/sender')">
        <view class="icon">寄</view>
        <view class="main-value">
          {{
            senderUserInfoString
              ? senderUserInfoString
              : "请输入寄件人信息(出发地）"
          }}</view
        >
        <img src="../static/images/common/chevron-states.png" alt="" />
      </view>
      <view class="line"></view>
      <view class="info-item" @click="changeServe('/logistics/consignee')">
        <view class="icon" style="background: #00b578">收</view>
        <view class="main-value">{{
          consigneeUserInfoString
            ? consigneeUserInfoString
            : "请输入收件人信息(目的地）"
        }}</view>
        <img src="../static/images/common/chevron-states.png" alt="" />
      </view>
    </view>

    <!-- 物流 -->
    <view class="item wuliu">
      <view class="apponit" @click="changeServe('/logistics/appoint')"
        >指定/默认仓库</view
      >

      <picker mode="selector" :range="['暂无物流公司']">
        <view class="flex" style="align-items: center">
          <view class="title">请选择物流公司</view>
          <img src="../static/images/common/chevron-states.png" alt="" />
        </view>
      </picker>
    </view>

    <!-- 增值服务 -->
    <view class="item serve">
      <view
        class="header flex"
        @click="changeServe('/logistics/value-added-services')"
      >
        <view class="text">增值服务</view>
        <img src="../static/images/common/chevron-states.png" alt="" />
      </view>

      <view
        class="serve-item flex"
        v-for="item in serveConfig"
        :key="item.label"
      >
        <view class="sub-text">{{ item.label }}</view>
        <view class="serve-value">{{ orderForm.serve[item.field] }}</view>
      </view>
    </view>

    <!-- 货物信息 -->
    <view
      class="item goods-info"
      :style="{ paddingBottom: goodsCollapse ? '' : '40px' }"
    >
      <view class="header flex" @click="changeServe('/logistics/goods-info')">
        <view class="text">货物信息</view>
        <view class="total-info" v-if="orderForm.goodsList.length > 0"
          >共计：<text class="number">{{ goodsInfo.totalCounter }}</text
          >件，<text class="number">{{ goodsInfo.totalVolume }}</text> 方，
          <text class="number">{{ goodsInfo.totalWeight }}</text> kg</view
        >
        <view class="no-data" v-else>未添加货物信息</view>
        <view class="add-icon">+</view>
      </view>

      <view
        class="goods-wrapper"
        :style="{ display: goodsCollapse ? 'block' : 'none' }"
      >
        <view
          class="goods"
          v-for="(goods, index) in orderForm.goodsList"
          :key="goods.id"
        >
          <view
            class="goods-info-item flex"
            v-for="item in goodsConfig"
            :key="item.label"
          >
            <view class="sub-text">{{ item.label }}</view>
            <view class="goods-info-value">{{ goods[item.field] }}</view>
          </view>

          <view class="op">
            <img
              @click="handleEditGoods(index)"
              class="op-img"
              src="../static/images/wuliu/edit.png"
              alt=""
            />
            <img
              @click="handleDeleteGood(index)"
              class="op-img"
              src="../static/images/wuliu/delete.png"
              alt=""
            />
          </view>
        </view>
      </view>

      <img
        v-show="orderForm.goodsList.length > 0"
        class="toggle"
        :class="{ rotate: !goodsCollapse }"
        src="../static/images/common/toggle.png"
        alt=""
        ref="collapseIconRef"
        @click="showGoodsDetail"
      />
    </view>

    <!-- 备注 -->
    <view class="item flex" @click="showRemarksDialog">
      <view class="text">备注:</view>
      <view class="remarks">{{ orderForm.remarks }}</view>
      <img src="../static/images/common/chevron-states.png" alt="" />
    </view>

    <view class="submit-order">
      <button class="btn" @click="submitOrder">提交订单</button>
    </view>

    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog
        ref="inputClose"
        mode="input"
        title="输入内容"
        :value="orderForm.remarks"
        placeholder="请输入内容"
        @confirm="confirmOrderRemarks"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import { serveConfig, goodsConfig } from "./config";
import { jiSenderInfo, jiRemarks, jiconsigneeInfo } from "../constant";

export default {
  components: {},
  data() {
    return {
      orderForm: {
        serve: {},
        goodsList: [],
        remarks: "",
      },
      serveConfig,
      goodsConfig,
      goodsCollapse: true,
      senderUserInfoString: "",
      consigneeUserInfoString: "",
    };
  },
  methods: {
    /**
     * @description 返回上一页
     */
    back() {
      uni.switchTab({
        url: "/pages/logistics/logistics",
      });
    },

    /**
     * @description 路径跳转
     */
    changeServe(route) {
      if (!route) {
        return;
      }
      wx.navigateTo({
        url: route,
      });
    },

    /**
     * @description 删除商品
     */
    handleDeleteGood(index) {
      this.orderForm.goodsList.splice(index, 1);
      uni.setStorageSync("JI_ORDER_GOODS_LIST", [...this.orderForm.goodsList]);
    },

    /**
     * @description 修改商品信息
     */
    handleEditGoods(index) {
      uni.navigateTo({
        url: `/logistics/goods-info?edit=${index}`,
      });
    },

    /**
     * @description 点击切换货物信息的显示与隐藏
     */
    showGoodsDetail() {
      // const iconClassList = this.$refs.collapseIconRef.classList;

      // iconClassList.remove("breath");
      // iconClassList.add("rotate");

      // setTimeout(() => {
      //   iconClassList.add("breath");
      // }, 500);
      this.goodsCollapse = !this.goodsCollapse;
    },

    /**
     * 显示remarksdialog
     */
    showRemarksDialog() {
      this.$refs.inputDialog.open();
    },

    /**
     * @description 确定备注
     */
    confirmOrderRemarks(val) {
      this.orderForm.remarks = val;
      uni.setStorageSync(jiRemarks, val);
    },

    /**
     * @description 点击提交订单
     */
    submitOrder() {},
  },

  computed: {
    /**
     * @description 统计当前的货物信息
     */
    goodsInfo() {
      let totalCounter = 0;
      let totalWeight = 0;
      let totalVolume = 0;
      this.orderForm.goodsList.forEach((item) => {
        totalCounter += item.packAmount * 1;
        totalWeight += item.weight * 1;
        totalVolume += item.volume * 1;
      });

      totalCounter = (totalCounter + "").includes(".")
        ? +totalCounter.toFixed(2)
        : +totalCounter;
      totalWeight = (totalWeight + "").includes(".")
        ? +totalWeight.toFixed(2)
        : +totalWeight;
      totalVolume = (totalVolume + "").includes(".")
        ? +totalVolume.toFixed(2)
        : +totalVolume;

      return {
        totalCounter,
        totalWeight,
        totalVolume,
      };
    },
  },

  onShow() {
    /**
     * @description 获取增值服务缓存
     */
    this.orderForm.serve = uni.getStorageSync("VALUE_ADDED_SERVICES") || {
      controlGoods: "不控货",
      delivery: "送货安装",
      take: "不提货",
      valuation: "系统计价",
      payType: "现付",
    };

    /**
     * @description 获取商品缓存
     */
    const goodsList = uni.getStorageSync("JI_ORDER_GOODS_LIST");
    if (goodsList && goodsList.length > 0) {
      this.orderForm.goodsList = goodsList;
    }

    /**
     * @description 获取收货人信息
     */
    const senderUserInfo = uni.getStorageSync(jiSenderInfo);
    if (senderUserInfo) {
      let str = "";
      for (const key in senderUserInfo) {
        str += senderUserInfo[key] + " ";
      }

      this.senderUserInfoString =
        str === this.senderUserInfoString ? this.senderUserInfoString : str;
    }

    const consigneeUserInfo = uni.getStorageSync(jiconsigneeInfo);
    if (consigneeUserInfo) {
      let str = "";
      for (const key in consigneeUserInfo) {
        str += consigneeUserInfo[key] + " ";
      }

      this.consigneeUserInfoString =
        str === this.consigneeUserInfoString
          ? this.consigneeUserInfoString
          : str;
    }

    /**
     * @description 获取备注
     */
    const remarks = uni.getStorageSync(jiRemarks);
    if (remarks) {
      this.orderForm.remarks = remarks;
    }
  },
};
</script>

<style lang="less" scoped>
@keyframes breathing {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0.9);
  }
}

.mail {
  padding: 60upx 24upx 60upx 24upx;
  background: linear-gradient(180deg, #3662ec 0%, rgba(205, 225, 253, 0) 99%);

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .sub-text {
    color: #999999;
    font-size: 28upx;
  }

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
    background-color: #fff;
    border-radius: 20upx;
    padding: 40upx 24upx;
    margin-top: 20upx;

    .header {
      .text {
        color: #3d3d3d;
        font-size: 32upx;
        font-weight: bold;
      }
    }

    .remarks {
      flex: 1;
      overflow: hidden;
      margin: 0 20upx;
    }
  }

  .info {
    &-item {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: 86upx;
      padding: 16upx;
      border-radius: 20upx;
      background-color: #cde1fd;

      .icon {
        font-size: 32upx;
        color: #fff;
        padding: 8upx;
        background-color: #3662ec;
        border-radius: 4upx;
        margin-right: 32upx;
      }

      .main-value {
        flex: 1;
        color: #000;
        font-size: 24upx;
      }
    }

    .line {
      width: 98%;
      height: 1upx;
      background-color: #d8d8d8;
      margin: 20upx auto;
    }
  }

  .wuliu {
    line-height: 40upx;
    .apponit {
      color: #000000;
      font-size: 32upx;
      font-weight: bold;
    }

    .title {
      padding: 20upx 0;
      font-size: 28upx;
      font-weight: 100;
    }
  }

  .serve {
    font-size: 28upx;
    &-item {
      line-height: 2;
      .serve-value {
        color: #3662ec;
      }
    }
  }

  .goods-info {
    position: relative;
    font-size: 28upx;

    .no-data {
      color: grey;
    }

    .total-info {
      .number {
        color: #406aed;
        margin-right: 4upx;
      }
    }

    .toggle {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20upx;
      width: 24upx;
      transition: all 350ms;
      transform-origin: center center;

      &.breath {
        animation: breathing 1s linear infinite;
      }

      &.rotate {
        transform: rotate(180deg);
      }
    }

    &-item {
      line-height: 3;
      border-bottom: 1upx solid #ccc;
    }
    .add-icon {
      color: #767676;
      font-size: 40upx;
    }

    .goods-info-value {
      color: #fa5151;
    }

    .op {
      display: flex;
      justify-content: flex-end;
      margin-top: 20upx;

      &-img {
        width: 36upx;

        &:nth-child(1) {
          margin-right: 20upx;
        }
      }
    }
  }

  .submit-order {
    width: 100%;
    padding: 30upx 0;
    margin-top: 30upx;
    // background-color: #fff;

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 260upx;
      height: 72upx;
      font-size: 36upx;
      color: #fff;
      background: #3662ec;
    }
  }
}
</style>