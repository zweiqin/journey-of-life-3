<template>
  <view class="index">
    <TuanAppShim></TuanAppShim>
    <view class="container">
      <view class="index-header">
        <view class="address" @click="handleGetUserLocation">
          <image class="" src="@/static/images/new-index/index-2/address.png" />
          <text>{{ currentAddress }}</text>
          <tui-icon
            name="turningdown"
            color="#000000"
            size="32"
            unit="rpx"
          ></tui-icon>
        </view>
        <view
          class="search"
          @click="go(`/another-tf/another-serve/search/index`)"
          >搜索商品</view
        >
        <view
          class="news"
          @click="go('/another-tf/another-serve/messageCenter/index')"
        >
          <image class="" src="@/static/images/new-index/index-2/news.png" />
        </view>
      </view>
      <view class="index-tool">
        <view class="tool-list">
          <view
            class="tool-item"
            v-for="item in toolList"
            :key="item.name"
            @click="handleViewDetail(item)"
          >
            <image class="" :src="item.iconUrl" />
            <text>{{ item.name }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="index-activity">
      <image
        class=""
        src="@/static/images/new-index/index-2/active_1.png"
        @click="
          go('/another-tf/another-user/transaction-funds/trading-activities')
        "
      />
      <image
        class=""
        src="@/static/images/new-index/index-2/active_2.png"
        @click="expect"
      />
    </view>
    <view class="index-pruducts">
      <view class="products-list">
        <view
          class="products-item"
          v-for="item in shopList"
          :key="item.productId"
          @click="goGoodsDetsil(item)"
        >
          <view class="img-box">
            <tui-lazyload-img
              width="100%"
              height="328rpx"
              :src="item.image || ''"
              radius="16rpx 16rpx 0 0"
            ></tui-lazyload-img>
          </view>
          <view class="item-title">{{ item.productName }}</view>
          <view class="official">
            <view class="off-box">旗舰店</view>
            <view class="off-box">官方正品</view>
          </view>
          <view class="price">
            <text>￥{{ item.price }}</text>
            <text>￥{{ item.originalPrice }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getIndexAllGoodsApi } from "@/api/anotherTFInterface";
export default {
  data() {
    return {
      toolList: [
        {
          name: "兑换商城",
          iconUrl: require("@/static/images/new-index/index-2/icon_1.png"),
          url: "/pages/index/voucher-zone",
        },
        {
          name: "爆品专区",
          iconUrl: require("@/static/images/new-index/index-2/icon_2.png"),
          url: "/pages/classify/index?classifyId=1160&className=家具甄选",
          // 1586
        },
        {
          name: "家具甄选",
          iconUrl: require("@/static/images/new-index/index-2/icon_3.png"),
          url: "/pages/classify/index?classifyId=978&className=家具甄选",
          // 1587
        },
        {
          name: "灯饰甄选",
          iconUrl: require("@/static/images/new-index/index-2/icon_4.png"),
          //  1588
        },
        {
          name: "软装甄选",
          iconUrl: require("@/static/images/new-index/index-2/icon_5.png"),
        },
        {
          name: "建材甄选",
          iconUrl: require("@/static/images/new-index/index-2/icon_6.png"),
        },
        {
          name: "辅材工具",
          iconUrl: require("@/static/images/new-index/index-2/icon_7.png"),
          url: "/pages/classify/index?classifyId=1446&className=辅材工具",
        },
        {
          name: "智能选配",
          iconUrl: require("@/static/images/new-index/index-2/icon_8.png"),
          url: "/pages/index/IntelligentSelection/index",
        },
      ],
      queryData: {
        classifyId: "",
        productName: "",
        search: "",
        type: 1,
        page: 1,
        pageSize: 10,
      },
      shopList: [],
      ifLoging:false
    };
  },
  computed: {
    currentAddress() {
      const currentAddress = this.$store.getters.currentShopCity + "";
      if (!currentAddress) {
        return "定位失败";
      } else {
        return currentAddress.length > 4
          ? currentAddress.slice(0, 4) + "..."
          : currentAddress;
      }
    },
  },
  created() {
    this.getAll();
  },
  methods: {
    //  获取所有商品数据
    async getAll() {
      uni.showLoading({
        title: "正在加载商品...",
      });
      try {
        this.ifLoging = true
        let {
          data: { list },
        } = await getIndexAllGoodsApi(this.queryData);
        this.shopList = [...this.shopList, ...list];
      } finally {
        this.ifLoging= false
        uni.hideLoading();
      }
    },
    // 点击获取定位
    handleGetUserLocation() {
      let url = `/pages/choose-location/choose-location?eventName=${this.eventName}`;
      if (this.free) {
        url += "&isUnLimit=true";
      }
      uni.navigateTo({
        url,
      });
    },
    // 跳转
    handleViewDetail(navInfo) {
      if (navInfo.url) {
        uni.navigateTo({ url: navInfo.url });
      }
    },
    //  去到详情页面
    goGoodsDetsil(shopItem) {
      uni.navigateTo({
        url: `/another-tf/another-serve/goodsDetails/index?shopId=${shopItem.shopId}&productId=${shopItem.productId}&skuId=${shopItem.skuId}`,
      });
    },
    expect() {
      uni.showToast({
        title: "敬请期待",
        icon: "none",
        duration: 2000,
      });
    },
  },

  //    触底加载
  onReachBottom() {
    //  做节流
    if(this.ifLoging) return
    this.queryData.page++;
    this.getAll();
  },
};
</script>

<style lang="scss" scoped>
@import "./indexTwo.scss";
</style>
