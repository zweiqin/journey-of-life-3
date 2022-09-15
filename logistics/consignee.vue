<template>
  <view class="sender-container">
    <view class="header">
      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qt4o7j0jglkweyicy1fw.png"
        class="back"
        alt=""
        @click="back"
      />

      <h2>收件地址</h2>
    </view>

    <view class="main">
      <view
        class="item"
        :key="item.label"
        v-for="item in consigneeInfo"
        @click="handleChooseIsHasElevator(item)"
      >
        <view class="sub-title">{{ item.label }}</view>
        <view class="value">
          <template v-if="item.field === 'consigneeAddress'">
            <view
              class="form_address_input"
              @click="() => (visibleMuti = true)"
            >
              <pick-regions
                :visibleMuti.sync="visibleMuti"
                @getRegion="cityChange"
              >
                <input
                  type="text"
                  class="uni-input"
                  disabled
                  v-model="consigneeInfoForm[item.field]"
                  placeholder="请选择城市"
                  placeholder-class="size"
                  adjust-position
                  cursor-spacing="180"
                />
              </pick-regions>
            </view>
          </template>
          <input
            v-else
            class="text-input"
            v-model="consigneeInfoForm[item.field]"
            type="text"
            :placeholder="item.placeholder"
          />
        </view>
      </view>

      <IntelligentRecognition
        @intelligent="handleIntelligent"
      ></IntelligentRecognition>
    </view>

    <button class="save-btn" @click="saveInfo">保存</button>
  </view>
</template>

<script>
import IntelligentRecognition from "./component/intelligent-recognition.vue";
import PickRegions from "../components/pick-regions/pick-regions.vue";
import { consigneeInfo } from "./config";
import { jiconsigneeInfo } from "../constant";

export default {
  components: {
    IntelligentRecognition,
    PickRegions,
  },

  data() {
    return {
      consigneeInfo,
      consigneeInfoForm: {
        consigneeName: "",
        consigneeMobile: "",
        consigneeAddress: "",
        consigneeAddressDetail: "",
        isHasElevator: 1,
        consigneeFloor: "",
      },

      visibleMuti: false,
    };
  },

  methods: {
    back() {
      uni.navigateBack();
    },

    /**
     * 点击保存按钮
     */
    saveInfo() {
      const _this = this;
      for (const key in this.consigneeInfoForm) {
        if (!this.consigneeInfoForm[key]) {
          const item = _this.consigneeInfo.find((item) => item.field === key);
          uni.showToast({
            title: item.placeholder,
            duration: 2000,
            icon: "none",
          });

          return;
        }
      }
      uni.setStorageSync(jiconsigneeInfo, this.consigneeInfoForm);
      uni.navigateBack();
    },

    /**
     * @description 选择城市
     */
    cityChange(value) {
      this.consigneeInfoForm.consigneeAddress =
        value[0].name + value[1].name + value[2].name;
    },

    /**
     * @description 选择是否有电梯
     */
    handleChooseIsHasElevator(item) {
      const _this = this;
      if (item.field === "isHasElevator") {
        uni.showActionSheet({
          itemList: ["有", "无"],
          success: function (choose) {
            const index = choose.tapIndex;
            _this.consigneeInfoForm.isHasElevator = index === 0 ? "有" : "无";
          },
        });
      }
    },

    // 智能识别
    handleIntelligent(info) {
      this.consigneeInfoForm.consigneeName = info.person;
      this.consigneeInfoForm.consigneeMobile = info.phonenum;
      this.consigneeInfoForm.consigneeAddress = info.province + info.city + info.county
      this.consigneeInfoForm.consigneeAddressDetail = info.town + info.detail
    },
  },

  onLoad() {
    const userInfo = uni.getStorageSync(jiconsigneeInfo);
    if (userInfo) {
      this.consigneeInfoForm = userInfo;
    }
  },
};
</script>

<style lang="less" scoped>
@import "../style/var.less";
@import "../style/mixin.less";

.sender-container {
  padding: 30upx 26upx;
  height: 100%;
  background: linear-gradient(180deg, #cde1fd 0%, #efefef 22%, #efefef 100%);

  .header {
    display: flex;
    align-items: center;

    h2 {
      color: @c0;
      font-size: @f16;
      font-weight: bold;
      flex: 1;
      text-align: center;
    }

    .back {
      .img(48upx);
    }
  }

  .main {
    width: 100%;
    background: @cw;
    padding: 10upx 26upx;
    border-radius: @r5;
    box-sizing: border-box;
    margin-top: 34upx;

    .item {
      display: flex;
      font-size: @f14;
      padding: 40upx 0;
      .border-bottom(#D8D8D8);

      .sub-title {
        flex: 0 0 80px;
        white-space: nowrap;
        color: @c3d;
      }

      .value {
        .text-input {
          font-size: @f14;

          &::placeholder {
            color: @c9;
            font-size: @f14;
          }
        }
      }
    }
  }

  .save-btn {
    background-color: #3662ec;
    color: @cw;
    height: 72upx;
    line-height: 72upx;
    font-size: 36upx;
    .margin(40upx, 28upx);
    border-radius: 40px;
  }
}
</style>