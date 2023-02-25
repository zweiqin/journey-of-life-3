<template>
  <view class="user-container">
    <UserInfo @detail="toViewMineInfo" :data="userInfo"></UserInfo>
    <view class="main-area">
      <tui-grid :unlined="false" :border="false">
        <block v-for="(item, index) in topMenus" :key="index">
          <tui-grid-item :border="false" :cell="4" @click="handleToPage(item)">
            <view class="tui-grid-icon">
              <image :src="item.icon" mode="" />
            </view>
            <text class="tui-grid-label">{{ item.label }}</text>
          </tui-grid-item>
        </block>
      </tui-grid>

      <OrderList @click="handleToPage" class="section"></OrderList>

      <UserPane
        v-if="[6, 7, 1].includes(userLevel)"
        @click="handleToPage"
        isGrid
        class="section"
        :data="myEquity"
      >
        <view slot="count">
          <view class="slot-wrapper">
            ￥ <text id="user-count">0.00</text>
          </view>
        </view>
        <view slot="coupon">
          <view class="slot-wrapper"> <text id="user-coupon">0</text> 张 </view>
        </view>
      </UserPane>
      <!-- <UserPane
        v-if="[6, 7, 1].includes(userLevel)"
        @click="handleToPage"
        isGrid
        class="section"
        :data="vipEquity"
      >
      </UserPane> -->
      <UserPane
        @click="handleToPage"
        isGrid
        :row="2"
        class="section"
        :data="normalMenus"
      ></UserPane>

      <UserPane
        v-if="userLevel === 5"
        @click="handleToPage"
        isGrid
        class="section"
        :data="myEquity"
      >
        <view slot="count">
          <view class="slot-wrapper">
            ￥ <text id="user-count">0.00</text>
          </view>
        </view>

        <view slot="coupon">
          <view class="slot-wrapper"> <text id="user-coupon">0</text> 张 </view>
        </view>
      </UserPane>
    </view>
  </view>
</template>

<script>
import UserInfo from './components/user-info.vue'
import OrderList from './components/order-list.vue'
import UserPane from './components/user-pane.vue'
import { topMenus, vipEquity } from '../../data/user'
import {
  refrshUserInfoApi,
  getExtensionCodeApi,
  bindLastUserApi,
} from '../../api/user'
import { user_INFO, USER_ID } from '../../constant'
import { getMenus } from './config'

export default {
  components: {
    UserInfo,
    OrderList,
    UserPane,
  },

  data() {
    return {
      topMenus: Object.freeze(topMenus),
      normalMenus: {},
      myEquity: {},
      vipEquity: Object.freeze(vipEquity),
      collectiontype: 1,
      currentTab: 0,
      userInfo: {},
      extensionCodeUrl: '',
      userId: null,
      userLevel: 5,
    }
  },

  methods: {
    /**
     * @description 查看自己的信息
     */
    toViewMineInfo() {
      if (!this.userId) {
        return
      }
      uni.navigateTo({
        url: '/user/info/detail',
      })
    },
    

    choseCollection() {
      let collectiontype = this.collectiontype
      if (collectiontype == 1) {
        this.collectiontype = 2
      } else {
        this.collectiontype = 1
      }
    },

    changeTab(tab) {
      this.currentTab = tab
    },
    bindtapsubscription() {
      uni.navigateTo({
        url: '/user/subscription/subscription',
      })
    },

    handleClick(item) {
      console.log(item)
      if (item.type && item.type === 'extension') {
        this.getExtensionCode()
      }

      if (item.label === '进销存') {
        location.href = 'weixin://dl/business/?t=fT0Ivve8Fli'
      }
    },

    toJump(item) {
      this.value = item
      if (this.value == 1) {
        this.getExtensionCode()
      } else if (this.value == 2) {
        this.toViewMineInfo()
      } else {
        return
      }
    },

    getExtensionCode() {
      uni.showLoading({
        title: '加载中',
      })
      let url = 'https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/pages/login/login'
      if (this.userInfo.userLevel === 1) {
        url = `https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/pages/login/login?userId=${this.userId}&type=bind`
      }

      getExtensionCodeApi({
        url: url,
      }).then(({ data }) => {
        this.extensionCodeUrl = data
        uni.hideLoading()
      })
    },

    handleToViewHistory(page) {
      uni.navigateTo({
        url: '/user/sever/view-history?page=' + page,
      })
    },

    async handleBindId() {
      const bindId = uni.getStorageSync('BIND_ID')
      if (bindId && this.userId) {
        const res = await bindLastUserApi({
          salesmanId: bindId,
          userId: [this.userId],
        })

        if (res.errno !== 0) {
          uni.showToast({
            title: res.errmsg,
            icon: 'none',
          })

          uni.removeStorageSync('BIND_ID')
        }
      }
    },

    // 点击了按钮
    handleToPage(info) {
      if (info.role && !info.role.includes(this.userInfo.userLevel)) {
        uni.showModal({
          title: '提示',
          content: '升级会员即可查看，是否去升级？',
          success: function (res) {
            if (res.confirm) {
              uni.navigateTo({
                url: '/user/sever/userUp/index',
              })
            }
          },
        })

        return
      }

      if (!info.url) {
        this.empty()
        return
      }

      if (!this.userId) {
        uni.showModal({
          title: '提示',
          content: '您还未登录，登录后可访问',
          confirmText: '去登录',
          success: res => {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/login/login?to=/pages/user/user',
              })
            }
          },
        })

        return
      }

      this.go(info.url)
    },

    // 设置菜单
    setMenus() {
      const userInfo = uni.getStorageSync(user_INFO) || {}
      const userLevel = userInfo.userLevel || 5
      this.userLevel = userLevel
      const menus = getMenus(userLevel)
      this.myEquity = menus.myEquity
      this.normalMenus = menus.normalMenus
      this.$forceUpdate()
    },
  },

  onShow() {
    // checkWhoami();
    this.userId = uni.getStorageSync(USER_ID)
    const _this = this
    refrshUserInfoApi({
      userId: this.userId,
    }).then(({ data }) => {
      uni.setStorageSync(user_INFO, data)
      _this.userInfo = uni.getStorageSync(user_INFO)
      this.setMenus()
    })
  },

  onLoad() {
    this.handleBindId()
    this.userId = uni.getStorageSync(USER_ID)
  },
}
</script>

<style lang="less" scoped>
.user-container {
  width: 100%;
  min-height: 70vh;
  font-size: 28upx;
  padding-bottom: 50px;

  image {
    width: 48upx;
    height: 48upx;
  }

  .section {
    padding: 36upx 24upx;
    box-sizing: border-box;
    background-color: #fff;
    margin: 20upx 0;
    border-radius: 10upx;
  }

  .main-area {
    box-sizing: border-box;
    padding: 40upx 20upx 0;
    min-height: calc(100vh - 248upx - 60px);
    background: #fff;
    border-radius: 20upx 20upx 0 0;
    background: linear-gradient(180deg, #ffffff 0%, #fffaf9 3%, #f7f7f7 100%);
  }

  .slot-wrapper {
    text {
      font-size: 40upx;
      font-weight: 500;
    }
  }

  /deep/ .tui-grid-4 {
    padding: 0 !important;
  }

  /deep/ .tui-grid-bg {
    text-align: center;
    padding: 20upx 0;
  }

  /deep/ .tui-grid-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10upx;
  }
}
</style>
