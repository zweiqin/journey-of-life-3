<template>
  <view class="j-specification">
    <view class="mask" @click="$emit('input', false)" :style="maskStyle"></view>
    <view
      class="main"
      :style="{
        bottom: value ? bottom + 'upx' : -2000 + 'upx',
      }"
    >
      <view class="goods-info" v-if="product">
        <image
          class="image"
          :src="(product && product.url) || data.info.picUrl"
          mode=""
        />
        <view class="info">
          <view class="current-goods-price">￥{{ product.price }}</view>
          <view class="sp-text">{{ spStr }}</view>
        </view>
      </view>

      <view class="sps" v-for="item in data.specificationList" :key="item.name">
        <view class="sp-name">{{ item.name }}</view>
        <view class="sps-list">
          <view
            @click="handleChoose(item.name, tag)"
            class="sp-tag"
            :class="{
              active: sps[item.name] == tag.value,
            }"
            v-for="tag in item.valueList"
            :key="tag.id"
            >{{ tag.value }}</view
          >
        </view>
      </view>

      <view class="number-wrapper">
        <view class="sp-name">数量</view>
        <view class="sps-list">
          <uni-number-box :min="1" v-model="number"></uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },

    value: {
      type: Boolean,
      required: true,
    },

    bottom: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      number: 1,
      sps: {},
      spStr: "请选择商品规格",
      product: null,
    };
  },

  methods: {
    // 点击选择
    handleChoose(name, tag) {
      this.sps[name] = tag.value;
      this.getSpStr();
      this.product = this.getProduct();
      this.$forceUpdate();
    },

    // 获取规格字符串
    getSpStr() {
      let str = "";
      for (const sp in this.sps) {
        str += this.sps[sp] + "，";
      }

      // this.spStr =
      //   str +
      //   this.number +
      //   (this.data.info.unit + "").replaceAll("‘", "").replaceAll("’", "");

      this.spStr = str + this.number + this.data.info.unit;
    },

    // 获取product
    getProduct() {
      let currentProduct = null;
      this.data.productList.forEach((item) => {
        let tag = true;
        for (const sp in this.sps) {
          if (!item.specifications.includes(this.sps[sp])) {
            tag = false;
            break;
          }
        }

        if (tag) {
          currentProduct = item;
        }
      });

      return currentProduct ? currentProduct : this.data.productList[0];
    },

    // 获取结果
    getVal() {
      return {
        number: this.number,
        product: this.product,
        spStr: this.spStr,
      };
    },
  },

  watch: {
    data: {
      handler(newVal) {
        if (newVal) {
          for (const sp of newVal.specificationList) {
            this.sps[sp.name] = sp.valueList[0].value;
          }

          this.getSpStr();
          this.product = this.getProduct();
        }
      },
      immediate: true,
      deep: true,
    },

    number() {
      this.getSpStr();
    },
  },

  computed: {
    maskStyle() {
      return {
        opacity: this.value ? 1 : 0,
        zIndex: this.value ? 12 : -1,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.j-specification {
  font-size: 28upx;

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(153, 153, 153, 0.6);
    z-index: 100;
    transition: all 500ms ease-in-out;
  }

  .main {
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: -1000px;
    width: 100%;
    z-index: 101;
    padding: 16upx 32upx;
    box-sizing: border-box;
    transition: all 500ms;
    border-radius: 20upx 20upx 0 0;

    .goods-info {
      display: flex;
      padding: 30upx 0;
      border-bottom: 1upx solid #d7d7d7;

      .info {
        flex: 1;

        .current-goods-price {
          margin: 30upx 0;
        }
      }

      .image {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 5px;
        flex-shrink: 0;
        margin-right: 10px;
      }
    }

    .sps {
      margin: 20upx 0;

      .sp-name {
        margin-bottom: 20upx;
      }

      .sps-list {
        display: flex;
        flex-wrap: wrap;
        padding: 10upx;
        box-sizing: border-box;

        .sp-tag {
          font-size: 24upx;
          // margin-bottom: 20upx;
          margin-right: 20upx;
          padding: 10upx 20upx;

          white-space: nowrap;
          border: 0.5px solid transparent;

          &.active {
            background-color: #fbdcd9;
            color: #e05c5b;
            border: 0.5px solid #e05c5b;
            border-radius: 20px;
          }
        }
      }
    }
  }
}

.number-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20upx;
}
</style>