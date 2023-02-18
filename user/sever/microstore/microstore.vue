<template>
  <view class="microstore-container">
    <view class="op-container">
      <!-- 搜索区域 -->
      <view class="search-container">
        <tui-icon
          @click="handleBack"
          margin="6upx 0 0 0"
          name="arrowleft"
        ></tui-icon>
        <view class="input-wrapper">
          <image
            class="search-icon"
            src="../../../static/images/user/weidian/search.png"
            mode=""
          />
          <input v-model="searchValue" type="text" placeholder="搜索" />
        </view>
        <view
          class="uni-btn search-btn"
          :style="{ background: searchValue ? '#ffc117' : '#ccc' }"
          >搜索</view
        >
      </view>

      <!-- 头部 menu -->

      <view class="header-nav-container" :class="{ fixed: scrollTop > 0 }">
        <view
          class="item"
          @click="handleSwichTab(index)"
          v-for="(item, index) in menus"
          :key="index"
          :class="{ active: currentMenu === index }"
          >{{ item }}</view
        >
      </view>
    </view>
    <view class="main">
      <!-- 列表 -->
      <view class="goods-list">
        <view class="item" v-for="item in 30" :key="item">
          <navigator url="" hover-class="none">
            <image
              class="goods-img"
              src="https://img1.baidu.com/it/u=1375922276,3116406937&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
              mode=""
            />
          </navigator>

          <view class="goods-info">
            <view class="goods-name">juaiushdjufiuahsujdufihausyuqhya</view>
            <view class="btns">
              <button class="uni-btn off-shelf-btn">
                <image
                  src="../../../static/images/user/weidian/download.png"
                  mode=""
                />
                <text>下架</text>
              </button>
              <button class="uni-btn share-btn">
                <image
                  src="../../../static/images/user/weidian/share.png"
                  mode=""
                />
                <text>分享</text>
              </button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      menus: Object.freeze(['上架商品', '平台商品', '门店商品']),
      currentMenu: 0,
      searchValue: '',
      scrollTop: 0,
    }
  },

  methods: {
    // 切换 nav
    handleSwichTab(index) {
      this.currentMenu = index

      console.log(this.currentMenu)
    },

    // 返回
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user',
      })
    },
  },

  computed: {
    scrollBarLeft() {
      return 20 + this.currentMenu * 236
    },
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
}
</script>

<style lang="less" scoped>
@main-color: #ffc117;
.microstore-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f5;

  .op-container {
    padding: 24upx 20upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0 0 48upx 48upx;
  }

  .header-nav-container {
    position: relative;
    width: 100%;
    height: 98upx;
    background-color: #fff;
    padding: 24upx 0 0 0;
    box-sizing: border-box;
    font-size: 0;

    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .item {
      position: relative;
      display: inline-block;
      width: 33%;
      font-size: 32upx;
      height: 100%;
      text-align: center;
      line-height: 70upx;
      border-radius: 24upx;
      color: #8f8d85;

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 8upx;
        border-radius: 10upx;
        background-color: @main-color;
        transition: all 350ms ease-in;
      }

      &.active {
        &::after {
          width: 40upx;
        }
      }
    }
  }

  // 搜索区
  .search-container {
    background-color: #fff;
    display: flex;
    .input-wrapper {
      flex: 1;
      display: flex;
      padding: 16upx 24upx;
      box-sizing: border-box;
      align-items: center;
      background: #fbfbfb;
      border-radius: 100px;
      border: 1px solid #f1f1f0;

      .search-icon {
        width: 32upx;
        height: 32upx;
        padding-right: 16upx;
        margin-right: 16upx;
        border-right: 1upx solid #d5d4d1;
      }

      input {
        flex: 1;
        font-size: 28upx;
      }
    }

    .search-btn {
      flex-shrink: 0;
      margin-left: 24upx;
      width: 148upx;
      height: 72upx;
      border-radius: 100px;
      background-color: @main-color;
      font-size: 26upx;
      text-align: center;
      line-height: 72upx;
      color: #fff;
      transition: all 200ms ease-in-out;
    }
  }

  .main {
    padding: 20upx;
    box-sizing: border-box;

    // 商品列表
    .goods-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .item {
        width: 350upx;
        border-radius: 24upx;
        overflow: hidden;
        background-color: #fff;
        margin-bottom: 20upx;

        .goods-img {
          width: 350upx;
          height: 348upx;
          object-fit: cover;
        }

        .goods-info {
          padding: 24upx;
          box-sizing: border-box;

          .goods-name {
            width: 300upx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .btns {
            display: flex;
            align-items: center;
            margin-top: 18upx;

            image {
              width: 32upx;
              height: 32upx;
            }

            .uni-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 80upx;
              flex: 1;
              color: #fff;
              font-size: 28upx;

              text {
                margin-left: 6upx;
              }
            }

            .off-shelf-btn {
              background-color: #ffc117;
              border-radius: 100upx 0 0 100upx;
            }

            .share-btn {
              background-color: #3a3629;
              border-radius: 0 100upx 100upx 0;
            }
          }
        }
      }
    }
  }
}
</style>
