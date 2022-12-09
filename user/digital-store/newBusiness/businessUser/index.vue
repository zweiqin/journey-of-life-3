<template>
  <view class="businessUser">
    <view class="userName">{{ userName }}</view>
    <view class="userPhone">{{ userTel }}</view>
    <view class="userSex">{{
      userGender === 0 ? "未知" : userGender === 1 ? "男" : "女"
    }}</view>
    <view class="userType">{{ professional }}</view>
    <view class="userOperate" :class="{ lastUserOperate: value == 7 }">
      <view
        class="userModification"
        v-if="!(value == 7)"
        @click="getaddUser(0, id)"
        >升级</view
      >
      <view class="userUp" @click="getaddUser(1, id)">修改</view>
    </view>
  </view>
</template>

<script>
import { number } from "echarts";
export default {
  name: "businessUser",
  props: {
    userName: String,
    userTel: [String, Number],
    userGender: [String, Number],
    professional: String,
    id: Number,
    value: Number,
    data: [Array, Object],
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    getaddUser(e, id) {
      console.log(this.data);
      this.data = JSON.stringify(this.data)
      if (e == 1) {
        uni.navigateTo({
          url: `/user/digital-store/newBusiness/addUser/index?value=${this.value}&type=${e}&id=${id}&data=${this.data}`,
        });
      } else {
        uni.navigateTo({
          url: `/user/digital-store/newBusiness/addUser/index?value=${this.value}&type=${e}&id=${id}`,
        });
      }
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
.businessUser {
  display: flex;
  text-align: center;
  font-size: 26upx;
  margin: 24upx 0;
  margin-right: 10upx;
  .userName {
    width: 17%;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .userPhone {
    width: 24%;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .userSex {
    width: 12%;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .userType {
    width: 30%;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .userOperate {
    display: flex;
    width: 17%;
    justify-content: space-between;
    &.lastUserOperate {
      justify-content: center;
    }
    .userModification {
      color: #fa5151;
    }
    .userUp {
      color: #3662ec;
    }
  }
}
</style>