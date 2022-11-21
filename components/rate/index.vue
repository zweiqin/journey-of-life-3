<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-12 16:17:04
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-28 11:21:12
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\components\rate\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="rate-container">
    <img
      v-for="item in 5"
      :key="item"
      :src="
        item <= rate
          ? 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/rzfose8fvybro9qhuomq.png'
          : 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/79gzmwafa4xkndbn75k1.png'
      "
      :style="{
        width: size + 'upx',
        height: size + 'upx',
        'margin-right': space + 'upx',
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
      default: 30,
    },

    rate: {
      type: Number,
      required: true,
    },

    space:{
      type: Number,
      default: 14,
    }
  },

  methods: {
    handleClickStar(rate) {
      this.$emit("change", rate);
    },
  },
};
</script>