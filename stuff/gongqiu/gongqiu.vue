<template>
  <div>
    <view class="gongqiu">
      <view class="title">供求信息</view>
      <img
        class="fanhui"
        src="../../static/images/stuff/Vector2.png"
        alt=""
        @click="handleBack"
      />
      <img class="search" src="../../static/images/stuff/Vector4.png" alt="" />
      <view class="title-list">
        <view class="title1">采购信息</view>
        <view class="title2">供应信息</view>
      </view>
      <view class="time">
        <view class="shijian">时间</view>
        <view class="riqi">2022-08-11</view>
      </view>
      <view class="message-list">
        <view class="text0">序号</view>
        <view class="text1">类别</view>
        <view class="text2">地区</view>
        <view class="text3">颜色</view>
        <view class="text4">联系</view>
        <view class="text5">时间</view>
        <view class="text6">其他</view>
      </view>
      <img class="zhixian" src="../../static/images/stuff/直线.png" alt="" />

      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="goods-list">
        <view class="goods-detail">
          <view class="goods-text1">1</view>
          <view class="goods-text2">五金</view>
          <view class="goods-text3">广东</view>
          <view class="goods-text4">无</view>
          <view class="goods-text5">13800138000</view>
          <view class="goods-text6">
            <img
              class="more"
              src="../../static/images/stuff/Vector5.png"
              alt=""
            />
          </view>
          <view class="goods-text7">08:00</view>
          <view class="goods-text8">无</view>
        </view>
        <img class="zhixian1" src="../../static/images/stuff/直线.png" alt="" />
      </view>
      <view class="bot">
        <view class="bot-title">查看更多</view>
        <img
          class="see-more"
          src="../../static/images/stuff/Vector6.png"
          alt=""
        />
      </view>
      <view class="show">
        <img 
        class="juxing"
        src="../../static/images/stuff/矩形3.png" 
        alt="" 
        />
        <view class="contact">联系人：代先生</view>
        <view class="address">地址：广东省佛山市顺德区龙江镇团
          蜂家具材料店</view>
      </view>

    </view>
  </div>
</template>






<script>
export default {
  methods: {
    handleBack() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss" scoped>
.gongqiu {
  .title {
    padding-top: 72upx;
    padding-left: 312upx;
    font-size: 32upx;
  }
  .fanhui {
    position: absolute;
    top: 80upx;
    left: 40upx;
  }
  .search {
    position: absolute;
    top: 72upx;
    right: 34upx;
  }
  .title-list {
    display: flex;
    .title1 {
      padding-top: 28upx;
      padding-left: 34upx;
      font-size: 28upx;
      color: #3662ec;
    }
    .title2 {
      padding-top: 28upx;
      padding-left: 94upx;
      font-size: 28upx;
      color: #3d3d3d;
    }
  }
  .time {
    display: flex;
    .shijian {
      padding-top: 28upx;
      padding-left: 34upx;
      font-size: 24upx;
      color: rgba(0, 0, 0, 0.85);
    }
    .riqi {
      padding-top: 28upx;
      padding-left: 22upx;
      font-size: 24upx;
      color: #fa5151;
    }
  }
  .message-list {
    display: flex;
    padding-top: 26upx;
    font-size: 20upx;
    color: #999999;
    .text0 {
      padding-left: 24upx;
    }
    .text1 {
      padding-left: 30upx;
    }
    .text2 {
      padding-left: 56upx;
    }
    .text3 {
      padding-left: 44upx;
    }
    .text4 {
      padding-left: 60upx;
    }
    .text5 {
      padding-left: 120upx;
    }
    .text6 {
      padding-left: 48upx;
    }
  }
  .zhixian {
    padding-top: 10upx;
    padding-left: 26upx;
  }
  .goods-list {
    .goods-detail {
      display: flex;
      .goods-text1 {
        padding-top: 22upx;
        padding-left: 40upx;
        font-size: 20upx;
        color: #3d3d3d;
      }
      .goods-text2 {
        padding-top: 22upx;
        padding-left: 50upx;
        font-size: 20upx;
        color: #3d3d3d;
      }
      .goods-text3 {
        padding-top: 22upx;
        padding-left: 56upx;
        font-size: 20upx;
        color: #3d3d3d;
      }
      .goods-text4 {
        padding-top: 22upx;
        padding-left: 50upx;
        font-size: 20upx;
        color: #3d3d3d;
      }
      .goods-text5 {
        padding-top: 22upx;
        padding-left: 32upx;
        font-size: 20upx;
        color: #3662ec;
      }
      .goods-text6 {
        padding-top: 10upx;
        padding-left: 4upx;
      }
      .goods-text7 {
        padding-top: 22upx;
        padding-left: 34upx;
        font-size: 20upx;
        color: #fa5151;
      }
      .goods-text8 {
        padding-top: 22upx;
        padding-left: 48upx;
        font-size: 20upx;
        color: #3d3d3d;
      }
    }
    .zhixian1 {
      padding-top: 10upx;
      padding-left: 26upx;
    }
  }
  .bot {
    display: flex;
    .bot-title {
      padding-top: 16upx;
      padding-left: 308upx;
      font-size: 24upx;
      color: #3d3d3d;
    }
    .see-more {
      padding-top: 22upx;
      padding-left: 10upx;
      width: 18upx;
      height: 22upx;
    }
  }
  .show{
    // position: absolute;
    // top: 392upx;
    // left: 340upx;
    
    .juxing{
      position: absolute;
      top: 392upx;
      left: 344upx;
      width: 195px;
      height: 53px;

    }
    .contact{
      position: absolute;
      top: 394upx;
      left: 346upx;
      font-size: 10px;
      
      color: #FFFFFF;


    }
    .address{
      position: absolute;
      top: 428upx;
      left: 346upx;
      font-size: 10px;
      line-height: 15px;
      
      color: #FFFFFF;

    }
  }
}
</style>
