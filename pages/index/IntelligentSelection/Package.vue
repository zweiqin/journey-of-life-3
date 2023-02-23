<template>
  <view class="package-container" v-if="data">
    <image :src="data.picUrl" class="package-img" mode="" />

    <view class="package-detail-info">
      <view class="name">{{ data.name }}</view>

      <view class="desc">
        <text>1房1厅</text>
        <text>现代简约</text>
        <text>60-80㎡</text>
      </view>

      <view class="tags">
        <view class="tag">精品推荐</view>
        <view class="tag">百搭优选</view>
      </view>

      <view class="text-foot">
        <view class="price-text">
          ￥
          <text>2-7万</text>
        </view>

        <view class="salsed">月销71818</view>
      </view>
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
.package-container {
  display: flex;
  align-items: center;
  padding: 24upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 24upx;
  margin-bottom: 20upx;

  .package-img {
    width: 200upx;
    height: 200upx;
    border-radius: 16upx;
    margin-right: 26upx;
    flex-shrink: 0;
  }

  .name {
    width: 400upx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 28upx;
  }

  .desc {
    margin: 8upx 0 10upx 0;
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
    align-items: center;
    margin-bottom: 20upx;

    .tag {
      line-height: 36upx;
      color: #ffc117;
      padding: 0 12upx;
      border: 1upx solid #ffc117;
      border-radius: 8upx;
      font-size: 24upx;
      margin-right: 16upx;
    }
  }

  .text-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #141000;
    font-weight: 700;
    font-size: 26upx;

    text {
      font-size: 36upx;
    }

    .salsed {
      color: #8f8d85;
      font-size: 26upx;
      font-weight: normal;
    }
  }
}
</style>
