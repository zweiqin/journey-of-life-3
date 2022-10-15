<template>
  <div class="shopApply">
    <view class="title">
      <img
        @click="back"
        class="left-back"
        src="../../../static/images/store/chevron-states.png"
        alt=""
      />
      <view class="left-text"> 门店申请 </view>
    </view>
    <view class="input">
      <view class="input-top">
        <view class="top-title">商家信息填写</view>
        <view class="top-first">账号信息</view>
        <view class="input1">
          <view class="userAccount">
            <view class="text">登录账号:</view>
            <input
              v-model="sss"
              placeholder="请填写登录账号（至少为6位）用于登录"
              placeholder-class="input-placeholder"
              @input="account"
              class="accountInput"
            />
          </view>
          <view class="border"></view>
          <view class="userAccount">
            <view class="text">登录密码:</view>
            <input
              v-model="sss"
              placeholder="请填写登录密码（至少为6位）用于登录"
              placeholder-class="input-placeholder"
              @input="account"
              class="accountInput"
            />
          </view>
          <view class="border"></view>
          <view class="userAccount">
            <view class="text">联系电话:</view>
            <input
              v-model="sss"
              placeholder="请填写手机号码"
              placeholder-class="input-placeholder"
              @input="account"
              class="accountInput"
            />
          </view>
          <view class="border"></view>
          <view class="red-text"
            >(注：账号/密码用于您登陆PC端管理后台，请务必牢记)</view
          >
        </view>
      </view>
      <view class="input-middle">
        <view class="middle-title">门店信息</view>
        <view class="input1">
          <view class="userAccount">
            <view class="text">门店名称:</view>
            <input
              v-model="sss"
              placeholder="请填写门店名称"
              placeholder-class="input-placeholder"
              @input="account"
              class="accountInput"
            />
          </view>
          <view class="border"></view>
          <view class="userAccount">
            <view class="text">所属类型:</view>
            <input
              v-model="sss"
              placeholder="饭店"
              placeholder-class="input-placeholder"
              @input="account"
              class="accountInput"
            />
          </view>
          <view class="border"></view>
          <view class="userAccount">
            <view class="text">所在城市:</view>
            <input
              v-model="sss"
              placeholder="省份、城市、区县"
              placeholder-class="input-placeholder"
              @input="account"
              class="accountInput"
            />
          </view>

          <view class="border"></view>
        </view>
        <view class="input2">
          <view class="site-detail">
            <view class="site-text">详细地址（门牌号）</view>
            <input
              v-model="asd"
              placeholder="请填写详细地址"
              placeholder-class="input-placeholder"
              @input="asd"
              class="detailInput"
            />
            <view class="border1"></view>
          </view>
        </view>
      </view>
      <view class="input-bottom"> </view>
    </view>
  </div>
</template>

<script>
export default {
  name: "shopApply",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
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
.title {
  margin-top: 82upx;
  margin-left: 34upx;
  display: flex;
  .left-back {
    width: 48upx;
    height: 48upx;
  }
  .left-text {
    margin-left: 24upx;
    font-weight: bolder;
  }
}
.input {
  padding: 0 40upx;
  .input-top {
    margin-top: 32upx;
    .border {
      border: 0.5px solid #d8d8d8;
      width: 100%;
      margin: 0 auto;
    }
    .top-title {
      font-size: 28upx;
      font-weight: 500;
      text-align: center;
      margin-bottom: 20upx;
    }
    .top-first {
      color: #fa5151;
      font-size: 28upx;
      font-weight: 500;
      margin-bottom: 12upx;
    }
    .input1 {
      .userAccount {
        display: flex;
        margin-top: 42upx;

        .text {
          font-size: 24upx;
          font-weight: 350;
        }
        .accountInput {
          margin-left: 20upx;
          font-size: 24upx;
          flex: 1;
          margin-bottom: 22upx;
          font-weight: 350;
        }
        .input-placeholder {
          font-size: 24upx;
          font-weight: 350;
          color: #999999;
        }
      }
      .red-text {
        color: #fa5151;
        font-size: 20upx;
        font-weight: 350;
        margin-top: 14upx;
      }
    }
  }
  .input-middle {
    margin-top: 32upx;
    .border {
      border: 0.5px solid #d8d8d8;
      width: 100%;
      margin: 0 auto;
    }
    .top-title {
      font-size: 28upx;
      font-weight: 500;
      text-align: center;
      margin-bottom: 20upx;
    }
    .top-first {
      color: #fa5151;
      font-size: 28upx;
      font-weight: 500;
      margin-bottom: 12upx;
    }
    .input1 {
      .userAccount {
        display: flex;
        margin-top: 42upx;

        .text {
          font-size: 24upx;
          font-weight: 350;
        }
        .accountInput {
          margin-left: 20upx;
          font-size: 24upx;
          flex: 1;
          margin-bottom: 22upx;
          font-weight: 350;
        }
        .input-placeholder {
          font-size: 24upx;
          font-weight: 350;
          color: #999999;
        }
      }
      .red-text {
        color: #fa5151;
        font-size: 20upx;
        font-weight: 350;
        margin-top: 14upx;
      }
    }
    .input2 {
      .site-detail {
        font-size: 24upx;
        .site-text {
        margin-top: 40upx;
        }
        .input-placeholder {
          font-size: 24upx;
        }
        .detailInput {
          font-size: 24upx;
          text-align: start;
          
        }
        .border1 {
          border: 0.5px solid #d8d8d8;
          width: 100%;
          margin: 0 auto;
          
        }
      }
    }
  }
}
</style>