<template>
  <view class="search-furniture-container">
    <view class="nav-container">
      <view class="navs" v-for="item in 2" :key="item">
        <view @click="handleToFilter(item)" class="nav-item" v-for="item in item == 1 ? categories.slice(0, 4) : categories.slice(4)" :key="item.id">
          <image :src="item.iconUrl" mode="" />
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>

    <view class="banner-wrapper">
      <swiper class="swiper" circular autoplay>
        <swiper-item>
          <image @click="go('/pages/hot/hot')" class="hot-banner" src="../../../static/images/new-index/hot-banner.png" mode="" />
        </swiper-item>
        <swiper-item v-for="item in fullHousePackages" :key="item.id">
          <image @click="go('/pages/prod/prod?goodsId=' + item.id)" class="hot-banner" :src="item.picUrl" mode="" />
        </swiper-item>
      </swiper>
    </view>

    <view class="goods-list">
      <Goods :data="goods" v-for="goods in searchGoodsList" :key="goods.id"></Goods>
      <LoadingMore v-show="status !== 'none'" :status="status"></LoadingMore>
    </view>
  </view>
</template>

<script>
import { getGoodsTypesApi, getFullHoursePackageApi } from '../../../api/home';
import { goodsListApi } from '../../../api/goods';
import Goods from '../cpns/goods.vue';

export default {
  components: {
    Goods
  },
  data() {
    return {
      categories: [],
      queryInfo: {
        page: 1,
        size: 20
      },
      totalPages: 0,
      searchGoodsList: [],
      status: 'none',
      fullHousePackages: []
    };
  },
  mounted() {
    this.getCategoryList();
    this.getFullHoursePackage();
    this.getGoodsList();
  },
  methods: {
    // 获取分类类目
    async getCategoryList() {
      const res = await getGoodsTypesApi({
        goodsType: 1
      });

      if (res.errno === 0) {
        const categories = res.data.categoryList.filter((item) => item.desc === '搜家具').slice(0, 7);
        this.categories = categories;
        this.categories.push({
          iconUrl: 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/spxullhqon4up3jk6g03.png',
          id: null,
          name: '更多'
        });
      }
    },

    // 跳转筛选
    handleToFilter(item) {
      if (item.id) {
        uni.navigateTo({
          url: `/pages/goods-filter/goods-filter?id=${item.id}`
        });
      } else {
        uni.navigateTo({
          url: `/pages/furniture/furniture?id=${item.id}`
        });
      }
    },

    // 获取商品列表
    async getGoodsList(isLoadmore) {
      this.status = 'loading';
      const res = await goodsListApi({ ...this.queryInfo });
      if (res.errno === 0) {
        this.totalPages = res.data.totalPages;
        if (isLoadmore) {
          this.searchGoodsList.push(...res.data.goodsList);
        } else {
          this.searchGoodsList = res.data.goodsList;
        }
      }
      this.status = 'none';
    },

    // 获取全屋套餐轮播图
    async getFullHoursePackage() {
      const { data } = await getFullHoursePackageApi();
      this.fullHousePackages = data || [];
    },

    // 触底加载
    reachBottom() {
      if (this.totalPages <= this.queryInfo.page) {
        return 'no-more';
      }

      if (this.searchGoodsList.length < this.queryInfo.size) {
        return 'lack';
      }

      this.queryInfo.page++;
      this.getGoodsList(true);
    }
  }
};
</script>

<style lang="less" scoped>
.nav-container {
  margin: 10upx 0 20upx 0;

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
}

.banner-wrapper {
  padding: 0 20upx 20upx 0;
  box-sizing: border-box;
  .swiper{
    border-radius: 10upx;
    overflow: hidden;
  }
  .hot-banner {
    height: 286upx;
    width: 100%;
    border-radius: 10upx;
  }
}

.goods-list {
  padding: 20upx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
