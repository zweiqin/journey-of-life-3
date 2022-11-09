<template>
<div>
  <purchaseInput></purchaseInput>
</div>
</template>





<script>
import purchaseInput from "./purchaseInput";
export default {
  name: "Purchase",
  props: {},
  components:{
    purchaseInput
  },
  data() {
    return {};
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
  },
  created() {},
};
</script>







<style lang="scss" scoped>
.purchase {
  .top-title {
    padding-top: 72upx;
    padding-left: 310upx;
    font-size: 32upx;
    color: #3d3d3d;
  }
  .fanhui {
    position: absolute;
    top: 78upx;
    left: 20upx;
  }
  .PurchaseType {
    display: flex;
    .type {
      padding-top: 32upx;
      padding-left: 44upx;
      font-size: 24upx;
      color: #3d3d3d;
    }
    .open {
      position: absolute;
      left: 148upx;
      top: 156upx;
      width: 24upx;
      height: 14upx;
    }
  }
  .title-list {
    .text-list {
      display: flex;
    }
    .text {
      font-size: 24upx;
      padding-left: 40upx;
      padding-top: 30upx;
      color: #3d3d3d;
    }
    .content {
      padding-left: 452upx;
      padding-top: 30upx;
      font-size: 24upx;
      color: #999999;
    }
    .zhixian {
      padding-top: 0upx;
      padding-left: 40upx;
    }
    .time {
      position: absolute;
      top: 712upx;
      right: 40upx;
      width: 60upx;
      height: 60upx;
    }
  }
  .remarks {
    padding-top: 30upx;
    padding-left: 44upx;
    font-size: 24upx;
    color: #3d3d3d;
  }

  .box {
    width: 678upx;
    height: 280upx;
    margin-left: 40upx;
    border-radius: 20upx;
    background: #efefef;

    .describe {
      font-size: 24upx;
      padding-top: 20upx;
      padding-left: 32upx;
      color: #3d3d3d;
    }
  }
}
</style>
