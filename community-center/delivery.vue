<template>
  <view class="delivey-info">
    <Header title="提货信息"></Header>
    <view class="info">
      <view class="title">提货信息</view>
      <view class="main-wrapper">
        <Field
          @select="handleChooseAddress"
          v-model="deliveryForm[item['field']]"
          v-for="item in userInfo"
          :key="item.label"
          :data="item"
          class="field"
        >
          <template v-if="item.select">
            <pick-regions visibleMuti @getRegion="handleGetRegionEnd">
              <input
                type="text"
                class="uni-input"
                disabled
                v-model="deliveryForm.deliveryAddress"
                placeholder="请选择目的地"
                adjust-position
                cursor-spacing="180"
              />
            </pick-regions>
          </template>
        </Field>
      </view>
    </view>

    <Remarks
      style="margin-top: 20px"
      @distinguish="handleDistinguish"
      :isDistinguish="true"
    ></Remarks>

    <Button @click="confirm">确定</Button>
  </view>
</template>

<script>
import Field from "./components/field.vue";
import PickRegions from "../components/pick-regions/pick-regions.vue";
import Button from "./components/button.vue";
import Remarks from "./components/remarks.vue";
import { deliveryInfo } from "./config";
import Header from "./components/header.vue";
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
      deliveryForm: {
        deliveryName: "",
        deliveryMobile: "",
        deliveryAddress: "",
        deliveryAddressDetaile: "",
      },
      userInfo: deliveryInfo,
    };
  },

  onShow() {
    const deliveryInfo = uni.getStorageSync("DELIVERY_INFO");
    if (deliveryInfo) {
      this.deliveryForm = JSON.parse(deliveryInfo);
    }
  },
  methods: {
    // 点击确定
    confirm() {
      if (
        !this.deliveryForm.deliveryName ||
        !this.deliveryForm.deliveryMobile ||
        !this.deliveryForm.deliveryAddress ||
        !this.deliveryForm.deliveryAddressDetaile
      ) {
        uni.showToast({
          title: "请填写完提货信息",
          icon: "none",
        });

        return;
      }

      if (this.deliveryForm.deliveryMobile.length !== 11) {
        uni.showToast({
          title: "手机号不合法",
          icon: "none",
        });

        return;
      }

      wx.setStorageSync("DELIVERY_INFO", JSON.stringify(this.deliveryForm));
      uni.redirectTo({
        url: "/community-center/delivery-install",
      });
    },
    // 选择省市区
    handleGetRegionEnd(region) {
      this.deliveryForm.deliveryAddress = region
        .map((item) => item.name)
        .join("");
    },
    // 点击识别
    handleDistinguish(result) {
      console.log(result);
      this.deliveryForm.deliveryName = result.person;
      this.deliveryForm.deliveryMobile = result.phonenum;
      this.deliveryForm.deliveryAddress =
        result.province + result.city + result.county;
      this.deliveryForm.deliveryAddressDetaile = result.detail;
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
}
</style>
