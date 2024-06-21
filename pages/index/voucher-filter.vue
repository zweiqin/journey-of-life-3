<template>
  <view class="voucher-detail tui-skeleton">
    <view class="page-haeder">
			<tui-icon name="arrowleft" :size="60" unit="upx" margin="0" color="#222229" bold @click="go('/pages/index/voucher-zone')"></tui-icon>
      <view class="search-container">
        <input type="text" class="input" v-model="searchValue" placeholder="请输入您想搜索的商品名称">
        <button @click="handleSearch" class="uni-btn">搜索</button>
      </view>
    </view>
    <view class="main-menus-conatainer tui-skeleton">
      <scroll-view scroll-x :scroll-into-view="animateId" scroll-with-animation>
        <view class="wrapper">
          <view class="item" :class="{ active: currentFilterCategoryId == item.classifyId }"
            @click="handleClickOnceMenuItem(item)" v-for="item in categoryList" :key="item.classifyId"
            :id="`item_${item.classifyId}`">
            <image :src="common.seamingImgUrl(item.classifyImage)" mode="" />
            <text>{{ item.classifyName }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <div class="filter-container">
      <view class="filter-item" @click="handleFilter(item, index)"
        :class="{ active: item.name == currentFilterInfo.name }" v-for="(item, index) in  filters " :key="index">
        {{ item.name }}
        <view class="sort" v-if="item.children">
          <tui-icon :color="$data._query[item.key] === 1 && currentFilterInfo.name === item.name ? '#f40' : '#ccc'"
            class="top" :size="20" name="turningup"></tui-icon>
          <tui-icon :color="$data._query[item.key] === 2 && currentFilterInfo.name === item.name ? '#f40' : '#ccc'"
            class="bottom" :size="20" name="turningdown"></tui-icon>
        </view>
      </view>
    </div>

    <view class="goods-list">
      <!-- <VoucherDeatilGoodsPane v-for="item in $data._list" :key="item.id" :goodsInfo="item"></VoucherDeatilGoodsPane> -->

      <view class="goods-wrapper">
        <view class="goods-item"
          @click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
          v-for=" item  in  $data._list " :key="item.id">
          <tui-lazyload-img :style="{ background: `url(${common.seamingImgUrl(item.image)})`, margin: 0 }" mode="aspectFit"
            :src="common.seamingImgUrl(item.image)"></tui-lazyload-img>
          <view class="goods-info">
            <view class="goods-name">{{ item.productName }}</view>
            <view class="price">￥{{ item.price }} <text v-if="item.originalPrice" class="origin-price">￥{{
              item.originalPrice }}</text> </view>
						<view style="display: flex;align-items: center;flex-wrap: wrap;">
							<view
								v-if="item.voucherId && item.voucherPrice"
								style="width: fit-content;max-width: 268rpx;padding: 2rpx 8rpx;margin: 10rpx 6rpx 0 0;color: #E24747;font-size: 26rpx;border: 1rpx solid #e247478c;border-radius: 8rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
							>
								可使用{{ item.voucherPrice }}代金券抵扣
							</view>
							<view
								v-if="item.presenterVoucher"
								style="width: fit-content;max-width: 268rpx;padding: 2rpx 8rpx;margin: 10rpx 6rpx 0 0;color: #E24747;font-size: 26rpx;border: 1rpx solid #e247478c;border-radius: 8rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
							>
								赠送 {{ item.presenterVoucher }} 代金券
							</view>
						</view>
          </view>
        </view>
      </view>
      <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>
      <view v-if="!$data._list.length && $data._status == 'none'" class="no-data"
        style="width: 100%; height: 400upx; display: flex; align-items: center; justify-content: center; flex-direction: column; font-size: 28upx; color: #ccc;">
        <tui-icon :size="50" name="nodata"></tui-icon>
        <view style="margin-top: 20upx; letter-spacing: 0.3em; color: rgb(153, 153, 153);">
          暂无商品~
        </view>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
    <PageLoading v-if="isPageLoading"></PageLoading>
  </view>
</template>

<script>
import loadMore from '../../mixin/loadMore'
import VoucherDeatilGoodsPane from './cpns/VoucherDeatilGoodsPane.vue'
import { getFirstClassifyApi, getClaasifyProductsApi } from '@/api/anotherTFInterface';
import PageLoading from '../order/components/Loading.vue'

export default {
  components: {
    VoucherDeatilGoodsPane,
    PageLoading
  },
  data() {
    return {
      currentCategoryId: '',
      currentFilterCategoryId: '',
      categoryList: [],
      filters: [
        { name: '默认', key: 'default' },
        { name: '价格', children: [{ name: '升序', value: 1 }, { name: '降序', value: 2 }], key: 'type' },
        { name: '销量', children: [{ name: '升序', value: 1 }, { name: '降序', value: 2 }], key: 'volume' },
      ],
      currentFilterInfo: {
        name: '默认',
        value: null
      },
      searchValue: '',
      isPageLoading: false
    }
  },

  mixins: [loadMore({
    api: getClaasifyProductsApi,
    mapKey: { totalPages: "total", list: "list", size: "pageSize", page: 'page' }
  })],

  onLoad(params) {
    this.isPageLoading = true
    setTimeout(() => {
      this.currentCategoryId = params.categoryId
      this.setCategoryList()
    }, 500);


  },

  methods: {
    handleClickOnceMenuItem(categoryInfo) {
      this.currentFilterCategoryId = categoryInfo.classifyId * 1
      this.currentFilterInfo = {
        name: '默认',
        value: null
      }
      this.searchValue = ''
      this.$data._query.productName = ''
      this.$data._query.page = 1
      this.getData()
    },
    getData() {
      this.$data._list = []
      this.$data._query.classifyId = this.currentFilterCategoryId
      this.$data._query.type = 1
      this.$data._query.volume = 1
      this._loadData()
    },

    async setCategoryList() {
      const res = await getFirstClassifyApi({
        classifyId: '822'
      })

      if (res.data) {
        const currentCategoryList = res.data.find(item => {
          return item.classifyId == this.currentCategoryId
        })

        if (currentCategoryList) {
          this.categoryList = currentCategoryList.childs
          this.currentFilterCategoryId = this.categoryList[0].classifyId
          this.isPageLoading = false
          this.getData()
        }
      }

    },

    // 点筛选
    handleFilter(filterInfo) {
      if (filterInfo.children) {
        if (this.currentFilterInfo.name === filterInfo.name) {
          this.$data._query[filterInfo.key] = this.$data._query[filterInfo.key] === 1 ? 2 : 1
        } else {
          this.$data._query[filterInfo.key] = 1
        }
      } else {
        this.$data._query.type = 1
        this.$data._query.volume = 1
      }

      this.currentFilterInfo.name = filterInfo.name
      this._loadData()
    },

    // 点击搜索
    handleSearch() {
      if (!this.searchValue) {
        this.ttoast({
          type: "info",
          title: "请输入搜索关键字"
        })

        return
      }

      this.$data._query.productName = this.searchValue
      this._loadData()
    }
  },

  computed: {
    animateId() {
      return `item_${this.currentFilterCategoryId}`
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .uni-scroll-view::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

/deep/ .tui-lazyload__box {
  position: relative;
  width: 340upx !important;
  height: 340upx !important;
  border-radius: 20upx 20upx 0 0 !important;
  overflow: hidden;
  z-index: 10;
  margin-right: 19upx;

  .tui-lazyload__img {
    width: 340upx !important;
    height: 340upx !important;
  }
}

/deep/ .uni-scroll-view {
  background-color: #f3f3f3;
  padding: 0 10upx;
  box-sizing: border-box;
}

.voucher-detail {
  min-height: 100vh;
  background: #f3f3f3;
}

.page-haeder {
  width: 100vw;
  display: flex;
  align-items: center;
  height: 128upx;
  background-color: #fff;
  padding: 28upx 30upx 28rpx 14rpx;
  box-sizing: border-box;

  .search-container {
    height: 72upx;
    flex: 1;
    border: 1upx solid #EF5511;
    border-radius: 100px;
    display: flex;
    align-items: center;
    padding: 14upx 10upx 14upx 30upx;
    box-sizing: border-box;

    .input {
      flex: 1;
      font-size: 24upx;
    }


    .uni-btn {
      height: 54upx;
      width: 112upx;
      display: flex;
      justify-content: center;
      background: linear-gradient(270deg, #EF530E 0%, #EE6C33 100%);
      color: #fff;
      align-items: center;
      border-radius: 100px;
      font-size: 28upx;
    }
  }
}

.main-menus-conatainer {
  // padding: 20upx;
  position: relative;
  z-index: 100000000000;
  background-color: #fff;

  .wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 20upx 0;
  }
}

.item {
  width: 150upx;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20upx 10upx;
  color: #000000;
  margin-right: 20upx;
  transition: transform 350ms;
  border-radius: 4px;
  font-size: 24upx;
  box-sizing: border-box;

  image {
    width: 120upx;
    height: 120upx;
    object-fit: cover;
    margin-bottom: 10upx;
  }

  &.active {
    border: 1upx solid #e95d20;
  }
}

.goods-list {
  padding: 20upx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #f3f3f3;

  .goods-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    .goods-item {
      font-size: 0;
      border-radius: 0 0 20upx 20upx;
      overflow: hidden;
      margin-bottom: 30upx;
      height: 582upx;
      background-color: #fff;

      .goods-info {
        width: 340upx;
        background-color: #fff;
        padding: 20upx;
        box-sizing: border-box;

        .goods-name {
          font-size: 28upx;
          // font-weight: 500;
          width: 300upx;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-height: 1.5;
          margin-bottom: 20upx;
        }

        .price {
          font-size: 32upx;
          font-weight: 500;
          color: #EF5511;

          .origin-price {
            font-size: 28upx;
            color: #ccc;
            text-decoration: line-through;
            margin-left: 20upx;
          }
        }

        .voucher-num {
          padding: 4upx 10upx;
          font-size: 24upx;
          color: #EF5511;
          // border: 1upx solid #EF5511;
          background-color: #f3f3f3;
          display: inline-flex;
          border-radius: 0 100px 100px 0;
          margin-top: 10upx;
        }
      }


    }

  }
}

.filter-container {
  background-color: #fff;
  width: 100vw;
  height: 80upx;
  display: flex;

  .filter-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28upx;
    position: relative;
    width: 140upx;

    &:nth-child(3) {
      text-align: center;
    }

    &:nth-child(2) {
      text-align: center;
    }

    &.active {
      color: #ef530e;
    }


    .sort {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 56upx;

      .top,
      .bottom {
        position: relative;
      }

      .top {
        top: 12upx;
      }

      .bottom {
        top: -12upx;
      }
    }
  }
}
</style>