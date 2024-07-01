<template>
  <div class="quality-assurance-card-container">
    <!-- header -->
    <TuanPageHead title="我的质保卡">
      <block slot="left">
        <tui-icon name="arrowleft" :size="64" unit="rpx" color="#222229" margin="0" @click="$switchTab('/pages/user/user')"></tui-icon>
      </block>

      <slot slot="right">
        <button class="view-history" @click="go('/user/quality-assurance-card/applied')">查看申请记录</button>
      </slot>
    </TuanPageHead>

    <view class="main-wrapper">
      <!-- tabs -->
      <scroll-view scroll-x :scroll-into-view="scrollToItem" scroll-with-animation>
        <view class="tab-container flex-items flex-sp-between">
          <view :id="'item_' + status.value" v-for="status in statusList" :key="status.value">
            <button class="uni-btn tab-item" @click="handleChangeTab(status.value)" :class="{ active: currentStatus === status.value }">
              {{ status.name }}
            </button>
          </view>
        </view>
      </scroll-view>

      <!-- card list -->
      <QualityAssuranceCard v-for="item in $data._list" :key="item.id" :info="item"></QualityAssuranceCard>
      <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>
      <view class="no-data" v-if="!$data._list.length && $data._status === 'none'">
        <tui-icon name="nodata" margin="0 0 20rpx 0"></tui-icon>
        暂无质保卡~
      </view>
    </view>
  </div>
</template>

<script>
import { getQualityAssuranceCardsListApi } from '../../api/community-center'
import { qualityAssuranceCardStatus } from './config'
import QualityAssuranceCard from './components/QualityAssuranceCard.vue'
import loadMore from '../../mixin/loadMore'
import { getUserId } from '../../utils'

export default {
  components: { QualityAssuranceCard },
  mixins: [
    loadMore({
      api: getQualityAssuranceCardsListApi,
      mapKey: { totalPages: 'pages', list: 'records', size: 'pageSize', page: 'pageNo' }
    })
  ],
  onLoad() {
    this.getData()
  },
  data() {
    return {
      statusList: [{ name: '全部', value: -1, type: 'mine' }, ...qualityAssuranceCardStatus].filter((item) => item.type.includes('mine')),
      currentStatus: -1
    }
  },

  methods: {
    handleChangeTab(newStatus) {
      this.currentStatus = newStatus
      this.$data._query.pageNo = 1
      this.getData()
    },
    getData() {
      this.$data._query.userId = getUserId()
      this.$data._query.status = this.currentStatus === -1 ? undefined : this.currentStatus
      this._loadData()
    }
  },

  computed: {
    scrollToItem() {
      return 'item_' + this.currentStatus
    }
  }
}
</script>

<style lang="less" scoped>
.quality-assurance-card-container {
  min-height: 100vh;
  background-color: #f3f3f3;

  .view-history {
    flex: 0 0 200rpx;
    height: 50rpx;
    background-color: #d8d8d8;
    border-radius: 10rpx;
    font-size: 24rpx;
    line-height: 2;
    margin: 0 !important;

    &::after {
      border: none !important;
    }
  }

  .main-wrapper {
    padding: 10rpx 24rpx 20rpx;
    box-sizing: border-box;

    .tab-container {
      position: relative;
      white-space: nowrap;
      overflow: auto;

      .tab-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        color: #000000;
        font-size: 28rpx;
        margin-right: 66rpx;
        height: 56rpx;
        transition: all 350ms;

        &.active {
          color: #ef530e;
          font-weight: bold;
        }
      }
    }
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
