<template>
  <view class="shop-car-list">
    <ShopCarHeader></ShopCarHeader>
    <GoodsContainer></GoodsContainer>
    <ShopCarFooter></ShopCarFooter>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import ShopCarHeader from './cpns/ShopCarHeader.vue'
import ShopCarFooter from './cpns/ShopCarFooter.vue'
import GoodsContainer from './cpns/GoodsContainer/index.vue'
export default {
  components: {
    ShopCarHeader,
    ShopCarFooter,
    GoodsContainer,
  },
  onLoad() {
    console.log(this.$store)
    this.$store.dispatch('shopCar/getShopCarList')
  },

  computed: {
    ...mapGetters(['shopCarInfo', 'currentMode']),
  },
}
</script>

<style lang="scss" scoped>
.shop-car-list {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
