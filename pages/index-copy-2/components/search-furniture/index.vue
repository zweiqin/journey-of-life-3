<template>
  <view class="search-fe-container">
    <view class="nav-container">
      <view class="navs" v-for="item in 2" :key="item">
        <view
          @click="handleToFilter(item)"
          class="nav-item"
          v-for="item in item == 1
            ? categories.slice(0, 4)
            : categories.slice(4)"
          :key="item.id"
        >
          <image :src="item.iconUrl" mode="" />
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>

    <view class="banner-container">
      <view
        class="item"
        v-for="(item, index) in bannerConfig"
        :key="index"
        @click="handelTo(item)"
      >
        <image class="banner-icon" :src="item.icon" mode="" />
        <view class="right-wrapper">
          <image :src="item.title" class="banner-titme-icon" mode="" />
          <text class="desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>

    <scroll-view scroll-y="true" @scrolltolower="handleClick">
      <view class="goods-container">
        <load-after v-if="!searchGoodsList.length"></load-after>
        <Goods
          :data="goods"
          v-for="goods in searchGoodsList"
          :key="goods.id"
        ></Goods>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { bannerConfig, defaultCategoryConfig } from './config'
import { getGoodsTypesApi } from '../../../../api/home'
import { goodsListApi } from '../../../../api/goods'

import Goods from './goods.vue'
export default {
  components: {
    Goods,
  },
  data() {
    return {
      bannerConfig,
      categories: defaultCategoryConfig,
      // 分页数据
      queryInfo: {
        page: 1,
        size: 20,
      },
      totalPages: 0,
      searchGoodsList: [],
    }
  },

  mounted() {
    this.getCategoryList()
    this.getGoodsList()
  },

  methods: {
    handleClick() {
      console.log(1)
    },

    // 获取类目信息
    async getCategoryList() {
      const res = await getGoodsTypesApi({
        goodsType: 1,
      })

      if (res.errno === 0) {
        const categories = res.data.categoryList
          .filter(item => item.desc === '搜家具')
          .slice(0, 7)
        this.categories = categories
        this.categories.push({
          iconUrl:
            'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/spxullhqon4up3jk6g03.png',
          id: null,
          name: '更多',
        })
      }
    },

    // 跳转到筛选
    handleToFilter(item) {
      if (item.id) {
        uni.navigateTo({
          url: `/pages/goods-filter/goods-filter?id=${item.id}`,
        })
      } else {
        uni.navigateTo({
          url: `/pages/furniture/furniture?id=${item.id}`,
        })
      }
    },

    async getGoodsList(isLoadmore) {
      uni.showLoading()
      const res = await goodsListApi({ ...this.queryInfo })
      if (res.errno === 0) {
        this.totalPages = res.data.totalPages

        if (isLoadmore) {
          this.searchGoodsList.push(...res.data.goodsList)
        } else {
          this.searchGoodsList = res.data.goodsList
        }
        uni.hideLoading()
      } else {
        uni.hideLoading()
        uni.showToast({
          title: res.errmsg,
        })
      }
    },

    reachBottom() {
      if (this.totalPages <= this.queryInfo.page) {
        return 'no-more'
      }

      if (this.searchGoodsList.length < this.queryInfo.size) {
        return 'lack'
      }

      this.queryInfo.page++
      this.getGoodsList(true)
    },

    handelTo(item) {
      if (!item.url) {
        this.empty()
      } else {
        uni.navigateTo({
          url: item.url,
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.nav-container {
  margin: 10upx 0 20upx 0;
}
.navs {
  display: flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 18upx 26upx;
  box-sizing: border-box;

  .nav-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text {
      font-size: 28upx;
      color: #3d3d3d;
    }

    image {
      height: 80upx;
      width: 110upx;
      object-fit: cover;
    }
  }
}

.banner-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  padding: 20upx 0;

  .item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
    padding-left: 48upx;
    box-sizing: border-box;

    &:nth-child(1) {
      border-right: 2px solid #d8d8d8;
    }
  }

  .right-wrapper {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  .banner-icon {
    width: 63.14upx;
    height: 74.28upx;
    object-fit: cover;
    margin-right: 22upx;
  }

  .banner-titme-icon {
    width: 118upx;
    height: 34upx;
  }

  .desc {
    color: #777;
    font-size: 20upx;
    margin-top: 10upx;
  }
}

.goods-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20upx;
  box-sizing: border-box;
}
</style>
