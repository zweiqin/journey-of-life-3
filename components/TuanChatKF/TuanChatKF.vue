<template>
  <tui-popup
    :duration="500"
    :modeClass="mode"
    :styles="styles"
    :show="transShow"
    @click="transShow = false"
  >
    <view class="container">
      <image class="code-img" src="../../static/images/common/xiaojiejieweixin.png"></image>
    </view>
  </tui-popup>
</template>

<script>
export default {
  data() {
    return {
      transShow: false,
      mode: ["fade"],
      styles: {
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        background: 'rgba(0, 0, 0, 0.7)',
        'z-index': 100000000000
      },
    };
  },

  methods: {
    show() {
      this.transShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
.container{
  background-color: #fff;
  height: 700upx;
  border-radius: 20upx;
  overflow: hidden;

  .code-img{
    width: 500upx;
    height: 700upx;
  }
}
</style>
