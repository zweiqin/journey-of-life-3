<template>
	<view class="user-detail-info-container">
		<view v-if="data.buyerUserId" style="padding: 0rpx 34rpx;">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="flex: 1;display: flex;align-items: center;">
					<image
						style="width: 80rpx;height: 80rpx;border-radius: 50%;" mode="aspectFit"
						:src="common.seamingImgUrl(data.headImage) || require('../../static/images/new-user/default-user-avatar.png')"
					>
					</image>
					<text style="margin-left: 34rpx;font-size: 42rpx;">
						{{ data.nickName || '--' }}
					</text>
				</view>
				<view style="font-size: 26rpx;color: #666666;">（ID：{{ data.buyerUserId }}）</view>
			</view>

			<view style="padding: 20rpx 0 0;">
				<view style="display: flex;justify-content: space-between;font-size: 36rpx;font-weight: bold;">
					<view v-if="data.ifBlack">已被加入黑名单</view>
					<view v-if="!data.state">已禁用</view>
				</view>
				<view style="display: flex;justify-content: space-between;">
					<view v-if="data.ifFirst" style="font-size: 36rpx;font-weight: bold;color: #1b6ef3;">
						首次登录
					</view>
					<view>
						<text>角色：</text>
						<text v-if="data.roleId === 1">加盟商</text>
						<text v-else-if="data.roleId === 2">代理商</text>
						<text v-else>--</text>
					</view>
				</view>
				<view v-if="data.region">所在区域：{{ data.region }}</view>
				<view style="display: flex;justify-content: space-between;">
					<view v-if="data.wechatOpenId">微信openID：{{ data.wechatOpenId }}</view>
					<view>微信昵称：{{ data.wechatName || '--' }}</view>
				</view>
				<view v-if="data.aliUserId">支付宝小程序用户ID：{{ data.orderPrice }}</view>
				<view v-if="data.phone" style="display: flex;justify-content: flex-end;">
					<BeeMakePhone :phone="data.phone">
						<view style="display: flex;align-items: center;">
							<tui-icon name="voipphone" :size="34" unit="rpx" color="#e02208" margin="0"></tui-icon>
							<text style="color: #e02208;">{{ data.phone }}</text>
						</view>
					</BeeMakePhone>
				</view>
				<view
					style="margin-top: 12rpx;padding-top: 12rpx;border-top: 2rpx solid #dddddd;font-size: 26rpx;color: #999999;"
				>
					<view style="display: flex;justify-content: space-between;">
						<text>注册时间：</text>
						<text>{{ data.createTime }}</text>
					</view>
					<view style="display: flex;justify-content: space-between;">
						<view>积分：{{ data.credit || 0 }}</view>
						<view>成长值：{{ data.growth || 0 }}</view>
					</view>
					<view>
						<view style="display: flex;justify-content: space-between;">
							<view v-if="data.memberLevelId">会员等级ID：{{ data.memberLevelId }}</view>
							<view>会员等级名称：{{ data.memberLevelName || '--' }}</view>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<view v-if="data.nextLevelGrowth">下一级会员需要的成长值：{{ data.nextLevelGrowth }}</view>
							<view>下一级名称：{{ data.nextLevelName || '--' }}</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>

export default {
	name: 'ATFUserDetailInfo',
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
		}
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.user-detail-info-container {
	box-sizing: border-box;
}
</style>
