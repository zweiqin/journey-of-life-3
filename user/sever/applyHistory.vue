<template>
  <view class="All">
    <JHeader width="50" height="50" title="申请历史"></JHeader>
    <view class="chose">
      <view v-for="item in applyTitle" :key="item.value">
        <view
          class="choseText"
          :class="{ choseActive: currentTab == item.value }"
          @click="choseTitle(item.value)"
        >
          {{ item.lable }}</view
        >
      </view>
    </view>
    <view class="border"></view>
    <userUpDetail v-for=" item in list" :key="item.id" :newGradename="item.newGradename"></userUpDetail>
  </view>
</template>

<script>
import { applyHistory, applyTitle } from "./config";
import {   getUserUpInfoListApi } from "../../api/user";
import { getUserId } from "../../utils";
export default {
  data() {
    return {
      applyHistory,
      applyTitle,
      currentTab: 0,
      newGradename:'',
      addTime:'',
      status:'',
      list:[],
    };
  },
  methods: {
    choseTitle(value) {
      this.currentTab = value;
    },
    async getUserUpInfoList() {
      const res = await getUserUpInfoListApi({
        userId: getUserId(),
        limit: 50,
        page:"",
        sort:"",
        order:"",

      });
      console.log(res);
      this.list = res.data.items
      console.log(this.list);
    },
  },
  onLoad(options) {
    this.getUserUpInfoList();
  },
};
</script>

<style lang="less" scoped>
.All {
  padding: 80upx 45upx;
  .chose {
    display: flex;
    justify-content: space-around;
    margin-top: 20upx;
    margin-bottom: 5upx;
    .choseText {
      font-size: 24upx;
      &.choseActive {
        color: #fa5151;
        font-size: 24upx;
      }
    }
  }
  .border {
    border: 1upx solid #d8d8d8;
    width: 95%;
    margin: 0 auto;
  }
}
</style>