<template>
  <view class="add-container">
    <view class="header">
      <img
        class="back"
        @click="handleBack"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qt4o7j0jglkweyicy1fw.png"
        alt=""
      />
      <h2>添加</h2>
    </view>

    <view class="main-title">客户信息添加</view>

    <view class="main">
      <view class="item">
        <view class="title">姓名</view>
        <input
          class="input"
          type="text"
          v-model="form.userName"
          placeholder="请输入姓名"
        />
      </view>

      <view class="item">
        <view class="title">电话</view>
        <input
          class="input"
          type="text"
          v-model="form.userTel"
          placeholder="请输入联系电话"
        />
      </view>

      <view class="item" @click="chooseGender">
        <view class="title">性别</view>
        <view class="desc">{{
          form.userGender ? form.userGender : "请选择性别"
        }}</view>
      </view>

      <button class="sub-button" @click="submit">提交</button>
    </view>
  </view>
</template>

<script>
import { getUserId } from "../../utils";
import { addCustomerApi } from "../../api/user";

export default {
  data() {
    return {
      form: {
        userName: "",
        userGender: "",
        userTel: "",
        userId: getUserId(),
      },
    };
  },

  methods: {
    chooseGender() {
      const _this = this;
      uni.showActionSheet({
        title: "请选择性别",
        itemList: ["男", "女", "未知"],
        success: function (res) {
          const data = {
            1: "男",
            2: "女",
            3: "未知",
          };

          _this.form.userGender = data[res.tapIndex + 1];
        },
        fail: function (res) {
          console.log(res.errMsg);
        },
      });
    },

    handleBack() {
      uni.redirectTo({
        url: "/user/digital-store/information-sentry",
      });
    },

    async submit() {
      if (!this.form.userName) {
        uni.showToast({
          title: "请输入客户姓名",
          duration: 2000,
          icon: "none",
        });

        return;
      }

      if (!this.form.userGender) {
        uni.showToast({
          title: "请选择客户性别",
          duration: 2000,
          icon: "none",
        });

        return;
      }

      if (!this.form.userTel) {
        uni.showToast({
          title: "请输入客户联系方式",
          duration: 2000,
          icon: "none",
        });

        return;
      }

      console.log(this.form);

      const res = await addCustomerApi(this.form);
      if (res === "新增成功") {
        uni.showToast({
          title: "客户添加成功",
          duration: 2000,
        });
        this.form.userName = "";
        this.form.userTel = "";
        this.form.userGender = "";
      } else {
        uni.showToast({
          title: "客户添加失败，请稍后重试",
          duration: 2000,
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
@import "../../style/var.less";

.add-container {
  padding: 30upx 20upx;
  box-sizing: border-box;

  .header {
    .flex();

    .back {
      width: 48upx;
    }

    h2 {
      flex: 1;
      font-weight: normal;
      font-size: 32upx;
      color: @c0;
      margin-left: 34upx;
      flex-shrink: 0;
    }
  }

  .main-title {
    text-align: center;
    font-weight: bold;
    margin-top: 60upx;
  }

  .main {
    padding: 20upx 40upx;
    .item {
      margin: 80upx 0;
      border-bottom: 1upx solid #e6ddda;
      padding-bottom: 10upx;

      .flex();
      .title {
        font-size: @f14;
        color: @c3d;
        margin-right: 10upx;
      }

      .input {
        flex: 1;
      }
    }
  }
}

.sub-button {
  margin-top: 120upx;
  background-color: #409eff;
  color: @cw;
}
</style>