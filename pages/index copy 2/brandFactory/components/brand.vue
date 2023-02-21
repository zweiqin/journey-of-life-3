<template>
  <view
    class="brand-info-pane"
    v-if="data && data.goodsList.length && data.brand.brandgenre === 23"
  >
    <view class="detail-info">
      <image
        v-if="data.brand.picUrl"
        style="background-color: transparent"
        class="avatar"
        :src="data.brand.picUrl"
        mode=""
      />
      <view v-else class="avatar"> {{ data.brand.name }} </view>
      <view class="info-pane">
        <view
          class="name-inter"
          @click="
            go(`/pages/index/brandFactory/detail?brandId=${data.brand.id}`)
          "
        >
          <view class="name">{{ data.brand.name }}</view>
          <navigator
            :url="`/pages/index/brandFactory/detail?brandId=${data.brand.id}`"
            >进入展厅</navigator
          >
        </view>

        <view class="desc">{{ data.brand.desc || '暂无简介' }} </view>

        <view class="h-address">
          <view class="h-list">
            <image
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/tk3ayg0sglz44lavgru6.png"
              mode=""
            />
            <view class="tag">品牌工厂</view>
            <view class="tag">官方直营</view>
          </view>

          <view class="address" v-if="data.brand.address">
            <image src="../../../../static/images/index/location.png" mode="" />
            <text class="text">{{ data.brand.address }}</text>
          </view>
        </view>
      </view>
    </view>

    <view v-if="data.goodsList.length">
      <scroll-view scroll-X="true">
        <view class="product-list hidden-sb">
          <!-- <navigator url=""> -->
          <view v-for="item in data.goodsList" :key="item.id">
            <navigator
              hover-class="none"
              :url="`/pages/prod/prod?goodsId=${item.id}&showBrand=true`"
            >
              <!-- <image :src="item.picUrl" mode="" /> -->
              <fast-lazy-load
                width="220upx"
                height="220upx"
                :src="item.picUrl"
                radius="20"
              ></fast-lazy-load>
            </navigator>
          </view>

          <view class="look-more">
            <navigator
              hover-class="none"
              :url="`/pages/index/brandFactory/detail?brandId=${data.brand.id}`"
            >
              <image src="../../../../static/images/index/more.png" mode="" />
            </navigator>
          </view>

          <!-- </navigator> -->
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { goodsListApi } from '../../../../api/goods'
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      goodsList: [],
    }
  },

  watch: {
    data: {
      handler(newValue) {
        // console.log('草泥吗', newValue.brand.id)
        if (newValue.brand.id) {
          this.getGoodsList(newValue.brand.id)
        }
      },

      immediate: true,
      deep: true,
    },
  },

  methods: {
    async getGoodsList(id) {
      const res = await goodsListApi({
        brandId: id,
        page: 1,
        size: 5,
      })

      if (res.errno === 0) {
        this.goodsList = res.data.goodsList.slice(0, 5)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.brand-info-pane {
  margin-top: 20upx;
  padding: 38upx 30upx;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 28upx;

  .detail-info {
    display: flex;

    .avatar {
      width: 120upx;
      height: 120upx;
      border-radius: 10upx;
      background-color: #a74e10;
      flex-shrink: 0;
      margin-right: 16upx;
      color: #fff;
      text-align: center;
      line-height: 120upx;
    }

    .info-pane {
      flex: 1;

      .name-inter {
        display: flex;
        justify-content: space-between;
        color: #e95d20;

        .name {
          font-size: 32upx;
          color: #000;
          font-weight: bold;
        }
      }

      .desc {
        color: #777777;
        margin: 10upx 0;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .h-address {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .address {
          image {
            width: 22upx;
            height: 28upx;
          }

          .text {
            display: inline-block;
            width: 112upx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-left: 10upx;
          }
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
    }
  }

  .product-list {
    display: flex;
    // justify-content: space-between;
    margin-top: 20upx;

    // image {
    //   width: 220upx;
    //   height: 220upx;

    // }

    /deep/ .fast-lazy-load {
      flex-shrink: 0;
      margin-right: 20upx;
    }

    .look-more {
      width: 220upx;
      height: 220upx;
      border-radius: 20upx;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f4f4f4;

      image {
        margin-left: 10upx;
        width: 80upx;
        height: 80upx;
      }
    }
  }
}

/deep/ .uni-scroll-view-content {
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
