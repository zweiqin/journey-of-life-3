<template>
  <view class="stuff-container">
    <HeaderTop></HeaderTop>

    <view class="main">
      <MianMenu></MianMenu>
      <image
        src="../../static/images/new-brand/index/top-banner.png"
        class="top-banner"
        mode=""
      />

      <Pane></Pane>
      <Carousel
        :height="100"
        :list="[
          require('../../static/images/new-brand/index/middle-banner.png'),
        ]"
      ></Carousel>

      <view class="goods-wrapper">
        <!-- <view class="title">· 品牌材料企业推荐 ·</view>
        <view class="goods-container">
          <StuffGoods
            v-for="item in goodsList"
            :key="item.id"
            :data="item"
          ></StuffGoods>
          <LoadingMore
            v-show="status !== 'none'"
            :status="status"
          ></LoadingMore>
        </view> -->

        <BrandPane
          v-for="item in brandList"
          :key="item.brand.id"
          :data="item"
        ></BrandPane>

        <LoadingMore v-show="status !== 'none'" :status="status"></LoadingMore>
      </view>
    </view>
  </view>
</template>

<script>
import HeaderTop from './cpns/HeaderTop/index.vue'
import MianMenu from './cpns/MainMenu'
import Pane from './cpns/Pane'
import Carousel from '../../components/carousel'
import StuffGoods from './cpns/StuffGoods'
import { goodsListApi } from '../../api/goods'
import BrandPane from '../../stuff/brand-materials/BrandPane.vue'
import { getBrandListBySelectApi } from '../../api/brand'

export default {
  components: {
    HeaderTop,
    MianMenu,
    Pane,
    Carousel,
    StuffGoods,
    BrandPane,
  },

  data() {
    return {
      goodsList: [],
      query: {
        goodsType: 2,
        page: 1,
        size: 20,
        categoryId: 100101502,
      },
      totalPages: 0,
      status: 'none',

      brandList: [],
      brandQuery: {
        page: 1,
        limit: 20,
      },
      totalBrandPages: 0,
    }
  },

  onLoad() {
    this.getGoodsList()
    this.getBrandListBySelect()
  },

  methods: {
    async getGoodsList(isLoadMore) {
      this.status = 'loading'
      const { data } = await goodsListApi(this.query)
      this.totalPages = data.totalPages
      if (isLoadMore) {
        this.goodsList.push(...data.goodsList)
      } else {
        this.goodsList = data.goodsList
      }

      this.status = 'none'
    },

    async getBrandListBySelect(isLoadMore) {
      const { data } = await getBrandListBySelectApi({
        ...this.brandQuery,
        labelId: 2,
      })
      console.log(data)
      if (isLoadMore) {
        this.brandList.push(...data.brandList)
      } else {
        this.brandList = data.brandList
      }
      this.totalBrandPages = data.totalPages
    },
  },

  onReachBottom() {
    // if (this.query.page >= this.totalPages) {
    //   this.status = 'no-more'
    //   return
    // }

    // if (this.query.size > this.goodsList.length) {
    //   this.status = 'none'
    //   return
    // }

    // this.query.page++
    // this.getGoodsList(true)

    if (this.brandQuery.page >= this.totalBrandPages) {
      this.status = 'no-more'
      return
    }

    if (this.brandQuery.limit > this.brandList.length) {
      this.status = 'none'
      return
    }

    this.brandQuery.page++
    this.getBrandListBySelect(true)
  },
}
</script>

<style lang="less" scoped>
.stuff-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f1f1f0;
  padding-bottom: 100upx;

  .main {
    margin-top: -184upx;
    padding: 20upx;
    box-sizing: border-box;

    .top-banner {
      width: 100%;
      height: 200upx;
      border-radius: 24upx;
      margin: 20upx 0;
    }

    /deep/ .uni-swiper-dot {
      width: 16upx !important;
      height: 16upx !important;
      background-color: #f1f1f0;
      border-radius: 100px;
      border: 1upx solid #fff;
    }

    /deep/ .uni-swiper-dot-active {
      width: 16upx !important;
      height: 16upx !important;
      background-color: #ffc117 !important;
    }

    /deep/ .uni-swiper-dots-horizontal {
      bottom: 20upx !important;
    }

    .goods-wrapper {
      margin-top: 30upx;
      .title {
        margin: 30upx 0 24upx 0;
        color: #141000;
        font-size: 34upx;
        font-weight: bold;
        text-align: center;
        line-height: 52upx;
      }

      .goods-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
