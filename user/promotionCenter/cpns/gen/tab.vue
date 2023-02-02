<template>
  <view>
    <view class="tabs">
      <view
        class="item"
        :class="{ active: item.label === curentTab }"
        v-for="item in tabs"
        :key="item.label"
        >{{ item.label }}</view
      >
    </view>
   
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          label: "月收益",
        },
        {
          label: "周收益",
        },
        {
          label: "日收益",
        },
        {
          label: "累计收益",
        },
      ],

      curentTab: "月收益",
      
    };
  },

  
};
</script>

<style lang="less" scoped>
.tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28upx;
  margin-bottom: 20upx;
  margin-top: 20upx;

  .item {
    position: relative;
    padding: 10upx 0;

    &.active {
      &::after {
        background: #f40;
      }
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 80%;
      height: 4upx;
      border-radius: 100px;
      left: 50%;
      bottom: -6upx;
      transform: translateX(-50%);
    }
  }
}
</style>