<template>
  <view class="charts-container">
    <view
      class="item"
      :style="{ width: 100 / formLabels.length + '%' }"
      v-for="(item, index) in data"
      :key="index"
    >
      <view
        @transitionend="isShowTip = true"
        class="line"
        :style="{ borderColor: item.color, height: item.height * 1.1 + '%' }"
      >
        <view
          class="dot"
          :style="{ background: item.color, bottom: item.height + '%' }"
        ></view>

        <view
          class="tip"
          v-if="isShowTip"
          :style="{ background: item.color }"
          >{{ item.orderQuantity }}</view
        >
      </view>
      <view class="title">{{ item.label }}</view>
    </view>

    <view class="mask">
      <view class="mask-item" v-for="item in 10" :key="item"></view>
    </view>
  </view>
</template>

<script>
import { formLabels } from './config'
export default {
  props: {
    data1: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      data: formLabels,
      formLabels: Object.freeze(formLabels),
      isShowTip: false,
    }
  },

  watch: {
    data1: {
      handler(value) {
        this.initCharts(value)
      },

      immediate: true,
      deep: true,
    },
  },

  methods: {
    initCharts(value) {
      if (!Array.isArray(value)) {
        return
      }

      const values = value.map(item => item.orderQuantity)
      console.log(values);
      const maxCount = Math.max(...values)
      this.data = formLabels.map((item, index) => {
        // const currentItem = value.find(item1 => item1.typeName === item.label)
        item.height = Math.floor((values[index] / maxCount) * 70)
        item.orderQuantity = values[index]
        return item
      })
      this.isShowTip = true
    },
  },
}
</script>

<style lang="less" scoped>
.charts-container {
  position: relative;
  width: 100%;
  height: 600upx;
  margin-top: 30upx;
  margin-bottom: 20upx;
  display: flex;
  align-items: center;

  .item {
    position: relative;
    height: 100%;
    padding-bottom: 40upx;
    z-index: 10;

    .line {
      position: absolute;
      bottom: 46upx;
      left: 50%;
      transform: translateX(-50%);
      width: 1px;
      border-left: 1px dotted rgba(0, 255, 145, 0.726);
      height: calc(100% - 40upx);

      .dot {
        position: absolute;
        background-color: rgb(244, 0, 0);
        bottom: 0;
        left: 50%;
        width: 14upx;
        height: 14upx;
        border-radius: 50%;
        transform: translateX(-10upx);
        transition: bottom 500ms ease-in-out;
      }

      .tip {
        position: absolute;
        top: 0;
        // left: 50%;
        height: 34upx;
        width: 84upx;
        color: #fff;
        text-align: center;
        line-height: 34upx;
        transform: translateX(-50%);
        transition: all 350ms;
        // opacity: 0;
        animation: fadeInUp 500ms ease-in-out;
      }

      @keyframes fadeInUp {
        0% {
          opacity: 0;
          -webkit-transform: translate3d(0, 100%, 0);
          transform: translate3d(-50%, 100%, 0);
        }

        100% {
          opacity: 1;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(-50%, 0, 0);
        }
      }
    }

    .title {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 40upx;
      width: 100%;
      // background-color: aquamarine;
      text-align: center;
      color: #000 !important;
      background-color: #fff;
      padding-top: 10upx;
      // font-weight: bold;
    }
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    .mask-item {
      width: 100%;
      height: 60upx;
      box-sizing: border-box;
      border-bottom: 1upx dotted #ccc;
    }
  }
}
</style>
