<template>
  <view class="order-info-wrapper">
    <TuanPageHead title="订单详情" fixed :scrollTop="scrollTop">
      <block slot="left"> <image src="../static/images/con-center/order-detail-back.png" @click="handleToOrderList" class="back-icon"></image> </block>
    </TuanPageHead>
    <view class="c-order-detail" v-if="orderDetail" :style="{ marginTop: scrollTop > 300 ? '100upx' : '' }">
      <view class="item order-info">
        <!-- <view class="order-status" :style="{ color: orderStatusMap[orderDetail.status].color }"> {{ orderStatusMap[orderDetail.status].label }} </view> -->
        <view class="order-status"> {{ orderStatusMap[orderDetail.status].label }} </view>
        <view class="order-info-detail">
          <block v-for="item in orderInfoFieldMap" :key="item.label">
            <view class="order-detail-item" v-if="!!orderDetail[item.field]">
              <view class="title">{{ item.label }}</view>
              <view class="content">{{ item.format ? item.format(orderDetail) : orderDetail[item.field] }}</view>
              <view class="op" v-if="item.op" @click="item.op.handler(orderDetail, copySuccess)">{{ item.op.label }}</view>
            </view>
          </block>
        </view>
      </view>

      <view class="item serve-time-line" v-if="orderStatusLogList && orderStatusLogList.length">
        <tui-time-axis>
          <tui-timeaxis-item
            :style="{ marginBottom: index === orderStatusLogList.length - 1 ? '0' : '' }"
            backgroundColor="transparent"
            v-for="(item, index) in orderStatusLogList"
            :key="item.id"
          >
            <template v-slot:node>
              <view class="tui-node">
                <tui-icon name="check" color="#fff" :size="7" bold></tui-icon>
              </view>
            </template>

            <template v-slot:content>
              <view class="node-title-wrapper">
                <view class="tui-order-title">{{ item.msg }}</view>
                <view class="node-time">{{ item.createTime }}</view>
              </view>
            </template>
          </tui-timeaxis-item>
        </tui-time-axis>
      </view>

      <view class="item master-info" v-if="masterInfo">
        <view class="item-title">师傅信息</view>

        <view class="content">
          <view class="base-info">
            <view class="wrapper">
              <view class="left">
                <text class="master-name">{{ masterInfo.name }}</text>
                <view class="rate">
                  <image class="rate-star" src="../static/images/con-center/rate-star.png"></image>
                  <text class="rate-text">{{ masterInfo.score || '5.0' }}</text>
                </view>
                <view class="tag tag1">已认证</view>
                <view class="tag tag2">{{ masterInfo.workerLevel }}</view>
              </view>

              <view class="master-skills" v-if="masterInfo.skillExpertise">
                <text>{{ allSkillVisible ? masterInfo.skillExpertise.join('/') : masterInfo.skillExpertise.slice(0, 3).join(' / ') }}</text>
                <button class="uni-btn" v-if="masterInfo.skillExpertise.length > 3" @click="allSkillVisible = !allSkillVisible">
                  {{ allSkillVisible ? '收起' : '更多' }}
                </button>
              </view>
            </view>

            <image class="avatar-img" :src="masterInfo.headUrl"></image>
          </view>

          <view class="contect-master" v-if="masterInfo.tel" @click="handleCallMaster(masterInfo.tel)">
            <image class="icon1" src="../static/images/con-center/connect-icon.png"></image>
            <text class="text">联系师傅</text>
            <image class="icon2" src="../static/images/con-center/right-arrow.png"></image>
          </view>
        </view>
      </view>

      <view class="item comment" v-if="orderComment">
        <view class="item-title">评价</view>
        <view class="content">
          <view class="comment-text"> {{ orderComment.content }}</view>
          <view class="rate-item">
            <view class="title">服务态度</view>
            <tui-rate :size="16" :current="orderComment.serverScore"></tui-rate>
          </view>

          <view class="rate-item">
            <view class="title">技能专业</view>
            <tui-rate :size="16" :current="orderComment.skillSpeciality"></tui-rate>
          </view>

          <view class="comment-source-list">
            <block v-for="(item, index) in orderComment.commentFile" :key="index">
              <view class="item img" v-if="!isVideoSource(item)">
                <image @click="handlePreviewSource(index, orderComment.commentFile, true)" class="img" :src="item"></image>
              </view>
              <view class="item video" @click="handlePreviewSource(index, orderComment.commentFile, false)" v-else>
                <video class="video-source" :src="item"></video>
              </view>
            </block>
          </view>
        </view>
      </view>

      <view class="tip"> </view>
    </view>

    <view
      class="footer"
      :class="{ fix: scrollTop === 0 }"
      :style="{ backgroundColor: scrollTop > 100 ? '#fff' : '' }"
      v-if="orderDetail && [0, 1, 2].includes(orderDetail.status)"
    >
      <!-- <view class="footer" > -->
      <button class="uni-btn" @click="$data._isShowTuiModel = true">取消订单</button>
    </view>

    <tui-toast ref="toast"></tui-toast>
    <tui-modal
      :show="$data._isShowTuiModel"
      title="提示"
      content="确定要取消订单吗？"
      @click="
        isShowChooseReason = true;
        $data._isShowTuiModel = false;
      "
    ></tui-modal>

    <tui-bottom-popup
      :zIndex="1002"
      :maskZIndex="1001"
      :show="isShowChooseReason"
      @close="
        isShowChooseReason = false;
        cancelRemarks = '订单下错了';
        isOther = false;
      "
    >
      <view class="choose-reason-container">
        <view class="title"> 取消订单 </view>

        <view class="list">
          <view class="list-item" v-for="item in reasonList" :key="item" @click="handleChooseCancelReason(item)">
            <view class="text">{{ item }}</view>
            <tui-icon :size="20" v-if="(cancelRemarks === item && !isOther) || (item === '其他' && isOther)" name="check" color="#ef530e"></tui-icon>
          </view>

          <tui-textarea :borderBottom="false" isCounter v-if="isOther" :size="28" placeholder="请输入订单取消原因" padding="20upx 0 0 0"></tui-textarea>
        </view>

        <view class="buttin-wrapper">
          <button :loading="isCanceling" class="uni-btn" @click="handleConfirmCancel">确定取消</button>
        </view>
      </view>
    </tui-bottom-popup>

    <TuanVideoPreview ref="tuanVideoPreviewRef"></TuanVideoPreview>
  </view>
