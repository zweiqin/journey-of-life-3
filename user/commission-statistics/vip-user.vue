<template>
  <view class="vip-user-container">
    <TuanPageHead :scrollTop="scrollTop" fixed title="会员列表" bacokground="#fff">
      <tui-icon @click="handleBack" slot="left" name="arrowleft" color="#3d3d3d"></tui-icon>
    </TuanPageHead>

    <view class="list">
      <LoadingMore v-show="loading !== 'none'" :status="loading"></LoadingMore>
      <view class="list-container" v-if="list.length">
        <FansPane @view="handleViewFans" v-for="item in list" :fansInfo="item" :key="item.id"></FansPane>
      </view>
      <view class="no-data" v-if="!list.length && loading != 'loading'"> 暂无数据... </view>
    </view>

    <!-- 查看会员列表 -->
    <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="subFansListVisible" @close="handleClosePopup">
      <view class="fans-list">
        <view class="fans-header">
          <view class="fans-title"><text class="user-name">{{ subFansInfo.phone }}</text> 的粉丝列表</view>
          <tui-icon class="close-icon" @click="handleClosePopup" :size="20" name="close" color="#ccc"></tui-icon>
        </view>
        <FansPane v-for="item in subFansInfo.paramLists" :fansInfo="item" :key="item.id"></FansPane>
      </view>
    </tui-bottom-popup>
  </view>
</template>

<script>
import { USER_INFO } from 'constant';
import { getFansListApi } from '../../api/anotherTFInterface'
import FansPane from './components/FansPane.vue'
export default {
  components: {
    FansPane
  },
  data() {
    return {
      scrollTop: 0,
      userInfo: null,
      list: [],
      loading: '',
      subFansListVisible: false,
      subFansInfo: {}
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
        const res = await getFansListApi({
          today: isToday ? 1 : 0
        });
        this.list = res.data.paramLists
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

    // 查看粉丝列表
    handleViewFans(currentFansInfo) {
      const { paramLists } = currentFansInfo
      if (paramLists && paramLists.length) {
        // this.subFansList = paramLists

        this.subFansInfo = currentFansInfo
        this.subFansListVisible = true
      }
    },

    // 关闭弹窗
    handleClosePopup() {
      this.subFansList = {}
      this.subFansListVisible = false
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
        align-items: flex-start;

        .avatar-wrapper {
          position: relative;
          border-radius: 10upx;
          overflow: hidden;

          .mask {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 40upx;
            background-color: rgba(0, 0, 0, 0.5);
            font-size: 24upx;
            color: #fff;
            text-align: center;
            line-height: 40upx;
          }
        }

        .avatar {
          flex-shrink: 0;
          width: 100upx;
          height: 100upx;
          border-radius: 10upx;
          display: block;
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
              color: #ccc;
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

.fans-list {
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 800upx;
  overflow: auto;

  .fans-header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    height: 90upx;
    margin-bottom: -20upx;

    .user-name {
      color: orange;
    }

    .close-icon {
      position: absolute;
      right: 40upx;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
