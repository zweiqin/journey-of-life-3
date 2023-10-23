<template>
  <view class="choose-type-page">
    <view style="display: flex; align-items: center; justify-content: flex-end">
      <!-- <tui-icon :size="30" name="toleft"></tui-icon> -->
      <button @click="skipModalVisible = true" class="uni-btn skip-btn">跳过</button>
    </view>

    <view class="page-title-wrapper">
      <view class="main-title">欢迎进入商家端</view>
      <view class="tip">选择您的门店标签 </view>
    </view>

    <view class="style-list">
      <view class="style-header">
        <view class="title">行业标签</view>
        <view class="choose-all" @click="handleSelectAll">
          <view class="circle">
            <tui-icon v-show="selectAllStatus" :size="16" color="#EF530E" name="check"></tui-icon>
          </view>
          <text class="text"> 全选 </text>
        </view>
      </view>

      <view class="list">
        <view class="item" v-for="item in shopStyleList" @click="handleChooseStyle(item)">
          <view class="image-wrapper">
            <image class="icon" :src="item.labelUrl"></image>
            <view class="choose" v-if="item.labelName">
              <tui-icon v-show="currentSelectStyle.includes(item.id)" :size="16" color="#EF530E" name="check"></tui-icon>
            </view>
          </view>

          <view class="style-name">{{ item.labelName }}</view>
        </view>
      </view>
    </view>

    <view class="footer">
      <button
        @click="handleConfirmStyle"
        :style="{
          opacity: currentSelectStyle.length ? '1' : '0.6'
        }"
        class="uni-btn"
      >
        {{ currentSelectStyle.length ? `已选${currentSelectStyle.length}种商圈类型` : '请选择行业标签' }}
      </button>
    </view>

    <Loading color="#3982f1" v-show="isLoading"></Loading>
    <tui-toast ref="toast"></tui-toast>

    <tui-modal :show="skipModalVisible" @click="handleSkipRes" @cancel="skipModalVisible = false" title="提示" content="是否取消入驻？"></tui-modal>
  </view>
</template>

<script>
import { getShopStyleListApi } from '../../../api/community-center';
import Loading from '../../../pages/order/components/Loading.vue';

export default {
  components: {
    Loading
  },
  data() {
    return {
      currentSelectStyle: [],
      isLoading: false,
      shopStyleList: [],
      originShopStyleList: [],
      skipModalVisible: false
    };
  },

  onLoad() {
    this.getShopStyleList();
  },

  methods: {
    async getShopStyleList() {
      try {
        this.isLoading = true;
        const res = await getShopStyleListApi();
        this.originShopStyleList = JSON.parse(JSON.stringify(res));
        this.shopStyleList = res;
        const row = Math.ceil(res.length / 5);
        const emptyObjCount = 5 * row - res.length;
        for (let i = 0; i < emptyObjCount; i++) {
          this.shopStyleList.push({});
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: error,
          message: '行业标签获取失败'
        });
      } finally {
        this.isLoading = false;
      }
    },

    // 选择单个
    handleChooseStyle(styleInfo) {
      if (!styleInfo.id) return;
      if (this.currentSelectStyle.includes(styleInfo.id)) {
        this.currentSelectStyle = this.currentSelectStyle.filter((id) => id !== styleInfo.id);
      } else {
        this.currentSelectStyle.push(styleInfo.id);
      }
    },

    // 全选
    handleSelectAll() {
      if (this.selectAllStatus) {
        this.currentSelectStyle = [];
      } else {
        this.currentSelectStyle = this.originShopStyleList.map((item) => item.id);
      }
    },

    // 确认选择
    handleConfirmStyle() {
      if (!this.currentSelectStyle.length) {
        this.ttoast({
          type: 'info',
          title: '请选择行业标签'
        });
        return;
      }

      uni.navigateTo({ url: '/community-center/merchant-settlement/authentication/index?labelIds=' + this.currentSelectStyle.join(',') });
    },

    // 是否取消认证
    handleSkipRes(e) {
      if (e.index) {
        uni.switchTab({ url: '/pages/community-center/community-centerr' });
      } else {
        this.skipModalVisible = false;
      }
    }
  },

  computed: {
    selectAllStatus() {
      return this.currentSelectStyle.length === this.originShopStyleList.length;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .loading-container {
  height: 100vh;
}

@main-color: #222229;
.choose-type-page {
  padding: 30upx;
  box-sizing: border-box;
  height: 100vh;
  overflow: scroll;

  .skip-btn {
    color: @main-color;
    font-size: 28upx;
  }

  .page-title-wrapper {
    margin: 24upx 0 48upx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .main-title {
      font-size: 38upx;
      font-weight: 500;
      color: @main-color;
      margin-bottom: 24upx;
    }

    .tip {
      color: #888889;
      font-size: 28upx;
    }
  }

  .style-list {
    padding-bottom: 100upx;
    .style-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        color: @main-color;
        font-size: 32upx;
      }

      .choose-all {
        display: flex;
        align-items: center;
        font-size: 24upx;
        color: #888889;

        .circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32upx;
          height: 32upx;
          border-radius: 50%;
          border: 1upx solid @main-color;
        }

        .text {
          margin-left: 8upx;
        }
      }
    }

    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 55upx;
      padding: 0 30upx;
      box-sizing: border-box;

      .item {
        margin-right: 36upx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 30upx;

        &:nth-child(5n) {
          margin-right: 0;
        }
      }

      .image-wrapper {
        position: relative;
        width: 80upx;
        height: 80upx;
        position: relative;
        margin-bottom: 20upx;

        .choose {
          position: absolute;
          top: -16upx;
          right: -22upx;
          width: 34upx;
          height: 34upx;
          border-radius: 50%;
          border: 1upx solid #222229;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon {
          width: 100%;
          height: 100%;
          border-radius: 10upx;
        }
      }

      .style-name {
        font-size: 24upx;
        color: #222229;
        width: 80upx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120upx;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0px -1px 0px 0px #e6e6e8;

    .uni-btn {
      width: 690upx;
      height: 88upx;
      background-color: #3982f1;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32upx;
    }
  }
}
</style>