</template>

<script>
import { getCommOrderDeatilApi, cancelOrderApi } from '../api/community-center';
import { orderStatusMap, orderInfoFieldMap } from './config';
import { isVideoSource, getUserId } from '../utils';
import showModalMixin from 'mixin/showModal';

export default {
  data() {
    return {
      orderNo: '',
      orderDetail: null,
      orderStatusMap: Object.freeze(orderStatusMap),
      orderInfoFieldMap: Object.freeze(orderInfoFieldMap),
      orderStatusLogList: [],
      masterInfo: null,
      orderComment: null,
      allSkillVisible: false,
      scrollTop: 0,
      isShowChooseReason: false,
      reasonList: ['订单下错了', '订单取消了', '其他'],
      cancelRemarks: '订单下错了',
      isOther: false,
      isCanceling: false
    };
  },
  mixins: [showModalMixin()],
  onLoad(options) {
    this.orderNo = options.orderNo;
  },

  mounted() {
    this.getOrderInfo();
  },

  methods: {
    isVideoSource,
    async getOrderInfo() {
      try {
        const res = await getCommOrderDeatilApi({
          orderNo: this.orderNo
        });

        if (res.statusCode === 20000) {
          this.orderDetail = res.data;
          this.orderStatusLogList = res.data.orderStatusLogList || [];
          this.masterInfo = res.data.orderWorkerInfoVo || null;
          if (this.masterInfo && this.masterInfo.skillExpertise) {
            this.masterInfo.skillExpertise = this.masterInfo.skillExpertise.split(',');
          }
          this.orderComment = this.orderDetail.laoaModuanComment || null;
          if (this.orderComment) {
            this.orderComment.commentFile = [
              ...this.orderComment.commentFile.split(','),
              'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/n3e15rvlcvngq8nid5vt.mp4'
            ];
          }
        } else {
          this.ttoast({
            type: 'fail',
            title: res.statusMsg
          });
        }

        uni.stopPullDownRefresh();
      } catch (error) {
        console.log(error);

        console.log(this.$refs);
        this.ttoast({
          type: 'fail',
          title: '订单详情获取失败',
          content: error
        });
      }
    },

    // 复制成功
    copySuccess() {
      this.ttoast('复制成功');
    },

    // 联系师傅
    handleCallMaster(tel) {
      uni.makePhoneCall({
        phoneNumber: tel,
        fail: () => {
          this.ttoast({
            type: 'fail',
            title: '操作失败'
          });
        }
      });
    },

    handleToOrderList() {
      // uni.navigateTo({ url: `../community-center/order` });
      uni.switchTab({
        url: '/pages/order/order'
      });
    },
    handleChooseCancelReason(reason) {
      if (reason !== '其他') {
        this.isOther = false;
        this.cancelRemarks = reason;
      } else {
        this.isOther = true;
        this.cancelRemarks = '';
      }
    },

    async handleConfirmCancel() {
      if (this.isCanceling) {
        this.ttoast({
          type: 'info',
          title: '订单取消中',
          content: '请勿重复点击'
        });
        return;
      }

      if (!this.cancelRemarks) {
        this.ttoast({
          type: 'info',
          title: '请输入取消订单原因'
        });
      }

      try {
        this.isCanceling = true;

        const res = await cancelOrderApi({
          cancelRemarks: this.cancelRemarks,
          userId: getUserId(),
          id: this.orderDetail.id
        });

        if (res.statusCode === 20000) {
          this.ttoast('订单取消成功');
          this.cancelRemarks = '订单下错了';
          this.isOther = false;
          this.isShowChooseReason = false;
          this.getOrderInfo();
        } else {
          this.ttoast({
            type: 'fail',
            title: '订单取消失败',
            content: res.statusMsg
          });
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '订单取消失败',
          content: error
        });
      } finally {
        this.isCanceling = false;
      }
    },

    // 查看图片
    handlePreviewSource(index, list, tag = false) {
      if (tag) {
        uni.previewImage({
          current: index,
          urls: list.filter((item) => !isVideoSource(item))
        });
      } else {
        const videoList = list.filter((url) => isVideoSource(url));
        this.$refs.tuanVideoPreviewRef.showModel(list[index], videoList);
      }
    }
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },

  onPullDownRefresh() {
    this.getOrderInfo();
  }
};
</script>

