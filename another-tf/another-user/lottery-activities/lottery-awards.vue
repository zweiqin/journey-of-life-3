<template>
	<view class="lottery-awards-container">
		<JHeader title="抽奖奖项" width="50" height="50"></JHeader>
		<view v-if="lotteryItemRecordList.length > 0" style="padding: 20rpx 10rpx 0;">
			<view
				v-for="(item, index) in lotteryItemRecordList" :key="item.id"
				style="padding: 14rpx;margin-bottom: 38rpx;background-color: #fafafa;"
			>
				<view style="font-size: 30rpx;font-weight: bold;">奖品：{{ item.prizeName || '--' }}（ID：{{ item.itemId || '--' }}）</view>
				<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 6rpx;font-size: 26rpx;color: #222229;">
					<view>IP：{{ item.accountIp || '--' }}</view>
					<view>用户ID：{{ item.buyerUserId || '--' }}</view>
				</view>
				<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">中奖时间：{{ item.creatTime || '--' }}</view>
			</view>
			<!-- <el-form-item label="ID" prop="id">
				{{ formData.id || '--' }}
				</el-form-item>
				<el-form-item label="关联抽奖活动ID" prop="lotteryId">
				<div style="display: flex;align-items: center;">
				<span>{{ formData.lotteryId || '--' }}</span>
				<el-button
				v-if="formData.lotteryId"
				style="margin-left: 14px;" type="warning" size="mini"
				@click="$refs.DetailModal1 && $refs.DetailModal1.handleOpen({ id: formData.lotteryId })"
				>
				详情
				</el-button>
				</div>
				</el-form-item>
				<el-form-item label="奖项名称" prop="itemName">
				{{ formData.itemName || '--' }}
				</el-form-item>
				<el-form-item label="奖项等级" prop="level">
				{{ typeof formData.level === 'number' ? formData.level : '--' }}
				</el-form-item>
				<el-form-item label="奖项概率" prop="percent">
				{{ typeof formData.percent === 'number' ? formData.percent : '--' }}
				</el-form-item>
				<el-form-item label="关联抽奖奖品ID" prop="prizeId">
				<div style="display: flex;align-items: center;">
				<span>{{ formData.prizeId || '--' }}</span>
				<el-button
				v-if="formData.prizeId"
				style="margin-left: 14px;" type="warning" size="mini"
				@click="$refs.DetailModal2 && $refs.DetailModal2.handleOpen({ id: formData.prizeId })"
				>
				详情
				</el-button>
				</div>
				</el-form-item>
				<el-form-item label="是否默认" prop="defaultItem">
				<span v-if="formData.defaultItem === 0">不是</span>
				<span v-else-if="formData.defaultItem === 1">是</span>
				<span v-else>--</span>
				</el-form-item>
				<el-form-item label="创建时间" prop="createTime">
				{{ formData.createTime || '--' }}
				</el-form-item> -->
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
			<view v-if="!isLoading && !lotteryItemRecordList.length">
				<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无奖项～</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { getLotteryItemRecordApi } from '../../../api/anotherTFInterface'
export default {
	name: 'LotteryRecord',
	data() {
		return {
			lotteryItemRecordList: [],
			isLoading: true
		}
	},
	onLoad() {
		this.getLotteryItemRecordList()
	},
	methods: {
		getLotteryItemRecordList() {
			uni.showLoading()
			this.isLoading = true
			getLotteryItemRecordApi({})
				.then((res) => {
					this.lotteryItemRecordList = res.data
					uni.hideLoading()
					this.isLoading = false
				})
				.catch((e) => {
					uni.hideLoading()
					this.isLoading = false
				})
		}
	}
}
</script>

<style lang="less" scoped>
.lottery-awards-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}
}
</style>
