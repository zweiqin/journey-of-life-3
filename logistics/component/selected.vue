<template>
  <view class="selected-container" v-if="data">
    <image :src="data.imageUrl" mode="" />
    <view class="goods-info">
      <view class="goods-name">{{ data.name }}</view>
      <view class="chhose">已选择：{{ selectedStr }}</view>
    </view>
    <view class="ops">
			<tui-icon
				name="delete" :size="40" unit="rpx"
				color="#767676"
				margin="0 0 20rpx 0" @click="$emit('delete', data)"
			></tui-icon>
			<tui-icon
				name="evaluate" :size="40" unit="rpx"
				color="#767676"
				margin="0 0 20rpx 0" @click="$emit('edit', data)"
			></tui-icon>
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
      let baseStr = `${this.data.name}/${this.data.goodAmount}套/${
        this.data.packAmount
      }件/${this.data.volume || 0}方`;
      if (this.data.specificationData) {
        baseStr += "/" + this.data.specificationData + this.data.unit || "";
      }

      if (this.data.typeData) {
        baseStr += "/" + this.data.typeData;
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

      &:nth-child(1){
        margin-bottom: 20upx;
      }
    }
  }
}
</style>