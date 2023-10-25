<template>
  <view class="shop-page-conatiner">
    <TuanAppShim bg="transparent"></TuanAppShim>
    <PageHeader></PageHeader>

    <view class="main-area">
      <view class="navs">
        <view class="nav-wrapper">
          <view class="nav-item" @click="handleViewDetail(item)" v-for="item in homeTopNavs" :key="item.label">
            <image class="category-icon" :src="item.iconUrl"></image>
            <view class="category-name">{{ item.name }}</view>
          </view>
        </view>
	  <view class="package-wrapper">
		  <view class="voucher-container">
		    <VoucherPane></VoucherPane>
		  </view>
		  <view class="hot-container">
		    <HotPane :goodsData="ad.hot" subTitle="网红爆款">
		      <block slot="title">
		        <view class="hot">
		          <text class="text color-text">热销</text>
		          <text class="text">爆款</text>
		        </view>
		      </block>
		    </HotPane>
		
		    <HotPane :goodsData="ad.good" subTitle="抢新品">
		      <block slot="title">
		        <view class="hot">
		          <text class="text">好物推荐</text>
		        </view>
		      </block>
		    </HotPane>
		  </view>
		</view>
      </view>

      <view class="rest-area">

        <view class="main-sub-title">
          <view class="title">为您推荐</view>
          <view class="sub-title"> 有价值的实用好物 新生活新零售</view>
        </view>

        <scroll-view scroll-x>
          <view class="sub-list-container">
            <view class="sub-item" @click="handleFilterSubCategory(item)" :class="{ active: subCategoryId === item.id }" v-for="item in subCategoryList" :key="item.id">{{ item.name }}</view>
          </view>
        </scroll-view>

        <view class="goods-list">
          <NewGoodsPane v-for="item in $data._list.slice(4)" :goods="item" :key="item.id"> </NewGoodsPane>
          <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>
        </view>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import PageHeader from './cpns/PageHeader.vue';
import VoucherPane from './cpns/VoucherPane.vue';
import HotPane from './cpns/HotPane.vue';
import NewGoodsPane from './cpns/NewGoodsPane.vue';

import loadMore from '../../mixin/loadMore';
import { goodsListApi } from '../../api/goods';
import { getClassifyProducts2, getCanvas, getFirstClassify, getShopDetailsById, getSearchProducts } from '@/api/newTFInterface';
import { getGoodsTypesApi, getTypeDetailList } from '../../api/home';

import { homeTopNavs } from './config';
export default {
  components: {
    PageHeader,
    VoucherPane,
    HotPane,
    NewGoodsPane
  },

  mixins: [
    loadMore({
      api: goodsListApi,
      mapKey: { totalPages: 'totalPages', list: 'goodsList', size: 'size' },
      dataFn(goodsArr) {
        if (!this.ad.hot.length) {
          this.ad.hot.push(...goodsArr.slice(0, 2));
          this.ad.good.push(...goodsArr.slice(2, 4));
        }
        return goodsArr;
      }
    })
  ],

  data() {
    return {
      homeTopNavs: homeTopNavs,
      ad: {
        hot: [],
        good: []
      },
      categories: [],
      subCategoryList: [],
      subCategoryId: -1,
    };
  },

  onLoad(options) {
    this.$data._query.sort = 'voucher_amount';
    this.$data._query.order = 'desc';
    this._loadData();
    this.getCategoryList();
    // getClassifyProducts2({
    //   classifyId: '',
    //   type: '1',
    //   volume: '1',
    //   productName: '',
    //   page: 1,
    //   pageSize: 20
    // }).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
    getCanvas({
      terminal: 2,
      type: 1
    }).then(res => {
      console.log(JSON.parse(res.data.json))
    }).catch(err => {
      console.log(err)
    })
    
  },

  methods: {
    // handleViewDetail(navInfo) {
    //   if (navInfo.url) {
    //     uni.navigateTo({ url: navInfo.url });
    //   } else if (navInfo.id) {
    //     this.$data._query.categoryId = navInfo.id;
    //     this.$data._query.page = 1;
    //     this.$data._list = [];
    //     this.ad.hot = [];
    //     this.ad.good = [];
    //     this._loadData();
    //     this.getSubMenus(navInfo.id);
    //   } else {
    //     this.empty();
    //   }
    //   console.log(this.$data._list)
    // },
    handleViewDetail(navInfo) {
      if (navInfo.url) {
        uni.navigateTo({ url: navInfo.url });
      } else if (navInfo.id) {
        uni.navigateTo({
          url: `/pages/index/CommodityTypePage/index?id=${navInfo.id}`
        })
        // this.$data._query.categoryId = navInfo.id;
        // this.$data._query.page = 1;
        // this.$data._list = [];
        // this.ad.hot = [];
        // this.ad.good = [];
        // this._loadData();
        // this.getSubMenus(navInfo.id);
      } else {
        this.empty();
      }
    },

    async getCategoryList() {
      const res = await getGoodsTypesApi({
        // goodsType: 1
        goodsType: 100101741
      });

      if (res.errno === 0) {
        // const categories = res.data.categoryList.filter((item) => item.desc === '搜家具').slice(0, 7);
        const categories = res.data.categoryList.slice(0, 7);
        this.categories = categories;
        this.categories.push({
          iconUrl: require('@/static/images/index/moremore.png'),
          id: null,
          url: '/pages/furniture/furniture?goodsType=100101741&id=null',
          name: '更多'
        });

        this.homeTopNavs.length < 8 && this.homeTopNavs.push(...this.categories);
      }
    },

    async getSubMenus(id) {
      const res = await getTypeDetailList({ id });
      if (res.errno === 0) {
        this.subCategoryList = res.data.currentSubCategory;
        this.subCategoryList.unshift({ id: -1, name: '全部', pid: res.data.currentSubCategory[0].pid });
      }
    },

    handleFilterSubCategory(info) {
      this.$data._list = [];
      this.ad.hot = [];
      this.ad.good = [];
      this.$data._query.page = 1;
      this.$data._query.categoryId = info.id === -1 ? info.pid : info.id;
      this.subCategoryId = info.id;
      this._loadData();
    }
  }
};
</script>

