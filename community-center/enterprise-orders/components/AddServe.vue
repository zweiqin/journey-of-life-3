<template>
  <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="addServeVisible" @close="handleCloseAddServe">
    <view class="add-serve-main">
      <PopupHeader @cancel="handleCloseAddServe" @confirm="handleChosseServe">
        <view class="popup-title">添加服务</view>
      </PopupHeader>

      <view class="serve-list-wrapper">
        <view class="serve-wrapper">
          <view class="serve-item" v-for="item in 12" :key="item">
            <view class="serve-name">家具维修</view>
            <tui-icon :size="20" color="#DCDDDD" name="circle-fill"></tui-icon>
          </view>
        </view>
        <view class="total">
          已选服务: <text class="serve-count">2项</text>
        </view>
      </view>
    </view>
  </tui-bottom-popup>
</template>

<script>
import PopupHeader from './PopupHeader.vue'
export default {
  components: {
    PopupHeader
  },

  data() {
    return {
      addServeVisible: false,
      serveList: [],
      selectServe: []
    }
  },

  methods: {
    show(selectServe, serveList) {
      this.addServeVisible = true
      this.serveList = serveList
      this.selectServe = selectServe
    },

    handleCloseAddServe() {
      this.addServeVisible = false
    },

    // 确认选择服务
    handleChosseServe() {
      console.log("选择了");
      this.handleCloseAddServe()
    }
  },
}
</script>

<style lang="less" scoped>
.add-serve-main {
  background-color: #fff;

  .popup-title {
    color: #222229;
    font-size: 32upx;
  }

  .serve-list-wrapper {
    width: 100%;
    padding: 32upx;
    box-sizing: border-box;

    .serve-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      .serve-item {
        border: 1upx solid #DCDDDD;
        color: #DCDDDD;
        width: 204upx;
        height: 80upx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 18upx;
        margin-bottom: 32upx;

        .serve-name {
          width: 130upx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 32upx;
          margin-right: 4upx;
        }
      }
    }

    .total {
      text-align: center;
      font-size: 32upx;
      color: #222229;

      .serve-count {
        color: #EF530E;
        margin-left: 0.8em;
      }
    }
  }
}
</style>