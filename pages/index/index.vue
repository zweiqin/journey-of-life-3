<template>
  <view class="shop-page-conatiner">
    <TuanAppShim bg="transparent"></TuanAppShim>
    <PageHeader></PageHeader>

    <view class="main-area">
      <view class="navs">
        <view class="nav-wrapper">
          <view class="nav-item" @click="handleViewDetail(item)" v-for="item in homeTopNavs" :key="item.label">
            <image class="category-icon" :src="item.icon"></image>
            <view class="category-name">{{ item.label }}</view>
          </view>
        </view>
      </view>

      <view class="rest-area">
        <view class="package-wrapper">
          <view class="voucher-container">
            <VoucherPane></VoucherPane>
          </view>
          <view class="hot-container">
            <HotPane :goodsData="ad.hot" subTitle="网红爆款">
              <block slot="title">
                <view class="hot">
                  <text class=" text color-text">热销</text>
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

        <view class="main-sub-title">
          <view class="title">为您推荐</view>
          <view class="sub-title"> 有价值的实用好物 新生活新零售</view>
        </view>

        <view class="goods-list">
          <NewGoodsPane v-for="item in $data._list.slice(4)" :goods="item" :key="item.id">
          </NewGoodsPane>
          <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>
        </view>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import PageHeader from './cpns/PageHeader.vue'
import VoucherPane from './cpns/VoucherPane.vue'
import HotPane from './cpns/HotPane.vue'
import NewGoodsPane from './cpns/NewGoodsPane.vue'

import loadMore from '../../mixin/loadMore'
import { goodsListApi } from '../../api/goods';

import { homeTopNavs } from './config'
export default {
  components: {
    PageHeader,
    VoucherPane,
    HotPane,
    NewGoodsPane
  },

  mixins: [loadMore({
    api: goodsListApi,
    mapKey: { totalPages: "totalPages", list: "goodsList", size: "size" },
    dataFn(goodsArr) {
      if (!this.ad.hot.length) {
        this.ad.hot.push(...goodsArr.slice(0, 2))
        this.ad.good.push(...goodsArr.slice(2, 4))
      }
      return goodsArr
    }
  })],

  data() {
    return {
      homeTopNavs: Object.freeze(homeTopNavs),
      ad: {
        hot: [],
        good: []
      }
    }
  },

  onLoad() {
    this._loadData()
  },

  methods: {
    handleViewDetail(navInfo) {
      if (navInfo.url) {
        uni.navigateTo({ url: navInfo.url })
      } else {
        this.empty()
      }
    }
  },
}
</script>

<style lang="less" scoped>
.shop-page-conatiner {
  min-height: 100vh;
  background: linear-gradient(95deg, #EBEBF5 47%, #F9E9F3 96%);

  .main-area {
    width: 100vw;
    // padding: 20upx 30upx;
    // box-sizing: border-box;
    background-color: #fff;
    border-radius: 30upx 30upx 0 0;

    .navs {
      border-radius: 30upx 30upx 0 0;
      background: linear-gradient(180deg, #FFFFFF 0%, #EFF3F6 100%);
      height: 396upx;

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

    .rest-area {
      padding: 0 28upx;
      box-sizing: border-box;
      background-color: #EFF3F6;


      .package-wrapper {
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
            font-weight: 500;

            .color-text {
              color: #EF530E;
            }

          }
        }
      }

      .main-sub-title {
        display: flex;
        align-items: flex-end;
        font-size: 24upx;
        color: #222229;
        vertical-align: bottom;
        margin: 24upx 0;

        .title {
          font-size: 32upx;
          font-weight: 700;
          margin-right: 6upx;

        }
      }

      .goods-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-bottom: 140upx;
        background-color: #EFF3F6;
      }
    }


  }
}
</style>