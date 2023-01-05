<template>
  <view class="selected-container" v-if="data">
    <image :src="data.url" mode="" />
    <view class="goods-info">
      <view class="goods-name">{{ data.goodName }}</view>
      <view class="chhose">已选择：{{ selectedStr }}</view>
    </view>
    <view class="ops">
      <image
        class="icon"
        src="../../static/images/wuliu/delete.png"
        @click="$emit('delete', data)"
        mode=""
      />
      <image @click="$emit('edit', data)" class="icon" src="../../static/images/wuliu/edit.png" mode="" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    selectedStr() {
      let baseStr = `${this.data.goodName}/${this.data.goodAmount}套/${
        this.data.packAmount
      }件/${this.data.volume || 0}方`;

      if (this.data.specifications) {
        baseStr +=
          "/" +
            this.data.specifications +
            this.data.attributes.specifications.unit || "";
      }

      if (this.data.pretendStyle) {
        baseStr += "/" + this.data.pretendStyle;
      }

      return baseStr;
    },
  },
};
</script>

<style lang="less" scoped>
.selected-container {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20upx 0;
  border-bottom: 1upx solid rgb(231, 231, 231);

  image {
    width: 160upx;
    height: 160upx;
    border-radius: 20upx;
    flex-shrink: 0;
    margin-right: 20upx;
  }

  .goods-info {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 24upx;
    justify-content: space-around;
    margin-right: 20upx;

    .goods-name {
      font-size: 32upx;
      font-weight: 600;
      margin-bottom: 20upx;
    }

    .chhose {
      line-height: 1.5;
    }
  }

  .ops {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;

    .icon {
      width: 40upx;
      height: 40upx;
      flex-shrink: 0;
      border-radius: 0;
    }
  }
}
</style>