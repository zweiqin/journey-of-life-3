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
        <scroll-view :scroll-x="true" class="goods-filter">
          <view style="display: flex;padding: 0rpx 20rpx">
            <view @click="checkOutShopClass(item, index)" v-for="(item, index) in filtersMenus" :key="item.classifyId" :isActive="index == filterActive" class="filtersItem">
              <image class="icons" :src="item.classifyImage"></image>
              <text class="itemName_two">{{ item.classifyName }}</text>
            </view>
          </view>
        </scroll-view>
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
      filtersMenus: [],
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

    getFirstClassifyApi({ // ! 获取所有的爆品家具分类
      classifyId: 1160
    }).then(res => {
      this.filtersMenus = new Set([res.data[1],res.data[0], ...res.data]) // 反转一二号分类的位置
      // console.log(this.filtersMenus);
    })
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
    getGoodsList(isCheckOutClass) {
      getClaasifyProductsApi(this.queryList).then(res => {
        if (!isCheckOutClass) {
            res.data.list.forEach(item => this.goodsList.push(item))
        }else {
            this.goodsList.length =  res.data.list.length
            res.data.list.forEach((item, index, preArray) => this.goodsList[index] = preArray[index])
        }
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
    checkOutShopClass(item, index) {
      this.queryList.page = 1
      this.queryList.classifyId = item.classifyId
      this.filterActive = index
      this.getGoodsList(true)
    },
    cloasePopup() {
      this.isShowPane = false
    },
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
        padding-top: 10rpx;
        z-index: 999;
        position: relative;
        white-space: nowrap;
        box-sizing: border-box;
        width: 100vw;
        display: flex;
        /* padding: 30upx; */
        /* background-color: #ffffff; */
        
        .filtersItem {
          width: 130upx;
          background-color: rgb(255, 255, 255);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 10upx;
          color: #000000;
          margin-right: 20upx;
          transition: transform 350ms;
          border-radius: 4px;
          .icons {
            width: 120upx;
            height: 120upx;
            object-fit: cover;
            margin-bottom: 10upx;
          }

          .itemName_two {
            color: #1d1f1f;
          }

        }
        .filtersItem[isactive="true"] {
            border: 1rpx solid #e95d20;
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
