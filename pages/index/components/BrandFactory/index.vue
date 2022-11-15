<template>
  <div class="brandFactory">
    <view class="banner">
      <swiper
        class="swiper"
        indicator-dots
        autoplay
        indicator-color="#fff"
        indicator-active-color="#fff"
      >
        <swiper-item>
          <img
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/q60ani1r4qkex6u9gaar.png  "
            alt=""
          />
        </swiper-item>
        <swiper-item>
          <img
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/jpvph69uc58iv9pxolni.png "
            alt=""
          />
        </swiper-item>
        <swiper-item>
          <img
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/k70n6d2xhj43hayhvsjj.png "
            alt=""
          />
        </swiper-item>
      </swiper>
    </view>

    <view class="navs">
      <view
        v-for="item in brandClassify"
        :key="item.value"
        :class="{ active: item.value == currentTab }"
        class="style"
        @click="choseType(item)"
      >
        {{ item.label }}
      </view>
      <!-- <view class="item">综合排序</view>
      <view class="item">销售为先</view>
      <view class="item">信用</view>
      <view class="item">品类</view>
      <view class="item">
        筛选
        <img
          class="img"
          src="../../../../static/images/index/screen.png"
          alt=""
        />
      </view> -->
    </view>
    <view v-for="item in brandList" :key="item.id">
      <Panel :name="item.name" :brandId="item.id" :picUrl="item.picUrl"></Panel
    ></view>
  </div>
</template>

<script>
import Panel from "./components/Panel";
import { brandClassify } from "./config";
import { getBrandListApi } from "../../../../api/brand";
export default {
  props: {
    BrandFactory: {
      type: Array,
      required: true,
    },
  },
  data() {
    return { brandClassify, currentTab: 0, brandList: [] };
  },
  components: {
    Panel,
  },
  watch: {
    BrandFactory: {
      handler(value) {
        this.brandList  = value.filter((item1) =>
          item1.name.includes("团蜂")
        );
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    BrandFactoryList() {
      console.log(this.BrandFactory);
      this.brandList = this.BrandFactory.filter((item1) =>
        item1.name.includes("团蜂")
      );
      console.log("a", this.BrandFactory);
    },
    choseType(item) {
      this.currentTab = item.value;
      this.brandList = this.BrandFactory;
      if (item.value == 5) {
        this.brandList = this.BrandFactory;
        console.log(this.brandList);
      } else {
        this.brandList = this.BrandFactory.filter((item1) =>
          item1.name.includes(item.keyWord)
        );
      }
      console.log(this.BrandFactory);
      console.log(this.brandList);
    },
  },
  mounted() {
    // this.BrandFactoryList();
  },
};
</script>

<style lang="less" scoped>
.brandFactory{
  padding-bottom: 200upx;
}
.banner {
  width: 100%;
  height: 284upx;
  border-radius: 20upx;
  overflow: hidden;
  margin-top: 28upx;
  border: 1upx solid #999999;

  .swiper {
    width: 100%;
    height: 284upx;

    /deep/ .uni-swiper-dot-active {
      border-radius: 0;
      width: 40upx !important;
    }

    /deep/ .uni-swiper-dot {
      border-radius: 0px;
      height: 4upx;
      width: 4upx;
      margin-right: 6upx;
    }

    img {
      width: 100%;
      height: 284upx;
    }
  }
}

.navs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20upx 0 34upx 0;
  .style {
    font-size: 28upx;
    font-weight: 500;
    &.active {
      font-size: 28upx;
      font-weight: 600;
      color: #07b9b9;
    }
  }

  .item {
    .img {
      width: 26upx;
      margin-left: 4upx;
      vertical-align: -4rpx;
    }
  }
}
</style>