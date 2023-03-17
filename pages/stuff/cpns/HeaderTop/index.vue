<template>
  <view class="top-header-container">
    <h1>中国·龙江</h1>
    <h2>全球最大的家具材料产业集群</h2>

    <view class="search-container">
      <TuanLocation>
        <view class="locale">
          <text>{{ $store.getters.currentCity || '龙江镇' }}</text>
          <image
            class="locale-icon"
            src="../../../../static/images/new-brand/index/down-arrow.png"
          ></image>
        </view>
      </TuanLocation>

      <view class="search-wrapper">
        <image
          class="search-icon"
          src="../../../../static/images/new-brand/index/search-icon.png"
          mode=""
        />
        <input
          v-model="searchValue"
          confirm-type="search"
          type="text"
          @confirm="
            go('/pages/search-page/search-result?keywords=' + searchValue)
          "
          placeholder="铜奶嘴钉"
        />
      </view>

      <button
        class="uni-btn distribute"
        @click="go('/stuff/purchase/purchase')"
      >
        <image
          class="add-icon"
          src="../../../../static/images/new-brand/index/add-icon.png"
          mode=""
        />
        <text>需求发布</text>
      </button>
    </view>

    <scroll-view scroll-x="true" :show-scrollbar="false">
      <view class="top-menus">
        <view
          class="item"
          @click="go(item.url)"
          v-for="item in topMenu"
          :key="item.label"
          >{{ item.label }}
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { topMenu } from '../../config'
export default {
  data() {
    return {
      topMenu: Object.freeze(topMenu),
      searchValue: '',
    }
  },
}
</script>

<style lang="less" scoped>
.top-header-container {
  padding: 40upx 20upx 0;
  box-sizing: border-box;
  height: 560upx;
  width: 100%;
  background: url('../../../../static/images/new-brand/index/top-bg.png')
    no-repeat;
  background-size: cover;

  h1 {
    line-height: 60upx;
    font-size: 40upx;
    font-weight: 900;
    text-align: center;
    margin-bottom: 16upx;
  }

  h2 {
    font-size: 32upx;
    line-height: 40upx;
    text-align: center;
  }

  .search-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40upx 0 48upx 0;
    .locale {
      display: flex;
      align-items: center;

      text {
        font-weight: 500;
        font-size: 32upx;
      }

      .locale-icon {
        flex: 1;
        width: 40upx;
        height: 40upx;
        flex-shrink: 0;
      }
    }

    .search-wrapper {
      display: flex;
      align-items: center;

      width: 348upx;
      height: 72upx;
      border-radius: 100px;
      background-color: #fff;
      padding: 20upx 24upx;
      box-sizing: border-box;

      .search-icon {
        flex-shrink: 0;
        width: 32upx;
        height: 32upx;
        padding-right: 16upx;
        margin-right: 16upx;
        border-right: 1upx solid #d5d4d1;
      }

      input {
        font-size: 26upx;
      }
    }

    .distribute {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 176upx;
      height: 72upx;
      border-radius: 100px;
      border: 3upx solid #f98833;
      background-color: #fff;

      .add-icon {
        width: 40upx;
        height: 40upx;
      }

      text {
        font-size: 22upx;
        color: #f98833;
        margin-left: 8upx;
      }
    }
  }

  .top-menus {
    display: flex;
    align-items: center;

    &::-webkit-scrollbar {
      display: none !important;
    }

    .item {
      white-space: nowrap;
      margin-right: 32upx;
      line-height: 52upx;
      font-size: 28upx;

      &:first-child {
        font-weight: bold;
        color: #141000;
        font-size: 34upx;
      }
    }
  }
}
</style>
