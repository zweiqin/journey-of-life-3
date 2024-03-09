<template>
  <view class="recharge-history-list">
    <TuanPageHead title="充值记录" background="#fff">
      <block slot="left">
				<tui-icon
					name="arrowleft" :size="64" unit="rpx"
					color="#222229"
					margin="0 20rpx 0 0" @click="handleToOrderList"
				></tui-icon>
			</block>
    </TuanPageHead>

    <view class="main-wrapper">
      <!-- <view class="search-container">
        <input class="search-input" v-model="searchOrderNo" type="text" placeholder="请输入订单号" />
        <tui-icon :size="20" name="search"></tui-icon>
        <button class="search-btn uni-btn" @click="handleSearchOrder">搜索</button>
      </view> -->

      <view class="filter-items">
        <button @click="handleFilter('')" class="uni-btn" :class="{ active: !$data._query.status && $data._query.status !== 0 }">全部</button>
        <button
          class="uni-btn"
          @click="handleFilter(item.value)"
          :class="{ active: $data._query.status === item.value }"
          v-for="item in voucherStatusList"
          :key="item.value"
        >
          {{ item.label }}
        </button>
      </view>

      <view class="list" v-if="$data._list.length">
        <view class="item" v-for="item in $data._list" :key="item.id">
          <view class="order-no">
            <view class="no"> <tui-icon :size="18" margin="0 10rpx 0 0" color="#ef5613" name="order"></tui-icon>{{ item.orderId }}</view>
            <button class="uni-btn">| 复制单号</button>
          </view>

          <view class="item-info">
            <view class="recharge-time">{{ item.payTime || item.addTime }}</view>
            <view class="count-status">
              <view class="count-wrapper">
								<tui-icon
									name="coupon" :size="30" unit="rpx"
									color="#f5db1b"
									margin="0 4rpx 0 0"
								></tui-icon>
                {{ item.number }} 个
              </view>

              <view class="tag" :style="{ color: [0, 1, 3].includes(item.status) ? '#767676' : '#8dc73e' }">{{ item.status | filterStatus }}</view>
            </view>
          </view>
        </view>
      </view>
      <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>

      <view v-show="!$data._list.length && $data._status !== 'loading'" class="no-data"> 暂无订单~ <button class="uni-btn">去充值</button> </view>
    </view>
  </view>
</template>

<script>
import { getVoucherRechargeHistoryListApi } from '../../api/goods';
import loadMore from '../../mixin/loadMore';
import { getUserId } from '../../utils';
import { voucherStatusList } from './config';

export default {
  mixins: [
    loadMore({
      api: getVoucherRechargeHistoryListApi,
      mapKey: { list: 'items', size: 'limit', totalPages: 'totalPages' }
    })
  ],
  data() {
    return {
      voucherStatusList: Object.freeze(voucherStatusList),
      searchOrderNo: ''
    };
  },
  filters: {
    filterStatus(value) {
      const current = voucherStatusList.find((item) => item.value == value);
      return current ? current.label : '';
    }
  },
  methods: {
    handleToOrderList() {
      uni.navigateTo({ url: '/user/voucher/voucher' });
    },

    // 获取充值历史记录
    getVoucherRechargeHistoryList() {
      this.$data._query.userId = getUserId();
      this._loadData();
    },

    // 点击筛选
    handleFilter(status) {
      this.$data._query.status = status;
      this.$forceUpdate();
      this.getVoucherRechargeHistoryList();
    },

    // 点击搜索
    handleSearchOrder() {
      if (!this.searchOrderNo) return;
      this.$data._query.order = this.searchOrderNo.trim();
      this.getVoucherRechargeHistoryList();
    }
  },
  onLoad() {
    this.getVoucherRechargeHistoryList();
  }
};
</script>

<style lang="less" scoped>
.recharge-history-list {
  min-height: 100vh;
  width: 100%;
  background-color: #f6f6f6;

  .main-wrapper {
    padding: 30upx 20upx;
    box-sizing: border-box;

    .search-container {
      width: 100%;
      height: 70upx;
      background-color: #fff;
      border-radius: 100upx;
      font-size: 28upx;
      padding: 10upx 20upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      margin-bottom: 20upx;

      .search-input {
        flex: 1;
        margin-right: 20upx;
      }

      .search-btn {
        font-size: 28upx;
        color: #ef5613;
      }
    }

    .filter-items {
      width: 100%;
      justify-content: space-between;
      display: flex;
      align-items: center;
      margin-bottom: 30upx;

      .uni-btn {
        font-size: 24upx;
        padding: 10upx 20upx;
        border-radius: 10upx;
        background-color: #fff8f5;
        color: #ccc;

        &.active {
          background-color: rgb(239, 86, 19);
          color: #fff;
        }
      }
    }
  }

  .list {
    .item {
      padding: 20upx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20upx;
      margin-bottom: 30upx;

      .order-no {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20upx;
        border-bottom: 1upx solid #f6f6f6;
        color: #000;

        .no {
          font-size: 30upx;
          font-weight: 500;
          white-space: nowrap;
        }

        .uni-btn {
          color: #979797;
          font-size: 28upx;
          white-space: nowrap;
        }
      }

      .item-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10upx 0 0 0;
        font-size: 28upx;
      }

      .count-wrapper {
        border-bottom: 1upx solid #8dc73e;
      }

      .tag {
        text-align: center;
      }
    }
  }
}
.back-icon {
  width: 64upx;
  height: 64upx;
}

.no-data {
  font-size: 32upx;
  width: 100%;
  height: 500upx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9c9c9c;
  letter-spacing: 0.5em;

  .uni-btn {
    font-size: 32upx;
    color: #ef5613;
    letter-spacing: normal;
  }
}
</style>
