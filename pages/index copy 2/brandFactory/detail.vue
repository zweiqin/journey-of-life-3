<template>
  <view class="brand-detail-container" v-if="brandInfo">
    <view class="brand-logo">
      <image
        :style="{
          height: sticky ? '360upx' : 360 - scrollTop * 2 + 'upx',
        }"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/r51a3a9t43oxhy63q9mi.png"
      />

      <view class="header" :class="{ 'header-fix': scrollTop > 0 }">
        <navigator url="" open-type="navigateBack">
          <image
            :src="
              scrollTop > 0
                ? '../../../static/images/store/back-block.png'
                : '../../../static/images/store/back-white.png'
            "
            mode=""
          />
        </navigator>

        <view
          class="brand-name"
          :style="{ color: scrollTop > 0 ? '#000' : '#fff' }"
          >品牌工厂</view
        >
      </view>
    </view>

    <view class="main">
      <view class="brand-detail">
        <image
          v-if="brandInfo.picUrl"
          class="avatar"
          :src="brandInfo.picUrl"
          mode=""
        />
        <view v-else class="avatar name-avatar">{{ brandInfo.name }}</view>
        <view class="brand-info">
          <view class="brand-name">{{ brandInfo.name }}</view>
          <view class="h-list">
            <image
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/tk3ayg0sglz44lavgru6.png"
              mode=""
            />
            <view class="tag">品牌工厂</view>
            <view class="tag">官方直营</view>
          </view>
        </view>
        <button class="uni-btn">订阅</button>
      </view>

      <view class="n-address">
        <view>{{ brandInfo.name }}</view>
        <view class="to">
          <text>导航</text>
          <image
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ixheodgerarfr9rrr0xj.png"
            mode=""
          />
        </view>
      </view>

      <view class="desc" v-if="brandInfo.desc">
        {{ brandInfo.desc }}
      </view>
    </view>

    <view>
      <view class="navs">
        <view
          class="item"
          @click="currentNav = 0"
          :class="{ active: currentNav === 0 }"
          >推荐</view
        >
        <view
          class="item"
          @click="currentNav = 1"
          :class="{ active: currentNav === 1 }"
          >商品</view
        >
      </view>

      <Recommend
        v-if="currentNav === 0"
        :hot="hotGoods"
        :newGoods="newGoods"
      ></Recommend>
      <GoodsClassification
        v-else
        :brandId="brandId"
        :menus="menus"
      ></GoodsClassification>
    </view>
  </view>
</template>

<script>
import { getBrandDetailApi } from "../../../api/brand";
import { goodsListApi } from "../../../api/goods";
import Recommend from "./components/recommend.vue";
import GoodsClassification from "./components/goods-classification.vue";

export default {
  data() {
    return {
      brandId: null,
      timer: null,
      brandInfo: null,
      goodsList: [],
      hotGoods: [],
      newGoods: [],
      scrollTop: 0,
      menus: [],
      currentNav: 0,
      sticky: false,
    };
  },
  components: {
    Recommend,
    GoodsClassification,
  },
  onLoad(params) {
    this.brandId = params.brandId;
    this.getBrandDetail();
  },

  methods: {
    async getBrandDetail() {
      uni.showLoading();
      const res = await getBrandDetailApi({
        id: this.brandId,
      });
      uni.hideLoading();
      if (res.errno === 0) {
        console.log(res.data.brand);
        this.brandInfo = res.data.brand;
        this.getGoodsList();
      } else {
        uni.showToast({
          title: "工厂详情获取失败，请看其他品牌工厂吧",
          duration: 2000,
          icon: "none",
        });

        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.timer = setTimeout(() => {
          uni.navigateBack();
        }, 2000);
      }
    },

    async getGoodsList() {
      uni.showLoading();
      const res = await goodsListApi({
        page: 1,
        size: 30,
        brandId: this.brandId,
      });
      uni.hideLoading();

      if (res.errno === 0) {
        this.goodsList = res.data.goodsList || [];
        this.menus = res.data.filterCategoryList || [];
        this.goodsList.forEach((goods, index) => {
          if (index % 2 !== 0 && goods.isHot && goods.isNew) {
            this.newGoods.push(goods);
          } else {
            this.hotGoods.push(goods);
          }
        });
      }
    },
  },

  onUnload() {
    clearTimeout(this.timer);
    this.timer = null;
  },

  onPageScroll(e) {
    if (this.scrollTop > 100) {
      this.sticky = true;
      return;
    } else {
      this.sticky = false;
    }

    this.scrollTop = e.scrollTop;
  },
};
</script>

