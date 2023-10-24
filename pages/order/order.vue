<template>
  <view>
    <TuanAppShim bg="#fff"></TuanAppShim>
    <view class="my-order-container" v-if="userId">
      <OrderHeader @change-status="handleChangeStatus" :currentStatus="currentStatus"
        :menus="['shop', 'business-serve', 'business-shop'].includes(currentOrderMode) ? shopOrderType : navMenus"
        @change-mode="handleChangeOrderMode" @search="handleSearchCommunityOrderList" :currentMode="currentOrderMode"
        ref="orderHeaderRef"></OrderHeader>

      <view class="order-list" :class="{ ani: !isLoading }">
        <SubNavs v-show="isShowSubNav && ['comment', 'append'].includes(isShowSubNav)" @change-sub="handleChangeSubNavs"
          :activeValue="currentSubValue" :navs="subNavs"></SubNavs>

        <view v-show="currentOrderMode === 'community'">
          <!-- 社区普通订单 -->
          <view class="community-common-order-list" v-show="!isShowSubNav">
            <CommunityOrderPane @cancel="handleCancellOrder" :orderInfo="item" v-for="item in communityOrderList"
              :key="item.id"></CommunityOrderPane>
          </view>

          <!-- 社区二次追加订单 -->
          <view class="community-append-order-list" v-show="isShowSubNav && ['append'].includes(isShowSubNav)">
            <AdditionalAmountOrder @refresh="getAppendOrder" v-for="order in appendOrderList" :key="order.id"
              :orderData="order"></AdditionalAmountOrder>
          </view>

          <!-- 社区评论订单 -->
          <view class="community-comment-order-list" v-show="isShowSubNav && ['comment'].includes(isShowSubNav)">
            <block v-if="[0, 1].includes(currentSubValue)">
              <CommentTypeV1 :isAppend="currentSubValue === 1" @comment="handleComment"
                v-for="order in currentSubValue === 0 ? commentOrder.commentOrderList : commentOrder.commentedOrderList"
                :key="order.orderNo" :itemData="order"></CommentTypeV1>
            </block>

            <block v-if="currentSubValue === 2">
              <CommentTypeV2 v-for="order in commentOrder.commentAppendOrderList" :key="order.orderNo" :itemData="order">
              </CommentTypeV2>
            </block>
          </view>
        </view>

        <view v-show="currentOrderMode === 'shop'">
          <!-- 商城普通订单 -->
          <view class="shop-common-order-list" v-if="shopOrderList && shopOrderList.length && currentStatus !== 5">
            <ShopOrder @refresh="getOrderList(true)" v-for="item in shopOrderList" :orderDeatil="item" :key="item.id">
            </ShopOrder>
          </view>

          <!-- 商城评论订单 -->
          <view class="shop-comment-order-list"
            v-if="shopCommentOrderList && shopCommentOrderList.length && currentStatus === 5">
            <ShopCommentedOrder v-for="item in shopCommentOrderList" :orderDetail="item" :key="item.id">
            </ShopCommentedOrder>
          </view>
        </view>

        <view class="business-order-list" v-show="currentOrderMode === 'business'">
          <!-- 商城订单 -->
          <view class="shop-order-list" v-show="currentStatus === 2">
            <BShopOrder @op-order="handleOpBOrder" v-for="item in bShopOrderList" :orderDeatil="item" :key="item.id">
            </BShopOrder>
          </view>
          <!-- 服务订单 -->
          <view class="shop-serve-list">
            <BServeOrder @op-order="handleOpBOrder" v-for="item in bServeList" :orderDeatil="item" :key="item.id">
            </BServeOrder>
          </view>
        </view>

        <NoData @clear="clearSearch()" :isSeach="!!communityQueryInfo.orderNo" v-show="noDataVisible"></NoData>
        <Loading v-show="isLoading"></Loading>
        <LoadingMore style="margin-top: 20upx" v-show="loadingStatus !== 'more'" :status="loadingStatus"></LoadingMore>
      </view>

      <!-- 取消社区订单 -->
      <CancelOrder @success="getOrderList(true)" ref="cancelOrderRef"></CancelOrder>

      <!-- 取消商圈订单 -->
      <CancelOrderPopup @success="getOrderList(true)" ref="cancelOrderPopupRef"></CancelOrderPopup>
    </view>

    <!-- 未登录时 -->
    <TuanUnLoginPage v-else></TuanUnLoginPage>

    <!-- 提示弹框 -->
    <tui-modal :show="modalVisible" @click="handleDeleteOrderModal" @cancel="currentBOrder = null; modalVisible = false;"
      title="提示" content="确定要删除当前订单吗？"></tui-modal>

    <!-- toast -->
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getOrderStatusList, communityAppendOrderNavs, communityCommentOrder, shopOrderType, businessSubNavs } from './config';
import { getEndOrderListApi, getTwicePayOrderListApi, getBusinessOrderListApi, deleteBOrderApi } from '../../api/community-center';
import { getOrderListApi, getMyCommentListApi } from '../../api/order';
import { USER_ID, T_PAY_ORDER, COMMUNITY_ORDER_NO, COMMUNITY_ORDER_ITEM_NO, B_SERVE_ORDER_NO, B_SHOP_ORDER_NO } from '../../constant';
import TuanUnLoginPage from './components/TuanUnLoginPage.vue';
import OrderHeader from './components/OrderHeader.vue';
import CommunityOrderPane from './components/CommunityOrderPane.vue';
import CancelOrder from './components/CancelOrder.vue';
import Loading from './components/Loading.vue';
import NoData from './components/NoData.vue';
import SubNavs from './components/SubNavs.vue';
import AdditionalAmountOrder from '../../community-center/components/AdditionalAmountOrder.vue';
import CommentTypeV1 from '../../community-center/comment-order/components/CommentTypeV1.vue';
import CommentTypeV2 from '../../community-center/comment-order/components/CommentTypeV2.vue';
import ShopOrder from './components/ShopOrder.vue';
import CancelOrderPopup from './components/CancelOrderPopup.vue'
import ShopCommentedOrder from './components/CommentedOrder.vue';
import BShopOrder from './components/BShopOrder.vue'
import BServeOrder from './components/BServeOrder.vue';
import { getUserId, payShopFn } from 'utils';

