<template>
  <view class="voucher-detail" style="min-height: 100vh; background-color: #f6f6f6; ">
    <view class="page-haeder">
      <image @click="go('/pages/index/voucher-zone')" src="../../static/images/new-business/category/back.png"
        class="back-icon"></image>
      <view class="search-container" @click="go('/pages/search-page/search-page')">
        <input type="text" class="input" placeholder="请输入您想搜索的商品">
        <button class="uni-btn">搜索</button>
      </view>
    </view>
    <view class="main-menus-conatainer">
      <scroll-view scroll-x :scroll-into-view="animateId" scroll-with-animation>
        <view class="wrapper">
          <view class="item" :class="{ active: currentCategoryId == item.value }" @click="handleClickOnceMenuItem(item)"
            v-for="item in menus" :key="item.value" :id="`item_${item.value}`">
            <image :src="item.icon" mode="" />
            <text>{{ item.label }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="goods-list">
      <VoucherDeatilGoodsPane v-for="item in $data._list" :key="item.id" :goodsInfo="item"></VoucherDeatilGoodsPane>
      <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>
    </view>
  </view>
</template>

<script>
import { voucherNavs } from './config'
import loadMore from '../../mixin/loadMore'
import { goodsListApi } from '../../api/goods';
import VoucherDeatilGoodsPane from './cpns/VoucherDeatilGoodsPane.vue'

export default {
  components: {
    VoucherDeatilGoodsPane
  },
  data() {
    return {
      menus: Object.freeze(voucherNavs),
      currentCategoryId: '',
    }
  },

  mixins: [loadMore({
    api: goodsListApi,
    mapKey: { totalPages: "totalPages", list: "goodsList", size: "size" }
  })],

  onLoad(params) {
    this.$nextTick(() => {
      this.currentCategoryId = params.categoryId
      this.getData()
    })
  },

  methods: {
    handleClickOnceMenuItem(categoryInfo) {
      this.currentCategoryId = categoryInfo.value
      this.getData()
    },
    getData() {
      this.$data._list = []
      this.$data._query.categoryId = this.currentCategoryId
      this.$data._query.supportVoucher = 1
      this._loadData()
    }
  },

  computed: {
    animateId() {
      return `item_${this.currentCategoryId}`
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .uni-scroll-view::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

.page-haeder {
  width: 100vw;
  display: flex;
  align-items: center;
  height: 128upx;
  background-color: #fff;
  padding: 28upx 30upx;
  box-sizing: border-box;

  .back-icon {
    width: 48upx;
    height: 48upx;
    flex-shrink: 0;
  }

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
  padding: 20upx;
  background-color: #f3f3f3;
  position: relative;
  z-index: 100000000000;

  .wrapper {
    display: flex;
    align-items: center;
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
}
</style>