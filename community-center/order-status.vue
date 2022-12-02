<template>
  <!-- 0:待支付 1：待接单 2待报价 3待分配 4已分配 5配送中 6已完成 7已取消 8其他（异常） -->
  <view class="order-status">
    <view class="top">
      <view class="title-list">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
          alt=""
          class="return"
          @click="handleToOrderList"
        />
        <view class="title">订单状态</view>
      </view>
      <view class="mid">
        <view class="mid-main">
          <view class="first">{{ this.statusName }}</view>
          <!-- <view class="second">
            <view class="distance">距离报价截止还剩</view>
            <view class="countdown">24:00:00</view>
          </view> -->
          <view class="third">
            <view class="third-main">
              <view class="left-type">
                <view class="number-name">订单编号</view>
                <view class="type-name">服务类型</view>
                <view class="time-name">下单时间</view>
              </view>
              <view class="right-info">
                <view class="number-list">
                  <view class="number">{{ this.orderNo }}</view>
                  <view class="copy" @tap="copyText(orderNo)">复制</view>
                </view>
                <view class="service-name">{{ this.dictName }}</view>
                <view class="time">{{ this.createTime }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="main">
      <view class="main-mid">
        <view class="to-do">服务待完成</view>
        <view class="explain"
          >本订单由商家在团蜂社区平台下单，由团蜂社区平台的师傅为您
          提供服务</view
        >
        <view class="line"></view>
        <view class="service-info">
          <view class="info-left">
            <view class="order-name">订单编号</view>
            <view class="service-content">服务内容</view>
            <view class="worker">服务师傅</view>
            <!-- <view class="check">验收时间</view> -->
          </view>
          <view class="info-right">
            <view class="number-list">
              <view class="number">{{ this.orderNo }}</view>
              <view class="copy" @tap="copyText(orderNo)">复制</view>
            </view>
            <view class="service-name">{{ this.dictName }}</view>
            <view class="worker-list">
              <view class="worker-name">{{ this.serverMasterName }}</view>
              <view
                class="contact"
                @click="contact(serverMasterTel)"
                v-if="this.a >= 4"
                >联系师傅</view
              >
            </view>
            <!-- <view class="yet">{{ this.updateTime }}</view> -->
          </view>
        </view>
      </view>
    </view>
    <view class="bottom" v-if="this.a == 6">
      <view class="bot">
        <view class="first-list">
          <view class="eva">评价</view>
          <view class="publish" @click="publish">发布</view>
        </view>
        <view class="second-list">
          <view class="satisfied">满意</view>
          <star :rate="abc" @change="bright" style="white-space: nowrap"></star>

          <!-- <star></star> -->
        </view>
        <view class="comment">评论:</view>
        <textarea
          class="content"
          v-model="evaluate"
          placeholder="(请输入评价)"
          placeholder-class="textarea-placeholder"
        />

        <view class="name-list">晒图</view>
        <view class="upload-pane">
          <view style="display: flex; flex-wrap: wrap">
            <view
              v-for="img in images"
              :key="img"
              style="
                position: relative;
                width: 160upx;
                height: 160upx;
                margin-right: 20upx;
                margin-bottom: 20upx;
              "
            >
              <img :src="img" alt="" class="img1" />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/qqzm2u887derediugqlf.png"
                alt=""
                class="img2"
                @click="removeBackground(img)"
              />
            </view>
          </view>
          <view
            @click="chooseImg"
            class="upload"
            v-if="!imgUrl"
            style="margin-right: 6upx"
            >+</view
          >
          <image
            v-else-if="imgUrl"
            class="iamge-background"
            :src="imgUrl"
            mode=""
          />
        </view>
        <view class="stow-list">
          <view class="stow">收起</view>
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/95a2o8c81mnryjijqnib.png"
            alt=""
            class="img"
          />
        </view>
      </view>
    </view>
    <view class="foot" v-if="this.a == 6">
      <view class="foot-list">
        <view class="ask">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/exm117nexx3g3c0v2du5.png"
            alt=""
            class="img"
          />
          <view class="name">在线咨询</view>
        </view>
        <view class="next-order">再下一单</view>
        <view class="finish" @click="handleToOrderList">确认完成</view>
      </view>
    </view>
  </view>
</template>

<script>
import star from "../components/rate";
import { getUserId } from "../utils";
import { USER_TOKEN } from "../constant";
import { detailsMdApi } from "../api/community-center";
export default {
  name: "Order-status",
  props: {
    imgUrl: String,
  },
  components: { star },
  data() {
    return {
      evaluate: "",
      images: [],
      info: [],
      status: "",
      dictName: "",
      abc: 3,
      statusName: "",
      createTime: "",
      updateTime: "",
      a: "",
      serverMasterName: "",
      serverMasterTel: "",
      orderNo: "",
    };
  },
  methods: {
    handleToOrderList() {
      uni.navigateTo({ url: `../community-center/order` });
    },
    bright(e) {
      this.abc = e * 1;
    },

    copyText(value) {
      uni.setClipboardData({
        data: value,
        success: function () {
          console.log("success", value);
        },
      });
    },

    publish() {
      uni.navigateTo({ url: `/community-center/eva?star=${this.abc}&images=${encodeURIComponent(JSON.stringify(this.images))}` });
    },

    contact(phone) {
      console.log("传入的电话", phone);
      const res = uni.getSystemInfoSync();
      //ios
      if (res.platform == "ios") {
        uni.makePhoneCall({
          phoneNumber: phone,
          success() {
            console.log("拨打成功");
          },
          fail() {
            console.log("拨打失败");
          },
        });
      } else {
        //安卓
        uni.showActionSheet({
          itemList: [phone, "呼叫"],
          success: function (res) {
            console.log(res);
            if (res.tapIndex == 1) {
              uni.makePhoneCall({
                phoneNumber: phone,
              });
            }
          },
        });
      }
    },

    chooseImg() {
      const _this = this;
      uni.chooseImage({
        success: (chooseImageRes) => {
          uni.uploadFile({
            url: "https://www.tuanfengkeji.cn:9527/jf-app-api/wx/storage/upload",
            filePath: chooseImageRes.tempFiles[0].path,
            name: "file",
            formData: {
              token: USER_TOKEN,
              userId: getUserId(),
            },
            success: (uploadFileRes) => {
              _this.images.push(JSON.parse(uploadFileRes.data).data.url);
            },
          });
        },
      });
    },
    removeBackground(img) {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "确定删除当前图片吗？",
        success: function (res) {
          if (res.confirm) {
            const index = _this.images.findIndex((item) => item === img);
            _this.images.splice(index, 1);
          }
        },
      });
    },
    //订单详情
    async detailsMd() {
      const res = await detailsMdApi({
        orderNo: this.orderNo,
      });
      this.info = res.data;
      console.log("info", this.info);

      this.status = this.info[0].status;
      console.log("status", this.status);

      this.serverMasterName = this.info[0].serverMasterName;
      console.log("师傅名字", this.serverMasterName);

      this.serverMasterTel = this.info[0].serverMasterTel;
      console.log("电话", this.serverMasterTel);
      // this.serverMasterTel = "123456789";

      this.a = this.status;
      console.log("a", this.a);
      if (this.a == 0) {
        this.statusName = "待支付";
        console.log("订单状态", this.statusName);
      } else if (this.a == 1) {
        this.statusName = "待接单";
        console.log("订单状态", this.statusName);
      } else if (this.a == 2) {
        this.statusName = "待报价";
        console.log("订单状态", this.statusName);
      } else if (this.a == 3) {
        this.statusName = "待分配";
        console.log("订单状态", this.statusName);
      } else if (this.a == 4) {
        this.statusName = "已分配";
        console.log("订单状态", this.statusName);
      } else if (this.a == 5) {
        this.statusName = "配送中";
        console.log("订单状态", this.statusName);
      } else if (this.a == 6) {
        this.statusName = "已完成";
        console.log("订单状态", this.statusName);
      } else if (this.a == 7) {
        this.statusName = "已取消";
        console.log("订单状态", this.statusName);
      } else {
        this.statusName = "异常";
        console.log("订单状态", this.statusName);
      }

      this.dictName = this.info[0].dictName;
      console.log("dictName", this.dictName);
      this.createTime = this.info[0].createTime;
      console.log("createTime", this.createTime);
      this.updateTime = this.info[0].updateTime;
      console.log("updateTime", this.updateTime);
    },
  },
  created() {},
  onLoad(options) {
    console.log(options);
    this.orderNo = options.orderNo;

    console.log("orderNo", this.orderNo);
    this.detailsMd();
  },
};
</script>

