<template>
  <view class="serve-detail-containter" v-if="serveDeatil">
    <!-- 轮播图 -->
    <view class="image-list">
      <tui-icon @click="handleBack" class="back-icon" name="arrowleft" color="#fff"></tui-icon>

      <swiper class="swiper-container" v-if="serveDeatil.goodsRotationChart && serveDeatil.goodsRotationChart.length">
        <swiper-item class="swiper-item" v-for="item in serveDeatil.goodsRotationChart" :key="item">
          <view class="image-wtapper">
            <image class="swiper-img" :src="item"></image>
          </view>
        </swiper-item>
      </swiper>

      <image v-else class="swiper-img" :src="serveDeatil.goodsLogo"></image>
    </view>

    <!-- 基本信息 -->
    <view class="base-info">
      <view class="price-wrapper">￥ <text class="origin-price" :class="{ del: !!serveDeatil.preferentialPrice }">{{
        serveDeatil.goodsPrice }}</text>
        <text class="preferential-price" v-if="serveDeatil.preferentialPrice">{{ serveDeatil.preferentialPrice }}</text>
      </view>

      <view class="goods-name">{{ serveDeatil.goodsName }}</view>
      <view class="salse-num">月销100+</view>
    </view>

    <!-- 详情 -->
    <view class="serve-detail" v-if="serveDeatil && serveDeatil.goodsInfo">
      <uParse :content="serveDetail"></uParse>
    </view>

    <!-- <view class="serve-detail">
      <uParse :content="serveDetail"></uParse>
    </view> -->

    <view class="button-wrapper">
      <button class="uni-btn" @click="handleBuyGoods">立即购买</button>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { marked } from 'marked';
import { PAY_SHOP_GOODS } from '../../constant';
import { getShopGoodsDetailApi } from '../../api/community-center';
import uParse from '../../components/u-parse/u-parse.vue';

export default {
  components: { uParse },
  data() {
    return {
      serveDeatil: null
    };
  },

  onLoad(params) {
    this.serveId = params.id;
    this.shopId = params.shopId;
  },

  mounted() {
    this.getShopDetail();
  },

  methods: {
    async getShopDetail() {
      try {
        const res = await getShopGoodsDetailApi({
          goodsId: this.serveId
        });

        if (res.statusCode === 20000) {
          this.serveDeatil = res.data;

          const goodsRotationChart = res.data.goodsRotationChart;
          if (goodsRotationChart) {
            console.log("你没得", goodsRotationChart);
            this.serveDeatil.goodsRotationChart = goodsRotationChart.split(',');
          }

          console.log('这里呢', this.serveDeatil);
        } else {
          this.ttoast({
            type: 'fail',
            title: res.statusMsg || '服务详情获取失败'
          });
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '服务详情获取失败',
          content: error
        });
      }
    },
    // 点击返回
    handleBack() {
      uni.navigateBack();
    },

    // 点击购买
    handleBuyGoods() {
      const countPrice = this.serveDeatil.preferentialPrice ? this.serveDeatil.preferentialPrice : this.serveDeatil.goodsPrice;
      const buyGoods = {
        brand: {
          name: '附近商家',
          brandId: this.shopId
        },
        currentGoodsImg: this.serveDeatil.goodsLogo,
        currentPrice: countPrice,
        currentSpecification: '',
        number: 1,
        goodsId: this.serveDeatil.id,
        selectedProduct: {
          product: {
            price: countPrice
          }
        },
        info: {
          name: this.serveDeatil.goodsName
        }
      };

      uni.setStorageSync(PAY_SHOP_GOODS, buyGoods);
      uni.navigateTo({
        url: '/community-center/shop/goods-order'
      });
    }
  },

  computed: {
    serveDetail() {
      return this.serveDeatil && this.serveDeatil.goodsInfo ? marked(this.serveDeatil.goodsInfo) : '';
      // return marked('<p><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4gk5pi352dfkookeiykz.jpg\" alt=\"\" width=\"790\" height=\"1074\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/e7rmmrqc1knwcdmoz1an.jpg\" alt=\"\" width=\"790\" height=\"1367\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/2308ruysnxhdqe5232mw.jpg\" alt=\"\" width=\"790\" height=\"1141\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6z6qnsyfr6l7q3o633gk.jpg\" alt=\"\" width=\"790\" height=\"811\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/9e6dekga7lca0hltitce.jpg\" alt=\"\" width=\"790\" height=\"850\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/sj3zkawwhdf3zim99q6v.jpg\" alt=\"\" width=\"790\" height=\"821\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/mflmjp8n2nqapwa3hc8d.jpg\" alt=\"\" width=\"790\" height=\"820\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4rjkylzsjq6oaorso02p.jpg\" alt=\"\" width=\"790\" height=\"819\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/k792a8pdzcw5yzxq4qnt.jpg\" alt=\"\" width=\"790\" height=\"820\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qw7v7ppncmudcnunfnc3.jpg\" alt=\"\" width=\"790\" height=\"820\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/kke0q8og8198ttk0ugwg.jpg\" alt=\"\" width=\"790\" height=\"823\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/9lz1gj03elbsw8xy2h5c.jpg\" alt=\"\" width=\"790\" height=\"864\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/byd1x9x9e5isox129o0h.jpg\" alt=\"\" width=\"790\" height=\"875\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/85ylagdvz68z32bqzn6u.jpg\" alt=\"\" width=\"790\" height=\"1499\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/drh98tga4fune847yf25.jpg\" alt=\"\" width=\"790\" height=\"1272\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/uayokd9nj3u5n432fpiz.jpg\" alt=\"\" width=\"790\" height=\"958\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qugplglf2kh1sxg2c89n.jpg\" alt=\"\" width=\"790\" height=\"900\" /><img src=\"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/8yvz8miydiw4rmwxxidi.jpg\" alt=\"\" width=\"790\" height=\"1431\" /></p>')
    }
  }
};
</script>

<style lang="less" scoped>
.serve-detail-containter {
  min-height: 100vh;
  background-color: #f1f2f6;
  padding-bottom: 120upx;

  .image-list,
  .swiper-container {
    width: 100vw;
    height: 690upx;
    position: relative;

    .back-icon {
      position: absolute;
      top: 30upx;
      left: 30upx;
      z-index: 10;
    }

    .swiper-img,
    .swiper-item {
      width: 100vw;
      height: 690upx;
    }
  }

  .base-info,
  .serve-detail {
    padding: 42upx 30upx;
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 20upx;

    .price-wrapper {
      font-size: 24upx;
      color: #fa5151;

      .origin-price {
        font-size: 28upx;
        font-weight: 500;
        margin: 0 6upx;

        &.del {
          color: #5c5c5c;
          text-decoration: line-through;
        }
      }

      .preferential-price {
        font-size: 28upx;
        font-weight: 500;
      }
    }

    .goods-name {
      font-size: 32upx;
      font-weight: 500;
      margin: 20upx 0;
    }

    .salse-num {
      color: #ccc;
      font-size: 24upx;
    }
  }

  .serve-detail{
    padding: 0;
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100upx;
    background-color: #fff;

    .uni-btn {
      width: 90vw;
      margin: 0 auto;
      height: 80upx;
      background-color: #ef530e;
      transition: all 350ms;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 28upx;

      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
