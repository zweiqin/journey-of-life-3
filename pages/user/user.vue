<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-05 16:21:06
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-25 09:12:32
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
        alt=""
      />
    </view>

    <!-- 用户信息 -->
    <view class="user-info">
      <view class="base">
        <img
          @click="toViewMineInfo"
          class="avatar"
          :src="
            userInfo.avatarUrl ===
            'https://avatar.csdnimg.cn/8/A/0/2_qiguliuxing.jpg'
              ? 'https://img2.baidu.com/it/u=3258659466,1029841077&fm=253&fmt=auto&app=138&f=PNG?w=120&h=120'
              : userInfo.avatarUrl
          "
          alt=""
        />
        <view class="right">
          <view class="name">{{ userInfo.nickName }}</view>
          <view class="vip-info">
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
        </view>
      </view>
      <view class="prices">
        <view class="item">
          <view class="title"> 会员 </view>
          <view class="value"> {{ userInfo.userLevelDesc }} </view>
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
          <view class="title"> 0<view class="bl-text">元</view> </view>
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
          <view class="item">
            <text class="title">收藏</text>
            <text class="value">10</text>
          </view>
          <view class="item">
            <text class="title">足迹</text>
            <text class="value">56</text>
          </view>
          <view class="item" @click="bindtapsubscription">
            <text class="title">订阅</text>
            <text class="value">123</text>
          </view>
        </view>
      </UserPanel>
      <UserPanel :currentTab="currentTab" :data="two" v-if="currentTab === 1">
        <view class="info">
          <view class="item">
            <text class="title">收藏</text>
            <text class="value">10</text>
          </view>
          <view class="item">
            <text class="title">足迹</text>
            <text class="value">56</text>
          </view>
          <view class="item" @click="bindtapsubscription">
            <text class="title">订阅</text>
            <text class="value">123</text>
          </view>
        </view>
      </UserPanel>
      <UserPanel :row="4" :showShadow="false" :data="serve"></UserPanel>

      <UserPanel :row="4" :showShadow="false" :data="digitalStore"></UserPanel>
      <UserPanel
        :row="4"
        :showShadow="false"
        :data="marketingTools"
      ></UserPanel>
      <UserPanel :row="4" :showShadow="false" :data="otherServe"></UserPanel>
    </view>
  </view>
</template>

<script>
import UserPanel from "./components/user-panel.vue";
import {
  tools,
  one,
  two,
  three,
  serve,
  digitalStore,
  marketingTools,
  otherServe,
} from "./config";
import { checkWhoami } from "../../utils";
import { user_INFO } from "../../constant";

export default {
  components: {
    UserPanel,
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
      userInfo: {},
    };
  },

  methods: {
    /**
     * @description 查看自己的信息
     */
    toViewMineInfo() {
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
  },
  mounted() {
    // checkWhoami();
    this.userInfo = uni.getStorageSync(user_INFO);
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
  padding-bottom: 80upx;
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
}
</style>