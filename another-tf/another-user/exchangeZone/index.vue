<template>
  <view class="exchangeZone">
    <view class="exchange-bg"></view>
    <view class="container">
      <view class="bg-container">
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
        <view class="search-container">
          <view class="search-box">
            <input
              type="text"
              v-model="queryData.search"
              placeholder="请输入商品名称"
            />
            <view class="serach" @click="searchList">搜索</view>
          </view>
        </view>
        <view class="primary-class">
          <scroll-view scroll-x="true" class="other-bottom">
            <view
              class="bottom-item"
              v-for="(item, index) in firstClassify"
              :key="index"
              :class="{ act: index == firstIdx }"
              @click="changeFirst(index)"
              >{{ item.classifyName }}</view
            >
          </scroll-view>
        </view>
      </view>
      <view class="second-bg">
        <view class="secondary-class" v-if="firstIdx != 0">
          <scroll-view scroll-x="true" class="secondary-bottom">
            <view
              class="secondary-item"
              v-for="(item, index) in secoundClass"
              :key="index"
              :class="{ act: index == secoundIdx }"
              @click="changeSecound(index)"
              >{{ item.classifyName }}</view
            >
          </scroll-view>
        </view>
        <view class="screen">
          <view class="screen-item">
            <text>价格升序</text>
            <view class="item-icon" @click="priceScreen">
              <view class="icon1">
                <tui-icon
                  name="turningup"
                  :size="20"
                  :color="priceColor(1)"
                ></tui-icon>
              </view>
              <view class="icon2">
                <tui-icon
                  name="turningdown"
                  :size="20"
                  :color="priceColor(2)"
                ></tui-icon>
              </view>
            </view>
          </view>
          <view class="screen-item">
            <text>销量升序</text>
            <view class="item-icon" @click="salesScreen">
              <view class="icon1">
                <tui-icon
                  name="turningup"
                  :size="20"
                  :color="salesColor(1)"
                ></tui-icon>
              </view>
              <view class="icon2">
                <tui-icon
                  name="turningdown"
                  :size="20"
                  :color="salesColor(2)"
                ></tui-icon>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="product-list">
        <view
          class="product-item"
          v-for="(item, index) in productList"
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
            <view class="buttom-btn" @click.stop="addCart(item)"
              >加入购物车</view
            >
          </view>
        </view>
      </view>
    </view>
    <ATFSpecificationScreen
      ref="refATFSpecificationScreen"
      is-splicing
      :splicing-id="initiatedSplicingId"
      @success="initShopCart"
    ></ATFSpecificationScreen>
    <ATFStoreShopCart
      ref="refATFStoreShopCart"
      :brand-id="brandDetail.shopId"
      :cart-type="1"
      @update-msg="
        (e) => (initiatedSplicingId = (e[0] && e[0].splicingId) || 0)
      "
      is-procure
    ></ATFStoreShopCart>
  </view>
</template>

<script>
import {
  getShopProductsApi,
  getFirstClassifyApi,
} from "@/api/anotherTFInterface";
export default {
  created() {
    // this.getProductList();
    this.getFirst();
  },
  computed: {
    priceColor(type) {
      return function (type) {
        return type == this.queryData.type ? "#000000" : "rgba(0, 0, 0, 0.4)";
      };
    },
    salesColor(type) {
      return function (type) {
        return type == this.queryData.volume ? "#000000" : "rgba(0, 0, 0, 0.4)";
      };
    },
    secoundClass() {
      if (this.firstClassify.length > 0) {
        //  添加一个全部的分类
        let list = [
          {
            classifyId: this.firstClassify[this.firstIdx].classifyId,
            classifyName: "全部",
          },
          ...this.firstClassify[this.firstIdx].childs,
        ];
        return list;
      }
      return [];
    },
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
        classifyId: "",
        search: "",
        type: "",
        volume: "",
      },
      //  一级列表
      firstClassify: [],
      //  一级选中态
      firstIdx: 0,
      //  二级选中态
      secoundIdx: 0,
      // 商品列表
      productList: [],
      total: 0,
      //  组件参数
      brandDetail: {
        shopId: 186,
      },
      initiatedSplicingId: 0,
    };
  },
  onShow() {
    this.initShopCart();
  },
  methods: {
    //  请求一级分类
    async getFirst() {
      let res = await getFirstClassifyApi({ classifyId: "1598" });
      console.log(res.data)
      this.firstClassify = [{classifyId:"1598" ,classifyName:"全部"},...res.data];
      // //  请求商品列表
      this.queryData.classifyId = "1598";
      // //  请求商品
      this.getProductList();
    },
    //  一级分类修改
    changeFirst(index) {
      this.firstIdx = index;
      this.secoundIdx = 0;
      //  重新赋值 classifyId
      this.queryData.classifyId = this.firstClassify[index].classifyId;
      //  请求商品
      this.getProductList(true);
    },
    //  二级分类修改
    changeSecound(index) {
      this.secoundIdx = index;
      //  重新赋值 classifyId
      this.queryData.classifyId = this.secoundClass[index].classifyId;
      //  请求商品
      this.getProductList(true);
    },
    //  价格排序
    priceScreen() {
      this.queryData.type =
        this.queryData.type === ""
          ? "1"
          : this.queryData.type === "1"
          ? "2"
          : "1";
      this.getProductList(true);
    },
    //  销量排序
    salesScreen() {
      this.queryData.volume =
        this.queryData.volume === ""
          ? "1"
          : this.queryData.volume === "1"
          ? "2"
          : "1";
      this.getProductList(true);
    },
    initShopCart() {
      if (
        this.brandDetail.shopId &&
        this.$refs.refATFStoreShopCart &&
        this.$refs.refATFStoreShopCart.$refs.refATFShopCartList
      ) {
        this.$refs.refATFStoreShopCart.$refs.refATFShopCartList.getShopCartData(
          "single"
        );
      }
    },
    //  获取采购专区列表
    async getProductList(flag) {
      uni.showLoading({
        title: "加载中...",
      });
      try {
        let {
          data: { page },
        } = await getShopProductsApi(this.queryData);
        this.total = page.total;
        if (flag) {
          this.productList = page.list;
        } else {
          this.productList = [...this.productList, ...page.list];
        }
      } finally {
        uni.hideLoading();
      }
    },
    //  搜索
    searchList() {
      this.queryData.page = 1;
      this.getProductList(true);
    },
    //  去到详情页面
    goGoodsDetsil(shopItem) {
      uni.navigateTo({
        url: `/another-tf/another-serve/goodsDetails/index?shopId=${shopItem.shopId}&productId=${shopItem.productId}&skuId=${shopItem.skuId}&isProcure=1`,
      });
    },
    //  加入购物车
    addCart(e) {
      this.$refs.refATFSpecificationScreen.open(e.shopId, e.productId, e.skuId);
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
