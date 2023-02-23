<template>
  <view
    class="stuff-goods-container"
    v-if="data"
    @click="go('/pages/prod/prod?goodsId=' + data.id)"
  >
    <view class="img-wrapper">
      <image class="goods-img" :src="data.picUrl" mode="" />
    </view>

    <view class="stuff-goods-info">
      <view class="goods-name">{{ data.name }} </view>

      <view class="tags">
        <view class="tag">
          <view class="img-wrapper">
            <image
              class="icon"
              src="../../../../static/images/new-brand/index/shiming.png"
              mode=""
            />
          </view>
          <text>实名认证</text>
        </view>

        <view class="tag">
          <view class="img-wrapper">
            <image
              class="icon"
              src="../../../../static/images/new-brand/index/shiming.png"
              mode=""
            />
          </view>
          <text>品质保证</text>
        </view>
      </view>

      <view class="brand-info">
        <image
          class="avatar"
          :src="data.brandPicUrl"
          mode=""
        />

        <view class="brand-name"
          >{{ data.brandName }}</view
        >
      </view>

      <view class="rate-info">
        <view class="collection-wrapper">
          <image
            class="icon"
            src="../../../../static/images/new-brand/index/collection.png"
            mode=""
          />
          <text>9872837</text>
        </view>

        <view class="collection-wrapper">
          <image
            class="icon"
            src="../../../../static/images/new-brand/index/zan.png"
            mode=""
          />
          <text>9872837</text>
        </view>
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
.stuff-goods-container {
  width: 350upx;
  background-color: #fff;
  border-radius: 24upx;
  overflow: hidden;
  margin-bottom: 16upx;

  .img-wrapper {
    width: 100%;
    .goods-img {
      width: 100%;
      height: 348upx;
      object-fit: cover;
    }
  }

  .stuff-goods-info {
    padding: 20upx;
    box-sizing: border-box;

    .goods-name {
      color: #3a3629;
      font-size: 28upx;
      width: 300upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 500;
    }
  }

  .tags {
    display: flex;
    align-items: center;
    margin: 12upx 0 24upx 0;

    .tag {
      display: flex;
      align-items: center;
      // overflow: hidden;
      box-sizing: border-box;

      .img-wrapper {
        text-align: center;
        line-height: 40upx;
        width: 40upx;
        height: 40upx;
        border-radius: 8upx 0 0 8upx;
      }
      .icon {
        width: 24upx;
        height: 24upx;
      }

      text {
        height: 40upx;
        line-height: 38upx;
        font-size: 22upx;
        box-sizing: border-box;
        padding: 0 6upx;
        border-radius: 0 8upx 8upx 0;
      }

      &:nth-child(1) {
        margin-right: 10upx;
        .img-wrapper {
          background-color: #ffc117;
        }

        text {
          border: 2upx solid #ffc117;
          color: #ffc117;
        }
      }

      &:nth-child(2) {
        .img-wrapper {
          background-color: #81e19e;
        }

        text {
          border: 2upx solid #81e19e;
          color: #81e19e;
        }
      }
    }
  }

  .brand-info {
    display: flex;
    align-items: center;

    .avatar {
      width: 56upx;
      height: 56upx;
      flex-shrink: 0;
      border-radius: 50%;
      margin-right: 10upx;
    }

    .brand-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #605d52;
      font-size: 28upx;
    }
  }

  .rate-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24upx;

    .icon {
      width: 32upx;
      height: 32upx;
      flex-shrink: 0;
      margin-right: 4upx;
    }

    text {
      color: #b3b2ad;
      font-size: 24upx;
      line-height: 32upx;
    }

    .collection-wrapper {
      display: flex;
    }
  }
}
</style>
