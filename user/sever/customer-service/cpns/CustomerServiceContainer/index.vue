<template>
	<tui-index-list :list-data="customerServiceInfo">
		<template #item="{ entity, index }">
			<tui-list-cell
				v-for="(item, subi) in entity" :key="subi" padding="16rpx 30rpx"
				@click="itemClick(index, subi, item)"
			>
				<view class="tui-list__item">
					<image class="tui-avatar" :src="item.avatar"></image>
					<view class="tui-name">{{ item.displayName }}</view>
				</view>
			</tui-list-cell>
		</template>
		<template #footer>
			<view v-if="customerServiceInfo[0].data.length > 0" class="tui-footer__total">
				{{ customerServiceInfo[0].data.length }}位客服
			</view>
		</template>
	</tui-index-list>
</template>

<script>
import {
	mapGetters
} from 'vuex'
import {
	USER_INFO
} from '../../../../../constant'
export default {
	components: {},
	data() {
		return {}
	},
	computed: {
		...mapGetters(['customerServiceInfo']),
	},
	methods: {
		itemClick(index, subi, item) {
			// console.log(index, subi, item)
			// console.log(USER_INFO,uni.getStorageSync(USER_INFO))
			this.$store.dispatch('customerService/createChat', {
				chatName: `${item.displayName}与${uni.getStorageSync(USER_INFO).nickName}的聊天`,
				friendId: item.friendId,
				friendUserType: 'ADMIN'
			})
		}
	}
}
</script>

<style lang="less" scoped>
	.tui-list__item {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-line-left::after {
		left: 15px !important;
		content: "";
		position: absolute;
		border-bottom: 1px solid #eaeef1;
		transform: scaleY(.5) translateZ(0);
		transform-origin: 0 100%;
		bottom: 0;
		right: 0;
		pointer-events: none;
	}

	.tui-avatar {
		width: 34px;
		height: 34px;
		border-radius: 4px;
		flex-shrink: 0;
		background-color: #ccc;
	}

	.tui-name {
		width: 90%;
		font-size: 16px;
		padding-left: 10px;
		padding-right: 20px;
		box-sizing: border-box;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-footer__total {
		width: 100%;
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 15px;
	}

	/deep/ .tui-index__letter {
		display: none;
	}
</style>
