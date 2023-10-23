<template>
  <view class="hot-container">
    <view class="header">
      <image @click="handleBack" class="icon" src="../../static/images/common/back.png" mode="" />
			<TuanLocation>
				<text>{{ $store.getters.currentCity || '龙江镇' }}</text>
			</TuanLocation>
      <view class="search-wrapper" @click="go('/pages/search-page/search-page')">
        <image class="search-icon" src="../../static/images/index/search.png" mode="" />
        <text class="text">输入你想搜索的产品</text>
        <image class="camera" src="../../static/images/index/camera.png" mode="" />
      </view>
    </view>

    <view class="banner"></view>

    <view class="main">
      <Navs @click="handleChooseMenu"></Navs>

      <view class="goods-container" v-if="goodsList.length">
        <Goods v-for="goods in goodsList" :key="goods.id" :data="goods"></Goods>
      </view>

      <JNoData v-else type="namecard" width="300" text="暂无爆品"></JNoData>
    </view>
  </view>
</template>

<script>
import { goodsListApi } from '../../api/goods'
import Navs from './navs.vue'
import Goods from '../index/cpns/goods.vue'

export default {
  components: {
    Navs,
    Goods,
  },
  onLoad() {
    this.getGoods()
  },
  data() {
    return {
      query: {
        page: 1,
        size: 20,
        isHot: true,
        categoryId: null,
      },
      goodsList: [],
      total: 0,
      scrollTop: 0,
    }
  },

  methods: {
    handleBack() {
      uni.switchTab({
        url: '/pages/index/index',
      })
    },

    getGoods(isLoadMore) {
      uni.showLoading({
        title: '加载中',
      })
      goodsListApi(this.query).then(({ data }) => {
        console.log(data)
        if (isLoadMore) {
          this.goodsList.push(...data.goodsList)
        } else {
          this.goodsList = data.goodsList
        }
        this.total = data.totalPages

        uni.hideLoading()
      })
    },

    onReachBottom() {
      if (this.query.page >= this.totalPages) {
        this.status = 'no-more'
        return
      }

      this.query.page++
      this.getGoods(true)
    },

    handleChooseMenu(item) {
      console.log(item)
      this.query.categoryId = item.id
      this.query.page = 1
      this.getGoods()
    },
  },
}
</script>

<style lang="less">
.hot-container {
  .header {
    display: flex;
    align-items: center;
    padding: 32upx 32upx 20upx 32upx;
    box-sizing: border-box;
    background-color: #e95d20;

    .icon {
      width: 16upx;
      height: 28upx;
      margin-right: 10upx;
    }

    .local-wrapper {
      position: relative;
      margin-right: 20upx;

      &::after {
        content: '';
        border: 4px solid #ffffff;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
        position: absolute;
        top: 50%;
        right: -10px;
      }

      /deep/ .locale {
        color: rgb(255, 255, 255);
        font-size: 32upx;
        font-weight: 500;
      }
    }

    .chat {
      width: 33.2upx;
      height: 30upx;
      object-fit: cover;
    }

    .search-wrapper {
      flex: 1;
      background-color: #ffffff;
      height: 74upx;
      margin: 0 20upx;
      margin-right: 0;
      border-radius: 100px;
      padding: 0 26upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .search-icon {
        width: 26.6upx;
        height: 26.6upx;
      }

      .text {
        font-size: 24upx;
        color: #999999;
        margin-left: 20upx;
        padding-left: 20upx;
        border-left: 1upx solid #d8d8d8;
        flex: 1;
      }

      .camera {
        width: 33.2upx;
        height: 30upx;
        object-fit: cover;
      }
    }
  }

  .banner {
    position: relative;
    width: 100%;
    height: 308upx;
    background: url('../../static/images/index/hot-banner-page.png') no-repeat;
    background-size: cover;
    z-index: -1;
  }

  .main {
    background-color: #ffffff;
    width: 100%;
    // height: 300px;
    border-radius: 40upx;
    margin-top: -40upx;
    padding: 40upx 20upx;
    box-sizing: border-box;
  }

  .goods-container {
    padding: 30upx 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #ffffff;

    /deep/ .goods-image-wrapper {
      width: 350upx;
    }
  }
}
</style>
