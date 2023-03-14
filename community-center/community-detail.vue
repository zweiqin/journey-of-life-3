<template>
  <view class="community-detail">
    <view class="head">
      <view class="title-list">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
          alt=""
          class="return"
          @click="handleBack"
        />
        <view class="title" @click="handleBack">
          <text class="page-title">{{ title }}</text>
        </view>
        <view class="location">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/iglo65306wogezn1kjmf.png"
            alt=""
            class="icon"
          />
          <view class="address">{{
            $store.getters.currentCity || '定位中...'
          }}</view>
        </view>
      </view>
      <view class="goods">
        <img
          :src="
            serverUrl ||
            'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/wjor6av7ldr00pua8b6q.png'
          "
          alt=""
          class="img"
          @click="preview(serverUrl)"
        />
      </view>
      <view class="name-list">
        <view class="name">{{ title }}</view>
        <view class="a">
          <view class="share" @click="handleShare">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/mi4jzqbzsb31mge61s18.png"
              alt=""
              class="image"
            />
            <view class="text">分享</view>
          </view>
        </view>
      </view>

      <view class="brief">
        <view class="introduce">服务内容介绍</view>
        <view class="content">{{ serverIntroduction }}</view>
      </view>
      <view v-if="isArtificial">
        <view class="type">服务类型</view>
        <view class="price-list" ref="price-list">
          <item
            v-for="item in serviceDetail"
            :key="item.id"
            :class="{ active: item.id == currentTab }"
            @choose="switchTab(item)"
            :serverInfoName="item.serverInfoName"
            :serverPrice="item.serverPrice"
            :serverUnit="item.serverUnit"
            :isArtificialArtificial="item.isArtificialArtificial"
          ></item>
        </view>
      </view>
    </view>
    <view class="mid">
      <view class="text-list">
        <view class="ensure">保障</view>
        <view class="poster">售后质保·服务专业·极速退款·意外承包</view>
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/cofcgw5ox0ctbtqn1txr.png"
          alt=""
          class="more"
        />
      </view>
    </view>
    <view class="body">
      <view class="top">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/e6r4nzkriag797mchd56.png"
          alt=""
          class="top-img"
        />
      </view>
      <view class="middle">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/48h3rr7tsuwxtkh0jpky.png"
          alt=""
          class="mid-img"
        />
      </view>
      <view class="process">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/alfwfqtuvrwg4xjacanj.png"
          alt=""
          class="process-img"
        />
      </view>

      <view class="case-show">
        <view class="text">
          <view class="text1">案例</view>
          <view class="text2">展示</view>
        </view>
        <view class="show-img">
          <img
            :src="
              serverInfoUrl ||
              'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/6h2p8u4uktb8gbhwauw8.png'
            "
            alt=""
            class="img1"
            @click="previewImage(serverInfoUrl)"
          />
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/q2rf6x9hlytiuo53urkx.png"
            alt=""
            class="img2"
          />
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/chkivuapm9jn8z8bz29k.png"
            alt=""
            class="img3"
          />
        </view>
      </view>
      <view class="tips">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/iftnzg3gb548iy7p7n5b.png"
          alt=""
          class="img-tips"
        />
      </view>
    </view>
    <view class="other">
      <view
        class="other-service"
        v-for="item in moreService"
        :key="item.value"
        @click="handleToServiceListHome(item.value)"
      >
        <view class="text">其他服务</view>
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/63apnwjyguuyva9itx9k.png"
          alt=""
          class="show"
        />
      </view>
    </view>
    <view class="foot">
      <view class="list">
        <view class="online">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/aivl8ag811bco1skdda2.png"
            alt=""
            class="seek"
          />
          <view class="name">在线咨询</view>
        </view>
        <view class="order-list">
          <!-- <view class="join">加入需求清单</view> -->
          <view class="order" @click="handleToServiceOrderHome">立即下单</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getConfigApi } from '../api/auth'
import item from '../community-center/componts/item'
import { getServiceDetailApi } from '../api/community-center'
import { getAdressDetailByLngLat } from '../utils/DWHutils'
import { moreService } from '../pages/community-center/config'
import { USER_TOKEN } from '../constant'
// #ifdef H5
import share from '../utils/wxshare'
// #endif

