<template>
  <div>
    <view class="background">
      <img 
      src="../../static/images/stuff/juxing7.png" 
      alt="" 
      class="red"
      />
    <view class="top-title">全球买手</view>
      <img 
      src="../../static/images/stuff/Vector7.png" 
      alt="" 
      class="fanhui"
      @click="handleBack"
      />
      <view class="white">

      </view>




    </view>

  </div>
</template>



<script>
export default{
  name:"Buyer",
  props:{

  },
  data(){
    return{}
  },
  methods:{
    handleBack() {
      uni.navigateBack();
    },
  },
  created(){}
}
</script>




<style lang="scss" scoped>
.background{

.top-title{
    position: absolute;
    left: 310upx;
    top: 72upx;
    font-size: 32upx;
    color: #FFFFFF;

  }
  .fanhui{
    position: absolute;
    left: 40upx;
    top: 80upx;

  }
  .white{
    position: absolute;
    left: 0upx;
    top: 148upx;
    width: 750upx;
    height: 2078upx;
    border-radius: 40upx 40upx 0upx 0upx;
    background: #FFFFFF;
  }

}





</style>
