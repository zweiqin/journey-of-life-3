<template>
  <view class="shop-page-conatiner">
    <TuanAppShim bg="transparent"></TuanAppShim>
    <PageHeader style="z-index: 1;" showSearchBtn></PageHeader>

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

      <!-- <view class="rest-area"> 老许再次启用的版本
        <scroll-view :scroll-x="true" class="goods-filter">
          <view style="display: flex;padding: 0rpx 20rpx">
            <view @click="checkOutShopClass(item, index)" v-for="(item, index) in filtersMenus" :key="item.classifyId" :isActive="index == filterActive" class="filtersItem">
              <image class="icons" :src="item.classifyImage"></image>
              <text class="itemName_two">{{ item.classifyName }}</text>
            </view>
          </view>
        </scroll-view>
      </view> -->
      <view style="height: 210rpx;" v-if="scrollTop > 458"></view>
      <scroll-view :class="{ 'stic-top': scrollTop > 458 }" scroll-x="true" class="menus-wrapper" scroll-with-animation :scroll-into-view="menusItemId">
        <view
          v-for="(item, index) in filtersMenus" :id="'menusItem' + item.classifyId" :key="item.classifyId" class="item"
          :class="{ active: index == filterActive }"  @click="checkOutShopClass(item, index)"
        >
          <image class="icons" :src="item.classifyImage"></image>
          <text>{{ item.classifyName }}</text>
        </view>
      </scroll-view>
      <view class="goods-wrapper">
          <scroll-view scroll-x="true" class="goodsScoll">
            <view class="sub-menus">

              <view class="childsItem" @click="handleChangeSubMenu({
                classifyId: filtersMenus[filterActive].classifyId,
              }, -1)" :class="{ active: childsIndex == -1 }">
                全部
              </view>

              <view
                v-for="(item, index) in filtersMenus[filterActive].childs" :key="item.classifyId" class="childsItem" :class="{ active: childsIndex == index }"
                @click="handleChangeSubMenu(item, index)"
              >
                {{ item.classifyName }}
              </view>

            </view>
          </scroll-view>
      </view>

      <!-- <view :class="{ 'stic-top': scrollTop > 558 }">
        <view class="tui-header">
          <view class="tui-header-top">
            <view class="tui-top-item" @tap="btnDropChange(0)">
              排序 <image
                style="width: 20rpx;height: 16rpx;margin-left: 4rpx;" src="@/static/index/shop/down.png" mode=""
              ></image>
            </view>
            <view class="tui-top-item" @tap="btnDropChange(1)">
              排序条件 <image
                style="width: 20rpx;height: 16rpx;margin-left: 4rpx;" src="@/static/index/shop/down.png" mode=""
              ></image>
            </view>
            <view class="tui-top-item" @tap="btnDropChange(2)">
              <view>是否新品</view>
              <image style="width: 20rpx;height: 16rpx;margin-left: 4rpx;" src="@/static/index/shop/down.png" mode="">
              </image>
            </view>
            <view class="tui-top-item tui-screen" @tap="screen">
              <text class="tui-bold">筛选</text>
              <tui-icon name="screen" :size="12" color="#5677fc" :bold="true"></tui-icon>
            </view>
          </view>
        </view>
        <tui-top-dropdown :show="dropShow" :height="0" :translatey="translatey" @close="btnCloseDrop">
          <scroll-view class="tui-scroll-box" scroll-y scroll-with-animation :scroll-top="scrollTop">
            <view
              v-for="(item, index) in proDropData.list" :key="index" class="tui-drop-item"
              :class="[ item.selected ? 'tui-bold' : '' ]" :data-index="index" @tap.stop="btnSelected($event, item)"
            >
              <text class="tui-ml tui-middle">{{ item.name }}</text>
              <tui-icon
                v-if="index == proDropData.listActiveIndex" name="check" :size="16" color="#5677fc"
                :bold="true"
              ></tui-icon>
            </view>
          </scroll-view>
        </tui-top-dropdown>
        <view class="goods-wrapper">
          <scroll-view scroll-x="true" class="goodsScoll">
            <view class="sub-menus">
              <view
                v-for="item in submenus" :key="item.id" class="item" :class="{ active: query.categoryId == item.id }"
                @click="handleChangeSubMenu(item)"
              >
                {{ item.name }}
              </view>
            </view>
          </scroll-view>
        </view>
      </view> -->
      
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

