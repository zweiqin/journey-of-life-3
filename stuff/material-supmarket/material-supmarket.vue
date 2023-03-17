<template>
  <view class="strict-materials-container">
    <Search
      :scrollTop="scrollTop"
      @change="handleSwitchTab"
      :current="currentMenu"
      @search="handleSearch"
    ></Search>

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

export default {
  components: {
    Search,
    StuffGoods,
  },

  data() {
    return {
      scrollTop: 0,
      currentMenu:-100,
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
    }
  },

  mounted() {
    this.getGoodsList()
  },

  methods: {
    handleSwitchTab(id) {
      this.currentMenu = id
      if (!id) {
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
</style>
