<template>
  <view class="apponit-list">
    <scroll-view scroll-x>
      <view class="serveList">
        <view class="item" v-for="item in data" :key="item.id" @click="handleViewDetail(item)">
          <view class="image-wrapper">
            <image class="img" :src="item.serverImageUrl.split(',')[0]">
            </image>
          </view>

          <view class="serve-title">{{ item.serverNameThree }}</view>
          <view class="price-text">￥{{ item.startPrice }}起</view>
        </view>

        <view class="item" @click="go('/community-center/service-sort?value=2')">
          <tui-icon name="listview"></tui-icon>
          <text style="color: #ccc;">更多服务</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getUserId } from 'utils';
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    currentServeIndex: 0
  },

  methods: {
    handleViewDetail(item) {
      const name = item.serverNameThree;
      const id = item.id;
      this.userId = getUserId();

      uni.setStorage({
        key: "listTop",
        data: this.scrollTop
      })

      if (!this.userId) {
        uni.showModal({
          title: "提示",
          content: "你还没登录,请登录",
          showCancel: true,
          // success: ({ confirm, cancel }) => {}
          success: function (res) {
            if (res.confirm) {
              console.log("确定");
              uni.navigateTo({
                url: `/pages/login/login`,
              });
            } else if (res.confirm) {
              console.log("取消");
            }
          },
        });
      } else {
        uni.navigateTo({
          url: `/community-center/community-detail?id=${id}&serverNameThree=${name}&serverImageUrl=${item.serverImageUrl}`,
        });
      }
    }
  },
}
</script>

<style lang="less" scoped>
view {
  line-height: 1.5;
}

.apponit-list {
  .serveList {
    display: flex;
    align-items: center;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 22upx;
      box-sizing: border-box;
      flex: 0 0 260upx;
      height: 326upx;
      border: 1upx solid #EAEBED;
      border-radius: 20upx;
      margin-right: 16upx;
      transition: all 350ms;

      &:active {
        background-color: #ebebeb;
      }

      .image-wrapper {
        width: 200upx;
        height: 200upx;


        .img {
          width: 100%;
          height: 100%;
        }
      }

      .serve-title {
        color: #141000;
        font-size: 28upx;
        width: 200upx;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        text-align: center;
        margin: 10upx 6upx;
      }

      .price-text {
        color: #FC4023;
        font-weight: bold;
      }
    }
  }
}
</style>