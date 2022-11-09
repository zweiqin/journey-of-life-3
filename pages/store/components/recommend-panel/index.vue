<template>
  <view class="recommend-panel">
    <view class="header" v-if="newType">
      <view class="tag">新品发布</view>
      <img class="img" src="../../../../static/images/store/bar.png" alt="" />
    </view>
    <view class="main">
      <view
        class="goods-item"
        v-for="item in goodsRankList.data"
        :key="item.goodsList"
        @click="goodsDetail(item.goods[0].id)"
      >
        <img class="goods-img" :src="item.goods[0].picUrl" alt="" />
        <view class="info">
          <view>
            <view class="name">
              {{ item.goods[0].name }}
            </view>

            <view class="tag">本店{{ item.category.name }}热销第一名</view>
          </view>
          <view class="goodsSn">{{ item.goods[0].goodsSn }}</view>
          <view class="footer">
            <view class="left"
              >￥<text class="price"
                >{{ item.goods[0].retailPrice }}/{{ item.goods[0].unit }}</text
              >
            </view>
            <!-- <view class="right"> 3215人付款 </view> -->
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    newType: {
      type: Boolean,
      default: true,
    },
    goodsRankList: {
      type: Object,
    },
  },
  data() {
    return {
      goodsId: "",
    };
  },
  mounted() {
    console.log(this.goodsRankList);
  },
  methods: {
    goodsDetail(item) {
      console.log(item);
      this.goodsId = item
      uni.navigateTo({
        url:'/pages/prod/prod?goodsId='+this.goodsId
      })
      // uni.navigateTo({ url: '../../../../pages/prod/prod?goodsId='+this.goodsId })
    },
  },
};
</script>

<style lang="less" scoped>
.recommend-panel {
  width: 100%;
  background-color: #0a6363;
  border-radius: 20upx;
  padding: 34upx 12upx;
  box-sizing: border-box;

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .tag {
      width: 270upx;
      height: 52upx;
      line-height: 48upx;
      text-align: center;
      box-sizing: border-box;
      line-height: 52upx;
      border: 1upx solid #fff;
      color: #fff;
      font-weight: bold;
      font-size: 28upx;
      border-radius: 20upx;
      margin-bottom: 10upx;
    }

    .img {
      width: 444upx;
      margin-bottom: 10upx;
    }
  }

  .main {
    .goods-item {
      display: flex;
      width: 100%;
      padding: 42upx 88upx 52upx 16upx;
      background-color: #fff;
      box-sizing: border-box;

      .goods-img {
        width: 200upx;
        height: 200upx;
        border-radius: 10upx;
        object-fit: cover;
        flex-shrink: 0;
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 88upx;
        .goodsSn {
          color: #999999;
          font-size: 24upx;
        }
        .name {
          color: #3d3d3d;
          font-size: 28upx;
          font-weight: 500;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-bottom: 14upx;
        }

        .tag {
          color: #ff8f1f;
          font-size: 24upx;
          transform: scale(0.9);
          margin-left: -20upx;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .left {
            color: #fa5151;
            font-size: 20upx;

            .price {
              font-size: 36upx;
              color: #fa5151;
              padding: 0;
            }
          }

          .right {
            color: #999999;
            font-size: 10upx;
          }
        }
      }
    }
  }
}
</style>