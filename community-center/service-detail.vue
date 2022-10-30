<template>
  <view class="service-detail">
    <view class="head">
      <view class="title">木制品维修</view>
      <img
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/j53rp2zc53n5iz96444l.png"
        alt=""
        class="return"
        @click="handleBack"
      />
      <view class="background1">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/q1urnpmm4j90txujhl7j.png"
          alt=""
          class="z1"
        />
        <view class="w">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/tmvm8es1ahbqwz1hvekq.png"
            alt=""
            class="goods"
          />
        </view>
        <view class="z">
          <view class="abc"></view>
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/smlhnccctqt4uo4cl4u1.png"
            alt=""
            class="z2"
          />
        </view>
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/t5h6hmw4j7835u9qtfb0.png"
          alt=""
          class="z3"
        />
      </view>
    </view>
    <view class="body">
      <view class="main">
        <view class="top-text">
          <view class="sign">团蜂家居社区</view>
          <view class="top-name">木制品维修</view>
          <img
            src="	https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/769ilrfh3wg5fqmqa0t6.png"
            alt=""
            class="share"
          />
        </view>
        <view class="order-list">
          <view class="order">
            <view class="deal">已成单</view>
            <view class="quantity">1000+</view>
          </view>
          <view class="evaluate">
            <view class="assess">好评率</view>
            <view class="rate">99.9%</view>
          </view>
        </view>
        <view class="service">服务描述</view>
        <view class="describe">
          <view class="content"
            >对木质家具、木门、木地板等产品的划伤、破损、开裂、断裂等问题进行修复，恢复其外观，延长使用寿命。</view
          >
        </view>
        <view class="demand">服务需求</view>
        <view class="demand-background">
          <view class="demand-list">
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/7oqi4948d78n53parh2t.png"
                alt=""
                class="img"
              />
              <view class="name">配送安装</view>
            </view>
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/r3m35pwbfq5b4f492bpn.png"
                alt=""
                class="img"
              />
              <view class="name">清洁</view>
            </view>
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/fxcs3rpkri3a0rhxxc2o.png"
                alt=""
                class="img"
              />
              <view class="name">保养</view>
            </view>
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/u4iu4vzdon5iv7vti8ip.png"
                alt=""
                class="img"
              />
              <view class="name">翻新</view>
            </view>
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/i6ccw7k4to6uxkttzs5j.png"
                alt=""
                class="img"
              />
              <view class="name">贴膜</view>
            </view>
          </view>
        </view>
        <view class="offer-list">
          <view class="offer">报价形式</view>
          <view class="price-list">
            <view class="artificial">人工报价</view>
            <view class="price">一口价</view>
          </view>
        </view>
      </view>
      <view class="middle">
        <view class="type">
          <view class="type-name">产品详情</view>
          <view class="type-name">服务详情</view>
          <view class="type-name">费用说明</view>
        </view>
        <view class="ad">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/wz38vgsra32kkbm40d7o.png"
            alt=""
            class="pi1"
          />
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/a0gkc2xf4s27wqp7ee4u.png"
            alt=""
            class="pi2"
          />
        </view>
        <view class="whiteboard">
          <view class="version">
            <view class="service-name">服务名称：木制品维修</view>
            <view class="service-describe"
              >服务描述：对木质家具、木门、木地板等产品的划伤、
              破损、开裂、断裂等问题进行修复，恢复其外观，延 长使用寿命。</view
            >
          </view>
        </view>
        <view class="whiteboard1">
          <view class="service-demand">服务需求</view>
          <view class="demand-list">
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/7oqi4948d78n53parh2t.png"
                alt=""
                class="img"
              />
              <view class="name">配送安装</view>
            </view>
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/r3m35pwbfq5b4f492bpn.png"
                alt=""
                class="img"
              />
              <view class="name">清洁</view>
            </view>
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/fxcs3rpkri3a0rhxxc2o.png"
                alt=""
                class="img"
              />
              <view class="name">保养</view>
            </view>
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/u4iu4vzdon5iv7vti8ip.png"
                alt=""
                class="img"
              />
              <view class="name">翻新</view>
            </view>
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/i6ccw7k4to6uxkttzs5j.png"
                alt=""
                class="img"
              />
              <view class="name">贴膜</view>
            </view>
          </view>
        </view>
        <view class="whiteboard2">
          <view class="top">
            <view class="a"></view>
            <view class="contrast">修复前后对比</view>
            <view class="b"></view>
            <!-- <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/px6qptkeuo1o7xt9n2ar.png"
            alt=""
            class="top-title"
          /> -->
          </view>
          <view class="picture">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/8gpzw1ycjjsybon1tvy7.png"
              alt=""
              class="img1"
            />
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/tw24b0keooavj4tu4ydy.png"
              alt=""
              class="img2"
            />
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/a8cme7s0a6xu7vf22bze.png"
              alt=""
              class="img3"
            />
          </view>
        </view>
        <view class="explain">服务说明</view>
        <view class="whiteboard3">
          <view class="content"
            >1.专业的维修师傅上门服务，维修效果有保障。
            2.服务时间：2个小时起，根据问题的严重程度不同和维修
            数量多与少，服务时间会有区别。
            3.人员数量：1-3人，根据实际情况，合理安排上门维修人员，
            提高工作效率，节省客户等待时间。
            4.使用材料：环保底漆、面漆、色漆、砂纸、填充材料、 保护材料等。
            5.使用工具：气泵、喷枪、画纹笔、铲刀、电吹风等
            售后保障：维修结束后一年内，维修处出现质量问题，
            联系客服，免费返修。人为因素除外。</view
          >
        </view>
        <view class="explain">费用说明</view>
        <view class="whiteboard4">
          <view class="form">报价形式</view>
          <view class="price-type">
            <view class="artificial">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/g9kgd9asng3gofe6zfni.png"
                alt=""
                class="img"
              />
              <view class="title">人工报价</view>
            </view>
            <view class="price">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/3x49pr3l1i61rkohpzuo.png"
                alt=""
                class="img"
              />
              <view class="title">一口价</view>
            </view>
          </view>
        </view>
        <view class="whiteboard5">
          <view class="list">
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/liszblyxc9iihil2m7n3.png"
                alt=""
                class="img"
              />
              <view class="name">客服</view>
            </view>

            <view class="ask">在线咨询</view>
            <view class="order" @click="handleToServiceOrder">立即下单</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>





