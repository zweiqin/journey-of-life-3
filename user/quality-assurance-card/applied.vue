<template>
  <view class="applied-container">
    <TuanPageHead title="质保卡申请记录">
      <block slot="left">
        <BeeBack>
          <tui-icon name="arrowleft" :size="64" unit="rpx" color="#222229" margin="0"></tui-icon>
        </BeeBack>
      </block>
    </TuanPageHead>

    <view class="tabs flex-items">
      <!-- 关于减一see: './config.js' -->
      <view @click="handleChangeStatus(tab.value - 1)" class="item flex-items" v-for="tab in tabs" :key="tab.value" :class="{ active: tab.value - 1 === currentTab }">{{ tab.name }}</view>
    </view>

    <view class="history-list">
      <ApplyHistoryDetail
        @changeCurrent="handleChangeCurrentCollapse"
        v-for="(item, index) in $data._list"
        :key="item.id"
        :tag="index"
        :info="item"
        :currentCollapseIndex="currentCollapseIndex"
        @cancel="handleCancelServe"
      ></ApplyHistoryDetail>
    </view>

    <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>
    <view class="no-data" v-if="!$data._list.length && $data._status === 'none'">
      <tui-icon name="nodata" margin="0 0 20rpx 0"></tui-icon>
      暂无申请记录~
    </view>

    <tui-modal :show="cancelTipVisible" @click="handleClickModal" title="提示" content="确定要取消申请吗？"></tui-modal>

    <CancelApplyServePopup ref="cancelApplyServePopupRef"></CancelApplyServePopup>
  </view>
</template>

<script>
import { getQualityAssuranceCardApplysApi, cancelQualityAssuranceCardServeApi } from '../../api/community-center'
import { qualityAssuranceCardStatus } from './config'
import ApplyHistoryDetail from './components/ApplyHistoryDetail.vue'
import CancelApplyServePopup from './components/CancelApplyServePopup.vue'
import loadMore from '../../mixin/loadMore'
import { getUserId } from '../../utils'

export default {
  components: { ApplyHistoryDetail, CancelApplyServePopup },
  data() {
    return {
      tabs: qualityAssuranceCardStatus.filter((item) => item.type.includes('history')),
      currentTab: 1,
      currentCollapseIndex: 0,
      cancelTipVisible: false,
      cancelServeForm: {
        qualityAssuranceCardSerialNumber: '',
        userId: getUserId()
      }
    }
  },

  onLoad() {
    this.getData()
  },

  mixins: [
    loadMore({
      api: getQualityAssuranceCardApplysApi,
      mapKey: { totalPages: 'pages', list: 'records', size: 'pageSize', page: 'pageNo' }
    })
  ],

  methods: {
    handleChangeStatus(status) {
      this.currentTab = status
      this.$data._query.pageNo = 1
      this.getData()
    },

    handleChangeCurrentCollapse(index) {
      if (index === this.currentCollapseIndex) {
        return (this.currentCollapseIndex = -100)
      }
      this.currentCollapseIndex = index
    },

    getData() {
      this.$data._query.userId = getUserId()
      this.$data._query.status = this.currentTab
      this._loadData()
    },

    async handleClickModal(e) {
      try {
        if (e.index) {
        }
      } catch (error) {}
    },

    handleCancelServe(e) {
      this.cancelServeForm.qualityAssuranceCardSerialNumber = e
      this.cancelTipVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.applied-container {
  min-height: 100vh;
  background-color: #f3f3f3;

  .tabs {
    width: 100%;
    background-color: #fff;

    .item {
      flex: 1;
      height: 88rpx;
      border-right: 1rpx solid #d8d8d8;
      color: #000000;
      font-size: 30rpx;
      justify-content: center;
      transition: color 350ms;

      &.active {
        color: #ef530e;
        font-weight: bold;
      }
    }
  }

  .history-list {
    padding: 20rpx;
    box-sizing: border-box;
  }

  .no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 200rpx;
    color: #ccc;
    font-size: 24rpx;
  }
}
</style>
