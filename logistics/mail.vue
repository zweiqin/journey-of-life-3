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
      <view class="apponit"
        ><view @click="changeServe('/logistics/appoint?apponit=true')"
          >指定/默认仓库</view
        >
        <text
          v-show="appointWuliuQiyeID"
          style="color: #3662ec; font-weight: normal"
          @click="cancelApponit"
          >取消指定</text
        >
      </view>

      <picker
        mode="selector"
        :range="warehouseList"
        range-key="showKey"
        @change="handleChooseWarehouse"
      >
        <view class="flex" style="align-items: center">
          <view class="title">{{
            orderForm.warehouseId ? warehouseInfoString : "请选择物流公司"
          }}</view>
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

    <!-- 报价 -->
    <uni-collapse ref="collapse" v-if="orderForm.priceDetail">
      <uni-collapse-item title="默认开启">
        <template #title>
          <view class="collapse-header">
            总价：
            <text
              :class="{
                line:
                  orderForm.priceDetail.sumDiscountPrice !==
                  orderForm.priceDetail.sumPrice,
              }"
              >{{ orderForm.priceDetail.sumPrice }}</text
            >
            <text
              v-if="
                orderForm.priceDetail.sumDiscountPrice !==
                orderForm.priceDetail.sumPrice
              "
              style="color: #fa5151; margin-left: 10px"
              >会员价：{{ orderForm.priceDetail.sumDiscountPrice }}</text
            ></view
          >
        </template>
        <view class="collapse-content">
          <view class="collapse-content-item"
            >配送费：{{ orderForm.priceDetail.detailsVo.deliveryPrice }}</view
          >
          <view class="collapse-content-item"
            >安装费：{{ orderForm.priceDetail.detailsVo.installPrice }}</view
          >
          <view class="collapse-content-item"
            >小额保：{{
              orderForm.priceDetail.detailsVo.microInsurePrice
            }}</view
          >
          <view class="collapse-content-item"
            >干线费：{{ orderForm.priceDetail.detailsVo.trunkLinePrice }}</view
          >
        </view>
      </uni-collapse-item>
    </uni-collapse>

    <view class="submit-order">
      <button class="btn" @click="submitOrder">
        {{ editId ? "确认修改" : "提交订单" }}
      </button>
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
import {
  serveConfig,
  goodsConfig,
  mapDeliveryType,
  mapCategoryControlType,
} from "./config";
import {
  jiSenderInfo,
  jiRemarks,
  jiconsigneeInfo,
  jiOrderGoodsList,
  JI_EDIT_ORDER_ID,
  VALUE_ADDED_SERVICES,
  APPONIT_WULIU_QIYE_ID,
} from "../constant";
import {
  getWarehouseListApi,
  getOrderQuoteApi,
  createOrderApi,
  editeOrderApi,
  getDropOffPointApi,
} from "../api/logistics";
import { formatTime, getUserId, removeCache } from "../utils";

