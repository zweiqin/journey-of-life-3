<template>
  <view class="design-container">
    <Carousel></Carousel>
    <view class="choose-container">
      <Choose
        @change="handleShowPane('type', $event)"
        title="设计类型"
      ></Choose>
      <Choose
        @change="handleShowPane('cost', $event)"
        title="设计费用"
      ></Choose>
      <Choose
        @change="handleShowPane('power', $event)"
        title="设计实力"
      ></Choose>

      <view class="pane" v-show="paneVisiable">
        <view
          class="pane-item"
          :class="{ active: index === 0 }"
          v-for="(item, index) in chooseData"
          :key="item.label"
          >{{ item.label }}</view
        >
      </view>
    </view>

    <view class="main">
      <Pane></Pane>
      <Pane></Pane>
      <Pane></Pane>
      <Pane></Pane>
    </view>
  </view>
</template>

<script>
import Carousel from "../../../../components/carousel";
import Choose from "../../../../components/choose";
import Pane from "./components/pane";
import { chooses } from "./config";
export default {
  components: {
    Carousel,
    Choose,
    Pane,
  },

  data() {
    return {
      paneVisiable: false,
      chooses,
      typeIndex: 0,
      costIndex: 0,
      powerIndex: 0,
      chooseData: [],
    };
  },

  methods: {
    handleShowPane(name, status) {
      this.paneVisiable = status;
      this.chooseData = this.chooses[name];
    },
  },
};
</script>

<style lang="less" scoped>
.design-container {
  .choose-container {
    position: relative;
    display: flex;
    justify-content: space-around;
    margin-top: 12upx;
    z-index: 10;

    .pane {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      position: absolute;
      top: 32px;
      left: 0;
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0 10px 10px;
      border-radius: 0 0 10upx 10upx;

      &-item {
        width: 30%;
        font-size: 24upx;
        margin: 20upx 0;

        &.active {
          color: #ff8f1f;
        }
      }
    }
  }
}
</style>