<style lang="less" scoped>
.shop-page-conatiner {
  min-height: 100vh;
  background: linear-gradient(95deg, #ebebf5 47%, #f9e9f3 96%);

  .main-area {
    width: 100vw;
    // padding: 20upx 30upx;
    // box-sizing: border-box;
    background-color: #fff;
    border-radius: 30upx 30upx 0 0;

    .navs {
      border-radius: 30upx 30upx 0 0;
      // background: linear-gradient(180deg, #ffffff 0%, #eff3f6 100%);
      background-color: #fff;
      // height: 396upx;
      padding-bottom: 30upx;

      .nav-wrapper {
        padding: 13upx 30upx 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        .nav-item {
          width: 114upx;
          margin-right: 60upx;
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 24upx;

          &:nth-child(4n) {
            margin-right: 0;
          }

          .category-icon {
            width: 93upx;
            height: 93upx;
            margin-bottom: 12upx;
          }

          .category-name {
            color: #222229;
            font-size: 28upx;
          }
        }
      }
    }
	.package-wrapper {
    margin-top: 20rpx;
	  box-sizing: border-box;
	  padding: 0rpx 30rpx;
	  height: 514upx;
	  width: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	
	  .hot-container {
	    height: 100%;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    flex-direction: column;
	
	    .hot {
	      font-size: 0;
	      color: #222229;
	      font-size: 32upx;
	      font-weight: 500;
	
	      .color-text {
	        color: #ef530e;
	      }
	    }
	  }
	}
    .rest-area {
      // margin-top: 10rpx;
      box-sizing: border-box;
      padding: 0 28upx;
      padding-top: 10rpx;
      background-color: #eff3f6;
      // background-color: #fff;

      // .package-wrapper {
      //   height: 514upx;
      //   width: 100%;
      //   display: flex;
      //   align-items: center;
      //   justify-content: space-between;

      //   .hot-container {
      //     height: 100%;
      //     display: flex;
      //     align-items: center;
      //     justify-content: space-between;
      //     flex-direction: column;

      //     .hot {
      //       font-size: 0;
      //       color: #222229;
      //       font-size: 32upx;
      //       font-weight: 500;

      //       .color-text {
      //         color: #ef530e;
      //       }
      //     }
      //   }
      // }

      .main-sub-title {
        margin-top: 20rpx;
        display: flex;
        align-items: flex-end;
        font-size: 24upx;
        color: #222229;
        vertical-align: bottom;
        // margin: 24upx 0;

        .title {
          font-size: 32upx;
          font-weight: 700;
          margin-right: 6upx;
        }
      }

      .goods-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-bottom: 140upx;
        background-color: #eff3f6;
      }

      .sub-list-container {
        margin-top: 10rpx;
        display: flex;
        align-items: center;
        white-space: nowrap;
        margin-bottom: 20upx;

        .sub-item {
          font-size: 24upx;
          padding: 2upx 12upx;
          border: 1upx solid #777;
          border-radius: 6upx;
          margin-right: 20upx;
          color: #777;

          &.active {
            border-color: #ef530e;
            color: #ef530e;
          }
        }
      }
    }
  }
}
</style>