<script>
export default {
  name: "Service-detail",
  props: {},
  data() {
    return {};
  },
  methods: {
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
.service-detail {
  width: 100%;
  .head {
    .title {
      font-size: 32upx;
      font-weight: 500;
      color: #3d3d3d;
      margin-top: 60upx;
      text-align: center;
    }
    .return {
      position: absolute;
      top: 0upx;
      left: 18upx;
      width: 48upx;
      height: 48upx;
    }
    .background1 {
      padding-top: 12upx;
      width: 100%;
      height: 722upx;
      position: absolute;
      box-sizing: border-box;

      .z1 {
        width: 750upx;
        height: 722upx;
        position: absolute;
      }
      .w {
        position: absolute;
        // top: 12upx;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 12upx 12upx;
        .goods {
          width: 100%;
          height: 620upx;
        }
      }
      .z {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 54upx;
        box-sizing: border-box;
        position: absolute;

        .z2 {
          box-sizing: border-box;
          width: 322upx;
          height: 54upx;
          // width: 100%;
        }
      }
      .z3 {
        position: absolute;
        width: 202upx;
        height: 202upx;
        left: -30upx;
        top: 572upx;
      }
    }
  }
  .body {
    position: absolute;
    background: #ffffff;
    top: 764upx;
    .main {
      margin-left: 30upx;
      margin-right: 30upx;
      .top-text {
        display: flex;
        justify-content: space-between;
        .sign {
          padding-top: 4upx;
          margin-top: 40upx;
          // margin-left: 26upx;
          width: 160upx;
          height: 38upx;
          border-radius: 10upx;
          font-size: 20upx;
          font-weight: 500;
          text-align: center;
          color: #ffffff;
          background: #ff8f1f;
        }

        .top-name {
          margin-top: 38upx;
          margin-left: 0upx;
          font-size: 32upx;
          font-weight: 500;
          color: #3d3d3d;
        }
        .share {
          width: 40upx;
          height: 64upx;
          margin-top: 36upx;
          margin-left: 270upx;
        }
      }
      .order-list {
        display: flex;
        justify-content: space-between;
        .order {
          // margin-left: 30upx;
          display: flex;
          .deal {
            margin-top: 4upx;
            font-size: 24upx;
            font-weight: 500;
          }
          .quantity {
            margin-left: 4upx;
            font-size: 30upx;
            color: red;
          }
        }

        .evaluate {
          // margin-left: 40upx;
          display: flex;
          margin-right: 330upx;
          .assess {
            margin-top: 4upx;
            font-size: 24upx;
            font-weight: 500;
          }
          .rate {
            margin-left: 6upx;
            font-size: 30upx;
            color: red;
          }
        }
      }
      .service {
        margin-top: 20upx;
        font-size: 24upx;
        font-weight: 500;
        color: #3d3d3d;
      }
      .describe {
        margin-top: 16upx;
        margin-bottom: 16upx;
        // width: 692upx;
        height: 140upx;
        border-radius: 10upx;
        background: #faf9fc;

        .content {
          padding-top: 22upx;
          // width: 650upx;
          height: 68upx;
          font-size: 24upx;
          font-weight: 350;
          color: #3d3d3d;
        }
      }
      .demand {
        font-size: 24upx;
        font-weight: 500;
        color: #3d3d3d;
      }

      .demand-background {
        margin-top: 24upx;
        margin-bottom: 24upx;
        // width: 692upx;
        height: 140upx;
        border-radius: 10upx;
        background: #faf9fc;
        .demand-list {
          padding-top: 24upx;
          display: flex;
          justify-content: space-around;

          .item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .img {
              width: 48upx;
              height: 48upx;
              padding-bottom: 12upx;
            }
            .name {
              font-size: 24upx;
              font-weight: 350;
              color: #3d3d3d;
            }
          }
        }
      }
      .offer-list {
        display: flex;
        justify-content: space-between;
        .offer {
          font-size: 24upx;
          font-weight: 500;
          color: #3d3d3d;
        }
        .price-list {
          width: 35%;
          display: flex;
          justify-content: space-between;
          margin-right: 270upx;
          .artificial {
            font-size: 24upx;
            color: #fa5151;
          }
          .price {
            padding-left: 64upx;
            font-size: 24upx;
            color: #fa5151;
          }
        }
      }
    }
    .middle {
      background: #faf9fc;
      .type {
        padding-top: 20upx;
        display: flex;
        justify-content: space-around;
        .type-name {
          font-size: 24upx;
          color: rgba(0, 0, 0, 0.85);
        }
      }
      .ad {
        margin-top: 26upx;
        margin-bottom: 14upx;
        height: 172upx;
        background: #ff8f1f;
        .pi1 {
          padding-top: 38upx;
          padding-left: 154upx;
          width: 442upx;
          height: 52upx;
        }
        .pi2 {
          padding-top: 8upx;
          padding-left: 94upx;
          width: 504upx;
          height: 40upx;
        }
      }
      .whiteboard {
        margin-left: 10upx;
        margin-right: 12upx;
        // width: 730upx;
        height: 254upx;
        border-radius: 10upx 10upx 0upx 10upx;
        background: #ffffff;
        .version {
          font-size: 28upx;
          color: #3d3d3d;
          padding: 36upx 26upx 36upx 26upx;
          .service-name {
          }
          .service-describe {
          }
        }
      }
      .whiteboard1 {
        margin: 20upx 12upx 22upx 12upx;
        // width: 730upx;
        height: 234upx;
        border-radius: 10upx;
        opacity: 1;
        background: #ffffff;
        .service-demand {
          padding-top: 24upx;
          padding-left: 28upx;
          padding-bottom: 24upx;
          font-size: 28upx;
          color: #3d3d3d;
        }
        .demand-list {
          display: flex;
          justify-content: space-evenly;
          padding-right: 0upx;
          .item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .img {
              width: 48upx;
              height: 48upx;
              padding-bottom: 12upx;
            }
            .name {
              font-size: 24upx;
              font-weight: 350;
              color: #3d3d3d;
            }
          }
        }
      }
      .whiteboard2 {
        height: 1894upx;
        margin-left: 12upx;
        margin-right: 12upx;
        border-radius: 10upx;
        background: #ffffff;

        .top {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          height: 114upx;

          .a {
            width: 108upx;
            height: 0upx;
            border: 1upx solid #999999;
            // margin-top: 34upx;
          }
          .contrast {
            font-size: 28upx;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
            margin-top: 0upx;
          }
          .b {
            width: 108upx;
            height: 0upx;
            border: 1upx solid #999999;
            // margin-top: 34upx;
          }

          .top-title {
            margin-top: 42upx;
            margin-left: 144upx;
            margin-bottom: 32upx;
            margin-right: 144upx;
            width: 440upx;
            height: 40upx;
          }
        }
        .picture {
          padding-left: 12upx;
          padding-right: 12upx;
          .img1 {
            // width: 692upx;
            width: 100%;
            height: 810upx;
          }
          .img2 {
            // width: 692upx;
            width: 100%;
            height: 512upx;
          }
          .img3 {
            // width: 692upx;
            width: 100%;
            height: 344upx;
          }
        }
      }
      .explain {
        text-align: center;
        font-size: 28upx;
        font-weight: 500;
        color: #3d3d3d;
        margin-top: 32upx;
      }
      .whiteboard3 {
        // width: 730upx;
        height: 560upx;
        margin-top: 26upx;
        margin-left: 12upx;
        margin-right: 12upx;

        .content {
          padding-top: 42upx;
          padding-bottom: 38upx;
          padding-left: 36upx;
          padding-right: 36upx;
          // width: 656upx;
          height: 480upx;
          font-size: 24upx;
          line-height: 48upx;
          color: rgba(0, 0, 0, 0.85);
          background: #ffffff;
        }
      }
      .whiteboard4 {
        height: 360upx;
        border-radius: 10upx;
        margin-top: 18upx;
        margin-left: 12upx;
        margin-right: 12upx;
        margin-bottom: 26upx;
        .form {
          font-size: 28upx;
          color: #3d3d3d;
          padding-top: 34upx;
          padding-left: 38upx;
        }
        .price-type {
          display: flex;
          justify-content: space-evenly;
          margin-top: 30upx;
          .artificial {
            display: flex;
            .img {
              width: 80upx;
              height: 80upx;
              padding-right: 28upx;
            }
            .title {
              padding-top: 16upx;
              font-size: 36upx;
              color: #3d3d3d;
            }
          }
          .price {
            display: flex;
            .img {
              width: 80upx;
              height: 80upx;
              opacity: 1;
              padding-right: 16upx;
            }
            .title {
              padding-top: 16upx;
              font-size: 36upx;
              color: #3d3d3d;
            }
          }
        }
      }
      .whiteboard5 {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 126upx;
        background: #ffffff;
        padding: 30upx 36upx;
        box-sizing: border-box;
        .list {
          display: flex;
          justify-content: space-between;

          .item {
            .img {
              width: 48upx;
              height: 48upx;
            }
            .name {
              font-size: 24upx;
              font-weight: 350;
              color: #3d3d3d;
            }
          }

          .ask {
            padding-top: 12upx;
            text-align: center;
            width: 256upx;
            height: 62upx;
            border-radius: 60upx;
            background: #07b9b9;
            font-size: 36upx;
            font-weight: 500;
            color: #ffffff;
          }
          .order {
            padding-top: 12upx;
            text-align: center;
            width: 256upx;
            height: 62upx;
            border-radius: 60upx;
            background: #fa5151;
            font-size: 36upx;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
