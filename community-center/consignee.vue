<template>
  <view class="delivey-info">
    <Header bgc="#f90" title="地址信息"></Header>
    <!-- redirect="/pages/community-center/community-center" -->
    <view class="info">
      <view class="title">地址信息</view>
      <!-- {{ consigneeForm }} -->
      <view class="main-wrapper">
        <Field
          v-model="consigneeForm[item['field']]"
          v-for="item in userInputMsg"
          :key="item.label"
          :data="item"
          class="field"
        >
          <template v-if="item.select && item.field === 'consigneeAddress'">
            <!-- <pick-regions visibleMuti @getRegion="handleGetRegionEnd">
              <input
                type="text"
                class="uni-input"
                disabled
                v-model="consigneeForm.consigneeAddress"
                placeholder="请选择目的地"
                adjust-position
                cursor-spacing="180"
              />
            </pick-regions> -->

            <view @click="handleChooseAddress">{{
              consigneeForm.consigneeAddress || "请选择上门地址"
            }}</view>
          </template>

          <template v-if="item.select && item.field === 'isElevator'">
            <picker
              @change="handleChooseElevator"
              :range="columns"
              style="width: 100%; height: 100%"
            >
              <view class="elevator">{{ consigneeForm.isElevator }}</view>
            </picker>
          </template>
        </Field>
      </view>

      <TuanCity @confirm="handleConfirmAddress" ref="TuanCityRef"></TuanCity>
    </view>

    <!-- <Remarks
      style="margin-top: 20px"
      @distinguish="handleDistinguish"
      :isDistinguish="true"
    ></Remarks> -->

    <Button type="error" @click="confirm">确定</Button>
  </view>
</template>

<script>
import Field from "./components/field.vue";
import PickRegions from "../components/pick-regions/pick-regions.vue";
import Button from "./components/button.vue";
import Remarks from "./components/remarks.vue";
import Header from "./components/header.vue";
import { consigneeInfo, mapBackRoute } from "./config";
export default {
  components: {
    Field,
    PickRegions,
    Button,
    Remarks,
    Header,
  },
  data() {
    return {
      consigneeForm: {
        consigneeName: "",
        consigneeMobile: "",
        consigneeAddress: "",
        consigneeAddressDetail: "",
        isElevator: "有",
        floor: "",
      },
      userInputMsg: [],
      columns: ["有", "无"],
      cacheName: "CONSIGNEE_",
    };
  },

  onShow() {
    const consigneeInfo = uni.getStorageSync(`${this.cacheName}INFO`);
    if (consigneeInfo) {
      this.consigneeForm.consigneeName = consigneeInfo.consigneeName;
      this.consigneeForm.consigneeMobile = consigneeInfo.consigneeMobile;
      this.consigneeForm.consigneeAddress = consigneeInfo.consigneeAddress;
      this.consigneeForm.consigneeAddressDetail =
        consigneeInfo.consigneeAddressDetail;
      this.consigneeForm.floor = consigneeInfo.floor + "";
      this.consigneeForm.isElevator = consigneeInfo.isElevator ? "有" : "无";
    }
  },
  onLoad(option) {
    if (option.repair) {
      this.cacheName = "REPAIR_";
    }

    this.filterDate();
  },
  methods: {
    // 点击确定
    confirm() {
      const _this = this;

      if (
        !this.consigneeForm.consigneeName ||
        !this.consigneeForm.consigneeMobile ||
        !this.consigneeForm.consigneeAddress ||
        !this.consigneeForm.consigneeAddressDetail
      ) {
        uni.showToast({
          title: "请填写完提货信息",
          icon: "none",
        });

        return;
      }

      if (this.consigneeForm.consigneeMobile.length !== 11) {
        uni.showToast({
          title: "手机号不合法",
          icon: "none",
        });

        return;
      }

      if (
        this.cacheName === "CONSIGNEE_" &&
        (this.consigneeForm.floor < 1 || this.consigneeForm.floor.includes("."))
      ) {
        uni.showToast({
          title: "楼层不应小于1且为整数",
          icon: "none",
        });

        return;
      }

      uni.setStorageSync(`${this.cacheName}INFO`, this.consigneeForm);

      uni.redirectTo({
        url: mapBackRoute(_this.cacheName),
      });
    },
    // 选择省市区
    handleGetRegionEnd(region) {
      this.consigneeForm.consigneeAddress = region
        .map((item) => item.name)
        .join("");
    },
    // 点击识别
    handleDistinguish(result) {
      this.consigneeForm.consigneeName = result.person;
      this.consigneeForm.consigneeMobile = result.phonenum;
      this.consigneeForm.consigneeAddress =
        result.province + result.city + result.county;
      this.consigneeForm.consigneeAddressDetail = result.detail;
    },

    // 点击选择有无电梯
    handleChooseElevator(e) {
      this.consigneeForm.isElevator = e.detail.value + "" == 1 ? "无" : "有";
      console.log(e.detail.value, this.consigneeForm);
    },

    // 过滤列表
    filterDate() {
      let data = consigneeInfo;
      if (this.cacheName === "REPAIR_") {
        data = data.filter((item) => {
          console.log(item.field !== "isElevator");
          return item.field !== "isElevator" && item.field !== "floor";
        });
      }
      this.userInputMsg = data;
    },

    // 点击选择地址
    handleConfirmAddress(selectInfo) {
      this.consigneeForm.consigneeAddress = selectInfo.formatAddress4;
    },

    handleChooseAddress() {
      this.$refs.TuanCityRef.show();
    },
  },
};
</script>

<style lang="less" scoped>
.delivey-info {
  padding-bottom: 170upx;
  .info {
    .title {
      color: #888;
      margin: 47upx auto 12upx 30upx;
      font-size: 26upx;
    }
    .main-wrapper {
      background-color: #fff;
    }

    .field {
      border-bottom: 1upx solid rgb(228, 228, 228);
    }
  }

  .elevator {
    color: #111;
    font-size: 34upx;
  }
}
</style>
