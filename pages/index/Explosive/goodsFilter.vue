<template>
  <view class="goods-filter">
      <view class="header-container">
        <view class="header">
            <image
            @click="handleBack"
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
            mode=""
            />
            <text>爆品专区</text>
            <view class="search-wrapper">
            <image
                class="search-icon"
                src="@/static/images/index/search.png"
                mode=""
            />
            <input
                @click="go('/pages/search-page/search-page')"
                v-model="querList.productName"
                @confirm="handleSearch"
                class="text"
                placeholder="输入你想搜索的产品"
            />
            <image
                class="camera"
                src="@/static/images/index/camera.png"
                mode=""
            />
            </view>

            <button class="uni-btn" @click="handleSearch">搜索</button>
        </view>

        <!-- 头部menus -->
        <MainMenus @choose="handleChooseItem" v-model="mainId" :subId="subId"></MainMenus>
        <!-- <view :class="{ 'stic-top': scrollDis > 200 }">
            <SubMenus
            ref="subMenusRef"
            :currentId="subId"
            @change="handleClickSubMenus"
            ></SubMenus>
        </view> -->
      </view>
      <view class="main">
        <Goods v-for="item in goodsList" :key="item.id" :data="item"></Goods>
        <load-after v-if="isShowLoading"></load-after>
      </view>

      <view class="main" v-show="!goodsList.length">
        <view class="no-data">暂无商品</view>
      </view>
  </view>
</template>

<script>
import { getClaasifyProductsApi, getFirstClassifyApi } from '@/api/anotherTFInterface'
import Goods from './cpns/goods.vue'
import MainMenus from './components/main-menus.vue'
import SubMenus from './components/sub-menus.vue'
export default {
  components: {
    MainMenus,
    SubMenus,
    Goods
  },

  data() {
    return {
        scrollDis: 0,
        onceMenus: [],
        classifyId: '',
        querList: {
            page: 1,
            pageSize: 20,
            type: 1,
            volume: 1,
            productName: ''
        },
        mainId: '',
        subId: 0,
        goodsList: [],
        isShowLoading: false,
    }
  },

  onLoad(options) {
    this.mainId = options.parentId
    this.subId = options.id
    // this.setData()
    this.getList()
  },

  methods: {
    handleBack() {
        uni.navigateBack();
    },
    getList(isAdd) {
			getClaasifyProductsApi({
				classifyId: this.subId,
				productName: '',
				...this.querList
			}).then(res => {
        if (this.goodsList.length === res.data.total) {
            return uni.showToast({
              title: '没有更多了',
              icon: 'none'
            });
        }
        if (isAdd) {
          res.data.list.forEach(item => {
            this.goodsList.push(item)
          })
            // this.goodsList = [...this.goodsList, ...res.data.list]
        }else {
            this.goodsList = res.data.list
        }
				// res.data.list.forEach(item => .push(item))
				// console.log(res);
			}).catch(err => {
				console.log(err);
			})
	},
    handleSearch() {
        console.log(1321);
    },
    handleChooseItem(onceId) {
      this.mainId = onceId
      this.subId = onceId
      this.querList.page = 1
	  this.goodsList = []
      // this.resetQueryInfo()
      // this.setData()
      this.getList()
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      })
    },
    async setData() {
      this.$nextTick(() => {
        this.$refs.subMenusRef.getSubMenus(this.mainId)
      })
    },
    handleClickSubMenus(id) {
      this.subId = id
      this.querList.page = 1
      this.querList.productName = ''
    //   this.$refs.filterPaneRef.resetData()
    this.getList()
    },
  },

  onReachBottom() {
    this.querList.page++
    this.getList(true)
  },

  onPageScroll(e) {
    
  },
  onPageScroll(e) {
    this.scrollDis = e.scrollTop
  },
}
</script>

<style lang="less" scoped>
.goods-filter {
  background-color: #f1f2f6;
  min-height: 100vh;
  font-size: 28upx;
}

.stic-top {
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.header-container {
  background-color: #ffffff;
  // padding: 32upx 32upx 20upx 32upx;
  box-sizing: border-box;
}
.header {
  display: flex;
  align-items: center;
  padding: 32upx 32upx 20upx 32upx;
  box-sizing: border-box;
  position: relative;
  z-index: 1000000000;
  background-color: #fff;

  .icon {
    width: 48upx;
    height: 48upx;
  }

  .local-wrapper {
    position: relative;
    margin-right: 20upx;
    &::after {
      content: '';
      border: 4px solid #000000;
      border-bottom-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      position: absolute;
      top: 50%;
      right: -10px;
    }
    /deep/ .locale {
      color: #000;
      font-size: 32upx;
      font-weight: 500;
    }
  }

  .chat {
    width: 33.2upx;
    height: 30upx;
    object-fit: cover;
  }

  .search-wrapper {
    flex: 1;

    background-color: #f1f2f6;
    height: 74upx;
    margin: 0 20upx;
    margin-right: 0;
    border-radius: 100px;
    padding: 0 26upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-icon {
      width: 26.6upx;
      height: 26.6upx;
    }

    .text {
      font-size: 24upx;
      color: #999999;
      margin-left: 20upx;
      padding-left: 20upx;
      border-left: 1upx solid #d8d8d8;
      flex: 1;
    }

    .camera {
      width: 33.2upx;
      height: 30upx;
      object-fit: cover;
    }
  }
}

.filter-pane {
  background-color: #ffffff;
  width: 100%;
  margin-top: 20upx;
}

.main {
  padding: 20upx 20upx 20upx 20upx;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.no-data {
  text-align: center;
  line-height: 300upx;
  height: 300upx;
  color: #ccc;
  width: 100%;
}

.uni-btn {
  font-size: 28upx;
  color: #1b1b1b;
  margin-left: 10upx;
}
</style>
