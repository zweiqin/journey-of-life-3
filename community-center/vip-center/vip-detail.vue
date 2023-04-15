<template>
  <view class="vip-detail-conatiner" :style="{ background: type == 2 ? '#ee7d53' : '' }">
    <view class="header">
      <img v-if="type != 2" style="width: 100%; padding-top: 80upx; padding-bottom: 30upx"
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/hz3cjdj9eogy1xpezqkm.png" alt="" />
      <!-- <JIcon @click="handleClickBack" class="back" type="red-back"></JIcon> -->
      <img src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/56zmrnjpobwxiwy3tie6.png" alt=""
        class="back" @click="handleClickBack" />

      <view class="main" :style="{ padding: type == 2 ? '0px !important' : '' }">
        <PackagePane v-if="type == 1" @pay="handlePayTH" :key="vipList[0].name" :data="vipList[0]">
          <view class="list">
            <li class="indulgence-item" @click="handleChooseIndulgence(item)" v-for="(item, index) in indulgenceData"
              :key="index">
              <tui-icon :color="
                currentIndulgence === item.serverContent ? '#fa5151' : '#ccc'
              " :size="25" :name="
  currentIndulgence === item.serverContent
    ? 'circle-fill'
    : 'circle'
"></tui-icon>
              <text>{{ item.serverContent }}</text>
            </li>
          </view>
        </PackagePane>

        <!-- <PackagePane v-if="type == 2" @pay="handlePayBS" :key="vipList[1].name" :data="vipList[1]">
          <view class="list">
            <li class="indulgence-item" v-for="(item, index) in beeSteward" :key="index">
              <text>({{ index + 1 }}) {{ item }}</text>
            </li>
          </view>
        </PackagePane> -->

        <image v-if="type == 2" class="vip-299" mode="widthFix" src="../../static/images/con-center/vip.png"></image>
      </view>
    </view>

    <JCity @confirm="handleChooseCity" ref="jCityRef"></JCity>

    <view class="vip-299-pay-btn-wrapper" v-if="type == 2">
      <button @click="handlePayBS" class="uni-btn"> 299元立即抢购 </button>
    </view>

    <TuanWxShare ref="tuanWxShareRef"> </TuanWxShare>
    <!-- <button @click="handleShareServe">分享</button> -->
  </view>
</template>

<script>
import PackagePane from './components/package-pane.vue'
import Tabbar from './components/tabbar.vue'
import { vipList } from './config'
import { getServeListApi } from '../../api/community-center'
import { USER_ID } from '../../constant'

export default {
  components: {
    PackagePane,
    Tabbar,
  },
  data() {
    return {
      vipList,
      indulgenceData: [],
      beeSteward: null,
      currentIndulgence: '空调清洗一台 (免拆)',
      address: '',
      userId: null,
      type: null,
    }
  },
  onLoad(option) {
    this.type = option.type
    if (this.type) {
      uni.setStorageSync('SERVE_TYPE', option.type)
    }
    this.getServeList()
    this.userId = uni.getStorageSync(USER_ID)
  },

  onShow() {
    // debugger
    if (!this.type) {
      this.type = uni.getStorageSync('SERVE_TYPE')
    }
  },

  methods: {
    handleClickBack() {
      uni.switchTab({
        url: '/',
      })
    },

    // 获取服务列表
    async getServeList() {
      uni.showLoading({
        title: '加载中',
      })

      const res = await getServeListApi()
      uni.hideLoading()
      if (res.statusCode === 20000) {
        this.allServeList = res.data
        this.beeSteward = res.data
          .find(item => item.serverType === 1)
          .serverContent.split(',')
        this.indulgenceData = res.data.filter(item => item.serverType === 2)
        this.currentIndulgence = this.indulgenceData[0].serverContent
        this.handleShareServe(true)
      }
    },

    // 选择地址
    handleChooseCity(data) {
      this.address = data.area
    },

    // 选择特惠
    handleChooseIndulgence(item) {
      this.currentIndulgence = item.serverContent
    },

    // 购买特惠
    async handlePayTH() {
      if (!this.userId) {
        uni.showModal({
          title: '提示',
          content: '你还未登录，是否先去登录？',
          success: function (res) {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/login/login?to=/community-center/vip-center/vip-detail',
              })
            }
          },
        })
        return
      }

      console.log(this.currentIndulgence);
      if (!this.currentIndulgence) {
        uni.showToast({
          title: '请选择服务项',
          duration: 2000,
          icon: 'none',
        })

        return
      }

      const currentServe = this.allServeList.find(
        item => item.serverContent === this.currentIndulgence
      )

      uni.navigateTo({
        url:
          '/community-center/active-consignee?data=' +
          JSON.stringify(currentServe) +
          '&repair=true',
      })
    },

    // 购买金管家
    async handlePayBS() {
      if (!this.userId) {
        uni.showModal({
          title: '提示',
          content: '你还未登录，是否先去登录？',
          success: function (res) {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/login/login?to=/community-center/vip-center/vip-detail',
              })
            }
          },
        })
        return
      }
      const currentServe = this.allServeList.find(item => item.serverType === 1)
      uni.navigateTo({
        url:
          '/community-center/active-consignee?data=' +
          JSON.stringify(currentServe) +
          '&repair=true',
      })
    },

    // 分享会员
    handleShareServe(isQuit) {
      const _this = this
      const data = {
        data: {
          title: _this.type == 2 ? '金管家会员' : '清洁套餐',
          desc: '售后质保·服务专业·极速退款·意外承包',
          link: `https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/community-center/vip-center/vip-detail?type=${_this.type}`,
          imageUrl: _this.type == 2 ? '../../static/images/con-center/Snipaste_2023-04-15_09-23-27.png' : '',
        },
        successCb: () => { },
        failCb: () => { },
      }

      this.$refs.tuanWxShareRef.share(data, isQuit)
    }

  },
}
</script>

<style lang="less" scoped>
.vip-detail-conatiner {
  background-color: #fa5151;
  font-size: 32upx;
  min-height: 100vh;

  .header {
    position: relative;

    .back {
      position: fixed;
      top: 40upx;
      left: 30upx;
      width: 60upx;
      height: 60upx;
      z-index: 1000;
      background-color: #ff9137;
      border-radius: 50%;
    }
  }

  .main {
    padding: 22upx;
    box-sizing: border-box;

    .vip-299 {
      width: 100%;
      padding-bottom: 140upx;
    }
  }

  .indulgence-item {
    margin: 20upx 0;

    text {
      margin-left: 20upx;
      color: #3d3d3d;
    }
  }
}

/deep/ .address {
  display: none !important;
}

li {
  display: flex;
  align-items: center;
}

.vip-299-pay-btn-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 140upx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  .uni-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 610upx;
    height: 104upx;
    border-radius: 999px;
    font-size: 36upx;
    color: #fff;
    background: linear-gradient(180deg, #FF715B 0%, #FA5151 100%);
  }
}
</style>
