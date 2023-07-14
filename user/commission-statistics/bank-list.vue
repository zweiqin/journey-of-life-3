<template>
  <view class="bank-list-page">
    <TuanPageHead :scrollTop="scrollTop" color="#fff" fixed fixed-color="#3d3d3d" title="我的银行卡">
      <tui-icon @click="handleBack" slot="left" name="arrowleft" :color="scrollTop > 300 ? '#3d3d3d' : '#fff'"></tui-icon>
      <view @click="getCommanderBankCardList" slot="right">刷新</view>
    </TuanPageHead>

    <view class="list">
      <LoadingMore v-show="loading !== 'none'" :status="loading"></LoadingMore>
      <view class="item add" v-if="bankList.length" @click="go('/user/commission-statistics/bank-item')">
        <tui-icon color="#3f3f3f" name="add-fill" :size="26"></tui-icon>
        <text class="text">添加银行卡</text>
        <tui-icon :size="26" color="#d6d6d6" name="toright"></tui-icon>
      </view>

      <view class="bank-card-list">
        <view class="item card" v-for="item in bankList" :key="item.id">
          <view class="card-header">
            <!-- <view class="open-bank-name">{{ item.openCardBank }}</view> -->
            <image class="card-xin" src="../../static/images/new-user/group/card-xin.png"></image>
            <button class="edit-btn uni-btn" @click="handleEditBankInfo(item)">修改信息</button>
          </view>

          <!-- <view class="bank-name">{{ item.bankName }}</view> -->

          <view class="bank-card">
            <text class="number">****</text>
            <text class="number">****</text>
            <text class="number">****</text>
            <text class="number">{{ item.cardNo.slice(-4) }}</text>
          </view>

          <view class="card-info">
            <view class="name-info">
              <view class="bank-name">{{ item.bankName }}</view>
              <view class="open-card-name">{{ item.openCardBank }}</view>
            </view>

            <view class="add-time">
              <view class="title">Add Time </view>
              <view class="time">{{ item.createTime | formatTime }}</view>
              <view></view>
            </view>
          </view>
        </view>

        <view class="no-data" v-if="!bankList.length && loading != 'loading'" @click="go('/user/commission-statistics/bank-item')">
          <svg t="1689306123667" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2396" width="64" height="64">
            <path
              d="M921.355737 218.860636 100.596627 218.860636c-21.667485 0-39.23049 17.429974-39.23049 38.925544l0 508.59853c0 21.379936 17.544585 38.923498 39.23049 38.923498l820.759109 0c21.667485 0 39.23049-17.427928 39.23049-38.923498L960.586227 257.786181C960.586227 236.405221 943.023222 218.860636 921.355737 218.860636zM276.397562 707.624423c0 10.766205-8.857738 19.490913-19.491936 19.490913L139.501706 727.115336c-10.766205 0-19.491936-8.857738-19.491936-19.490913L120.009769 590.221526c0-10.766205 8.857738-19.490913 19.491936-19.490913l117.402897 0c10.767228 0 19.491936 8.856715 19.491936 19.490913L276.396539 707.624423zM735.704456 688.019922 442.633654 688.019922c-16.246009 0-29.398564-13.021571-29.398564-29.323862 0-16.186657 12.942777-29.321816 29.398564-29.321816l293.070802 0c16.246009 0 29.398564 13.019525 29.398564 29.321816C765.104043 674.884764 752.160243 688.019922 735.704456 688.019922zM833.522296 688.019922c-16.208147 0-29.321816-13.135158-29.321816-29.323862 0-16.186657 13.113669-29.321816 29.321816-29.321816 16.207124 0 29.321816 13.135158 29.321816 29.321816C862.844112 674.884764 849.729419 688.019922 833.522296 688.019922zM921.48979 394.96754c0 10.709923-8.667404 19.376303-19.490913 19.376303L119.953488 414.343843c-10.766205 0-19.490913-8.818853-19.490913-19.376303l0-78.536704c0-10.709923 8.667404-19.376303 19.490913-19.376303l782.045389 0c10.766205 0 19.490913 8.819876 19.490913 19.376303L921.48979 394.96754z"
              fill="#fff"
              p-id="2397"
            ></path>
          </svg>
          <view>您还未添加银行卡，点击添加</view>
        </view>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { USER_INFO } from 'constant';
