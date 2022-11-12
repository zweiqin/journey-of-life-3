<template>
	<view class="pre-order"><OrderPanel ref="orderPaneRef"></OrderPanel></view>
</template>

<script>
import OrderPanel from '../../components/order-panel';
export default {
	components: {
		OrderPanel
	},

	onShow() {
		this.$nextTick(() => {
			this.$refs.orderPaneRef.setChooseAddress();
		});
	}
};
</script>

<style lang="less" scoped></style>