export default {
  components: {},
  data() {
    return {
      orderForm: {
        serve: {},
        goodsList: [],
        remarks: "",
        senderInfo: null,
        consigneeInfo: null,
        warehouseId: null,
        priceDetail: null,
        estimateDays: "",
      },
      serveConfig,
      goodsConfig,
      goodsCollapse: true,
      senderUserInfoString: "",
      consigneeUserInfoString: "",
      warehouseList: ["暂无物流公司"],
      warehouseInfoString: "",
      priceValue: [],
      editId: null,
      appointWuliuQiyeID: null,
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

    // 获取仓库列表
    async getWarehouseList() {
      if (!this.orderForm.senderInfo || !this.orderForm.consigneeInfo) {
        this.warehouseList = ["暂无物流公司"];
        this.orderForm.warehouseId = null;
        this.warehouseInfoString = "";
        return;
      }

      const { data } = await getWarehouseListApi({
        senderAddress: this.orderForm.senderInfo.senderAddress,
        consigneeAddress: this.orderForm.consigneeInfo.consigneeAddress,
      });

      if (!data) {
        uni.showToast({
          title: "仓库列表获取失败",
          duration: 2000,
        });

        return;
      }

      this.warehouseList = data.map((item) => {
        item.showKey = `${item.wuliuName}-${item.address}`;
        return item;
      });

      this.chooseWarehouse(this.warehouseList[0]);
    },

    // 点击选择仓库
    handleChooseWarehouse(e) {
      const selectIndex = e.detail.value;
      this.chooseWarehouse(this.warehouseList[selectIndex]);
    },

    // 设置选中仓库信息
    chooseWarehouse(warehouseInfo) {
      this.orderForm.estimateDays = warehouseInfo.estimateDays;
      this.orderForm.warehouseId = warehouseInfo.warehouseId + "";
      this.warehouseInfoString = warehouseInfo.showKey;
    },

    // 获取物流报价
    async getOrderQuote() {
      if (
        !this.orderForm.senderInfo ||
        !this.orderForm.consigneeInfo ||
        !this.orderForm.goodsList.length
      ) {
        return;
      }
      const goodsList = JSON.parse(JSON.stringify(this.orderForm.goodsList));
      const data = {
        microInsuranceAmount: this.orderForm.senderInfo.microInsuranceAmount,
        isPickUp: this.orderForm.serve.take === "上门提货" ? true : false,
        deliveryType: mapDeliveryType(this.orderForm.serve.delivery),
        isHasElevator:
          this.orderForm.consigneeInfo.isHasElevator === "有" ? true : false,
        consigneeFloor: this.orderForm.consigneeInfo.consigneeFloor * 1,
        senderAddress: this.orderForm.senderInfo.senderAddress,
        consigneeAddress: this.orderForm.consigneeInfo.consigneeAddress,
        goodsList: goodsList.map((goods) => {
          console.log("这里", goods);
          delete goods.id;
          return goods;
        }),
      };
      const { data: price } = await getOrderQuoteApi(data);
      this.orderForm.priceDetail = price;
    },

    /**
     * @description 点击提交订单
     */
    async submitOrder() {
      const _this = this;
      if (!this.orderForm.senderInfo) {
        uni.showToast({
          title: "请填写寄件地址",
          duration: 2000,
          icon: "none",
        });

        return;
      }

      if (!this.orderForm.consigneeInfo) {
        uni.showToast({
          title: "请填写收件地址",
          duration: 2000,
          icon: "none",
        });

        return;
      }

      if (!this.orderForm.warehouseId) {
        uni.showToast({
          title: "请选择发货物流",
          duration: 2000,
          icon: "none",
        });

        return;
      }

      if (!this.orderForm.goodsList.length) {
        uni.showToast({
          title: "请添加商品信息",
          duration: 2000,
          icon: "none",
        });

        return;
      }

      const data = JSON.parse(JSON.stringify(this.orderForm));
      const postData = {
        ...data.senderInfo,
        ...data.consigneeInfo,
        deliveryType: mapDeliveryType(data.serve.delivery),
        isPickUp: data.serve.take === "上门提货",
        warehouseId: data.warehouseId,
        cargoControlType: mapCategoryControlType(data.serve.controlGoods),
        paymentMethod:
          data.serve.payType === "现付"
            ? 1
            : data.serve.payType === "到付"
            ? 2
            : null,
        pricingType: data.serve.valuation === "系统计价" ? 1 : 2,
        orderTime: formatTime(new Date()),
        estimateDays: data.estimateDays,
        goodsList: data.goodsList.map((item) => {
          delete item.id;
          if (!item.insuredPrice) {
            delete item.insuredPrice;
          }
          item.volume = item.volume * 1;
          return item;
        }),
        userId: getUserId(),
        remarks: data.remarks,
      };
      postData.consigneeFloor = postData.consigneeFloor * 1;
      postData.isHasElevator = postData.isHasElevator === "有";

      const api = this.editId ? editeOrderApi : createOrderApi;
      if (this.editId) {
        postData.id = this.editId;
      }

      try {
        uni.showLoading({
          title: "加载中",
        });
        const res = await api(postData);
        if (res.statusCode === 20000) {
          uni.showToast({
            title: _this.editId ? "订单修改成功" : "订单创建成功",
            duration: 2000,
          });

          if (res.statusCode === 20000) {
            uni.showToast({
              title: "订单创建成功",
              duration: 2000,
            });

            console.log(res);

            // this.orderForm.serve = {};
            // this.orderForm.goodsList = [];
            // this.orderForm.remarks = "";
            // this.orderForm.senderInfo = null;
            // this.orderForm.consigneeInfo = null;
            // this.orderForm.warehouseId = null;
            // this.orderForm.priceDetail = null;
            // this.orderForm.estimateDays = "";
            // this.senderUserInfoString = "";
            // this.consigneeUserInfoString = "";

            // removeCache([
            //   jiSenderInfo,
            //   jiRemarks,
            //   jiconsigneeInfo,
            //   jiOrderGoodsList,
            //   JI_EDIT_ORDER_ID,
            //   VALUE_ADDED_SERVICES,
            //   APPONIT_WULIU_QIYE_ID,
            // ]);

            setTimeout(() => {
              
            }, 1000)
          } else {
            uni.showToast({
              title: "订单创建失败",
              duration: 2000,
              icon: "none",
            });
          }

          console.log(res);
        } else {
          uni.showToast({
            title: res.statusMsg,
            duration: 2000,
            icon: "none",
          });
        }
      } catch (error) {
        uni.showToast({
          title: _this.editId ? "订单修改失败" : "订单创建失败",
          duration: 2000,
          icon: "none",
        });
      } finally {
        uni.hideLoading();
      }
    },

    /**
     * @description 获取指定物流仓库列表
     */
    async getApponitWuliuList() {
      console.log(this.appointWuliuQiyeID);
      const { data } = await getDropOffPointApi({
        qiyeId: this.appointWuliuQiyeID,
      });

      if (!data) {
        uni.removeStorageSync(APPONIT_WULIU_QIYE_ID);
        uni.showToast({
          title: "指定失败",
          duration: 2000,
          icon: "none",
        });
        this.getWarehouseList();
        return;
      }

      this.warehouseList = data.map((item) => {
        item.showKey = `${item.warehouseName}-${
          item.warehouseAddress + item.warehouseAddressDetail
        }`;
        return item;
      });

      this.chooseWarehouse(this.warehouseList[0]);
    },

    /**
     * 取消指定物流
     */
    cancelApponit() {
      this.appointWuliuQiyeID = null;
      uni.removeStorageSync(APPONIT_WULIU_QIYE_ID);
      this.getWarehouseList();
      uni.showToast({
        title: "取消成功",
        duration: 2000,
      });
    },
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
      this.orderForm.goodsList = goodsList.map((item) => {
        if (!item.weight) {
          item.weight = 0;
        }
        return item;
      });
    }

    /**
     * @description 获取收货人信息
     */
    const senderUserInfo = uni.getStorageSync(jiSenderInfo);
    if (senderUserInfo) {
      this.orderForm.senderInfo = senderUserInfo;
      let str = "";
      for (const key in senderUserInfo) {
        str += senderUserInfo[key] + " ";
      }

      this.senderUserInfoString =
        str === this.senderUserInfoString ? this.senderUserInfoString : str;
    }

    const consigneeUserInfo = uni.getStorageSync(jiconsigneeInfo);
    if (consigneeUserInfo) {
      this.orderForm.consigneeInfo = consigneeUserInfo;
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

    /**
     * 获取edit id 判断当前单是否是编辑的状态
     */
    this.editId = uni.getStorageSync(JI_EDIT_ORDER_ID) || null;

    /**
     * 获取appoinit物流企业id，判断当前是否指定物流
     */
    this.appointWuliuQiyeID = uni.getStorageSync(APPONIT_WULIU_QIYE_ID);
    if (this.appointWuliuQiyeID) {
      this.getApponitWuliuList();
    } else {
      this.getWarehouseList();
    }

    this.getOrderQuote();
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

/deep/ .uni-collapse {
  border-radius: 20upx;
  margin-top: 20upx;
}

.collapse-header {
  padding: 20upx;

  .line {
    position: relative;

    &::before {
      content: "";
      display: block;
      width: 100%;
      max-width: 80upx;
      height: 1px;
      position: absolute;
      top: 10px;
      left: 0;
      background-color: #000;
      transform: rotate(45deg);
    }
  }
}

.collapse-content {
  padding: 0 20upx 20upx 20upx;
  display: flex;
  flex-wrap: wrap;

  &-item {
    width: 49%;
    padding: 20upx 0;
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
      color: #3662ec;
      font-size: 32upx;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
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