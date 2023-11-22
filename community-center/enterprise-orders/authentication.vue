<template>
  <view class="auth-container">
    <TuanPageHead title="企业认证" fixed :scrollTop="scrollTop" padding="0 32upx" weight="500">
      <block slot="left">
        <image style="width: 64upx; height: 64upx;" src="../../static/images/con-center/order-detail-back.png"
          @click="handleToOrderList" class="back-icon">
        </image>
      </block>
    </TuanPageHead>

    <view class="pane">
      <view class="form-item">
        <view class="form-label">公司名称</view>
        <view class="form-value">
          <input class="inp" type="text" placeholder="请输入公司名称">
        </view>
      </view>


      <view class="form-item">
        <view class="form-label">公司简称</view>
        <view class="form-value">
          <input class="inp" type="text" placeholder="请输入公司简称">
        </view>
      </view>

      <view class="form-item">
        <view class="form-label">法定代表人</view>
        <view class="form-value">
          <input class="inp" type="text" placeholder="请输入公司法定代表人">
        </view>
      </view>



      <view class="form-item">
        <view class="form-label">法人手机号</view>
        <view class="form-value">
          <input class="inp" type="text" placeholder="请输入法人手机号码">
        </view>
      </view>


      <view class="form-item">
        <view class="form-label">公司地址</view>
        <view class="form-value">
          <input class="inp" type="text" placeholder="请选择公司地址">
        </view>
      </view>

      <view class="form-item">
        <view class="form-label">统一社会信用代码</view>
        <view class="form-value">
          <input class="inp" type="text" placeholder="请选择公司统一社会信用代码">
        </view>
      </view>

    </view>

    <view class="pane">
      <view class="load-img-container">
        <view class="title"> 上传营业执照</view>
        <view class="tip">请确保证件完整，编号、印章、文字、照片清楚可见</view>
        <view class="img-wrapper">
          <view class="example uploader">
            <image style="width: 88upx; height: 128upx; margin-bottom: 24upx;"
              src="../../static/images/new-community/enterprise-orders/temp.png"></image>
          </view>
          <view class="uploader">
            <image style="width: 39upx; height: 39upx; margin-bottom: 24upx;"
              src="../../static/images/new-community/enterprise-orders/image.png"></image>
            点击上传图片
          </view>
        </view>
      </view>

      <view class="load-img-container">
        <view class="title"> 上传公司logo</view>
        <view class="img-wrapper">
          <view class="uploader">
            <image style="width: 39upx; height: 39upx; margin-bottom: 24upx;"
              src="../../static/images/new-community/enterprise-orders/image.png"></image>
            点击上传图片
          </view>
        </view>
      </view>
    </view>

    <button class="uni-btn submit">提交认证</button>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
/deep/ .uni-input-placeholder {
  color: #C4C6CF;
}

.auth-container {
  min-height: 100vh;
  background-color: #F6F6FB;
  padding-bottom: 42upx;
  padding-top: 20upx;

  .pane {
    margin-top: 24upx;
    background-color: #fff;

    .form-item {
      padding: 38upx 60upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .form-label {
        font-size: 28upx;
        color: #526787;
        margin-right: 98upx;
      }

      .form-value {
        flex: 1;
        display: flex;
        align-items: center;

        .inp {
          flex: 1;
          text-align: right;
        }
      }
    }

    .load-img-container {
      padding: 44upx 40upx;

      box-sizing: border-box;

      .title {
        color: #303030;
        font-size: 32upx;
        margin-bottom: 14upx;
      }

      .tip {
        font-size: 24upx;
        color: #9E9E9E;
        margin: 0 0 24upx 0;
      }

      .img-wrapper {
        display: flex;
        align-items: center;

        .uploader {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 128upx;
          height: 128upx;
          background-color: #F7FBFF;
          font-size: 16upx;
          color: #969699;

          &.example {
            position: relative;
            display: block;
            text-align: center;
            margin-right: 20upx;

            &::after {
              top: 0;
              left: 0;
              position: absolute;
              content: '示例';
              color: #fff;
              text-align: center;
              line-height: 28upx;
              display: block;
              width: 56upx;
              height: 28upx;
              background-color: #FF6619;
              border-radius: 4upx 0upx 8upx 0px;
            }
          }
        }
      }
    }


  }

  .submit {
    width: 670upx;
    height: 96upx;
    margin: 0 auto;
    background-color: #4871FE;
    margin-top: 98upx;
    margin-bottom: 42upx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 350ms;

    &:active{
      opacity: 0.8;
    }
  }
}
</style>