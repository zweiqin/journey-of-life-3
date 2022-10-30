<template>
  <view class="furniture-maintenance">
    <view class="head">
      <view class="top">
        <view class="top-title">家具维修</view>
        <view class="service">
          <view class="service-wrapper">
            <view class="img-wrapper">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/4pmdg6q4k6o7pwmxnmn2.png"
                alt=""
                class="img"
              />
            </view>
            <view class="title">配送安装</view>
          </view>
          <view class="service-wrapper">
            <view class="img-wrapper">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9otnl59g5zmn8zj12h7b.png"
                alt=""
                class="img"
              />
            </view>
            <view class="title">清洁</view>
          </view>
          <view class="service-wrapper">
            <view class="img-wrapper">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/fec7oun9gjqe15set6sk.png"
                alt=""
                class="img"
              />
            </view>
            <view class="title">保养</view>
          </view>
          <view class="service-wrapper">
            <view class="img-wrapper">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/0q04hwwfpyys4e0mu055.png"
                alt=""
                class="img"
              />
            </view>
            <view class="title">翻新</view>
          </view>
          <view class="service-wrapper">
            <view class="img-wrapper">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/o6v5shqszy6w6nb1wput.png"
                alt=""
                class="img"
              />
            </view>
            <view class="title">贴膜</view>
          </view>
        </view>
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/1ig5ns7ve0r71dd9jgqs.png"
          alt=""
          class="middle"
        />
      </view>
      <img
        src="	https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/j53rp2zc53n5iz96444l.png"
        alt=""
        class="return"
        @click="handleBack"
      />
    </view>

    <view class="main">
      <view class="main-top">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/4mwxzfq6xfk9asjc33cq.png"
          alt=""
          class="location"
        />
        <view class="place">佛山</view>
        <view class="address">(请输入安装服务地址)</view>
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/g1tapwy3hfo2enzvsh9e.png"
          alt=""
          class="show"
        />
      </view>
      <view class="main-body">
        <view class="name">家具维修</view>
        <view class="type">
          <view class="service-type">
            <view class="left">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/71im83au5q99zv7dq9t2.png"
                alt=""
                class="picture"
              />
            </view>
            <view class="right">
              <view class="service-top">
                <view class="service-name">木制品维修</view>

                <view class="message">
                  <view class="detail">详情</view>
                  <img
                    src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/okx3511yuuh9fsdl290h.png"
                    alt=""
                    class="jump"
                    @click="handleToServiceDetail"
                  />
                </view>
              </view>
              <view class="service-middle">
                <view class="didian">佛山</view>
                <view class="zhixian"></view>
                <view class="user">已服务20564+用户</view>
              </view>
              <view class="describe"
                >服务描述：对木质家具、木门、木地
                板等产品的划伤、破损、开裂、断裂
                等问题进行修复，恢复其外观，延长 使用寿命。</view
              >
              <view class="order">
                <view class="abc"></view>
                <view class="order-title" @click="handleToServiceOrder"
                  >立即预约</view
                >
              </view>
            </view>
          </view>
          <view class="service-type">
            <view class="left">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/39bcwu0cs2kj7669iiq6.png"
                alt=""
                class="picture"
              />
            </view>
            <view class="right">
              <view class="service-top">
                <view class="service-name">皮制品维修</view>

                <view class="message">
                  <view class="detail">详情</view>
                  <img
                    src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/okx3511yuuh9fsdl290h.png"
                    alt=""
                    class="jump"
                    @click="handleToServiceDetail"
                  />
                </view>
              </view>
              <view class="service-middle">
                <view class="didian">佛山</view>
                <view class="zhixian"></view>
                <view class="user">已服务20564+用户</view>
              </view>
              <view class="describe"
                >服务描述：对皮革家具产品的划伤、
                破损、磨损等问题进行修复，恢复其 外观，延长使用寿命。</view
              >
              <view class="order">
                <view class="abc"></view>
                <view class="order-title" @click="handleToServiceOrder"
                  >立即预约</view
                >
              </view>
            </view>
          </view>
          <view class="service-type">
            <view class="left">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/jjiln4tl3apkdtjx52uw.png"
                alt=""
                class="picture"
              />
            </view>
            <view class="right">
              <view class="service-top">
                <view class="service-name">金属品维修</view>

                <view class="message">
                  <view class="detail">详情</view>
                  <img
                    src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/okx3511yuuh9fsdl290h.png"
                    alt=""
                    class="jump"
                    @click="handleToServiceDetail"
                  />
                </view>
              </view>
              <view class="service-middle">
                <view class="didian">佛山</view>
                <view class="zhixian"></view>
                <view class="user">已服务20564+用户</view>
              </view>
              <view class="describe"
                >服务描述：对家具金属配件、铜门、
                仿铜门、金属门窗、金属楼梯扶手等
                金属产品的划伤、磨损、凹陷变形等 问题进行修复...</view
              >
              <view class="order">
                <view class="abc"></view>
                <view class="order-title" @click="handleToServiceOrder"
                  >立即预约</view
                >
              </view>
            </view>
          </view>
          <view class="service-type">
            <view class="left">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/eu9ym6bg2mvu2hixo9ao.png"
                alt=""
                class="picture"
              />
            </view>
            <view class="right">
              <view class="service-top">
                <view class="service-name">瓷砖岩板维修</view>

                <view class="message">
                  <view class="detail">详情</view>
                  <img
                    src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/okx3511yuuh9fsdl290h.png"
                    alt=""
                    class="jump"
                    @click="handleToServiceDetail"
                  />
                </view>
              </view>
              <view class="service-middle">
                <view class="didian">佛山</view>
                <view class="zhixian"></view>
                <view class="user">已服务20564+用户</view>
              </view>
              <view class="describe"
                >服务描述：对对大理石、瓷砖、岩板、
                陶瓷产品的划伤、破损、开裂、无缝
                拼接等问题进行修复，恢复其外观， 延长使用寿命。</view
              >
              <view class="order">
                <view class="abc"></view>
                <view class="order-title" @click="handleToServiceOrder"
                  >立即预约</view
                >
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>





