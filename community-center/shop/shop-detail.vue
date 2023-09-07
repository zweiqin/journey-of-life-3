<template>
  <view class="shop-detail-container">
    <view class="shop-background-img" v-if="shopDetailInfo">
      <image class="bg" src="https://img0.baidu.com/it/u=3509590395,993537027&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"></image>
      <image @click="handleBack" class="back-icon" src="../../static/images/new-community/shop/order-detail-back.png"></image>

      <view class="shop-base-info">
        <view class="top">
          <view class="wrapper">
            <image class="avatar" :src="shopDetailInfo.shopLogo || require('../../static/images/new-user/fee.icon.png')"></image>

            <view class="detail-info">
              <view class="name-wrapper">
                <view class="shop-name">{{ shopDetailInfo.shopName || shopDetailInfo.shopNameSimple || '附近商家' }}</view>
              </view>

              <view class="tags">
                <view class="tag tag-1">
                  <image class="auth-icon" src="../../static/images/new-community/shop/icon.png"></image>
                  已认证
                </view>
                <view class="tag tag-2"> 经营四年 </view>
              </view>

              <view class="rate-wrapper">
                <tui-rate :size="16" :current="shopDetailInfo.score || 5"></tui-rate>
                <text class="rate-text-1">{{ shopDetailInfo.score || 5.0 }}</text>
                <text class="rate-text-2">好评率100%</text>
              </view>
            </view>
          </view>

          <view class="pubilc-message"> 公告：由本公司提供服务及承担一切法律责任 </view>
        </view>

        <view class="shop-operate-container">
          <view class="item">
            <image class="status-icon" src="../../static/images/new-community/shop/shop-status.png"></image>
            <text>状态</text>
            <text class="value">营业</text>
          </view>

          <view class="item" v-if="shopDetailInfo.distance">
            <image class="status-icon" src="../../static/images/new-community/shop/shop-location.png"></image>
            <text>距您</text>
            <text class="value">{{ shopDetailInfo.distance }}km</text>
          </view>

          <view class="item" v-if="shopDetailInfo.accessNum">
            <image class="status-icon" src="../../static/images/new-community/shop/shop-order.png"></image>
            <text>接单</text>
            <text class="value">{{ shopDetailInfo.accessNum }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="main">
      <!-- nav start -->
      <view class="navs">
        <view class="nav-item" @click="handleStichNav(item)" v-for="item in tabs" :class="{ active: item.value === currentTab }" :key="item.value">{{
          item.name
        }}</view>
      </view>
      <!-- nav end -->

      <ShopServe
        @change="handleFilter"
        :current="serveQueryInfo.goodsTypeId"
        :category="serveCategoryList"
        v-show="currentTab === 1 && loadingStatus !== 'loading'"
        :cdata="serveList"
      ></ShopServe>

      <ShopGoods
        @change="handleFilter"
        :category="goodsCategoryList"
        :current="goodsQueryInfo.goodsTypeId"
        :cdata="goodsList"
        v-show="currentTab === 2 && loadingStatus !== 'loading'"
      ></ShopGoods>
      <ShopDetail :shopInfo="shopDetailInfo" v-show="currentTab === 3"></ShopDetail>

      <LoadingMore style="margin-top: 20upx" v-show="loadingStatus !== 'more'" :status="loadingStatus"></LoadingMore>
    </view>

    <ShopFooter @follow="handleFollowShop" :shopInfo="shopDetailInfo"></ShopFooter>

    <tui-modal
      :show="$data._isShowTuiModel"
      title="提示"
      content="您还未登录，是否先去登录？"
      @click="_handleClickTuiModel($event, 'login', '/pages/user/user')"
    ></tui-modal>

    <tui-toast ref="toast"></tui-toast>

    <!-- <tui-skeleton v-if="skeletonShow"></tui-skeleton> -->
  </view>
</template>

<script>
import { getShopDetailApi, followShopApi, getShopGoodsCategoryListApi, getShopGoodsListApi } from '../../api/community-center';
import { USER_ID } from '../../constant';
import ShopServe from './components/ShopServe.vue';
import ShopGoods from './components/ShopGoods.vue';
import ShopDetail from './components/ShopDetail.vue';
import ShopFooter from './components/ShopFooter.vue';
import showModalMixin from '../../mixin/showModal';
import store from '../../store';

export default {
  components: { ShopServe, ShopGoods, ShopDetail, ShopFooter },
  onLoad(params) {
    this.shopId = params.shopId * 1;
    this.userId = uni.getStorageSync(USER_ID);
  },

  mixins: [showModalMixin()],

  mounted() {
    this.getShopDetailInfo();
  },

  data() {
    return {
      userId: null,
      shopId: null,
      shopDetailInfo: null,
      loadingStatus: 'more',
      scrollTop: 0,
      tabs: Object.freeze([
        {
          name: '服务',
          value: 1
        },
        {
          name: '商品',
          value: 2
        },
        {
          name: '详情',
          value: 3
        }
      ]),
      currentTab: 1,
      // 服务类别
      serveCategoryList: [],
      serveQueryInfo: {
        pageNo: 1,
        pageSize: 20,
        shopId: null,
        goodsType: 2,
        goodsTypeId: -1
      },
      totalServeData: 0,
      serveList: [],

      // 商品
      goodsCategoryList: [],
      goodsQueryInfo: {
        pageNo: 1,
        pageSize: 20,
        shopId: null,
        goodsType: 1,
        goodsTypeId: -1
      },
      totalGoodsData: 0,
      goodsList: []
    };
  },

  methods: {
    async getShopDetailInfo() {
      try {
        let currentAddress = store.getters.detailAddress;

        const res = await getShopDetailApi({
          userId: this.userId,
          address: currentAddress + '',
          shopId: this.shopId
        });

        if (res.statusCode === 20000) {
          this.shopDetailInfo = res.data;
          const businessLicense = this.shopDetailInfo.businessLicense;
          const rotationChart = this.shopDetailInfo.rotationChart;
          this.shopDetailInfo.businessLicense = businessLicense && typeof businessLicense === 'string' ? businessLicense.split(',') : [];
          this.shopDetailInfo.rotationChart = rotationChart && typeof rotationChart === 'string' ? rotationChart.split(',') : [];
          this.getShopGoodsCategoryList();
        } else {
          this.ttoast({
            type: 'fail',
            title: res.statusMsg || '商家详情获取失败'
          });
        }

        console.log(res);
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '商家详情获取失败',
          content: error
        });
      }
    },

    // 切换nav、
    handleStichNav(navInfo) {
      const currentTab = navInfo.value;
      this.currentTab = currentTab;
      this.getShopGoodsCategoryList();
      this.serveQueryInfo.pageNo = 1;
      this.goodsQueryInfo.pageNo = 1;
      this.goodsQueryInfo.goodsTypeId = -1;
      this.serveQueryInfo.goodsTypeId = -1;
    },

    // 收藏、取消收藏门店
    async handleFollowShop(status) {
      if (!this.userId) {
        this.$data._isShowTuiModel = true;
        return;
      }

      try {
        uni.showLoading({
          title: '操作中...'
        });

        const res = await followShopApi({
          userId: this.userId,
          shopId: this.shopId
        });

        if (res.statusCode === 20000) {
          this.ttoast('操作成功');
          this.getShopDetailInfo();
        } else {
          this.ttoast({
            type: 'fail',
            title: res.statusMsg || '操作失败'
          });
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '操作失败',
          content: error
        });
      } finally {
        uni.hideLoading();
      }
    },

    // 获取门店商品类别
    async getShopGoodsCategoryList() {
      try {
        const res = await getShopGoodsCategoryListApi({
          shopId: this.shopId,
          typeCategory: this.currentTab === 1 ? 2 : 1
        });

        if (res.statusCode === 20000) {
          if (this.currentTab === 1) {
            this.serveCategoryList = [
              {
                id: -1,
                shopId: -1,
                goodsTypeName: '全部',
                goodsTypeUrl: '',
                typeCategory: -1
              },
              ...res.data
            ];
          } else if (this.currentTab === 2) {
            this.goodsCategoryList = [
              {
                id: -1,
                shopId: -1,
                goodsTypeName: '全部',
                goodsTypeUrl: '',
                typeCategory: -1
              },
              ...res.data
            ];
          }

          this.getShopGoodsList(true);
        } else {
          this.ttoast({
            type: 'fail',
            title: res.statusMsg || '商品类别获取失败'
          });
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '服务类别获取失败',
          content: error
        });
      }
    },

    // 获取门店商品列表
    async getShopGoodsList(isClear) {
      const currentScrollTop = this.scrollTop;
      if (isClear) {
        this.serveList = [];
        this.goodsList = [];
      }
      try {
        this.loadingStatus = 'loading';
        const baseQueryInfo = this.currentTab === 1 ? this.serveQueryInfo : this.goodsQueryInfo;
        const goodsTypeId = baseQueryInfo.goodsTypeId === -1 ? undefined : baseQueryInfo.goodsTypeId;
        const res = await getShopGoodsListApi({
          ...baseQueryInfo,
          shopId: this.shopId,
          goodsTypeId
        });

        const nextData = res.data || [];
        if (res.statusCode === 20000) {
          if (this.currentTab === 1) {
            this.serveList.push(...nextData);
            this.totalServeData = res.total;
          } else if (this.currentTab === 2) {
            this.goodsList.push(...nextData);
            this.totalGoodsData = res.total;
          }

          this.$nextTick(() => {
            uni.pageScrollTo({
              scrollTop: currentScrollTop,
              duration: 300
            });
          });
        } else {
          this.ttoast({
            type: 'fail',
            title: res.statusMsg || '商品列表获取失败'
          });
        }

        console.log(res);
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '商品列表获取失败',
          content: error
        });
      } finally {
        this.loadingStatus = 'more';
      }
    },

    // 筛选
    handleFilter(typeId, currentTab) {
      if (currentTab === 1) {
        this.serveQueryInfo.pageNo = 1;
        this.serveQueryInfo.goodsTypeId = typeId;
      } else if (currentTab === 2) {
        this.goodsQueryInfo.pageNo = 1;
        this.goodsQueryInfo.goodsTypeId = typeId;
      }

      this.getShopGoodsList(true);
    },

    handleBack() {
      uni.navigateBack();
    }
  },

  onReachBottom() {
    if (this.currentTab === 1) {
      if (this.serveList.length < this.serveQueryInfo.pageSize) {
        return;
      }

      if (this.serveList.length >= this.totalServeData) {
        this.loadingStatus = 'no-more';
        return;
      }

      this.serveQueryInfo.pageNo++;
      this.getShopGoodsList();
    } else if (this.currentTab === 2) {
      if (this.goodsList.length < this.goodsQueryInfo.pageSize) {
        return;
      }

      if (this.goodsList.length >= this.totalGoodsData) {
        this.loadingStatus = 'no-more';
        return;
      }

      this.goodsQueryInfo.pageNo++;
      this.getShopGoodsList();
    }
  },

  onPageScroll(e) {
    console.log(e);
    this.scrollTop = e.scrollTop;
  }
};
</script>

