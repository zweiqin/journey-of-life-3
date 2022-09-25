<template>
  <uni-popup :maskClick="false" ref="cancelRef" type="center">
    <view class="cancel-wrapper">
      <view class="cancel-title">取消订单</view>
      <radio-group @change="cancelRadioChange">
        <label class="radio-list" v-for="item in cancelList" :key="item">
          <view><radio :value="item" :checked="item === cancelRadio" /></view>
          <view>{{ item }}</view>
        </label>
      </radio-group>
      <textarea
        v-model="cancelInput"
        placeholder="其它"
        class="remark-input"
        v-if="cancelRadio === '其它'"
      />
      <view class="cancel-btn">
        <view
          ><button
            type="primary"
            style="margin-bottom: 5px; margin-top: 5px; background: #d2691e"
            size="mini"
            @click="closeCancel"
          >
            取消
          </button></view
        >
        <view
          ><button
            type="primary"
            style="margin-bottom: 5px; margin-top: 5px; background: #015cb7"
            size="mini"
            @click.stop="fixCancel"
          >
            确定
          </button></view
        >
      </view>
    </view>
  </uni-popup>
</template>

<script>
import { cancelOrderApi } from "../../api/community-center";
import { getUserId } from "../../utils";

export default {
  data() {
    return {
      cancelList: [
        "订单下错了",
        "订单取消了",
        "货物未生产",
        "仓库无现货",
        "其它",
      ],
      cancelRadio: "订单下错了",
      cancelInput: "",
      id: null,
    };
  },

  methods: {
    show({ data, onSuccess }) {
      this.onSuccess = onSuccess;
      this.id = data.id;
      this.cancelInput = "";
      this.$refs.cancelRef.open();
    },
    cancelRadioChange(event) {
      this.cancelRadio = event.detail.value;
    },
    closeCancel() {
      this.$refs.cancelRef.close();
    },
    fixCancel() {
      const params = {
        cancelRemarks: "",
        id: this.id,
      };
      if (this.cancelRadio !== "其它") {
        params.cancelRemarks = this.cancelRadio;
      } else {
        if (!this.cancelInput) {
          uni.showToast({
            title: "请输入原因",
            icon: "none",
          });
          return;
        }
        params.cancelRemarks = this.cancelInput;
      }

      cancelOrderApi({ ...params, userId: getUserId() }).then(() => {
        this.$refs.cancelRef.close();
        this.onSuccess();
      });
      // request.laoa_huozhu_post(
      //   "/api/md/order/cancelOrder",
      //   params,
      //   (res) => {

      //   },
      //   () => {}
      // );
    },
  },
};
</script>

<style lang="scss" scoped>
.cancel-wrapper {
  background-color: #fff;
  border-radius: 10rpx;
  width: 468rpx;
  padding: 30rpx;
  position: relative;

  .cancel-title {
    text-align: center;
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
  }

  .radio-list {
    display: flex;
    margin-bottom: 5px;
  }

  .remark-input {
    width: 434rpx;
    height: 200rpx;
    padding: 20rpx;
    border-radius: 10rpx;
    margin: 30rpx auto 0 auto;
    background-color: #f1f1f1;
    color: #333333;
    box-sizing: border-box;
    font-size: 28rpx;
  }

  .cancel-btn {
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
  }
}
</style>
