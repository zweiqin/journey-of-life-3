<template>
  <Pane name="fans" title="我的粉丝">
    <block slot="right">
      <tui-icon name="arrowright" size="28"></tui-icon>
    </block>

    <block slot="title"><text class="fans-count">(500)</text></block>

    <view class="slot-pane">
      <view class="item">
        <view>累计收益</view>
        <view class="value" id="fans_1">15.29</view>
      </view>
      <view class="item">
        <view>累计提现</view>
        <view class="value" id="fans_2">15.29</view> </view
      ><view class="item">
        <view>当前佣金</view>
        <view class="value" id="fans_3">15.29</view>
      </view>
    </view>
  </Pane>
</template>

<script>
import { CountUp } from 'countup.js'
import Pane from './pane.vue'
export default {
  components: { Pane },

  mounted() {
    const option = {
      decimalPlaces: 2,
      duration: 1.5,
    }

    new CountUp('fans_1', 129.8, option).start()
    new CountUp('fans_2', 100, option).start()
    new CountUp('fans_3', 12, option).start()
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

.fans-count {
  font-size: 36upx;
  font-weight: 500;
}
</style>
