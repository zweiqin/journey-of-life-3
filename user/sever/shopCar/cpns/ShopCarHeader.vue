<template>
  <view class="shop-car-header">
    <view class="title-wrapper">
      <tui-icon
        @click="handleBack"
        color="#000"
        :size="28"
        name="arrowleft"
      ></tui-icon>
      <text>购物车</text>
    </view>

    <button
      class="uni-btn"
      @click="$store.commit('shopCar/CHANGE_SHOP_CAR_MODE')"
    >
      {{ currentMode === ON_EDIT ? '编辑' : '完成' }}
    </button>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { ON_EDIT, ON_CONFIRM } from '../../../../store/modules/shopCar'
export default {
  data() {
    return {
      ON_EDIT,
      ON_CONFIRM,
    }
  },
  methods: {
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user',
      })
    },
  },
  computed: {
    ...mapGetters(['currentMode']),
  },
}
</script>

<style lang="less" scoped>
@import '../../../../style/mixin.less';
.shop-car-header {
  .h-flex();
  font-size: 28upx;
  width: 100%;
  height: 120upx;
  box-sizing: border-box;
  padding-right: 30upx;

  .uni-btn {
    font-size: 28upx;
  }

  .title-wrapper {
    .h-flex(flex-start);
  }
}
</style>
