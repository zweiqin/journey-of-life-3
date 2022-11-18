<template>
  <view class="store-application-container">
    <JHeader width="50" height="50" title="商家信息填写"></JHeader>
    <view class="header">
      <img src="" class="back" alt="" />
    </view>
    <FieldPane
      :fields="applyStoreOne"
      title="账号信息"
      v-model="form.accountInfo"
    ></FieldPane>

    <FieldPane
      :fields="applyStoreTow"
      title="门店信息"
      v-model="form.storeInfo"
    ></FieldPane>

    <JUpload
      v-for="item in uploadFields"
      :key="item.label"
      :title="item.label"
      :imgUrl="form.imgs[item.field]"
      @upload="handleSaveImg(item.field, $event)"
      @delete="handleDeleteImg(item.field)"
    ></JUpload>

    <view class="buts">
      <button class="btn" @click="submit(false)">保存</button>
      <button class="btn" @click="submit(true)">提交</button>
    </view>
  </view>
</template>

<script>
import FieldPane from "./components/field-pane.vue";
import {
  applyStoreOne,
  applyStoreTow,
  uploadFields,
  applyStatus,
} from "./config";
import {
  submitApplyStoreInfo,
  getUserUpInfoReadApi,
  getUserUpInfoListApi,
  getLevelPaySalesmanPrepayBySybApi,
} from "../../api/user";
import { payOrderGoodsApi } from "../../api/goods";
import { user_INFO, STORE_TYPES, USER_TOKEN } from "../../constant";
import { getUserId } from "../../utils";

