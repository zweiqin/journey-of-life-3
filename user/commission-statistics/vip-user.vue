<template>
  <view class="vip-user-container">
    <TuanPageHead :scrollTop="scrollTop" fixed title="会员列表" bacokground="#fff">
      <tui-icon @click="handleBack" slot="left" name="arrowleft" color="#3d3d3d"></tui-icon>
    </TuanPageHead>

    <view class="list">
      <LoadingMore v-show="loading !== 'none'" :status="loading"></LoadingMore>

      <view class="list-container" v-if="list.length">
        <view class="item" v-for="item in list" :key="item.id">
          <image class="avatar" :src="item.avatar"></image>
          <view class="info">
            <view class="name"
              >{{ item.nickname }}
              <!-- <tui-icon margin="0 0 0 10upx" :color="item.gender === 0 ? '#10aeff' : '#f37e7d'" name="friendadd-fill" :size="18"></tui-icon> -->
              <view class="add-time">绑定时间:{{ item.addTime }}</view>
            </view>

            <view class="phone">
              <view class="phone-number">{{ item.mobile ? item.mobile.slice(0, 3) + '****' + item.mobile.slice(7) : '-' }}</view>
              <button class="uni-btn" @click="handleCallPhone(item.mobile)">
                <tui-icon class="icon" color="#fd792f" :size="16" name="voipphone"></tui-icon>
                拨打
              </button>
            </view>
          </view>
        </view>
      </view>

      <view class="no-data" v-if="!list.length && loading != 'loading'"> 暂无数据... </view>
    </view>
  </view>
</template>

<script>
import moment from 'moment';
import { USER_INFO } from 'constant';
import { getCommanderVipUserListApi } from '../../api/user';
export default {
  data() {
    return {
      scrollTop: 0,
      userInfo: null,
      list: [],
      loading: ''
    };
  },
  onLoad(params) {
    this.userInfo = uni.getStorageSync(USER_INFO);
    if (this.userInfo) {
      this.getCommanderVipUserList(params.date === 'now');
    }
  },
  methods: {
    handleBack() {
      uni.navigateBack({
        delta: 1
      });
    },

    async getCommanderVipUserList(isToday) {
      try {
        this.loading = 'loading';
        const res = await getCommanderVipUserListApi({
          mobile: this.userInfo.phone
        });

        if (res && Array.isArray(res)) {
          if (isToday) {
            const currentDate = moment().format('YYYY-MM-DD');
            this.list = res.filter((item) => {
              return currentDate == item.addTime.split(' ')[0];
            });
          } else {
            this.list = res;
          }
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '会员列表获取失败',
          content: error
        });

        this.commissionDataList = [];
      } finally {
        this.loading = 'more';
        uni.stopPullDownRefresh();
      }
    },

    handleCallPhone(phone) {
      console.log(phone);
      if (!phone) return;
      uni.makePhoneCall({
        phoneNumber: phone
      });
    }
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },

  onPullDownRefresh() {
    this.getCommanderVipUserList();
  }
};
</script>

<style lang="less" scoped>
.vip-user-container {
  width: 100vw;
  background-color: #f6f6f5;
  min-height: 100vh;

  .list {
    .list-container {
      display: flex;
      align-items: center;
      flex-direction: column;

      .item {
        margin-top: 30upx;
        padding: 20upx;
        box-sizing: border-box;
        width: 700upx;
        background-color: #fff;
        border-radius: 10upx;
        display: flex;
        align-items: center;

        .avatar {
          flex-shrink: 0;
          width: 100upx;
          height: 100upx;
          border-radius: 10upx;
        }

        .info {
          flex: 1;
          margin-left: 20upx;
          .name {
            display: flex;
            align-items: center;
            justify-content: space-between;

            font-size: 28upx;
            font-weight: 500;

            .add-time {
              font-size: 24upx;
            }
          }

          .phone {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 24upx;
            margin-top: 16upx;

            .uni-btn {
              display: flex;
              align-items: center;
              color: #fd792f;
              font-size: 24upx;

              .icon {
                margin-right: 10upx !important;
              }
            }
          }
        }
      }
    }
  }
}

.no-data {
  height: 600upx;
  width: 100vw;
  text-align: center;
  line-height: 600upx;
  color: #929292;
  font-size: 28upx;
  letter-spacing: 1em;
}
</style>
