<template>
  <view class="rate-container">
    <img
      v-for="item in 5"
      :key="item"
      :src="
        item <= rate
          ? 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6pfw0ql11tpiw1plmyba.png'
          : 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/79gzmwafa4xkndbn75k1.png'
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