<template>
  <view class="formBox">
    <view class="FormContainer">
      <view class="formHeader">门店业务</view>
      <tui-form ref="form">
        <view class="inputBox">
            <view class="moreSlectItem">
                <tui-input
                    label-color="#526787" label="业务范围"
                    background-color="none" :borderBottom="false"
                    placeholder="请输选择业务范围" disabled
                >
                    <template #right>
                        <image style="width: 30rpx;height: 30rpx;margin-right:20rpx;" src="@/static/images/entryOfMerchants/youjiantou.png" mode=""></image>
                    </template>
                </tui-input>
           </view>
            <!-- <view class="moreSlectItem">
                <tui-input
                    label-color="#526787" label="服务范围"
                    background-color="none" :borderBottom="false"
                    placeholder="请选择服务范围" disabled
                >
                    <template #right>
                        <image style="width: 30rpx;height: 30rpx;margin-right:20rpx;" src="@/static/images/entryOfMerchants/youjiantou.png" mode=""></image>
                    </template>
                </tui-input>
            </view> -->
            <view class="moreSlectItem">
                <tui-input
                    label-color="#526787" label="经营标签"
                    background-color="none" :borderBottom="false"
                    placeholder="" disabled
                >
                    <template #right>
                        <image style="width: 30rpx;height: 30rpx;margin-right:20rpx;" src="@/static/images/entryOfMerchants/youjiantou.png" mode=""></image>
                    </template>
                </tui-input>
			      </view>
          <!-- <tui-input labelColor="#526787" :borderBottom="false" label="服务范围" placeholder="请选择服务范围" clearable v-model="fromData.shopAddress"></tui-input>
          <tui-input labelColor="#526787" :borderBottom="false" label="经营标签" placeholder="请选择经营标签" clearable v-model="fromData.region"></tui-input> -->
        </view>
      </tui-form>
    </view>
    <view class="nextSteps">
        <tui-button>下一步</tui-button>
    </view>
  </view>
</template>

<script>
export default {
  name: "StoreBusiness",
  data() {
    return {
      fromData: {
        shopName: "", // 门店名称
        shopAddress: "", // 详细地址
        region: "", //地址
        businessType: '', // 经营类别
        businessLicense: '', // 营业执照
        doorHeader: '', // 门店门头
        shopLogo: '', // 门店logo
      },
    };
  },
  methods: {
    aaa() {
        console.log(1)
    }
  },
};
</script>

<style lang="scss" scoped>
.moreSlectItem:active {
	background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);
}
.formBox {
  position: relative;
  box-sizing: border-box;
  padding: 10rpx 30rpx 180rpx 30rpx;
  width: 100vw;
  height: auto;
  flex: 1;
  .FormContainer {
    overflow: hidden; // 清除浮动
    width: 100%;
    /* height: 733rpx; */
    background-color: #fff;
    border-radius: 20rpx;
    .formHeader {
      font-weight: 600;
      font-size: 32rpx;
      margin-left: 30rpx;
      margin-top: 39rpx;
      color: #08377f;
    }
  }
  .imgFilesUpload {
    box-sizing: border-box;
    padding: 40rpx 30rpx;
    margin-top: 24rpx;
    .upload_Item {
      /* margin-top: 38rpx;
      margin-left: 30rpx; */
      .subtitle {
        font-size: 28rpx;
        font-weight: normal;
        line-height: 38rpx;
        color: #526787;
      }
      .uploadBox {
        display: flex;
        margin-top: 24rpx;
        width: auto;
        .ExampleImg {
          margin-left: 20rpx;
          position: relative;
          width: 220rpx;
          height: 226rpx;
          background: #f7fbff;
          border-radius: 12rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          .cnmd {
            width: 100%;
            height: 226rpx;
          }
          .gallery {
            border-radius: 12rpx;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            color: #f7fbff;
            text-align: center;
            font-size: 24rpx;
            font-weight: normal;
            line-height: 38rpx;
            background: #3982f1;
          }
          .avatarImg {
            margin-left: 20rpx;
            width: 100%;
            height: 100%;
            border-radius: 12rpx;
          }
        }
        .add-img-icon {
          margin-left: 20rpx;
          .add-icon {
            width: 60rpx;
            height: 60rpx;
          }
        }
        .bigExample {
          position: relative;
          width: 100%;
          height: 228rpx;
          background: #f7fbff;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .expItem {
            background: #f7fbff;
            width: 276.34rpx;
            height: 174.91rpx;
          }
          .gallery {
            border-radius: 12rpx;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            color: #f7fbff;
            text-align: center;
            font-size: 24rpx;
            font-weight: normal;
            line-height: 38rpx;
            background: #3982f1;
          }
        }
      }
      .uploadBig {
        margin-top: 38rpx;
        width: 100%;
        display: flex;
        justify-content: space-around;
        .add-img-icon {
          position: relative;
          display: flex;
          align-items: center;
          width: 305rpx;
          height: 184rpx;
          border-radius: 12rpx;
          justify-content: center;
          background: #f7fbff;
          .add-icon {
            width: 60rpx;
            height: 60rpx;
          }
          .big-img-icon {
            width: 305rpx;
            height: 184rpx;
          }
          .big-img-icon2 {
            width: 630rpx;
            height: 227rpx;
          }
        }
      }
    }
  }
  .nextSteps {
    box-sizing: border-box;
    position: absolute;
    padding: 18rpx 30rpx 50rpx 30rpx;
    bottom: 0;
    left: 0;
    /* margin-top: 128rpx; */
    width: 100%;
    height: 150rpx;
    background-color: #fff;
  }
}
.inputBox {
  width: 100%;
  height: 460rpx;
  display: flex;
  flex-direction: column;
}
.close-icon {
  position: absolute;
  top: -10upx;
  right: -10upx;
  width: 34upx;
  height: 34upx;
  z-index: 10;
}
</style>
