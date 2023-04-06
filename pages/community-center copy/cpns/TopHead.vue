<template>
  <view class="search-bar">
    <view class="location" @click.stop="handleClick">
      <!-- <JIcon type="locale" width="34" height="40"></JIcon> -->
      <TuanLocation>
        <view class="text">{{ $store.getters.currentCity || '龙江镇' }}</view>
      </TuanLocation>
      <img
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9ujhwq408rlpm9vsxn8w.png"
        alt=""
        class="show"
      />
    </view>
    <view class="search-box" @click="go('/community-center/search')">
      <view class="search">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/2qpjht84e85rhmt6y1ce.png"
          alt=""
          class="img"
        />
      </view>
      <input
        type="text"
        class="content"
        placeholder="搜索社区服务，一站式解决家居问题"
      />
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.search-bar {
  background: #d8d8d8;
  display: flex;
  align-items: center;
  padding: 0 30upx;
  height: 110upx;
  box-sizing: border-box;
  background-color: #e95d20;
  .location {
    display: flex;
    align-items: center;
    .text {
      font-size: 36upx;
      font-weight: 500;
      color: #ffffff;
    }
    .show {
      width: 32upx;
      height: 32upx;
    }
  }
  .search-box {
    padding: 0upx 20upx;
    display: flex;
    flex: 1;
    align-items: center;
    width: 540upx;
    height: 74upx;
    border-radius: 100upx;
    background: #ffffff;
    .search {
      width: 48upx;
      // height: 32upx;
      border-right: 2upx solid #d8d8d8;
      .img {
        width: 32upx;
        height: 32upx;
      }
    }
    .content {
      padding-left: 14upx;
      flex: 1;
      font-size: 24upx;
      font-weight: 400;
      color: #3d3d3d;
    }
  }
}
</style>