export default {
  name: 'Community-detail',
  props: {},
  components: {
    item,
  },
  data() {
    return {
      moreService,
      address: '',
      serviceDetail: [],
      id: '',
      serverTypeId: '',
      serverInfoName: '',
      serverInfoUrl: '',
      serverIntroduction: '',
      isArtificial: '',
      serverPrice: '',
      title: '',
      serverUnit: '',
      currentTab: 1,
      length: '',
      serverUrl: '',
      index: '',
    }
  },
  methods: {
    handleBack() {
      uni.navigateBack()
    },
    handleToServiceListHome(item) {
      console.log('更多服务分类列表', item)
      this.value = item
      uni.navigateTo({
        url: `/community-center/service-sort?value=${this.value}`,
      })
    },
    handleToServiceOrderHome() {
      //需要传 图片 价格 名称 单位
      // uni.navigateTo({ url: "../community-center/community-order" });
      // const let var

      uni.showToast({
        title: '请选择服务类型',
        icon: 'none',
        duration: 2000,
      })

      if (!this.isArtificial) {
        console.log('abc')
        uni.navigateTo({
          url: `/community-center/community-order?name=${this.title}&id=${this.serverTypeId}&priceType=${this.isArtificial}&imgUrl=${this.serverUrl}`,
        })
      } else {
        if (!this.serverPrice == 0) {
          uni.navigateTo({
            url: `/community-center/community-order?serverInfoUrl=${this.serverInfoUrl}&serverPrice=${this.serverPrice}&serverInfoName=${this.serverInfoName}&serverUnit=${this.serverUnit}&name=${this.title}&id=${this.serverTypeId}&priceType=${this.isArtificial}&detailId=${this.detailId}&imgUrl=${this.serverUrl}`,
          })
        } else {
          console.log('sb kuaixuan')
        }
      }
    },

    switchTab(item1) {
      console.log('12345', item1)
      this.currentTab = item1.id
      this.serverTypeId = item1.serverTypeId
      this.serverPrice = item1.serverPrice
      this.serverInfoName = item1.serverInfoName
      this.serverUnit = item1.serverUnit
      this.serverIntroduction = item1.serverIntroduction
      this.detailId = item1.id
      console.log('详情id', this.detailId)
    },

    //社区服务详情
    async getServiceDetail() {
      // this.serverTypeId=this.serviceDetail.serverTypeId;
      const res = await getServiceDetailApi({
        // serverTypeId: 109,
        serverTypeId: this.serverTypeId,
      })
      this.serviceDetail = res.data
      console.log('666', this.serviceDetail)

      this.isArtificial = this.serviceDetail[0].isArtificial
      this.length = this.serviceDetail.length
      console.log('是否一口价', this.isArtificial)

      this.serverIntroduction = this.serviceDetail[0].serverIntroduction
      console.log('介绍', this.serverIntroduction)

      this.serverInfoUrl = this.serviceDetail[0].serverInfoUrl
      console.log('图片', this.serverInfoUrl)

      // this.detailId = this.serviceDetail[0].id;
      // console.log("详情id", this.detailId);
    },

    //预览图
    preview(index) {
      console.log(index)
      let imgsArray = []
      imgsArray[0] = index

      uni.previewImage({
        urls: imgsArray,
        current: 0,
      })
    },

    previewImage(index) {
      console.log(index)
      let imgsArray = []
      imgsArray[0] = index

      uni.previewImage({
        urls: imgsArray,
        current: 0,
      })
    },

    // 微信分享
    async setWxShareConfig() {
      const currentUrl = window.location.href.replace('#', 'ericToken')
      const { data } = await getConfigApi({
        url: currentUrl,
        token: uni.getStorageSync(USER_TOKEN),
      })

      share.wxRegister(data, {
        title: this.title,
        imgUrl: this.serverImageUrl,
        desc: '售后质保·服务专业·极速退款·意外承包',
        link: `https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/community-center/community-detail?id=${this.serverTypeId}&serverNameThree=${this.title}&serverImageUrl=${this.serverUrl}`,
      })
    },

    // 点击右上角三点分享
    handleShare() {
      uni.showToast({
        title: '点击右上角三点分享',
        duration: 2000,
        icon: 'none',
      })
    },
  },
  created() {},
  onLoad(options) {
    this.serverTypeId = options.id
    this.title = options.serverNameThree
    uni.setNavigationBarTitle({
      title: this.title,
    })
    this.serverUrl = options.serverImageUrl
    this.setWxShareConfig()
    this.getServiceDetail()
  },
}
</script>
<style lang="less" scoped>
.community-detail {
  background: #f7f8fa;
  .head {
    padding-top: 20upx;
    background: #ffffff;
    padding-right: 20upx;
    box-sizing: border-box;
    .title-list {
      position: relative;
      display: flex;
      align-items: center;
      padding: 20upx 0upx 36upx 16upx;
      .return {
        width: 48upx;
        height: 48upx;
      }
      .title {
        // flex: 1;
        text-align: center;
        font-size: 36upx;
        font-weight: bold;
        color: #3d3d3d;
      }
      .location {
        // width: 124upx;
        height: 40upx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        right: 0upx;

        .icon {
          width: 28upx;
          height: 28upx;
        }
        .address {
          font-size: 28upx;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
    .goods {
      // margin: 0upx 82upx;
      width: 100%;
      height: 340upx;
      display: flex;
      justify-content: center;
      .img {
        width: 588upx;
        height: 340upx;
      }
    }
    .name-list {
      display: flex;
      justify-content: space-between;
      padding-left: 36upx;
      padding-top: 30upx;

      .name {
        font-size: 36upx;
        font-weight: bold;
        color: #3d3d3d;
      }
      .a {
        width: 120upx;
        height: 80upx;
        display: flex;
        align-items: flex-end;
        .share {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100upx 0upx 0upx 100upx;
          background: #f7f8fa;
          width: 120upx;
          height: 50upx;
          .image {
            width: 40upx;
            height: 40upx;
          }
          .text {
            font-size: 28upx;
            color: #3d3d3d;
          }
        }
      }
    }

    .brief {
      padding: 14upx 18upx 40upx 36upx;
      .introduce {
        font-size: 28upx;
        font-weight: bold;
        color: #3d3d3d;
      }
      .content {
        padding-top: 14upx;
        font-size: 28upx;
        color: #3d3d3d;
      }
    }
    .type {
      padding-left: 36upx;
      padding-bottom: 20upx;
      font-size: 28upx;
      font-weight: bold;
      color: #3d3d3d;
    }
    .price-list {
      padding-left: 36upx;
      padding-right: 36upx;
      padding-bottom: 14upx;
      display: flex;
      flex-wrap: wrap;
      // .item {
      //   margin-right: 10upx;
      //   margin-bottom: 40upx;
      //   width: 210upx;
      //   height: 70upx;
      //   border-radius: 10upx;
      //   border: 2upx solid #999999;
      //   &.active {
      //     background: #fa5151;
      //     color: #fa5151;
      //   }

      //   .m {
      //     padding-left: 6upx;
      //     width: 210upx;
      //     height: 70upx;
      //     display: flex;
      //     flex-direction: column;
      //     justify-content: center;
      //     .first {
      //       font-size: 28upx;
      //       font-weight: 400;
      //       color: #999999;
      //     }
      //     .second {
      //       // margin-top: 4upx;
      //       .row {
      //         display: flex;
      //         align-items: center;
      //         .specs {
      //           font-size: 24upx;
      //           font-weight: 400;
      //           color: #999999;
      //         }
      //         .number {
      //           font-size: 28upx;
      //           font-weight: 400;
      //           color: #999999;
      //         }
      //         .money {
      //           font-size: 24upx;
      //           font-weight: 400;
      //           color: #999999;
      //         }
      //         .unit {
      //           font-size: 24upx;
      //           font-weight: 400;
      //           color: #999999;
      //         }
      //         .qi {
      //           font-size: 24upx;
      //           font-weight: 400;
      //           color: #999999;
      //         }
      //       }
      //     }
      //   }
      // }
    }
  }
  .mid {
    display: flex;
    align-items: center;
    height: 104upx;
    margin-top: 16upx;
    margin-bottom: 16upx;
    background: #ffffff;
    .text-list {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
      padding: 0upx 18upx 0upx 36upx;

      .ensure {
        font-size: 28upx;
        font-weight: bold;
        color: #3d3d3d;
      }
      .poster {
        font-size: 24upx;
        color: #3d3d3d;
      }
      .more {
        width: 40upx;
        height: 40upx;
      }
    }
  }
  .body {
    background: #ffffff;

    .top {
      .top-img {
        // width: 752upx;
        // height: 760upx;
        width: 100%;
      }
    }
    .middle {
      .mid-img {
        // width: 754upx;
        // height: 964px;
        width: 100%;
      }
    }
    .process {
      .process-img {
        width: 100%;
      }
    }
    .tips {
      .img-tips {
        width: 100%;
      }
    }
    .case-show {
      .text {
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 74upx;
        .text1 {
          font-size: 48upx;
          font-weight: bold;
          color: #3d3d3d;
        }
        .text2 {
          font-size: 48upx;
          font-weight: bold;
          color: #ea6f3a;
        }
      }
      .show-img {
        padding: 40upx 30upx 54upx 30upx;
        .img1 {
          width: 100%;
          height: 810upx;
        }
        .img2 {
          width: 100%;
          height: 514upx;
        }
        .img3 {
          width: 100%;
          height: 344upx;
        }
      }
    }
  }
  .other {
    // margin-top: 20upx;
    background: #ffffff;
    width: 100%;
    height: 280upx;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .other-service {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10upx;
      width: 200upx;
      .text {
        font-size: 32upx;
        color: #3d3d3d;
      }
      .show {
        width: 40upx;
        height: 40upx;
      }
    }
  }
  .foot {
    background: #ffffff;
    padding: 30upx 30upx 30upx 30upx;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    border-top: 8upx solid #f7f8fa;
    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 82upx;
      .online {
        width: 96upx;
        height: 82upx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .seek {
          width: 48upx;
          height: 48upx;
        }
        .name {
          font-size: 24upx;
          white-space: nowrap;
        }
      }
      .order-list {
        display: flex;
        justify-content: flex-end;
        width: 75%;
        .join {
          font-size: 32upx;
          width: 270upx;
          height: 80upx;
          border-radius: 100upx;
          border: 2upx solid #999999;
          color: #999999;
          text-align: center;
          line-height: 78upx;
        }
        .order {
          font-size: 32upx;
          color: #ffffff;
          width: 220upx;
          height: 80upx;
          border-radius: 100upx;
          background: linear-gradient(270deg, #e95d20 0%, #ff8f1f 100%);
          text-align: center;
          line-height: 78upx;
        }
      }
    }
  }
}
</style>
