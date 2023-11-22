<template>
  <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="chooseShopSiteVisite" @close="handleCloseChooseSitePopup">
    <view class="add-serve-main">
      <PopupHeader @cancel="handleCloseChooseSitePopup" @confirm="handleConfirm">
        <view class="popup-title">选择网点</view>
      </PopupHeader>

      <view class="shop-site-list">
        <scroll-view scroll-y class="scroll-view">
          <view class="site-item" v-for="item in 10" :key="item">
            文化社区店
            <tui-icon class="check" :size="20" name="circle-fill" color="#DCDDDD"> </tui-icon>
          </view>
        </scroll-view>
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
      chooseShopSiteVisite: false
    }
  },

  methods: {
    show() {
      this.chooseShopSiteVisite = true
    },

    handleCloseChooseSitePopup() {
      this.chooseShopSiteVisite = false
    },

    // 确认选择服务
    handleConfirm() {
      console.log("选择了");
      this.handleCloseChooseSitePopup()
    }
  },
}
</script>

<style lang="less" scoped>
.add-serve-main {
  background-color: #fff;
  height: 600upx;

  .popup-title {
    color: #222229;
    font-size: 32upx;
  }

  .shop-site-list {
    height: 504upx;

    .scroll-view {
      height: 504upx;

      .site-item {
        position: relative;
        width: 100%;
        height: 96upx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #DCDDDD;

        transition: all 350ms;

        &:active{
          background-color: #f3f3f3;
        }

        .check {
          position: absolute;
          right: 32upx;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>