<template>
  <view class="design-company-container" v-if="data">
    <view class="company-wrapper">
      <image class="company-avatar" :src="data.logo" mode="" />

      <view class="company-detail">
        <view class="info1">
          <view class="name">{{ data.name }}</view>
          <view class="address">
            <image
              class="mark-icon"
              src="../../../static/images/new-index/mark.png"
              mode=""
            />
            {{ data.dis }}km
          </view>
        </view>

        <view class="info2">
          <text>{{ data.text1 }}</text>
          <text>{{ data.text2 }}</text>
          <text>{{ data.text3 }}</text>
        </view>

        <view class="tags">
          <view class="tag">可面聊</view>
          <view class="tag">现代简约风</view>
          <view class="tag">轻奢风</view>
          <view class="tag">侘寂风</view>
        </view>
      </view>
    </view>

    <view class="image-list">
      <image v-for="img in data.images" :key="img" :src="img" mode="" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.design-company-container {
  padding: 32upx;
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 20upx;

  .company-wrapper {
    display: flex;
    justify-content: space-between;

    .company-avatar {
      width: 120upx;
      height: 120upx;
      border-radius: 50%;
      margin-right: 15upx;
      flex-shrink: 0;
    }

    .company-detail {
      flex: 1;

      .info1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        color: #3a3629;

        .name {
          width: 340upx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .address {
          font-size: 28upx;
          color: #8f8d85;
          .mark-icon {
            width: 24upx;
            height: 24upx;
            margin-right: 8upx;
          }
        }
      }

      .info2 {
        margin: 8upx 0 12upx 0;
        text {
          color: #9e9e9e;
          font-size: 24upx;
          padding: 0 16upx;
          line-height: 36upx;
          border-right: 1upx solid #9e9e9e;

          &:nth-child(1) {
            padding-left: 0;
          }

          &:nth-child(3) {
            border-right: none;
          }
        }
      }

      .tags {
        display: flex;

        .tag {
          margin-right: 12upx;
          line-height: 36upx;
          font-size: 24upx;
          padding: 0 16upx;
          border: 1upx solid #ffc117;
          color: #ffc117;
          border-radius: 8upx;

          &:nth-child(4) {
            margin-right: 0;
          }
        }
      }
    }
  }

  .image-list {
    margin-top: 32upx;
    padding-top: 34upx;
    border-top: 1upx solid #f1f1f0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    image {
      width: 150upx;
      height: 150upx;
      border-radius: 16upx;
      object-fit: cover;
    }
  }
}
</style>
