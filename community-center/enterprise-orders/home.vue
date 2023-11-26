<template>
  <view class="q-home">
    <view class="main-title">
      <image class="title-img" src="../../static/images/new-community/enterprise-orders/title-img.png"></image>
    </view>

    <view class="advantage">
      <view class="item" :class="{ [item.animateClass]: isAnimate }" v-for="item in advantageList" :key="item.label">
        <tui-icon :size="20" margin="0 8upx 0 0" color="#3D3D3D" name="check"></tui-icon>
        <text class="ad-text">{{ item.label }}</text>
      </view>
    </view>

    <!-- <view class="current-server-shop">
      龙江镇 文华社区店 <image class="icon" src="../../static/images/new-community/enterprise-orders/down-arrow.png"></image>
    </view> -->

    <view class="main-area" :class="{ animate: isAnimate }">
      <image class="img-1" src="../../static/images/new-community/enterprise-orders/lou-1.png"></image>
      <image class="img-2" src="../../static/images/new-community/enterprise-orders/lou-2.png"></image>
      <image class="img-3" src="../../static/images/new-community/enterprise-orders/lou-3.png"></image>
      <view class="inner">
        <view class="menu-title">
          选择您需要的企业服务？
        </view>
        <view class="menu-wrapper" v-if="serveList.length">
          <view class="menu-item" v-for="item in serveList" :key="item.id"
            :style="{ visibility: item.serveName ? 'hidden' : '' }" :class="{ active: selectServes.includes(item.id) }"
            @click="handleChooseServe(item.id)">
            {{ item.serverName }}
          </view>
        </view>
        <view v-else>
          抱歉，您的区域暂时没有相关服务
        </view>
        <button @click="handleSubmit" :style="{ opacity: selectServes.length ? 1 : 0.6 }" class="uni-btn order-btn">{{
          isAuth ? selectServes.length ?
          `已选${selectServes.length}个 立即下单` : '请选择服务项目' : '请先进行企业认证'
        }}</button>
        <view class="tip" v-if="!isAuth">
          企业未认证？<button class="uni-btn" @click="go('/community-center/enterprise-orders/authentication')">去认证</button>
        </view>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
    <tui-modal :show="isShowAuthModal" title="提示" content="请先完成企业认证" @click="handleAuth"></tui-modal>

  </view>
</template>

<script>
import { advantageList } from './data'
import { isAuthHuozhuApi, getBuServeListApi } from '../../api/community-center'
import { USER_INFO } from '../../constant'

export default {
  data() {
    return {
      advantageList: Object.freeze(advantageList),
      selectServes: [],
      isAnimate: false,
      isAuth: false,
      isShowAuthModal: false,
      serveList: []
    }
  },

  onLoad() {
    this.init()
  },

  onShow() {
    this.getIsAuth()
    this.getBuServeList()
  },

  methods: {
    // 页面初始化
    init() {
      this.isAnimate = true
    },

    // 选择服务项
    handleChooseServe(id) {
      if (this.selectServes.includes(id)) {
        this.selectServes = this.selectServes.filter(item => item !== id)
      } else {
        this.selectServes.push(id)
      }
    },

    // 判断还用户是否已经企业认证了
    async getIsAuth() {
      const res = await isAuthHuozhuApi({
        phone: uni.getStorageSync(USER_INFO).phone
      })

      if (res.statusCode === 20000) {
        this.isAuth = res.data
      }
    },

    handleAuth(e) {
      if (e.index) {
        this.go('/community-center/enterprise-orders/authentication')
      }

      this.isShowAuthModal = false
    },

    // 提交进入下一步
    handleSubmit() {
      if (!this.isAuth) {
        this.isShowAuthModal = true
        return
      }

      if (!this.selectServes.length) {
        this.ttoast({
          type: "info",
          title: "请选择服务项"
        })

        return
      }

      uni.navigateTo({
        url: '/community-center/enterprise-orders/confirm-order?serverIds=' + this.selectServes.join(',')
      });
    },

    // 获取服务列表
    async getBuServeList() {
      const res = await getBuServeListApi({
        address: '广东省佛山市顺德区龙江镇'
      })

      if (res.statusCode === 20000) {
        this.serveList = res.data
        if (res.data && res.data.length) {
          const fullRow = Math.floor(res.data.length / 3)
          const buCount = 3 - res.data.length - 3 * fullRow
          for (let i = 0; i < buCount; i++) {
            this.serveList.push({
              id: Math.random() + Date.now(),
              serveName: "xxx"
            })
          }
        }
      } else {
        this.ttoast({
          type: "fail",
          title: "获取服务列表失败"
        })
      }
    }
  },
}
</script>