import { proDropList } from './config'

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
        classifyId: '1193', // 分类ID 1160 备用ID 978 1163
        productName: '', // 商品名称
        search: '',
        type: 1, // 价格升降序
        volume: 0, // 销量升降序
        page: 1,
        pageSize: 25
      },
      filterActive: 0,
      childsIndex: 0,
      filtersMenus: [],
      ad: {
        hot: [],
        good: []
      },
      categories: [],
      goodsList: [], // !   这条数据以下为新的首页结构所需要的数据
      menusItemId: '',
      translatey: 1154,
      scrollTop: 0,
      dropShow: false,
      proDropList, // 筛选栏的样式 暂时不使用
      proDropData: [],
      submenus: [],
    };
  },

  onLoad(options) {
    // this.setSearchParams('voucher')
    this.getGoodsList()

    getFirstClassifyApi({ // ! 获取所有的爆品家具分类
      classifyId: 1160
    }).then(res => {
      this.filtersMenus = Array.from(new Set([res.data[1], res.data[2], res.data[3], res.data[0], res.data[res.data.length - 1],...res.data])) // 修改分类位置
      // console.log(this.filtersMenus);
    })
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
    // translatey() {
    //   if (this.scrollTop > 440) {
    //     return 100
    //   } else {
    //     return 991 - this.scrollTop * 2
    //   }
    // },
  },
  methods: {
    getGoodsList(isCheckOutClass) {
      getClaasifyProductsApi(this.queryList).then(res => {
        if (res.data.list.length <= 0) {
          uni.showToast({
            title: '没有更多商品了',
            icon: 'none',
          });
        }
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
    checkOutShopClass(item, index) {
      this.queryList.page = 1
      this.childsIndex = -1
      this.queryList.classifyId = item.classifyId
      this.filterActive = index
      this.getGoodsList(true)
    },
    handleChangeSubMenu(item, index) {
      this.queryList.page = 1
      this.queryList.classifyId = item.classifyId
      this.childsIndex = index
      this.getGoodsList(true)
    },
    // cloasePopup() {
    //   this.isShowPane = false
    // },
    // btnDropChange(index) {
		// 	this.proDropData = this.proDropList[index]
		// 	this.proDropIndex = index
		// 	this.dropShow = true
		// 	// this.dropdownShow = false
		// },
    screen() {
			// this.tui.xxx 等api 查看【快速上手】文档使用
			uni.showLoading({
				title: '该筛选功能暂时未开放',
				icon: 'none'
			})
		},
  },
  onReachBottom(value) {
        // this.isLoding = true
        this.queryList.page += 1
        this.getGoodsList()
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
    if (e.scrollTop > 558) {
			this.translatey = 66
		} else {
			this.translatey = 1154 - this.scrollTop * 2
		}
    // console.log(this.scrollTop);
  },
};
</script>

<style lang="scss" scoped>
.stic-top {
	z-index: 4;
	width: 100vw;
	position: fixed !important;
	top: 0;
	left: 0;
}
/* .fillterPanners {
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
} */
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
      /* z-index: 99999; */
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

    .rest-area { // !这是已废弃的方案的样式，如过两个月内未回退版本，请删除
      /* z-index: 9999; */
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
        /* z-index: 999; */
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
    .menus-wrapper {
      position: relative;
      /* z-index: 1001; */
      box-sizing: border-box;
      white-space: nowrap;
      display: flex;
      align-items: center;
      padding: 10upx 20upx;
      background-color: #f3f3f3;

      .item {
        margin: 10rpx 0rpx;
        width: 130upx;
        height: 170upx;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 24upx;
        padding: 16upx 12upx;
        box-sizing: border-box;
        margin-right: 12upx;
        border-radius: 10upx;
        flex-shrink: 0;
        transition: all 350ms;
        background-color: #fff;

        .icons {
            width: 120upx;
            height: 120upx;
            object-fit: cover;
            margin-bottom: 10upx;
        }

        &.active {
          box-shadow: 0px 2px 5px 1px rgba(175, 175, 175, 0.6);
        }
      }
    }
  }
}

.tui-drop-item {
	box-sizing: border-box;
	padding: 0rpx 20rpx;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
}

.tui-drop-item:active {
	background-color: #f3f3f3;
}

.tui-drop-item .tui-icon-class {
	vertical-align: middle;
}

/*header*/
.tui-header {
	position: relative;
	width: 100%;
	z-index: 1000;
	// padding-top: 34rpx;
	padding: 20rpx 0rpx;
	/* box-shadow: 0 15rpx 10rpx -15rpx #f2f2f2; */
	box-sizing: border-box;
	background-color: #fff;
	// position: fixed;
	z-index: 1000;
}

.tui-header-top,
.tui-header-bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 26rpx;
	color: #333;
}

.tui-top-item {
	height: 26rpx;
	line-height: 26rpx;
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tui-topitem-active {
	position: relative;
	font-weight: bold;
}

.tui-topitem-active::after {
	content: '';
	position: absolute;
	width: 44rpx;
	height: 6rpx;
	background: #5677fc;
	border-radius: 6rpx;
	bottom: -10rpx;
	left: 50%;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
}

.tui-price-arrow {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 20rpx;
}

.tui-bottom-item .tui-icon-class,
.tui-screen .tui-icon-class {
	margin-left: 6rpx;
}

.tui-icon-box {
	line-height: 12px !important;
	padding: 0 !important;
	display: block !important;
	position: relative;
}

.tui-arrow-up {
	top: 5px;
}

.tui-arrow-down {
	top: -3px;
}

.tui-header-bottom {
	margin-top: 56rpx;
	height: 108rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	font-size: 24rpx;
	align-items: flex-start;
	overflow: hidden;
}

.tui-bottom-text {
	line-height: 24rpx;
}

.tui-bottom-item {
	flex: 1;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 18rpx 12rpx;
	border-radius: 40rpx;
	box-sizing: border-box;
	background: #f2f2f2;
	margin-right: 20rpx;
	white-space: nowrap;
}

.tui-btmItem-active {
	padding-bottom: 60rpx;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

.tui-bold {
	font-weight: bold;
}

.tui-active {
	color: #5677fc;
}

.tui-ml {
	margin-left: 6rpx;
}

.tui-middle {
	vertical-align: middle;
}

.goods-wrapper {
	// margin-top: 66rpx;
	// padding: 18upx 20upx;
	padding-bottom: 0;
	box-sizing: border-box;
	background-color: #fff;
	padding: 10rpx 20rpx;
	.goodsScoll {
		// white-space: nowrap;
	}

	.sub-menus {
		white-space: nowrap;
		display: flex;
		align-items: center;
		// margin-top: 24upx;

		.childsItem {
			padding: 0 16upx;
			border: 1upx solid #777;
			border-radius: 10upx;
			color: #777;
			margin-right: 34upx;
			font-size: 24upx;

			&.active {
				border-color: #fa5151;
				color: #fa5151;
			}
		}
	}
}


.tui-scroll-box {
	max-height: 624rpx;
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
