<template>
  <view class="shop-page-conatiner">
    <TuanAppShim bg="transparent"></TuanAppShim>
    <PageHeader showSearchBtn></PageHeader>

    <view class="main-area">
      <view class="navs">
        <view class="nav-wrapper">
          <view class="nav-item" @click="handleViewDetail(item)" v-for="item in homeTopNavs" :key="item.label">
            <image class="category-icon" :src="item.iconUrl"></image>
            <view class="category-name">{{ item.name }}</view>
          </view>
        </view>
        <view class="package-wrapper">
          <view class="voucher-container">
            <VoucherPane></VoucherPane>
          </view>
          <view class="hot-container">
            <HotPane :goodsData="ad.hot" subTitle="网红爆款">
              <block slot="title">
                <view class="hot">
                  <text class="text color-text">热销</text>
                  <text class="text">爆款</text>
                </view>
              </block>
            </HotPane>

            <HotPane :goodsData="ad.good" subTitle="抢新品">
              <block slot="title">
                <view class="hot">
                  <text class="text">好物推荐</text>
                  
                </view>
              </block>
            </HotPane>
          </view>
        </view>
      </view>

      <view class="rest-area">
        <view class="goods-filter">
          <!-- <view class="item" :class="{active: true}">
            默认
          </view> -->
          <block  v-for="(item, index) in filters" :key="index">
             <view v-if="index >= 1" class="item" @click="filterList(index);" :class="{active: index == filterActive}">
              {{ item.name}}
              <view class="sort" v-if="item.children">
                <!--                @click="item.value = item.children[0].value"  -->
                <!--                @click="item.value = item.children[1].value" -->
                <tui-icon
                :color="item.children[0].value === item.value ? '#f40' : '#ccc'"
                  class="top" :size="20" name="turningup"></tui-icon>
                <tui-icon
                  :color="item.children[1].value === item.value ? '#f40' : '#ccc'"
                  class="bottom" :size="20" name="turningdown"></tui-icon>
              </view>
            </view>
          </block>
        </view>
        <view class="fillterPanners" v-show="isShowPane">
          <view @click="filtersFn(item)" class="filterItem" :class="{ isactives : filters[1].value === item.value}" v-for="(item, index) in filters[1].children" :key="index + 123">
              <text>{{ item.name }}</text>
          </view>
        </view>
        <!-- <tui-top-dropdown
          :show="isShowPane"
          style="left: 0"
          :translatey="translatey"
          @close="cloasePopup"
          :maskZIndex="10"
          :height="0"
        >
          <view class="filterPaners" style="background: #fff;">
            <view v-for="(item, index) in filters[1].children" :key="index + 123">
              <text>{{ item.name }}</text>
            </view>
          </view>
        </tui-top-dropdown> -->
      </view>
        <view class="goods-list">
          <NewGoodsPane v-for="(item, index)  in  goodsList" :index="index" :goods="item" :key="item.productId"> </NewGoodsPane>
          <!-- <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore> -->
        </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import PageHeader from './cpns/PageHeader.vue';
import VoucherPane from './cpns/VoucherPane.vue';
import HotPane from './cpns/HotPane.vue';
import NewGoodsPane from './cpns/NewGoodsPane.vue';

import { goodsListApi } from '../../api/goods';
import { getClaasifyProductsApi, getCanvasApi, getFirstClassifyApi, getProductDetailsByIdApi, getSearchProductsApi } from '@/api/anotherTFInterface';
import { getGoodsTypesApi, getTypeDetailList } from '../../api/home';

