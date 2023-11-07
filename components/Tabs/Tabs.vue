<template>
  <view class="tabs-container" :style="{ padding: padding }">
    <view
      :style="{ width: isGrid ? 100 / 4 + '%' : '' }"
      class="item"
      v-for="(item, index) in data"
      :class="{ active: currentIndex === index }"
      :key="item[label]"
      @click="$emit('click', item)"
    >
      <slot :name="item.slotName">
        <image v-if="item[icon]" :style="iconStyle" :src="item[icon]" mode="" />
      </slot>
      <view class="label">{{ item[label] }}</view>
    </view>

    <view
      v-if="isShowScrollBar"
      class="bar"
      :style="{
        left: barLeft + 'px',
        top: barTop + 'px',
        width: barWidth + 'px',
      }"
    ></view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },

    label: {
      type: String,
      default: 'label',
    },

    icon: {
      type: String,
      default: 'icon',
    },

    size: {
      type: Number,
      default: 24,
    },

    padding: {
      type: String,
      default: '20upx 0',
    },

    isGrid: {
      type: Boolean,
      default: false,
    },

    isShowScrollBar: {
      type: Boolean,
      default: false,
    },

    currentIndex: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      barLeft: 0,
      menus: [],
      barTop: 0,
      barWidth: 0,
      baseLeft: 23,
    }
  },

  mounted() {
    if (this.isShowScrollBar) {
      this.$nextTick(() => {
        this.setScrollBar()
      })
    }
  },

  methods: {
    async setScrollBar() {
      const res = await this.getSize('.active')
      const containerPosition = await this.getSize('.tabs-container')
      if (this.currentIndex === 0) {
        this.baseLeft = res.left
      }
      this.barLeft = res.left - this.baseLeft
      this.barTop =
        containerPosition.height - (this.padding / 2 ? this.padding / 2 : -4)
      this.barWidth = res.width
    },
  },

  watch: {
    currentIndex: {
      handler() {
        if (this.isShowScrollBar) {
          this.$nextTick(() => {
            this.setScrollBar()
          })
        }
      },

      immediate: true,
    }
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
.tabs-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-size: 28upx;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .label {
      margin-top: 16upx;
    }
  }

  .bar {
    position: absolute;
    left: 0;
    top: 56upx;
    width: 24px;
    height: 4upx;
    background-color: #f40;
    transition: left 350ms;
    transform: scaleX(0.7);
  }
}
</style>