export default {
  components: {
    TuanUnLoginPage,
    OrderHeader,
    CommunityOrderPane,
    NoData,
    Loading,
    CancelOrder,
    SubNavs,
    AdditionalAmountOrder,
    CommentTypeV1,
    CommentTypeV2,
    ShopOrder,
    ShopCommentedOrder,
    BShopOrder,
    CancelOrderPopup,
    BServeOrder
  },

  data() {
    return {
      modalVisible: false,
      currentBOrder: null,
      currentOrderMode: 'community',
      currentStatus: -1,
      currentSubValue: 0,
      communityMenus: getOrderStatusList(),
      isNotLogin: true, // 是否登录
      userId: null,
      loadingTimer: null,
      shopOrderType: Object.freeze(shopOrderType),
      businessSubNavs: Object.freeze(businessSubNavs),
      communityAppendOrderNavs: Object.freeze(communityAppendOrderNavs),
      communityCommentOrder: Object.freeze(communityCommentOrder),
      isLoading: false, // 是否加载中
      loadingStatus: 'loading', // 加载状态
      isShowSubNav: null,
      loadType: 'page', // page: 页面级加载；more: 上啦加载
      // 社区订单
      communityQueryInfo: {
        pageNo: 1,
        pageSize: 20,
        status: undefined,
        orderNo: ''
      },
      totalCommunityPages: 0,
      communityOrderList: [],
      // 二次追加订单
      awaitPayOrderList: [], // 待支付
      payedOrderList: [], // 已支付
      refusedOrderList: [], // 已拒绝
      // 评论订单
      commentOrder: {
        commentOrderList: [], // 待评论订单
        commentAppendOrderList: [], // 可追加订单
        commentedOrderList: [] // 已评论订单
      },
      // 商城订单
      shopQueryInfo: {
        page: 1,
        size: 20,
        showType: 0
      },
      shopOrderList: [],
      totalShopPage: 0,
      shopCommentOrderList: [], // 评论订单
      currentNavInfo: {
        label: '全部',
        value: -1
      },

      // 商圈服务订单
      bServeQueryInfo: {
        pageNo: 1,
        pageSize: 20,
        orderServerType: 2,
        search: ''
      },
      totalBServePage: 0,
      bServeList: [],
      // 商圈商品订单
      bShopQueryInfo: {
        pageNo: 1,
        pageSize: 20,
        orderServerType: 1,
        search: ''
      },
      totalBShopPage: 0,
      bShopOrderList: []
    };
  },

  onLoad() { },

  mounted() {
    // this.getOrderList();
  },

  onShow() {
    uni.removeStorageSync(T_PAY_ORDER);
    uni.removeStorageSync(COMMUNITY_ORDER_NO);
    uni.removeStorageSync(COMMUNITY_ORDER_ITEM_NO);
    uni.removeStorageSync(B_SERVE_ORDER_NO)
    uni.removeStorageSync(B_SHOP_ORDER_NO)
    this.$nextTick(() => {
      this.getOrderList(true);
    });
    const userId = uni.getStorageSync(USER_ID);
    if (userId) {
      this.userId = userId;
      this.isNotLogin = false;
    } else {
      this.isNotLogin = true;
      this.userId = null;
    }
  },

  methods: {
    handleChangeOrderMode(mode) {
      if (mode === this.currentOrderMode) {
        return;
      }
      this.currentOrderMode = mode;
      this.currentStatus = -1;
      if (mode === 'shop') {
        this.shopQueryInfo.showType = 0;
      } else if (mode === 'community') {
        this.communityQueryInfo.status = undefined;
      } else if (mode === 'business') {
        this.currentStatus = 1;
      }
      this.currentNavInfo = {
        label: '全部',
        value: -1
      };
      this.isShowSubNav = null;
      this.loadType = 'page';
      this.getOrderList(true);
    },

    // 清空搜索
    clearSearch() {
      this.communityQueryInfo.orderNo = '';
      this.$refs.orderHeaderRef && this.$refs.orderHeaderRef.clearSearch();
    },

    // 点击搜索
    handleSearchCommunityOrderList(searchValue) {
      if (this.currentOrderMode === 'community') {
        this.currentStatus = -1;
        this.communityQueryInfo.orderNo = searchValue || undefined;
        this.communityOrderList = [];
        this.isShowSubNav = null;
        this.communityQueryInfo.pageNo = 1;
        this.communityQueryInfo.status = undefined;
        this.currentNavInfo = {
          label: '全部',
          value: -1
        };
        this.getCommunityOrderList();
      } else {
        this.ttoast({
          type: 'fial',
          title: '只能搜索社区订单'
        });
      }
    },

    // 切换状态
    handleChangeStatus(navInfo) {
      if (!navInfo) return;
      const newStatus = navInfo.value;
      this.currentNavInfo = navInfo;
      this.currentStatus = newStatus;

      this.loadType = 'page';
      if (this.currentOrderMode === 'community') {
        if (newStatus === -1) {
          this.communityQueryInfo.status = undefined;
        } else if (newStatus === -2) {
          this.isShowSubNav = 'append';
          this.getAppendOrder(true);
          return;
        } else if (newStatus === -3) {
          this.isShowSubNav = 'comment';
          this.currentSubValue = 0;
          this.getCommentOrderList(this.communityCommentOrder[0]);
          return;
        } else {
          this.communityQueryInfo.status = newStatus;
        }
      } else if (this.currentOrderMode === 'shop') {
        if (navInfo.value === -1) {
          this.shopQueryInfo.showType = 0;
        } else if (navInfo.value === 5) {
          this.getShopMyCommentOrderList(true);
          return;
        } else {
          this.shopQueryInfo.showType = newStatus;
        }
      } else {

      }

      this.getOrderList(true);
      this.isShowSubNav = null;
    },

    // 切换sub
    handleChangeSubNavs(info) {
      this.currentSubValue = info.value;
      if (this.isShowSubNav === 'comment') {
        this.getCommentOrderList(info);
      }
    },

    // 发起请求获取列表数据
    async getOrderList(isClearQuery) {
      if (this.currentOrderMode === 'community') {
        if (isClearQuery) {
          this.communityOrderList = [];
          this.communityQueryInfo.pageNo = 1;
        }
        this.getCommunityOrderList();
      } else if (this.currentOrderMode === 'shop') {
        if (isClearQuery) {
          this.shopQueryInfo.page = 1;
          this.shopOrderList = [];
        }
        this.getShopOrderList();
      } else {
        if (isClearQuery) {
          this.bServeQueryInfo.pageNo = 1
          this.bServeList = []
          this.bShopQueryInfo.pageNo = 1
          this.bShopOrderList = []
        }

        this.getBusinessOrderList()
      }
    },

    /**
     * 获取商圈列表数据
     */
    async getBusinessOrderList() {
      try {
        if (this.loadType === 'page') {
          this.isLoading = true;
        } else {
          this.loadingStatus = 'loading';
        }
        const queryInfo = this.currentStatus === 1 ? this.bServeQueryInfo : this.bShopQueryInfo
        const res = await getBusinessOrderListApi({ ...queryInfo, userId: getUserId() })
        if (this.currentStatus === 1) {
          this.bServeList.push(...res.records)
          this.totalBServePage = res.pages
        } else {
          this.bShopOrderList.push(...res.records)
          this.totalBShopPage = res.pages
        }

      } catch (error) {

      } finally {
        if (this.loadingTimer) {
          this.clearTimer();
        }
        this.isLoading = false;
        uni.stopPullDownRefresh();
        this.loadingStatus = 'more';
      }
    },

    // 获取社区数据
    async getCommunityOrderList() {
      try {
        if (this.loadType === 'page') {
          this.isLoading = true;
        } else {
          this.loadingStatus = 'loading';
        }

        const res = await getEndOrderListApi({
          ...this.communityQueryInfo,
          userId: this.userId
        });

        if (res.statusCode === 20000) {
          this.communityOrderList.push(...res.data);
          this.totalCommunityPages = res.pages;
        } else {
          this.ttoast({
            type: 'fail',
            title: res.statusMsg || '订单列表获取失败'
          });
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '订单列表获取失败',
          content: error
        });
      } finally {
        if (this.loadingTimer) {
          this.clearTimer();
        }
        this.isLoading = false;
        uni.stopPullDownRefresh();
        this.loadingStatus = 'more';
      }
    },

    // 获取二次追加的订单
    async getAppendOrder() {
      this.awaitPayOrderList = [];
      this.payedOrderList = [];
      this.refusedOrderList = [];
      const _this = this;
      try {
        if (this.loadType === 'page') {
          this.isLoading = true;
        } else {
          this.loadingStatus = 'loading';
        }
        const res = await getTwicePayOrderListApi({
          userId: this.userId
        });

        if (res.statusCode === 20000) {
          const orderList = res.data;
          if (orderList && orderList.length) {
            orderList.forEach((item) => {
              if (item.status === 0) {
                _this.awaitPayOrderList.push(item);
              } else if (item.status === 1) {
                _this.payedOrderList.push(item);
              } else if (item.status === 2) {
                this.refusedOrderList.push(item);
              }
            });
          }
        } else {
          this.ttoast({
            type: 'fail',
            title: res.statusMsg || '二次追加订单获取失败'
          });
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '二次追加订单获取失败',
          content: error
        });
      } finally {
        this.isLoading = false;
        uni.stopPullDownRefresh();
        this.loadingStatus = 'more';
      }
    },

    // 获取评论订单数据
    async getCommentOrderList(queryInfo) {
      try {
        if (this.loadType === 'page') {
          this.isLoading = true;
        } else {
          this.loadingStatus = 'loading';
        }
        const { api, list } = queryInfo;
        if (api && list) {
          const orderList = await api({
            userId: this.userId
          });

          this.commentOrder[list] = orderList || [];
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '评论订单获取失败',
          content: error
        });
      } finally {
        this.isLoading = false;
        uni.stopPullDownRefresh();
        this.loadingStatus = 'more';
      }
    },

    // 去评论
    handleComment({ itemData, isAppend }) {
      if (isAppend) {
        uni.navigateTo({
          url:
            '/community-center/comment-order/append-comment?orderNo=' +
            itemData.orderNo +
            '&serveName=' +
            itemData.serverName +
            '&url=' +
            itemData.serverUrl +
            '&commentId=' +
            itemData.id
        });
      } else {
        uni.navigateTo({
          url: '/community-center/comment-order/rate?orderNo=' + itemData.orderNo + '&serveName=' + itemData.serverName + '&url=' + itemData.serverUrl
        });
      }
    },

    // 获取商城数据
    async getShopOrderList() {
      try {
        if (this.loadType === 'page') {
          this.isLoading = true;
        } else {
          this.loadingStatus = 'loading';
        }
        const res = await getOrderListApi({ ...this.shopQueryInfo, userId: this.userId });
        if (res.errno == 0) {
          const orderListData = res.data;
          this.totalShopPage = orderListData.totalPages;
          this.shopOrderList.push(...orderListData.data);
        } else {
          this.ttoast({
            type: 'fail',
            title: res.errmsg || '订单获取失败'
          });
        }
      } catch (error) {
      } finally {
        this.isLoading = false;
        this.loadingStatus = 'more';

        uni.stopPullDownRefresh();
      }
    },

    // 获取我的评论数据
    async getShopMyCommentOrderList(isClear) {
      try {
        if (this.loadType === 'page') {
          this.isLoading = true;
        } else {
          this.loadingStatus = 'loading';
        }
        const res = await getMyCommentListApi({
          userId: this.userId
        });
        if (res.errno === 0) {
          this.shopCommentOrderList = res.data;
        }
      } catch (error) {
      } finally {
        this.isLoading = false;
        this.loadingStatus = 'more';
        uni.stopPullDownRefresh();
      }
    },

    // 清空定时器
    clearTimer() {
      clearTimeout(this.loadingTimer);
      this.loadingTimer = null;
    },

    // 取消订单
    handleCancellOrder(orderInfo) {
      this.$refs.cancelOrderRef.show(orderInfo);
    },

    // 是否可以下拉加载
    canReachBottomLoad() {
      if (this.currentOrderMode === 'community') {
        return [-3, -2].includes(this.currentStatus);
      } else if (this.currentOrderMode === 'shop') {
        return this.currentStatus === 5;
      } else {
        return true
      }
    },

    // 商圈订单下拉加载
    loadMoreBusinessOrder() {
      if (this.currentStatus === 1) {
        if (this.bServeList.length < this.bServeQueryInfo.pageSize) {
          return
        }

        if (this.bServeQueryInfo.pageNo >= this.totalBServePage) {
          this.loadingStatus = 'no-more';
          return;
        }

        this.bServeQueryInfo.pageNo++
        this.getOrderList()
      } else {
        if (this.bShopOrderList.length < this.bShopQueryInfo.pageSize) {
          return
        }

        if (this.bShopQueryInfo.pageNo >= this.totalBShopPage) {
          this.loadingStatus = 'no-more';
          return;
        }

        this.bShopQueryInfo.pageNo++
        this.getOrderList()
      }
    },

    // 社区订单下拉加载
    loadMoreCommunityOrder() {
      if (this.communityOrderList.length < this.communityQueryInfo.pageSize) {
        return;
      }

      if (this.communityQueryInfo.pageNo >= this.totalCommunityPages) {
        this.loadingStatus = 'no-more';
        return;
      }

      this.communityQueryInfo.pageNo++;
      this.getOrderList();
    },
    // 商城订单下垃加载
    loadMoreShopOrder() {
      if (this.shopOrderList.length < this.shopQueryInfo.size) {
        return;
      }

      if (this.shopQueryInfo.page >= this.totalShopPage) {
        this.loadingStatus = 'no-more';
        return;
      }

      this.shopQueryInfo.page++;
      this.getOrderList();
    },

    // 操作商圈订单
    async handleOpBOrder({ orderDeatil, key }) {
      switch (key) {
        case 'cancel':
          this.$refs.cancelOrderPopupRef.show(orderDeatil)
          break;
        case 'delete':
          this.modalVisible = true
          this.currentBOrder = orderDeatil
          break
        case 'pay':
          try {
						payShopFn(orderDeatil, '', false)
          } catch (error) {
            this.ttoast({
              type: 'fail',
              title: '支付失败',
              content: error
            })
          }
          break
        default:
          break;
      }
    },

    // 点击删除订单madel
    async handleDeleteOrderModal({ index }) {
      if (index) {
        try {
          await deleteBOrderApi(this.currentBOrder.id)
          this.ttoast("订单删除成功")
          this.getOrderList(true)
        } catch (error) {
          this.ttoast({
            type: "fail",
            title: '订单删除失败',
            content: error
          })
        } finally {
          this.currentBOrder = null
          this.modalVisible = false
        }
      } else {
        this.modalVisible = false
        this.currentBOrder = null
      }
    }
  },

  onPullDownRefresh() {
    if (!this.userId) return uni.stopPullDownRefresh();
    this.communityQueryInfo.pageNo = 1;
    this.shopQueryInfo.page = 1;
    this.commentOrderList = [];
    this.shopOrderList = [];
    this.awaitPayOrderList = [];
    this.payedOrderList = [];
    this.refusedOrderList = [];
    this.commentOrder.commentOrderList = [];
    this.commentOrder.commentAppendOrderList = [];
    this.commentOrder.commentedOrderList = [];
    this.shopCommentOrderList = [];
    this.handleChangeStatus(this.currentNavInfo);
  },

  computed: {
    navMenus() {
      return this.currentOrderMode === 'community' ? this.communityMenus : this.currentOrderMode === 'shop' ? this.shopOrderType : businessSubNavs;
    },

    subNavs() {
      if (this.isShowSubNav) {
        return this.isShowSubNav === 'append' ? this.communityAppendOrderNavs : this.communityCommentOrder;
      } else {
        return [];
      }
    },

    appendOrderList() {
      if (!this.isShowSubNav) return [];
      if (this.isShowSubNav === 'append') {
        if (this.currentSubValue === 0) {
          return this.awaitPayOrderList;
        } else if (this.currentSubValue === 1) {
          return this.payedOrderList;
        } else if (this.currentSubValue === 2) {
          return this.refusedOrderList;
        }
      }

      return [];
    },

    noDataVisible() {
      if (this.isLoading) return false;
      if (this.currentOrderMode === 'community') {
        if (!this.isShowSubNav) {
          return !!!this.communityOrderList.length;
        }
        if (this.isShowSubNav) {
          if (this.isShowSubNav === 'append') {
            return !!!this.appendOrderList.length;
          } else if (this.isShowSubNav === 'comment') {
            if (this.currentSubValue === 0) {
              return !!!this.commentOrder.commentOrderList.length;
            } else if (this.currentSubValue === 1) {
              return !!!this.commentOrder.commentedOrderList.length;
            } else {
              return !!!this.commentOrder.commentAppendOrderList.length;
            }
          }
        }
      } else if (this.currentOrderMode === 'shop') {
        if (this.currentStatus === 5) {
          return !!!this.shopCommentOrderList.length;
        } else {
          return !!!this.shopOrderList.length;
        }
      } else if (this.currentOrderMode === 'business') {
        if (this.currentStatus === 1) {
          return !!!this.bServeList.length
        } else {
          return !!!this.bShopOrderList.length
        }
      } else {
        return true
      }
    }
  },

  onReachBottom() {
    if (this.canReachBottomLoad) {
      this.loadType = 'more';
      if (this.currentOrderMode === 'community') {
        this.loadMoreCommunityOrder();
      } else if (this.currentOrderMode === 'shop') {
        this.loadMoreShopOrder();
      } else if (this.currentOrderMode === 'business') {
        this.loadMoreBusinessOrder()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .tui-lazyload__img {
  width: 140rpx !important;
  height: 140rpx !important;
  background-color: #ccc;
}

@keyframes fade {
  0% {
    opacity: 0.4;
    transform: translateX(-100vw);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.my-order-container {
  width: 100vw;
  background-color: #f5f5f7;

  .order-list {
    min-height: 100vh;
    background-color: #f5f5f7;
    position: relative;
    padding: 220upx 30upx 124upx;
    box-sizing: border-box;

    &.ani {
      animation: fade 350ms ease-in-out;
    }
  }
}
</style>
