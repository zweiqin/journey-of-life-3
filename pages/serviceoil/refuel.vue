<template>
	<view>
		<view>
			<!-- #ifdef APP -->
			<web-view :src="url"></web-view>
			<!-- #endif -->
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			url: ''
		}
	},
	onLoad(val) {
		console.log('val',val);
		this.url = val.url + "&token=" + val.token + "&timestamp=" + val.timestamp + "&sign=" + val.sign;

		// #ifdef H5
		location.href = this.url
		// #endif
	},
	methods: {
	}
}
</script>
<style>
.fullcrseen {
	height: 100vh;
}
</style>