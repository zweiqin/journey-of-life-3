<template>
  <view class="exchange">
    <view class="top-tab">{{ shopName }}的兑换专区</view>
    <view class="sarch-box">
      <tui-input
        placeholder="请输入您想兑换的商品"
        borderColor="yellow"
        :inputBorder="true"
        radius="20"
        padding="10rpx 24rpx"
      >
        <template #left>
          <tui-icon name="search" :size="24"></tui-icon>
        </template>
        <template #right>
          <view class="right-box">搜索</view>
        </template>
      </tui-input>
    </view>
    <view class="container">
      <view class="shop-list">
        <view
          class="shop-item"
          v-for="item in productList"
          :key="item.productId"
          @click="goDetail(item)"
        >
          <view class="item-img">
            <tui-lazyload-img
              width="325rpx"
              height="325rpx"
              :src="item.image || ''"
            ></tui-lazyload-img>
          </view>
          <view class="item-text">{{ item.productName }}</view>
          <view class="item-price">
            <view class="price">
              ￥<text>{{ item.price }}</text>
            </view>
            <view class="count-price">￥{{ item.originalPrice }}</view>
          </view>
          <view class="item-deduction">
            <view class="deduction"
              >可使用{{ item.voucherPrice }}代金券抵扣</view
            >
          </view>
        </view>
      </view>
      <LoadingMore :status="isLoading" text="没有更多兑换商品了"></LoadingMore>
     
    </view>
    <view class="go-box">
        <view class="btn" @click="go('/pages/index/voucher-zone')"
          >更多礼品到兑换专区</view
        >
      </view>
  </view>
</template>

<script>
import { getShopProductsApi } from "@/api/anotherTFInterface";

export default {
  onLoad(option) {
    this.shopName = option.shopName;
    this.queryData.shopId = option.shopId;
    this.getList();
  },
  data() {
    return {
      // 从地址中获取参数
      shopName: "",
      shopId: "",
      queryData: {
        ifNew: 1,
        type: "",
        volume: "",
        page: 1,
        pageSize: 10,
        shopId: 268,
        groupId: "",
        counterType: 1,
      },
      productList: [],
      isLoading: "loading",
      total: null,
    };
  },
  methods: {
    // 请求商品列表
    async getList() {
      this.isLoading = "loading";
      try {
        let res = await getShopProductsApi(this.queryData);
        this.productList = [...this.productList, ...res.data.page.list];
        this.total = res.data.page.total;
      } finally {
        if (this.total == this.productList.length) {
          this.isLoading = "no-more";
        }
      }
    },
    //  去到详情
    goDetail(item) {
      uni.navigateTo({
        url: `/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}&isExchange=1`,
      });
    },
  },
  // 触底加载
  onReachBottom() {
    if (this.total == this.productList.length) return;
    this.queryData.page++;
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.exchange {
  /*  安全区域 */
  padding-top: constant(safe-area-inset-top); //兼容 IOS<11.2
  padding-top: env(safe-area-inset-top); //兼容 IOS>11.2
  min-height: 100vh;
  background-color: #e9e9e973;
  .top-tab {
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    font-weight: 700;
    font-size: 32rpx;
  }
  .sarch-box {
    padding: 20rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    display: none;
    .right-box {
      width: 150rpx;
      height: 50rpx;
      background-color: rgb(242, 242, 242);
      color: #ef530e;
      text-align: center;
      line-height: 50rpx;
      border-radius: 20rpx;
      font-size: 28rpx;
      &:active {
        background-color: rgba(0, 0, 0, 0.15);
      }
    }
  }
  .container {
    padding: 0 20rpx 100rpx;
    box-sizing: border-box;
    .shop-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .shop-item {
        background-color: #ffffff;
        margin-top: 20rpx;
        width: 348rpx;
        padding: 20rpx 10rpx;
        box-sizing: border-box;
        border-radius: 15rpx;
        display: flex;
        flex-direction: column;
        gap: 10rpx;
        .item-img {
          image {
            width: 325rpx;
            height: 325rpx;
            display: block;
          }
        }
        .item-text {
          height: 80rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 28rpx;
        }
        .item-price {
          display: flex;
          gap: 20rpx;
          .price {
            font-size: 28rpx;
            color: #ef530e;
            font-weight: 700;
            display: flex;
            text {
              font-size: 34rpx;
            }
          }
          .count-price {
            font-size: 26rpx;
            color: #ccc;
            text-decoration: line-through;
          }
        }
        .item-deduction {
          .deduction {
            width: 250rpx;
            border: 1rpx solid #ef530e;
            padding: 5rpx;
            border-radius: 8rpx;
            color: #ef530e;
            font-size: 24rpx;
            text-align: center;
          }
        }
      }
    }
  }
}

.go-box {
  width: 100%;
  height: 150rpx;
  display: flex;
  align-items: center;
  /* background-color: #ffffff; */
  position: fixed;
  left: 0;
  bottom: 0;
  .btn {
    width: 500rpx;
    height: 70rpx;
    margin: 0 auto;
    background-color: #ef530e;
    text-align: center;
    line-height: 70rpx;
    color: #ffffff;
    font-size: 26rpx;
    border-radius: 10rpx;
  }
}

::v-deep .tui-input__border {
  &::after {
    border-radius: 200rpx;
  }
}
</style>
