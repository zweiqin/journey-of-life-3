<template>
  <view class="brand-detail-container" v-if="factoryDetail">
    <swiper :current="currentTabIndex" disable-touch class="swipper-container">
      <swiper-item class="swiper-item-container brand-detail-info">
        <BrandDetailHeader @share="handleClickShare" @follow="handleFollowFactory"
          @setScrollBar="handleSetSctollViewHeight" @changeTab="handleChangeTab" :isFollow="factoryDetail.ifCollect">
        </BrandDetailHeader>
        <view class="brand-detail-info-main">
          <BrandGallery :advertisement="factoryDetail.advertisement"></BrandGallery>
          <BrandCard :name="factoryDetail.shopName" :year="factoryDetail.annualLimit" :score="factoryDetail.score"
            :address="factoryDetail.shopAdress">
          </BrandCard>
          <BrandGoods @changeTab="handleChangeTab" :totalCount="totalGoodsCount" :topGoods="topGoods"
            :bottomGoods="bottomGoods"></BrandGoods>
          <BrandPerformance></BrandPerformance>

          <!-- 工厂简介 -->
          <view class="brand-description">
            <view class="title">工厂展厅</view>
            <view class="tag">公司介绍</view>
            <view class="desc-text" :class="{ empty: !!!factoryDetail.shop_brief }">
              {{ factoryDetail.shop_brief || '暂无简介~' }}
            </view>
          </view>
          <!-- 装修模块 -->
          <view class="brand-description">
						<CanvasPage
							v-if="componentsData && componentsData.length" :components-data="componentsData" :terminal="terminal"
							:type-id="3" :shop-id="Number(shopId)"
						>
						</CanvasPage>
						<tui-no-data v-else-if="componentsData && !componentsData.length" :fixed="false" style="margin-top: 40upx;">
							商家未装修首页
						</tui-no-data>
          </view>
        </view>

        <!-- 推荐 -->
        <view class="brand-recommend-containter" v-if="recommendBrandList.length">
          <tui-divider :size="32" color="#222229" dividerColor="#888889" bold backgroundColor="#EFF3F6"
            width="40%">工厂推荐</tui-divider>
          <view class="brand-list">
            <BrandPane v-for="factory in recommendBrandList" :factory="factory" :key="factory.id"></BrandPane>
          </view>
        </view>


      </swiper-item>

      <swiper-item class="swiper-item-container">
        <BrandDetailHeader :isFollow="factoryDetail.ifCollect" @share="handleClickShare" @follow="handleFollowFactory"
          id="brandDetailHeader" @changeTab="handleChangeTab" :active="1"></BrandDetailHeader>
        <view class="goods-category-container" :style="{ height: `calc(100vh - ${scrollViewHeight}px)` }">
          <!-- <view class="main-category-list">
            <scroll-view scroll-x>
              <view class="main-category-wrapper">
                <view class="item" :class="{ active: currentMainCategory === '全部' }">全部</view>
              </view>
            </scroll-view>
          </view> -->
          <view class="goods-list">
            <view class="sub-category-list" v-if="categoryList.length">
              <scroll-view scroll-y>
                <view class="sub-category-wrapper">
                  <view class="item" @click="handleChangeCategory(category.classifyId)"
                    :class="{ active: queryGoods.groupId === category.classifyId }" v-for="category in categoryList"
                    :key="category.classifyId">{{ category.classifyName
                    }}</view>
                </view>
              </scroll-view>
            </view>

            <view class="goods-wrapper">
              <view class="inner">
                <view class="wrapper" v-if="goodsList.length">
                  <BrandGoodsPane v-for="goods in goodsList" :key="goods.skuId + goods.shopName" :goods="goods">
                  </BrandGoodsPane>
                </view>
                <view class="loading" v-if="isLoading">
                  <div class="loader-inner ball-clip-rotate">
                    <div class="loader"></div>

                    <div>加载中...</div>
                  </div>
                </view>
                <view class="no-data" v-show="!isLoading && !goodsList.length">

                  <tui-icon margin="0 0 30upx 0" name="nodata" :size="32"></tui-icon>
                  暂无商品
                </view>
              </view>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <!-- 底部footer -->
    <view class="footer-container"
      :class="{ 'fade-in': factoryDetail && currentTabIndex === 0, 'fade-out': factoryDetail && currentTabIndex === 1 }">
      <view class="left-detail">
        <view class="logo">{{ factoryDetail.shopName.slice(0, 1) }}</view>
        <view class="name-wrapper">
          <view class="brand-name">{{ factoryDetail.shopName }}</view>
          <view class="tag">已认证</view>
        </view>
      </view>

      <button class="uni-btn call-btn" @click="handleCallBrand">
        <image class="call-icon" src="../../../static/images/new-index/brandFactory/all-icon.png"></image>
        电话咨询
      </button>
    </view>

    <tui-toast ref="toast"></tui-toast>
    <BeeWxShare ref="beeWxShareRef" @click="handleClickShare"></BeeWxShare>
  </view>
