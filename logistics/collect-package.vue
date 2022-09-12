<template>
  <view class="collect-package">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">寄件</view>
    </view>

    <view class="main">
      <view class="search">
        <input
          class="search-input"
          type="text"
          placeholder="完整的订单号/收发货人姓名/收货人手机"
          @input="search"
        />
        <img class="img" src="../static/images/store/search.png" alt="" />
      </view>

      <view class="order-list">
        <view class="navs">
          <view
            @click="switchTab(0)"
            :class="{ active: currentTab === 0 }"
            class="nav-item"
          >
            全部
          </view>
          <view
            @click="switchTab(1)"
            :class="{ active: currentTab === 1 }"
            class="nav-item"
          >
            待取件
          </view>
          <view
            @click="switchTab(2)"
            :class="{ active: currentTab === 2 }"
            class="nav-item"
          >
            派送中
          </view>
          <view
            @click="switchTab(3)"
            :class="{ active: currentTab === 3 }"
            class="nav-item"
          >
            运输中
          </view>
          <view
            @click="switchTab(4)"
            :class="{ active: currentTab === 4 }"
            class="nav-item"
          >
            已签收
          </view>
        </view>

        <view class="orders">
          <view class="order-wrapper" @click="toDetail">
            <view class="order-item">
              <img
                class="img"
                src="https://t7.baidu.com/it/u=2978830395,2475392084&fm=193&f=GIF"
                alt=""
              />
              <view class="info hidden">
                <view class="text hidden" style="max-width: 120px"
                  >欧式家具实木欧式家具实木111111</view
                >
                <view class="text">送货上门</view>
                <view class="text">送达时间:2022.05.22</view>
              </view>
            </view>

            <view class="status">
              状态：<text class="status-text">待取件</text>
            </view>
          </view>

          <view class="order-wrapper" @click="toDetail">
            <view class="order-item">
              <img
                class="img"
                src="https://t7.baidu.com/it/u=2978830395,2475392084&fm=193&f=GIF"
                alt=""
              />
              <view class="info hidden">
                <view class="text hidden" style="max-width: 120px"
                  >欧式家具实木欧式家具实木111111</view
                >
                <view class="text">送货上门</view>
                <view class="text">送达时间:2022.05.22</view>
              </view>
            </view>

            <view class="status">
              状态：<text class="status-text">待取件</text>
            </view>
          </view>

          <view class="order-wrapper">
            <view class="order-item">
              <img
                class="img"
                src="https://t7.baidu.com/it/u=2978830395,2475392084&fm=193&f=GIF"
                alt=""
              />
              <view class="info hidden">
                <view class="text hidden" style="max-width: 120px"
                  >欧式家具实木欧式家具实木111111</view
                >
                <view class="text">送货上门</view>
                <view class="text">送达时间:2022.05.22</view>
              </view>
            </view>

            <view class="status">
              状态：<text class="status-text">待取件</text>
            </view>
          </view>

          <view class="order-wrapper">
            <view class="order-item">
              <img
                class="img"
                src="https://t7.baidu.com/it/u=2978830395,2475392084&fm=193&f=GIF"
                alt=""
              />
              <view class="info hidden">
                <view class="text hidden" style="max-width: 120px"
                  >欧式家具实木欧式家具实木111111</view
                >
                <view class="text">送货上门</view>
                <view class="text">送达时间:2022.05.22</view>
              </view>
            </view>

            <view class="status">
              状态：<text class="status-text">待取件</text>
            </view>
          </view>

          <view class="order-wrapper">
            <view class="order-item">
              <img
                class="img"
                src="https://t7.baidu.com/it/u=2978830395,2475392084&fm=193&f=GIF"
                alt=""
              />
              <view class="info hidden">
                <view class="text hidden" style="max-width: 120px"
                  >欧式家具实木欧式家具实木111111</view
                >
                <view class="text">送货上门</view>
                <view class="text">送达时间:2022.05.22</view>
              </view>
            </view>

            <view class="status">
              状态：<text class="status-text">待取件</text>
            </view>
          </view>

          <view class="order-wrapper">
            <view class="order-item">
              <img
                class="img"
                src="https://t7.baidu.com/it/u=2978830395,2475392084&fm=193&f=GIF"
                alt=""
              />
              <view class="info hidden">
                <view class="text hidden" style="max-width: 120px"
                  >欧式家具实木欧式家具实木111111</view
                >
                <view class="text">送货上门</view>
                <view class="text">送达时间:2022.05.22</view>
              </view>
            </view>

            <view class="status">
              状态：<text class="status-text">待取件</text>
            </view>
          </view>

          <view class="order-wrapper">
            <view class="order-item">
              <img
                class="img"
                src="https://t7.baidu.com/it/u=2978830395,2475392084&fm=193&f=GIF"
                alt=""
              />
              <view class="info hidden">
                <view class="text hidden" style="max-width: 120px"
                  >欧式家具实木欧式家具实木111111</view
                >
                <view class="text">送货上门</view>
                <view class="text">送达时间:2022.05.22</view>
              </view>
            </view>

            <view class="status">
              状态：<text class="status-text">待取件</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const { debounce } = require("../utils/util");

export default {
  data() {
    return {
      search: null,
      currentTab: 0,
    };
  },

  mounted() {
    this.search = debounce(this.searchWuliu, 500);
  },

  methods: {
    back() {
      uni.switchTab({
        url: "/pages/logistics/logistics",
      });
    },

    /**
     * @description 搜索
     */
    searchWuliu(e) {
      const searchKey = e.target.value;
    },

    /**
     * @description 切换nav
     */
    switchTab(tab) {
      this.currentTab = tab;
    },

    /**
     * @description 查看详情
     */
    toDetail() {
      uni.navigateTo({
        url: "/logistics/collect-package-detail",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.collect-package {
  padding: 68upx 40upx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #00b578 0%, #ffffff 100%);

  .header {
    display: flex;
    align-items: center;

    .back {
      width: 16upx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 32upx;
    }
  }

  .main {
    width: 100%;
    border-radius: 20upx;
    background-color: #fff;
    padding: 20upx;
    min-height: 300px;
    margin-top: 34upx;
    box-sizing: border-box;

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

    .order-list {
      width: 100%;
      box-sizing: border-box;
      padding: 40upx 26upx;

      .navs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000000;
        font-size: 28upx;

        .nav-item {
          position: relative;
          padding-bottom: 6upx;
          border-bottom: 2px solid transparent;
          font-weight: 500;
          transition: all 350ms;

          &.active {
            border-bottom-color: #3662ec;
          }
        }
      }

      .orders {
        .order-wrapper {
          margin-top: 30upx;
          border-bottom: 1px solid #d8d8d8;

          &:last-child {
            border: none;
          }

          .order-item {
            display: flex;
            justify-content: space-between;

            .img {
              width: 254upx;
              height: 166upx;
              border-radius: 20upx;
            }

            .info {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: space-around;
              margin: 0 48upx;
              color: #3d3d3d;
              font-size: 24upx;
            }
          }

          .status {
            margin: 18upx 0;
            text-align: right;
            color: #3d3d3d;
            font-size: 28upx;
            font-weight: bold;

            .status-text {
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}
</style>
