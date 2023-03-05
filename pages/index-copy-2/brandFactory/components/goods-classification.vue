<template>
  <view
    class="goods-classification-container"
    :style="{ height: scrollHeight + 'px' }"
    v-if="menus"
  >
    <scroll-view
      scroll-y="true"
      style="width: 166upx"
      :style="{ height: scrollHeight + 'px', background: '#f1f2f6' }"
    >
      <view class="left-menu">
        <view
          class="menu-item"
          :class="{ active: currentCategoryId === menu.value }"
          v-for="menu in menus"
          :key="menu.id"
          @click="handleChangeCategory(menu.value)"
        >
          {{ menu.label }}
        </view>
      </view>
    </scroll-view>

    <scroll-view
      scroll-into-view="item_0"
      scroll-y="true"
      :style="{ height: scrollHeight + 'px' }"
      @scrolltolower="handleReachBottom"
    >
      <view class="right-goods">
        <view
          v-for="(goods, index) in goodsList"
          :id="`item_${index}`"
          :key="goods.id"
        >
          <navigator
            hover-class="none"
            class="goods-item"
            :url="`/pages/prod/prod?goodsId=${goods.id}&showBrand=true`"
          >
            <image :src="goods.picUrl" mode="" />

            <view class="goods-info">
              <view class="goods-name">{{ goods.name }} </view>

              <view class="salse-price">
                <view class="price-text">
                  <text>￥</text>
                  <text>{{ goods.counterPrice }}</text>
                </view>

                <!-- <text>100+付款</text> -->
              </view>
            </view>
          </navigator>
        </view>

        <uni-load-more
          v-if="loadingStatus !== 'none'"
          :status="loadingStatus"
        ></uni-load-more>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { goodsListApi } from "../../../../api/goods";
export default {
  props: {
    menus: {
      type: Array,
      required: true,
    },
    brandId: {
      type: [Number, String],
      required: true,
    },
  },

  data() {
    return {
      currentCategoryId: null,
      totalPages: 0,
      queryInfo: {
        page: 1,
        size: 20,
      },
      goodsList: [],
      scrollHeight: 0,
      loadingStatus: "none",
    };
  },

  mounted() {
    this.getSize();
  },

  methods: {
    handleChangeCategory(id) {
      this.currentCategoryId = id;
      this.loadingStatus = "none";
      this.queryInfo = { page: 1 };
      this.getGoodsList();
    },

    async getGoodsList() {
      console.log("操了", this.currentCategoryId, this.brandId);
      if (!this.currentCategoryId || !this.brandId) {
        return;
      }

      uni.showLoading();

      const res = await goodsListApi({
        ...this.queryInfo,
        categoryId: this.currentCategoryId,
        brandId: this.brandId,
      });

      uni.hideLoading();

      if (res.errno === 0) {
        this.goodsList = res.data.goodsList;
        this.totalPages = res.data.totalPages;
        console.log(this.goodsList);
      }
    },

    getSize() {
      const query = uni.createSelectorQuery().in(this);
      const systemInfo = uni.getWindowInfo();
      console.log(systemInfo.windowHeight);
      const _this = this;

      this.$nextTick(() => {
        query
          .select(".goods-classification-container")
          .boundingClientRect((position) => {
            console.log(position);

            _this.scrollHeight = systemInfo.windowHeight - position.top;
          })
          .exec();
      });
    },

    handleReachBottom() {
      if (
        this.goodsList.length < this.queryInfo.size ||
        this.totalPages >= this.queryInfo.page
      ) {
        this.loadingStatus = "no-more";
        return;
      }
      this.loadingStatus = "loading";
    },
  },

  watch: {
    menus: {
      handler(value) {
        if (value) {
          console.log("你妈的", value);
          this.currentCategoryId = value[0].value;
          this.getGoodsList();
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.goods-classification-container {
  width: 100%;
  display: flex;

  .left-menu {
    width: 166upx;
    height: 100%;
    background-color: #f1f2f6;
    flex-shrink: 0;

    .menu-item {
      text-align: center;
      height: 96upx;
      line-height: 96upx;

      &.active {
        background-color: #fff;
        color: #e95d20;
      }

      &.active + .menu-item {
        border-radius: 10px;
      }
    }
  }

  .right-goods {
    flex: 1;
    display: flex;
    padding: 24upx;
    box-sizing: border-box;
    flex-direction: column;

    .goods-item {
      display: flex;
      position: relative;
      margin-top: 20upx;

      &::after {
        position: absolute;
        content: "...";
        right: 0;
        bottom: 0;
        font-size: 60upx;
      }

      image {
        width: 200upx;
        height: 200upx;
        border-radius: 10upx;
        flex-shrink: 0;
        margin-right: 22upx;
      }

      .goods-info {
        flex: 1;

        .goods-name {
          display: -webkit-box;
          font-weight: bold;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .salse-price {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .price-text {
            color: #fa5151;
            margin: 20upx 0;

            text {
              &:nth-child(2) {
                font-weight: bold;
                font-size: 36upx;
              }
            }
          }
        }
      }
    }
  }
}
</style>