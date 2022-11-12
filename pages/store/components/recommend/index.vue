<template>
  <div class="recommend" >
    <!-- 轮播图 -->
    <view class="banner">
      <swiper
        class="swiper"
        indicator-dots
        autoplay
        indicator-color="#fff"
        indicator-active-color="#fff"
      >
        <swiper-item
          v-for="item in rankList1"
          :key="item.id"
          @click="handeViewDetail(item.id)"
        >
          <img :src="item.picUrl" alt="" />
        </swiper-item>
      </swiper>
    </view>
    <view></view>
    <!-- 网红爆款 -->
    <view class="popular-online">
      <view class="header" @click="seeInformation">
        <view class="main-title">网红爆款</view>
        <view class="sub-title">Internet celebrity hot style</view>
      </view>

      <view class="wrapper">
        <view class="left">
          <img
            @click="handeViewDetail(rankList2[0].id)"
            :src="rankList2[0].picUrl"
            alt=""
            style="height: 244upx"
          />
          <img
            @click="handeViewDetail(rankList2[1].id)"
            :src="rankList2[1].picUrl"
            alt=""
            style="height: 332upx"
          />
        </view>
        <view class="right">
          <img
            @click="handeViewDetail(rankList2[2].id)"
            :src="rankList2[2].picUrl"
            alt=""
            style="height: 332upx"
          />
          <img
            @click="handeViewDetail(rankList2[3].id)"
            :src="rankList2[3].picUrl"
            alt=""
            style="height: 244upx"
          />
        </view>
      </view>
    </view>

    <!-- 其他 -->
    <RecommendPanel
      :goodsRankList="goodsRankList"
      style="margin-top: 20px"
    ></RecommendPanel>
  </div>
</template>

<script>
import RecommendPanel from "../recommend-panel/index.vue";
export default {
  props: {
    allgoodsList: Object,
    goodsRankList: Object,
  },
  components: {
    RecommendPanel,
  },
  methods: {
    handeViewDetail(item) {
      console.log(item);
      this.id = item;
      if (!this.id) {
        return;
      }
      uni.navigateTo({
        url: `/pages/prod/prod?goodsId=${this.id}`,
      });
    },
    seeInformation() {
      console.log("商品", this.allgoodsList);
      console.log("排行", this.goodsRankList);
    },
  },
  data() {
    return {
      rankList: [],
      rankList1: [],
      rankList2: [],
      id: "",
    };
  },
  watch: {
    allgoodsList: {
      handler(value) {
        this.rankList = value.goodsList;
        console.log("ranklist", this.rankList);
        if (this.rankList.length >= 8) {
          this.rankList1 = this.rankList.slice(0, 4);
          this.rankList2 = this.rankList.slice(4, 8);
        } else {
          this.rankList1 = this.rankList.slice(0, 4);
          this.rankList2 = this.rankList.slice(0, 4);
        
        }

        console.log(this.rankList2);
        // const rankList = this.rankList
        // rankList = this.rankList.slice(0,3);
      },
      deep: true, //深度鉴定,如果allgoodslist是对象则可以监听内部的值，如有变化则执行
      immediate: true, //立刻执行allgoodsList
    },
  },
  mounted() {
    // console.log("商品", this.allgoodsList);
    // console.log("排行", this.goodsRankList);
    // this.rankList = this.allgoodsList.goodsList;
  },
};
</script>

<style lang="less" scoped>
.recommend {
  .banner {
    width: 100%;
    height: 800upx;
    border-radius: 20upx;
    overflow: hidden;
    margin-top: 28upx;

    .swiper {
      width: 100%;
      height: 800upx;

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
        height: 800upx;
      }
    }
  }

  .popular-online {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #3d3d3d;
      margin: 52upx 0 20upx 0;

      .main-title {
        position: relative;
        font-size: 28upx;
        font-weight: bold;
        font-size: 28upx;

        &::after {
          position: absolute;
          top: 50%;
          right: -85%;
          transform: translateY(-50%);
          content: "";
          width: 80upx;
          height: 2upx;
          background-color: #3d3d3d;
        }

        &::before {
          position: absolute;
          top: 50%;
          left: -100upx;
          transform: translateY(-50%);
          content: "";
          width: 80upx;
          height: 2upx;
          background-color: #3d3d3d;
        }
      }

      .sub-title {
        color: #3d3d3d;
        font-size: 18upx;
        transform: scale(0.8);
      }
    }

    .wrapper {
      width: 100%;
      height: 606upx;
      display: flex;
      justify-content: space-between;

      .left,
      .right {
        width: 324upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;

        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>