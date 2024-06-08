<template>
  <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="chooseCommunityVisible" @close="handleClose">
    <view class="choose-community-wrapper">
      <view class="header">
        选择小区
        <tui-icon @click="handleClose" name="close" :size="18" class="close-icon"></tui-icon>
      </view>
      <view class="list">
        <view class="community-item" @click="currentCommunityId = item.id" v-for="item in communityList" :key="item.id">
          <view class="name">
            {{ item.communityName }}
            <tui-icon name="circle-fill" v-if="currentCommunityId === item.id" color="#e95d20" :size="18"></tui-icon>
          </view>
          <view class="address">{{ item.areaAddress }}</view>
        </view>
      </view>
      <view class="btn-wrapper">
        <button class="uni-btn" @click="handleChooseCommunity">确认</button>
      </view>
    </view>
  </tui-bottom-popup>
</template>

<script>
export default {
  data() {
    return {
      currentCommunityId: undefined,
      chooseCommunityVisible: false,
      communityList: []
    }
  },

  methods: {
    handleClose() {
      this.chooseCommunityVisible = false
    },

    open(communityList) {
      if (!communityList.length) {
        return
      }
      this.chooseCommunityVisible = true
      this.communityList = communityList
      this.currentCommunityId = this.communityList[0].id
    },

    handleChooseCommunity() {
      const currentCommunityInfo = this.communityList.find((item) => item.id === this.currentCommunityId)
      if (!currentCommunityInfo) {
        this.ttoast({ type: 'fail', title: '请选择小区' })
        return
      }
      this.$emit('confirm', currentCommunityInfo)
      this.handleClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.choose-community-wrapper {
  height: 700rpx;
  background-color: #f6f6f6;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 80rpx;
    width: 100vw;
    background-color: #fff;
    font-size: 28rpx;
    font-weight: 500;

    .close-icon {
      position: absolute;
      right: 20rpx;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .list {
    width: 100%;
    height: 520rpx;
    padding: 30rpx;
    box-sizing: border-box;
    overflow-y: auto;

    .community-item {
      padding: 30rpx;
      border-radius: 10rpx;
      background-color: #fff;
      margin-bottom: 20px;
      transition: all 350ms;

      &:active {
        background-color: #f9f9f9;
      }

      .name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28rpx;
        font-weight: 500;
        color: #000;
      }

      .address {
        font-size: 24rpx;
        color: #898989;
        margin-top: 10rpx;
      }
    }
  }

  .btn-wrapper {
    height: 100rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    .uni-btn {
      height: 88rpx;
      width: 95%;
      background-color: #e95d20;
      transition: all 350ms;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      color: #fff;
      letter-spacing: 0.2em;

      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
