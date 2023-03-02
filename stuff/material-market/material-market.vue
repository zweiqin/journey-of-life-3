<template>
  <view class="strict-materials-container">
    <Search
      :scrollTop="scrollTop"
      @change="handleSwitchTab"
      :current="currentMenu"
      @search="handleSearch"
      isCustorm
    >
      <scroll-view scroll-x="true">
        <view class="menus">
          <view
            @click="handleSwitchTab(item)"
            class="item"
            :class="{ active: currentMenu == item.id }"
            v-for="item in menus"
            :key="item.id"
          >
            {{ item.materialCityName }}</view
          >
        </view>
      </scroll-view>
    </Search>

    <view class="image-wrapper">
      {{ currentCompany }}
    </view>

    <view class="goods-title"> · 商户推荐 · </view>

    <view class="goods-list">
      <StuffGoods
        v-for="item in goodsList"
        :key="item.id"
        :data="item"
      ></StuffGoods>

      <LoadingMore v-show="status !== 'none'" :status="status"></LoadingMore>
    </view>
  </view>
</template>

<script>
import Search from '../cpns/Search'
import StuffGoods from '../../pages/stuff/cpns/StuffGoods'
import { goodsListApi } from '../../api/goods'
import { getStuffBrandListApi } from '../../api/brand'
import { menus } from './data'

export default {
  components: {
    Search,
    StuffGoods,
  },

  data() {
    return {
      scrollTop: 0,
      currentMenu: 1,
      goodsList: [],
      query: {
        goodsType: 2,
        page: 1,
        size: 20,
        categoryId: null,
        keyword: '',
      },
      totalPages: 0,
      status: 'none',
      menus: [],
      currentCompany: '亚洲国际材料城',
    }
  },

  mounted() {
    this.getGoodsList()
    this.getStuffBrandList()
  },

  methods: {
    handleSwitchTab(item) {
      this.currentMenu = item.id
      this.currentCompany = item.name
      if (!item.id) {
        this.query.categoryId = null
      }

      this.goodsList = []
      this.totalPages = 0
      this.getGoodsList()
    },

    // 获取商品列表
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

    // 搜索
    handleSearch(serachValue) {
      this.query.keyword = serachValue
      this.getGoodsList()
    },

    // 获取材料成数据
    async getStuffBrandList() {
      const { data } = await getStuffBrandListApi({
        page: 1,
        limit: 100,
      })

      this.menus = data.items
    },
  },

  onReachBottom() {
    if (this.query.page >= this.totalPages) {
      this.status = 'no-more'
      return
    }

    if (this.query.size > this.goodsList.length) {
      this.status = 'none'
      return
    }

    this.query.page++
    this.getGoodsList(true)
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
}
</script>

<style lang="scss" scoped>
.strict-materials-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f1f1f0;

  .goods-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20upx;
    box-sizing: border-box;
  }
}

.menus {
  display: flex;
  white-space: nowrap;
  margin: 32upx 0 38upx 0;

  .item {
    position: relative;
    margin-right: 40upx;
    line-height: 48upx;
    font-size: 28upx;
    color: #141000;
    transition: all 50ms;

    &::after {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      content: '';
      display: block;
      width: 0;
      height: 8upx;
      background-color: #ffc117;
      border-radius: 100px;
      transition: all 350ms;
    }

    &.active {
      font-size: 34upx;
      line-height: 52upx;
      font-weight: bold;

      &::after {
        width: 40upx;
      }
    }
  }
}

.image-wrapper {
  width: 710upx;
  height: 200upx;
  background: url('../../static/images/new-brand/index/brand-bg.png') no-repeat;
  background-size: cover;
  border-radius: 16upx;
  margin: 20upx auto;
  color: #fff;
  font-size: 52upx;
  text-align: center;
  line-height: 200upx;
  font-weight: bold;
}

.goods-title {
  text-align: center;
  line-height: 60upx;
  font-size: 34upx;
  color: #141000;
  font-weight: bold;
}
</style>
