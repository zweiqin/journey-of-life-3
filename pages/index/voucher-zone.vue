<template>
  <view class="voucher-zone-container">
    <view class="page-haeder">
      <image @click="handleBack" src="../../static/images/new-business/category/back.png" class="back-icon"></image>
      <view class="search-container" @click="go('/pages/search-page/search-page')">
        <input type="text" class="input" placeholder="请输入您想搜索的商品">
        <button class="uni-btn">搜索</button>
      </view>
    </view>

    <view class="main-arae">
      <!-- nav -->
      <view class="navs">
        <view class="nav-item" v-for="item in voucherNavs" :key="item.label
          ">
          <image :src="item.icon" class="nav-icon"></image>
          <view class="nav-name">{{ item.label }}</view>
        </view>
      </view>

      <!-- hot -->
      <view class="hot-conatiner">
        <view class="item hot-left">
          <view class="title-wrapper">
            <view class="main-title">热销特卖</view>
          </view>

          <view class="goods-wrapper">
            <VoucherGoods v-for="item in ad.hot" :goodsData="item"></VoucherGoods>
          </view>
        </view>
        <view class="item hot-right">
          <view class="title-wrapper">
            <view class="main-title">销量榜单</view>
            <view class="tag">好物推荐</view>
          </view>
          <view class="goods-wrapper">
            <VoucherGoods v-for="item in ad.good" :goodsData="item"></VoucherGoods>
          </view>
        </view>
      </view>

      <!-- 推荐 -->
      <view class="recommend-container">
        <view class="type-container">
          <view class="recommend-title" :class="{ active: currentType == 100101738 }"
            @click="handleSwitchType(100101738)">
            <view class="title">精品推荐</view>
            <view class="tag">为您推荐</view>
          </view>

          <view class="recommend-title" :class="{ active: currentType == 100101739 }"
            @click="handleSwitchType(100101739)">
            <view class="title">今日优惠</view>
            <view class="tag">猜你喜欢</view>
          </view>

          <view class="recommend-title" :class="{ active: currentType == 100101740 }"
            @click="handleSwitchType(100101740)">
            <view class="title">爆款抢购</view>
            <view class="tag">好物严选</view>
          </view>
        </view>

        <view class="voucher-list">
          <VoucherDeatilGoodsPane v-for="voucherGoods in $data._list" :key="voucherGoods.id" :goodsInfo="voucherGoods">
          </VoucherDeatilGoodsPane>
          <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>
        </view>
      </view>
    </view>


  </view>
</template>

<script>
import { voucherNavs } from './config'
import VoucherGoods from './cpns/VoucherGoods.vue';
import VoucherDeatilGoodsPane from './cpns/VoucherDeatilGoodsPane.vue';
import loadMore from '../../mixin/loadMore'
import { goodsListApi } from '../../api/goods';

export default {
  components: {
    VoucherGoods,
    VoucherDeatilGoodsPane
  },
  data() {
    return {
      voucherNavs: Object.freeze(voucherNavs),
      currentType: 100101738,
      ad: {
        hot: [],
        good: []
      }
    }
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
  mounted() {
    this.$set(this.$data._query, 'categoryId', 100101725)
    this._loadData()
  },
  methods: {
    handleSwitchType(currentType) {
      this.currentType = currentType
      this.$set(this.$data._query, 'categoryId', currentType)
      this.$set(this.$data._query, 'page', 1)
      this.$data._list = []
      this._loadData()
    },

    handleBack() {
      uni.switchTab({
        url: '/pages/index/index'
      });
    }
  },
}
</script>

<style lang="less" scoped>
.voucher-zone-container {
  width: 100vw;
  height: 100vh;
  background-color: #F6F6F8;

  .page-haeder {
    width: 100vw;
    display: flex;
    align-items: center;
    height: 128upx;
    background-color: #fff;
    padding: 28upx 30upx;
    box-sizing: border-box;

    .back-icon {
      width: 48upx;
      height: 48upx;
      flex-shrink: 0;
    }

    .search-container {
      height: 72upx;
      flex: 1;
      border: 1upx solid #EF5511;
      border-radius: 100px;
      display: flex;
      align-items: center;
      padding: 14upx 10upx 14upx 30upx;
      box-sizing: border-box;

      .input {
        flex: 1;
        font-size: 24upx;
      }


      .uni-btn {
        height: 54upx;
        width: 112upx;
        display: flex;
        justify-content: center;
        background: linear-gradient(270deg, #EF530E 0%, #EE6C33 100%);
        color: #fff;
        align-items: center;
        border-radius: 100px;
        font-size: 28upx;

      }
    }
  }

  .main-arae {
    padding: 24upx 20upx 30upx 24upx;
    box-sizing: border-box;

    .navs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      .nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 124upx;
        height: 150upx;
        background-color: #fff;
        margin-bottom: 24upx;
        border-radius: 10upx;

        .nav-icon {
          height: 88upx;
          width: 88upx;
          flex-shrink: 0;
        }

        .nav-name {
          color: #222229;
          font-size: 24upx;
          margin-top: 12upx;
        }
      }
    }

    .hot-conatiner {
      width: 100%;
      height: 322upx;
      background-color: #fff;
      border-radius: 20upx;
      display: flex;
      align-items: center;

      .item {
        flex: 1;
        box-sizing: border-box;
        height: 100%;
        padding: 20upx 16upx 16upx 13upx;

        .title-wrapper {
          margin-bottom: 7upx;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .main-title {
            color: #222229;
            font-size: 30upx;
          }

          .tag {
            padding: 0 13upx;
            line-height: 1.5;
            color: #E24747;
            font-size: 24upx;
            border: 1upx solid #E24747;
            border-radius: 10upx;
          }
        }

        .goods-wrapper {
          width: 100%;
          justify-content: space-between;
          display: flex;
          align-items: center;
        }

        &.hot-left {
          border-right: 1upx solid #D8D8D8;
        }
      }
    }

    .recommend-container {

      .type-container {
        display: flex;
        align-items: center;
      }

      .recommend-title {
        margin-top: 35upx;
        margin-bottom: 24upx;
        padding-right: 32upx;
        margin-right: 32upx;
        border-right: 1upx solid #D8D8D8;

        &:nth-child(3) {
          border-right: 0;
        }

        &.active {
          .tag {
            background-color: #EF540F;
            color: #fff;
          }
        }

        .title {
          font-size: 32upx;
          color: #222229;
          font-weight: 500;
          margin-bottom: 12upx;
        }

        .tag {
          width: 138upx;
          height: 40upx;
          border-radius: 100px;
          font-size: 28upx;
          text-align: center;
          line-height: 40upx;
          color: #979797;
          font-weight: 500;
        }
      }
    }
  }
}
</style>