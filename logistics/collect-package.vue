<template>
  <view class="collect-package">
    <view class="header">
			<tui-icon
				name="arrowleft" :size="32" unit="rpx"
				color="#ffffff"
				margin="0" @click="back"
			></tui-icon>
      <view class="title">查件</view>
    </view>

    <view class="main">
      <view class="search">
        <input class="search-input" type="text" placeholder="发货人姓名/订单号/收货人姓名/收货人手机号" @input="search" />
				<view class="img">
					<tui-icon
						name="search" :size="32" unit="rpx"
						color="#767676"
						margin="0"
					></tui-icon>
				</view>
      </view>

      <view class="order-list">
        <view class="navs">
          <view v-for="item in collectPages" :key="item.label" @click="switchTab(item.value)" :class="{ active: query.status === item.value }" class="nav-item">
            {{ item.label }}
          </view>
        </view>

        <view v-if="list && list.length" class="orders">
          <view v-for="item in list" :key="item.id" class="order-wrapper">
            <view class="order-item" @click="toDetail(item.orderNo)">
              <view class="info hidden">
                <view class="text">运单号：{{ item.orderNo }}</view>
                <view class="text"
                  >{{ item.consigneeName }} <text class="call-phone">{{ item.consigneeMobile }}</text></view
                >
                <view>{{ item.consigneeAddress }}{{ item.consigneeAddressDetail }}</view>
                <view class="text">下单时间：{{ item.createTime }}</view>
              </view>
            </view>

            <view class="status">
              <view class="btns" v-if="item.status <= 10">
                <button class="btn">支付</button>
                <button class="btn" @click="editOrder(item)">编辑</button>
                <button class="btn" @click="handleCancelOrder(item)">取消</button>
              </view>
              <view>
                状态：<text class="status-text">{{ item.status | filterOrderStaus }}</text>
              </view>
            </view>
          </view>
        </view>

				<view v-else>
					<tui-no-data :fixed="false" style="padding-top: 100rpx;">暂无数据</tui-no-data>
				</view>
      </view>
    </view>

    <CancelPopup :cancelList="cancelList" v-model="cancelPopupVisiable" @confirm="handleConfirmOrderCancel"></CancelPopup>
  </view>
</template>

<script>
const { debounce } = require('../utils/util');
import { collectPages, mapDeliveryType, cancelList, mapCategoryControlType } from './config';
import { expressInquiryApi, cancelOrderApi, getOrderDetailApi } from '../api/logistics';
import CancelPopup from './component/cancel-popup.vue';
import { getUserId } from '../utils';
import { JI_SENDER_INFO, JI_CONSIGNEE_INFO, JI_VALUE_ADDED_SERVICES, JI_ORDER_GOODS_LIST, JI_REMARKS, JI_EDIT_ORDER_ID } from '../constant';

