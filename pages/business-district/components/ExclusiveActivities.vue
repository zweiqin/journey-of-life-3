<template>
	<view class="exclusive-activities-container" :style="{ margin }">
		<view @click="go('/another-tf/another-user/combination-activities/index?configType=6')">
			<image
				:src="common.seamingImgUrl('1720493830042-shangquanzhuanshuhuodong.png')" style="width: 100%;"
				mode="widthFix"
			></image>
		</view>
	</view>
</template>

<script>

export default {
	name: 'ExclusiveActivities',
	props: {
		margin: {
			type: String,
			default: '0'
		}
	},
	data() {
		return {
		}
	},
	created() {
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.exclusive-activities-container {
	width: 100%;
	box-sizing: border-box;
}
</style>
