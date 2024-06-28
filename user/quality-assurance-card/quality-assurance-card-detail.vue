<template>
  <view class="quality-assurance-card-detail-container">
    <TuanPageHead title="我的质保卡">
      <block slot="left">
        <BeeBack>
          <tui-icon name="arrowleft" :size="64" unit="rpx" color="#222229" margin="0"></tui-icon>
        </BeeBack>
      </block>
    </TuanPageHead>

    <view class="main">
      <QualityAssuranceCard :jump="false" @set-btn="currentStatusOpInfo = $event" :info="cardInfo" :status="cardInfo.status"></QualityAssuranceCard>
      <view class="description">
        <view class="title">质保卡说明:</view>
        质保期为社区服务完成之日期起计算。若服务在保修期内出现质量问题，可在线提交质保申请，售后人员进行处理。
      </view>
      <view class="section-title flex-items flex-sp-between">
        质保卡信息
        <button class="uni-btn history-list-btn" @click="go('/user/quality-assurance-card/applied')">查看申请记录</button>
      </view>
      <view class="section-wrapper">
        <view class="item flex-items">
          <text class="label">享保人:</text>
          {{ cardDetailInfo.insuredPerson }}
        </view>
        <view class="item flex-items">
          <text class="label">联系电话:</text>
          {{ cardDetailInfo.tel }}
        </view>

        <view v-if="cardDetailInfo.brandAccount && cardDetailInfo.brandAccount.shopName">
          <view class="item flex-items">
            <text class="label">社区店名称:</text>
            {{ cardDetailInfo.brandAccount.shopName }}
          </view>
          <view class="item flex-items">
            <text class="label">社区店地址:</text>
            {{ cardDetailInfo.brandAccount.shopAddress }}
          </view>
          <view class="item flex-items">
            <text class="label">社区店电话:</text>
            {{ cardDetailInfo.brandAccount.shopAccount }}
          </view>
        </view>
      </view>

      <view class="section-title" v-if="cardDetailInfo.applyBOs.length">质保卡申请记录</view>
      <view class="section-wrapper" v-for="item in cardDetailInfo.applyBOs" :key="item.id">
        <view class="item flex-items">
          <text class="label">申请编号:</text>
          {{ item.qualityAssuranceCardSerialNumber }}
        </view>
        <view class="item flex-items">
          <text class="label">申请时间:</text>
          {{ item.createTime }}
        </view>
        <view class="item flex-items">
          <text class="label">服务类型:</text>
          {{ cardDetailInfo.type }}
        </view>
        <view class="item flex-items">
          <text class="label">问题反馈:</text>
          <view class="value" style="flex: 1; flex-wrap: wrap; color: #f40">
            {{ item.problemFeedback }}
          </view>
        </view>
        <view class="item blod flex-items">
          <text class="label">处理状态:</text>
          {{ item.status | formatStatus }}
        </view>
        <view class="item flex-items">
          <text class="label">处理人:</text>
          {{ item.masterName || '--' }}
        </view>
        <view class="item flex-items">
          <text class="label">处理人电话:</text>
          {{ item.masterTel || '--' }}
        </view>
      </view>

      <button @click="handleOpServe" v-if="currentStatusOpInfo.applyText" :class="currentStatusOpInfo.disabled ? 'disabled' : ''" class="uni-btn cancel-btn">
        {{ currentStatusOpInfo.applyText }}
      </button>
    </view>

    <tui-toast ref="toast"></tui-toast>
    <ApplyServePopup ref="applyServePopupRef" @refresh="getQualityAssuranceCardDetail"></ApplyServePopup>
  </view>
</template>

<script>
import QualityAssuranceCard from './components/QualityAssuranceCard.vue'
import { getQualityAssuranceCardDetailApi } from '../../api/community-center'
import ApplyServePopup from './components/ApplyServePopup.vue'
import { getCurrentStatusInfo } from './config'

export default {
  components: { QualityAssuranceCard, ApplyServePopup },
  data() {
    return {
      cardInfo: {},
      cardDetailInfo: {},
      currentStatusOpInfo: {}
    }
  },
  onLoad(options) {
    this.cardId = options.id
    if (!this.cardId) {
      return this.ttoast({ type: 'fail', title: '数据错误' })
    } else {
      this.getQualityAssuranceCardDetail()
    }
  },

  filters: {
    formatStatus(value) {
      let currentStatusText = getCurrentStatusInfo(value + 1).name
      if (currentStatusText === '已失效') {
        currentStatusText = '已取消'
      }
      return currentStatusText
    }
  },

  methods: {
    async getQualityAssuranceCardDetail() {
      try {
        const res = await getQualityAssuranceCardDetailApi({
          id: this.cardId
        })

        if (res.statusCode === 20000) {
          console.log(res.data)

          this.cardDetailInfo = res.data
          this.cardInfo = {
            expireDate: this.cardDetailInfo.expireDate,
            type: this.cardDetailInfo.type,
            validityPeriod: this.cardDetailInfo.validityPeriod,
            serialNumber: this.cardDetailInfo.serialNumber,
            status: this.cardDetailInfo.status
          }
        } else {
          this.ttoast({
            type: 'fail',
            title: '质保卡详情获取失败',
            content: res.statusMsg
          })
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '质保卡详情获取失败',
          content: error.message
        })
      }
    },

    handleOpServe() {
      const { value } = this.currentStatusOpInfo
      switch (value) {
        case 1:
          this.$refs.applyServePopupRef.open(this.cardDetailInfo.orderNo)
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.quality-assurance-card-detail-container {
  min-height: 100vh;
  background-color: #f3f3f3;

  .main {
    padding: 0 35rpx 24rpx;

    .description {
      background-color: #fff;
      width: 98%;
      margin: 0 auto;
      padding: 8rpx 28rpx 16rpx;
      font-size: 20rpx;
      color: #000;
      line-height: 1.6;
      border-radius: 0 0 10rpx 10rpx;
      box-sizing: border-box;

      .title {
        line-height: 2.2;
      }
    }

    .section-title,
    .history-list-btn {
      line-height: 2.2;
      color: #000;
      font-size: 24rpx;
      font-weight: bold;
      margin: 8rpx 0;
    }

    .section-wrapper {
      padding: 9rpx 21rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20rpx;
      margin-bottom: 20rpx;

      .item {
        min-height: 54rpx;
        font-size: 24rpx;
        color: #000;
        align-items: flex-start;

        &.blod {
          font-weight: bold;
        }

        .label {
          width: 140rpx;
          margin-right: 11rpx;
          font-weight: normal;
          white-space: nowrap;
        }
      }
    }

    .cancel-btn {
      width: 100%;
      height: 100rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 35rpx;
      font-weight: bold;
      border-radius: 20rpx;
      margin-top: 190rpx;
      background-color: #ef530e;

      &.disabled {
        background-color: #979797;
      }
    }
  }
}
</style>
