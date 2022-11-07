<template>
  <view class="community-order">
    <view class="title-list">
      <img
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
        alt=""
        class="return"
        @click="handleBack"
      />
      <view class="title">完善服务信息</view>
    </view>
    <view class="body">
      <view class="top-list">
        <view class="item-type">
          <view class="tag">*</view>
          <view class="type">物品类型</view>
        </view>
        <view class="please">
          <view class="choice">请选择</view>
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/63apnwjyguuyva9itx9k.png"
            alt=""
            class="more"
          />
        </view>
      </view>
      <input
        type="text"
        class="text"
        placeholder="（服务类型可以自动填写数量/尺寸/体积/重量/面积）"
      />
      <view class="item-image">
        <view class="tag">*</view>
        <view class="name">物品图片</view>
      </view>
      <view class="upload">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/11y7t9j0dh9s74bcyoz5.png"
          alt=""
          class="img"
        />
        <view class="text">上传图片</view>
      </view>
      <view class="explain">
        <view class="text1">需求说明</view>
        <view class="text2">(选填)</view>
      </view>
      <view class="jx">
        <view class="content">
          <input type="text" class="show" placeholder="说明内容实例" />
          <view class="list">
            <view class="number">0/150</view>
            <view class="example">示例</view>
          </view>
        </view>
      </view>
      <view class="foot">
        <view class="on">确认</view>
      </view>
    </view>
  </view>
</template>






<script>
export default {
  name: "Community-order",
  props: {},
  data() {
    return {};
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
  },
  created() {},
};
</script>






<style lang="less" scoped>
.community-order {
  .title-list {
    padding: 88upx 34upx 36upx 26upx;
    display: flex;
    .return {
      width: 48upx;
      height: 48upx;
    }
    .title {
      flex: 1;
      text-align: center;
      font-size: 36upx;
      font-weight: bold;
      color: #3d3d3d;
    }
  }
  .body {
    padding: 74upx 30upx 0upx 30upx;
    .top-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-type {
        display: flex;
        align-items: center;
        .tag {
          font-weight: 600;
          color: #fa5151;
        }
        .type {
          font-size: 28upx;
          font-weight: 500;
          color: #3d3d3d;
        }
      }
      .please {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 156upx;
        .choice {
          font-size: 28upx;
          font-weight: 500;
          color: #3d3d3d;
        }
        .more {
          width: 40upx;
          height: 40upx;
        }
      }
    }
    .text {
      padding-top: 16upx;
      font-size: 24upx;
      color: #999999;
    }
    .item-image {
      display: flex;
      align-items: center;
      padding-top: 50upx;
      .tag {
        font-weight: 600;
        color: #fa5151;
      }
      .name {
        font-size: 28upx;
        font-weight: 500;
        color: #3d3d3d;
      }
    }
    .upload {
      margin-top: 34upx;
      width: 160upx;
      height: 160upx;
      border-radius: 10upx;
      background: #f1f2f6;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img {
        width: 60upx;
        height: 60upx;
      }
      .text {
        font-size: 24upx;
        font-weight: 500;
        color: #d8d8d8;
      }
    }
    .explain {
      margin-top: 84upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 200upx;
      height: 44upx;
      .text1 {
        font-size: 28upx;
        font-weight: 500;
        color: #3d3d3d;
      }
      .text2 {
        font-size: 28upx;
        font-weight: 500;
        color: #999999;
      }
    }
    .jx {
      margin-top: 56upx;
      // width: 690upx;
      width: 100%;
      height: 800upx;
      border-radius: 10upx;

      .content {
        padding: 32upx 16upx;
        height: 380upx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #f1f2f6;
        .show {
          font-size: 28upx;
          color: #999999;
        }
        .list {
          width: 120upx;
          height: 34upx;
          display: flex;
          justify-content: space-between;
          .number {
            font-size: 24upx;
            color: #999999;
          }
          .example {
            font-size: 24upx;
            color: #ea5f1f;
          }
        }
      }
    }
    .foot {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30upx 30upx 30upx 30upx;
      width: 100%;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #ffffff;
      border-top: 8upx solid #f7f8fa;
      .on {
        font-size: 32upx;
        color: #ffffff;
        width: 408upx;
        height: 80upx;
        border-radius: 100upx;
        background: linear-gradient(270deg, #e95e20 0%, #ff8f1f 100%);
        text-align: center;
        line-height: 80upx;
      }
    }
  }
}
</style>
