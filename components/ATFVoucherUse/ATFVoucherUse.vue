<template>
	<view :style="{ margin }">
		<view class="line-pane" :style="{ padding, borderRadius: radius }" @click="handleClickVoucher">
			<view style="font-size: 28rpx;" class="title">代金券（余额：{{ voucherNum }}）</view>
			<view style="display: flex;align-items: center;">
				<view style="color: #999999">
					<text v-if="voucherSelected && (voucherList.length === 1)">已选择</text>
					<text v-else>{{ voucherName }}</text>
				</view>
				<tui-icon name="arrowright" size="22" color="#979797" style="padding: 2rpx 0 2rpx 8rpx;"></tui-icon>
			</view>
		</view>
		<tui-drawer mode="bottom" :visible="drawerVisible" @close="drawerVisible = false">
			<view style="height: 55vh;padding: 20rpx;overflow-y: auto;">
				<view style="padding: 0 16rpx;font-size: 34rpx;color: #1e1e1e;text-align: right;">
					代金券余额：<text style="font-weight: bold;">{{ voucherNum }}</text>
				</view>
				<view v-if="voucherList && voucherList.length">
					<view style="text-align: right;">
						<tui-radio-group :value="String(voucherSelected)" @change="handleChangeVoucher">
							<tui-label>
								<tui-list-cell padding="16rpx">
									<view>
										<text style="padding-right: 10rpx;">不使用</text>
										<tui-radio value="0" color="#e98166" border-color="#999"></tui-radio>
									</view>
								</tui-list-cell>
							</tui-label>
						</tui-radio-group>
						<!-- <text>不使用</text>
							<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
							</tui-radio> -->
					</view>
					<view>
						<view v-for="item in voucherList" :key="item.id" class="item">
							<view
								style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx;margin: 20rpx;border: 1rpx solid #b1b0b0;border-radius: 12rpx;"
							>
								<view style="flex: 1;">
									<view style="display: flex;justify-content: space-between;">
										<text>{{ item.voucherName }}</text>
										<!-- <text style="padding-right: 50rpx;color: #b1b0b0;">{{ item.ratio }} : 1</text> -->
									</view>
									<view>{{ item.desc }}</view>
								</view>
								<tui-button
									type="warning" width="120rpx" height="50rpx" shape="circle"
									:disabled="item.id === voucherSelected" @click="handleChooseVoucher(item)"
								>
									选择
								</tui-button>
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<tui-no-data>暂无代金券</tui-no-data>
				</view>
			</view>
		</tui-drawer>
	</view>
</template>

<script>

export default {
	name: 'ATFVoucherUse',
	props: {
		margin: {
			type: String,
			default: '0'
		},
		padding: {
			type: String,
			default: '28rpx 20rpx'
		},
		radius: {
			type: String,
			default: '0'
		},
		voucherList: {
			type: Array,
			default: () => []
		},
		voucherNum: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			drawerVisible: false,
			voucherName: '暂无代金券可用',
			voucherSelected: 0
		}
	},
	watch: {
		voucherList: {
			handler(newVal) {
				if (newVal && newVal.length && !this.voucherSelected) {
					this.voucherName = '点击使用'
					this.voucherSelected = 0
				} else if (!newVal.length) {
					this.voucherName = '暂无代金券可用'
					this.voucherSelected = 0
				}
			},
			immediate: true,
			deep: true
		}
	},
	methods: {
		handleClickVoucher() {
			if (!this.voucherSelected && (this.voucherList.length === 1)) {
				this.voucherName = this.voucherList[0].voucherName
				this.voucherSelected = this.voucherList[0].id
				this.$emit('choose', { id: this.voucherSelected })
			} else {
				this.drawerVisible = true
			}
		},
		handleReset() {
			this.voucherName = '点击使用'
			this.voucherSelected = 0
			this.drawerVisible = false
		},
		handleChangeVoucher(e) {
			console.log(e)
			this.voucherName = '点击使用'
			if (this.voucherSelected !== Number(e.detail.value)) {
				this.voucherSelected = Number(e.detail.value)
				this.$emit('choose', { id: this.voucherSelected })
			}
			this.drawerVisible = false
		},
		handleChooseVoucher(item) {
			console.log(item)
			this.voucherName = item.voucherName
			this.voucherSelected = item.id
			this.$emit('choose', { id: this.voucherSelected })
			this.drawerVisible = false
		}
	}
}
</script>

<style lang="scss" scoped>
.line-pane {
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	// padding: 28rpx 20rpx;
	background-color: #fff;
}
</style>