import { homeTopNavs } from './config';
export default {
  components: {
    PageHeader,
    VoucherPane,
    HotPane,
    NewGoodsPane
  },

  data() {
    return {
      scrollTop: 0,
      isShowPane: false,
      homeTopNavs: homeTopNavs,
      queryList: {
        classifyId: '1163', // 分类ID 1160 备用ID 978 1163
        productName: '', // 商品名称
        search: '',
        type: 1, // 价格升降序
        volume: 0, // 销量升降序
        page: 1,
        pageSize: 25
      },
      filterActive: 0,
      filters: [
        { name: '默认', value: 0 },
        { name: '价格', children: [{name: '由低到高', value: 1},{name: '由高到低', value: 2}], value: 1 },
        { name: '筛选', children: [{name: '升序', value: 1},{name: '降序', value: 2}], value: 1 },
      ],
      ad: {
        hot: [],
        good: []
      },
      categories: [],
      goodsList: [],
    };
  },

  onLoad(options) {
    // this.setSearchParams('voucher')
    this.getGoodsList()
    // this.getCategoryList();
    // getClassifyProducts2Api({
    //   classifyId: '',
    //   type: '1',
    //   volume: '1',
    //   productName: '',
    //   page: 1,
    //   pageSize: 20
    // }).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
    // this.getIndexCanvas()
  },
  computed: {
    translatey() {
      if (this.scrollTop > 440) {
        return 100
      } else {
        return 991 - this.scrollTop * 2
      }
    },
  },
  methods: {
    getGoodsList() {
      getClaasifyProductsApi(this.queryList).then(res => {
        res.data.list.forEach(item => this.goodsList.push(item))
        // console.log(this.goodsList);
        this.ad.good = this.goodsList.slice(0,2)
        this.ad.hot = this.goodsList.slice(2,4)
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    handleViewDetail(navInfo) {
      if (navInfo.url) {
        uni.navigateTo({ url: navInfo.url });
        } else if (navInfo.id) {
      // } else if (navInfo.linkObj) {navInfo.id
        uni.navigateTo({
          url: `/pages/index/CommodityTypePage/index?id=${navInfo.id}`
          // url: `/pages/index/CommodityTypePage/index?shopData=${JSON.stringify(navInfo.linkObj)}`
        })
      } else {
        this.empty();
      }
    },
    async getCategoryList() { // 新的分类 在首页数据更新完后再做合并
      getCanvasApi({
        terminal: 2,
        type: 1
      }).then(res => {
        if (res.code == '200') {
          // ... 偷懒，懒得一步步走了。。。直接链式调用, 大佬勿喷！！！
          const categories =  JSON.parse(res.data.json).filter((item, index) => item.title == '图文导航')
          .map((item, index) => item.componentContent.imgTextData)
          .flat()
          .slice(0, 7)
          .map(item => {
            return {
              ...item,
              iconUrl:item.img,
              name:item.title 
            }
          })

        // console.log(res)
        // console.log(JSON.parse(res.data.json))
        // console.log(categories);

          this.categories = categories;
          this.categories.push({
            iconUrl: require('@/static/images/index/moremore.png'),
            id: null,
            url: '/pages/furniture/furniture?goodsType=100101741&id=null',
            name: '更多'
          });

          this.homeTopNavs.length < 8 && this.homeTopNavs.push(...this.categories);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    filterList(index) {
      if(index == 1) {
         this.isShowPane = !this.isShowPane
         return
      }
      if (index == 2) {
        uni.navigateTo({
          url: '/pages/index/Explosive/category'
        })
      }
      this.filterActive = index
      if (index == 0) {
        this.queryList = {...this.queryList, type: 1,volume: 0 }
        this.filters[1].value = 1
        this.filters[2].value = 0
      }else {
        this.queryList = {...this.queryList, type: this.filters[1].value, volume: this.filters[2].value }
      }
      this.goodsList = []
      this.getGoodsList()
      // console.log(this.queryList)
    },
    cloasePopup() {
      this.isShowPane = false
    },
    filtersFn(item) {
      this.filters[1].value = item.value
      this.queryList = {...this.queryList, type: this.filters[1].value, volume: this.filters[2].value }
      this.goodsList = []
       this.getGoodsList()
      this.isShowPane = false
    }
  },
  onReachBottom(value) {
        // this.isLoding = true
        this.queryList.page += 1
        this.getGoodsList()
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
    // console.log(this.scrollTop);
  },
};
</script>

<style lang="scss" scoped>
.fillterPanners {
  border-top: 4rpx solid rgba(238, 238, 238, 0.668);
  width: 100%;
  box-sizing: border-box;
  padding: 5rpx;
  background-color: #fff;
  .filterItem {
    width: 100%;
    text-align: center;
    height: 45rpx;
    line-height: 45rpx;
  }
  .isactives {
    color: rgb(255, 68, 0);
  }
}
.shop-page-conatiner {
  min-height: 100vh;
  background: linear-gradient(95deg, #ebebf5 47%, #f9e9f3 96%);

  .main-area {
    width: 100vw;
    // padding: 20upx 30upx;
    // box-sizing: border-box;
    background-color: #fff;
    border-radius: 30upx 30upx 0 0;

    .navs {
      position: relative;
      z-index: 99999;
      border-radius: 30upx 30upx 0 0;
      // background: linear-gradient(180deg, #ffffff 0%, #eff3f6 100%);
      background-color: #fff;
      // height: 396upx;
      padding-bottom: 30upx;

      .nav-wrapper {
        padding: 13upx 30upx 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        .nav-item {
          width: 114upx;
          margin-right: 60upx;
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 24upx;

          &:nth-child(4n) {
            margin-right: 0;
          }

          .category-icon {
            width: 93upx;
            height: 93upx;
            margin-bottom: 12upx;
          }

          .category-name {
            color: #222229;
            font-size: 28upx;
          }
        }
      }
    }

    .package-wrapper {
      margin-top: 20rpx;
      box-sizing: border-box;
      padding: 0rpx 30rpx;
      height: 514upx;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .hot-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;

        .hot {
          font-size: 0;
          color: #222229;
          font-size: 32upx;
          font-weight: 600;
          letter-spacing: 2rpx;
          .color-text {
            color: #ef530e;
          }
        }
      }
    }

    .rest-area {
      z-index: 9999;
      position: relative;
      // margin-top: 10rpx;

      padding-top: 10rpx;
      background-color: #eff3f6;
      // background-color: #fff;

      // .package-wrapper {
      //   height: 514upx;
      //   width: 100%;
      //   display: flex;
      //   align-items: center;
      //   justify-content: space-between;

      //   .hot-container {
      //     height: 100%;
      //     display: flex;
      //     align-items: center;
      //     justify-content: space-between;
      //     flex-direction: column;

      //     .hot {
      //       font-size: 0;
      //       color: #222229;
      //       font-size: 32upx;
      //       font-weight: 500;

      //       .color-text {
      //         color: #ef530e;
      //       }
      //     }
      //   }
      // }

      .goods-filter {
        z-index: 999;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 30upx 88upx;
        background-color: #fff;

        .item {
          position: relative;
          font-size: 32upx;
          width: 140upx;

          &:nth-child(3) {
            text-align: center;
          }

          &:nth-child(2) {
            text-align: center;
          }

          &.active {
            color: #ef530e;
          }


          .sort {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: -8upx;

            .top,
            .bottom {
              position: relative;
            }

            .top {
              top: 12upx;
            }

            .bottom {
              top: -12upx;
            }
          }
        }
      }

      .main-sub-title {
        margin-top: 20rpx;
        display: flex;
        align-items: flex-end;
        font-size: 24upx;
        color: #222229;
        vertical-align: bottom;
        box-sizing: border-box;
        padding: 30upx 28upx 0;
        background-color: #fff;
        // margin: 24upx 0;

        .title {
          font-size: 32upx;
          font-weight: 700;
          margin-right: 6upx;
        }
      }

      .sub-list-container {
        margin-top: 10rpx;
        display: flex;
        align-items: center;
        white-space: nowrap;
        margin-bottom: 20upx;

        .sub-item {
          font-size: 24upx;
          padding: 2upx 12upx;
          border: 1upx solid #777;
          border-radius: 6upx;
          margin-right: 20upx;
          color: #777;

          &.active {
            border-color: #ef530e;
            color: #ef530e;
          }
        }
      }
    }
  }
}
.goods-list {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 140upx;
  background-color: #eff3f6;
  box-sizing: border-box;
  padding: 26rpx 28upx;
  padding-bottom: 120rpx;
}
</style>
