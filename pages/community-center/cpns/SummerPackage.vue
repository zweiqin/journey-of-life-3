<template>
  <view class="summer-package-container">
    <view
      :key="index"
      :style="{
        background: `url(${common.seamingImgUrl(item.bg)}) no-repeat`,
        'background-size': 'cover'
      }"
      class="item"
      v-for="(item, index) in packageList"
      @click="handleView(item)"
    >
      <view class="p-name" :style="{ background: item.nameBg }">{{ item.name }}</view>
      <view class="title" :style="{ color: item.color }">{{ item.title }}</view>
      <button class="uni-btn" :style="item.btnStyle">{{ item.btnText }}</button>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { USER_ID, T_SELECTED_ADDRESS } from '../../../constant'
import { getUpActivityListApi } from '../../../api/community-center'

export default {
  data() {
    return {
      packageList: [
        {
          id: 1,
          bg: '1720232269772-限时钜惠瓷片区@1x.png',
          name: '限时钜惠',
          nameBg: '#178af9',
          title: '夏日清洗套餐送300代金券',
          color: '#000',
          btnText: '立即下单',
          btnStyle: 'background-color: #fff; color: #1175FC; border: 1rpx solid #1175FC;',
          url: '/user/sever/activityCenter/activity-detail?id=1'
        },
        {
          id: 2,
          bg: '1720232564072-1.png',
          name: '超值福利',
          nameBg: 'linear-gradient(270deg, #FFC01F 0%, #FA6842 97%)',
          title: '社区优惠套餐',
          color: '#fff',
          btnText: '立即了解',
          btnStyle: 'color: #fff; border: 1rpx solid #fff;'
        }
      ]
    }
  },

  methods: {
    handleView(item) {
      const userId = uni.getStorageSync(USER_ID)
      if (!userId) {
        return this.$emit('empty-login')
      }

      if (item.id === 1) {
        this.viewLimitedTime(item)
      } else {
        this.ttoast({ type: 'info', title: '敬请期待~' })
      }
    },

    async viewLimitedTime(item) {
      try {
        uni.showLoading({ title: '加载中...' })
        let currentAddress = this.$store.getters.detailAddress
        if (!currentAddress) {
          setTimeout(() => {
            if (!currentAddress) {
              this.ttoast({ type: 'info', title: '定位失败', content: '请点击左上角选择定位' })
              uni.hideLoading()
            }
          }, 10000)
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

        if (!currentAddress) {
          return this.ttoast({ type: 'info', title: '定位失败', content: '请点击左上角选择定位' })
        }

        const res = await getUpActivityListApi({ focus: 'up', address: currentAddress })
        if (res.statusCode === 20000 && res.data && res.data.activities) {
          const isExist = res.data.activities.find((item) => item.name === '夏日清洗套餐')
          return isExist ? this.go(item.url) : this.ttoast({ type: 'fail', title: '您所在区域暂不支持该活动' })
        } else {
          this.ttoast({ type: 'fail', title: res.statusMsg })
        }
      } catch (error) {
        // console.log(error)
      } finally {
        uni.hideLoading()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.summer-package-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item {
    width: 340rpx;
    height: 160rpx;
    border-radius: 20rpx;
    overflow: hidden;

    .p-name {
      width: 128rpx;
      height: 42rpx;
      color: #fff;
      background-color: #178af9;
      font-size: 24rpx;
      text-align: center;
      line-height: 42rpx;
      border-radius: 0 0 20rpx 0;
    }

    .title {
      font-size: 24rpx;
      color: #009;
      margin: 13rpx 0 12rpx 20rpx;
      line-height: 1.5;
    }

    .uni-btn {
      display: inline-flex;
      font-size: 22rpx;
      padding: 0 13rpx;
      line-height: 32rpx;
      box-sizing: border-box;
      border-radius: 100px;
      margin-left: 20rpx;
    }
  }
}
</style>
