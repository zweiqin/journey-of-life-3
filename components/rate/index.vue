<template>
  <view class="rate-container">
    <img
      v-for="item in 5"
      :key="item"
      :src="
        item <= rate
          ? '../../static/images/index/star-active.png'
          : '../../static/images/index/star.png'
      "
      :style="{
        width: size + 'px',
        height: size + 'px',
        'margin-right': '7px',
      }"
      alt=""
      @click="handleClickStar(item)"
    />
  </view>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 15,
    },

    rate: {
      type: Number,
      required: true,
    },
  },

  methods: {
    handleClickStar(rate) {
      this.$emit("change", rate);
    },
  },
};
</script>