export default {
  components: {
    CancelPopup
  },
  data() {
    return {
      search: null,
      collectPages,
      cancelList,
      currentTab: 0,
      totalData: 0,

      // TODO 换UserId
      query: {
        pageNo: 1,
        pageSize: 10,
        userId: getUserId(),
        keyword: undefined,
        status: undefined
      },

      list: [],
      cancelPopupVisiable: false,
      cancelOrderId: null
    };
  },

  onShow() {
    this.getOrders();
  },

  mounted() {
    this.search = debounce(this.searchWuliu, 500);
    this.getOrders();
  },

  filters: {
    filterOrderStaus(status) {
      const item = collectPages.find((item) => item.value === status);
      if (item && item.value) {
        return item.label;
      } else {
        return '运输中';
      }
    }
  },

  methods: {
    back() {
      uni.navigateTo({
        url: '/pages/logistics/logistics'
      });
    },

    mapDeliveryType,

    /**
     * @description 搜索
     */
    searchWuliu(e) {
      const searchKey = e.target.value;
      this.query.keyword = searchKey ? searchKey : undefined;
      this.getOrders();
    },

    /**
     * @description 切换nav
     */
    switchTab(tab) {
      this.query.status = tab;
      this.query.pageNo = 1;
      this.getOrders();
    },

    /**
     * @description 查看详情
     */
    toDetail(orderNo) {
      uni.navigateTo({
        url: '/logistics/collect-package-detail?orderNo=' + orderNo
      });
    },

    // 加载数据
    async getOrders(isLoadMore) {
      try {
        const res = await expressInquiryApi(this.query);
        if (res.statusCode === 20000) {
          this.list = isLoadMore ? [...this.list, ...res.data] : res.data;
          this.totalData = res.total;
        } else {
          uni.showToast({
            title: res.statusMsg,
            duration: 2000,
            icon: 'none'
          });
        }
      } catch (error) {
        uni.showToast({
          title: '订单获取失败',
          duration: 2000,
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },

    // 取消订单
    handleCancelOrder(orderInfo) {
      this.cancelOrderId = orderInfo.id;
      this.cancelPopupVisiable = true;
    },

    // 点击确定取消订单
    async handleConfirmOrderCancel(cancelRemarks) {
      try {
        uni.showLoading({
          title: '订单取消中'
        });
        const res = await cancelOrderApi({
          orderId: this.cancelOrderId,
          cancelRemarks,
          userId: getUserId()
        });

        if (res.statusCode === 20000) {
          uni.showToast({
            title: '订单取消成功',
            duration: 2000
          });
          this.query.pageNo = 1;
          this.query.keyword = undefined;
          this.getOrders();
        } else {
          uni.showToast({
            title: res.statusMsg,
            duration: 2000,
            icon: 'none'
          });
        }
      } catch (error) {
        uni.showToast({
          title: '订单取消失败',
          duration: 2000,
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },

    // 点击修改订单
    async editOrder(orderInfo) {
      const res = await getOrderDetailApi(orderInfo.orderNo);
      console.log(res.data);
      uni.setStorageSync(JI_SENDER_INFO, {
        senderName: res.data.senderName,
        senderMobile: res.data.senderMobile,
        senderAddress: '广东省佛山市顺德区',
        senderAddressDetail: res.data.senderAddressDetail,
        microInsuranceAmount: res.data.microInsuranceAmount
      });

      uni.setStorageSync(JI_CONSIGNEE_INFO, {
        consigneeName: res.data.consigneeName,
        consigneeMobile: res.data.consigneeMobile,
        consigneeAddress: res.data.consigneeAddress,
        consigneeAddressDetail: res.data.consigneeAddressDetail,
        isHasElevator: 1,
        consigneeFloor: res.data.consigneeFloor
      });

      uni.setStorageSync(JI_VALUE_ADDED_SERVICES, {
        controlGoods: mapCategoryControlType(res.data.cargoControlType),
        delivery: mapDeliveryType(res.data.deliveryType),
        take: res.data.isPickUp ? '上门提货' : '不提货',
        valuation: res.data.pricingType === 1 ? '系统计价' : '物流报价',
        payType: res.data.paymentMethod === 1 ? '现付' : '到付'
      });

      uni.setStorageSync(JI_ORDER_GOODS_LIST, res.data.orderGoodsList);
      uni.setStorageSync(JI_REMARKS, res.data.remarks);
      uni.setStorageSync(JI_EDIT_ORDER_ID, orderInfo.id);

      uni.navigateTo({
        url: '/logistics/mail?type=edit'
      });
    }
  },

  onReachBottom() {
    if (this.list.length < this.totalData) {
      this.query.pageNo++;
      this.getOrders(true);
      uni.showLoading({
        title: '加载更多'
      });
      return;
    }

    if (this.list.length < this.query.pageSize) {
      return;
    }
    uni.showToast({
      title: '没有更多了',
      duration: 2000
    });
  }
};
</script>

<style lang="less" scoped>
// .hidden {
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }

.collect-package {
  padding: 68rpx 40rpx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #00b578 0%, #ffffff 100%);
  min-height: 100vh;

  .header {
    display: flex;
    align-items: center;

    .back {
      width: 16rpx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 32rpx;
    }
  }

  .main {
    width: 100%;
    border-radius: 20rpx;
    background-color: #fff;
    padding: 20rpx;
    min-height: 100vh;
    margin-top: 34rpx;
    box-sizing: border-box;

    .search {
      position: relative;
      width: 100%;
      height: 60rpx;
      box-sizing: border-box;
      padding: 10rpx 20rpx 10rpx 60rpx;
      background-color: #efefef;
      border-radius: 30rpx;

      .search-input {
        width: 100%;
        height: 100%;
      }

      .img {
        position: absolute;
        left: 16rpx;
        top: 50%;
        transform: translateY(-50%);
        width: 32rpx;
      }
    }

    .order-list {
      width: 100%;
      box-sizing: border-box;
      padding: 40rpx 26rpx;

      .navs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000000;
        font-size: 28rpx;

        .nav-item {
          position: relative;
          padding-bottom: 6rpx;
          border-bottom: 2px solid transparent;
          font-weight: 500;
          transition: all 350ms;

          &.active {
            border-bottom-color: #3662ec;
          }
        }
      }

      .orders {
        .order-wrapper {
          margin-top: 30rpx;
          border-bottom: 1px solid #d8d8d8;

          &:last-child {
            border: none;
          }

          .order-item {
            display: flex;
            justify-content: space-between;
            flex: 1;
            line-height: 1.5;

            .img {
              width: 254rpx;
              height: 166rpx;
              border-radius: 20rpx;
            }

            .info {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: space-around;
              // margin: 0 28rpx;
              color: #3d3d3d;
              font-size: 24rpx;
            }
          }

          .status {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 18rpx 0;
            color: #3d3d3d;
            font-size: 28rpx;
            font-weight: bold;
            .btns {
              display: flex;
              .btn {
                font-size: 12px;
                padding: 0px 18rpx;
                margin: 0 10px;
                color: #fff;
                background-color: #3662ec;

                &:first-child {
                  margin-left: 0;
                }

                &:nth-child(2) {
                  background-color: rgb(210, 105, 30);
                }
              }
            }

            .status-text {
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}
</style>