</template>

<script>
import BrandDetailHeader from './components/BrandDetailHeader.vue'
import BrandGallery from './components/BrandGallery.vue'
import BrandCard from './components/BrandCard.vue'
import BrandGoods from './components/BrandGoods.vue'
import BrandPerformance from './components/BrandPerformance.vue'
import BrandPane from './components/BrandPane.vue'
import BrandGoodsPane from './components/BrandGoodsPane.vue'
import CanvasPage from '../../../components/canvasShow/canvasShowPage.vue'
import { getFactoryDetailApi, getShopClassifyApi, getShopProductsApi, collectToCollectApi, getFactoryListApi, collectCancelApi, getCanvasApi } from '../../../api/anotherTFInterface'
import { A_TF_MAIN } from '../../../config'

export default {
  components: {
    BrandDetailHeader,
    BrandGallery,
    BrandCard,
    BrandGoods,
    BrandPerformance,
    BrandPane,
    BrandGoodsPane,
		CanvasPage
  },

  data() {
    return {
      factoryDetail: null,
      currentTabIndex: 0, // 详情面板
      scrollViewHeight: 0, //商品分类的容器高度
      currentMainCategory: '全部',  // 二级分类
      categoryList: [], // 商家分类
      queryGoods: {
        shopId: "",
        ifNew: '',
        type: '',
        volume: '',
        page: 1,
        pageSize: 20,
        groupId: ''
      },
			componentsData: null,
			terminal: getApp().globalData.terminal,
      goodsList: [],
      totalGoodsCount: 0,
      goodsMap: new Map(),
      recommendBrandList: [],
      isLoading: false,
      topGoods: [],
      bottomGoods: []
    }
  },

  onLoad(params) {
    this.queryGoods.shopId = params.id
    this.getFactoryDetail()
    this.getCategoryList()
    this.getRecommendBrand(params.id)
    this.getAllGoods(params.id)
		getCanvasApi({ terminal: this.terminal, type: 3, shopId: this.queryGoods.shopId }).then((res) => {
			if (JSON.stringify(res.data) !== '{}') {
				this.componentsData = JSON.parse(res.data.json)
			} else {
				this.componentsData = []
			}
		})
  },

  methods: {
    // 切换tab
    handleChangeTab(newTabIndex) {
      if (newTabIndex !== this.currentTabIndex) {
        this.currentTabIndex = newTabIndex
      }
    },

    // 切换分类
    handleChangeCategory(classifyId) {
      if (this.queryGoods.groupId != classifyId) {
        this.queryGoods.groupId = classifyId
        this.goodsList = []
        this.totalGoodsCount = 0
        this.getGoodsList()
      }
    },

    // 设置categoryList的高度
    handleSetSctollViewHeight(height) {
      if (!this.scrollViewHeight) {
        this.scrollViewHeight = height
      }
    },

    // 获取品牌工厂详情
    async getFactoryDetail(isRefresh = false) {
      const res = await getFactoryDetailApi({
        shopId: this.queryGoods.shopId
      })

      this.factoryDetail = res.data

      if (!isRefresh) {
        this.$nextTick(() => {
          this.handleClickShare(true)
        })
      }
    },


    // 查询品牌工厂分类
    async getCategoryList() {
      const res = await getShopClassifyApi({
        shopId: this.queryGoods.shopId
      })
      this.categoryList = res.data || []
      if (this.categoryList.length) {
        this.queryGoods.groupId = this.categoryList[0].classifyId
        this.getGoodsList()
      }
    },

    // 查询分类下的商品
    async getGoodsList(isPull = false) {
      this.isLoading = true
      try {
        const cacheGoodsObj = this.goodsMap.get(this.queryGoods.groupId)
        if (cacheGoodsObj && !isPull && cacheGoodsObj.goodsList.length) {
          this.goodsList = cacheGoodsObj.goodsList
          this.totalGoodsCount = cacheGoodsObj.totalGoodsCount
        } else {
          const res = await getShopProductsApi(this.queryGoods)
          this.goodsList = res.data.page && res.data.page.list ? [...this.goodsList, ...res.data.page.list] : []
          this.totalGoodsCount = res.data.page && res.data.page ? res.data.page.total : 0
          this.goodsMap.set(this.queryGoods.groupId, {
            goodsList: this.goodsList,
            totalGoodsCount: this.totalGoodsCount
          })
        }
      } finally {
        this.isLoading = false
      }
    },

    // 查询所有商品
    async getAllGoods(shopId) {
      const res = await getShopProductsApi({
        shopId,
        page: 1,
        pageSize: 20
      })

      const goodsList = res.data.page && res.data.page.list ? res.data.page.list.slice(0, 14) : []
      if (goodsList.length > 14) {
        this.topGoods = goodsList.slice(0, 7)
        this.bottomGoods = goodsList.slice(7)
      } else {
        this.topGoods = goodsList
      }


      this.totalGoodsCount = res.data.page && res.data.page.total ? res.data.page.total : 0
    },

    // 获取推荐商家
    async getRecommendBrand(currentClassifyId) {
      const res = await getFactoryListApi({
        page: 1,
        pageSize: 20
      })

      if (res.data && res.data.list.length) {
        this.recommendBrandList = res.data.list.filter(item => {
          return item.classifyId != currentClassifyId
        })
      }
    },

    // 关注门店
    async handleFollowFactory() {
      const ifCollect = this.factoryDetail.ifCollect
      try {
        uni.showLoading()
        const collectApi = !ifCollect ? collectToCollectApi : collectCancelApi
        const res = await collectApi({
          shopId: this.factoryDetail.id
        })

        if (res.code == '200') {
          this.ttoast(!ifCollect ? "收藏成功" : '取消收藏成功')
          this.getFactoryDetail(true)
        }
      } finally {
        uni.hideLoading();
      }
    },

    // 分享
    async handleClickShare(isQuit = false) {
      try {
        const data = {
          data: {
            title: this.factoryDetail.shopName,
            desc: this.factoryDetail.label || this.factoryDetail.shopBrief || this.factoryDetail.shopAdress,
            link: `${A_TF_MAIN}/#/pages/index/BrandFactory/detail?id=${this.factoryDetail.shopId}`,
            imageUrl: this.factoryDetail.advertisement ? this.factoryDetail.advertisement.split(',')[0] : 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/8stwtn8hbay7amo0u6hb.png'
          },
          successCb: () => { },
          failCb: () => { }
        };
        await this.$refs.beeWxShareRef.share(data, isQuit);
      } catch (error) {
        console.log("分享报错了", error);
      }
    },

    // 点击打电话
    handleCallBrand() {
      uni.makePhoneCall({
        phoneNumber: '18027679114',
        fail: () => {
          this.ttoast({
            type: 'fail',
            title: '操作失败'
          });
        }
      });
    }
  },
}
</script>

