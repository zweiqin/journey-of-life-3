<template>
  <view class="order-detail" v-if="data">
    <JHeader width="50" height="50" title="订单详情"></JHeader>

    <view
      class="view-order-status"
      :style="{
        'background-image': bg,
      }"
    >
      <JIcon width="44" height="44" type="active"></JIcon>
      {{ data.orderInfo.orderStatusText }}
    </view>

    <!-- 订单信息 -->
    <view class="order-info pane">
      <view class="co-info">
        <view class="line">
          <JIcon width="32" height="46" class="line-icon" type="modal"></JIcon>
          <view class="sub-title">姓名</view>
          <view>{{ `${data.orderInfo.consignee} ${data.orderInfo.mobile}` }}</view>
        </view>
        <view class="line">
          <JIcon width="32" height="40" class="line-icon" type="local-black"></JIcon>
          <view class="sub-title">地址</view>
          <view style="color: #07b9b9">{{ data.orderInfo.address }}</view>
        </view>
      </view>

      <view class="goods-info">
        <view class="title">商品信息</view>

        <view
          style="border-bottom: 1upx dotted #ccc; padding-bottom: 20upx"
          v-for="item in data.orderGoods"
          :key="item.id"
        >
          <view
            class="goods-item"
            v-if="commentGoodsId ? item.id == commentGoodsId : true"
          >
            <image :src="item.picUrl" class="goods-img" mode="" />
            <view class="goods-info-content">
              <view class="goods-name">{{ item.goodsName }}</view>
              <view class="sp">{{ item.specifications | fomatSp }}</view>
              <view class="goods-price"> ￥{{ item.price }}</view>
            </view>
            <view class="goods-number">x1</view>
          </view>

          <!-- 评论 -->
          <view
            class="evaluate-info pane"
            v-if="data.orderInfo.handleOption.comment && item.id == commentGoodsId"
          >
            <view class="line">
              <view class="title">满意</view>
              <uni-rate v-model="evForm.star"></uni-rate>
            </view>

            <view class="line">
              <view class="title">评论</view>
              <textarea
                placeholder="请输入商品评论"
                class="evaluate-textarea"
                maxlength="200"
                v-model="evForm.content"
              ></textarea>
            </view>

            <view class="line">
              <view class="title">晒图/视频</view>
              <view class="images">
                <view v-for="item in evForm.picUrls" :key="item">
                  <image class="user-upload-img" :src="item" mode="" />
                </view>
                <view @click="handleUploadImg" class="upload-icon">+</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 详细信息 -->
    <view class="detail-info pane">
      <view class="detail-info-title"> 详细信息 </view>

      <view class="line">
        <view class="title">订单编号</view>
        <view class="text">{{ data.orderInfo.orderSn }}</view>
      </view>
      <view class="line">
        <view class="title">下单时间</view>
        <view class="text">{{ data.orderInfo.addTime }}</view>
      </view>
    </view>

    <view class="order-detail-footer" v-if="data">
      <view v-for="item in orderOpButtons" :key="item.label">
        <button
          :style="{
            background: item.label === '去评论' ? 'rgb(132, 195, 65)' : '',
            color: item.label === '去评论' ? '#fff' : '',
            border: item.label === '去评论' ? 'none' : '',
          }"
          @click="handleOpOrder(data.orderInfo, item.key)"
          v-if="data.orderInfo.handleOption[item.key]"
          class="uni-btn"
        >
          {{ item.label === "去评论" ? "发布评论" : item.label }}
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getOrderDetailApi,
  orderCancelApi,
  orderDeleteApi,
  sendCommentApi,
} from "../../api/order";
import { getUserId } from "../../utils";
import { orderOpButtons } from "./config";
import { payOrderGoodsApi } from "../../api/goods";

