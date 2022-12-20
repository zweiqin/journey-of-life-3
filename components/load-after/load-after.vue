<template>
  <view class="load-after-conatiner">
    <view class="item" v-for="item in 4" :key="item">
      <view class="image haha"></view>
      <view class="info">
        <view class="name haha"></view>
        <view class="tags">
          <view class="tag haha"></view>
          <view class="tag haha"></view>
        </view>

        <view class="footer">
          <view class="left haha"></view>
          <view class="right haha"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.haha {
  background: linear-gradient(to right, #ececf0 8%, #d3d3d9 18%, #ececf0 33%);
  background-size: 800px 45px;
  animation: shine 1s ease-in infinite;
}

@keyframes shine {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.load-after-conatiner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 350upx;
    background-color: #fff;
    margin-bottom: 10upx;

    .image {
      width: 100%;
      height: 320upx;
      background-color: rgb(232, 232, 232);
    }

    .info {
      padding: 20upx;
      box-sizing: border-box;
    }

    .name {
      width: 80%;
      height: 36upx;
      background-color: #ccc;
    }

    .tags {
      display: flex;
      margin: 22upx 0 12upx 0;

      .tag {
        width: 100upx;
        height: 40upx;
        background-color: #ccc;

        &:nth-child(1) {
          margin-right: 16upx;
        }
      }
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left,
      .right {
        width: 140upx;
        height: 40upx;
        background-color: #ccc;
      }

      .right {
        width: 100upx;
      }
    }
  }
}
</style>