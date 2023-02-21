<template>
  <view class="design-company-container">
    <view class="company-wrapper">
      <image
        class="company-avatar"
        src="https://img0.baidu.com/it/u=253042110,3732757332&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        mode=""
      />

      <view class="company-detail">
        <view class="info1">
          <view class="name"
            >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
            quo explicabo praesentium laboriosam debitis id veniam harum ipsam
            et magnam sint quaerat molestiae earum itaque ipsum vel ex, nisi
            soluta.</view
          >
          <view class="address">
            <image
              class="mark-icon"
              src="../../../static/images/new-index/mark.png"
              mode=""
            />
            32.1km
          </view>
        </view>

        <view class="info2">
          <text>设计工作室</text>
          <text>从业31年</text>
          <text>￥500-1000/㎡</text>
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
      <image
        src="https://img1.baidu.com/it/u=374190476,1290845357&fm=253&fmt=auto&app=120&f=JPEG?w=1186&h=800"
        mode=""
      />
      <image
        src="https://img1.baidu.com/it/u=3029506204,1595316155&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500"
        mode=""
      />
      <image
        src="https://img0.baidu.com/it/u=3245413741,932789082&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889"
        mode=""
      />
      <image
        src="https://img2.baidu.com/it/u=1191991536,780003752&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=426"
        mode=""
      />
    </view>
  </view>
</template>

<script>
export default {}
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
