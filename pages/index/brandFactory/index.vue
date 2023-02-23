<template>
  <view class="brand-factory-container">
    <view class="sub-menus-container">
      <scroll-view class="scroll-view" scroll-x="true">
        <view class="wrapper">
          <view
            class="item"
            :class="{ active: currentSubMenu === item.value }"
            v-for="item in stylesList"
            :key="item.value"
            >{{ item.label }}</view
          >
        </view>
      </scroll-view>

      <view class="screen">
        <text>筛选</text>
        <image
          class="icon"
          src="../../../static/images/new-index/screen.png"
          mode=""
        />
      </view>
    </view>

    <view class="brand-list">
      <BrandPane
        v-for="item in brandList"
        :key="item.brand.id"
        :data="item"
      ></BrandPane>
    </view>
  </view>
</template>

<script>
import { stylesList } from './data'
import BrandPane from './BrandPane'
import { getBrandListBySelectApi } from '../../../api/brand'

export default {
  components: {
    BrandPane,
  },
  mounted() {
    this.getBrandList()
  },
  data() {
    return {
      stylesList: Object.freeze(stylesList),
      currentSubMenu: 0,
      totalPages: 0,
      brandList: [],
      queryInfo: {
        page: 1,
        limt: 10,
      },
    }
  },

  methods: {
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

    reachBottom() {
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
    },
  },
}
</script>

<style lang="less" scoped>
.brand-factory-container {
  .sub-menus-container {
    display: flex;
    align-items: flex-start;
    width: 100vw;
    background-color: #ffffff;
    box-sizing: border-box;
    height: 80upx;
    border-radius: 0 0 24upx 24upx;

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
