<template>
  <view class="goods-pane" v-if="data">
    <view class="brand">
      <view class="brand-info">
        <tui-icon
          v-show="currentMode === ON_EDIT"
          @click="handleChangeAllBrandGoodsStatus"
          :color="brandTotalCheck ? '#FFC117' : ''"
          :size="25"
          :name="brandTotalCheck ? 'circle-fill' : 'circle'"
        ></tui-icon>
        <tui-icon
          v-show="currentMode === ON_CONFIRM"
          :color="deleteAllGoods ? 'red' : ''"
          :size="25"
          @click="handleAddAllBrandGoodDelete"
          :name="deleteAllGoods ? 'circle-fill' : 'circle'"
        ></tui-icon>
        <text class="brand-name">{{ data.brandName }}</text>
        <!-- <tui-icon :size="20" color="#f87040" name="shop-fill"></tui-icon> -->
      </view>
      <view class="goods-list">
        <view class="item" v-for="goods in data.cartList" :key="goods.id">
          <tui-icon
            v-show="currentMode === ON_EDIT"
            :size="25"
            @click="handleChangeGoodsStatus(goods)"
            :color="goods.checked ? '#FFC117' : ''"
            :name="goods.checked ? 'circle-fill' : 'circle'"
          ></tui-icon>
          <tui-icon
            v-show="currentMode === ON_CONFIRM"
            :size="25"
            :color="deleteList.includes(goods.productId) ? 'red' : ''"
            @click="handleDeleteGoods(goods)"
            :name="
              deleteList.includes(goods.productId) ? 'circle-fill' : 'circle'
            "
          ></tui-icon>
          <view class="goods-info">
            <image class="goods-image" :src="common.seamingImgUrl(goods.picUrl)"></image>

            <view class="goods-wrapper">
              <navigator :url="'/pages/prod/prod?goodsId=' + goods.id">
                <view class="goods-name">{{ goods.goodsName }}</view>
              </navigator>
              <view class="selected-star"
                >{{ goods.specifications[0] }} x {{ goods.number }}</view
              >
              <view class="goods-op">
                <view class="goods-price">￥{{ goods.price }}</view>
                <uni-number-box
                  @change="handleChangeGoodsNumber($event, goods)"
                  :min="0"
                  :value="goods.number"
                ></uni-number-box>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { ON_EDIT, ON_CONFIRM } from '../../../../../store/modules/shopCar'

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      ON_EDIT,
      ON_CONFIRM,
    }
  },

  methods: {
    // 修改购物车的数量
    handleChangeGoodsNumber(e, goodsInfo) {
      console.log(e, goodsInfo)
      this.$store.dispatch('shopCar/changeGoodsNumber', {
        number: e,
        goodsInfo,
      })
    },

    // 修改购物车的选中状态
    handleChangeGoodsStatus(goodsInfo) {
      this.$store.dispatch('shopCar/changeGoodsStatus', {
        isChecked: !goodsInfo.checked ? 1 : 0,
        productIds: [goodsInfo.productId],
      })
    },

    // 点击上面的按钮
    handleChangeAllBrandGoodsStatus() {
      const productIds = this.data.cartList.map(item => {
        if (item.checked === this.brandTotalCheck) {
          return item.productId
        } else {
          return ''
        }
      })

      this.$store.dispatch('shopCar/changeGoodsStatus', {
        isChecked: !this.brandTotalCheck,
        productIds,
      })
    },

    handleAddAllBrandGoodDelete() {
      const productIds = this.data.cartList.map(item => {
        if (!this.deleteList.includes(item)) {
          return item.productId
        } else {
          return ''
        }
      })
      this.$store.commit('shopCar/BATCH_GOODS_DELETE', {
        productIds,
        tag: !this.deleteAllGoods,
      })
    },

    // 添加删除
    handleDeleteGoods(goodsInfo) {
      this.$store.commit('shopCar/ADD_DELETE_ITEM', goodsInfo.productId)
    },
  },

  computed: {
    ...mapGetters(['currentMode', 'deleteList']),
    brandTotalCheck() {
      return this.data.cartList.every(item => item.checked)
    },

    deleteAllGoods() {
      let tag = false
      const productIds = this.data.cartList.map(item => item.productId)
      if (productIds.length === this.data.cartList.length) {
        tag = productIds.every(item => this.deleteList.includes(item))
      }
      return tag
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../../../../style/mixin.less';

.goods-pane {
  box-sizing: border-box;
  background-color: #fff;
  width: 99%;
  padding: 20upx;
  margin: 20upx auto;
  border-bottom: 1upx solid #ccc;
  border-radius: 20upx;

  .brand {
    &-info {
      .h-flex(flex-start);
      margin-bottom: 30upx;
    }

    &-name {
      font-size: 28upx;
      margin: 0 32upx;
      font-weight: 500;
      color: #605d52;
    }
  }

  .goods-list {
    .item {
      margin-bottom: 30upx;
      .h-flex(flex-start);

      .goods-info {
        .h-flex(flex-start);
        flex: 1;

        .goods-name {
          color: #3a3629;
          font-size: 28upx;
          // font-weight: 500;
        }

        .selected-star {
          font-size: 24upx;
          color: #8f8d85;
          line-height: 2;
          margin: 20upx 0 30upx 0;
          width: 420upx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-radius: 24upx;
          background: #f1f1f0;
          text-indent: 0.8em;
        }

        .goods-image {
          width: 168upx;
          height: 168upx;
          object-fit: cover;
          border-radius: 10upx;
          flex-direction: 0;
          margin: 0 22upx 0 26upx;
        }

        .goods-wrapper {
          flex: 1;
        }

        .goods-op {
          .h-flex(space-between);

          .goods-price {
            color: #fa5151;
            font-size: 28upx;
            font-weight: 500;
            color: #141000;
          }
        }
      }
    }
  }
}

/deep/ .uni-numbox {
  border-radius: 28upx;
  overflow: hidden;
  background: #f1f1f0;
  border: 2upx solid #f1f1f0;

  .uni-numbox__minus.uni-numbox-btns {
    background: #ffffff !important;

    .uni-numbox--text {
      color: #d8d8d8 !important;
    }
  }

  .uni-numbox__value {
    background: #ffffff !important;
    margin: 0upx 2upx;
  }

  .uni-numbox__plus.uni-numbox-btns {
    background: #ffffff !important;

    .uni-numbox--text {
    }
  }
}

// /deep/ .tui-icon {
// 	color: #FFC117 !important;
// }
</style>