export default {
  components: {
    FieldPane,
  },
  data() {
    return {
      applyStoreOne,
      applyStoreTow,
      uploadFields,
      applyStatus,
      status: "",
      contentText: "",
      upOrderId: "",
      payOrderID: "",
      form: {
        accountInfo: {},
        storeInfo: {},
        imgs: {},
      },
      // 门店类型列表
      storeType: [],
    };
  },

  onLoad() {
    this.getUserUpInfoRead();
    // this.getUserUpInfoList();
    // setInterval(() => {
    //   console.log(this.form.imgs);
    // }, 5000)
  },

  methods: {
    handleSaveImg(field, imgUrl) {
      this.form.imgs[field] = imgUrl;
      this.$forceUpdate();
    },
    // 点击提交按钮
    submit(tag) {
      const _this = this;
      const data = {
        ...this.form.imgs,
        ...this.form.storeInfo,
        ...this.form.accountInfo,
        applicationType: 1,
        avatar: (uni.getStorageSync(user_INFO) || {}).avatarUrl,
        startTime: "9:00",
        endTime: "18:00",
        userId: getUserId(),
      };

      if (!data.username) {
        this.$showToast("请输入要登录的帐号");
        return;
      }

      if (data.username.length < 6) {
        this.$showToast("登录帐号至少为六位");
        return;
      }

      if (!data.password) {
        this.$showToast("请输入要登录的密码");
        return;
      }

      if (data.password.length < 6) {
        this.$showToast("登录密码至少为六位");
        return;
      }

      if (
        !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
          data.brandPhone
        )
      ) {
        this.$showToast("联系电话格式错误");
        return;
      }

      if (!data.brandname) {
        this.$showToast("请填写门店名称");
        return;
      }

      if (!data.brandgenre) {
        this.$showToast("请选择门店所属类型");
        return;
      }

      if (!data.address) {
        this.$showToast("请选择门店所在城市");
        return;
      }

      if (!data.addressDetail) {
        this.$showToast("请填写门店详细地址");
        return;
      }

      if (!data.desc) {
        this.$showToast("请填写门店介绍");
        return;
      }

      if (!data.picUrl) {
        this.$showToast("请上传门店logo");
        return;
      }

      if (!data.licenseUrl) {
        this.$showToast("请上传营业执照");
        return;
      }

      if (!data.brandIdcardProsUrl) {
        this.$showToast("请上传法人身份证人像面");
        return;
      }

      if (!data.brandIdcardConsUrl) {
        this.$showToast("请上传法人身份证国徽面");
        return;
      }

      const storeTypes = uni.getStorageSync(STORE_TYPES);
      data.brandgenre = storeTypes.find(
        (item) => item.storeName === data.brandgenre
      ).id;

      data.salesmanname = data.username;

      data.address = data.address + "-" + data.addressDetail;
      delete data.addressDetail;

      if (tag) {
        uni.showModal({
          title: "提示",
          content: "确认提交门店申请？",
          success: function (res) {
            if (res.confirm) {
              submitApplyStoreInfo(tag, data).then((res) => {
                _this.$showToast("提交成功，请等待审核");
                setTimeout(() => {
                  uni.switchTab({
                    url: "/pages/user/user",
                  });
                }, 2000);
              });
            }
          },
        });
      } else {
        uni.showModal({
          title: "提示",
          content: "确认保存当前门店信息？",
          success: function (res) {
            if (res.confirm) {
              submitApplyStoreInfo(tag, data).then((res) => {
                _this.$showToast("保存成功", "success");
                setTimeout(() => {
                  uni.switchTab({
                    url: "/pages/user/user",
                  });
                }, 2000);
              });
            }
          },
        });
      }
    },
    //获取订单号
    async getLevelPaySalesmanPrepayBySyb() {
      const res = await getLevelPaySalesmanPrepayBySybApi({
        userId: getUserId(),
        upOrderId: this.upOrderId,
      });
      console.log("zhifu", res);
      this.payOrderID = res.data.payOrderID;
    },
    //付钱
    async payOrderForEnd() {
      // const res = await payOrderGoodsApi({
      //   orderNo: this.payOrderID,
      //   userId: getUserId(),
      //   payType: 4,
      // });
      // console.log(res);
      payOrderGoodsApi({
        orderNo: this.payOrderID,
        userId: getUserId(),
        payType: 4,
      }).then((res) => {
        const form = document.createElement("form");
        form.setAttribute("action", res.url);
        form.setAttribute("method", "POST");

        const data = JSON.parse(res.data);
        let input;
        for (const key in data) {
          input = document.createElement("input");
          input.name = key;
          input.value = data[key];
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      });
    },
    async getUserUpInfoRead() {
      this.token = uni.getStorageSync(USER_TOKEN);
      const res = await getUserUpInfoReadApi({
        userId: getUserId(),
        token: this.token,
        applicationType: 1,
      });
      console.log(res);
      let list = res.data;
      this.form.imgs.picUrl = list.picUrl;
      this.form.imgs.licenseUrl = list.licenseUrl;
      this.form.imgs.brandIdcardProsUrl = list.brandIdcardProsUrl;
      this.form.imgs.brandIdcardConsUrl = list.brandIdcardConsUrl;

      console.log(this.form.imgs);

      this.status = list.status;
      this.upOrderId = list.id;
      this.form.accountInfo.username = list.username;
      this.form.accountInfo.password = list.password;
      this.form.accountInfo.brandPhone = list.brandPhone;

      this.form.storeInfo.brandname = list.brandname;
      this.form.storeInfo.brandgenre = list.brandgenre;
      this.form.storeInfo.address = list.address.split("-")[0];
      this.form.storeInfo.addressDetail = list.address.split("-")[1];
      this.form.storeInfo.desc = list.desc;

      this.payWindow();
      this.getLevelPaySalesmanPrepayBySyb();
    },
    // async getUserUpInfoList() {
    //   const res = await getUserUpInfoListApi({});

    // },
    // 删除当前图片
    handleDeleteImg(field) {
      this.form.imgs[field] = "";
      this.$forceUpdate();
    },
    payWindow() {
      const _this = this;
      if (this.status == 2 || this.status == 3) {
        uni.showModal({
          title: "提示",
          content: "审核已通过，是否支付？",
          success: function (res) {
            if (res.confirm) {
              // console.log(res);
              _this.payOrderForEnd();
            } else {
              // console.log('o,g');
            }
          },
        });
      } else if (this.status == 0 || this.status == 1) {
        this.toggle();
      }
    },
    toggle() {
      let applyStatus = this.applyStatus;
      let title = applyStatus.find(
        (applyStatus) => applyStatus.key == this.status
      );
      this.contentText = title.value;
      uni.showModal({
        title: "提示",
        content: this.contentText,
        showCancel: true,
        success: ({ confirm, cancel }) => {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
.store-application-container {
  padding: 40upx;
  box-sizing: border-box;

  .buts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 272upx;

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 72upx;
      width: 306upx;
      font-size: 32upx;
      color: #fff;
      margin: 0;
      background-color: #07b9b9;
      border-radius: 100px;

      &:last-child {
        background-color: #fa5151;
      }
    }
  }
}
</style>