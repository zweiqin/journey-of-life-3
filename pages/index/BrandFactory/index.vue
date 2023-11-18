<template>
  <view class="brand-factory-container">

    <view class="search-header">
      <image @click="handleBack" class="back-icon" src="../../../static/images/con-center/order-back.png"></image>
      <view class="page-title">品牌工厂</view>
      <PageHeader searchPaddding="10upx 15upx 10upx 28upx" placeholder="品牌工厂" :showLocation="false" padding="0"
        background-color="transparent" :showMessage="false" showSearchBtn>
      </PageHeader>
    </view>


    <view class="filter-container tui-skeleto">
      <scroll-view scroll-with-animation :scroll-into-view="currentBrandTypeId" scroll-x
        style="background-color: #eff3f6;">
        <view class="brand-filter-wrapper">
          <view class="brand-item" :id="'item_' + category.id" @click="handleChangeSecondClass(category)"
            v-for="category in categoryList" :key="category.id">
            <image :src="currentBrandType === category.id ? category.active : category.picUrl" class="category-img">
            </image>
          </view>
        </view>
      </scroll-view>

      <scroll-view scroll-x>
        <view class="goods-filter-wrapper">
          <view class="goods-filter-item" @click="handleChangeNextCategory(item.id)"
            :class="{ active: currentNextCategoryId === item.id }" v-for="item in nextCategory" :key="item.id">{{
              item.storeName }}</view>
        </view>
      </scroll-view>
    </view>

    <view class="brand-list-wrapper" v-if="$data._list.length">
      <BrandPane class="tui-skeleton-fillet" v-for="factory in $data._list" :factory="factory" :key="factory.id">
      </BrandPane>
    </view>
    <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>
    <PageLoading :style="{ 'z-index': isPageLoading === 'page' ? '10000 !important' : '10 !important' }"
      v-if="isPageLoading"></PageLoading>

    <view class="no-data" v-if="!$data._list.length && $data._status !== 'loading'"
      style="width: 100%; height: 500upx; display: flex; align-items: center; justify-content: center; color: #ccc; font-size: 24upx; flex-direction: column">
      <tui-icon name="shop-fill" :size="30" color="#ccc" margin="0 0 30upx 0"></tui-icon>
      暂无商家~
    </view>
  </view>
</template>

<script>
import PageHeader from '../cpns/PageHeader.vue'
import BrandPane from './components/BrandPane.vue'
import { categoryList } from './config'
import { getFactoryListApi, getFactoryClassApi, getFactoryNextClassApi } from '../../../api/anotherTFInterface'
import loadMore from '../../../mixin/loadMore'
import PageLoading from '../../order/components/Loading.vue'

export default {
  components: {
    PageHeader,
    BrandPane,
    PageLoading
  },

  mixins: [loadMore({
    api: getFactoryListApi,
    mapKey: { totalPages: "total", list: "list", size: "pageSize" }
  })],
  data() {
    return {
      skeletonShow: true,
      currentBrandType: '品牌家具',
      currentNextCategoryId: '',
      categoryList: [], // 二级分类
      nextCategory: [], // 三级分类
    }
  },

  onLoad() {
    this.isPageLoading = 'page'
    this.getFactoryClassList()
  },

  methods: {
    // 获取一级分类
    async getFactoryClassList() {
      const res = await getFactoryClassApi({
        levelId: 1
      })
      const classList = res.data
      if (classList && classList.length) {
        const brandClass = classList.find(item => item.storeName === '品牌工厂')
        this.getSecondClassList(brandClass ? brandClass.id : '0', true)
      } else {
        this.getSecondClassList('0', true)
      }
    },


    // 获取二级分类
    async getSecondClassList(pid, isSecondClass) {
      try {
        const res = await getFactoryNextClassApi({
          pid
        })

        if (isSecondClass) {
          this.mapLocalToNetData(res.data)
        } else {
          this.nextCategory = res.data
          this.handleChangeNextCategory(res.data[0] ? res.data[0].id : null)
        }
      } finally {
        this.isPageLoading = undefined
      }
    },

    // 映射active数据
    mapLocalToNetData(classList) {
      if (this.categoryList.length) return
      if (classList && classList.length) {
        const localClassMap = new Map(categoryList.map(localClass => [localClass.storeName, localClass]));
        for (const netClass of classList) {
          const localClass = localClassMap.get(netClass.storeName);
          if (localClass) {
            netClass.active = localClass.active;
          }
        }
        this.categoryList = classList
      } else {
        this.categoryList = categoryList;
      }

      // this.currentBrandType = this.categoryList[0].id
      this.handleChangeSecondClass(this.categoryList[0])
    },

    // 切换二级分类
    handleChangeSecondClass(category) {
      if (this.currentBrandType === category.id) return
      this.isPageLoading = 'block'
      this.currentBrandType = category.id
      this.getSecondClassList(category.id)
    },

    // 切换三级分类
    handleChangeNextCategory(id) {
      this.$data._list = []
      if (!id) {
        this.$data._query.classifyId = this.currentBrandType
        this._loadData()
      } else {
        if (this.currentNextCategoryId === id) return
        this.currentNextCategoryId = id
        this.$data._query.classifyId = id
        this._loadData()
      }
    },

    handleBack() {
      uni.navigateBack();
    }
  },

  computed: {
    currentBrandTypeId() {
      return 'item_' + this.currentBrandType
    }
  }
}
</script>

<style lang="less" scoped>
.brand-factory-container {
  min-height: 100vh;
  background-color: #fff;

  .search-header {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 30upx;
    box-sizing: border-box;
    height: 88upx;
    z-index: 20;

    .back-icon {
      width: 22.97upx;
      height: 39.66upx;
      flex-shrink: 0;
    }

    .page-title {
      font-size: 42upx;
      font-weight: 500;
      color: #000;
      white-space: nowrap;
      margin: 0 24upx 0 16upx;
    }

  }

  .filter-container {
    .brand-filter-wrapper {
      position: relative;
      width: 100%;
      height: 212upx;
      display: flex;
      white-space: nowrap;
      align-items: flex-end;
      padding: 0 19upx;
      box-sizing: border-box;
      z-index: 20;

      .brand-item {
        width: 175upx;
        height: 200upx;

        .category-img {
          width: 175upx;
          height: 200upx;
        }
      }
    }

    .goods-filter-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      white-space: nowrap;
      padding: 22upx 18upx 24upx;
      box-sizing: border-box;

      .goods-filter-item {
        color: #888889;
        font-size: 24upx;
        background-color: #EFF3F6;
        padding: 6upx 8upx;
        margin-right: 12upx;

        &.active {
          color: #000;
        }
      }
    }
  }

  .brand-list-wrapper {
    width: 100%;
    padding: 0 18upx 30upx;
    box-sizing: border-box;
  }


}
</style>