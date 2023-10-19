<template>
  <view class="intelligent-selection-container">
    <view class="op-container">
      <view @click="handleBack" class="back">
        <tui-icon color="#8a2a2a" name="arrowleft"></tui-icon>
      </view>

      <view class="right-container">
        <!-- <view class="image-wrapper">
          <image
            class="image"
            src="@/static/images/new-index/marks.png"
            mode=""
          />
        </view>
        <view class="image-wrapper">
          <image
            class="image"
            src="@/static/images/new-index/home.png"
            mode=""
          />
        </view> -->
      </view>
    </view>
    <Fields></Fields>

    <view class="package-list">
      <Package v-for="(item,index) in tempData" :key="index" :data="item"></Package>
    </view>
  </view>
</template>

<script>
import Fields from './Fields.vue'
import Package from './Package.vue'
import { tempData } from './data'
export default {
  components: {
    Fields,
    Package
  },

  data() {
    return {
      tempData: Object.freeze(tempData),
	  // tempData: tempData,
	  // show: 0
    }
  },
  methods: {
      handleBack() {
        uni.navigateBack()
      }
  }
}
</script>

<style lang="less" scoped>
.package-list {
  padding: 20upx;
  box-sizing: border-box;
}
.op-container {
  height: 120upx;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  transition: all 350ms;
  // background-color: aqua;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .right-container {
    display: flex;
    align-items: center;
  }

  .image-wrapper {
    width: 72upx;
    height: 72upx;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20upx;

    .image {
      width: 40upx;
      height: 40upx;
    }
  }
}
</style>
