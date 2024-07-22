<template>
	<view class="user-community-card-container">
		<view v-if="showType === 'server'">
			<tui-list-view>
				<tui-list-cell background-color="transparent" padding="20rpx 18rpx 20rpx 32rpx">
					<view v-if="cardData.businessFieldsArr && cardData.businessFieldsArr.length">
						<view
							v-for="(section, count) in cardData.businessFieldsArr" :key="section.id"
							style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 4rpx;padding: 16rpx;border-radius: 16rpx;"
							:style="{ backgroundColor: cardData.isUse || !cardData.isLose ? '#f9a5a0' : '#f55243' }"
						>
							<view style="display: flex;justify-content: space-between;align-items: stretch;">
								<view
									style="position: relative;width: 110rpx;margin-left: -34rpx;padding: 40rpx;text-align: center;font-weight: bold;border-radius: 18rpx 0 0 18rpx;"
									:style="{
										background: cardData.isUse || !cardData.isLose ? 'linear-gradient(90deg, #ffeccd 0%, #ffe4b6 99%)' : 'linear-gradient(90deg, #FFDB9D 0%, #FFC157 99%)',
										color: cardData.isUse || !cardData.isLose ? '#efac88' : '#C82209'
									}"
								>
									<view
										style="position: absolute;top: 50%;left: 0;transform: translateY(-50%);width: 28rpx;height: 28rpx;background-color: #fdfdfd;clip-path: ellipse(50% 50% at 0% 50%)"
									>
									</view>
									<view style="margin-left: -14rpx;">
										<text style="font-size: 28rpx;">￥</text>
										<text style="font-size: 48rpx;">{{ section.serverPrice || '--' }}</text>
									</view>
								</view>
								<view
									style="width: 40rpx;margin-left: -20rpx;border-radius: 50%;"
									:style="{ backgroundColor: cardData.isUse || !cardData.isLose ? '#ffe4b6' : '#ffc157' }"
								></view>
							</view>
							<view style="flex: 1;width: 0;margin-left: 30rpx;color: #FFEDD2;">
								<view style="font-size: 32rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
									{{ section.serverInfoName || '--' }}
								</view>
								<view
									v-if="section.serverIntroduction"
									style="margin-top: 10rpx;font-size: 28rpx;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
								>
									{{ section.serverIntroduction || '--' }}
								</view>
							</view>
							<view class="middle-btn">
								<tui-button
									:type="cardData.isUse || !cardData.isLose ? 'warning' : 'white'" width="108rpx"
									height="52rpx" margin="0 0 0 20rpx" :size="26" :disabled="cardData.isUse || !cardData.isLose"
									@click="go(`/community-center/community-detail?id=${section.id}&serverNameThree=${section.serverInfoName}&serverImageUrl=${section.serverImageUrl}&cardId=${cardData.cardId}`)"
								>
									去使用
								</tui-button>
							</view>
						</view>
						<view
							style="display: flex;justify-content: space-between;margin-top: 10rpx;font-size: 26rpx;color: #b1b1b1;"
						>
							<view>有效天数：{{ cardData.cardEffectiveTime || '--' }}</view>
							<view v-if="!cardData.isLose">已失效</view>
						</view>
					</view>
					<view v-else style="padding-top: 18rpx;text-align: center;">
						该卡包暂无服务！
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
		<view v-else-if="showType === 'message'">
			<view style="padding: 26rpx 22rpx;font-size: 30rpx;background-color: #ffe7c2;border-radius: 28rpx;">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<!-- <view>ID：{{ cardData.cardId }}</view> -->
					<view style="font-size: 34rpx;font-weight: bold;">
						<text v-if="cardData.isUse === 0">未使用</text>
						<text v-else-if="cardData.isUse === 1">已使用</text>
						<text v-else>--</text>
					</view>
					<view>关联配置ID：{{ cardData.activityId || '--' }}</view>
				</view>
				<view style="margin-top: 10rpx;">
					<view>
						卡券使用范围：
						<text v-if="cardData.cardRange === 1">指定</text>
						<text v-else-if="cardData.cardRange === 2">全部</text>
						<text v-else>--</text>
					</view>
					<view v-if="(cardData.cardRange === 1) && cardData.cardJson" style="word-break: break-all;">
						指定区域（行政编码）：{{
							cardData.cardJson || '--' }}
					</view>
				</view>
				<view v-if="cardData.businessFields" style="margin-top: 10rpx;color: #68686b;">
					获取时间：{{ cardData.createTime || '--' }}
				</view>
			</view>
		</view>
		<!-- <view v-else-if="showType === 'message'">
			<tui-list-cell
			background-color="transparent"
			padding="0 0 32rpx" :color="cardData.isLose ? '#333333' : '#888888'"
			>
			<view style="padding: 26rpx 22rpx;background-color: #ffe7c2;border-radius: 28rpx;">
			<view style="display: flex;justify-content: space-between;align-items: center;">
			<view>ID：{{ cardData.cardId }}</view>
			<view style="font-size: 34rpx;font-weight: bold;">
			<text v-if="cardData.isUse === 0">未使用</text>
			<text v-else-if="cardData.isUse === 1">已使用</text>
			<text v-else>--</text>
			</view>
			<view>关联配置ID：{{ cardData.activityId || '--' }}</view>
			</view>
			<view v-if="cardData.businessFieldsArr && cardData.businessFieldsArr.length" style="margin-top: 10rpx;">
			<view style="padding: 0 14rpx;font-size: 32rpx;font-weight: bold;">● 绑定服务列表：</view>
			<view
			v-for="(section, count) in cardData.businessFieldsArr" :key="section.id"
			style="display: flex;justify-content: space-between;align-items: center;margin-top: 4rpx;padding: 16rpx;background-color: #ffffff;border-radius: 16rpx;"
			>
			<view style="flex: 1;">
			<view>
			社区业务内容：{{ section.serverInfoName || '--' }}（{{ section.id || '--' }}）
			</view>
			<view v-if="section.serverIntroduction">
			介绍：{{ section.serverInfoName || '--' }}
			</view>
			</view>
			<view style="margin: 0 0 0 20rpx;text-align: center;">
			<view style="font-weight: bold;color: #e00d32;">￥{{ section.serverPrice || '--' }}</view>
			<view>
			<tui-button
			v-if="cardData.isLose" type="warning" width="148rpx" height="52rpx"
			margin="10rpx 0 0"
			shape="circle"
			@click="go(`/community-center/community-detail?id=${section.id}&serverNameThree=${section.serverInfoName}&serverImageUrl=${section.serverImageUrl}&cardId=${cardData.cardId}`)"
			>
			去下单
			</tui-button>
			</view>
			</view>
			</view>
			</view>
			<view style="margin-top: 10rpx;">
			<view>
			卡券使用范围：
			<text v-if="cardData.cardRange === 1">指定</text>
			<text v-else-if="cardData.cardRange === 2">全部</text>
			<text v-else>--</text>
			</view>
			<view v-if="(cardData.cardRange === 1) && cardData.cardJson" style="word-break: break-all;">
			指定区域（行政编码）：{{
			cardData.cardJson || '--' }}
			</view>
			</view>
			<view style="display: flex;justify-content: space-between;margin-top: 10rpx;">
			<view>有效天数：{{ cardData.cardEffectiveTime || '--' }}</view>
			<view v-if="!cardData.isLose">已失效</view>
			</view>
			<view v-if="cardData.businessFields" style="margin-top: 10rpx;color: #68686b;">
			获取时间：{{ cardData.createTime || '--' }}
			</view>
			</view>
			</tui-list-cell>
			</view> -->
	</view>
</template>

<script>
export default {
	name: 'UserCommunityCard',
	props: {
		showType: {
			type: String,
			default: 'server'
		},
		cardData: {
			type: Object,
			required: true
		}
	},

	methods: {
	}
}
</script>

<style lang="less" scoped>
.user-community-card-container {
	.middle-btn {
		/deep/ .tui-btn-white {
			color: #D12727 !important;
			background: #ffedd2 !important;
			border-radius: 10rpx;
		}
		/deep/ .tui-btn-warning {
			color: #f2b29f !important;
			background: #ffedd2 !important;
			border-radius: 10rpx;
		}
	}
}
</style>
