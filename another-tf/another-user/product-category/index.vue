<template>
	<view class="product-category-container">
		<JHeader title="商品类别" width="50" height="50"></JHeader>
		<view v-if="productCategoryList && productCategoryList.length">
			<view v-for="(item, index) in productCategoryList" :key="index" style="margin-bottom: 20upx;">
				<tui-collapse
					:index="index" :current="currentIndexCategory" hd-bg-color="#ffffff"
					@click="changeCurrentCategory"
				>
					<template #title>
						<tui-list-cell background-color="transparent">
							<view style="display: flex;align-items: center;padding-right: 54rpx;">
								<view style="flex: 1;display: flex;align-items: center;margin-right: 10rpx;">
									<view>
										<image
											style="width: 80rpx;height: 80rpx;margin-right: 24upx;border-radius: 6rpx" mode="aspectFit"
											:src="common.seamingImgUrl(item.categoryImg) || require('../../../static/images/new-user/default-user-avatar.png')"
										>
										</image>
									</view>
									<view
										style="flex: 1;width: 0;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
									>
										{{ item.categoryName }}
									</view>
								</view>
								<view style="display: flex;align-items: center;">
									<tui-button
										type="warning" :size="30" width="98rpx" height="52rpx"
										shape="circle" margin="0 20rpx 0 0"
										@click="go('')"
									>
										编辑
									</tui-button>
									<tui-button
										type="danger" :size="30" width="98rpx" height="52rpx"
										shape="circle" margin="0"
										@click="handleDeleteCategory(item)"
									>
										删除
									</tui-button>
								</view>
							</view>
						</tui-list-cell>
					</template>
					<template #content>

						<view style="margin: 0 24upx;background-color: #ebebea;">
							<view v-if="item.childs && item.childs.length">
								<block v-for="(part, count) in item.childs" :key="count">
									<tui-collapse :index="count" :current="currentIndex" hd-bg-color="transparent" @click="changeCurrent">
										<template #title>
											<tui-list-cell background-color="transparent">
												<view style="display: flex;align-items: center;padding-right: 54rpx;">
													<view style="flex: 1;display: flex;align-items: center;margin-right: 10rpx;">
														<view>
															<image
																style="width: 80rpx;height: 80rpx;margin-right: 24upx;border-radius: 6rpx" mode="aspectFit"
																:src="common.seamingImgUrl(part.categoryImg) || require('../../../static/images/new-user/default-user-avatar.png')"
															>
															</image>
														</view>
														<view
															style="flex: 1;width: 0;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
														>
															{{ part.categoryName }}
														</view>
													</view>
													<view style="display: flex;align-items: center;">
														<tui-button
															type="warning" :size="30" width="98rpx" height="52rpx"
															shape="circle" margin="0 20rpx 0 0"
															@click="go('')"
														>
															编辑
														</tui-button>
														<tui-button
															type="danger" :size="30" width="98rpx" height="52rpx"
															shape="circle" margin="0"
															@click="handleDeleteCategory(part)"
														>
															删除
														</tui-button>
													</view>
												</view>
											</tui-list-cell>
										</template>
										<template #content>
											<view style="margin: 0 16upx;background-color: #e1e2e0;">
												<view v-if="part.childs && part.childs.length">
													<tui-list-view>
														<tui-list-cell
															v-for="(section, number) in part.childs" :key="number"
															background-color="transparent"
														>
															<view style="display: flex;align-items: center;padding-right: 54rpx;">
																<view style="flex: 1;display: flex;align-items: center;margin-right: 10rpx;">
																	<view>
																		<image
																			style="width: 80rpx;height: 80rpx;margin-right: 24upx;border-radius: 6rpx" mode="aspectFit"
																			:src="common.seamingImgUrl(section.categoryImg) || require('../../../static/images/new-user/default-user-avatar.png')"
																		>
																		</image>
																	</view>
																	<view
																		style="flex: 1;width: 0;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
																	>
																		{{ section.categoryName }}
																	</view>
																</view>
																<view style="display: flex;align-items: center;">
																	<tui-button
																		type="warning" :size="30" width="98rpx" height="52rpx"
																		shape="circle" margin="0 20rpx 0 0"
																		@click="go('')"
																	>
																		编辑
																	</tui-button>
																	<tui-button
																		type="danger" :size="30" width="98rpx" height="52rpx"
																		shape="circle" margin="0"
																		@click="handleDeleteCategory(section)"
																	>
																		删除
																	</tui-button>
																</view>
															</view>
														</tui-list-cell>
													</tui-list-view>
												</view>
												<view v-else style="padding: 16upx 0;text-align: center;">该二级分类暂无子级！</view>
											</view>
										</template>
									</tui-collapse>
								</block>
							</view>
							<view v-else style="padding: 28upx 0;text-align: center;">该一级分类暂无子级！</view>
						</view>

					</template>
				</tui-collapse>
			</view>
		</view>
		<view style="padding-bottom: 45upx;">
			<LoadingMore
				:status="!isEmpty && !productCategoryList.length
					? 'loading' : !isEmpty && productCategoryList.length && (productCategoryList.length >= productCategoryTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无数据</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getAllPlatformProductClassifyApi, getByIdPlatformProductClassifyApi, addPlatformProductClassifyApi, updatePlatformProductClassifyApi, deletePlatformProductClassifyApi } from '../../../api/anotherTFInterface'

export default {
	name: 'ProductCategory',
	data() {
		return {
			isEmpty: false,
			productCategoryList: [],
			productCategoryTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			},
			currentIndexCategory: 0,
			currentIndex: -1
		}
	},
	onLoad() {
		this.getShopGoodsTemplate()
	},

	methods: {
		getShopGoodsTemplate(isLoadmore) {
			uni.showLoading()
			getAllPlatformProductClassifyApi(this.queryInfo)
				.then((res) => {
					this.productCategoryTotal = res.data.page.total
					if (isLoadmore) {
						this.productCategoryList.push(...res.data.page.list)
					} else {
						this.productCategoryList = res.data.page.list
					}
					this.isEmpty = this.productCategoryList.length === 0
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		changeCurrentCategory(e) {
			this.currentIndexCategory = this.currentIndexCategory == e.index ? -1 : e.index
			this.currentIndex = -1
		},
		changeCurrent(e) {
			this.currentIndex = this.currentIndex == e.index ? -1 : e.index
		},
		handleDeleteCategory(item) {

		}
	},
	onReachBottom() {
		if (this.productCategoryList.length < this.productCategoryTotal) {
			++this.queryInfo.page
			this.getShopGoodsTemplate(true)
		}
	}
}
</script>

<style lang="less" scoped>
.product-category-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
