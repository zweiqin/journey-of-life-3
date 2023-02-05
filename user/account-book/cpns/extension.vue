<template>
  <Pane name="profile" title="我的收益(元)">
    <block slot="right">
      <button class="uni-btn profile-btn">去提现</button>
    </block>

    <view class="slot-pane">
      <view class="item">
        <view>累计收益</view>
        <view class="value" id="ex_1">0</view>
      </view>
      <view class="item">
        <view>累计提现</view>
        <view class="value" id="ex_2">0</view> </view
      ><view class="item">
        <view>当前佣金</view>
        <view class="value" id="ex_3">0</view>
      </view>
    </view>
  </Pane>
</template>

<script>
import { CountUp } from 'countup.js'
import Pane from './pane.vue'
export default {
  components: { Pane },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  mounted() {},

  watch: {
    data: {
      handler(value) {
        const option = {
          decimalPlaces: 2,
          duration: 1.5,
        }
        if (value.cumulativeIncome) {
          new CountUp('ex_1', this.data.cumulativeIncome, option).start()
          new CountUp('ex_2', this.data.holdingIncome, option).start()
          new CountUp('ex_3', this.data.withdrawnIncome, option).start()
        }
      },
    },
  },
}
</script>

<style lang="less" scoped>
.profile-btn {
  border-radius: 100px;
  font-size: 12px;
  padding: 4px 8px;
  color: #fff;
  background: linear-gradient(90deg, #e95d20, #ff8f1f);
  margin-left: 0;
  margin-right: 0;
}
</style>
