<template>
  <view
    class="server-pane"
    :style="{
      margin: margin
    }"
  >
    <view class="header" :style="{ background: titleBg }">
      <view class="title">{{ title }}</view>
      <view class="tags">
        <view class="tag">就近上门</view>
        <view class="tag">价格统一</view>
        <view class="tag">超长保值</view>
      </view>
    </view>

    <view class="list">
      <view class="item" @click="handleToServiceDetail(item)" v-for="item in list.slice(0, 6)" :key="item.id">
        <view class="image-wrapper">
          <image class="serve-img" :src="item.serverImageUrl.split(',')[0]"></image>
        </view>

        <view class="title">{{ item.serverNameThree }}</view>
        <view class="price-text">￥{{ item.startPrice }}起</view>
      </view>
    </view>

    <view class="more" @click="viewMore">查看更多{{ title }}服务 <tui-icon :size="20" name="arrowright"></tui-icon></view>
  </view>
</template>

<script>
import { getUserId } from 'utils';
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    list: {
      type: Array,
      required: true
    },

    id: {
      type: Number
    },

    margin: {
      type: String,
      default: '0 20upx 40upx'
    },

    titleBg: {
      type: String,
      default: 'linear-gradient(180deg, #FFC0A5 0%, #FFEBE3 100%)'
    }
  },

  methods: {
    viewMore() {
      uni.navigateTo({
        url: `/community-center/service-sort/index?value=${this.id}&name=${this.title}`
      });
    },

    // 查看详情
    handleToServiceDetail(item) {
      const name = item.serverNameThree;
      const id = item.id;
      this.userId = getUserId();

      uni.setStorage({
        key: 'listTop',
        data: this.scrollTop
      });

      if (!this.userId) {
        console.log('userId', this.userId);
        uni.showModal({
          title: '提示',
          content: '你还没登录,请登录',
          showCancel: true,
          // success: ({ confirm, cancel }) => {}
          success: function (res) {
            if (res.confirm) {
              console.log('确定');
              uni.navigateTo({
                url: `/pages/login/login`
              });
            } else if (res.confirm) {
              console.log('取消');
            }
          }
        });
      } else {
        uni.navigateTo({
          url: `/community-center/community-detail?id=${id}&serverNameThree=${name}&serverImageUrl=${item.serverImageUrl}`
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.server-pane {
  padding-bottom: 20upx;
  border-radius: 20upx;
  background-color: #fff;
  overflow: hidden;

  .header {
    padding: 20upx;
    box-sizing: border-box;
    border-radius: 20upx 20upx 0 0;

    .title {
      color: #141000;
      font-size: 32upx;
      font-weight: bold;
    }

    .tags {
      color: #605d52;
      font-size: 24upx;
      display: flex;
      align-items: center;
      margin: 12upx 0 20upx 0;

      .tag {
        margin-right: 12upx;
        padding-right: 12upx;
        border-right: 1upx solid #605d52;

        &:nth-of-type(3) {
          border-right: none;
        }
      }
    }
  }

  .list {
    padding: 20upx;
    box-sizing: border-box;
    border-radius: 20upx;
    background-color: #fff;
    margin-top: -20upx;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: 30upx;

      .image-wrapper {
        width: 200upx;
        height: 200upx;

        .serve-img {
          width: 100%;
          height: 100%;
        }
      }

      .title {
        font-size: 28upx;
        color: #141000;
        margin: 20upx 0;
        width: 200upx;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .price-text {
        font-size: 28upx;
        color: #fc4023;
        font-weight: bold;
      }
    }
  }

  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28upx;
    margin-top: 20upx;
    color: #ccc;
  }
}
</style>
