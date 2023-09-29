<template>
  <view class="shop-container">
    <view class="shop-header-container">
      <image class="back-icon" @click="back" src="../../static/images/new-business/list/back.png"></image>
      <image class="nearby-icon" @click="showActionSheet = true"
        src="../../static/images/new-business/list/nearby-icon.png"></image>
      <view class="search-container">

        <view class="filter-wrapper" @click="handleSelectType">
          <view class="current-type">
            {{ currenrTypeInfo.name }}
          </view>
        </view>

        <!-- <input v-model="queryInfo.search" class="input" placeholder="社区商圈" type="text"> -->
        <input class="input" placeholder="社区商圈" type="text">

        <button class="uni-btn search-btn" @click="handleSearch">搜索</button>
      </view>
    </view>

    <view class="filter-bar">
      <button class="uni-btn filter-item" :style="{ color: currentFilter.includes(0) ? '#EF5511' : '' }">热门商圈</button>
      <button class="uni-btn filter-item" @click="showActionSheet = true"
        v-if="currentDistance && currentDistance !== '不限'" style="color: #EF5511">{{
          currentDistance }}</button>
    </view>

    <AdvertisementBar></AdvertisementBar>

    <view class="shop-list" v-if="nearbyShopList.length">
      <CommonShop :shopInfo="shop" v-for="shop in nearbyShopList" :key="shop.id"></CommonShop>
    </view>
    <view class="no-data" v-show="!nearbyShopList.length && !isLoading"> 暂无门店~ </view>
    <PageLoading v-show="isLoading"></PageLoading>
    <LoadingMore style="margin-top: 20upx" v-show="loadingStatus !== 'more'" :status="loadingStatus"></LoadingMore>


    <!-- 顶部弹出 -->
    <tui-top-dropdown :show="filterPaneVisible" :height="0" :translatey="128" @close="filterPaneVisible = false">
      <view class="top-popup-container">
        <scroll-view scroll-y class="scroll-view">
          <view class="item-list">
            <view class="tui-drop-item" @click="handleChoose(item)" v-for="(item, index) in filters" :key="index">
              <tui-icon margin="0 10upx 0 0" name="check" :size="16"
                :color="currenrTypeInfo.name === item.name ? '#EF5511' : '#f6f6f6'" :bold="true"></tui-icon>
              <text class="tui-ml tui-middle">{{ item.name }}</text>
            </view>
            <view class="tui-seizeaseat-30"></view>
          </view>
        </scroll-view>
      </view>
    </tui-top-dropdown>

    <!-- 距离选择 -->
    <tui-actionsheet color="#ccc" :show="showActionSheet" tips="请选择距离" :item-list="itemList" @click="handleAction"
      @cancel="showActionSheet = false">
    </tui-actionsheet>
  </view>
</template>

<script>
import AdvertisementBar from '../../pages/business-district/components/AdvertisementBar.vue'
import CommonShop from '../../pages/community-center/cpns/CommonShop.vue'
import PageLoading from '../../pages/order/components/Loading.vue'
import { getNearByShopListApi } from '../../api/community-center';
import { navbarOne, navbarThree, navbarTwo } from '../../pages/business-district/config'
import { getCurrentLocation } from '../../utils';


