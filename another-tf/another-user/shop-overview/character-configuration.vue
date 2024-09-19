<template>
	<view class="character-configuration-container">
		<JHeader title="字段配置" width="50" height="50"></JHeader>
		<view style="display: flex;justify-content: space-between;align-items: flex-end;margin: 14rpx auto;">
			<tui-button
				type="blue" bold shape="circle" width="70%"
				@click="go('/another-tf/another-user/shop-overview/character-configuration-form')"
			>
				新增字段
			</tui-button>
			<tui-button
				type="black" plain bold shape="circle"
				width="fit-content" height="52rpx" style="padding: 0 20rpx;"
				@click="handleChangeListShow"
			>
				<text v-if="isShowAll">取消全部</text>
				<text v-else>查看全部</text>
			</tui-button>
		</view>

		<view v-if="!isShowAll">
			<view v-if="characterInfo.data && characterInfo.data.length">
				<view v-for="(item, index) in characterInfo.data" :key="index" style="padding-bottom: 35rpx;">
					<tui-card
						:title="{ text: `${item.fieldName}` }" :tag="{ text: `ID：${item.id || '--'}` }"
						style="margin: 0;"
					>
						<template #body>
							<view style="padding: 10rpx 32rpx;">
								<view>支出费用：{{ item.fieldPrice }}</view>
								<view>创建时间：{{ item.createTime }}</view>
							</view>
						</template>
						<template #footer>
							<view style="display: flex;justify-content: flex-end;align-items: center;padding: 0 20rpx 20rpx;">
								<tui-button
									type="warning" width="120rpx" height="50rpx"
									margin="0 20rpx 0" shape="circle"
									@click="go(`/another-tf/another-user/shop-overview/character-configuration-form?id=${item.id}`)"
								>
									编辑
								</tui-button>
								<tui-button
									type="danger" width="120rpx" height="50rpx"
									margin="0" shape="circle"
									@click="handleCharacterDelete(item)"
								>
									删除
								</tui-button>
							</view>
						</template>
					</tui-card>
				</view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!characterInfo.isEmpty && !characterInfo.data.length
						? 'loading' : !characterInfo.isEmpty && characterInfo.data.length && (characterInfo.data.length >= characterInfo.listTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="characterInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无字段内容~</tui-no-data>
			</view>
		</view>
		<view v-else>
			<view v-if="allCharacterList && allCharacterList.length">
				<view v-for="(item, index) in allCharacterList" :key="index" style="padding-bottom: 35rpx;">
					<tui-card
						:title="{ text: `${item.fieldName}` }" :tag="{ text: `ID：${item.id || '--'}` }"
						style="margin: 0;"
					>
						<template #body>
							<view style="padding: 10rpx 32rpx;">
								<view>支出费用：{{ item.fieldPrice }}</view>
								<view>创建时间：{{ item.createTime }}</view>
							</view>
						</template>
						<template #footer>
							<view style="display: flex;justify-content: flex-end;align-items: center;padding: 0 20rpx 20rpx;">
								<tui-button
									type="warning" width="120rpx" height="50rpx"
									margin="0 20rpx 0" shape="circle"
									@click="go(`/another-tf/another-user/shop-overview/character-configuration-form?id=${item.id}`)"
								>
									编辑
								</tui-button>
								<tui-button
									type="danger" width="120rpx" height="50rpx"
									margin="0" shape="circle"
									@click="handleCharacterDelete(item)"
								>
									删除
								</tui-button>
							</view>
						</template>
					</tui-card>
				</view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
				<view v-if="!isLoading && !allCharacterList.length">
					<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无字段内容~</tui-no-data>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getShopCostFieldPageAllApi, getAllShopCostFieldApi, deleteShopCostFieldApi } from '../../../api/anotherTFInterface'

export default {
	name: 'CharacterConfiguration',
	data() {
		return {
			isShowAll: false,
			characterInfo: {
				query: {
					page: 1,
					pageSize: 10
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			allCharacterList: [],
			isLoading: true
		}
	},
	onShow() {
		this.$store.dispatch('auth/unifiedProcessingShopAction', {
			cb: () => {
				this.getCharacterPageList()
			}
		})
	},

	methods: {
		getCharacterPageList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getShopCostFieldPageAllApi({ ...this.characterInfo.query })
				.then((res) => {
					this.characterInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.characterInfo.data.push(...res.data.list)
					} else {
						this.characterInfo.data = res.data.list
					}
					this.characterInfo.isEmpty = this.characterInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getCharacterAllList() {
			uni.showLoading()
			this.isLoading = true
			getAllShopCostFieldApi({})
				.then((res) => {
					this.allCharacterList = res.data
					uni.hideLoading()
					this.isLoading = false
				})
				.catch((e) => {
					uni.hideLoading()
					this.isLoading = false
				})
		},
		handleChangeListShow() {
			this.isShowAll = !this.isShowAll
			if (!this.isShowAll) {
			} else if (this.isLoading && !this.allCharacterList.length) this.getCharacterAllList()
		},

		handleCharacterDelete(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除当前字段？',
				success: (res) => {
					if (res.confirm) {
						deleteShopCostFieldApi({
							fieldId: item.id
						}).then((res) => {
							this.$showToast('删除成功')
							setTimeout(() => {
								this.characterInfo.query.page = 1
								this.getCharacterPageList()
							}, 2000)
						})
					}
				}
			})
		}
	},
	onReachBottom() {
		if (!this.isShowAll) {
			if (this.characterInfo.data.length < this.characterInfo.listTotal) {
				++this.characterInfo.query.page
				this.getCharacterPageList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.character-configuration-container {
	min-height: 100vh;
	padding: 0 24rpx 0;
	box-sizing: border-box;
	background-color: #eeeeee;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 10rpx;
		background-color: #f5f5f5;
	}
}
</style>