import { getCommanderBankCardListApi } from '../../api/user';
export default {
  data() {
    return {
      scrollTop: 0,
      bankList: [],
      loading: false
    };
  },

  onLoad() {
    this.userInfo = uni.getStorageSync(USER_INFO);
    if (this.userInfo) {
      this.getCommanderBankCardList();
    }
  },

  filters: {
    formatTime(value) {
      if (!value) return value;
      return value.split(' ')[0].replaceAll('-', '/').slice(2);
    }
  },

  methods: {
    handleBack() {
      uni.navigateBack();
    },
    async getCommanderBankCardList() {
      console.log(1);
      try {
        this.loading = 'loading';
        const res = await getCommanderBankCardListApi({
          mobile: this.userInfo.phone
        });

        this.bankList = res;
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '银行卡列表获取失败',
          content: error
        });

        this.bankList = [];
      } finally {
        this.loading = 'more';
        uni.stopPullDownRefresh();
      }
    },

    // 点击修改
    handleEditBankInfo(data) {
      uni.navigateTo({
        url: `/user/commission-statistics/bank-item?openCarBank=${data.openCardBank}&bankName=${data.bankName}&id=${data.id}&cardNo=${data.cardNo}`
      });
    }
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },

  onPullDownRefresh() {
    this.getCommanderBankCardList();
  }
};
</script>

<style lang="less" scoped>
.bank-list-page {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #404558;

  .list {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120upx);
    justify-content: space-between;
    padding: 40upx;
    overflow: scroll;
    box-sizing: border-box;
    // background-color: #f3f7fa;

    .item {
      border-radius: 40upx;
      width: 100%;
      height: 400upx;
      background-color: aqua;
      margin-bottom: 20upx;
      padding: 40upx;
      box-sizing: border-box;

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 32upx;
        font-weight: 500;
        color: #fff;
        margin-bottom: 20upx;

        .card-xin {
          width: 69upx;
          height: 55upx;
        }

        .edit-btn {
          font-size: 28upx;
          color: #fff;
        }
      }

      .bank-name {
        color: #fff;
      }

      .card-info {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 70upx;
        color: #fff;
        font-size: 24upx;
        line-height: 1.5;

        .open-card-name {
          font-weight: bold;
          font-size: 36upx;
        }

        .add-time {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .time {
            font-size: 36upx;
            font-weight: 500;
          }
        }
      }

      .bank-card {
        width: 100%;
        margin-top: 40upx;
        // text-align: center;
        .number {
          color: #fff;
          margin-right: 20upx;
          font-size: 44upx;
          letter-spacing: 0.2em;
        }
      }

      &.card {
        &:nth-of-type(1) {
          background: url('../../static/images/new-user/group/bank-bg-1.png') no-repeat;
          background-size: cover;
        }

        &:nth-of-type(2) {
          background: url('../../static/images/new-user/group/bank-bg-2.png') no-repeat;
          background-size: cover;
        }

        &:nth-of-type(3) {
          background: url('../../static/images/new-user/group/bank-bg-3.png') no-repeat;
          background-size: cover;
        }

        &:nth-of-type(4) {
          background: url('../../static/images/new-user/group/bank-bg-4.png') no-repeat;
          background-size: cover;
        }


        background: linear-gradient(45deg, #02cafd 2%, #83f8a6 97%);

        // &:nth-child(2n) {
        //   background: linear-gradient(21deg, #93278f -2%, #29abe2 67%);
        // }
      }
    }

    .add {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 128upx;
      width: 100%;
      background-color: #fff;
      padding: 10upx 20upx;
      box-sizing: border-box;
      font-size: 32upx;
      font-weight: 500;
      border-radius: 20upx;
      transition: all 350ms;
      flex-shrink: 0;

      &:active {
        background-color: #bbbbbb;
      }

      .text {
        flex: 1;
        text-align: left;
        margin-left: 20upx;
      }
    }

    .no-data {
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 28upx;
      color: #fff;
      border: 1upx dotted;
      padding: 20upx 0;

      transition: all 350ms;

      &:active {
        background-color: #494b55;
      }
    }
  }
}
</style>
