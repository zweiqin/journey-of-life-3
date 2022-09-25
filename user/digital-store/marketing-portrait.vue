<template>
  <view class="marketing-portrait-container" v-if="info">
    <view class="header">
      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1676ilbo4t26udpy067z.png"
        class="back"
        alt=""
        @click="back"
      />

      <h2>营销画像</h2>
    </view>

    <!-- 数据预览-->
    <view class="data-portrait-content item">
      <view class="title"> 数据预览 </view>
      <view class="body">
        <view class="item">
          <img
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/c8zi8jghhi26dhee70ds.png"
            alt=""
          />
          <view class="sub-title">导入数</view>
          <view class="value">{{ info.importCount || 0 }}</view>
        </view>

        <view class="item">
          <img
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/vckqdfi5hm8kak5vwf4z.png"
            alt=""
          />
          <view class="sub-title">访问数</view>
          <view class="value">{{ info.visitCount || 0 }}</view>
        </view>

        <view class="item">
          <img
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/aklzbzv1jpw60dhctw2k.png"
            alt=""
          />
          <view class="sub-title">新增数</view>
          <view class="value">{{ info.insertCount || 0 }}</view>
        </view>

        <view class="item">
          <img
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/n3lcw07jdsk5cmn2wovo.png"
            alt=""
          />
          <view class="sub-title">消费数</view>
          <view class="value">{{ info.consumeCount || 0 }}</view>
        </view>
      </view>
    </view>

    <!-- 用户画像分析 -->
    <view class="user-portrait-analysis item">
      <view class="title"> 用户画像分析 </view>
      <view class="body">
        <view class="item">
          <img
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/do2noi0ljm3kl3u93a1z.png"
            alt=""
          />
          <view class="sub-title">{{
            fomartNumber(info.manCount * 100) + "%" || "0%"
          }}</view>
          <view class="value">男性</view>
        </view>

        <view class="item">
          <img
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/m38xyx13s4mv5sxrethp.png"
            alt=""
          />
          <view class="sub-title">{{
            fomartNumber(info.womanCount * 100) + "%" || "0%"
          }}</view>
          <view class="value">女性</view>
        </view>

        <view class="item">
          <img
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/tl5f6cdio4uj4nthg24i.png"
            alt=""
          />
          <view class="sub-title">{{
            fomartNumber(info.unknownCount * 100) + "%" || "0%"
          }}</view>
          <view class="value">未知</view>
        </view>
      </view>
    </view>

    <!-- 用户画像分析 -->
    <view class="in-store-analysis item">
      <view class="title"> 每日进店分析 </view>
      <view class="body">
        <!-- <A></A> -->
        {{ info.dayNumber || 0 }}
      </view>
    </view>

    <!-- 用户分析 -->
    <view class="user-analysis item">
      <view class="title"> 用户分析 </view>
      <view class="body">
        <view class="item">
          <view class="wrapper">
            <text class="text">未消费</text>
            <text class="text">{{
              fomartNumber(info.statusCount.count1 || 0) * 100 + "%"
            }}</text>
          </view>
        </view>

        <view class="item">
          <view class="wrapper">
            <text class="text">一次性消费</text>
            <text class="text">{{
              fomartNumber(info.statusCount.count2 || 0) * 100 + "%"
            }}</text>
          </view>
        </view>

        <view class="item">
          <view class="wrapper">
            <text class="text">二次性消费</text>
            <text class="text">{{
              fomartNumber((info.statusCount.count3 || 0) * 100) + "%"
            }}</text>
          </view>
        </view>

        <view class="item">
          <view class="wrapper">
            <text class="text">三次及以上消费</text>
            <text class="text">{{
              fomartNumber((info.statusCount.count4 || 0) * 100) + "%"
            }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getMarketingPortraitDataApi } from "../../api/user";
import { fomartNumber } from "../../utils";

