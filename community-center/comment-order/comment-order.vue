<template>
  <view class="comment-order-container">
    <TuanPageHead title="订单评价" background="#fff">
      <tui-icon @click="handleBack" style="margin-left: -28upx" slot="left" color="#000" :size="28" name="arrowleft"></tui-icon>
    </TuanPageHead>

    <view class="status-wrapper">
      <view :class="{ active: currentStatus.value === item.value }" class="item" v-for="item in statusList" :key="item.value" @click="handleChangeStatus(item)">
        {{ item.name }}
      </view>
    </view>

    <view class="main">
      <view class="order-list" v-if="orderList[currentStatus.list] && orderList[currentStatus.list].length && !isLoading">
        <block v-if="[0, 1].includes(currentStatus.value)">
          <CommentTypeV1
            :isAppend="currentStatus.value === 1"
            @comment="handleComment"
            v-for="order in orderList[currentStatus.list]"
            :key="order.orderNo"
            :itemData="order"
          ></CommentTypeV1>
        </block>

        <block v-if="currentStatus.value === 2">
          <CommentTypeV2 v-for="order in orderList[currentStatus.list]" :key="order.orderNo" :itemData="order"></CommentTypeV2>
        </block>
      </view>

      <view class="no-data" v-show="!isLoading && orderList[currentStatus.list] && !orderList[currentStatus.list].length">
        <tui-icon :size="40" name="order"></tui-icon>
        <text class="text">暂无订单~</text>
        <button class="uni-btn" @click="handleToOrder">去下单</button>
      </view>

      <LoadingMore style="margin-top: 400upx" v-show="isLoading" status="loading"></LoadingMore>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { statusList } from './config';
import { getUserId } from '../../utils';
import CommentTypeV1 from './components/CommentTypeV1.vue';
import CommentTypeV2 from './components/CommentTypeV2.vue';

export default {
  components: { CommentTypeV1, CommentTypeV2 },
  data() {
    return {
      isLoading: false,
      statusList: statusList,
      currentStatus: statusList[0],
      orderList: {
        commentList: [],
        commentedList: []
      }
    };
  },

  mounted() {
    this.list();
  },

  methods: {
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user'
      });
    },

    // 获取待评论列表
    async list() {
      try {
        this.isLoading = true;
        const data = await this.currentStatus.api({
          userId: getUserId()
        });
        this.orderList[this.currentStatus.list] = data || [];
      } catch (error) {
        this.ttoast({ type: 'fail', title: '列表获取失败', content: error });
      } finally {
        this.timer = setTimeout(() => {
          this.isLoading = false;
          uni.stopPullDownRefresh();
        }, 500);
      }
    },

    // 切换状态
    handleChangeStatus(currentStatus) {
      this.currentStatus = currentStatus;
      this.list();
    },

    // 点击去下单
    handleToOrder() {
      uni.navigateTo({ url: '/community-center/service-sort/index?value=2&name=家具维保' });
    },

    // 去评论
    handleComment({ itemData, isAppend }) {
      if (isAppend) {
        uni.navigateTo({
          url:
            '/community-center/comment-order/append-comment?orderNo=' +
            itemData.orderNo +
            '&serveName=' +
            itemData.serverName +
            '&url=' +
            itemData.serverUrl +
            '&commentId=' +
            itemData.id
        });
      } else {
        uni.navigateTo({
          url: '/community-center/comment-order/rate?orderNo=' + itemData.orderNo + '&serveName=' + itemData.serverName + '&url=' + itemData.serverUrl
        });
      }
    }
  },

  onPullDownRefresh() {
    this.list();
  },

  onHide() {
    clearTimeout(this.timer);
    this.timer = null;
  }
};
</script>

<style lang="less" scoped>
/deep/ .center {
  font-weight: 500;
}
.comment-order-container {
  min-height: 100vh;
  background-color: #f7f7f7;

  /deep/ .tui-lazyload__img {
    width: 140rpx !important;
    height: 140rpx !important;
    background-color: #ccc;
  }

  .status-wrapper {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 20upx;
    box-sizing: border-box;

    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28upx;
      font-weight: 500;
      padding: 20upx 40upx;
      background-color: #f5f5f5;
      border-radius: 100upx;
      margin-right: 20upx;

      &:nth-child(3) {
        margin-right: 0;
      }

      &.active {
        background-color: #fff0e9;
      }
    }
  }

  .main {
    padding: 0 20upx;
    box-sizing: border-box;
    margin-top: 20upx;
    .no-data {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 28upx;
      height: 500upx;
      color: rgb(153, 153, 153);

      .text {
        margin-top: 20upx;
        letter-spacing: 0.3em;
      }

      .uni-btn {
        margin-top: 20upx;
        font-size: 28upx;
        color: #ff9060;
        text-decoration: underline;
      }
    }
  }
}
</style>
