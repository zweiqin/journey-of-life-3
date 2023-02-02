<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-05 16:21:06
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-27 17:21:13
 * @FilePath: \tuan-uniapp\pages\user\user.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="user-page">
    <view class="tools">
      <img
        class="tool-img"
        v-for="item in tools"
        :key="item.icon"
        :src="item.icon"
        :value="item.value"
        @click="toJump(item.value)"
      />
    </view>

    <!-- 用户信息 -->
    <view class="user-info">
      <view class="base">
        <img
          @click="toViewMineInfo"
          class="avatar"
          :src="
            userInfo
              ? userInfo.avatarUrl
              : 'https://img2.baidu.com/it/u=3258659466,1029841077&fm=253&fmt=auto&app=138&f=PNG?w=120&h=120'
          "
          alt=""
        />
        <view class="right">
          <view class="name">{{ userInfo.nickName }}</view>
          <view class="vip-info" v-if="userInfo">
            <text class="id">团蜂ID {{ userInfo.userId }}</text>
            <!-- <img
              class="hu-icon"
              src="../../static/images/user/huyuan.png"
              alt=""
            />
            <text style="background: #fff" class="id">{{
              userInfo.userLevelDesc
            }}</text> -->
          </view>
          <view class="no-data" v-else>
            您还未登录，<text class="text" @click="go('/pages/login/login')"
              >去登录~</text
            >
          </view>
        </view>
      </view>
      <view class="prices">
        <view class="item">
          <view class="title"> 会员 </view>
          <view class="value"> {{ userInfo.userLevelDesc || "游客" }} </view>
        </view>
        <view class="item">
          <view class="title"> 0<view class="bl-text">元</view> </view>
          <view class="value"> 余额 </view>
        </view>
        <!-- <view class="item">
          <view class="title">
            <view>0</view>
          </view>
          <view class="value"> 代金劵 </view>
        </view> -->
        <view class="item">
          <view class="title">
            {{ userInfo.commission || 0 }}<view class="bl-text">元</view>
          </view>
          <view class="value"> 收入佣金 </view>
        </view>
      </view>
    </view>

    <!-- 第一个 -->
    <view class="collection">
      <view class="collection-chose" @click="choseCollection">
        <view
          @click="changeTab(0)"
          :class="{ active: currentTab === 0 }"
          class="item"
          >商品订单</view
        >
        <view
          @click="changeTab(1)"
          :class="{ active: currentTab === 1 }"
          class="item"
          >社区订单</view
        >
      </view>
      <UserPanel :currentTab="currentTab" :data="one" v-if="currentTab === 0">
        <view class="info">
          <view class="item" @click="handleToViewHistory('collection')">
            <text class="title">收藏</text>
            <text class="value">{{ userInfo.collectCount || 0 }}</text>
          </view>
          <view class="item" @click="handleToViewHistory('history')">
            <text class="title">足迹</text>
            <text class="value"> {{ userInfo.footprintCount || 0 }} </text>
          </view>
          <view class="item" @click="handleToViewHistory('follow')">
            <text class="title">订阅</text>
            <text class="value"> {{ userInfo.rssCount || 0 }}</text>
          </view>
        </view>
      </UserPanel>
      <UserPanel :currentTab="currentTab" :data="two" v-if="currentTab === 1">
        <view class="info">
          <view class="item" @click="handleToViewHistory('collection')">
            <text class="title">收藏</text>
            <text class="value">{{ userInfo.collectCount || 0 }}</text>
          </view>
          <view class="item" @click="handleToViewHistory('history')">
            <text class="title">足迹</text>
            <text class="value">{{ userInfo.footprintCount || 0 }}</text>
          </view>
          <view class="item" @click="handleToViewHistory('follow')">
            <text class="title">订阅</text>
            <text class="value">{{ userInfo.rssCount || 0 }}</text>
          </view>
        </view>
      </UserPanel>

      <UserPanel
        :row="4"
        @clickItem="handleClick"
        :showShadow="false"
        :data="serve"
      ></UserPanel>

      <UserPanel :row="4" :showShadow="false" :data="digitalStore"></UserPanel>
      <UserPanel
        :row="4"
        :showShadow="false"
        :data="marketingTools"
      ></UserPanel>
      <UserPanel
        :row="4"
        :showShadow="false"
        :data="communityServices"
      ></UserPanel>
      <UserPanel
        @clickItem="handleClick"
        :row="4"
        :showShadow="false"
        :data="otherServe"
      ></UserPanel>
    </view>

    <view
      @click="extensionCodeUrl = ''"
      class="code-mask"
      :style="{
        opacity: extensionCodeUrl && userInfo && userInfo.nickName ? '1' : '0',
        'z-index':
          extensionCodeUrl && userInfo && userInfo.nickName ? '1' : '-1',
      }"
    >
      <view
        class="code-wrapper"
        :style="{
          transform: extensionCodeUrl ? 'scale(1)' : 'scale(0)',
        }"
      >
        <view class="big-wrapper">
          <image src="/static/images/user/center-logo.png" class="big-icon" />
        </view>

        <view class="images">
          <view class="zhiwen">
            <image src="/static/images/user/zhi.png" alt="" />
            <text>长按扫码</text>
          </view>
          <image class="code" :src="extensionCodeUrl" alt="" />
        </view>

        <button class="uni-btn" @click="extensionCodeUrl = ''">取消</button>
      </view>
    </view>
  </view>
