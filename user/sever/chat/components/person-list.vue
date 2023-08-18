<template>
	<view class="person-container">
		<view v-for="(entity, index) in customerServiceInfo" :key="index">
			<view>{{ entity.letter }}</view>
			<view>
				<view v-for="(item, subi) in entity.data" :key="subi" style="padding: 16rpx 30rpx;">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<image
								style="width: 48px;height: 48px;background-color: #ccc;border-radius: 6px;"
								:src="common.seamingImgUrl(item.avatar)"
							></image>
							<view style="padding-left: 16upx;">{{ `客服${subi + 1}号【${item.displayName}】` }}</view>
						</view>
						<tui-button type="warning" width="120rpx" height="54rpx" shape="circle" @click="handleOpPerson(item)">
							选择
						</tui-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	mapGetters
} from 'vuex'
export default {
	name: 'PersonList',
	data() {
		return {}
	},
	computed: {
		...mapGetters([ 'customerServiceInfo' ])
	},
	created() {
		this.$store.dispatch('customerService/getCustomerServiceList')
	},
	methods: {
		// 点击操作按钮
		handleOpPerson(person) {
			console.log(person)
			this.$emit('send', { meaning: 'person', msg: { friendId: person.friendId, displayName: person.displayName || '', avatar: person.avatar || '' } })
		}
	}
}
</script>

<style lang="less" scoped>
.person-container {
	box-sizing: border-box;
	padding: 40upx 10upx;
	height: 100%;
	overflow-y: auto;

}
</style>
