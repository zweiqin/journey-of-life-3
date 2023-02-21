<template>
  <view class="local-wrapper" @click.stop="handleClick">
    <JIcon type="locale" width="34" height="40" v-if="icon"></JIcon
    ><text class="locale" :class="{ whitelocale: color }"
      >{{ $store.getters.currentCity || '定位中...' }}
    </text></view
  >
</template>

<script>
export default {
  props: {
    color: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      address: '位置',
    }
  },
}
</script>

<style lang="less" scoped>
.local-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .locale {
    padding: 0 10upx;
    color: white;
    &.whitelocale {
      padding: 0 10upx;
    }
  }
}
</style>
