<template>
  <view class="brand-factory-container">
    <view class="backHeader">
      <image @click="handleBack" class="backIcon" src="@/static/index/convenient-services/return.png"></image>
      <text class="pageTitle">品牌工厂</text>
    </view>

    <scroll-view class="category-scroll-view" scroll-x>
      <view class="category-list-wrapper">
        <view class="category-item" @click="currentCategory = category.value" v-for="category in categoryList"
          :key="category.value">
          <image :src="currentCategory === category.value ? category.active : category.default" class="category-img">
          </image>
        </view>
      </view>
    </scroll-view>

    <view class="sub-menus-container">
      <scroll-view class="scroll-view" scroll-x="true">
        <view class="wrapper">
          <view class="item" :class="{ active: currentSubMenu === item.value }" v-for="item in stylesList"
            :key="item.value">{{ item.label }}</view>
        </view>
      </scroll-view>

      <view class="screen">
        <text>筛选</text>
        <!-- <image
          class="icon"
          src="../../../static/images/new-index/screen.png"
          mode=""
        /> -->
      </view>
    </view>

    <view class="brand-list">
      <BrandPane v-for="item in brandList" :key="item.brand.id" :data="item"></BrandPane>
    </view>
  </view>
</template>

<script>
import { stylesList } from './data'
import BrandPane from './BrandPane'
import { getBrandListBySelectApi } from '../../../api/brand'
import { categoryList } from './config'

export default {
  components: {
    BrandPane,
  },
  mounted() {
    this.getBrandList()
  },
  data() {
    return {
      categoryList: Object.freeze(categoryList),
      stylesList: Object.freeze(stylesList),
      currentSubMenu: 0,
      totalPages: 0,
      currentCategory: '品牌家具',
      brandList: [],
      queryInfo: {
        page: 1,
        limt: 10,
        labelId: 1
      },
    }
  },

  methods: {
    handleBack() {
      uni.navigateBack()
    },
    async getBrandList(isLoadMore) {
      uni.showLoading()
      const res = await getBrandListBySelectApi({ ...this.queryInfo })

      uni.hideLoading()
      if (res.errno === 0) {
        if (isLoadMore) {
          this.brandList.push(...res.data.brandList)
        } else {
          this.brandList = res.data.brandList
        }

        console.log(this.brandList[4])
        this.totalPages = res.data.totalPages
      } else {
        uni.showToast({
          title: '品牌工厂获取失败',
          icon: 'none',
        })
      }
    },
  },

  onReachBottom() {
    return
    if (this.totalPages <= this.queryInfo.page) {
      return 'no-more'
    }

    if (this.brandList.length < this.queryInfo.size) {
      return 'lack'
    }

    this.queryInfo.page++
    this.getBrandList(true)

    if (this.totalPages <= this.queryInfo.page) {
      return 'no-more'
    }
  }
}
</script>

<style lang="less" scoped>
.brand-factory-container {
  .category-list-wrapper {
    display: flex;
    align-items: center;
    word-spacing: nowrap;
    margin-bottom: 10upx;

    .category-item {
      margin-right: 10upx;

      .category-img {
        width: 175upx;
        height: 200upx;
        flex-shrink: 0;
      }
    }
  }

  .backHeader {
    position: relative;
    width: 750rpx;
    height: 88rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 40upx;

    .backIcon {
      width: 60rpx;
      height: 60rpx;
    }

    .pageTitle {
      font-family: 思源黑体;
      font-size: 32rpx;
      font-weight: 600;
      line-height: 44rpx;
      letter-spacing: 0.32rpx;
      color: #222229;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .sub-menus-container {
    display: flex;
    align-items: flex-start;
    width: 100vw;
    background-color: #ffffff;
    box-sizing: border-box;
    // height: 80upx;
    border-radius: 0 0 24upx 24upx;
    margin-bottom: -10upx;

    .scroll-view {
      width: calc(100vw - 120upx);
    }

    .wrapper {
      height: 48upx;
      display: flex;

      .item {
        background-color: #f6f6f5;
        line-height: 48upx;
        padding: 0 32upx;
        border-radius: 100px;
        margin-right: 16upx;
        white-space: nowrap;
        font-size: 28upx;
        color: #8f8d85;
        transition: all 100ms;

        &.active {
          color: #f9ba0c;
          background: #fff6dc;
        }
      }
    }

    .screen {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120upx;
      // background-color: aqua;
      flex-shrink: 0;
      font-size: 28upx;
      color: #3a3629;
      border-left: 1upx solid #f6f6f5;

      .icon {
        width: 32upx;
        height: 32upx;
      }
    }
  }

  .brand-list {
    width: 100%;
    height: 100%;
    padding: 12upx;
    box-sizing: border-box;
  }
}
</style>
