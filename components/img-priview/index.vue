<template>
  <view class="img-priview-container">
    <img
      v-for="(img, index) in imgs"
      :key="img"
      :src="imgKey ? img[key] : img"
      alt=""
      @click="priviewImg(index)"
      :style="{
        width: width + 'px',
        height: width + 'px',
        'border-radius': '10px',
        'margin-bottom': '10px',
      }"
    />

    <view
      v-for="item in defaultImgLength"
      :key="item"
      :style="{
        width: width + 'px',
        height: width + 'px',
        'border-radius': '10px',
        'margin-bottom': '10px',
      }"
    ></view>
  </view>
</template>

<script>
export default {
  props: {
    imgs: {
      type: Array,
      required: true,
    },
    imgKey: String,
    width: Number,
    span: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      defaultImgLength: 0,
    };
  },

  mounted() {
    const num = parseInt(this.imgs.length / this.span);
    if (this.imgs % this.span !== 0) {
      this.defaultImgLength = num + 1;
    }
  },

  methods: {
    /**
     * @description 点击预览图片
     */
    priviewImg(index) {
      const _this = this;
      uni.previewImage({
        current: index,
        urls: _this.imgs,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.img-priview-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
</style>