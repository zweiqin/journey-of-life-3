<template>
	<view class="shop-car-list">
		<CustomerServiceHeader></CustomerServiceHeader>
		<CustomerServiceContainer></CustomerServiceContainer>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomerServiceHeader from './cpns/CustomerServiceHeader.vue'
import CustomerServiceContainer from './cpns/CustomerServiceContainer/index.vue'
export default {
	name: 'CustomerService',
	components: {
		CustomerServiceHeader,
		CustomerServiceContainer
	},
	onLoad() {
		this.$store.dispatch('customerService/getCustomerServiceList')
	},

	computed: {
	}
}
</script>

<style lang="scss" scoped>
.shop-car-list {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
