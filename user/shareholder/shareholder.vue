<template>
  <view class="shareholder-page">
    <InfoPane :userInfo="userInfo"></InfoPane>

    <view class="main-area">
      <Performance  class="section animate__animated animate__zoomInDown" :accumulativeOrderTotal="allData.accumulativeOrderTotal"
        :accumulativeOrderPrice="allData.accumulativeOrderPrice" :toDayOrderPriceTotal="allData.toDayOrderPriceTotal"
        :toDayOrderTotal="allData.toDayOrderTotal">
      </Performance>

      <OrderChannel :data="allData" class="section"></OrderChannel>
      <OrderPane :data="allData" class="section"></OrderPane>
      <BulletinBoard :data="allData.memberVoList" class="section"></BulletinBoard>
    </view>
  </view>
</template>

<script>
import { USER_INFO } from 'constant'
import InfoPane from './components/InfoPane.vue'
import Performance from './components/Performance.vue'
import OrderChannel from './components/OrderChannel.vue'
import OrderPane from './components/OrderPane.vue'
import BulletinBoard from './components/BulletinBoard.vue'
import { getShareHolderDataApi } from '../../api/user'
export default {
  components: {
    InfoPane,
    Performance,
    OrderChannel,
    OrderPane,
    BulletinBoard
  },

  data() {
    return {
      userInfo: {},
      allData: { memberVoList: [] },
    }
  },

  onLoad() {
    this.userInfo = uni.getStorageSync(USER_INFO)
    this.getData()
  },

  methods: {
    async getData() {
      const { data } = await getShareHolderDataApi({
        userId: this.userInfo.userId
      })

      this.allData = data
    }
  },
}
</script>

<style lang="less" scoped>
.shareholder-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fb;

  .main-area {
    padding: 30upx 24upx;
    box-sizing: border-box;

    .section {
      padding: 24upx 30upx 37upx;
      box-sizing: border-box;
      border-radius: 20upx;
      background-color: #fff;
      margin-bottom: 20upx;
    }
  }

}
</style>