<style lang="less" scoped>
.brand-detail-container {
  .swipper-container {
    width: 100vw;
    height: 100vh;

    .swiper-item-container {
      width: 100vw !important;
      min-height: 100vh !important;
      overflow: auto;
      background: #EFF3F6;

      &.brand-detail-info {
        .brand-detail-info-main {
          padding: 40upx 25upx;
          box-sizing: border-box;
        }

      }
    }
  }

  .brand-description {
    padding: 36upx 30upx 33upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20upx;
    margin-top: 24upx;

    .title {
      font-size: 32upx;
      color: #222229;
      font-weight: 500;
    }


    .tag {
      display: inline-flex;
      font-size: 28upx;
      color: #EF530E;
      background-color: #FBF4F4;
      line-height: 1.5;
      padding: 9upx 24upx;
      border-radius: 100px;
      margin: 40upx 0 16upx 0;
    }

    .more-wrapper {
      text-align: center;
      margin-top: 18upx;

      .more-icon {
        width: 32upx;
        height: 32upx;
      }
    }

    .desc-text {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      color: #222229;
      font-size: 30upx;
      line-height: 1.5;

      &.empty {
        color: #ccc;
        font-size: 24upx;
        height: 100upx;
        text-align: center;
        line-height: 100upx;
        letter-spacing: 0.3em;
      }
    }
  }

  .brand-recommend-containter {
    .brand-list {
      padding: 36upx 18upx;
      background-color: #fff;
      margin-bottom: 170upx;

    }
  }


  .goods-category-container {
    padding-top: 44upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    // .main-category-list {
    //   width: 100%;
    //   height: 88upx;
    //   background-color: #fff;
    //   padding: 24upx;
    //   box-sizing: border-box;


    //   .main-category-wrapper {
    //     display: flex;
    //     align-items: center;
    //     white-space: nowrap;

    //     .item {
    //       margin-right: 52upx;
    //       font-size: 28upx;
    //       color: #222229;

    //       &.active {
    //         color: #EF530E;
    //       }
    //     }
    //   }
    // }

    .goods-list {
      width: 100%;
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;


      .sub-category-list {
        width: 156upx;
        height: 100%;
        background-color: #fff;
        overflow: auto;

        .sub-category-wrapper {
          .item {
            position: relative;
            width: 156upx;
            height: 88upx;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24upx;
            color: #888889;
            box-sizing: border-box;

            &::after {
              content: '';
              display: block;
              position: absolute;
              width: 4upx;
              height: 43upx;
              background-color: transparent;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              transition: all 350ms;
            }

            &.active {
              // background-color: #fff;
              color: #185BCC;

              &::after {
                background-color: #185BCC;


              }
            }
          }
        }
      }

      .goods-wrapper {
        flex: 1;
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 24upx;
        box-sizing: border-box;
        overflow: auto;


        .inner {
          position: relative;
          background-color: #fff;

          .loading {
            width: 100%;
            height: 500upx;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;

            .ball-clip-rotate {
              font-size: 28upx;
              color: #EF530E;
              text-align: center;

              .loader {
                background-color: #fff;
                width: 15px;
                height: 15px;
                border-radius: 100%;
                margin: 2px;
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
                border: 2px solid #EF530E;
                border-bottom-color: transparent;
                height: 25px;
                width: 25px;
                background: transparent !important;
                display: inline-block;
                -webkit-animation: rotate 0.75s 0s linear infinite;
                animation: rotate 0.75s 0s linear infinite;
                margin-bottom: 20upx;
              }
            }

            @keyframes rotate {
              0% {
                -webkit-transform: rotate(0deg) scale(1);
                transform: rotate(0deg) scale(1);
              }

              50% {
                -webkit-transform: rotate(180deg) scale(0.6);
                transform: rotate(180deg) scale(0.6);
              }

              100% {
                -webkit-transform: rotate(360deg) scale(1);
                transform: rotate(360deg) scale(1);
              }
            }
          }
        }

        .no-data {
          width: 100%;
          height: 500upx;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-size: 28upx;
          color: #ccc;
          letter-spacing: 0.4em;
        }

        .wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;



        }
      }
    }
  }

  .footer-container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 150upx;
    background-color: rgb(255, 255, 255);
    width: 100vw;
    padding: 20upx 50upx 40upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    opacity: 1;
    will-change: opacity;
    transition: opacity 150ms, translateY 1s;

    &.fade-in {
      opacity: 1;
    }

    &.fade-out {
      display: none;
      opacity: 0;
    }

    .left-detail {
      display: flex;
      align-items: center;

      .logo {
        width: 88upx;
        height: 88upx;
        flex-shrink: 0;
        border-radius: 100px;
        background-color: #EF530E;
        color: #fff;
        font-size: 42upx;
        font-weight: block;
        text-align: center;
        line-height: 88upx;
        margin-right: 14upx;
      }

      .name-wrapper {
        font-size: 32upx;
        font-weight: 500;
        white-space: nowrap;
        width: 222upx;
        overflow: hidden;
        text-overflow: ellipsis;

        .tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 12upx;
          line-height: 1.5;
          padding: 1upx 8upx;
          background: linear-gradient(90deg, #F1E5C9 0%, #F8DBB0 100%);
          font-size: 24upx;
          color: #533406;
          border-radius: 4upx;
        }
      }
    }

    .call-btn {
      width: 284upx;
      height: 88upx;
      background-color: #EF530E;
      border-radius: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32upx;
      font-weight: 500;
      color: #fff;
      font-weight: 500;
      transition: all 350ms;

      &:active {
        opacity: 0.5;
      }

      .call-icon {
        width: 48upx;
        height: 48upx;
        flex-shrink: 0;
        margin-right: 12upx;
      }
    }
  }
}
</style>