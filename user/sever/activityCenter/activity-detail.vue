<template>
  <view class="activity-detail-container" v-if="activityDetail">
    <TuanPageHead title="活动详情" background="#fff" :z-index="9000001">
      <tui-icon slot="left" name="arrowleft" color="#3d3d3d" @click="handleBack"></tui-icon>
    </TuanPageHead>

    <image class="cover" :src="activityDetail.cover || require('../../../static/images/new-user/fee.icon.png')"></image>

    <view class="activity-detail-info">
      <view class="cost-gift">
        <view class="cost">￥{{ activityDetail.money }}</view>
        <view class="gift">赠送{{ activityDetail.giftsMoney }}代金券</view>
      </view>
      <view class="activity-name">{{ activityDetail.name }}</view>
      <view class="activity-time"> 活动时间: {{ activityDetail.startTime.split(' ')[0] }} ~ {{ activityDetail.endTime.split(' ')[0] }} </view>
    </view>

    <view class="activity-detail">
      <tui-divider :size="30" dividerColor="#888">活动详情</tui-divider>
      <uParse v-if="activityDetail" :content="activityDetailContent"></uParse>
    </view>

    <view class="op-container">
      <button class="uni-btn" @click="go('/pages/index/voucher-filter?categoryId=1294')">兑换专区</button>
      <button class="uni-btn order" @click="handleOrder">{{ activityDetail.isExpired ? '活动已结束' : '预约下单' }}</button>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { marked } from 'marked';
import { getAcrivityDetailApi } from '../../../api/community-center';
import Loading from '../../../pages/order/components/Loading.vue';
import uParse from '../../../components/u-parse/u-parse.vue';

export default {
  components: { Loading, uParse },
  data() {
    return {
      isLoading: false,
      activityDetail: null,
      activityId: null
    };
  },
  onLoad(params) {
    this.activityId = params.id;
    this.getAcrivityDetail();
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },

    async getAcrivityDetail() {
      try {
        const res = await getAcrivityDetailApi(this.activityId);
        if (res.statusCode === 20000) {
          this.activityDetail = res.data;
        } else {
          this.ttoast({ type: 'fail', title: res.statusMsg });
        }
      } catch (error) {
        this.ttoast({ type: 'fail', title: '活动详情获取失败' });
      }
    },

    // 点击下单
    handleOrder() {
      if (!this.activityDetail.isExpired) {
        this.go('/community-center/welfare/order?id=' + this.activityDetail.id);
      }
    }
  },

  computed: {
    activityDetailContent() {
      return this.activityDetail ? marked(this.activityDetail.info) : '';
    }
  }
};
</script>

<style lang="scss" scoped>
.activity-detail-container {
  min-height: 100vh;
  background-color: #f6f6f6;
  padding-bottom: 180rpx;

  .cover {
    width: 750rpx;
    height: 750rpx;
  }

  .activity-detail-info {
    padding: 20rpx;
    box-sizing: border-box;
    background-color: #fff;

    .cost-gift {
      display: flex;
      align-items: center;

      .cost {
        color: rgb(233, 93, 32);
        font-size: 32rpx;
        font-weight: 500;
        display: block;
      }

      .gift {
        color: #747474;
        font-size: 28rpx;
        padding: 6rpx 18rpx;
        border-radius: 100rpx;
        background-color: #f6f6f6;
        margin-left: 10rpx;
      }
    }

    .activity-name {
      font-size: 32rpx;
      line-height: 1.5;
      color: #000;
      margin-top: 20rpx;
    }

    .activity-time {
      font-size: 28rpx;
      color: #888;
      margin-top: 10rpx;
    }
  }

  .op-container {
    height: 161upx;
    width: 100vw;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    padding: 40upx 44upx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .uni-btn {
      text-align: center;
      line-height: 80upx;
      width: 300upx;
      height: 80upx;
      background-color: #ffce2c;
      color: #fff;
      font-size: 32upx;
      font-weight: 500;
      transition: all 350ms;
      border-radius: 10upx;

      &:active {
        opacity: 0.7;
      }

      &.order {
        background-color: #ef530e;
      }
    }
  }
}
</style>
