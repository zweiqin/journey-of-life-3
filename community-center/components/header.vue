<template>
  <view
    class="header-container"
    :style="{
      background: bgc,
    }"
  >
    <tui-icon name="arrowleft" color="#ffffff" :size="28" margin="0 0 0 0" @click="back" style="float: left;"></tui-icon>
    <view>{{ title }}</view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    bgc: {
      type: String,
      default: '#0090ff',
    },

    redirect: String,
    tabbar: String,
  },
  methods: {
    back() {
      console.log(this.tabbar)
      if (this.redirect) {
        uni.redirectTo({
          url: this.redirect,
        })

        return
      } else if (this.tabbar) {
        uni.switchTab({
          url: this.tabbar,
        })
      } else {
        uni.navigateBack()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.header-container {
  width: 100%;
  height: 100upx;
  line-height: 100upx;
  padding: 0 20upx;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
}
</style>
