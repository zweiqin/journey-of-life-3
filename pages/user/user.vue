<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-05 16:21:06
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-07 10:41:05
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
          src="https://img1.baidu.com/it/u=2321295900,2090443872&fm=253&fmt=auto&app=138&f=JPEG?w=724&h=500"
          alt=""
        />
        <view class="right">
          <view class="name">徐达那</view>
          <view class="vip-info">
            <text class="id">团蜂ID 13800138000</text>
            <img
              class="hu-icon"
              src="../../static/images/user/huyuan.png"
              alt=""
            />
          </view>
        </view>
      </view>
      <view class="prices">
        <view class="item">
          <view class="title"> 会员 </view>
          <view class="value"> 用户类型 </view>
        </view>
        <view class="item">
          <view class="title"> 1000<view class="bl-text">元</view> </view>
          <view class="value"> 余额 </view>
        </view>
        <view class="item">
          <view class="title">
            <view>10</view>
          </view>
          <view class="value"> 代金劵 </view>
        </view>
        <view class="item">
          <view class="title"> 1099<view class="bl-text">元</view> </view>
          <view class="value"> 收入佣金 </view>
        </view>
      </view>
    </view>

    <!-- 第一个 -->
    <view class="collection">
      <UserPanel :data="one">
        <view class="info">
          <view class="item">
            <text class="title">收藏</text>
            <text class="value">10</text>
          </view>
          <view class="item">
            <text class="title">足迹</text>
            <text class="value">56</text>
          </view>
          <view class="item">
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
  serve,
  digitalStore,
  marketingTools,
  otherServe,
} from "./config";
export default {
  components: {
    UserPanel,
  },
  data() {
    return {
      tools,
      one,
      serve,
      digitalStore,
      marketingTools,
      otherServe,
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
  },
};
</script>

<style lang="less" scoped>
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