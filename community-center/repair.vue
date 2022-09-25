<template>
  <view class="repair-page">
    <Header title="维修订单"></Header>
    <view class="consignee" @click="handleCollectConsigneeInfo">
      <view class="left">
        <view class="main-title">客户信息</view>
        <view class="desc">
          {{ consigneeStr || "复制客户完整信息，系统可自动识别地址" }}
        </view>
      </view>

      <view class="right">信息簿</view>
    </view>

    <view class="item">
      <view class="main-title">服务需求</view>
      <view class="desc">
        <picker
          @change="handleChooseServe"
          :range="serveTypeList"
          :value="typeSelectIndex"
          range-key="name"
          style="width: 100%; height: 100%"
        >
          <view style="color: #4395ff"> {{ repairForm.dictName }} </view>
        </picker>
      </view>
      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/8jef23u4szet1cnjuec5.png"
        alt=""
      />
    </view>

    <view class="item">
      <view class="main-title">维修日期</view>
      <view class="desc">
        <DatetimePicker @confirm="handleSelectTime">
          <view :style="{ color: repairForm.installDate ? '#4395ff' : '' }">
            {{
              repairForm.installDate ? repairForm.installDate : "请选择维修时间"
            }}
          </view>
        </DatetimePicker>
      </view>
      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/8jef23u4szet1cnjuec5.png"
        alt=""
      />
    </view>

    <view class="item">
      <view class="main-title">维修商品</view>
      <view class="desc" @click="handleCollectRepairGoods">
        已选 &nbsp;
        <span style="color: #4395ff"
          >{{ repairForm.orderGoodsList.length }}
        </span>
        &nbsp;件
      </view>
      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/8jef23u4szet1cnjuec5.png"
        alt=""
      />
    </view>

    <Remarks
      title="维修说明"
      :desc="'维修说明\n请描述维修商品的伤口数量，颜色以及材质'"
      v-model="repairForm.remarks"
      style="'margin-top':10px "
    ></Remarks>

    <Button @click="handleCreateOrder">提交</Button>
  </view>
</template>

<script>
import Remarks from "./components/remarks.vue";
import Button from "./components/button.vue";
import { getUserId, removeCache } from "../utils";
import DatetimePicker from "../components/datetime-picker/index.vue";
import Header from "./components/header.vue";
import {
  createRepairOrderApi,
  getOrderDetailApi,
  getDictListApi,
} from "../api/community-center";

const cacheArr = [
  "REPAIR_INFO",
  "REPAIR_TIME",
  "REPAIR_GOODS",
  "EDIT_REPAIR_ORDER",
  "EDIT_REPAIR_ID",
  "REPAIR_REMARKS",
  "REPAIR_SERVE_TYPE",
];

