<template>
	<view class="question-box">
		<JHeader title="我的问答" width="50" height="50"></JHeader>
		<view class="tabsbox">
			<tui-tabs
				style="width: 750rpx;padding: 0 0rpx 0 0rpx;overflow: hidden;" :slider-width="375" :padding="0"
				item-width="375rpx" selected-color="#C5AA7B" bold slider-bg-color="#ffffff"
				:tabs="questionTypeList"
				:current-tab="questionTypeFlag" @change="questionTypeActive"
			></tui-tabs>
		</view>
		<view v-if="questionTypeFlag == 0">
			<view v-if="problemInfo.data.length > 0">
				<view class="wid function-box">
					<view v-if="allCheckShow" class="finishbox" @click="finishClick">完成</view>
					<view v-else class="flex-row-plus editicon-box flex-items fs28" @click="editClick">
						<tui-icon name="edit" :size="40" unit="rpx" color="#333333"></tui-icon>
						<text class="mar-left-10">编辑</text>
					</view>
				</view>
				<view class="swipe-box">
					<tui-swipe-action
						v-for="(item, index) in problemInfo.data" :key="item.problemId" :params="{ index }"
						:open="item.show" :forbid="allCheckShow" :actions="options" :closable="false"
						@click="problemClick"
					>
						<template #content>
							<view class="flex-item itemBox">
								<view class="item wid flex-row-plus flex-items">
									<view v-show="allCheckShow">
										<tui-icon
											v-if="item.selected == 1" name="circle-fill" :size="40" unit="rpx"
											color="#c5aa7b"
											margin="30rpx" @click="problemItemSel(index, 0)"
										></tui-icon>
										<tui-icon
											v-else name="circle" :size="40" unit="rpx"
											color="#cccccc" margin="30rpx"
											@click="problemItemSel(index, 1)"
										></tui-icon>
									</view>
									<view
										class="title-wrap replynum-box"
										@click="go(`/another-tf/another-serve/qADetail/index?productId=${item.productId}&problemId=${item.problemId}`)"
									>
										<view class="flex-items">
											<label>问</label>
											<text
												class="title font-weight-bold fs28"
												style="overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
											>
												{{
													item.problem }}
											</text>
										</view>
										<view class="flex-items reply">
											<label>答</label>
											<text v-if="item.count > 0" class="font-color-666 fs24">{{ item.count }}条回复</text>
											<text v-else class="font-color-666 fs24">暂无回复</text>
										</view>
									</view>
								</view>
							</view>
						</template>
					</tui-swipe-action>
				</view>
				<view v-show="allCheckShow" class="allcheck-box flex-row-plus flex-sp-between flex-items">
					<view class="left">
						<tui-icon
							v-if="isAllProblemCheck" name="circle-fill" :size="40" unit="rpx"
							color="#c5aa7b"
							margin="0 30rpx 0 0" @click="allProblemSel(0)"
						></tui-icon>
						<tui-icon
							v-else name="circle" :size="40" unit="rpx"
							color="#cccccc" margin="0 30rpx 0 0"
							@click="allProblemSel(1)"
						></tui-icon>
						<text>全选</text>
					</view>
					<view class="right">
						<view class="btn-delete" @click="questionDel(0)">删除</view>
					</view>
				</view>
				<view v-if="allCheckShow" class="pad-bot-140"></view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!problemInfo.isEmpty && !problemInfo.data.length
						? 'loading' : !problemInfo.isEmpty && problemInfo.data.length && (problemInfo.data.length >= problemInfo.listTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="problemInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无提问内容</tui-no-data>
			</view>
		</view>
		<view v-if="questionTypeFlag == 1">
			<view v-if="answerInfo.data.length > 0">
				<view v-if="allCheckShow" class="finishbox" @click="finishClick">完成</view>
				<view v-else class="flex-row-plus editicon-box flex-items fs28" @click="editClick">
					<tui-icon name="edit" :size="40" unit="rpx" color="#333333"></tui-icon>
					<text class="mar-left-10">编辑</text>
				</view>
				<view class="swipe-box">
					<tui-swipe-action
						v-for="(item, index) in answerInfo.data" :key="item.answerId" :params="{ index }"
						:open="item.show" :forbid="allCheckShow" :actions="options" :closable="false"
						@click="answerClick"
					>
						<template #content>
							<view class="item itemBox flex-item">
								<view class="wid" style="border-radius: 50%;">
									<view class="flex-items-plus flex-row wid">
										<view v-show="allCheckShow">
											<tui-icon
												v-if="item.selected == 1" name="circle-fill" :size="40" unit="rpx"
												color="#c5aa7b"
												margin="0 30rpx 0 0" @click="answerItemSel(index, 0)"
											></tui-icon>
											<tui-icon
												v-else name="circle" :size="40" unit="rpx"
												color="#cccccc" margin="0 30rpx 0 0"
												@click="answerItemSel(index, 1)"
											></tui-icon>
										</view>
										<view
											class="title-wrap replynum-box wid"
											@click="go(`/another-tf/another-serve/qADetail/index?productId=${item.productId}&problemId=${item.problemId}`)"
										>
											<view class="flex-items">
												<label>问</label>
												<text
													class="title fs28 font-weight-bold"
													style="overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
												>
													{{
														item.problem }}
												</text>
											</view>
											<view class="replyBox">
												<view class="flex-items reply">
													<label>答</label>
													<text v-if="allCheckShow" style="width: 270rpx;" class="font-color-666 fs24 overflow">
														{{ item.name }} :
														{{ item.answer }}
													</text>
													<text v-else style="width: 360rpx;" class="font-color-999 fs24 overflow">
														{{ item.name }} :
														{{ item.answer }}
													</text>
												</view>
												<view class="qAarrow mar-top-30 flex-items">
													<text class="fs24 font-color-C5AA7B">共{{ item.count }}个回答</text>
													<tui-icon :size="24" color="#a7916a" name="arrowright" margin="0 0 0 15rpx"></tui-icon>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</template>
					</tui-swipe-action>
				</view>
				<view v-show="allCheckShow" class="allcheck-box flex-row-plus flex-sp-between flex-items">
					<view class="left">
						<tui-icon
							v-if="isAllAnswerCheck" name="circle-fill" :size="40" unit="rpx"
							color="#c5aa7b"
							margin="0 30rpx 0 0" @click="allAnswerSel(0)"
						></tui-icon>
						<tui-icon
							v-else name="circle" :size="40" unit="rpx"
							color="#cccccc" margin="0 30rpx 0 0"
							@click="allAnswerSel(1)"
						></tui-icon>
						<text>全选</text>
					</view>
					<view class="right">
						<view class="btn-delete" @click="questionDel(1)">删除</view>
					</view>
				</view>
				<view v-if="allCheckShow" class="pad-bot-140"></view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!answerInfo.isEmpty && !answerInfo.data.length
						? 'loading' : !answerInfo.isEmpty && answerInfo.data.length && (answerInfo.data.length >= answerInfo.listTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="answerInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无问答内容</tui-no-data>
			</view>
		</view>
		<!-- 删除确认弹窗 -->
		<tui-modal :show="delshow" :custom="true" :fadein="true">
			<view class="Put-box1">
				<view class="text-align fs34 fs-bold">
					删除回答？
				</view>
				<view class="mar-top-40 text-align">
					删除回答后无法恢复
				</view>
				<view class="flex-display flex-sp-between">
					<view class="btn submit" @click="delClick">继续删除</view>
				</view>
			</view>
			<view class="cancelDel" @click="cancelClick">
				<tui-icon name="circle-fill" :size="60" unit="rpx" color="#fafafa"></tui-icon>
			</view>
		</tui-modal>
	</view>
</template>

<script>
import { deleteProblemAnswerApi, deleteAnswerProblemApi, getProblemSeckillApi, getAnswerSeckillApi } from '../../../api/anotherTFInterface'
export default {
	name: 'QuestionList',
	data() {
		return {
			questionTypeList: [{
				name: '我的提问(0)'
			}, {
				name: '我的回答(0)'
			}],
			questionTypeFlag: 0,
			options: [ {
				name: '删除',
				color: '#fff',
				fontsize: 32,
				width: 80,
				background: '#C83732'
			} ],
			isAllProblemCheck: false,
			isAllAnswerCheck: false,
			allCheckShow: false,
			delshow: false,

			problemInfo: {
				query: {
					page: 1,
					pageSize: 10
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			answerInfo: {
				query: {
					page: 1,
					pageSize: 10
				},
				data: [],
				listTotal: 0, // 列表数据总数
				isEmpty: false // 列表是否为空
			},
			delType: 0
		}
	},
	onLoad() {
		this.getProblemList()
	},
	methods: {
		// 确定批量删除
		delClick() {
			this.delshow = false
			if (this.delType == 0) {
				const ids = []
				this.problemInfo.data.forEach((value, index) => {
					if (value.selected == 1) {
						ids.push(value.problemId)
					}
				})
				deleteProblemAnswerApi({
					ids
				}).then((res) => {
					this.$showToast(`删除成功`)
					setTimeout(() => {
						this.problemInfo.query.page = 1
						this.getProblemList()
					}, 1000)
				})
			} else if (this.delType == 1) {
				const ids = []
				this.answerInfo.data.forEach((value, index) => {
					if (value.selected == 1) {
						ids.push(value.answerId)
					}
				})
				deleteAnswerProblemApi({
					ids
				}).then((res) => {
					this.$showToast(`删除成功`)
					setTimeout(() => {
						this.answerInfo.query.page = 1
						this.getAnswerList()
					}, 1000)
				})
			}
		},
		// 全选
		allProblemSel(type) {
			this.isAllProblemCheck = !this.isAllProblemCheck
			this.problemInfo.data.forEach((value, index) => {
				this.problemInfo.data[index].selected = type
			})
		},
		allAnswerSel(type) {
			this.isAllAnswerCheck = !this.isAllAnswerCheck
			this.answerInfo.data.forEach((value, index) => {
				this.answerInfo.data[index].selected = type
			})
		},
		// 单个选中
		problemItemSel(index, number) {
			this.problemInfo.data[index].selected = number
			let proSelectNum = 0
			this.problemInfo.data.forEach((value, index) => {
				if (this.problemInfo.data[index].selected == 0) {
					this.isAllProblemCheck = false
				} else {
					proSelectNum++
				}
			})
			if (this.problemInfo.data.length == proSelectNum) {
				this.isAllProblemCheck = true
			}
		},
		answerItemSel(index, number) {
			this.answerInfo.data[index].selected = number
			let ansSelectNum = 0
			this.answerInfo.data.forEach((value, index) => {
				if (this.answerInfo.data[index].selected == 0) {
					this.isAllAnswerCheck = false
				} else {
					ansSelectNum++
				}
			})
			if (this.answerInfo.data.length == ansSelectNum) {
				this.isAllAnswerCheck = true
			}
		},
		// 删除提问
		problemClick(e) {
			if (e.index == 0) {
				const ids = this.problemInfo.data[e.item.index].problemId
				deleteProblemAnswerApi({
					ids: [ ids ]
				}).then((res) => {
					this.problemInfo.query.page = 1
					this.getProblemList()
					this.$showToast(`删除成功`)
				})
			}
		},
		// 删除回答
		answerClick(e) {
			if (e.index == 0) {
				const ids = this.answerInfo.data[e.item.index].answerId
				deleteAnswerProblemApi({
					ids: [ ids ]
				}).then((res) => {
					this.answerInfo.query.page = 1
					this.getAnswerList()
					this.$showToast(`删除成功`)
				})
			}
		},
		// 我的提问列表
		getProblemList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getProblemSeckillApi({ ...this.problemInfo.query })
				.then((res) => {
					this.questionTypeList[0].name = '我的提问(' + res.data.total + ')'
					this.problemInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.problemInfo.data.push(...res.data.list)
					} else {
						this.problemInfo.data = res.data.list
					}
					this.problemInfo.isEmpty = this.problemInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		// 我的回答列表
		getAnswerList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getAnswerSeckillApi({ ...this.answerInfo.query })
				.then((res) => {
					this.questionTypeList[1].name = '我的回答(' + res.data.total + ')'
					this.answerInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.answerInfo.data.push(...res.data.list)
					} else {
						this.answerInfo.data = res.data.list
					}
					this.answerInfo.isEmpty = this.answerInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		questionTypeActive(e) {
			this.questionTypeFlag = e.index
			// 缓存每个tab里的数据
			if (this.questionTypeFlag === 0) {
			} else if (this.questionTypeFlag === 1) {
				if (!this.answerInfo.isEmpty && !this.answerInfo.data.length) this.getAnswerList()
			}
			// 每点一个tab就重新进行对它的请求
			// if (this.questionTypeFlag === 0) {
			// 	this.problemInfo.query.page = 1
			// 	this.problemInfo.data = []
			// 	this.problemInfo.listTotal = 0
			// 	this.problemInfo.isEmpty = false
			// 	this.getApplyByStoreList()
			// } else if (this.questionTypeFlag === 1) {
			// 	this.answerInfo.query.page = 1
			// 	this.answerInfo.data = []
			// 	this.answerInfo.listTotal = 0
			// 	this.answerInfo.isEmpty = false
			// 	this.getApplyByUserList()
			// }
		},
		editClick() {
			this.allCheckShow = true
			this.problemInfo.data = this.problemInfo.data.map((item) => ({ ...item, show: false }))
			this.answerInfo.data = this.answerInfo.data.map((item) => ({ ...item, show: false }))
		},
		finishClick() {
			this.allCheckShow = false
		},
		cancelClick() {
			this.delshow = false
		},
		questionDel(num) {
			let quNum = 0
			let anNum = 0
			this.problemInfo.data.forEach((value, index) => {
				if (this.problemInfo.data[index].selected == 1) quNum++
			})
			this.answerInfo.data.forEach((value, index) => {
				if (this.answerInfo.data[index].selected == 1) anNum++
			})
			if (num == 0) {
				if (quNum < 1) {
					uni.showToast({
						title: '至少选择一条提问！',
						icon: 'none'
					})
				} else {
					this.delType = num
					this.delshow = true
				}
			} else if (anNum < 1) {
				uni.showToast({
					title: '至少选择一条回答！',
					icon: 'none'
				})
			} else {
				this.delType = num
				this.delshow = true
			}
		}
	},
	onReachBottom() {
		if (this.questionTypeFlag === 0) {
			if (this.problemInfo.data.length < this.problemInfo.listTotal) {
				++this.problemInfo.query.page
				this.getProblemList(true)
			}
		} else if (this.questionTypeFlag === 1) {
			if (this.answerInfo.data.length < this.answerInfo.listTotal) {
				++this.answerInfo.query.page
				this.getAnswerList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
page {
	background-color: #F7F7F7;
}

.question-box {
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.empty-box {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding-top: 40%;

		.tohome-box {
			color: #999999;
			margin-top: 50rpx;
		}

		.question-empty {
			width: 198rpx;
			height: 183rpx;
		}
	}

	.Put-box1 {
		.btn {
			text-align: center;
			margin-top: 40rpx;
			border: 1px solid #333333;
			height: 80rpx;
			line-height: 80rpx;
			width: 100%;
			color: #333333;
		}

		.submit {
			background-color: #333333;
			color: #FFEBC4;
		}
	}

	.cancelDel {
		position: absolute;
		bottom: -50px;
		left: 45%;
	}

	.function-box {
		background-color: #F7F7F7;
	}

	.tabsbox {
		margin-top: 4rpx;
		background-color: #FFFFFF;
	}

	.editicon-box {
		display: flex;
		justify-content: flex-end;
		position: relative;
		left: -30rpx;
		padding: 16rpx 0;
	}

	.finishbox {
		display: flex;
		justify-content: flex-end;
		position: relative;
		left: -30rpx;
		padding: 16rpx 0;
	}

	.swipe-box {
		width: 100%;
		padding: 0 24rpx;

		.itemBox {
			background: #FFFFFF;
		}

		.replynum-box {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 10rpx 0;
		}

		.item {
			display: flex;
			padding: 20rpx 20rpx 20rpx 40rpx;
			width: 700rpx;

			.qAarrow {
				image {
					width: 16rpx;
					height: 24rpx;
					margin-left: 10rpx;
				}
			}
		}

		label {
			width: 36rpx;
			height: 36rpx;
			display: block;
			line-height: 36rpx;
			text-align: center;
			background: #C83732;
			color: #FFFFFF;
			font-size: 20rpx;
			margin-right: 20rpx;
		}

		.reply {
			margin-top: 20rpx;

			label {
				background: #C5AA7B;
			}
		}

		.title {
			text-align: left;
			font-size: 28rpx;
			color: #606266;
		}
	}

	.allcheck-box {
		background-color: #FFFFFF;
		width: 100%;
		position: fixed;
		bottom: 0rpx;

		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 28rpx;
			color: #666;
		}

		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;
		}

		.btn-delete {
			width: 230rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #FFFFFF;
			background: #C83732;
		}
	}
}
</style>
