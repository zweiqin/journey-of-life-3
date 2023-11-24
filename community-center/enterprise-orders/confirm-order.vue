<template>
  <view class="confirm-order-container">
    <TuanPageHead title="订单详情" padding="0" weight="500">
      <block slot="left">
        <image style="width: 64upx; height: 64upx;" src="../../static/images/con-center/order-detail-back.png"
          @click="handleToOrderList" class="back-icon">
        </image>
      </block>
    </TuanPageHead>
    <view class="pane">
      <view class="bar">
        <view class="title justify">公司名称</view>
        <view class="value title flex">广东团蜂科有限公司 <view class="tag">已认证</view>
        </view>
      </view>

      <view class="bar">
        <view class="title justify">联系人</view>
        <view class="value title">蔡志</view>
      </view>

      <view class="bar">
        <view class="title justify">联系电话</view>
        <view class="value">18745698521</view>
      </view>

      <view class="bar">
        <view class="title justify">公司地址</view>
        <view class="value title">
          <view style="display: inline;">湖北省宜城市红旗桥湖滨大道506</view>
          <image class="address-icon" src="../../static/images/new-community/enterprise-orders/address-icon.png"></image>
        </view>
      </view>

      <view class="bar">
        <view class="title justify">详细地址</view>
        <view class="value title">guangdong</view>
      </view>


      <view class="shop-choose">
        <view class="shop-name">文化社区店 <view class="tag">默认</view>
        </view>
        <button class="uni-btn" @click="handleChooseSite">网点更换</button>
      </view>

      <view class="shop-address">
        <view class="shop-address-text">
          <view class="tag">最近</view>
          话UI回家数据科技话费卡网卡尽快i喝咖啡很顺利绗缝机是覅很贵的皇女u几哈21hdjciHFJCfiKHFjvsbj1
        </view>

        <view class="distance">
          <image class="tag" src="../../static/images/new-community/enterprise-orders/location.png"></image>
          <view class="distance-text">123km</view>
        </view>
      </view>
    </view>

    <view class="pane">
      <view class="bar">
        <view class="title justify flex">已选服务：<text>2项</text>
        </view>
        <view class="value title flex" @click="handleAddServe">
          添加服务
          <image style="width: 24upx; height: 24upx; flex-shrink: 0; margin-left: 14upx;"
            src="../../static/images/new-community/enterprise-orders/add.png"></image>
        </view>
      </view>

      <view class="serve-pane">
        <view class="pane-header">
          <view class="left-title">
            <tui-icon margin="0 10upx 0 0" :size="20" name="circle-fill"></tui-icon>
            <view class="title">皮革</view>
          </view>
          <view class="right-title">填写数量和上传图片</view>
        </view>

        <view class="count-price">
          <view class="item">
            <view class="item-title">数量</view>
            <view class="count-wrapper">
              <image class="dis" src="../../static/images/new-community/enterprise-orders/dis.png"></image>
              <view class="count">10件</view>
              <image class="add" src="../../static/images/new-community/enterprise-orders/add.png"></image>
            </view>
          </view>
          <view class="item">
            <view class="item-title">金额</view>
            <view class="item-price">￥20</view>
          </view>
        </view>

        <view class="img-list">
          <view class="uploader">
            <tui-icon :size="20" marign="0 0 8upx 0" name="camera"></tui-icon>
            上传图片
          </view>
          <view class="tip">最多上传4张</view>
        </view>
      </view>
    </view>


    <view class="pane">
      <view class="title">内容备注</view>
      <tui-textarea :maxlength="80" :marginTop="26" padding="0" trim isCounter :size="26" :borderTop="false"
        :borderBottom="false" height="132rpx" min-height="132rpx" placeholder="请输入订单备注"></tui-textarea>
    </view>


    <view class="pane" style="margin-bottom: 280upx;">
      <view class="bar" @click="chooseTimeVisible = true">
        <view class="title justify flex">期望上门时间 <view class="required">必填</view>
        </view>
        <view class="value title flex">蔡志 <image style="width: 21upx; height: 21upx; flex-shrink: 0; margin-left: 13upx;"
            src="../../static/images/new-community/enterprise-orders/right-arrow.png"></image>
        </view>
      </view>

      <view class="bar" @click="handleChoosePayMethod">
        <view class="title justify">付款方式
        </view>
        <view class="value title flex">微信支付 <image
            style="width: 21upx; height: 21upx; flex-shrink: 0; margin-left: 13upx;"
            src="../../static/images/new-community/enterprise-orders/right-arrow.png"></image>
        </view>
      </view>
    </view>

    <view class="footer">
      <view class="serve-detail">
        <view class="total-price">总计金额 <text class="price-text">￥299</text></view>
        <view class="serve-count">共计服务项目：2项</view>
      </view>
      <button class="uni-btn">提交订单</button>
    </view>

    <!-- 添加服务 -->
    <AddServe ref="addServeRef"></AddServe>
    <!-- 选择网点 -->
    <ChooseShopSite ref="chooseShopSiteRef"></ChooseShopSite>
    <!-- 选择期望上门时间 -->
    <ChooseTime v-model="chooseTimeVisible"></ChooseTime>
    <!-- 选择支付方式 -->
    <PayMethods ref="payMethodRef"></PayMethods>
  </view>
</template>

<script>
import AddServe from './components/AddServe.vue'
import ChooseShopSite from './components/ChooseShopSite.vue'
import ChooseTime from '../componts/choose-time.vue'
import PayMethods from './components/PayMethods.vue'
import { getBAuthInfoApi } from '../../api/community-center'
import { USER_INFO } from '../../constant'

