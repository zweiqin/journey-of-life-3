<template>
  <view class="addUser">
    <Ttitle :title="titleText"></Ttitle>
    <view class="last" v-for="item in addDetail" :key="item.value">
      <view v-if="type == 0 ? item.status - 1 == value : item.status <= value">
        <!-- 文本输入框 -->
        <view class="inputText" v-if="item.type == 'text'">
          <view class="title1">{{ item.label }}</view>
          <input
            class="inputClass"
            v-model="from[item.field]"
            placeholder-class="input-placeholder"
            type="text"
          />
        </view>
        <!-- 数字输入框 -->
        <view class="inputNumber" v-else-if="item.type == 'number'">
          <view class="title1">{{ item.label }}</view>

          <input
            class="inputClass"
            v-model="from[item.field]"
            placeholder-class="input-placeholder"
            type="number"
          />
        </view>
        <!-- 性别选择框 -->
        <view class="choseSex" v-else-if="item.type == 'sex'">
          <view class="title1">{{ item.label }}</view>
          <uni-data-select
            placeholder=""
            v-model="from[item.field]"
            :localdata="range"
            :clear="false"
          ></uni-data-select>
        </view>
        <!-- 生日选择框 -->
        <view class="choseBirthday" v-else-if="item.type == 'birthday'">
          <view class="title1">{{ item.label }}</view>

          <uni-datetime-picker
            v-model="from[item.field]"
            :clear-icon="false"
            type="date"
            style="
              flex: 1;
              border-bottom: 1px solid #d8d8d8;
              margin-left: 30upx;
              height: 70upx;
              padding-left: 20upx;
            "
            :style="{
              color: from[item.field] ? 'black' : '#D8D8D8',
            }"
            >{{ from[item.field] || "请选择日期" }}</uni-datetime-picker
          >
        </view>
      </view>
    </view>
    <!-- type=0 升级 type=1 修改 type =2 新增 -->
    <view class="sumbit" v-if="type == 1" @click="saveMsgSentry(from)"
      >提交</view
    >
    <view class="sumbit" v-else-if="type == 0" @click="upbussiness(from)"
      >提交</view
    >
  </view>
</template>

<script>
import { saveMsgSentryApi, upbussinessApi } from "../../../../api/user";
import { getUserId } from "../../../../utils";
import { addDetail } from "./config.js";
export default {
  name: "addUser",
  components: {},
  props: {},
  data() {
    return {
      titleText: "添加客户信息",
      addDetail,
      from: {},
      birthday: "",
      range: [
        { value: 0, text: "未知" },
        { value: 1, text: "男" },
        { value: 2, text: "女" },
      ],
      value: "",
      type: "",
      id: "",
      userInformation: {},
    };
  },
  computed: {},
  methods: {
    async upbussiness() {
      const res = await upbussinessApi({
        id: this.id,
        // id: 267,
        status: this.value * 1 + 1,
        hobby: this.from.hobby,
        workingPlace: this.from.workingPlace,
        homeAddress: this.from.homeAddress,
        birthday: this.birthday,
      });
      if (res.errno == 0) {
        uni.showModal({
          title: "升级成功",
          content: "是否返回上一页",
          showCancel: true,
          success: ({ confirm, cancel }) => {
            if (confirm) {
              uni.navigateTo({ url: "/user/digital-store/newBusiness/index" });
            }
          },
        });
      } else {
        uni.showToast({
          title: "升级失败",
          icon: "none",
          mask: true,
        });
      }
      console.log(res);
    },
    async saveMsgSentry() {
      if (!this.from.career) {
        uni.showToast({
          title: "职业类型不能为空",
          icon: "none",
          mask: true,
        });
        return;
      } else {
        const res = await saveMsgSentryApi({
          // brandUserId: 269,
          brandUserId: getUserId(),
          userName: this.from.userName,
          userGender: this.from.userGender,
          userTel: this.from.userTel,
          professional: this.from.professional,
          belongsSalesman: this.from.belongsSalesman,
          belongsDepartment: this.from.belongsDepartment,
        });
        console.log(res);
        if (res.errno == 0) {
          uni.showModal({
            title: "添加成功，是否继续添加",
            content: "",
            showCancel: true,
            success: ({ confirm, cancel }) => {
              if (confirm) {
                this.from = {};
              } else {
                uni.navigateTo({
                  url: "/user/digital-store/newBusiness/index",
                });
              }
            },
          });
        } else {
          uni.showToast({
            title: res.errmsg,
            icon: "none",
            mask: true,
          });
        }
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.id = options.id;
    if (options.type == 0) {
      this.titleText = "添加客户信息";
    } else if (options.type == 1) {
      this.titleText = "修改客户信息";
      // this.addDetail.splice(4, 2);
      this.userInformation = JSON.parse(options.data);
      this.from = this.userInformation;
      // console.log(this.addDetail);
    }
    if (options.value && options.type) {
      this.value = options.value;
      this.type = options.type;
    } else {
      this.value = 4;
      this.type = 0;
    }
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    // if (this.type == 0) {
    //   this.titleText = "添加客户信息";
    // } else if (this.type == 1) {
    //   this.titleText = "修改客户信息";
    //   let a = this.addDetail.splice(4, 2);
    //   console.log(this.addDetail);
    // }
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>
<style lang="less" scoped>
.sumbit {
  background: #fa5151;
  text-align: center;
  color: white;
  border-radius: 100upx;
  width: 380upx;
  height: 72upx;
  font-size: 32upx;
  font-weight: 500;
  line-height: 72upx;
  position: fixed;
  left: 50%;
  margin-top: 60upx;
  transform: translateX(-50%);
}
.title1 {
  width: 150upx;
}
.input-placeholder {
  font-size: 24upx;
  margin-left: 20upx;
}
.addUser {
  padding: 0 10upx;
  font-size: 28upx;
  .last {
    margin-top: 40upx;
    padding: 0 50upx;
  }
}
/deep/.uni-select {
  border: 0px;
  border-bottom: 1px solid #d8d8d8;
  margin-left: 30upx;
}
.inputText {
  height: 70upx;
  display: flex;
  align-items: center;
}
.inputClass {
  height: 70upx;
  margin-left: 30upx;
  font-size: 28upx;
  padding-left: 20upx;
  flex: 1;
  border-bottom: 1px solid #d8d8d8;
}
.inputNumber {
  display: flex;
  align-items: center;
  height: 70upx;
}
.choseSex {
  height: 70upx;
  display: flex;
  align-items: center;
}
.choseBirthday {
  height: 70upx;
  display: flex;
  align-items: center;
}
</style>
