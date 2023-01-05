<template>
  <view class="intelligent-selection-container">
    <view class="header-wrapper fix" :style="{ top: height + 'px' }">
      <view class="filter-wrapper">
        <view class="item">户型</view>
        <view class="item">面积</view>
        <view class="item">风格</view>
        <view class="item">价格</view>
      </view>
    </view>

    <view class="main">
      <view
        class="item"
        @click="handleViewDetail"
        v-for="item in 20"
        :key="item"
      >
        <image
          src="https://img2.baidu.com/it/u=4126568663,2462169725&fm=253&fmt=auto&app=120&f=JPEG?w=420&h=640"
          mode=""
        />
        <view class="info">
          <view class="name">全无套餐</view>
          <view class="price-text">15-20万</view>
          <view class="desc">
            <text>1室1房一厅 | </text>
            <text>轻奢 |</text>
            <text>80平</text>
          </view>
          <view class="tags">
            <view class="tag">精品推荐</view>
            <view class="tag">百搭优选</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    height: { type: Number },
    scrollTop: {
      type: Number,
    },
  },
  methods: {
    handleViewDetail() {
      uni.navigateTo({
        url: "/pages/index/components/intelligent-selection/detail",
      });
    },

    getPosition() {
      const query = uni.createSelectorQuery().in(this);
      return new Promise((resolve, reject) => {
        query
          .select(".filter-wrapper")
          .boundingClientRect((position) => {
            resolve(position.height);
          })
          .exec();
      });
    },

    reachBottom(){return 'no-more'}
  },
};
</script>

<style lang="less" scoped>
.intelligent-selection-container {
  font-size: 28upx;
  background-color: #f1f2f6;
}

.header-wrapper {
  box-sizing: border-box;
  background-color: #fff;
  padding: 0 30upx;
  padding-right: 58upx;
  transition: all 350ms;

  &.fix {
    position: fixed;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  .filter-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20upx 0;

    .item {
      position: relative;
      padding: 0;
      &::after {
        position: absolute;
        content: "";
        display: block;
        background: url("../../../../static/images/index/arrow-down.png")
          no-repeat;
        background-size: cover;
        width: 28upx;
        height: 28upx;
        top: 50%;
        transform: translateY(-50%);
        right: -28upx;
      }
    }
  }
}

.main {
  flex: 1;
  overflow: scroll;
  padding: 18upx 34upx;
  box-sizing: border-box;

  .item {
    display: flex;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 10upx;
    margin-bottom: 14upx;
    padding: 20upx;

    image {
      width: 250upx;
      height: 180upx;
      object-fit: cover;
      border-radius: 20upx;
      flex-shrink: 0;
      margin-right: 32upx;
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name {
        font-size: 32upx;
        color: #3d3d3d;
        font-weight: bold;
      }

      .price-text {
        color: #fa5151;
        font-size: 32upx;
        font-weight: 500;
      }

      .desc {
        font-size: 24upx;
        color: #999999;
      }

      .tags {
        display: flex;
        align-items: center;

        .tag {
          font-size: 24upx;
          line-height: 1.5;
          color: #767676;
          padding: 2upx 12upx;
          background-color: #f1f2f6;
          margin-right: 10upx;
        }
      }
    }
  }
}
</style>