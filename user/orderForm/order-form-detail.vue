<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-14 11:18:08
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-15 10:44:45
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\user\orderForm\order-form-detail-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
.<template>
  <view>
    <!-- 标题栏 -->
    <view class="order-form-detail-title">
      <view class="left-view">
        <img
          @click="back"
          class="left-img"
          src="../../static/images/store/chevron-states.png"
          alt=""
        />
      </view>
      <view class="middle-view">
        <view class="text">我的订单</view>
      </view>
      <view class="right-view"> </view>
    </view>
    <!-- 订单状态栏 -->
    <view class="order-form-detail-type">
      <!-- 订单完成状态 0=完成 -->
      <view class="type-accomplish" v-if="orderFormDetail == 0">
        <view class="accomplish-background">
          <img
            src="../../static/images/lqb/orderform/accomplish.png"
            alt=""
            class="accomplish-img"
          />
          <view class="accomplish-text">交易完成</view>
        </view>
      </view>
      <!-- 订单完成状态 1= 未完成 -->
      <view class="type-noaccomplish" v-if="orderFormDetail == 1">
        <view class="noaccomplish-background">
          <img
            src="../../static/images/lqb/orderform/accomplish.png"
            alt=""
            class="noaccomplish-img"
          />
          <view class="noaccomplish-text">交易待完成</view>
        </view>
      </view>
    </view>
    <!-- 订单用户详情 -->
    <view class="order-form-detail-userdetail">
      <view class="user-detail">
        <img
          src="../../static/images/lqb/orderform/userdetail.png"
          alt=""
          class="userdetail-img"
        />
        <view class="detail-text">姓名</view>
        <view class="user-name"> {{ this.userdetail.username }}</view>
        <view class="user-phone">{{ this.userdetail.userphone }}</view>
      </view>
      <view class="user-appointment-time">
        <img
          src="../../static/images/lqb/orderform/appointmentTime.png"
          alt=""
          class="appointmentTime"
        />
        <view class="appointment-text">预约时间</view>
        <view class="appointment-time">{{
          this.userdetail.appointmentTime
        }}</view>
      </view>
      <view class="user-location">
        <img
          src="../../static/images/lqb/orderform/location.png"
          alt=""
          class="location"
        />
        <view class="location-text">地址</view>
        <view class="location-detail">{{ this.userdetail.location }}</view>
      </view>
    </view>
    <!-- 分界线 -->
    <view class="order-form-detail-boundary"> </view>
    <!-- 服务站 -->
    <view class="order-form-detail-serve">
      <view class="serve-station">
        <view class="serve-text">服务站</view>
        <view class="serve-name">{{ this.servedetail.serveName }}</view>
      </view>
      <view class="serve-install">
        <view class="install-name">安装进度</view>
        <view class="install-detail">师傅已上门</view>
        <view class="install-detail">师傅未上门</view>
      </view>
      <view class="serve-message">
        <view class="message-text">服务信息</view>
        <view class="message-detail">{{
          this.servedetail.installMessage
        }}</view>
      </view>
      <view class="serve-paymoney">
        <view class="paymoney-text">支付金额</view>
        <view class="paymoney-right">
          <view class="paymoney-goodsnumber"
            >共{{ this.servedetail.goodsnumber }}件商品</view
          >
          <view class="paymoney-money">{{ this.servedetail.payMoney }}元</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    name() {},
  },
  data() {
    return {
      orderFormDetail: 0,
      userdetail: {
        id: 1,
        username: "白大拿",
        userphone: "11122233311",
        appointmentTime: "08月18日(周四) 19:00",
        location: "佛山市顺德区龙江镇亚洲国际材料城五栋三楼团蜂科技",
      },
      servedetail: {
        id: 1,
        serveName: "团蜂家居社区服务站",
        installType: 0,
        installMessage: "空调安装",
        goodsnumber: 1,
        payMoney: 300,
      },
      collectionType: {
        type: 0,
      },
    };
  },
};
</script>

.<style lang="less" scoped>
.order-form-detail-serve {
  .serve-station {
    display: flex;
    .serve-text {
    }
    .serve-name {
    }
  }
  .serve-install {
    display: flex;
    .install-name {
    }
    .install-detail {
    }
  }
  .serve-message {
    display: flex;
    .message-text {
    }
    .message-detail {
    }
  }
  .serve-paymoney {
    display: flex;
    .paymoney-text {
    }
    .paymoney-right {
      display: flex;
      .paymoney-goodsnumber {
      }
      .paymoney-money {
      }
    }
  }
}
.order-form-detail-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60upx;
  .left-view {
    display: flex;
    .left-img {
      height: 48upx;
      width: 48upx;
    }
  }
  .middle-view {
    flex: 1;
    margin-left: 244upx;
    .text {
    }
  }
  .right-view {
  }
}
.order-form-detail-type {
  .type-accomplish {
    .accomplish-background {
      display: flex;
      width: 750upx;
      height: 110upx;
      background: linear-gradient(90deg, #07b9b9 0%, rgba(0, 181, 120, 0) 103%);
      align-items: center;
      .accomplish-img {
        width: 44upx;
        height: 44upx;
        margin-right: 20upx;
        margin-left: 60upx;
      }
      .accomplish-text {
        color: white;
        font-size: 36upx;
      }
    }
  }
  .type-noaccomplish {
    .noaccomplish-background {
      display: flex;
      width: 750upx;
      height: 110upx;
      background: linear-gradient(
        90deg,
        #fa5151 0%,
        #ffffff 103%,
        rgba(0, 181, 120, 0) 103%
      );
      align-items: center;
      .noaccomplish-img {
        width: 44upx;
        height: 44upx;
        margin-right: 20upx;
        margin-left: 60upx;
      }
      .noaccomplish-text {
        color: white;
        font-size: 36upx;
      }
    }
  }
}
.order-form-detail-userdetail {
  margin-left: 60upx;
  margin-top: 50upx;
  .user-detail {
    display: flex;
    align-items: center;
    margin-bottom: 36upx;
    .userdetail-img {
      width: 27upx;
      height: 40upx;
      margin-right: 17upx;
    }
    .detail-text {
      font-size: 24upx;
      font-weight: 400;
      margin-right: 20upx;
    }
    .user-name {
      font-size: 24upx;
      font-weight: 350;
      margin-right: 28upx;
    }
    .user-phone {
      font-size: 24upx;
      font-weight: 350;
    }
  }
  .user-appointment-time {
    display: flex;
    margin-bottom: 36upx;
    .appointmentTime {
      width: 27upx;
      height: 27upx;
      margin-right: 17upx;
    }
    .appointment-text {
      font-size: 24upx;
      font-weight: 400;
      margin-right: 28upx;
    }
    .appointment-time {
      font-size: 24upx;
      font-weight: 350;
      color: #ff8f1f;
    }
  }
  .user-location {
    display: flex;
    .location {
      width: 27upx;
      height: 33upx;
      margin-right: 15upx;
    }
    .location-text {
      white-space: nowrap;
      margin-right: 32upx;
      font-size: 24upx;
      font-weight: 400;
    }
    .location-detail {
      font-size: 24upx;
      font-weight: 350;
      color: #07b9b9;
      padding-right: 100upx;
    }
  }
}
.order-form-detail-boundary {
  border: 0.5px solid #d8d8d8;
  width: 90%;
  margin: 0 auto;
  margin-top: 34upx;
}
</style>