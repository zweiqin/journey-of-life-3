<template>
  <view class="bank-card-container">
    <JHeader tabbar="/pages/user/user" width="50" height="50" title="银行卡列表"></JHeader>
    <view style="width: 70%; margin: 14rpx auto 14rpx">
      <tui-button type="blue" bold shape="circle" width="100%" @click="handleAddCard"> 新增银行卡 </tui-button>
    </view>
    <view v-if="bankCardList && bankCardList.length">
      <view v-for="(item, index) in bankCardList" :key="index" class="" style="padding-bottom: 35upx">
        <tui-card :title="{ text: `${item.bankName || '--'}` }" :tag="{ text: `持有者ID：${item.userId || '--'}` }" style="margin: 0">
          <template #body>
            <view style="padding: 16upx 24upx 26upx; font-size: 28upx">
              <!-- style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" -->
              <view>银行名称：{{ item.bankName || '--' }}</view>
              <view>开卡银行名称：{{ item.openCardBank || '--' }}</view>
              <view>卡号：{{ item.cardNo || '--' }}</view>
              <view>关联手机号：{{ item.mobile || '--' }}</view>
            </view>
          </template>
          <template #footer>
            <view style="padding: 0 20rpx 20rpx; text-align: right">
              <tui-button
                type="warning"
                width="120rpx"
                height="50rpx"
                shape="circle"
                style="display: inline-block"
                @click="go(`/user/sever/bank-card/bank-card-form?id=${item.id}`)"
              >
                编辑
              </tui-button>
            </view>
          </template>
        </tui-card>
      </view>
    </view>
    <view v-else>
      <tui-no-data>暂无数据</tui-no-data>
    </view>

    <!-- 判断微信绑定手机号 -->
    <TuanWXLoginBindMobile @close="handleClose" @success="handleBindSuccess" ref="tuanWXLoginBindMobileRef"></TuanWXLoginBindMobile>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getBankCardListUserApi } from '../../../api/user';
import { USER_INFO } from '../../../constant';
const app = getApp();

export default {
  name: 'BankCard',
  data() {
    return {
      userInfo: {},
      bankCardList: []
    };
  },
  onShow() {
    this.userInfo = uni.getStorageSync(USER_INFO);
    this.$nextTick(() => {
      if (this.checkedIsBindMobile()) {
        this.getBankCardList();
      }
    });
  },

  methods: {
    getBankCardList() {
      uni.showLoading({
        title: '加载中'
      });
      if (!this.userInfo.phone) return this.$showToast('获取用户手机号失败');
      getBankCardListUserApi({ mobile: this.userInfo.phone })
        .then((data) => {
          this.bankCardList = data || [];
          uni.hideLoading();
        })
        .catch(() => {
          uni.hideLoading();
        });
    },

    // 绑定成功
    handleBindSuccess() {
      this.$store.dispatch('auth/refrshUserInfoAction', (userInfo) => {
        this.userInfo = userInfo;
      });
    },

    // 检查是否绑定了手机号
    checkedIsBindMobile() {
      if (this.userInfo && this.userInfo.weixinOpenid && !this.userInfo.phone) {
        this.ttoast({
          type: 'info',
          title: '您还没有绑定手机号，请先绑定手机号'
        });

        this.$refs.tuanWXLoginBindMobileRef.show();
        return false;
      } else {
        return true;
      }
    },

    // 新增银行卡
    handleAddCard() {
      if (this.checkedIsBindMobile()) {
        this.go(`/user/sever/bank-card/bank-card-form`);
      }
    },

    //
    handleClose() {
      app.globalData.isShowedBindMobilePopu = true;
    }
  }
};
</script>

<style lang="less" scoped>
.bank-card-container {
  min-height: 100vh;
  padding: 40upx 24upx 140upx 24upx;
  box-sizing: border-box;
  background-color: #eeeeee;
}
</style>
