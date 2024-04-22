<template>
  <view class="strict-materials-container">
    <Search :scrollTop="$data._scrollTop" @change="handleSwitchTab" :current="currentMenu" @search="handleSearch"
      isCustorm>
      <scroll-view scroll-x="true">
        <view class="menus">
          <view @click="handleSwitchTab(item)" class="item" :class="{ active: currentMenu == item.id }"
            v-for="item in menus" :key="item.id">
            {{ item.materialCityName }}</view>
        </view>
      </scroll-view>
    </Search>

    <view class="image-wrapper" :style="{ background: `url(${common.seamingImgUrl('1712992983926-brand-bg.png')}) no-repeat center top/cover` }">
      {{ currentCompany }}
    </view>

    <view class="goods-title" v-if="!(!$data._list.length && $data._status !== 'loading')"> · 优质商户 · </view>

    <view class="goods-list">
      <!-- <StuffGoods v-for="item in goodsList" :key="item.id" :data="item"></StuffGoods> -->
      <BrandPane v-for="brand in $data._list" :key="brand.id" :data="brand"></BrandPane>
      <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>
    </view>

    <view v-show="!$data._list.length && $data._status !== 'loading'" class="no-data">
      {{ serachValue ? '暂无门店' : '该地区暂未开通' }}
    </view>
  </view>
</template>

<script>
import Search from '../cpns/Search'
import { getStuffBrandListApi, getBrandListBySelectApi } from '../../api/brand'
import loadMore from '../../mixin/loadMore'
import BrandPane from '../brand-materials/BrandPane.vue'

export default {
  components: {
    Search,
    BrandPane
  },

  mixins: [loadMore({
    api: getBrandListBySelectApi,
    mapKey: { totalPages: "totalPages", list: "brandList", size: "limit" }
  })],

  data() {
    return {
      currentMenu: 1,
      currentCompany: '亚洲国际材料城',
      menus: [],
      serachValue: ''
    }
  },

  mounted() {
    this.getStuffBrandList()
    this.$set(this.$data._query, 'labelId', 2)
    this._loadData()
  },

  methods: {
    handleSwitchTab(item) {
      this.currentMenu = item.id
      this.$data._query.materialCityId = item.id
      this.currentCompany = item.materialCityName
      this.$data._query.page = 1
      this._loadData()
    },


    // 搜索
    handleSearch(serachValue) {
      this.serachValue = serachValue
      if (serachValue) {
        this.$data._query.page = 1
        this.$data._query.name = serachValue
        this._loadData()
      }
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
}
</script>

<style lang="scss" scoped>
/deep/ .brand-pane-container {
  width: 100%;
}

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

.no-data {
  color: #ccc;
  width: 100%;
  height: 400upx;
  text-align: center;
  line-height: 400upx;
  font-size: 32upx;
}
</style>
