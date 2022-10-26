<template>
  <view class="add-address">
    <view class="top">
      <img
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/j53rp2zc53n5iz96444l.png"
        alt=""
        class="return"
        @click="handleBack"
      />
      <view class="title">添加地址</view>
    </view>
    <!-- {{form}} -->
    <view class="main">
      <view class="contacts">
        <view class="human">联系人</view>
        <input
          v-model="form.name"
          type="text"
          placeholder="（请输入联系人姓名）"
          class="input"
        />
      </view>
      <view class="phone">
        <view class="phone-name">手机号码</view>
        <input
          v-model="form.mobile"
          type="text"
          placeholder="（请输入联系人电话）"
          class="input"
        />
      </view>
      <view class="address">
        <view class="address-name">所在地址</view>
        <view class="address-detail">（请输入上门地址）</view>

        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/okx3511yuuh9fsdl290h.png"
          alt=""
          class="jump"
        />
      </view>
      <view class="detail">
        <view class="detail-name">详细地址</view>
        <!-- <view class="detail-address">（请输入详细地址）</view> -->
        <input type="text" placeholder="（请输入详细地址）" class="input" />
        <!-- <textarea name="" id="" cols="30" rows="10"></textarea> -->

        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/okx3511yuuh9fsdl290h.png"
          alt=""
          class="jump"
        />
        <!-- </view> -->
      </view>
      <view class="background">
        <!-- <view class="text">
          <view class="warn">粘贴地址信息、电话、姓名可自动识别</view>
          <view class="content"
            >如：代琪浪、13800138000、广东省佛山市顺德区 团蜂科技有限公司</view
          >
        </view> -->
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="粘贴地址信息、电话、姓名可自动识别"
          class="input"
        ></textarea>
        <!-- <view class="list"> -->
        <!-- <view class="white"></view> -->
        <view class="shibie">识别</view>
        <!-- </view> -->
      </view>
    </view>
    <view class="foot">
      <view class="save" @click="dianji">保存</view>
    </view>
  </view>
</template>








<script>
export default {
  name: "Add-address",
  props: {},
  data() {
    return {
      form: {
        name: "",
        mobile: "",
      },
    };
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
    dianji() {
      console.log(this.form);

      uni.setStorageSync("guawyi8sa", this.form);
      uni.navigateBack();
    },
  },
  created() {},
  onShow() {
    const info = uni.getStorageSync("guawyi8sa");
    this.form.name = info.name;
    this.form.mobile = info.mobile;
  },
};
</script>







<style lang="less" scoped>
.add-address {
  padding: 60upx 30upx;
  box-sizing: border-box;
  .top {
    display: flex;
    .title {
      padding-bottom: 100upx;
      flex: 1;
      text-align: center;
      font-size: 32upx;
      font-weight: 500;
      color: #3d3d3d;
    }
    .return {
      width: 48upx;
      height: 48upx;
    }
  }
  .main {
    .contacts {
      display: flex;

      .human {
        padding-right: 34upx;
        font-size: 28upx;
        letter-spacing: 0.5em;
        color: #3d3d3d;
      }
      .input {
        font-size: 28upx;
        color: #999999;
        flex: 1;
      }
    }
    .phone {
      display: flex;
      padding-top: 80upx;
      .phone-name {
        padding-right: 46upx;
        font-size: 28upx;
        color: #3d3d3d;
      }
      .input {
        font-size: 28upx;
        color: #999999;
        flex: 1;
      }
    }
    .address {
      display: flex;
      padding-top: 80upx;
      margin-right: 18upx;

      .address-name {
        padding-right: 46upx;
        font-size: 28upx;
        color: #3d3d3d;
      }

      .address-detail {
        font-size: 28upx;
        color: #999999;
        flex: 1;
      }

      .jump {
        // position: absolute;
        // left: 700upx;
        width: 32upx;
        height: 32upx;
      }
    }
    .detail {
      display: flex;
      // white-space: nowrap;
      padding-top: 80upx;
      margin-right: 18upx;

      .detail-name {
        padding-right: 46upx;
        font-size: 28upx;
        color: #3d3d3d;
      }
      .input {
        font-size: 28upx;
        color: #999999;
        flex: 1;
      }
      .jump {
        width: 32upx;
        height: 32upx;
      }
    }
    .background {
      // margin: 112upx 32upx 210upx 0upx;
      margin-top: 110upx;
      width: 100%;
      height: 326upx;
      border-radius: 10upx;
      box-sizing: border-box;
      border: 1upx solid #999999;
      position: relative;

      // padding-left: 40upx;
      // padding-top: 22upx;
      .input {
        padding: 22upx 40upx;
        width: 100%;
        height: 100%;
        font-size: 28upx;
        font-weight: 350;
        color: #999999;
        box-sizing: border-box;
      }

      .shibie {
        position: absolute;
        right: 20upx;
        bottom: 24upx;
        text-align: center;
        width: 78upx;
        height: 46upx;
        border-radius: 4upx;
        background: #cde1fd;
        font-size: 28upx;
        color: #3662ec;
      }
    }
  }
  .foot {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100upx;
    box-sizing: border-box;
    padding-right: 30upx;
    padding-left: 30upx;
    padding-top: 12upx;
    .save {
      padding-top: 14upx;
      text-align: center;
      // width: 614upx;
      width: 100%;
      height: 64upx;
      border-radius: 60upx;
      background: #07b9b9;
      font-size: 36upx;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
</style>
