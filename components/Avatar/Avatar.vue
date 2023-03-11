<template>
  <view class="avatar-container">
    <image
		
      :src="src"
      :mode="mode"
      :style="{
        borderRadius: radius * 2 + 'upx',
        width: size * 2 + 'upx',
        height: size * 2 + 'upx',
        margin: margin,
      }"
    />
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },

    radius: {
      type: Number,
      default: 100,
    },

    mode: {
      type: String,
    },

    size: {
      type: Number,
      default: 60,
    },

    margin: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar-container {
  image {
    flex-shrink: 0;
  }
}
</style>
