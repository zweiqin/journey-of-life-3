<template>
  <view>
    <web-view :src="target"></web-view>
  </view>
</template>

<script>
export default {
  onLoad(options) {
    const { target } = options
    this.target = target
  },

  data() {
    return {
      target: ""
    }
  },
}
</script>
