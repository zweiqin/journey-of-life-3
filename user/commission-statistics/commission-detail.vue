<template>
  <view class="commisions-list">
    <TuanPageHead :scrollTop="scrollTop" fixed title="佣金详情" bacokground="#fff">
      <tui-icon @click="handleBack" slot="left" name="arrowleft" color="#3d3d3d"></tui-icon>
    </TuanPageHead>

    <view class="container">
      <LoadingMore v-show="loading !== 'none'" :status="loading"></LoadingMore>

      <view class="list" v-if="commissionDataList.length && loading !== 'loading'">
        <view class="item" v-for="item in commissionDataList" :key="item.id">
          <view class="item-bar">
            <view class="left">订单总额：￥{{ item.sumPrice }}</view>
            <view class="right"
              >分佣金额：￥{{ item.sfPrice }} <text style="color: #fe751a; margin-left: 10upx">({{ item.sfProportion * 100 }}%)</text></view
            >
          </view>

          <view class="item-bar gray">
            <view class="left">订单号：{{ item.orderNo }}</view>
            <view class="right" :style="{ color: item.status === 1 ? 'red' : 'green' }">{{ item.status === 1 ? '订单未完成' : '订单已完成' }}</view>
          </view>

          <view class="item-bar gray">
            <view class="left">创建时间：{{ item.createTime }}</view>
          </view>
        </view>
      </view>
      <view class="no-data" v-if="!commissionDataList.length && loading != 'loading'"> 暂无数据... </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import moment from 'moment';
import { USER_INFO } from 'constant';
import { getCommissionDeatilApi } from '../../api/user';
export default {
  data() {
    return {
      commissionDataList: [],
      loading: 'loading',
      scrollTop: 0
    };
  },
  onLoad(params) {
    this.userInfo = uni.getStorageSync(USER_INFO);
    // console.log(dayjs.);
    if (this.userInfo) {
      this.getCommissionDeatil(params.date === 'now');
    }
  },
  methods: {
    handleBack() {
      uni.navigateBack({
        delta: 1
      });
    },

    async getCommissionDeatil(isToday) {
      try {
        this.loading = 'loading';
        const res = await getCommissionDeatilApi({ mobile: this.userInfo.phone });
        if (res) {
          if (isToday) {
            const currentDate = moment().format('YYYY-MM-DD');
            this.commissionDataList = res.filter((item) => {
              return currentDate == item.createTime.split(' ')[0];
            });
          } else {
            this.commissionDataList = res;
          }
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '佣金详情获取失败',
          content: error
        });

        this.commissionDataList = [];
      } finally {
        this.loading = 'more';
        uni.stopPullDownRefresh();
      }
    }
  },

  onPullDownRefresh() {
    this.getCommissionDeatil();
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  }
};
</script>

<style lang="less" scoped>
.commisions-list {
  width: 100vw;
  background-color: #f6f6f5;
  min-height: 100vh;

  .container {
    .list {
      .item {
        background-color: #fff;
        padding: 20upx;
        box-sizing: border-boxf;
        margin-top: 30upx;

        .item-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 28upx;
          margin-bottom: 20upx;

          &.gray {
            color: #929292;
            font-size: 24upx;
          }
        }
      }
    }
  }

  .no-data {
    height: 600upx;
    width: 100vw;
    text-align: center;
    line-height: 600upx;
    color: #929292;
    font-size: 28upx;
    letter-spacing: 1em;
  }
}
</style>
