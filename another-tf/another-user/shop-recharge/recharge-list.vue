<template>
  <view>
    <TuanPageHead title="订单详情">
      <block slot="left">
        </image>
				<tui-icon
					name="arrowleft" :size="48" unit="rpx"
					color="#222229"
					margin="0" @click="handleToOrderList"
				></tui-icon>
      </block>
    </TuanPageHead>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped></style>