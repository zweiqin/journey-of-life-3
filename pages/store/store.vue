<template>
  <view class="store">
    <!-- 头部搜索 -->
    <view class="search-top">
      <img
        @click="back"
        class="back"
        src="../../static/images/store/chevron-states.png"
        alt=""
      />
      <view class="search-input" :class="{ 'search-active': isSearch }">
        <img
          @click="showSearch"
          class="search-icon"
          src="../../static/images/store/search.png"
          alt="icon"
        />

        <input
          ref="inputRef"
          @blur="handleSearchBlur"
          type="text"
          v-model="searchKey"
        />
      </view>
    </view>

    <!-- 社区信息 -->
    <view class="community-info">
      <img
        class="avatar"
        src="https://img0.baidu.com/it/u=3608430476,1945954109&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=494"
        alt=""
      />

      <view class="wrapper">
        <view class="name">GIVENCHY团蜂家具社区旗舰店</view>
        <view class="footer">
          <text class="desc">综合体验</text>
          <view class="rate">
            <img src="../../static/images/index/star-active.png" alt="" />
            <img src="../../static/images/index/star-active.png" alt="" />
            <img src="../../static/images/index/star-active.png" alt="" />
            <img src="../../static/images/index/star-active.png" alt="" />
            <img src="../../static/images/index/star.png" alt="" />
          </view>
          <text class="desc">粉丝数1025万</text>
        </view>

        <view class="tags">
          <view class="item">热销门店</view>
          <view class="item">品牌老店</view>
        </view>
      </view>

      <button class="subscribe">订阅</button>
    </view>

    <!-- 主区域 -->
    <view class="main">
      <view class="navs">
        <view
          class="item"
          @click="handleSwitchTab(0)"
          :class="{ active: currentTab === 0 }"
          >推荐</view
        >
        <view
          class="item"
          @click="handleSwitchTab(1)"
          :class="{ active: currentTab === 1 }"
          >宝贝</view
        >
      </view>

      <Recommend v-if="currentTab === 0"></Recommend>
      <Baby v-else></Baby>
    </view>
  </view>
</template>

<script>
import Recommend from "./components/recommend/index.vue";
import Baby from "./components/baby/index.vue";

export default {
  components: {
    Recommend,
    Baby,
  },
  data() {
    return {
      isSearch: false,
      searchKey: "",
      currentTab: 0,
    };
  },
  methods: {
    /**
     * @description 返回上一级
     */
    back() {
      uni.navigateBack();
    },

    /**
     * @description 点击搜索
     */
    showSearch() {
      this.isSearch = true;
    },

    /**
     * @description 输入框失去焦点
     */
    handleSearchBlur() {
      if (!this.searchKey.trim()) {
        this.isSearch = false;
      }
    },

    /**
     * @description 点击切换tab
     */
    handleSwitchTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

<style lang="less" scoped>
.store {
  padding: 28upx;

  .search-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .back {
      width: 48upx;
    }

    .search-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10upx;
      background-color: #fff;
      flex: 0;
      border-radius: 40upx;
      transition: all 350ms;

      &.search-active {
        flex: 1;
        background-color: #efefef;
      }

      input {
        flex: 1;
        margin-left: 20upx;
      }
    }

    .search-icon {
      width: 40upx;
    }
  }

  .community-info {
    display: flex;
    align-items: flex-start;
    margin: 26upx 0 24upx 0;

    .avatar {
      width: 80upx;
      height: 80upx;
      border-radius: 50%;
      margin-right: 28upx;
    }

    .wrapper {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;

      .tags {
        display: flex;

        .item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-right: 10upx;
          padding: 2upx 34upx;
          font-size: 24upx;
          background: linear-gradient(to right, #ffd2b4, #ff1810);
          border-radius: 10upx;
          color: #fff;
          font-weight: 100;
        }
      }

      .name {
        color: #3d3d3d;
        font-size: 28upx;
        font-weight: bold;
      }

      .desc {
        color: #3d3d3d;
        font-size: 18upx;
        font-weight: 100;
        margin-right: 8upx;
      }

      .footer {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 4upx 0 12upx 0;

        .rate {
          margin-right: 8upx;

          img {
            width: 20upx;
            height: 20upx;
            vertical-align: 4upx;
            margin: 0 2upx;
          }
        }
      }
    }

    .subscribe {
      margin-top: 16upx;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100upx;
      height: 36upx;
      color: #ff8f1f;
      padding: 4upx 16upx;
      font-size: 20upx;
      background-color: #fff;
      border: 1upx solid #ff8f1f;
      border-radius: 40upx;
      font-weight: 100;
    }
  }

  .main {
    .navs {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #3d3d3d;
      font-size: 24upx;

      .item {
        margin-right: 50upx;
        padding-bottom: 8upx;
        border-bottom: 4upx solid transparent;
        transition: all 350ms;

        &.active {
          border-bottom: 4upx solid #3662ec;
          border-radius: 2upx;
          font-weight: bold;
        }
      }
    }
  }
}
</style>