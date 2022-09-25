<template>
  <view class="value-added-services" v-if="info">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/store/chevron-states.png"
        alt=""
      />
      <view class="title">物流详情</view>
    </view>

    <view class="main">
      <img class="wuliu-img" :src="info.logo" alt="" />

      <view class="main-info">
        <view class="info">
          <view class="info-item">
            <img
              class="icon"
              src="../static/images/wuliu/user-blue.png"
              alt=""
            />
            <view class="text">联系人：</view>
            <view class="text">{{ info.contactsName }}</view>
          </view>

          <view class="info-item">
            <img
              class="icon"
              src="../static/images/wuliu/phone-blue.png"
              alt=""
            />
            <view class="text">电话：</view>
            <view class="text" style="color: #3662ec">{{
              info.contactsMobile
            }}</view>
          </view>

          <view class="info-item">
            <img
              class="icon"
              src="../static/images/wuliu/local-blue.png"
              alt=""
            />
            <view class="text">地址：</view>
            <view class="text" style="color: #3662ec">{{ info.address }}</view>
          </view>
        </view>

        <button class="view-btn" @click="viewWarehouse">
          落货点（点击查看）
        </button>

        <view class="lines">
          <view class="title">专线</view>
          <view class="line">
            <text class="city" v-for="item in endCities" :key="item">{{
              item
            }}</text>
          </view>
        </view>

        <view class="btns">
          <button
            class="follow-btn"
            :class="{ 'un-follow': info.isFollow }"
            @click="handleFollow"
          >
            {{ info.isFollow ? "取消关注" : "关注" }}
          </button>
          <button class="order-btn" @click="toOrder">下单</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserId } from "../utils";
import {
  getLogisticsInfoApi,
  followWuliuApi,
  unFollowWuliuApi,
} from "../api/logistics";
import { APPONIT_WULIU_QIYE_ID } from "../constant";

export default {
  data() {
    return {
      qiyeId: null,
      info: null,
      endCities: [],
    };
  },
  created() {
    this.getQiyeDetailInfo();
  },
  methods: {
    back() {
      uni.navigateBack();
    },

    // 下单
    toOrder() {
      uni.setStorageSync(APPONIT_WULIU_QIYE_ID, this.qiyeId);
      uni.navigateTo({
        url: "/logistics/mail",
      });
    },

    // 查看落货点
    viewWarehouse() {
      uni.navigateTo({
        url: "/logistics/warehouse?id=" + this.qiyeId,
      });
    },

    // 获取企业详情数据
    async getQiyeDetailInfo() {
      const res = await getLogisticsInfoApi({
        qiyeId: this.qiyeId,
        userId: getUserId(),
      });

      if (res.statusCode === 20000) {
        this.info = res.data;
        const endCityList =
          this.info.endCityList[0] && JSON.parse(this.info.endCityList[0]);
        if (endCityList && endCityList.length) {
          this.endCities = endCityList.map((item) => {
            return item[1] !== "市辖区" ? item[1] : item[0];
          });
        }
      } else {
        uni.showToast({
          title: res.statusMsg,
          duration: 2000,
          icon: "none",
        });
      }
    },

    // 是否关注
    async handleFollow() {
      const api = this.info.isFollow ? unFollowWuliuApi : followWuliuApi;
      const text = `${this.info.isFollow ? "取消" : "关注"}成功`;
      const res = await api({
        wuliuQiyeId: this.qiyeId,
        userId: getUserId(),
      });

      if (res.statusCode === 20000) {
        uni.showToast({
          title: text,
          duration: 2000,
        });

        this.getQiyeDetailInfo();
      } else {
        uni.showToast({
          title: res.statusMsg,
          duration: 2000,
          icon: "none",
        });
      }
    },
  },

  onLoad(options) {
    this.qiyeId = options.id;
  },
};
</script>

<style lang="less" scoped>
.value-added-services {
  .text {
    color: #3d3d3d;
    font-size: 24upx;
    flex-shrink: 0;
    max-width: 440upx;
  }

  padding: 66upx 0;
  .header {
    display: flex;
    align-items: center;
    padding: 0 24upx;

    .back {
      width: 48upx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      font-size: 32upx;
      font-weight: bold;
    }
  }

  .main {
    .wuliu-img {
      height: 420upx;
      width: 100%;
      margin-top: 40upx;
      object-fit: cover;
    }

    .main-info {
      padding: 0 22upx;

      .info {
        position: relative;
        width: 100%;
        background-color: #fff;
        box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.302);
        padding: 54upx 40upx;
        border-radius: 20upx;
        box-sizing: border-box;
        margin-top: -70upx;

        .info-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 32upx;

          &:last-child {
            margin: 0;
          }

          .icon {
            width: 36upx;
            margin-right: 20upx;
          }
        }
      }

      .view-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 72upx;
        margin: 26upx 0 60upx 0;
        border-radius: 20upx;
        background-color: #3662ec;
        color: #fff;
        font-size: 32upx;
      }

      .lines {
        .title {
          text-align: center;
          font-weight: bold;
          margin-bottom: 30upx;
        }

        .line {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
          font-size: 0;

          .city {
            box-sizing: border-box;
            padding: 0 8upx;
            text-align: center;
            flex-shrink: 0;
            flex-wrap: wrap;
            width: 160upx;
            height: 64upx;
            line-height: 64upx;
            border: 1upx solid #999999;
            color: #000000;
            font-size: 24upx;
            border-radius: 10upx;
            margin: 10upx 4upx 10upx 4upx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .btns {
        display: flex;
        justify-content: space-between;
        margin-top: 50upx;

        .follow-btn {
          width: 40%;
          height: 80upx;
          line-height: 80upx;
          background-color: #67c23a;
          padding: 0;
          color: #fff;
          border-radius: 50px;
          transition: all 350ms linear;

          &.un-follow {
            background-color: #409eff;
          }
        }

        .order-btn {
          flex: 1;
          margin: 0 20upx;
          height: 80upx;
          background-color: #3662ec;
          color: #fff;
          font-size: 36upx;
          line-height: 80upx;
          border-radius: 40upx;
        }
      }
    }
  }
}
</style>