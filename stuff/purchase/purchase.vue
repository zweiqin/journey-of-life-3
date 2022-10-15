<template>
  <div>
    <view class="purchase">
      <view class="top-title">一键采购</view>
      <img 
      src="../../static/images/stuff/Vector8.png" 
      alt="" class="fanhui"
      @click="handleBack"
      />
      <view class="PurchaseType">
      <view class="type">采购类型</view>
      <img 
      src="../../static/images/stuff/Vector9.png" 
      alt="" 
      class="open"
      />
    </view>
    <view class="title-list">
      <view class="text-list">
      <view class="text">材料名称</view>
      <view class="content">请输入内容</view>
      </view>
      <img src="../../static/images/stuff/直线 3.png" alt="" class="zhixian"/>
      <view class="text-list">
      <view class="text">采购数量</view>
      <view class="content">请输入内容</view>
      </view>
      <img src="../../static/images/stuff/直线 3.png" alt="" class="zhixian"/>
      <view class="text-list">
      <view class="text">参考价格</view>
      <view class="content">请输入内容</view>
      </view>
      <img src="../../static/images/stuff/直线 3.png" alt="" class="zhixian"/>
      <view class="text-list">
      <view class="text">材料规格</view>
      <view class="content">请输入内容</view>
      </view>
      <img src="../../static/images/stuff/直线 3.png" alt="" class="zhixian"/>
      <view class="text-list">
      <view class="text">颜色备注</view>
      <view class="content">请输入内容</view>
      </view>
      <img src="../../static/images/stuff/直线 3.png" alt="" class="zhixian"/>
      <view class="text-list">
      <view class="text">交货日期</view>
      <!-- <view class="content">请输入内容</view> -->
      </view>
      <img src="../../static/images/stuff/直线 3.png" alt="" class="zhixian"/>
      <img src="../../static/images/stuff/time-fill.png" alt="" class="time"/>


    </view>
    <view class="remarks">求购备注</view>
    
    <view class="box">
      <view class="describe">请输入求购描述</view>

    </view>    
    
    
    





    </view>



  </div>
</template>





<script>
export default{
  name:"Purchase",
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
.purchase{
  .top-title{
    padding-top: 72upx;
    padding-left: 310upx;
    font-size: 32upx;
    color: #3D3D3D;
  }
  .fanhui{
    position: absolute;
    top: 78upx;
    left: 20upx;

  }
  .PurchaseType{
    display: flex;
    .type{
      padding-top: 32upx;
      padding-left: 44upx;
      font-size: 24upx;
      color: #3D3D3D;
    }
    .open{
      position: absolute;
      left: 148upx;
      top: 156upx;
      width: 24upx;
      height: 14upx;

    }
  }
  .title-list{
  .text-list{
    display: flex;
  }
  .text{
    font-size: 24upx;
    padding-left: 40upx;
    padding-top: 30upx;
    color: #3D3D3D;

  }
  .content{
    padding-left: 452upx;
    padding-top: 30upx;
    font-size: 24upx;
    color: #999999;

  }
  .zhixian{
    padding-top: 0upx;
    padding-left: 40upx;
  }
  .time{
    position: absolute;
    top: 712upx;
    right: 40upx;
    width: 60upx;
    height: 60upx;
  }
}
  .remarks{
    padding-top: 30upx;
    padding-left: 44upx;
    font-size: 24upx;
    color: #3D3D3D;
}
  

    .box{
      width: 678upx;
      height: 280upx;
      margin-left: 40upx;
      border-radius: 20upx;
      background: #EFEFEF;

      .describe{
        font-size: 24upx;
        padding-top: 20upx;
        padding-left: 32upx;
        color: #3D3D3D;
      }
    }
    
    
    







}






</style>
