<template>
  <view class="apply-vip-history-container">
    <JHeader width="50" height="50" title="申请历史"></JHeader>
    <view class="header">
      <view class="item active">全部</view>
      <view class="item">商家升级</view>
      <view class="item">营销策划师升级</view>
    </view>

    <ul>
      <li v-for="item in 4" :key="item">
        <view class="vip-icon">
          <image
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/wgk2r94me3kexvaogug4.png"
            mode=""
          />
        </view>

        <view class="info">
          <view class="info-top">
            <view class="name"
              >商家会员
              <image
                class="vip-icon-top"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/0yofrsucrnpvcombuya9.png"
                mode=""
              />
            </view>
            <view
              class="status"
              :style="{
                color: mapStatusColor['已开通'],
              }"
              >已开通</view
            >
          </view>

          <view class="info-middle">剩余天数：<text>1年</text></view>
          <view class="info-bottom">
            <view class="time">开通时间：2022-10-01</view>
            <view class="detail">详情</view>
          </view>
        </view>
      </li>
    </ul>
  </view>
</template>

<script>
import { mapStatusColor } from "./config";
export default {
  methods: {
    mapStatusColor,
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.apply-vip-history-container {
  padding: 46upx;
  box-sizing: border-box;

  .header {
    .flex();
    font-size: 24upx;
    color: #3d3d3d;
    margin-top: 34upx;
    padding-bottom: 20upx;
    border-bottom: 1upx solid #d8d8d8;

    .item {
      &.active {
        color: #fa5151;
      }
    }
  }

  ul {
    width: 100%;
    padding: 0;
    li {
      width: 100%;
      padding: 46upx 0;

      .flex();

      &:not(:last-child) {
        border-bottom: 1upx solid #d8d8d8;
      }

      .vip-icon {
        width: 160upx;
        height: 160upx;
        border-radius: 20upx;
        overflow: hidden;
        background: linear-gradient(180deg, #fa5151 0%, #ff8f1f 100%);
        .flex(center, center);
        margin-right: 60upx;

        .icon {
          width: 100upx;
          height: 89.6upx;
          text-align: center;
        }
      }

      .info {
        font-size: 24upx;
        color: #3d3d3d;
        flex: 1;

        .info-top {
          .flex();

          .vip-icon-top {
            width: 42upx;
            height: 40upx;
          }
        }

        .info-bottom {
          .flex();
          .detail {
            color: #999;
          }
        }

        .info-middle{
          margin: 16upx 0;
        }

        .name {
          font-size: 36upx;
        }
      }
    }
  }
}
</style>