<style lang="less" scoped>
@mian-color: #ef530e;

.order-info-wrapper {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(180deg, #fbe4cd -13%, #fffbf8 100%);
}

view {
  line-height: 1.5;
}

.back-icon {
  width: 64upx;
  height: 64upx;
}

.tip {
  position: relative;
  width: 630upx;
  height: 36upx;
  margin-top: 54upx;

  &::after {
    position: absolute;
    content: '本服务由广东团蜂生活服务有限公司提供';
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #9e9e9e;
    font-size: 24upx;
    white-space: nowrap;
  }
}
.c-order-detail {
  padding: 27upx 30upx;
  box-sizing: border-box;

  .item {
    background-color: #fff;
    border-radius: 20upx;
    box-sizing: border-box;
    margin-bottom: 24upx;

    &-title {
      font-size: 28upx;
      color: #222229;
      margin-bottom: 20upx;
    }

    &:nth-child(1) {
      padding: 26upx 21upx 29upx;
    }

    &:nth-child(2) {
      padding: 48upx 37upx;
    }

    &:nth-child(3) {
      padding: 35upx 30upx;
    }

    &:nth-child(4) {
      padding: 30upx 30upx 20upx;
    }
  }

  .order-info {
    .order-status {
      font-size: 44upx;
      color: @mian-color;
      font-weight: bold;
      text-align: center;
      margin-bottom: 16upx;
    }

    .order-info-detail {
      width: 100%;
      padding: 33upx;
      box-sizing: border-box;
      background-color: #fef8f1;
      border-radius: 20upx;

      .order-detail-item {
        font-size: 28upx;
        display: flex;
        align-items: flex-start;
        margin-bottom: 44upx;

        .title {
          flex: 0 0 116upx;
          margin-right: 86upx;
          color: #888889;
        }

        .content {
          color: #222229;
          flex: 1;
        }

        .op {
          color: @mian-color;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .serve-time-line {
    .node-title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .tui-node {
      position: relative;
      top: 4upx;
      height: 37rpx;
      width: 37rpx;
      border-radius: 50%;
      background-color: @mian-color;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      flex-shrink: 0;
    }

    .tui-order-title {
      padding-bottom: 12rpx;
      font-size: 28upx;
      color: #222229;
      font-weight: bold;
    }

    .node-time {
      color: #888889;
      font-size: 24upx;
    }
  }

  .master-info {
    .content {
      .base-info {
        display: flex;
        align-items: flex-start;

        .wrapper {
          flex: 1;

          .master-skills {
            color: #888889;
            font-size: 24upx;
            margin-top: 18upx;

            .uni-btn {
              display: inline-block;
              font-size: 24upx;
              color: @mian-color;
              margin-left: 10upx;
              white-space: nowrap;
              position: relative;
              top: 1upx;
              border-radius: 0;
            }
          }
        }

        .left {
          align-items: center;
          display: flex;
          flex: 1;

          .master-name {
            font-size: 32upx;
            color: #222229;
          }

          .rate {
            margin: 0 20upx;
            .rate-star {
              width: 24upx;
              height: 24upx;
              flex-shrink: 0;
            }

            &-text {
              font-size: 12upx;
              color: #ff9554;
            }
          }

          .tag {
            line-height: 1.5;
            font-size: 24upx;
            width: 84upx;
            text-align: center;

            &.tag1 {
              color: #0d79ff;
              background-color: #f0f8ff;
            }

            &.tag2 {
              color: @mian-color;
              background-color: #fff9f3;
              margin-left: 20upx;
            }
          }
        }

        .avatar-img {
          width: 100upx;
          height: 100upx;
          border-radius: 50%;
        }
      }

      .contect-master {
        display: flex;
        align-items: center;
        margin-top: 36upx;
        color: @mian-color;
        font-size: 28upx;

        .text {
          flex: 1;
          margin-left: 8upx;
        }

        .icon1 {
          width: 40upx;
          height: 40upx;
          flex-shrink: 0;
        }

        .icon2 {
          width: 24upx;
          height: 24upx;
          flex-shrink: 0;
        }
      }
    }
  }

  .comment {
    .comment-text {
      color: #3f3f3f;
      font-size: 28upx;
      font-weight: 500;
      margin-bottom: 20upx;
    }

    .rate-item {
      display: flex;
      align-items: center;

      .title {
        font-size: 24upx;
        color: #888889;
        margin-right: 10upx;
      }
    }

    .comment-source-list {
      display: flex;
      align-items: center;
      margin-top: 20upx;

      .item {
        width: 80upx;
        height: 80upx;
        border-radius: 20upx;
        padding: 0;
        overflow: hidden;
        margin-right: 20upx;

        .img,
        .video-source {
          width: 80upx;
          height: 80upx;
        }

        &.video {
          position: relative;

          &::after {
            width: 100%;
            height: 100%;
            position: absolute;
            content: '>';
            display: block;
            top: 0;
            left: 0;
            z-index: 10;
            background-color: rgba(0, 0, 0);
          }
        }
      }
    }
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 124upx;
  padding: 0 18upx;
  box-sizing: border-box;
  // background-color: #fff;
  bottom: 0;

  &.fix {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    transition: bottom 350ms;
  }

  .uni-btn {
    width: 254upx;
    height: 80upx;
    border-radius: 100upx;
    border: 2upx solid #888888;
    color: #888888;
    font-size: 28upx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.choose-reason-container {
  padding: 20upx;
  box-sizing: border-box;
  background-color: #fff;

  .title {
    font-weight: 500;
    font-size: 28upx;
    color: #ccc;
    margin-bottom: 20upx;
    text-align: center;
  }

  .list {
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80upx;
      border-top: 1upx solid #f6f6f6;
      font-size: 28upx;
      color: #3d3d3d;

      &:last-child {
        border-bottom: 1upx solid #f6f6f6;
      }
    }
  }

  .buttin-wrapper {
    height: 100upx;
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-top: 30upx;

    .uni-btn {
      width: 700upx;
      height: 80upx;
      background-color: @mian-color;
      border-radius: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28upx;
      color: #fff;
      transition: all 350ms;

      &:active {
        opacity: 0.7;
      }
    }
  }
}
</style>
