<template>
  <view class="account-book-container">
    <view class="main">
      <NewHeader
        title="小账本"
        position="left"
        top="37%"
        :left="-10"
        color="#fff"
        padding="0 0 20upx 0upx"
        tabbar="/pages/user/user"
      >
        <block slot="right">
          <tui-icon name="share" color="#fff"></tui-icon>
        </block>
      </NewHeader>

      <Extension></Extension>
      <Fans></Fans>
      <Gen></Gen>
      <Analysis></Analysis>
    </view>
  </view>
</template>

<script>
import Extension from './cpns/extension.vue'
import Fans from './cpns/fans.vue'
import Gen from './cpns/gen/gen.vue'
import Analysis from './cpns/analysis/index.vue'
export default {
  components: {
    Extension,
    Fans,
    Gen,
    Analysis,
  },
}
</script>

<style lang="less" scoped>
.account-book-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f9f9f9;

  .main {
    padding: 72upx 22upx 0;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 2;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 386upx;
      top: 0;
      left: 0;
      position: absolute;
      background-color: #e95d20;
      border-bottom-left-radius: 400upx 40upx;
      border-bottom-right-radius: 400upx 40upx;
      z-index: -1;
    }

    /deep/ .title {
      color: #fff;
    }

    /deep/ .slot-pane {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .item {
        width: 33%;
        text-align: center;

        .value {
          font-size: 40upx;
          font-weight: bold;
          margin-top: 10upx;
        }
      }
    }
  }
}
</style>
