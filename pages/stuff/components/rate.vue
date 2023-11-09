<template>
	<view class="rate-container">
		<tui-icon
			v-for="item in 5" :key="item" :name="item <= rate ? 'star-fill' : 'star'"
			:color="item <= rate ? '#fa5151' : '#d8d8d8'" :size="size" unit="upx" :margin="`0 ${space}upx 0 0`"
			@click="handleClickStar(item)"
		></tui-icon>
	</view>
</template>

<script>
export default {
	props: {
		size: {
			type: Number,
			default: 30
		},

		rate: {
			type: Number,
			required: true
		},

		space: {
			type: Number,
			default: 14
		}
	},

	methods: {
		handleClickStar(rate) {
			this.$emit('change', rate)
		}
	}
}
</script>
