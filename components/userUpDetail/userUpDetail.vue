<template>
  <view class="userUpDetail">
    <view class="detail-view">
      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/uojlotzgz1y979c40m4v.png"
        alt=""
        class="left-img"
      />
      <view class="right">
        <view class="right-top">
          <view class="top-left">
            <view class="top-text">{{ newGradename }}</view>
            <img
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/e1w5s4u8ovbpilar58p0.png"
              alt=""
              class="top-img"
            />
          </view>
          <view class="top-right">{{ stauseValue }}</view>
        </view>
        <view class="right-middle"
          ><view class="middle-title" style="">{{ value }}</view></view
        >
        <view class="right-bottom">
          <view class="bottom-title"> 开通时间：{{ addTime }} </view>
          <view class="bottom-detail">详情</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { applyHistory } from "../../user/sever/config";
export default {
  name: "userUpDetail",
  props: {
    newGradename:String,
    addTime:String,
    statusValue:String,


  },
  data() {
    return {
      newGradename,
      color: "",
      value: "",
      addTime: "",
      stauseValue: "",
    };
  },
  computed: {},
  methods: {},
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
.userUpDetail {
  padding: 44upx 62upx 44upx 44upx;
  .detail-view {
    display: flex;
    .left-img {
      width: 160upx;
      height: 160upx;
      padding-right: 60upx;
    }
    .right {
      width: 65%;
      .right-top {
        display: flex;
        justify-content: space-between;

        .top-left {
          display: flex;
          .top-text {
            font-size: 36upx;
            margin-right: 11upx;
          }
          .top-img {
            padding-top: 5upx;
            width: 36upx;
            height: 34upx;
          }
        }
        .top-right {
          font-size: 24upx;
          margin-top: 6upx;
        }
      }
      .right-middle {
        margin: 20upx 0;
        .middle-title {
          font-size: 24upx;
        }
        .middle-text {
        }
      }
      .right-bottom {
        font-size: 24upx;
        display: flex;
        justify-content: space-between;
        .bottom-detail {
          color: #999999;
        }
      }
    }
  }
}
</style>