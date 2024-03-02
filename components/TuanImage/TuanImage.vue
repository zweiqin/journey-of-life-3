<template>
  <tui-lazyload-img background-color="transparent" class="image-wrapper" @click="$emit('click')" :width="width ? width * 2 + 'rpx' : size * 2 + 'rpx'"
    :height="height ? height * 2 + 'rpx' : size * 2 + 'rpx'" :src="src" :radius="radius"
    mode="scaleToFill"></tui-lazyload-img>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default:
				require('../../static/logo.png')
    },

    size: {
      type: Number,
      default: 80,
    },

    width: {
      type: Number,
    },

    height: {
      type: Number,
    },

    radius: {
      type: String,
      default: '50%',
    },
  },
}
</script>

<style lang="less" scoped>
.image-wrapper {
  flex-shrink: 0;
}
</style>
