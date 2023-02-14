<template>
  <view
    v-if="shopCarInfo && shopCarInfo.brandCartgoods"
    class="goods-container"
    :style="{
      background: shopCarInfo.brandCartgoods.length
        ? 'rgb(239, 239, 239)'
        : '#fff',
    }"
  >
    <scroll-view
      v-if="shopCarInfo.brandCartgoods.length"
      class="scroll-wrapper"
      scroll-y="true"
    >
      <GoodsPane
        v-for="item in shopCarInfo.brandCartgoods"
        :key="item.brandId"
        :data="item"
      ></GoodsPane>
    </scroll-view>

    <JNoData type="order-shop" v-else></JNoData>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import GoodsPane from './goods-pane.vue'
export default {
  components: {
    GoodsPane,
  },
  computed: {
    ...mapGetters(['shopCarInfo']),
  },
}
</script>

<style lang="less" scoped>
.goods-container {
  flex: 1;
  // background-color: rgb(239, 239, 239);
  box-sizing: border-box;
  padding: 10upx;
  // background-color: #fff;

  .scroll-wrapper {
    height: calc(100vh - 240upx);
  }
}
</style>
