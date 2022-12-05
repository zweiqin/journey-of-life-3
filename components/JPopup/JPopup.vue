<template>
  <view class="j-popup">
    <uni-popup @change="handleChangePopupStatus" ref="popupRef" :type="type">
      <slot></slot>
    </uni-popup>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "center",
    },

    value: {
      type: Boolean,
      required: true,
    },
  },

  watch: {
    value: {
      handler(value) {
        if (value) {
          this.$refs.popupRef.open();
        } else {
          this.$refs.popupRef.close();
        }
      },
    },
  },

  methods: {
    handleChangePopupStatus(e) {
      const { show } = e;
      if (!show) {
        this.$emit("input", false);
      }
    },
  },
};
</script>