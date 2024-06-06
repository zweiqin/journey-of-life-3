<template>
	<view class="container">
		<JHeader title="银行卡" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view v-if="bankcardList && bankcardList.length" class="bankcardList">
			<view v-for="(item, index) in bankcardList" :key="index" class="addBankcard-content flex-row-plus">
				<view class="bankcard-detail" @click="itemTap(item.bankId)">
					<view class="banktype">
						<label></label>
					</view>
					<view class="cardnum">
						<label>{{ encodeCardNum(item.bankCard) }}</label>
					</view>
					<view class="bankname">
						<label>{{ item.bankName }}</label>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45upx;">
			<LoadingMore
				:status="!isEmpty && !bankcardList.length
					? 'loading' : !isEmpty && bankcardList.length && (bankcardList.length >= bankcardTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂未添加银行卡</tui-no-data>
		</view>

		<view class="addBankcard-box">
			<view class="addBankcard" @click="addBankcardClick">添加银行卡</view>
		</view>
	</view>
</template>

<script>
import { getAllBankcardListApi } from '../../../api/anotherTFInterface'
export default {
	name: 'Bankcard',
	data() {
		return {
			isEmpty: false,
			bankcardList: [],
			bankcardTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			}
		}
	},
	onShow() {
		this.getBankcardDataList()
	},
	methods: {
		addBankcardClick() {
			uni.navigateTo({
				url: '/another-tf/another-serve/bankcard/addBankcard'
			})
		},
		getBankcardDataList(isLoadmore) {
			uni.showLoading()
			getAllBankcardListApi(this.queryInfo).then((res) => {
				this.bankcardTotal = res.data.total
				if (isLoadmore) {
					this.bankcardList.push(...res.data.list)
				} else {
					this.bankcardList = res.data.list
				}
				this.isEmpty = this.bankcardList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		itemTap(id) {
			uni.navigateTo({
				url: `/another-tf/another-serve/bankcard/addBankcard?id=${id}`
			})
		},
		encodeCardNum(cardNum) {
			const length = cardNum.length
			if (length > 4) {
				return '**** **** **** ' + cardNum.substring(length - 4, length)
			}
		}
	},
	onReachBottom() {
		if (this.bankcardList.length < this.bankcardTotal) {
			++this.queryInfo.page
			this.getBankcardDataList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	.bankcardList {
		background-size: contain;
		display: block;
		padding-bottom: 15px;
		padding-top: 50rpx;
		min-height: 300rpx;
	}

	.addBankcard-box {
		position: fixed;
		bottom: 50upx;
		left: 30upx;

		.addBankcard {
			width: 690upx;
			height: 100upx;
			color: #FFEBC4;
			text-align: center;
			line-height: 100upx;
			background: #333333;
		}
	}

	.addBankcard-content {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 30upx;
		margin-bottom: 30rpx;

		.bankcard-detail {
			width: 100%;
			height: 334rpx;
			background-color: #ddc599;
			background-size: contain;
			border-radius: 18rpx;

			.bankname {
				color: #71521B;
				margin-left: 30rpx;
				margin-top: 7px;
			}

			.banktype {
				margin-left: 15px;
				margin-top: 2px;
				font-size: 8px;
				color: #9C9C9C;
			}

			.cardnum {
				color: #71521B;
				margin: 0 auto;
				margin-top: 120rpx;
				margin-left: 30rpx;
				font-size: 20px;
			}
		}
	}
}
</style>
