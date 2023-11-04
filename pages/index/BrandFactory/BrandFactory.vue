<template>
  <view class="brand-factory-container">
    <PageHeader showSearchBtn placeholder="搜索品名/品牌"></PageHeader>
    <view class="mini-fulter">
      <view class="item">功能床垫</view>
    </view>

    <scroll-view class="category-scroll-view" scroll-x>
      <view class="category-list-wrapper">
        <view class="category-item" v-for="category in categoryList" :key="category.value">
          <image :src="currentCategory === category.value ? category.active : category.default" class="category-img">
          </image>
        </view>
      </view>
    </scroll-view>

    <view class="factory-list-wrapper">
      <view class="item" v-for="(factory, index) in factoryList" :style="{ 'margin-bottom': index > 4 ? '28upx' : '' }"
        :key="index">
        <image class="factory-logo" :src="factory.icon"></image>
        <view class="factory-name">{{ factory.label }}</view>
      </view>
    </view>

    <scroll-view scroll-x>
      <view class="main-filter-wrapper">
        <vieww class="filter-item" :key="item" v-for="item in lampFilterTemplate"
          :class="{ active: currentFilter === item }">{{ item
          }}</vieww>
      </view>
    </scroll-view>

    <view class="goods-list">
      <view class="goods-container" v-for="item in 30" :key="item">
        <image class="goods-img" src="../../../static/images/new-index/brandFactory/template/deng.png"></image>
        <view class="goods-info">
          <view class="goods-name">多功能用途灯饰</view>
          <view class="bottom">
            <view class="price-wrapper">
              ￥<text class="price-text">59</text>
            </view>

            <view class="tag-wrapper">
              <view class="tag">可使用代金券</view>
            </view>

            <image class="shop-car-icon" src="../../../static/images/new-index/brandFactory/shop-car.png"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import PageHeader from '../cpns/PageHeader'
import { categoryList, factoryList, lampFilterTemplate } from './config'

export default {
  components: {
    PageHeader
  },

  data() {
    return {
      categoryList: Object.freeze(categoryList),
      factoryList: Object.freeze(factoryList),
      lampFilterTemplate: Object.freeze(lampFilterTemplate),
      currentCategory: '品牌家具',
      currentFilter: '推荐'
    }
  },

  computed: {
    categoryId() {
      return 'category_' + this.currentCategory
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper {
  padding: 0;
  width: 100%;
}

/deep/ .page-header-right {
  display: none;
}

.brand-factory-container {
  width: 100vw;
  min-height: 100vh;
  background: #F5F4F6;
  padding: 24upx 20upx;
  box-sizing: border-box;

  .mini-fulter {
    display: flex;
    align-items: center;
    margin: 17upx 0 19upx 0;

    .item {
      padding: 2upx 14upx;
      background-color: #fff;
      border-radius: 100px;
      font-size: 24upx;
      color: #888889;
    }
  }

  .category-list-wrapper {
    display: flex;
    align-items: center;
    word-spacing: nowrap;

    .category-item {
      margin-right: 10upx;

      .category-img {
        width: 175upx;
        height: 200upx;
        flex-shrink: 0;
      }
    }


  }

  .factory-list-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 24upx 19upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20upx;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-right: 48upx;
      width: 96upx;
      height: 96upx;
      margin-bottom: 57upx;


      &:nth-child(5n) {
        margin-right: 0;
      }

      .factory-logo {
        width: 96upx;
        height: 96upx;
        flex-shrink: 0;
      }

      .factory-name {
        font-size: 24upx;
        color: #222229;
        margin-top: 12upx;
        line-height: 1.5;
      }
    }
  }

  .main-filter-wrapper {
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin: 40upx 0;

    .filter-item {
      white-space: nowrap;
      font-size: 28upx;
      color: #222229;
      margin-right: 48upx;

      &.active {
        font-weight: 500;
        color: #EF5410;
      }
    }
  }

  .goods-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .goods-container {
      width: 346upx;
      border-radius: 20upx;
      overflow: hidden;
      background-color: #fff;
      margin-bottom: 14upx;

      .goods-img {
        width: 100%;
        height: 376upx;
      }

      .goods-info {
        padding: 19upx 16upx 22upx;
        box-sizing: border-box;
        width: 100%;

        .goods-name {
          width: 268upx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          line-height: 1.5;
          color: #222229;
          font-size: 32upx;
        }

        .bottom {
          display: flex;
          align-items: center;
          margin-top: 13upx;

          .price-wrapper {
            font-size: 32upx;
            color: #E02208;
            margin-right: 10upx;


            .price-text {
              font-size: 38upx;
              font-weight: 500;
            }


          }

          .tag-wrapper {
            flex: 1;

            .tag {
              width: 144upx;
              border: 0.5px solid #E02208;
              padding: 2upx 8upx;
              box-sizing: border-box;
              font-size: 22upx;
              color: #E02208;
              border-radius: 8px;
            }
          }

          .shop-car-icon {
            width: 46upx;
            height: 46upx;
            flex-shrink: 0;
            margin-left: 30upx;
          }
        }
      }
    }
  }
}
</style>