<style lang="scss" scoped>
.order-status {
  padding-bottom: 172upx;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(245, 190, 134, 0.42) 2%,
    rgba(246, 190, 134, 0) 103%
  );
  .top {
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
    .mid {
      padding: 50upx 30upx 34upx 30upx;
      .mid-main {
        border-radius: 20upx;
        background: #ffffff;
        .first {
          padding-top: 30upx;
          text-align: center;
          font-size: 36upx;
          font-weight: bold;
          color: #3d3d3d;
        }
        .second {
          padding-top: 24upx;
          font-size: 28upx;
          display: flex;
          justify-content: center;
          .distance {
            color: #3d3d3d;
          }
          .countdown {
            padding-left: 12upx;
            color: #e95d20;
          }
        }
        .third {
          padding: 40upx 28upx 64upx 28upx;
          .third-main {
            padding: 32upx 60upx 30upx 32upx;
            border-radius: 20upx;
            background: #fef8f1;
            display: flex;
            justify-content: space-between;
            .left-type {
              font-size: 28upx;
              font-weight: 500;
              color: #3d3d3d;
              .number-name {
                padding-bottom: 32upx;
              }
              .type-name {
                padding-bottom: 32upx;
              }
              .time-name {
              }
            }
            .right-info {
              width: 58%;
              font-size: 28upx;
              font-weight: 500;
              color: #3d3d3d;
              .number-list {
                display: flex;
                justify-content: space-between;
                padding-bottom: 32upx;
                .number {
                }
                .copy {
                  color: #e95d20;
                }
              }
              .service-name {
                padding-bottom: 32upx;
              }
              .time {
              }
            }
          }
        }
      }
    }
  }
  .main {
    padding: 34upx 34upx 34upx 34upx;
    background: #ffffff;
    .main-mid {
      .to-do {
        font-size: 28upx;
        font-weight: 500;
        color: #3d3d3d;
      }
      .explain {
        padding-top: 22upx;
        padding-bottom: 22upx;
        font-size: 24upx;
        color: #777777;
      }
      .line {
        border-bottom: 2upx solid #d8d8d8;
      }
      .service-info {
        display: flex;
        justify-content: space-between;
        font-size: 28upx;
        font-weight: 500;
        color: #3d3d3d;
        .info-left {
          .order-name {
            padding-top: 36upx;
          }
          .service-content {
            padding-top: 20upx;
          }
          .worker {
            padding-top: 20upx;
          }
          .check {
            padding-top: 20upx;
          }
        }
        .info-right {
          width: 66%;
          .number-list {
            padding-top: 36upx;
            display: flex;
            justify-content: space-between;
            .number {
            }
            .copy {
              color: #e95d20;
            }
          }
          .service-name {
            padding-top: 20upx;
          }
          .worker-list {
            padding-top: 20upx;
            display: flex;
            justify-content: space-between;
            .worker-name {
            }
            .contact {
              color: #e95d20;
            }
          }
          .yet {
            padding-top: 20upx;
          }
        }
      }
    }
  }
  .bottom {
    padding: 24upx 32upx 16upx 32upx;
    margin-top: 50upx;
    margin-bottom: 120upx;
    background: #ffffff;
    .bot {
      .first-list {
        padding-left: 2upx;
        display: flex;
        justify-content: space-between;
        .eva {
          font-size: 28upx;
          font-weight: 500;
          color: #3d3d3d;
        }
        .publish {
          font-size: 28upx;
          font-weight: 500;
          color: #e95d20;
        }
      }
      .second-list {
        padding-top: 34upx;
        padding-left: 2upx;
        display: flex;
        .satisfied {
          padding-right: 68upx;
          font-size: 28upx;
          color: #3d3d3d;
        }
      }
      .comment {
        padding-top: 34upx;
        padding-left: 2upx;
        font-size: 28upx;
        font-weight: 500;
        color: #3d3d3d;
      }
      .content {
        padding-top: 10upx;
        padding-left: 2upx;
        width: 100%;
        height: 200upx;
        font-size: 28upx;
        font-weight: 500;
        color: #3d3d3d;
        .textarea-placeholder {
          font-size: 28upx;
          color: #777777;
        }
      }
      .name-list {
        padding-bottom: 34upx;
        padding-left: 2upx;
        font-size: 28upx;
        color: #3d3d3d;
      }
      .upload-pane {
        border-radius: 20upx;
        display: flex;
        flex-wrap: wrap;
        .delete-icon {
          width: 32upx;
          height: 36upx;
        }
        .img1 {
          width: 160upx;
          height: 160upx;
          border-radius: 20upx;
        }
        .img2 {
          width: 40upx;
          height: 40upx;
          position: absolute;
          right: -15upx;
          top: -15upx;
          background: white;
          border-radius: 50%;
        }
        .upload {
          margin: 0;
          width: 160upx;
          height: 160upx;
          background-color: #ececec;
          // border-radius: 20upx;
          color: #767676;
          text-align: center;
          line-height: 160upx;
          font-size: 60upx;
        }
        .iamge-background {
          width: 160upx;
          height: 160upx;
          object-fit: cover;
        }
      }
      .stow-list {
        padding-top: 44upx;
        display: flex;
        align-items: center;
        justify-content: center;
        .stow {
          font-size: 28upx;
          color: #777777;
        }
        .img {
          width: 28upx;
          height: 28upx;
        }
      }
    }
  }
  .foot {
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #ffffff;
    padding: 48upx 28upx 40upx 28upx;
    box-sizing: border-box;
    border-top: 2upx solid #f1f2f6;

    .foot-list {
      display: flex;
      justify-content: space-between;
      .ask {
        display: flex;
        flex-direction: column;
        align-items: center;
        .img {
          width: 48upx;
          height: 48upx;
        }
        .name {
          font-size: 24upx;
          color: #3d3d3d;
        }
      }
      .next-order {
        width: 246upx;
        height: 80upx;
        border: 2upx solid #e95d20;
        border-radius: 100upx;
        font-size: 32upx;
        font-weight: 500;
        color: #e95d20;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .finish {
        width: 246upx;
        height: 80upx;
        background: linear-gradient(270deg, #e95e20 0%, #ff8f1f 100%);
        border-radius: 100upx;
        font-size: 32upx;
        font-weight: 500;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