export default {
  data() {
    return {
      orderId: null,
      data: null,
      orderOpButtons,
      commentGoodsId: null,
      evForm: {
        userId: getUserId(),
        star: 5,
        content: "",
        hasPicture: true,
        picUrls: [],
      },
    };
  },

  onLoad(options) {
    this.orderId = options.id;
    this.commentGoodsId = options.goodsId;
    this.getOrderDetail();
  },

  methods: {
    // 获取订单详情
    getOrderDetail() {
      uni.showLoading();
      getOrderDetailApi({
        userId: getUserId(),
        orderId: this.orderId,
      }).then(({ data }) => {
        this.data = data;
        console.log(data);
      });
      uni.hideLoading();
    },

    // 上传图片
    handleUploadImg() {
      const _this = this;
      uni.chooseImage({
        success: (chooseImageRes) => {
          uni.uploadFile({
            url: "https://www.tuanfengkeji.cn:9527/jf-app-api/wx/storage/upload",
            filePath: chooseImageRes.tempFiles[0].path,
            name: "file",
            success: (uploadFileRes) => {
              _this.evForm.picUrls.push(JSON.parse(uploadFileRes.data).data.url);
            },
          });
        },
      });
    },

    // 点击操作按钮
    handleOpOrder(goods, key) {
      const _this = this;
      const mapMethods = {
        cancel: {
          text: "确定要取消当前订单吗?",
          api: orderCancelApi,
          success: "取消成功",
        },
        delete: {
          text: "确定要删除当前订单吗?",
          api: orderDeleteApi,
          success: "删除成功",
        },
        // comment: {
        //   text: "确定提交评价吗",
        //   api: sendCommentApi,
        //   success: "评论成功",
        // },
      };

      if (goods.handleOption[key] && ["cancel", "delete"].includes(key)) {
        uni.showModal({
          title: "提示",
          content: mapMethods[key].text,
          success: function (res) {
            if (res.confirm) {
              mapMethods[key]
                .api({
                  userId: getUserId(),
                  orderId: goods.id,
                })
                .then(() => {
                  _this.$showToast(mapMethods[key].success, "success");
                  setTimeout(() => {
                    if (["delete"].includes(key)) {
                      uni.navigateBack();
                    } else if (["cancel"].includes(key)) {
                      _this.getOrderDetail();
                    }
                  }, 2000);
                });
            }
          },
        });
      } else {
        if (key === "pay") {
          payOrderGoodsApi({
            orderNo: goods.orderSn,
            userId: getUserId(),
            payType: 1,
          }).then((res) => {
            const payData = JSON.parse(res.h5PayUrl);
            const form = document.createElement("form");
            form.setAttribute("action", payData.url);
            form.setAttribute("method", "POST");
            const data = JSON.parse(payData.data);
            let input;
            for (const key in data) {
              input = document.createElement("input");
              input.name = key;
              input.value = data[key];
              form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
          });
        } else if (key === "comment") {
          uni.showModal({
            title: "提示",
            content: "确定提交评价吗",
            success: function (res) {
              if (res.confirm) {
                if (!_this.evForm.star) {
                  _this.$showToast("请选择评分");
                  return;
                }

                if (!_this.evForm.content) {
                  _this.$showToast("请填写评价");
                }

                _this.evForm.hasPicture = !!_this.evForm.picUrls.length;
                _this.evForm.picUrls = [..._this.evForm.picUrls];

                const data = { ..._this.evForm, orderGoodsId: _this.commentGoodsId * 1 };

                sendCommentApi(data).then(() => {
                  uni.showToast({
                    title: "评论成功",
                    duration: 2000,
                  });
                });

                _this.getOrderDetail();
              }
            },
          });
        }
      }
    },
  },

  filters: {
    fomatSp(value) {
      let str = "";
      for (const item of value) {
        str += item + ", ";
      }

      return str.substr(0, str.length - 2);
    },
  },

  computed: {
    bg() {
      const data = {
        已取消: "linear-gradient(to right, #959595, #d3d3d3)",
        未支付: "linear-gradient(to right, #fa5151, #fddbdb)",
      };
      return data[this.data.orderInfo.orderStatusText];
    },
  },
};
</script>

<style lang="less" scoped>
.order-detail {
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4;
  font-size: 28upx;
  color: #3d3d3d;
  padding-bottom: 400upx;
  // box-sizing: border-box;

  /deep/ .j-header-container {
    padding: 20upx;
    box-sizing: border-box;
    background: #fff;
  }

  .view-order-status {
    display: flex;
    align-items: center;
    height: 114upx;
    padding-left: 60upx;
    box-sizing: border-box;
    background-image: linear-gradient(to right, #fa5151, #fddbdb);
    color: #fff;
    font-size: 36upx;

    .j-icon {
      margin-right: 20upx;
    }
  }

  .pane {
    padding: 40upx;
    box-sizing: border-box;
    background-color: #fff;
  }

  .order-info {
    .co-info {
      .line {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        .line-icon {
          margin-right: 20upx;
          flex-shrink: 0;
        }

        &:nth-child(1) {
          margin-bottom: 20upx;
        }

        .sub-title {
          margin-right: 20upx;
          flex-shrink: 0;
        }
      }
      padding-bottom: 20upx;
      border-bottom: 1upx solid #dadada;
    }

    .goods-info {
      margin: 20upx 0;
      // border-bottom: 1upx dotted #f40;

      .goods-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 30upx;

        .goods-img {
          width: 140upx;
          height: 140upx;
          border-radius: 4upx;
          margin-right: 20upx;
          flex-shrink: 0;
        }

        .goods-info-content {
          flex: 1;
          font-size: 24upx;
          color: #3d3d3d;

          .goods-name {
            font-size: 28upx;
            font-weight: bold;
            width: 380upx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .sp {
            margin: 20upx 0 10upx;
          }

          .goods-price {
            font-size: 28upx;
          }
        }
      }
    }
  }

  .detail-info {
    margin-top: 20upx;
    color: #000;

    .detail-info-title {
      margin-bottom: 20upx;
    }

    .line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24upx;
      padding: 10upx 0;

      .title {
        color: #3d3d3d;
      }
    }
  }

  .evaluate-info {
    margin-top: 20upx;
    padding: 0;

    .sub-eval-btn {
      margin-top: 80upx;
      font-size: 28upx;
      border-top: 1upx solid #d8d8d8;
      padding-top: 30upx;
    }

    .line {
      padding: 16upx 0;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      &:nth-child(3) {
        display: block !important;

        .title {
          margin-bottom: 20upx;
        }

        .images {
          display: flex;
          flex-wrap: wrap;
        }
      }

      .title {
        margin-right: 30upx;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .evaluate-textarea {
        flex: 1;
        height: 200upx;
      }

      .images {
        .user-upload-img {
          width: 120upx;
          height: 120upx;
          border-radius: 6upx;
          object-fit: cover;
          margin-right: 10upx;
          margin-bottom: 10upx;
        }

        .upload-icon {
          width: 120upx;
          height: 120upx;
          border-radius: 6upx;
          background-color: #d8d8d8;
          color: #fff;
          font-size: 54upx;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 6upx 6upx 0;
          box-sizing: border-box;
        }
      }
    }
  }

  .order-detail-footer {
    height: 100upx;
    width: 100%;
    position: fixed;
    bottom: -1px;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 40upx;
    box-sizing: border-box;
    background-color: #fff;

    .uni-btn {
      border: 1upx solid #3d3d3d;
      padding: 0 28upx;
      color: #3d3d3d;
      line-height: 2.5;
      font-size: 28upx;
      margin-left: 30upx;
    }
  }
}
</style>