export default {
  components: {
    AddServe,
    ChooseShopSite,
    ChooseTime,
    PayMethods
  },

  data() {
    return {
      chooseTimeVisible: false
    }
  },

  onLoad() {
    this.getBAuthInfo()
  },

  methods: {
    handleAddServe() {
      this.$refs.addServeRef.show()
    },

    handleChooseSite() {
      this.$refs.chooseShopSiteRef.show()
    },

    handleChoosePayMethod() {
      this.$refs.payMethodRef.show()
    },

    // 获取企业认证信息
    async getBAuthInfo() {
      const res = await getBAuthInfoApi({
        phone: uni.getStorageSync(USER_INFO).phone
      })

      console.log(res);
    }
  },
}
</script>

<style lang="less" scoped>
.confirm-order-container {
  min-height: 100vh;
  background-color: #F5F5F5;
  padding: 24upx;
  box-sizing: border-box;

  .pane {
    background-color: #fff;
    padding: 32upx 24upx;
    box-sizing: border-box;
    border-radius: 24upx;
    margin-bottom: 24upx;

    .serve-pane {
      padding: 32upx 0;
      box-sizing: border-box;

      .pane-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left-title {
          display: flex;
          align-items: center;

        }

        .right-title {
          color: #888889;
          font-size: 26upx;
        }
      }

      .img-list {
        display: flex;
        align-items: center;

        .uploader {
          width: 105upx;
          height: 118upx;
          border-radius: 10upx;
          background-color: #F5F4F5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-size: 18upx;
          color: #888889;
          transition: all 350ms;
          margin-right: 24upx;

          &:active {
            opacity: 0.7;
          }
        }

        .tip {
          color: #D1D1D1;
          font-size: 24upx;
        }
      }

      .count-price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 24upx 0;

        .item {
          width: 315upx;
          height: 96upx;
          background-color: #F5F4F5;
          border-radius: 16upx;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 26upx;
          color: #888889;
          padding: 0 24upx;
          box-sizing: border-box;

          .item-price {
            font-weight: 500;
            color: #000;
          }

          .count-wrapper {
            display: flex;
            align-items: center;


            .dis {
              width: 24upx;
              height: 6upx;
              flex-shrink: 0;
              margin-right: 28upx;

            }

            .add {
              width: 24upx;
              height: 24upx;
              flex-shrink: 0;
              margin-left: 28upx;
            }

            .count {
              color: #000000;
              font-size: 26upx;
              font-weight: 500;
            }
          }


        }
      }
    }

    .title {
      font-size: 28upx;
      font-weight: 500;
      color: #000000;
      margin-right: 72upx;
      white-space: nowrap;

      &.flex {
        display: flex;
        align-items: center;

        .required {
          padding: 4upx 14upx;
          border: 1upx solid #EF530E;
          font-size: 18upx;
          color: #EF530E;
          margin-left: 6upx;
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      &.justify {
        width: 112upx;
        text-align-last: justify;
      }
    }

    .value {
      color: #222229;
      margin-right: 0 !important;

      .address-icon {
        width: 21upx;
        height: 21upx;
        flex-shrink: 0;
        margin-left: 14upx;
      }


      .tag {
        padding: 4upx 14upx;
        border-radius: 100px;
        font-size: 18upx;
        color: #fff;
        background-color: #4972FE;
        margin-left: 5upx;
      }



      &.flex {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
    }

    .bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 104upx;
    }

    .shop-choose {
      padding: 20upx 24upx;
      border-radius: 16upx;
      background-color: #F5F4F5;
      margin: 32upx 0 20upx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .shop-name {
        display: flex;
        align-items: center;

        .tag {
          text-align: center;
          line-height: 32upx;
          width: 64upx;
          height: 32upx;
          border-radius: 100upx;
          font-size: 18upx;
          color: #888889;
          border: 1upx solid #888889;
          margin-left: 22upx;
        }
      }



      .uni-btn {
        width: 160upx;
        height: 56upx;
        border-radius: 100px;
        background-color: #EF530E;
        font-size: 24upx;
        color: #fff;
        font-weight: 500;
        text-align: center;
        line-height: 56upx;
      }
    }
  }

  .shop-address {
    padding: 20upx 24upx;
    border-radius: 16upx;
    background-color: #F5F4F5;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .shop-address-text {
      flex: 1;
      font-size: 26upx;
      color: #000000;
      line-height: 1.5;
      margin-right: 104upx;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;

      .tag {
        display: inline-flex;
        width: 56upx;
        height: 28upx;
        background-color: #49CE8B;
        font-size: 18upx;
        color: #fff;
        align-items: center;
        justify-content: center;
        border-radius: 100px;
        margin-right: 8upx;
      }
    }

    .distance {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .tag {
        width: 24upx;
        height: 24upx;
      }

      .distance-text {
        padding: 4upx 6upx;
        background-color: #49CE8B;
        color: #fff;
        font-size: 24upx;
        border-radius: 100px;
        margin-top: 8upx;

      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 240upx;
    background-color: #fff;
    padding: 50upx 24upx 102upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28upx;
    color: #222229;
    font-weight: 500;

    .price-text {
      font-weight: bold;
      font-weight: 32upx;
    }

    .serve-count {
      font-size: 22upx;
      color: #888889;
      line-height: 1.5;
      margin-top: 4upx;
    }

    .uni-btn {
      width: 248upx;
      height: 88upx;
      background-color: #EF530E;
      border-radius: 100px;
      text-align: center;
      line-height: 88upx;
      font-weight: 500;
      font-size: 32upx;
      color: #fff;
      transition: all 350ms;

      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>