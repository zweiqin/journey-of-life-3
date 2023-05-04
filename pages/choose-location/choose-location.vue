<template>
  <view class="my-address">
    <!-- 定位区 -->
    <view class="search-box">
      <tui-icon @click="handleBack" name="arrowleft" :size="25" color="#00"></tui-icon>
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
        }}</text>
      <view><tui-icon :size="16" color="#000" name="location"></tui-icon>
        <text>重新定位</text>
      </view>
    </view>

    <!-- tabs 标签页 -->
    <tui-tabs :tabs="tabs" selectedColor="#e95d20" sliderBgColor="#e95d20" itemWidth="30%" :currentTab="currentTab"
      @change="handleChangeTab"></tui-tabs>

    <!-- 标签页 -->
    <view class="wrapper-container">
      <swiper @change="handleChangeSwiper" :current="currentTab" class="swiper">
        <swiper-item class="" item-id="">
          <view class="address-list-wrapper">
            <tui-index-list activeKeyColor="#e95d20" activeColor="#e95d20" activeKeyBackground="#fff"
              :list-data="cityList">
              <template v-slot:item="{ entity }">
                <tui-list-cell padding="16rpx 30rpx" v-for="(item, index) in entity" :key="index">
                  <view class="tui-list__item" @click="handleChooseCity(item)">
                    <view :id="'item' + item.name" class="tui-name">{{
                      item.name
                    }}</view>
                  </view>
                </tui-list-cell>
              </template>
            </tui-index-list>
          </view>
        </swiper-item>

        <swiper-item>
          <view class="choose-cities">
            <tui-grid unlined>
              <block v-for="(item, index) in currentDistinguishData" :key="index">
                <tui-grid-item class="grid-item" :class="{ active: tabs[1].name === item.name.slice(0, 3) + '...' }"
                  :cell="3" @click="handleChooseTown(item)">
                  <text class="tui-grid-label">{{ item.name }}</text>
                </tui-grid-item>
              </block>
            </tui-grid>

          </view>
        </swiper-item>

        <swiper-item>
          <view class="choose-cities">
            <tui-grid unlined>
              <block v-for="(item, index) in currentTownData" :key="index">
                <tui-grid-item :cell="3" @click="confirmChooseAddress(item)">
                  <text class="tui-grid-label">{{ item.name }}</text>
                </tui-grid-item>
              </block>
            </tui-grid>
          </view>
        </swiper-item>
      </swiper>
    </view>



    <tui-popup :duration="500" :modeClass="['fade-in']" :styles="styles" :show="showAuthPopupVisible"
      @click="showAuthPopupVisible = false">
      <view class="address-text">
        <tui-icon name="gps" :size="30" color="#e95d20"></tui-icon>
        "团蜂"想访问您的地理位置，将根据你的地理位置提供准确的收货地址，社区服务地址，查看附近商家及门店等功能
      </view>
    </tui-popup>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
export default {

  data() {
    return {
      currentTab: 0,
      cityList: [],
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
      tabs: [
        {
          name: "所在城市"
        },
        {
          name: "区/县"
        },
        {
          name: "镇/街道"
        }
      ],
      mainHeight: 0,
      currentTab: 0,
      currentDistinguishData: null,
      currentTownData: null
    }
  },
  methods: {
    getData() {
      uni.showLoading();
      const _this = this
      import('./cities.json').then(res => {
        for (const key in res) {
          _this.cityList.push(res[key])
        }
        _this.isShowLoading = false
        uni.hideLoading();
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

    handleChooseCity(chooseAddressInfo) {
      this.currentDistinguishData = chooseAddressInfo.children
      this.currentTownData = null
      this.currentTab = 1
      this.tabs[0].name = chooseAddressInfo.name.slice(0, 3) + '...'
      this.tabs[0].select = chooseAddressInfo.name



      // this.$store.commit('location/CHANGE_CURRENT_CITY', cityName)
      // this.handleBack()
    },

    // 滑动swiper
    handleChangeSwiper(e) {
      this.currentTab = e.detail.current
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

    // 切换tab
    handleChangeTab(info) {
      if (info.index === 1 && !this.currentDistinguishData) {
        this.ttoast({
          type: 'fail',
          title: '请选择所在城市'
        })
        return
      }

      if (info.index === 2 && !this.currentTownData) {
        this.ttoast({
          type: 'fail',
          title: '请选择所在区县'
        })
        return
      }

      this.currentTab = info.index

    },

    // 选择区县
    handleChooseTown(data) {
      this.currentTownData = data.children
      this.currentTab = 2
      this.tabs[1].name = data.name.slice(0, 3) + '...'
      this.tabs[1].select = data.name
    },

    // 选择定位
    confirmChooseAddress(data) {
      uni.showLoading();
      this.$store.dispatch('location/getDetailAddress', {
        city: this.tabs[0].select,
        distinguish: this.tabs[1].select,
        town: data.name
      })

      uni.hideLoading();

      this.ttoast("修改成功")

      setTimeout(() => {
        this.handleBack()
      }, 1000);

    }
  },


  mounted() {
    this.getData()
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

.wrapper-container {
  width: 100%;
  height: calc(100vh - 292upx);
  // background-color: #f40;
  overflow: hidden;

  .swiper {
    height: calc(100vh - 292upx);
  }

  /deep/ .tui-scroll__view {
    height: calc(100vh - 292upx) !important;
  }
}

.choose-cities {
  width: 100%;
  height: 100%;
}

/deep/ .tui-tabs-item {
  width: 160rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/deep/ .tui-grid {
  text-align: center;
}

.grid-item.active {
  background-color: #e95d20 !important;
  color: #fff;
}

.tui-grid-label {
  font-size: 28upx;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
</style>