</template>

<script>
import UserPanel from "./components/user-panel.vue";
import UserPanel1 from "./components/user-panel1.vue";
import {
  refrshUserInfoApi,
  getExtensionCodeApi,
  bindLastUserApi,
} from "../../api/user";

import {
  tools,
  one,
  two,
  three,
  serve,
  digitalStore,
  marketingTools,
  otherServe,
  communityServices,
} from "./config";
import { checkWhoami, getUserId } from "../../utils";
import { user_INFO } from "../../constant";

export default {
  components: {
    UserPanel,
    UserPanel1,
  },
  data() {
    return {
      tools,
      one,
      two,
      three,
      serve,
      digitalStore,
      marketingTools,
      otherServe,
      collectiontype: 1,
      currentTab: 0,
      communityServices,
      userInfo: {},
      extensionCodeUrl: "",
    };
  },

  methods: {
    /**
     * @description 查看自己的信息
     */
    toViewMineInfo() {
      if (!getUserId()) {
        return;
      }
      uni.navigateTo({
        url: "/user/info/detail",
      });
    },

    
    choseCollection() {
      let collectiontype = this.collectiontype;
      if (collectiontype == 1) {
        this.collectiontype = 2;
      } else {
        this.collectiontype = 1;
      }
    },

    changeTab(tab) {
      console.log(this.currentTab);
      this.currentTab = tab;
      console.log(this.currentTab);
    },
    bindtapsubscription() {
      uni.navigateTo({
        url: "/user/subscription/subscription",
      });
    },

    handleClick(item) {
      console.log(item);
      if (item.type && item.type === "extension") {
        this.getExtensionCode();
      }

      if (item.label === "进销存") {
        location.href = "weixin://dl/business/?t=fT0Ivve8Fli";
      }
    },

    toJump(item) {
      console.log(item);
      this.value = item;
      if (this.value == 1) {
        this.getExtensionCode();
      } else if (this.value == 2) {
        this.toViewMineInfo();
      }else{
        return;
      }
    },

    getExtensionCode() {
      uni.showLoading({
        title: "加载中",
      });
      let url = "https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/pages/login/login";
      if (this.userInfo.userLevel === 1) {
        url = `https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/pages/login/login?userId=${getUserId()}&type=bind`;
      }

      getExtensionCodeApi({
        url: url,
      }).then(({ data }) => {
        this.extensionCodeUrl = data;
        uni.hideLoading();
      });
    },

    handleToViewHistory(page) {
      uni.navigateTo({
        url: "/user/sever/view-history?page=" + page,
      });
    },

    async handleBindId() {
      const bindId = uni.getStorageSync("BIND_ID");
      if (bindId && getUserId()) {
        const res = await bindLastUserApi({
          salesmanId: bindId,
          userId: [getUserId()],
        });

        if (res.errno !== 0) {
          uni.showToast({
            title: res.errmsg,
            icon: "none",
          });

          uni.removeStorageSync("BIND_ID");
        }
      }
    },
  },
  onShow() {
    // checkWhoami();
    const _this = this;
    refrshUserInfoApi({
      userId: getUserId(),
    }).then(({ data }) => {
      uni.setStorageSync(user_INFO, data);
      _this.userInfo = uni.getStorageSync(user_INFO);
      console.log(_this.userInfo);
    });
  },

  onLoad() {
    this.handleBindId();
  },
};
</script>

