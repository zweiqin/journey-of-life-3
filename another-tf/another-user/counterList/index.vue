<template>
  <view class="exchange">
    <view class="top-tab">
      <view class="top-icon">
        <tui-icon
          name="arrowleft"
          :size="30"
          color="#000"
          @click="backGo"
        ></tui-icon>
      </view>
      <text>{{ shopName }}的兑换专区</text>
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
	name: 'CounterList',
  onLoad(option) {
		this.$store.dispatch('auth/unifiedProcessingShopAction', {
			cb: () => {
				this.queryData.shopId =
					this.$store.state.auth.identityInfo.shopInfo.shopId;
				this.shopName = this.$store.state.auth.identityInfo.shopInfo.shopName;
				this.getList();
			}
		})
	},
  data() {
    return {
      // 从地址中获取参数
      shopName: "",
      shopId: "",
      queryData: {
        ifNew: 1,
        type: 2,
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
    // 返回
    backGo() {
      uni.switchTab({
        url: "/pages/user/user",
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
@import "./index.scss";
</style>
