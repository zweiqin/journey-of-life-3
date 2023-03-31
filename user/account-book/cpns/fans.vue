<template>
  <Pane name="fans" title="我的粉丝">
    <block slot="right">
      <tui-icon name="arrowright" size="28"></tui-icon>
    </block>

    <block slot="title"><text class="fans-count">(500)</text></block>

    <view class="slot-pane">
      <view class="item">
        <view>超级合伙人</view>
        <view class="value" id="fans_1">{{ data.superPartner || 0 }}</view>
      </view>
      <view class="item">
        <view>合伙人</view>
        <view class="value" id="fans_2">{{ data.partner || 0 }}</view>
      </view>
      <view class="item">
        <view>普通会员</view>
        <view class="value" id="fans_3">{{ data.ordinaryMember || 0 }}</view>
      </view>
      <view class="item">
        <view>代理</view>
        <view class="value" id="fans_3">{{ data.regionalAgent || 0 }}</view>
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

  watch: {
    data: {
      handler(value) {
        const option = {
          decimalPlaces: 0,
          duration: 1.5,
        }
        if (value.superPartner) {
          new CountUp('fans_1', this.data.superPartner, option).start()
          new CountUp('fans_2', this.data.partner, option).start()
          new CountUp('fans_3', this.data.ordinaryMember, option).start()
        }
      },
    },

    immediate: true,
    deep: true,
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