<style lang="less" scoped>
.shop-detail-container {
  padding-bottom: 160upx;
}

.shop-background-img {
  position: relative;
  width: 100%;
  height: 472upx;
  .bg {
    width: 100%;
    height: 100%;
  }

  .back-icon {
    position: absolute;
    left: 10upx;
    top: 40upx;
    width: 64upx;
    height: 64upx;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 20upx;
  }

  .shop-base-info {
    position: absolute;
    top: 120upx;
    left: 28upx;
    width: 694upx;
    // height: 338upx;
    background-color: #fff;
    border-radius: 20upx;
    // overflow: hidden;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
    z-index: 100;

    .top {
      padding: 31upx 31upx 21upx;
      box-sizing: border-box;

      .wrapper {
        display: flex;
        align-items: flex-start;
        .avatar {
          width: 140upx;
          height: 140upx;
          border-radius: 20upx;
          flex-shrink: 0;
          margin-right: 21upx;
        }

        .detail-info {
          flex: 1;

          .name-wrapper {
            .shop-name {
              position: relative;
              padding-left: 48upx;
              font-size: 32upx;
              font-weight: 500;
              color: #222229;

              &::after {
                content: '';
                display: block;
                position: absolute;
                width: 44upx;
                height: 44upx;
                background: url('../../static/images/new-community/shop/tag.png') no-repeat;
                background-size: cover;
                left: 0;
                top: 0;
              }
            }
          }

          .tags {
            display: flex;
            margin: 12upx 0;

            .tag {
              font-size: 24upx;
              width: 130upx;
              height: 44upx;
              border-radius: 4upx;
              display: flex;
              align-items: center;
              justify-content: center;
              line-height: 1.5;

              &.tag-1 {
                color: #014bb8;
                background-color: #e9f4ff;
                .auth-icon {
                  width: 32upx;
                  height: 32upx;
                  flex-shrink: 0;
                  margin-right: 4upx;
                }
              }

              &.tag-2 {
                background-color: #fff5e5;
                color: #ef530e;
                margin-left: 27upx;
              }
            }
          }

          .rate-wrapper {
            display: flex;
            align-items: center;

            .rate-text-1 {
              font-size: 24upx;
              color: #ef530e;
            }

            .rate-text-2 {
              font-size: 24upx;
              color: #888889;
              margin-left: 15upx;
            }
          }
        }
      }

      .pubilc-message {
        height: 42upx;
        background-color: #f5f5f7;
        border-radius: 8upx;
        margin: 30upx 0 20upx 0;
        color: #888889;
        font-size: 24upx;
        line-height: 42upx;
        padding: 0 32upx;
      }
    }

    .shop-operate-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 74upx;
      background-color: #f5f5f7;
      border-radius: 0 0 20upx 20upx;
      padding: 20upx 40upx;
      box-sizing: border-box;

      .item {
        display: flex;
        align-items: center;
        font-size: 24upx;
        color: #222229;
        .status-icon {
          width: 24upx;
          height: 24upx;
          flex-shrink: 0;
          margin-right: 10upx;
        }

        .value {
          margin-left: 12upx;
          color: #ef530e;
        }
      }
    }
  }
}

.main {
  position: relative;
  padding: 250upx 34upx 20upx;
  box-sizing: border-box;
  margin-top: -200upx;
  background-color: #fff;
  border-radius: 20upx 20upx 0 0;
  z-index: 10;

  .navs {
    display: flex;
    align-items: center;
    .nav-item {
      position: relative;
      margin-right: 53upx;
      color: #222229;
      font-size: 32upx;
      font-weight: 500;
      line-height: 1.5;
      transition: color 150ms;

      &::after {
        content: '';
        width: 0;
        height: 4upx;
        border-radius: 8upx;
        position: absolute;
        display: block;
        bottom: -2upx;
        left: 0;
        background-color: #ef530e;
        transition: all 150ms;
      }

      &.active {
        color: #ef530e;

        &::after {
          width: 100%;
        }
      }
    }
  }
}
</style>
