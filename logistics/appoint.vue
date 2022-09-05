<template>
  <view class="appoint">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/store/chevron-states.png"
        alt=""
      />
      <view class="title">关注列表</view>
    </view>

    <view class="search">
      <input class="search-input" type="text" @input="search" />
      <img class="img" src="../static/images/store/search.png" alt="" />
    </view>

    <view class="wuliu-list"> </view>
    <view class="no-data"
      >您还没有关注过物流公司，<text class="toFollow">去关注</text></view
    >
  </view>
</template>

<script>
const { debounce } = require("../utils/util");
export default {
  data() {
    return {
      search: null,
    };
  },

  mounted() {
    this.search = debounce(this.searchWuliu, 500);
  },
  methods: {
    back() {
      uni.navigateBack();
    },

    /**
     * @description 搜索
     */
    searchWuliu(e) {
      const searchKey = e.target.value;
    },
  },
};
</script>

<style lang="less" scoped>
.appoint {
  padding: 68upx 40upx;
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 52upx;

    .back {
      width: 44upx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      color: #000000;
      font-size: 32upx;
      font-weight: 500;
    }
  }

  .search {
    position: relative;
    width: 100%;
    height: 60upx;
    box-sizing: border-box;
    padding: 10upx 20upx 10upx 60upx;
    background-color: #efefef;
    border-radius: 30upx;

    .search-input {
      width: 100%;
      height: 100%;
    }

    .img {
      position: absolute;
      left: 16upx;
      top: 50%;
      transform: translateY(-50%);
      width: 32upx;
    }
  }

  .no-data {
    width: 100%;
    height: 600upx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999999;
    font-size: 32upx;

    .toFollow{
      color: #FF8F1F;
      font-size: 36upx;
    }
  }
}
</style>