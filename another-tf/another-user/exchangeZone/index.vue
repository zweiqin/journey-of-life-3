<template>
  <view class="exchangeZone">
    <view class="exchange-bg"></view>
    <view class="container">
      <view class="top-tab">
        <view>
          <tui-icon
            name="arrowleft"
            :size="30"
            color="#FFFFFF"
            @click="goBake"
          ></tui-icon
        ></view>
        <view class="top-text">线下兑换</view>
      </view>
      <view class="search-box">
        <input type="text" v-model="serachName" placeholder="请输入商品名称" />
        <view class="serach" @click="searchList">搜索</view>
      </view>
      <view class="product-list">
        <view
          class="product-item"
          v-for="(item, index) in realList"
          :key="index"
          @click.stop="goGoodsDetsil(item)"
        >
          <!-- <image
            class=""
            mode="aspectFill"
            :src="item.image"
          /> -->
          <tui-lazyload-img
            mode="aspectFill"
            width="100%"
            height="268rpx"
            radius="16rpx"
            :src="item.image"
          ></tui-lazyload-img>
          <view class="product-text">{{ item.productName }}</view>
          <view class="product-buttom">
            <view class="buttom-price"><text>￥</text>{{ item.price }}</view>
            <view class="buttom-btn" @click.stop="addCart(item)">加入购物车</view>
          </view>
        </view>
      </view>
    </view>
    <ATFSpecificationScreen
			ref="refATFSpecificationScreen" is-splicing :splicing-id="initiatedSplicingId"
			@success="initShopCart"
		></ATFSpecificationScreen>
    <ATFStoreShopCart
				ref="refATFStoreShopCart" :brand-id="brandDetail.shopId" :cart-type="1"
        @update-msg="(e) => initiatedSplicingId = (e[0] && e[0].splicingId) || 0"
        is-procure
			></ATFStoreShopCart>
  </view>
</template>

<script>
import { getShopProductsApi } from "@/api/anotherTFInterface";
export default {
  created() {
    this.getProductList();
  },
  data() {
    return {
      //  请求商品参数
      queryData: {
        shopId: 186,
        ifNew: 1,
        type: "",
        volume: "",
        page: 1,
        pageSize: 20,
        groupId: "",
        counterType: "",
      },
      serachName: "",
      // 商品列表
      productList: [],
      realList: [],
      total: 0,
      //  组件参数
      brandDetail:{
        shopId:186
      },
			initiatedSplicingId: 0
    };
  },
  methods: {
    initShopCart() {
			if (this.brandDetail.shopId && this.$refs.refATFStoreShopCart && this.$refs.refATFStoreShopCart.$refs.refATFShopCartList) {
				this.$refs.refATFStoreShopCart.$refs.refATFShopCartList.getShopCartData('single')
			}
		},
    //  获取兑换专区列表
    async getProductList() {
      uni.showLoading({
        title: "加载中...",
      });
      try {
        let {
          data: { page },
        } = await getShopProductsApi(this.queryData);
        this.total = page.total;
        this.productList = [...this.realList, ...page.list];
        this.realList = this.productList;
      } finally {
        uni.hideLoading();
      }
    },
    //  搜索
    searchList() {
      if (this.serachName == "") {
        this.realList = this.productList;
        return;
      }
      //  过滤查询当前列表有关键字的
      let list = this.productList.filter((item) =>
        item.productName.includes(this.serachName)
      );
      // console.log(list);
      this.realList = list;
    },
    //  去到详情页面
    goGoodsDetsil(shopItem) {
      uni.navigateTo({
        url: `/another-tf/another-serve/goodsDetails/index?shopId=${shopItem.shopId}&productId=${shopItem.productId}&skuId=${shopItem.skuId}&isProcure=1`,
      });
    },
    //  加入购物车
    addCart(e){
      this.$refs.refATFSpecificationScreen.open(e.shopId, e.productId, e.skuId)
    },
    // 返回箭
    goBake() {
      uni.switchTab({
        url: "/pages/user/user",
      });
    },
  },
  //  触底加载
  onReachBottom() {
    if (this.productList.length >= this.total) {
      this.$showToast("暂无更多数据");
      return;
    }
    this.queryData.page++;
    this.getProductList();
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
