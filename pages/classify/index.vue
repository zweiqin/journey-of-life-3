<template>
  <view class="classify">
    <TuanAppShim></TuanAppShim>
    <view class="classify-header">
      <tui-icon
        name="arrowleft"
        class="icon"
        :size="32"
        color="#000"
        @click="back"
      ></tui-icon>
      <text>{{ className }}</text>
    </view>
    <view class="classify-sarch">
      <view
        class="search-box"
        @click="go(`/another-tf/another-serve/search/index`)"
      >
        <text>搜索商品</text>
        <view class="btn">搜索</view>
      </view>
    </view>
    <view class="first-classify">
      <view class="scroll-box">
        <scroll-view
          scroll-x="true"
          class="menus-wrapper"
          scroll-with-animation
        >
          <view
            class="item"
            v-for="(item,index) in firstClasslyList"
            :class="firstClassId == item.classifyId ? 'active' : ''"
            :key="index"
            @click="changeFirst(item)"
          >
            <image class="icons" :src="item.classifyImage" />
            <text>{{ item.classifyName }}</text>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="two-classify">
      <scroll-view scroll-x="true" class="two-scroll" scroll-with-animation>
        <view
          class="scroll-view-item"
          v-for="(item,index) in twoClasslyList"
          :class="queryData.classifyId == item.classifyId ? 'active' : ''"
          :key="index"
          @click="changeSecond(item)"
          >{{ item.classifyName }}</view
        >
      </scroll-view>
    </view>
    <view class="product-container">
      <view class="product-list">
        <view
          class="product-item"
          v-for="item in goodsList"
          :key="item.productId"
          @click="goGoodsDetsil(item)""
        >
          <tui-lazyload-img
            width="348rpx"
            height="376rpx"
            :src="item.image || ''"
            radius="20rpx"
            mode="scaleToFill"
          ></tui-lazyload-img>
          <!-- <image class="" :src="https://img1.baidu.com/it/u=1845374591,668063497&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500" /> -->
          <view class="title">{{ item.productName }}</view>
          <view class="price-box">
            <view class="one-price">￥{{ item.price }}<text>起</text></view>
            <view class="voucher">可赠送代金券</view>
          </view>
        </view>
      </view>
      <LoadingMore :status="loading" text="没有更多的商品了"></LoadingMore>
    </view>
  </view>
</template>

<script>
import {
  getClaasifyProductsApi,
  getFirstClassifyApi,
} from "@/api/anotherTFInterface";
export default {
  onLoad(option) {
    this.className = option.className;
    this.classifyId = option.classifyId;
    this.getOneClassify();
  },
  data() {
    return {
      className: "",
      classifyId: "",
      queryData: {
        //  这里是二级激活态
        classifyId: "",
        productName: "",
        search: "",
        page: 1,
        pageSize: 10,
      },
      firstClasslyList: [],
      //  一级激活态
      firstClassId: "",
      //  商品列表
      goodsList: [],
    //    控制是否在触底加载
      isLoading:false
    };
  },
  //    计算属性
  computed: {
    //  计算二级列表
    twoClasslyList() {
      if (this.firstClasslyList.length <= 0) return [];
      let list = this.firstClasslyList.reduce(
        (prev, item, index) => {
          if (item.classifyId == this.firstClassId) {
            prev = [...prev, ...item.childs];
          }
          return prev;
        },
        [{ classifyId: this.firstClassId, classifyName: "全部" }]
      );
      this.queryData.classifyId = list[0].classifyId;
      //  请求二级分类下面的商品数据
      // this.getProducts()
      return list;
    },
    //  计算当前是不是加载状态 用于加载组件
    loading() {
      if(this.isLoading == true){
        return 'loading'
      }else if(this.isLoading == 'no-more'){
        return 'no-more'
      }
    }
  },
  methods: {
    //  获取一级分类下的分类
    async getOneClassify() {
      let res = await getFirstClassifyApi({ classifyId: this.classifyId });
      this.firstClasslyList = res.data;
      if (res.data.length <= 0) {
        this.isLoading = 'no-more'
        return
      };
      this.firstClassId = res.data[0].classifyId;
    },
    //  获取分类下面的商品
    async getProducts() {
        try {
            this.isLoading = true
            let res = await getClaasifyProductsApi(this.queryData);
            if(res.data.list.length <= 0) {
              this.isLoading = 'no-more'
              return
            }
            this.goodsList = [...this.goodsList,...res.data.list];
            this.isLoading = false
        } finally{
            
        }
    },
    //  一级类别点击事件
    changeFirst(item) {
      this.firstClassId = item.classifyId;
      this.goodsList =[]
    },
    //  二级分类点击事件
    changeSecond(item) {
      //  节流
      if (this.queryData.classifyId == item.classifyId) return;
      this.queryData.classifyId = item.classifyId;
    //    重置商品数据
    this.goodsList = []
    },
        //  去到详情页面
        goGoodsDetsil(shopItem) {
      uni.navigateTo({
        url: `/another-tf/another-serve/goodsDetails/index?shopId=${shopItem.shopId}&productId=${shopItem.productId}&skuId=${shopItem.skuId}`,
      });
    },
    back() {
      uni.navigateBack();
    },
  },
  watch: {
    "queryData.classifyId": function (newVal, oldVal) {
      this.getProducts();
    },
  },
  //    触底加载
  onReachBottom() {
    //  做节流
    if(this.isLoading) return
    this.queryData.page++;
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