<script>
export default {
  name: "Furniture-maintenance",
  props: {},
  data() {
    return {};
  },
  methods: {
    handleToServiceDetail() {
      console.log(123);
      uni.navigateTo({ url: "../community-center/service-detail" });
    },
    handleBack() {
      uni.navigateBack();
    },
    handleToServiceOrder() {
      console.log(123);
      uni.navigateTo({ url: "../community-center/service-order" });
    },
  },

  created() {},
};
</script>






<style lang="less" scoped>
.furniture-maintenance {
  .head {
    position: absolute;
    background: linear-gradient(
      243deg,
      #8df3f3 -20%,
      rgba(126, 249, 249, 0) 78%
    );
    width: 100%;
    height: 420upx;
    .top {
      .top-title {
        margin-top: 60upx;
        text-align: center;
        font-size: 32upx;
        font-weight: bold;
        color: #3d3d3d;
      }
      .service {
        display: flex;
        justify-content: space-between;
        margin-top: 60upx;
        margin-left: 60upx;
        margin-right: 60upx;
        .service-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .img-wrapper {
            justify-content: center;

            // position: absolute;
            .img {
              width: 60upx;
              height: 60upx;
            }
          }
          .title {
            text-align: center;
            padding-top: 10upx;
            font-size: 24upx;
            line-height: 34upx;
            color: #3d3d3d;
          }
        }
      }
      .middle {
        position: absolute;
        left: -14upx;
        top: 126upx;
        width: 100%;
        height: 294upx;
      }
    }
    .return {
      position: absolute;
      top: 60upx;
      left: 18upx;
      width: 48upx;
      height: 48upx;
    }
  }
  .main {
    position: absolute;
    top: 300upx;
    width: 100%;
    height: 1494upx;
    border-radius: 40upx 40upx 0upx 0upx;
    background: rgba(255, 255, 255, 0.7);
    .main-top {
      display: flex;
      padding-top: 36upx;
      padding-left: 54upx;
      .location {
        width: 34upx;
        height: 40upx;
      }
      .place {
        padding-left: 10upx;
        font-size: 28upx;
        font-weight: 500;
        color: #3d3d3d;
      }
      .address {
        padding-top: 2upx;
        padding-left: 20upx;
        font-size: 24upx;
        color: #999999;
      }
      .show {
        padding-top: 16upx;
        padding-left: 20upx;
        width: 24upx;
        height: 12upx;
      }
    }
    .main-body {
      .name {
        padding-top: 62upx;
        padding-left: 50upx;
        font-size: 28upx;
        font-weight: 500;
        color: #3d3d3d;
      }
      .type {
        .service-type {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 34upx;
          margin-left: 30upx;
          margin-right: 30upx;
          margin-bottom: 60upx;

          .left {
            .picture {
              width: 240upx;
              height: 260upx;
            }
          }
          .right {
            line-height: 34upx;
            // padding-left: 34upx;
            .service-top {
              display: flex;
              justify-content: space-between;
              .service-name {
                font-size: 28upx;
              }
              .message {
                display: flex;
                .detail {
                  font-size: 24upx;
                  font-weight: 350;
                  color: #999999;
                }
                .jump {
                  width: 32upx;
                  height: 32upx;
                  padding-top: 0upx;
                  padding-left: 14upx;
                }
              }
            }
            .service-middle {
              display: flex;
              .didian {
                // padding-left: 34upx;
                font-size: 20upx;
                color: #999999;
              }
              .zhixian {
                margin-top: 14upx;
                margin-left: 12upx;
                margin-right: 18upx;
                width: 12upx;
                height: 2upx;
                transform: rotate(90deg);
                border: 2upx solid #d8d8d8;
              }
              .user {
                font-size: 20upx;
                color: #999999;
              }
            }
            .describe {
              width: 386upx;
              height: 136upx;
              font-size: 24upx;
              font-weight: 350;
            }
            .order {
              display: flex;
              justify-content: space-between;

              .order-title {
                padding-top: 8upx;
                margin-top: 4upx;
                font-size: 24upx;
                font-weight: 500;
                color: #ffffff;
                text-align: center;
                width: 164upx;
                height: 44upx;
                border-radius: 20upx;
                background: #fa5151;
              }
            }
          }
        }
      }
    }
  }
}
</style>