export default {
  mounted() {
    this.getData();
  },
  data() {
    return {
      info: null,
    };
  },
  methods: {
    back() {
      uni.navigateBack();
    },
    fomartNumber,

    async getData() {
      const res = await getMarketingPortraitDataApi();
      if (res.errno === 0) {
        this.info = res.data;
      } else {
        uni.showToast({
          title: "您还不是业务员",
          duration: 1500,
          icon: "none",
        });

        setTimeout(() => {
          uni.switchTab({
            url: "/pages/user/user",
          });
        }, 2000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
@import "../../style/var.less";

.marketing-portrait-container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #181461;
  box-sizing: border-box;
  padding: 40upx 34upx;

  .header {
    width: 100%;
    text-align: center;

    .back {
      float: left;
      width: 16upx;
      margin-top: 6upx;
    }

    h2 {
      font-size: 32upx;
      display: inline;
      font-weight: normal;
      color: @cw;
    }
  }

  .item {
    margin-top: 40upx;
    font-size: 24upx;

    .title {
      font-weight: 500;
      background: linear-gradient(180deg, #ffffff 0%, #3662ec 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .data-portrait-content {
    .body {
      .flex();
      flex-wrap: wrap;
      .item {
        font-size: @f14;
        .flex(center, center);
        flex-direction: column;
        width: 324upx;
        height: 372upx;

        &:nth-child(1) {
          background: linear-gradient(
            to bottom,
            rgba(43, 39, 113, 0.47) 65%,
            rgba(255, 195, 0, 0.5) 122%
          );
          box-shadow: inset 0px 0px 5px 0px #ffffff;
          border: 0px solid #00d4fe;
        }

        &:nth-child(2) {
          background: linear-gradient(
            to bottom,
            #2c2872 65%,
            rgba(54, 98, 235, 0.5) 122%
          );
          box-shadow: inset 0px 0px 5px 0px #ffffff;
        }

        &:nth-child(3) {
          background: linear-gradient(
            to bottom,
            #2c2872 65%,
            rgba(7, 184, 184, 0.5) 122%
          );
          box-shadow: inset 0px 0px 5px 0px #ffffff;
        }

        &:nth-child(4) {
          background: linear-gradient(
            to bottom,
            #2c2872 65%,
            rgba(137, 56, 244, 0.5) 122%
          );
          box-shadow: inset 0px 0px 5px 0px #ffffff;
        }

        border-radius: 24upx;
        color: @cw;

        .icon {
          height: 72upx;
        }

        .sub-title {
          margin: 30upx 0;
        }
      }
    }
  }

  .user-portrait-analysis {
    .item {
      width: 100%;
      height: 130upx;
      padding: 22upx 40upx 22upx 50upx;
      box-sizing: border-box;
      .flex();
      border-radius: 24upx;
      color: @cw;
      font-size: @f12;

      &:nth-child(1) {
        background: linear-gradient(
          89deg,
          rgba(43, 39, 113, 0.47) 65%,
          #3662ec 122%
        );
        box-shadow: inset 0px 0px 5px 0px #ffffff;
      }

      &:nth-child(2) {
        background: linear-gradient(
          89deg,
          rgba(43, 39, 113, 0.47) 65%,
          #eb2f96 122%
        );
        box-shadow: inset 0px 0px 5px 0px #ffffff;
      }

      &:nth-child(3) {
        background: linear-gradient(
          89deg,
          rgba(43, 39, 113, 0.47) 65%,
          #00b578 122%
        );
        box-shadow: inset 0px 0px 5px 0px #ffffff;
      }

      .sub-title {
        flex: 1;
        margin-left: 34upx;
      }

      .icon {
        .img(80upx);
      }
    }
  }

  .in-store-analysis {
    .body {
      margin-top: 40upx;
      height: 545upx;
      line-height: 545upx;
      text-align: center;
      font-size: 100upx;
      color: #fff;
      padding: 10px;
      box-sizing: border-box;
      background: linear-gradient(
        to bottom,
        rgba(43, 39, 113, 0.47) 65%,
        #07b9b9 122%
      );
      box-shadow: inset 0px 0px 5px 0px #ffffff;
      border-radius: 24upx;
    }
  }

  .user-analysis {
    .body {
      .flex();
      flex-wrap: wrap;
    }

    .item {
      // position: relative;
      width: 320upx;
      height: 320upx;
      text-align: center;
      line-height: 320upx;
      font-size: @f14;
      border-radius: 50%;
      color: @cw;
      box-shadow: inset 0px 0px 5px 0px #ffffff;

      .wrapper {
        // position: absolute;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        height: 100%;

        .text {
          height: 20px;
        }
      }

      &:nth-child(1) {
        background: linear-gradient(
          to bottom,
          rgba(43, 39, 113, 0.47) 65%,
          #ffc300 122%
        );
      }

      &:nth-child(2) {
        background: linear-gradient(to bottom, #2c2872 65%, #ff8f1f 122%);
      }

      &:nth-child(3) {
        background: linear-gradient(to bottom, #2c2872 65%, #eb2f96 122%);
      }

      &:nth-child(4) {
        background: linear-gradient(to bottom, #2c2872 65%, #fa5151 122%);
      }
    }
  }
}
</style>