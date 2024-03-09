<template>
  <view class="transfer-history-container">
    <TuanPageHead title="代金券流水" background="#fff">
      <block slot="left">
				<tui-icon
					name="arrowleft" :size="64" unit="rpx"
					color="#222229"
					margin="0 20rpx 0 0" @click="handleToOrderList"
				></tui-icon>
			</block>
    </TuanPageHead>

    <tui-tabs itemWidth="50%" sliderBgColor="#ef530e" selectedColor="#ef530e" :tabs="tabs" :currentTab="currentTab" @change="handleChangeTab"></tui-tabs>

    <view class="list-wrapper" v-if="currentTab == 0 || currentTab == 1">
      <view class="order-list">
        <VoucherTransferPane :type="currentType" :key="order" v-for="order in $data._list" :orderData="order"></VoucherTransferPane>
      </view>

      <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>

      <view v-show="!$data._list.length && $data._status !== 'loading'" class="no-data"> 暂无流水记录~ </view>
    </view>
    <view class="list-wrapper" style="padding: 0rpx;height: 88.9vh;" v-else>
      <view class="order-list" style="display: flex;height: 100%">
        <MakeMoneyRecords :myRenderList="myRenderList" :disburseRenderList="disburseRenderList"></MakeMoneyRecords>
      </view>

      <!-- <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore> -->

      <!-- <view class="no-data"> 暂无流水记录~ </view> -->
    </view>
  </view>
</template>

<script>
import loadMore from '../../mixin/loadMore';
import { voucherTransferHistoryApi } from '../../api/goods';
import { getUserId } from '../../utils';
import { dataStatistics, redStatistics } from '@/api/community-center/makeSmallFortune'
import VoucherTransferPane from './components/VoucherTransferPane.vue';
import MakeMoneyRecords from './components/MakeMoneyRecords.vue'

export default {
  components: { VoucherTransferPane, MakeMoneyRecords },
  mixins: [
    loadMore({
      api: voucherTransferHistoryApi,
      mapKey: { list: 'items', size: 'limit', totalPages: 'totalPages' }
    })
  ],
  data() {
    return {
      tabs: [{ name: '转赠记录' }, { name: '收到记录' }, { name: '流水记录' }],
      currentTab: 0,
      currentType: 'out',
      myRenderList: null,
      disburseRenderList: null
    };
  },
  onLoad() {
    this.handleChangeTab({ index: 0 });
    dataStatistics({
        userId: getUserId()
    }).then(res => {
        console.log(res)
        this.myRenderList = res.data
    })
    redStatistics({
        userId: getUserId()
    }).then(res => {
        console.log(res)
        this.disburseRenderList = res.data
    })
  },
  methods: {
    handleToOrderList() {
      uni.navigateTo({ url: '/user/voucher/voucher' });
    },

    // 修改tab栏
    handleChangeTab(e) {
      this.currentTab = e.index;
      this.$data._query.page = 1;

      if (this.currentTab === 0) {
        this.$data._query.holdId = getUserId();
        delete this.$data._query.userId;
        this.currentType = 'out';
      } else {
        this.$data._query.userId = getUserId();
        delete this.$data._query.holdId;
        this.currentType = 'in';
      }
      this.getData();
    },

    // 获取数据
    getData() {
      this._loadData();
    }
  }
};
</script>

<style lang="less" scoped>
.back-icon {
  width: 64upx;
  height: 64upx;
}

.transfer-history-container {
  min-height: 100vh;
  background-color: #f6f6f6;

  .list-wrapper {
    padding: 20upx;
  }
}

.no-data {
  width: 100%;
  height: 500upx;
  text-align: center;
  line-height: 500upx;
  color: #ccc;
}
</style>