<style lang="less" scoped>
@keyframes main-animate {
  0% {
    opacity: 0;
    transform: translateY(100upx);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ad-animate {
  0% {
    opacity: 0;
    transform: translateX(1000upx);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.ad-1-animate {
  animation: ad-animate 20ms ease-in-out;
}

.ad-2-animate {
  animation: ad-animate 300ms ease-in-out;
}

.ad-3-animate {
  animation: ad-animate 400ms ease-in-out;
}


.q-home {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(169deg, #FFFFFF 4%, #FFFFFF 4%, #D9EAFE 69%);
  padding: 58upx 30upx 113upx;
  box-sizing: border-box;

  .main-title {
    width: 496upx;
    height: 70upx;

    .title-img {
      width: 100%;
      height: 100%;
    }
  }


  .advantage {
    display: flex;
    align-items: center;
    width: 496upx;
    justify-content: space-between;
    margin: 24upx 0 48upx 0;

    .item {
      display: flex;
      align-items: center;
      color: #222229;
      font-size: 26upx;
    }
  }

  .current-server-shop {
    display: inline-flex;
    align-items: center;
    font-size: 24upx;
    color: #222229;
    padding: 12upx 16upx;
    background: rgba(188, 213, 244, 0.2);
    border-radius: 100upx;
    margin-bottom: 24upx;

    .icon {
      width: 24upx;
      height: 24upx;
      margin-left: 8upx;
    }
  }

  .main-area {
    position: relative;
    margin-top: 540upx;

    &.animate {
      animation: main-animate 1500ms linear;

      .img-1 {
        animation: main-animate 200ms ease-in;
      }

      .img-2 {
        animation: main-animate 600ms ease-in-out;
      }

      .img-3 {
        animation: main-animate 1200ms linear;
      }
    }

    .img-1 {
      position: absolute;
      width: 162upx;
      height: 391upx;
      top: -234upx;
      right: 332upx;
    }

    .img-2 {
      position: absolute;
      width: 147.98upx;
      height: 415.65upx;
      top: -324upx;
      right: 214upx;
    }

    .img-3 {
      width: 211.71upx;
      height: 678upx;
      position: absolute;
      top: -534upx;
      right: 4upx;
    }

    &::after {
      content: '';
      position: absolute;
      top: -60upx;
      left: 0;
      width: 368upx;
      height: 86upx;
      display: block;
      background: url('../../static/images/new-community/enterprise-orders/bar.png') no-repeat;
      background-size: cover;
      z-index: 9;
    }

    .inner {
      position: relative;
      width: 690upx;
      min-height: 390upx;
      padding: 48upx 24upx;
      box-sizing: border-box;
      border-radius: 28upx;
      box-shadow: 0px 4px 12px 0px rgba(73, 114, 254, 0.1), 0px 30px 29px 0px #BCD5F4, inset 0px 0px 30px 5px #FFFFFF;
      background: linear-gradient(180deg, #F5FCFE 7%, #E4EFFE 57%, #F4F8FB 114%);
      z-index: 10;
      transition: all 500ms;



      .menu-title {
        color: #222229;
        font-size: 36upx;
        font-weight: 500;
        margin-bottom: 45upx;
      }

      .menu-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 83upx;



        .menu-item {
          width: 204upx;
          height: 80upx;
          background: #fff;
          border-radius: 18upx;
          margin-bottom: 25upx;
          color: #222229;
          transition: all 350ms;
          font-size: 24upx;
          text-align: center;
          line-height: 80upx;
          box-sizing: border-box;
          transition: all 350ms;
          border: 1upx solid transparent;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 20upx;
          box-sizing: border-box;

          &.active {
            box-shadow: 0px 8upx 30upx -8upx #BCD5F4;
            border-color: #4972FE;
            color: #4972FE;
          }
        }
      }

      .order-btn {
        width: 642upx;
        height: 116upx;
        border-radius: 20upx;
        opacity: 1;
        background: linear-gradient(301deg, #4972FE 56%, #8CA6FF 132%);
        color: #fff;
        font-size: 36upx;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 350ms;
      }

      .tip {
        font-size: 24upx;
        color: #222229;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 24upx;


        .uni-btn {
          color: #EF530E;
          font-size: 24upx;
        }
      }
    }
  }
}
</style>