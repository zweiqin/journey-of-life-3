<template>
  <view class="service-station">
    <view class="centre">
      <view class="top">
        <view class="left">
          <view class="title">团蜂家居社区服务站</view>
          <view class="eva">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/g58vmepof8496v2stqvc.png"
              alt=""
              class="img"
            />
            <view class="year">1年</view>
            <star rate="5" style="white-space: nowrap"></star>
            <view class="star">5.0星</view>
          </view>
          <view class="sign">
            <view class="text">及时服务</view>
            <view class="text">官方直营</view>
          </view>
          <view class="main">
            <view class="name">主营：</view>
            <view class="home">家居</view>
            <view class="repair">维修...</view>
          </view>
        </view>
        <view class="right">
          <view class="enter">进店</view>
          <view class="address">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/siqsm9fzuch90mdw5rep.png"
              alt=""
              class="location"
            />
            <view class="name">广东佛山</view>
          </view>
        </view>
      </view>
      <view class="mid">
        <view class="shop-list">
          <view class="item">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/lgu5io706xc02zrlkezh.png"
              alt=""
              class="shop"
            />
            <view class="sub">
              <view class="name">北欧科技布沙发</view>
              <view class="p">
                <view class="symbol">￥</view>
                <view class="money">3099</view>
              </view>
            </view>
          </view>
          <view class="item">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ydj4jwijg8bp3b33xabx.png"
              alt=""
              class="shop"
            />
            <view class="sub">
              <view class="name">北欧科技布沙发</view>
              <view class="p">
                <view class="symbol">￥</view>
                <view class="money">3099</view>
              </view>
            </view>
          </view>
          <view class="item">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/eil7f59u81kz3trubl7a.png"
              alt=""
              class="shop"
            />
            <view class="sub">
              <view class="name">北欧科技布沙发</view>
              <view class="p">
                <view class="symbol">￥</view>
                <view class="money">3099</view>
              </view>
            </view>
          </view>
          <!-- <view class="item">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/lgu5io706xc02zrlkezh.png"
              alt=""
              class="shop"
            />
            <view class="sub">
              <view class="name">北欧科技布沙发</view>
              <view class="p">
                <view class="symbol">￥</view>
                <view class="money">3099</view>
              </view>
            </view>
          </view> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import star from "../../../../components/rate";
export default {
  name: "community",
  props: {},
  components: { star },

  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
.service-station {
  // width: 100%;
  // height: 544upx;
  border-radius: 20upx;
  background: #ffffff;
  margin-bottom: 20upx;
  .centre {
    padding: 26upx 26upx 18upx 26upx;
    .top {
      display: flex;
      justify-content: space-between;
      .left {
        width: 60%;
        height: 192upx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 32upx;
          font-weight: 600;
          color: #3d3d3d;
          white-space: nowrap;
        }
        .eva {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .img {
            width: 28upx;
            height: 28upx;
          }
          .year {
            font-size: 28upx;
            color: #999999;
            white-space: nowrap;
          }
          .star {
            font-size: 28upx;
            color: #ff8f1f;
            white-space: nowrap;
          }
        }
        .sign {
          display: flex;
          // width: 60%;
          // justify-content: space-between;
          .text {
            // width: 112upx;
            // height: 36upx;
            border-radius: 4upx;
            border: 2upx solid #3662ec;
            box-sizing: border-box;
            font-size: 24upx;
            font-weight: 500;
            color: #3662ec;
            text-align: center;
            white-space: nowrap;
            margin-right: 28upx;
          }
        }
        .main {
          font-size: 28upx;
          color: #999999;
          display: flex;
          // justify-content: space-between;
          // width: 65%;
          white-space: nowrap;
          .name {
          }
          .home {
            border-right: 2upx solid #d8d8d8;
            width: 70upx;
            height: 36upx;
          }
          .repair {
            margin-left: 26upx;
          }
        }
      }
      .right {
        width: 30%;
        height: 192upx;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        .enter {
          width: 100upx;
          height: 42upx;
          border-radius: 10upx;
          background: #3662ec;
          font-size: 28upx;
          font-weight: 500;
          color: #ffffff;
          text-align: center;
        }
        .address {
          display: flex;
          align-items: center;
          .location {
            width: 28upx;
            height: 28upx;
          }
          .name {
            font-size: 28upx;
            color: #999999;
          }
        }
      }
    }
    .mid {
      padding-top: 12upx;
      // width: 100%;
      // height: 300upx;
      .shop-list {
        // width: 100%;
        display: flex;
        justify-content: space-between;
        .item {
          width: 200upx;
          // height: 300upx;
          .shop {
            width: 200upx;
            height: 200upx;
          }
          .sub {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            width: 200upx;
            height: 92upx;
            .name {
              font-size: 28upx;
              font-weight: 500;
              white-space: nowrap;
            }
            .p {
              display: flex;
              align-items: center;
              .symbol {
                font-size: 28upx;
                font-weight: 500;
                color: red;
              }
              .money {
                font-size: 36upx;
                font-weight: 500;
                color: red;
              }
            }
          }
        }
      }
    }
  }
}
</style>