<style lang="less" scoped>
.item {
  font-size: 24upx;
  padding: 0 24upx;

  &.active {
    font-weight: bold;
    color: #3d3d3d;
  }
}
.collection-chose {
  display: flex;
}
.user-page {
  padding: 20upx;
  padding-bottom: 140upx;
  background-color: #fdfdfd;

  .tools {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 14upx;

    .tool-img {
      width: 32upx;
      margin-left: 52upx;
    }
  }

  .user-info {
    padding: 20upx 20upx 0 20upx;
    margin-top: 8upx;
    .base {
      display: flex;
      .avatar {
        width: 108upx;
        height: 108upx;
        border-radius: 50%;
        margin-right: 40upx;
      }
      .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        .name {
          color: #3d3d3d;
          font-size: 28upx;
          margin-bottom: 20upx;
          font-weight: bold;
        }
        .vip-info {
          display: flex;
          align-items: center;
          .id {
            color: #3d3d3d;
            font-size: 20upx;
            font-weight: 100;
            padding: 4upx 34upx;
            background-color: #efefef;
            border-radius: 40px;
          }
          .hu-icon {
            width: 34upx;
            margin-left: 18upx;
          }
        }
      }
    }

    .prices {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 52upx 0 30upx 0;

      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .title {
          display: flex;
          align-items: flex-end;
          color: #3d3d3d;
          font-size: 28upx;
          font-weight: bold;
          margin-bottom: 16upx;

          .bl-text {
            font-weight: normal;
            font-size: 20upx;
            transform: scale(0.8);
          }
        }

        .value {
          color: #999999;
          font-size: 24upx;
          letter-spacing: 2px;
        }
      }
    }
  }

  .info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1upx solid #d8d8d8;
    padding: 24upx 0;

    .item {
      padding: 0 54upx;
      border-right: 1upx solid #d8d8d8;

      &:last-child {
        border: none;
      }

      .title,
      .value {
        font-size: 24upx;
        font-weight: normal;
      }

      .title {
        color: #999999;
        margin-right: 12upx;
      }

      .value {
        color: #3d3d3d;
        font-weight: bold;
      }
    }
  }

  .no-data {
    font-size: 28upx;
    line-height: 3;

    .text {
      color: #48b6eb;
    }
  }
}

// 推广码
.code-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 350ms;
  opacity: 0;

  .uni-btn {
    line-height: 1;
    margin: 0;
    border: none;
    padding: 0;
    background: transparent;
    padding-top: 20upx;
    border-top: 1upx solid #ccc;
    font-size: 32upx;
    letter-spacing: 1em;
    color: #ccc;

    &::after {
      border: none;
    }
  }

  // .code-wrapper {
  //   width: 600upx;
  //   padding: 30upx;
  //   box-sizing: border-box;
  //   background-color: #fff;
  //   border-radius: 20upx;
  //   transform: scale(0);
  //   transition: all 350ms;

  //   .code-title {
  //     text-align: center;
  //     font-size: 36upx;
  //     font-weight: bold;
  //     margin-top: 20upx;
  //   }

  //   .code {
  //     width: 540upx;
  //     height: 540upx;
  //     object-fit: cover;
  //   }

  //   .uni-btn {
  //     line-height: 1;
  //     margin: 0;
  //     border: none;
  //     padding: 0;
  //     background: transparent;
  //     padding-top: 20upx;
  //     border-top: 1upx solid #ccc;
  //     font-size: 32upx;
  //     letter-spacing: 1em;
  //     color: #ccc;

  //     &::after {
  //       border: none;
  //     }
  //   }
  // }

  .code-wrapper {
    width: 600upx;
    padding: 30upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20upx;
    transform: scale(0);
    transition: all 350ms;

    .images {
      display: flex;
      margin: 30upx 0;
      justify-content: space-around;

      .zhiwen {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #999999;

        image {
          width: 120upx;
          height: 120upx;
          margin-bottom: 10upx;
        }
      }

      image {
        width: 200upx;
        height: 200upx;
        object-fit: cover;
      }
    }

    .header {
      display: flex;
      justify-content: center;
      align-items: center;

      .header-icon {
        width: 60upx;
        height: 60upx;
        margin-right: 10px;
      }
    }

    .big-wrapper {
      width: 100%;
      margin-top: 70upx;
      justify-content: center;
      display: flex;
      .big-icon {
        width: 400upx;
        height: 400upx;
        object-fit: cover;
      }
    }

    .code-title {
      text-align: center;
      font-size: 36upx;
      font-weight: bold;
      margin-top: 20upx;
    }

    .code {
      width: 540upx;
      height: 540upx;
      object-fit: cover;
      border-radius: 54upx;
    }
  }
}
</style>
