<template>
  <view class="activity-list-container">
    <TuanPageHead :scroll-top="scrollTop" fixed title="活动中心" background="#fff" :z-index="9000001">
      <tui-icon slot="left" name="arrowleft" color="#3d3d3d" @click="handleBack"></tui-icon>
    </TuanPageHead>
    {{ dot }}
    <view class="activity-container" v-if="activityList.length">
      <view class="activity-item" v-for="item in activityList" :key="item.id" @click="handleViewDeatil(item)">
        <view class="activity-info" :class="{ expired: item.isExpired }">
          <view class="name">
            {{ item.name }}
            <text class="tag">平台</text>
          </view>
          <view class="time">
            活动金额：
            <text class="price">￥{{ item.money }}</text>
          </view>
          <view class="time">赠送代金券：{{ item.giftsMoney }}</view>
          <view class="time">活动时间：{{ item.startTime.split(' ')[0] }} ~ {{ item.endTime.split(' ')[0] }}</view>
        </view>
        <image class="activity-cover" :src="item.cover || require('../../../static/images/new-user/fee.icon.png')"></image>
      </view>
    </view>

    <view class="no-data" v-else>暂无活动~</view>

    <tui-toast ref="toast"></tui-toast>
    <Loading v-show="isLoading"></Loading>
  </view>
</template>

<script>
import { getUpActivityListApi } from '../../../api/community-center'
import Loading from '../../../pages/order/components/Loading.vue'

export default {
  components: { Loading },
  data() {
    return {
      isLoading: false,
      scrollTop: 0,
      activityList: []
    }
  },
  mounted() {
    this.getUpActivityList()
  },
  computed: {
    dot() {
      if (!!!this.$store.getters.detailAddress) {
        return '`'
      } else {
        this.getUpActivityList()
        return '.'
      }
    }
  },
  methods: {
    handleBack() {
      uni.switchTab({ url: '/pages/user/user' })
    },

    async getUpActivityList() {
      let currentAddress = this.$store.getters.detailAddress
      if (!currentAddress) {
				// #ifdef APP
				const lastAddress = uni.getStorageSync(T_SELECTED_ADDRESS)
				if (lastAddress) {
					currentAddress = lastAddress.data.province + lastAddress.data.city + lastAddress.data.district + lastAddress.data.town
				}
				// #endif
				// #ifndef APP
				const { detail } = await this.$store.dispatch('location/getCurrentLocation')
				currentAddress = detail
				// #endif
      }
      try {
        this.isLoading = true
        const res = await getUpActivityListApi({ focus: 'up', address: currentAddress })
        if (res.statusCode === 20000) {
          this.activityList = res.data.activities
        } else {
          this.ttoast({ type: 'fail', title: res.statusMsg })
        }
      } catch (error) {
        this.ttoast({ type: 'fail', title: '活动列表获取失败' })
      } finally {
        this.isLoading = false
      }
    },

    handleViewDeatil(activeDetail){
      if(activeDetail.name === '金管家399'){
        return this.go('/user/sever/goldButler/gold-butler')
      }
      this.go('/user/sever/activityCenter/activity-detail?id=' + activeDetail.id)
    }
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },

  async onPullDownRefresh() {
    this.activityList = []
    await this.getUpActivityList()
    uni.stopPullDownRefresh()
  }
}
</script>

<style lang="scss" scoped>
.activity-list-container {
  min-height: 100vh;
  background-color: #f6f6f6;

  .no-data {
    color: #888;
    font-size: 28rpx;
    padding-top: 300rpx;
    text-align: center;
    letter-spacing: 0.2em;
  }

  .activity-container {
    padding: 30rpx;
    box-sizing: border-box;

    .activity-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 30rpx;
      padding: 20rpx;
      box-sizing: border-box;
      border-radius: 20rpx;
      background-color: #fff;
      box-shadow: 0px 1px 6px 0px #ebebeb;

      .activity-info {
        position: relative;

        &.expired {
          &::after {
            content: '';
            display: block;
            position: absolute;
            right: 74rpx;
            top: 10rpx;
            width: 180rpx;
            height: 180rpx;
            background: url('../../../static/images/user/coupon/timeout.png') no-repeat;
            background-size: cover;
          }
        }
        .name {
          font-size: 30rpx;
          font-weight: bold;
          color: #000;

          .tag {
            background-color: rgb(233, 93, 32);
            padding: 2rpx 8rpx;
            border-radius: 6rpx;
            color: #fff;
            font-size: 24rpx;
            margin-left: 10rpx;
          }
        }

        .time {
          margin: 20rpx 0;
          color: #ccc;
          font-size: 24rpx;

          .price {
            font-size: 28rpx;
            color: #3d3d3d;
          }
        }
      }

      .activity-cover {
        width: 150rpx;
        height: 150rpx;
        border-radius: 10rpx;
      }
    }
  }
}
</style>