export default {
  components: { AdvertisementBar, CommonShop, PageLoading },
  onLoad(params) {
    this.init(params)
  },
  data() {
    return {
      nearbyShopList: [],
      nearbyTotalPages: 0,
      showActionSheet: false,
      loadingStatus: 'more',
      filters: [],
      filterPaneVisible: false,
      currenrTypeInfo: {},
      isLoading: false,
      currentFilter: [0],
      currentDistance: '',
      queryInfo: {
        search: '',
        pageNo: 1,
        pageSize: 20,
        address: ''
      },
      itemList: [{
        text: "1km",
        color: "#2B2B2B"
      }, {
        text: "3km",
        color: "#2B2B2B"
      }, {
        text: "5km",
        color: "#2B2B2B"
      }, {
        text: "10km",
        color: "#2B2B2B"
      }, {
        text: "不限",
        color: "#2B2B2B"
      }]
    }
  },
  watch: {
    'queryInfo.search'(value) {
      if (!value) {
        this.getNearByShopList(true)
      }
    }
  },
  methods: {
    back() {
      uni.switchTab({
        url: '/pages/business-district/business-district',
      });
    },
    init(params) {
      this.initFilter(params)
    },
    async getNearByShopList(isClear) {
      if (isClear) {
        this.queryInfo.pageNo = 1
        this.isLoading = true
        this.nearbyShopList = []
      } else {
        this.loadingStatus = 'loading'
      }
      try {
        const currentAddress = await getCurrentLocation();
        this.queryInfo.address = currentAddress + ''
        const res = await getNearByShopListApi(this.queryInfo);
        if (res.statusCode === 20000) {

          if (res.data) {
            this.nearbyShopList = [...this.nearbyShopList, ...res.data.data];
            this.nearbyTotalPages = res.data.pages
          } else {
            this.nearbyShopList = []
            this.nearbyTotalPages = 0
          }
        }
      } catch (error) {
        // this.ttoast({
        //   type: 'fail',
        //   title: error || '未知错误'
        // });
      } finally {
        this.isLoading = false
        this.loadingStatus = 'more'
      }
    },
    initFilter(params) {
      this.filters = [navbarOne[2], navbarOne[3], navbarOne[4], ...navbarTwo, ...navbarThree]
      const currentType = params.type
      const currenrTypeInfo = this.filters.find(item => item.value == currentType)
      if (currenrTypeInfo) {
        this.currenrTypeInfo = currenrTypeInfo
      } else {
        this.currenrTypeInfo = this.filters[0]
      }
      this.getNearByShopList(true)
    },
    // 点击要筛选
    handleSelectType() {
      this.filterPaneVisible = true
    },

    // 重新筛选
    handleChoose(item) {
      this.currenrTypeInfo = item
      this.filterPaneVisible = false
      this.queryInfo.search = item.name
      this.getNearByShopList(true)
    },

    // 点击搜索
    handleSearch() {
      if (this.queryInfo.search) {
        this.getNearByShopList(true)
      }
    },

    // 点击
    handleAction(e) {
      const { text } = e
      this.showActionSheet = false
      this.currentDistance = text
      this.getNearByShopList(true)
    }
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
/deep/ .common-shop-container {
  background-color: #fff;
  margin-bottom: 20upx;
  border-radius: 20upx;
}

/deep/ .tui-dropdown-box {
  left: 0;
}


.shop-container {
  min-height: 100vh;
  overflow: auto;
  background-color: #f6f6f6;
  box-sizing: border-box;
  padding: 160upx 30upx 0;

  .shop-header-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 128upx;
    width: 100vw;
    background-color: #fff;
    padding: 0 30upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    z-index: 998;

    .back-icon {
      width: 48upx;
      height: 48upx;
      flex-shrink: 0;
    }

    .nearby-icon {
      width: 97upx;
      height: 57.5upx;
    }

    .search-container {
      flex: 1;
      display: flex;
      align-items: center;
      height: 71upx;
      border-radius: 100upx;
      border: 1upx solid #EF5511;
      margin-left: 40upx;
      padding: 8upx 11upx 8upx 22upx;
      box-sizing: border-box;

      .filter-wrapper {
        position: relative;
        font-size: 28upx;
        color: #222229;
        padding-right: 10upx;
        border-right: 1upx solid #ccc;
        margin-right: 10upx;

        .current-type {
          width: 100upx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }


        &::after {
          content: '';
          display: block;
          position: absolute;
          right: -10upx;
          top: 0;
          width: 44upx;
          height: 44upx;
          background: url('../../static/images/new-business/list/filter-icon.png') no-repeat;
          background-size: cover;
        }
      }

      .input {
        font-size: 28upx;
      }

      .search-btn {
        flex: 0 0 112upx;
        height: 55upx;
        background-color: #EF5511;
        border-radius: 100px;
        color: #fff;
        font-size: 24upx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10upx;
      }
    }
  }

  .filter-bar {
    display: flex;
    align-items: center;
    margin-bottom: 20upx;

    .filter-item {
      line-height: 1.5;
      padding: 4upx 13upx;
      background-color: #fff;
      font-size: 24upx;
      margin-right: 20upx;
    }
  }

  .top-popup-container {

    .scroll-view {
      height: 400upx;
      background-color: #f6f6f6;

      .item-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100vw;
        height: 100%;
        padding: 20upx;
        box-sizing: border-box;

        .tui-drop-item {
          width: 33.333%;
          box-sizing: border-box;
          padding: 20upx;
          // background-color: #f6f6f6;
          font-size: 24upx;
          transition: all 350ms;
          border-radius: 20upx;

          &:active {
            background-color: #fff;
          }
        }
      }

    }
  }

  .no-data {
    width: 100%;
    height: 500upx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24upx;
    letter-spacing: 0.2em;
    color: #ccc;
  }
}
</style>