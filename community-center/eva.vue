<template>
  <view class="eva">
    <view class="title-list">
      <img
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
        alt=""
        class="return"
        @click="handleToOrderList"
      />
      <view class="title">评价</view>
    </view>
    <view class="navbar">
      <view
        class="item"
        @click="change(item.value)"
        v-for="item in navList"
        :key="item.label"
        :style="{
          color: currenTab === item.value ? '#FF8F1F' : '',
        }"
      >
        {{ item.label }}
      </view>
    </view>
    <view class="sub">
      <view class="first">
        <view class="left">
          <view class="head-list">
            <image
              src="../static/images/con-center/head.png"
              mode="scaleToFill"
              class="headImg"
            />
            <text>123</text>
          </view>
          <star :rate="abc" @change="bright" style="white-space: nowrap"></star>
        </view>
        <view class="right">
          <view class="time">2022-12-1</view>
        </view>
      </view>
      <view class="second">{{this.evaluate}}</view>

      <view class="third">
        <view v-for="img in images" :key="img">
          <img :src="img" alt="" class="img" />
        </view>
      </view>
      <view class="info-list">
        <view class="info">服务信息:</view>
        <view class="name">{{this.dictName}}</view>
      </view>
      <view class="reply">
        <view class="content">
          <view class="l">[店家回复]</view>
          <view class="r">感谢您的认可，好开心您能满意， 祝您生活愉快!!</view>
          
        </view>
      </view>
    </view>
  </view>
</template>







<script>
import { navList } from "./config";
import star from "../components/rate";
export default {
  name: "Eva",
  props: {},
  components: { star },
  data() {
    return {
      navList,
      currenTab: 1,
      abc: "",
      evaluate:"",
    };
  },
  methods: {
    handleToOrderList() {
      uni.navigateTo({ url: `../community-center/order` });
    },
    change(index) {
      this.currenTab = index;
    },
  },
  created() {},
  onLoad(options) {
    console.log(options);
    this.abc = options.star * 1;
    console.log("abc", this.abc);

    this.images = JSON.parse(decodeURIComponent(options.images));
    console.log("images", this.images);
    this.evaluate = options.evaluate;
    this.dictName = options.dictName;
  },
};
</script>

<style lang="scss" scoped>
.eva {
  width: 100%;
  border-bottom: 12upx solid #EFEFEF;
  .title-list {
    padding: 40upx 34upx 20upx 26upx;
    display: flex;

    .return {
      width: 48upx;
      height: 48upx;
    }
    .title {
      flex: 1;
      text-align: center;
      font-size: 36upx;
      font-weight: bold;
      color: #3d3d3d;
    }
  }
  .navbar {
    display: flex;
    align-items: center;
    // overflow: scroll;
    height: 88upx;
    line-height: 88upx;
    background-color: #fff;

    &::-webkit-scrollbar {
      width: 0 !important;
    }

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 180upx;
      color: #3d3d3d;
      font-size: 28upx;
    }
  }
  .sub {
    padding: 28upx 22upx 50upx 38upx;
    .first {
      padding-left: 6upx;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .left {
        .head-list {
          padding-bottom: 14upx;
          display: flex;
          align-items: center;
          font-size: 28upx;
          font-weight: 500;
          color: #3d3d3d;
          .headImg {
            width: 60upx;
            height: 60upx;
            padding-right: 14upx;
          }
        }
        .star {
        }
      }
      .right {
        .time {
          font-size: 24upx;
          font-weight: 350;
          color: #999999;
        }
      }
    }
    .second {
      padding-left: 6upx;
      padding-top: 14upx;
      font-size: 28upx;
      font-weight: 350;
      color: #3d3d3d;
    }
    .third {
      display: flex;
      flex-wrap: wrap;
      .img {
        width: 150upx;
        height: 150upx;
        padding-right: 22upx;
      }
    }
    .info-list {
      padding-left: 6upx;
      padding-top: 6upx;
      display: flex;
      font-size: 24upx;
      font-weight: 350;
      color: #999999;
      .info {
        padding-right: 16upx;
      }
      .name {
      }
    }
    .reply {
      padding-left: 6upx;
      padding-top: 16upx;
      .content {
        border-radius: 10upx;
        background: #efefef;
        display: flex;
        padding: 14upx;

        .l {
          white-space: nowrap;
          font-size: 24upx;
          font-weight: 500;
          color: #3d3d3d;
          padding-right: 20upx;
        }
        .r {
          padding: 0upx 100upx 20upx 0upx;
          font-size: 24upx;
          font-weight: 350;
          color: #3d3d3d;
        }
      }
    }
  }
}
</style>
