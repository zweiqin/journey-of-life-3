<template>
	<view class="orders-container">
		<!-- <view class="header">
			<JBack width="50" dark height="50" tabbar="/pages/user/user"></JBack>
			<h2>我的订单</h2>
			</view> -->

		<view class="navs">
			<tui-icon
				name="arrowleft" :size="48" unit="rpx"
				color="#000000"
				margin="0" @click="handleBack"
			></tui-icon>
			<scroll-view scroll-x="true">
				<view class="navs-list">
					<view
						v-for="item in orderTypes"
						:key="item.value"
						class="nav-item"
						:class="{ 'nav-item-active': currentStatus === item.value }"
						@click="handleSwitchStatus(item.value)"
					>
						{{ item.label }}
					</view>
				</view>
			</scroll-view>
		</view>

		<view v-if="orderList && orderList.length && currentStatus !== 5" class="order-list-wrapper">
			<view v-for="item in orderList" :key="item.id" class="goods-pane">
				<view class="order-no-status" @click="handleToViewOrderDetail(item)">
					<view class="order-no">订单号:{{ item.orderSn }}</view>
					<view class="order-status">{{ item.orderStatusText }}</view>
				</view>

				<view class="goods-list" @click="handleToViewOrderDetail(item)">
					<view v-for="goods in item.goodsList" :key="goods.id" class="goods-item">
						<image class="goods-img" :src="goods.picUrl" mode="" />

						<view class="info">
							<view class="name">{{ goods.goodsName }}</view>

							<view class="good-sp-pr">
								<view class="sp">{{ goods.specifications.join(',') }}</view>
								<view class="pr">￥{{ goods.price }}</view>
							</view>
						</view>

						<view>
							<view class="number" style="text-align: right; font-size: 28upx; color: #3a3629"> x {{ goods.number }} </view>
						</view>
					</view>
				</view>

				<view class="goods-ops">
					<view class="actual-price">
						共计：<text class="number">￥{{ item.actualPrice }}</text>
					</view>

					<view class="btns">
						<view v-for="btn in orderOpButtons" :key="btn.label">
							<button
								v-if="item.handleOption[btn.key]"
								:style="{
									background: btn.color
								}"
								class="uni-btn"
								@click="handleOpOrder(item, btn.key)"
							>
								{{ btn.label }}
							</button>
						</view>
					</view>
				</view>
			</view>

			<uni-load-more v-if="loadingStatus !== 'hidden'" style="background: #fff" :status="loadingStatus"></uni-load-more>
		</view>

		<view v-else class="order-list-wrapper">
			<view v-for="item in commentList" :key="item.id" class="goods-pane">
				<view class="order-no-status comment-wrapper">
					<view class="comment">
						<text class="comment-title">我的评论：</text>
						{{ item.content }}
					</view>
					<view v-if="item.commentGoods1" class="comment">
						<text class="comment-title">我的追评：</text>
						{{ item.commentGoods1 && item.commentGoods1.content }}
					</view>
					<view v-if="item.commentGoods2" class="comment">
						<text class="comment-title">商家回复：</text>
						{{ item.commentGoods2.content }}
					</view>
				</view>

				<view class="goods-list" @click="handleToViewOrderDetail(item)">
					<view class="goods-item" style="margin-bottom: 0">
						<image class="goods-img" :src="item.dtsTfGoods.picUrl" mode="" />

						<view class="info">
							<view class="name">{{ item.dtsTfGoods.name }}</view>

							<view class="good-sp-pr">
								<view class="pr">
									￥{{ item.dtsTfGoods.counterPrice }} <text v-if="item.dtsTfGoods.unit">/ {{ item.dtsTfGoods.unit }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="goods-ops" style="justify-content: flex-end">
					<view class="btns">
						<button v-if="!item.commentGoods1" class="uni-btn" @click="handleCommentAgain(item)">追加评价</button>
						<button v-else class="uni-btn" style="background-color: transparent; color: #3d3d3d">已追评</button>
					</view>
				</view>
			</view>
		</view>

		<JNoData v-if="loadingStatus === 'hidden' && !orderList.length" text="无购物记录" type="order-shop"></JNoData>
	</view>
</template>

<script>
import { orderTypes, orderOpButtons } from './config'
import { getOrderListApi, orderCancelApi, orderDeleteApi, receiveGoodsApi, getMyCommentListApi } from '../../api/order'
import { getUserId, payFn } from '../../utils'
export default {
	name: 'OrderForm',
	data() {
		return {
			orderTypes,
			currentStatus: 0,
			query: {
				page: 1,
				size: 10
			},
			orderOpButtons,
			totalPages: 0,
			orderList: [],
			loadingStatus: 'loading',
			commentList: []
		}
	},

	onLoad(options) {
		this.currentStatus = options.type[0] * 1 || 0
		this.getOrderList()
	},

	onShow() {
	},

	methods: {
		handleBack() {
			uni.switchTab({ url: '/pages/user/user' })
		},

		// 获取订单信息
		getOrderList(loadMore) {
			if (this.currentStatus == 5) {
				this.getCommentList()
				return
			}
			uni.showLoading()
			this.loadingStatus = 'loading'
			getOrderListApi({
				userId: getUserId(),
				showType: this.currentStatus,
				...this.query
			}).then(({ data }) => {
				if (loadMore) {
					this.orderList.push(...data.data)
				} else {
					this.orderList = data.data
				}
				this.totalPages = data.totalPages
				this.loadingStatus = 'hidden'
				uni.hideLoading()
			})
		},

		// 切换状态
		handleSwitchStatus(status) {
			this.currentStatus = status
			if (status === 5) {
				this.getCommentList()
			} else {
				this.query.page = 1
				this.query.size = 20
				this.getOrderList()
			}
		},

		async getCommentList() {
			const res = await getMyCommentListApi({
				userId: getUserId()
			})

			if (res.errno === 0) {
				this.commentList = res.data
			}
		},

		// 点击操作按钮
		async handleOpOrder(goods, key, currentGoods) {
			const mapMethods = {
				cancel: {
					text: '确定要取消当前订单吗?',
					api: orderCancelApi
				},
				delete: {
					text: '确定要删除当前订单吗?',
					api: orderDeleteApi
				},
				confirm: {
					text: '确定要收货吗',
					api: receiveGoodsApi
				}
			}

			const _this = this
			if (goods.handleOption[key] && ['cancel', 'delete', 'confirm'].includes(key)) {
				uni.showModal({
					title: '提示',
					content: mapMethods[key].text,
					success(res) {
						if (res.confirm) {
							mapMethods[key]
								.api({
									userId: getUserId(),
									orderId: goods.id
								})
								.then(() => {
									_this.query.page = 1
									_this.getOrderList()
								})
						}
					}
				})
			} else if (key === 'pay') {
				payFn(goods, 1, false)
			} else if (key === 'comment') {
				uni.navigateTo({
					url: '/user/orderForm/rate?id=' + goods.id + (currentGoods ? '&goodsId=' + currentGoods.id : '')
				})
			}
		},

		// 查看详情
		handleToViewOrderDetail(goods) {
			uni.navigateTo({
				url: '/user/orderForm/order-form-detail?id=' + goods.id
			})
		},

		// 去追评
		handleCommentAgain(goodsInfo) {
			uni.navigateTo({
				url: `/user/orderForm/additional-evaluation?goodsName=${goodsInfo.dtsTfGoods.name}&picUrl=${goodsInfo.dtsTfGoods.picUrl}&price=${goodsInfo.dtsTfGoods.counterPrice}&unit=${goodsInfo.dtsTfGoods.unit}&commentId=${goodsInfo.id}&goodsId=${goodsInfo.gid}&oid=${goodsInfo.oid}&ocid=${goodsInfo.ocid}`
			})
		}
	},

	onReachBottom() {
		if (this.orderList.length < this.query.size) {
			this.loadingStatus = 'noMore'
			return
		}

		if (this.query.page >= this.totalPages) {
			this.loadingStatus = 'noMore'
			return
		}

		this.query.page++
		this.getOrderList(true)
	}
}
</script>

<style lang="less" scoped>
.orders-container {
  font-size: 28upx;
  color: #3d3d3d;
  // padding: 60upx 0;

  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #000;
    padding: 0 32upx;
    box-sizing: border-box;

    h2 {
      font-weight: normal;
      font-size: 32upx;
      margin-top: -8upx;
    }
  }

  .navs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 34upx 0;
    padding-bottom: 20upx;
    padding: 0 32upx;
    box-sizing: border-box;

    .navs-list {
      display: flex;
      flex: 1;
      width: 642upx;
      margin-left: 20upx;
    }

    .back {
      width: 24upx;
      height: 48upx;
    }

    .nav-item {
      padding-top: 14upx;
      display: flex;
      justify-content: center;
      position: relative;
      width: 120upx;
      height: 56upx;
      transition: all 350ms;
      font-size: 32upx;
      color: #8f8d85;
      margin-right: 40upx;
      white-space: nowrap;

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 8upx;
        border-radius: 10upx;
        background-color: #ffc117;
        transition: all 350ms ease-in;
      }

      &.nav-item-active {
        color: #141000;
        font-weight: 500;

        // color: #ff8f1f;
        &::after {
          width: 40upx;
        }
      }
    }
  }

  .order-list-wrapper {
    background-color: #f6f6f6;
    padding-top: 10px;
    font-size: 24upx;

    .goods-pane {
      padding: 32upx;
      box-sizing: border-box;
      background-color: #fff;
      margin-bottom: 20upx;
      border-radius: 24upx;
      margin-left: 20upx;
      margin-right: 20upx;

      &:nth-of-type(:last-child) {
        margin-bottom: 0;
      }

      .order-no-status {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 16upx;
        // border-bottom: 1upx solid #dbdbdb;

        &.comment-wrapper {
          border-bottom: 1upx solid #e9e9e9;
          display: block;

          .comment {
            color: #141000;
            font-size: 28upx;
            font-weight: 500;
            margin-top: 20upx;

            .comment-title {
              color: #f40;
            }
          }
        }

        .order-no {
          font-size: 28upx;
          color: #605d52;
        }

        .order-status {
          color: #ffc117;
          font-size: 28upx;
        }
      }

      .goods-list {
        padding: 20upx 0;

        .goods-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30upx;

          .info {
            flex: 1;
            height: 100%;
            display: flex;
            justify-content: space-between;
            flex-direction: column;

            .name {
              font-size: 28upx;
              font-weight: 500;
              width: 300upx;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .good-sp-pr {
              margin-top: 12upx;

              .sp {
                line-height: 1.5;
                color: #8f8d85;
                font-size: 24upx;
                margin-bottom: 20upx;
              }

              .pr {
                font-size: 28upx;
              }
            }
          }

          .goods-img {
            width: 140upx;
            height: 140upx;
            object-fit: cover;
            margin-right: 20upx;
          }
        }
      }

      .goods-ops {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20upx;
        border-top: 1upx solid #f1f1f0;

        .actual-price {
          font-size: 28upx;
          font-weight: 500;
          color: #141000;

          .number {
            color: #141000;
          }
        }

        .btns {
          display: flex;
          align-items: center;

          .uni-btn {
            font-size: 24upx;
            color: #fff;
            line-height: 2.5;
            padding: 0 28upx;
            background-color: #f40;
            white-space: nowrap;
            margin-left: 20upx;
            border-radius: 32upx;
          }
        }
      }
    }

    .ev-btn {
      font-size: 24upx;
      color: #fff;
      padding: 18upx 28upx;
      background-color: rgb(132, 195, 65);
      white-space: nowrap;
      margin-left: 20upx;
      border-radius: 4upx;
      margin-top: 20upx;
    }
  }
}

/deep/ .uni-scroll-view ::-webkit-scrollbar {
  display: none;
}
</style>
