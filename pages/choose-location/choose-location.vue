<template>
  <view class="my-address">
    <view class="search-box">
      <tui-icon
        @click="handleBack"
        name="arrowleft"
        :size="25"
        color="#00"
      ></tui-icon>
      <view class="search-wrapper">
        <tui-icon class="search-icon" name="search" :size="20"></tui-icon>
        <input type="text" placeholder="省/市/区/县" />
      </view>
    </view>
    <view @click="handleGetCurrentAddress" class="current-address">
      <text class="current-address-text">
        当前：{{
          $store.getters.currentCity
            ? $store.getters.currentCity
            : '定位失败，重新定位'
        }}</text
      >
      <view
        ><tui-icon :size="16" color="#000" name="location"></tui-icon>
        <text>重新定位</text></view
      >
    </view>

    <view class="hot-city">
      <view class="title">热门城市</view>
      <view class="city-list">
        <view
          @click="handleChooseCity(item.name)"
          class="hot-city-item"
          v-for="item in cityList.hotdata"
          :key="item.name"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <view class="address-list-wrapper">
      <tui-index-list
        activeKeyColor="#e95d20"
        activeColor="#e95d20"
        activeKeyBackground="#fff"
        :list-data="cityList.data"
      >
        <template v-slot:item="{ entity }">
          <tui-list-cell
            padding="16rpx 30rpx"
            v-for="(item, index) in entity"
            :key="index"
          >
            <view class="tui-list__item" @click="handleChooseCity(item.name)">
              <view :id="'item' + item.name" class="tui-name">{{
                item.name
              }}</view>
            </view>
          </tui-list-cell>
        </template>
      </tui-index-list>
    </view>

    <tui-popup
      :duration="500"
      :modeClass="['fade-in']"
      :styles="styles"
      :show="showAuthPopupVisible"
      @click="showAuthPopupVisible = false"
    >
      <view class="address-text">
        <tui-icon name="gps" :size="30" color="#e95d20"></tui-icon>
        "团蜂"想访问您的地理位置，将根据你的地理位置提供准确的收货地址，社区服务地址，查看附近商家及门店等功能
      </view>
    </tui-popup>
  </view>
</template>

<script>
export default {
  methods: {
    getData() {
      const _this = this
      import('./city.json').then(res => {
        _this.cityList = res
        console.log(res)
        _this.isShowLoading = false
      })
    },

    changeTab(e) {
      this.currentTab = e.index
    },

    searchCity(e) {
      const value = e.value
    },

    handleBack() {
      uni.navigateBack()
    },

    handleChooseCity(cityName) {
      this.$store.commit('location/CHANGE_CURRENT_CITY', cityName)
      this.handleBack()
    },

    // 开始定位
    handleGetCurrentAddress() {
      // #ifdef APP
      const appAuthorizeSetting = uni.getAppAuthorizeSetting()
      if (appAuthorizeSetting.locationAuthorized !== 'authorized') {
        this.showAuthPopupVisible = true
        this.$store.dispatch('location/getCurrentLocation')
      } else {
        this.$store.dispatch('location/getCurrentLocation')
      }
      // #endif

      // #ifdef H5
      this.$store.dispatch('location/getCurrentLocation')
      // #endif
    },
  },

  data() {
    return {
      currentTab: 0,
      cityList: {},
      searchValue: '',
      isShowLoading: true,
      showAuthPopupVisible: false,
      styles: {
        position: 'fixed',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'flex-start',
        'background-color': 'rgba(0, 0, 0, 0.5)',
        padding: '50rpx 0 0 0',
      },
    }
  },

  mounted() {
    this.getData()
    setTimeout(() => {}, 2000)
  },
}
</script>

<style lang="scss" scoped>
.my-address {
  width: 100vw;
  min-height: 100vh;
  background-color: #f3f3f3;
  .search-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100upx;
    padding: 20upx;
    box-sizing: border-box;
    background-color: #fff;

    .search-wrapper {
      height: 100%;
      background-color: #f3f3f3;
      border-radius: 100px;
      display: flex;
      align-items: center;
      flex: 1;
      padding: 0 20upx;

      input {
        flex: 1;
        font-size: 24upx;
      }

      .search-icon {
        padding-right: 16upx;
        margin-right: 16upx !important;
        border-right: 1upx solid #d2d2d2;
      }
    }
  }

  .current-address {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20upx;
    box-sizing: border-box;
    background-color: #fff;
    background-color: #fff;
    font-size: 24upx;
    margin-bottom: 40upx;

    .current-address-text {
      display: flex;
      align-items: center;
      width: 300upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    view {
      display: flex;
      align-items: center;

      text {
        margin-left: 10upx;
      }
    }
  }

  .hot-city {
    background-color: #fff;
    .title {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      background: #ffffff;
      color: rgb(102, 102, 102);
      font-size: 13px;
      height: 30px;
      padding: 0px 10px;
      font-weight: bold;
      font-size: 26upx;
    }

    .city-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 20upx;
      box-sizing: border-box;
      padding-left: 40upx;

      .hot-city-item {
        font-size: 24upx;
        color: #000;
        padding: 10upx 20upx;
        border: 1upx solid #adadad;
        margin-right: 30upx;
        margin-bottom: 20upx;
        border-radius: 10upx;
        transition: all 350ms;

        &:active {
          background-color: #e8e8e8;
        }
      }
    }
  }

  /deep/ .tui-title__item {
    background-color: #fff !important;
  }
}

.address-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600upx;
  padding: 26upx;
  background-color: #fff;
  border-radius: 20upx;
  font-size: 32upx;
  line-height: 1.5;

  /deep/ .tui-icon {
    margin-right: 10upx !important;
  }
}
</style>
