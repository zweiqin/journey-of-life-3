<template>
  <view class="business-district-container">
    <!-- 头部导航 -->
    <PageHead></PageHead>

    <!-- 菜单 -->
    <NavBar @view="handleToDetail"></NavBar>

    <!-- 福利 -->
    <WelfareBar></WelfareBar>

    <!-- bar -->
    <AdvertisementBar></AdvertisementBar>

    <!-- package -->
    <ActivityPackage :scrollTop="scrollTop"></ActivityPackage>

    <!-- 商家详情 -->
    <view class="brand-shop-caontainer">
      <!-- <view class="brand-list">
        <BrandShop></BrandShop>
      </view> -->

      <view class="list-wrapper">
        <view class="left-list">
          <BrandShop :brandInfo="item" v-for="item in leftData" :key="item.id"></BrandShop>
        </view>
        <view class="left-list">
          <BrandShop :brandInfo="item" v-for="item in rightData" :key="item.id"></BrandShop>
        </view>
      </view>

      <LoadingMore v-show="loadingStatus !== 'more' && !isGetAddress" :status="loadingStatus"></LoadingMore>


      <!-- <view class="no-adddres" v-show="loadingStatus !== 'more' && queryInfo.address">
        <LoadingMore :status="loadingStatus"></LoadingMore>
        <view>正在搜索您附近的商家...</view>
      </view> -->
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import PageHead from './components/PageHead.vue'
import NavBar from './components/NavBar.vue'
import WelfareBar from './components/WelfareBar.vue'
import AdvertisementBar from './components/AdvertisementBar.vue'
import ActivityPackage from './components/ActivityPackage.vue'
import BrandShop from './components/BrandShop.vue'

import { getNearByShopListApi } from '../../api/community-center';
import { getCurrentLocation } from '../../utils';

export default {
  components: { PageHead, NavBar, WelfareBar, AdvertisementBar, ActivityPackage, BrandShop },
  data() {
    return {
      isGetAddress: false,
      loadingStatus: "more",
      nearbyTotalPages: 0,
      nearbyShopList: [],
      leftData: [],
      rightData: [],
      scrollTop: 0,
      queryInfo: {
        pageNo: 1,
        pageSize: 20,
        address: ''
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      uni.stopPullDownRefresh()
      this.getNearByShopList(true)
    },

    async getNearByShopList(isClear) {
      if (isClear) {
        this.queryInfo.pageNo = 1
        this.nearbyShopList = []
        this.rightData = []
        this.leftData = []
      }
      try {
        this.loadingStatus = 'loading'
        this.isGetAddress = true
        const currentAddress = await getCurrentLocation();
        this.isGetAddress = false
        this.queryInfo.address = currentAddress + ""
        const res = await getNearByShopListApi(this.queryInfo);

        if (res.statusCode === 20000) {
          if (res.data) {
            if (isClear) {
              this.nearbyShopList = res.data.data;
              this.nearbyShopList.forEach((item, index) => {
                if (index % 2 !== 0) {
                  this.rightData.push(item)
                } else {
                  this.leftData.push(item)
                }
              })
            } else {
              const list = res.data.data
              const lessData = this.leftData.length < this.rightData.length ? this.leftData : this.rightData
              const moreData = this.leftData.length < this.rightData.length ? this.rightData : this.leftData
              list.forEach((item, index) => {
                if (index % 2 !== 0) {
                  lessData.push(item)
                } else {
                  moreData.push(item)
                }
              })
            }
            this.nearbyTotalPages = res.data.pages
          } else {
            this.nearbyShopList = []
            this.nearbyTotalPages = 0
          }
        } else {
          // this.ttoast({
          //   type: 'fail',
          //   title: '附近商家获取失败',
          //   content: res.statusMsg
          // });
        }
      } catch (error) {
        // this.ttoast({
        //   type: 'fail',
        //   title: error || '未知错误'
        // });
      } finally {
        this.loadingStatus = 'more'
      }
    },

    // 点击常看详情
    handleToDetail(item) {
      const { url } = item
      if (!url) {
        return this.empty()
      }

      if (typeof url === 'function') {
        const { status, checkedUrl } = url()
        status && uni.navigateTo({
          url: checkedUrl,
        });
        return
      }
      uni.navigateTo({
        url
      });
    }
  },
  onPullDownRefresh() {
    this.init()
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },

  onReachBottom() {
    if (this.nearbyShopList.length < this.queryInfo.pageSize) {
      return
    }

    if (this.queryInfo.pageNo >= this.nearbyTotalPages) {
      return this.loadingStatus = 'no-more'
    }

    this.queryInfo.pageNo++
    this.getNearByShopList()
  },
}
</script>

<style lang="less" scoped>
.business-district-container {
  min-height: 100vh;
  background-color: #f6f6f6;
  padding: 40upx 30upx 140upx;
  box-sizing: border-box;

  .brand-shop-caontainer {
    margin-top: 24upx;

    .list-wrapper {
      display: flex;
      justify-content: space-between;
    }
  }

  .no-adddres {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 300upx;
    background-color: #fff;
    font-size: 28upx;
    color: #ccc;
  }
}
</style>