export default {
  components: {
    Remarks,
    DatetimePicker,
    Button,
    Header,
  },
  data() {
    return {
      consigneeStr: "",
      consigneeMsg: {},
      repairForm: {
        remarks: "",
        orderType: 1,
        pricingType: 2,
        paymentMethod: 1,
        deliveryType: 4,
        installDate: "", // 维修日期
        orderGoodsList: [],
        dictName: "家具维修",
      },
      serveTypeList: [],
      typeSelectIndex: 0,
    };
  },
  methods: {
    /**
     * @description 点击去收货信息
     */
    handleCollectConsigneeInfo() {
      uni.navigateTo({
        url: "/community-center/consignee?repair=true",
      });
    },

    /**
     * @description 点击收集维修产品信息
     */
    handleCollectRepairGoods() {
      uni.navigateTo({
        url: "/community-center/repair-goods",
      });
    },

    /**
     * @description 选择维修日期
     */
    handleSelectTime(time) {
      this.repairForm.installDate = time.value;
      uni.setStorageSync("REPAIR_TIME", time.value);
    },

    /**
     * @description 提交订单
     */
    async handleCreateOrder() {
      if (!this.consigneeMsg.consigneeName) {
        uni.showToast({
          title: "请填写客户信息",
          icon: "none",
        });

        return;
      }

      if (!this.repairForm.installDate) {
        uni.showToast({
          title: "请选择维修时间",
          icon: "none",
        });

        return;
      }

      if (this.repairForm.orderGoodsList.length === 0) {
        uni.showToast({
          title: "请添加维修产品",
          icon: "none",
        });

        return;
      }

      const postData = JSON.parse(
        JSON.stringify({ ...this.repairForm, ...this.consigneeMsg })
      );

      postData.userId = getUserId();

      postData.id = uni.getStorageSync("EDIT_REPAIR_ID");

      delete postData.floor;
      delete postData.isElevator;

      for (let item of postData.orderGoodsList) {
        if (item.goodsUrl) {
          item.goodsUrl = item.goodsUrl.join(",");
        }
        delete item.id;
      }

      createRepairOrderApi(postData).then((res) => {
        if (res.statusCode === 20000) {
          uni.showToast({
            title: postData.id ? "修改成功" : "提交成功",
          });

          removeCache(cacheArr);

          this.repairForm.remarks = "";
          this.repairForm.installDate = "";
          this.repairForm.orderGoodsList = [];
          this.consigneeMsg = {};
          this.consigneeStr = "";
          this.repairForm.dictName = "";

          setTimeout(() => {
            uni.navigateTo({
              url: "/community-center/order",
            });
          }, 1000);
        } else {
          uni.showToast({
            title: res.statusMsg,
            duration: 2000,
            icon: "none",
          });
        }
      });
    },

    /**
     * @description 获取订单详情
     */
    getOrderDetail(orderNo) {
      const _this = this;
      orderNo = orderNo || uni.getStorageSync("EDIT_REPAIR_ORDER");
      if (!orderNo) {
        return;
      }

      getOrderDetailApi(orderNo).then((res) => {
        console.log("我操了", res);
        if (res.statusCode === 20000) {
          const info = res.data[0];
          if (!info) {
            uni.showToast({
              title: "订单信息获取失败",
              icon: "none",
            });

            uni.navigateBack();
            return;
          }

          _this.repairForm.remarks = info.remarks;
          _this.repairForm.id = info.id;
          _this.repairForm.dictName = info.dictName;

          const consigneeCacheData = {
            consigneeName: info.consigneeName,
            consigneeMobile: info.consigneeMobile,
            consigneeAddress: info.consigneeAddress,
            consigneeAddressDetail: info.consigneeAddressDetail,
          };

          const goodsList = [];

          for (const item of res.data) {
            const good = {
              id: new Date().getTime(),
              goodsUrl: item.goodsUrl ? item.goodsUrl.split(",") : [],
              categoryName: item.categoryName,
            };
            goodsList.push(good);
          }

          uni.setStorageSync("REPAIR_INFO", consigneeCacheData);
          uni.setStorageSync("REPAIR_GOODS", goodsList);
          uni.setStorageSync("REPAIR_TIME", info.installDate.split(" ")[0]);
          uni.setStorageSync("EDIT_REPAIR_ID", info.id);
          uni.setStorageSync("REPAIR_REMARKS", info.remarks);
          uni.setStorageSync("REPAIR_SERVE_TYPE", info.dictName);

          _this.setData();
        } else {
          uni.showToast({
            title: res.statusMsg,
            duration: 2000,
          });
        }
      });
    },

    /**
     * @description 获取缓存设置数据
     */
    setData() {
      this.repairForm.installDate = uni.getStorageSync("REPAIR_TIME") || "";
      this.repairForm.orderGoodsList = uni.getStorageSync("REPAIR_GOODS") || [];
      this.repairForm.dictName =
        uni.getStorageSync("REPAIR_SERVE_TYPE") || "家具维修";
      const consigneeInfo = uni.getStorageSync("REPAIR_INFO");
      if (consigneeInfo.consigneeName) {
        this.consigneeMsg = consigneeInfo;
        this.consigneeStr =
          consigneeInfo.consigneeName +
          " " +
          consigneeInfo.consigneeMobile +
          " " +
          consigneeInfo.consigneeAddress +
          " " +
          consigneeInfo.consigneeAddressDetail;
      }
      this.repairForm.remarks = uni.getStorageSync("REPAIR_REMARKS");
    },

    /**
     * 获取服务需求列表
     */
    getServeTypeList() {
      const _this = this;
      getDictListApi().then((res) => {
        _this.serveTypeList = res.data;
        const index = _this.serveTypeList.findIndex((item) => {
          return item.name === _this.repairForm.dictName;
        });

        _this.typeSelectIndex = index;
      });
    },

    /**
     * @description 选择服务需求
     */
    handleChooseServe(e) {
      const selectedValue = this.serveTypeList[e.detail.value].name;
      this.repairForm.dictName = selectedValue;
      uni.setStorageSync(
        "REPAIR_SERVE_TYPE",
        this.serveTypeList[e.detail.value].name
      );
    },
  },

  onShow() {
    this.setData();
  },

  onLoad(options) {
    uni.setStorageSync("EDIT_REPAIR_ORDER", options.orderNo);
    this.getOrderDetail();
    this.getServeTypeList();
  },
};
</script>

<style lang="scss" scoped>
.repair-page {
  .main-title {
    color: #111;
    font-size: 34upx;
    margin-right: 33upx;
  }

  .desc {
    color: #999999;
    font-size: 26upx;
  }

  .consignee {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40upx;
    margin: 20upx 0;
    background-color: #fff;

    .left {
      flex: 1;
      margin-right: 30upx;
      border-right: 1upx solid #e5e5e5;
    }
  }

  .item {
    display: flex;
    align-items: center;
    padding: 20upx 40upx;
    background-color: #fff;

    &:nth-child(n-1) {
      border-bottom: 1upx solid rgb(233, 233, 233);
    }

    .desc {
      flex: 1;
      font-size: 34upx;
      color: #b2b2b2;
    }

    img {
      width: 16upx;
      height: 26upx;
    }
  }
}
</style>