<style lang="less" scoped>
.brand-detail-container {
  width: 100%;
  font-size: 28upx;
  height: 100vh;
  overflow: scroll;

  .brand-logo {
    position: relative;

    image {
      height: 360upx;
      width: 100%;
      // transition: height 200ms;
    }

    .header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 94upx;
      font-size: 36upx;
      color: #fff;
      font-weight: bold;
      padding: 0 32upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 350ms;
      z-index: 100;

      &.header-fix {
        position: fixed;
        background-color: #fff;
      }

      image {
        position: absolute;
        top: 50%;
        left: 32upx;
        width: 50upx;
        height: 50upx;
        transform: translateY(-50%);
      }
    }
  }

  .main {
    padding: 4upx 24upx;
    box-sizing: border-box;

    .brand-detail {
      display: flex;
      justify-content: space-between;

      .avatar {
        position: relative;
        top: -40upx;
        width: 160upx;
        height: 160upx;
        border-radius: 10upx;
        margin-right: 20upx;

        &.name-avatar {
          background-color: #e95d20;
          color: #fff;
          font-size: 32upx;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          white-space: nowrap;
          overflow: hidden;
        }
      }

      .brand-info {
        flex: 1;

        .brand-name {
          font-size: 36upx;
          font-weight: bold;
          color: #000;
          margin-bottom: 20upx;
        }

        image {
          width: 48upx;
          height: 48upx;
          flex-shrink: 0;
        }

        .h-list {
          display: flex;
          align-items: center;
          margin-top: 10upx;

          .tag {
            font-size: 24upx;
            color: #fff;
            padding: 8upx 14upx;
            font-weight: 500;
            margin-left: 16upx;
            border-radius: 10upx;
            background-color: #e95d20;

            &:nth-child(2) {
              background: linear-gradient(90deg, #e95d20 0%, #fa5151 100%);
            }

            &:nth-child(3) {
              background: linear-gradient(270deg, #3588e2 0%, #3662ec 98%);
            }
          }
        }
      }

      .uni-btn {
        padding: 8upx 10upx;
        background-color: #e95d20;
        color: #fff;
        height: 42upx;
        font-size: 28upx;
        margin-top: 16upx;
      }
    }

    .n-address {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #3d3d3d;
      margin-top: -10upx;

      image {
        width: 30upx;
        height: 30upx;
        margin-left: 10upx;
        margin-top: 6upx;
      }
    }

    .desc {
      padding: 22upx 12upx;
      color: #777777;
      margin: 18upx 0 24upx 0;
      box-sizing: border-box;
      background: linear-gradient(85deg, #ffe5cc 0%, #ffffff 100%);
      border-radius: 10upx;
    }
  }

  .nav-fix {
    position: absolute;
    left: 0;
    top: 0;
    transition: all 500ms;
    background-color: #fff;
  }

  .navs {
    display: flex;
    align-items: center;
    margin-top: 24upx;
    margin-bottom: 24upx;
    padding: 0 24upx;
    box-sizing: border-box;

    .item {
      position: relative;
      margin-right: 20upx;
      font-size: 32upx;
      font-weight: 500;

      &::after {
        width: 0;
        transition: all 350ms;
      }

      &.active {
        &::after {
          position: absolute;
          display: block;
          content: "";
          width: 30upx;
          height: 4upx;
          background-color: #e95d20;
          border-radius: 100px;
          left: 50%;
          transform: translateX(-50%);
          bottom: -8upx;
          transition: all 350ms;
        }
      }
    }
  }
}
</style>