<template>
  <view class="sender-container">
    <view class="header">
      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qt4o7j0jglkweyicy1fw.png"
        class="back"
        alt=""
        @click="back"
      />

      <h2>寄件地址</h2>
    </view>

    <view class="main">
      <view class="item" :key="item.label" v-for="item in senderInfo">
        <view class="sub-title">{{ item.label }}</view>
        <view class="value">
          <template v-if="item.field === 'senderAddress'">
            <!-- <view
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
                  v-model="senderInfoForm[item.field]"
                  placeholder="请选择城市"
                  placeholder-class="size"
                  adjust-position
                  cursor-spacing="180"
                />
              </pick-regions>
            </view> -->
            广东省佛山市顺德区
          </template>
          <input
            v-else
            class="text-input"
            v-model="senderInfoForm[item.field]"
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
import { senderInfo } from "./config";
import { jiSenderInfo } from "../constant";

export default {
  components: {
    IntelligentRecognition,
    PickRegions,
  },

  data() {
    return {
      senderInfo,
      senderInfoForm: {
        senderName: "",
        senderMobile: "",
        senderAddress: "广东省佛山市顺德区",
        senderAddressDetail: "",
        microInsuranceAmount: 1,
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
      for (const key in this.senderInfoForm) {
        if (!this.senderInfoForm[key]) {
          const item = _this.senderInfo.find((item) => item.field === key);
          uni.showToast({
            title: item.placeholder,
            duration: 2000,
            icon: "none",
          });

          return;
        }
      }
      uni.setStorageSync(jiSenderInfo, this.senderInfoForm);
      uni.navigateBack();
    },

    cityChange(value) {
      this.senderInfoForm.senderAddress =
        value[0].name + value[1].name + value[2].name;
    },

    handleIntelligent(info) {
      this.senderInfoForm.senderName = info.person;
      this.senderInfoForm.senderMobile = info.phonenum;
      this.senderInfoForm.senderAddressDetail = info.town + info.detail;
    },
  },

  onLoad() {
    const userInfo = uni.getStorageSync(jiSenderInfo);
    if (userInfo) {
      this.senderInfoForm = userInfo;
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
      font-size: 32upx;
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
      font-size: 28upx;
      padding: 40upx 0;
      .border-bottom(#D8D8D8);

      .sub-title {
        flex: 0 0 80px;
        white-space: nowrap;
        color: @c3d;
      }

      .value {
        .text-input {
          font-size: 28upx;

          &::placeholder {
            color: @c9;
            font-size: 28upx;
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