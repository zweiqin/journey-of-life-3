<template>
  <view class="user-pane">
    <view class="title">{{ data.title }}</view>

    <Tabs
      @click="$emit('click', $event)"
      :isGrid="isGrid"
      :style="{ margin: isGrid ? '0 -20upx' : '' }"
      v-for="(item, index) in row"
      :key="index"
      :data="data.menus.slice(index * 4, (index + 1) * 4)"
    >
      <block
        :slot="item1.slotName"
        v-for="(item1, index1) in data.menus.slice(index * 4, (index + 1) * 4)"
        :key="index1"
      >
        <slot :name="item1.slotName"></slot>
      </block>
    </Tabs>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },

    size: {
      type: Number,
      default: 24,
    },

    row: {
      type: Number,
      default: 1,
    },

    isGrid: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    iconStyle() {
      return {
        width: this.size * 2 + 'upx',
        height: this.size * 2 + 'upx',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 10upx;
  font-weight: 500;
}
</style>
