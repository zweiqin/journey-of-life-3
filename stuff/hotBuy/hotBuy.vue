<template>
  <div>
    <view class="background">
      <view class="title">热销</view>
      <view class="top-title">《热销材料大采购》</view>

      <img
        class="background1"
        src="../../static/images/stuff/热销.png"
        alt=""
      />
      <view class="background2">
        <view class="title-detail">
          <view class="text1">推荐</view>
          <view class="text2">功能配件</view>
          <view class="text3">五金配件</view>
          <view class="text4">沙发材料</view>
          <view class="text5">椅类配件</view>
          <img
            class="anniu"
            src="../../static/images/stuff/Vector1.png"
            alt=""
          />
        </view>
        <view class="hotgoods">  <hotGoods></hotGoods></view>
      </view>
    </view>
  </div>
</template>

<script>
import hotGoods from "./hotGoods";
import { getCatalogAllApi } from "../../api/stuff";
export default {
  components: {
    hotGoods,
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
    async getCatalogAll(){
      const res = await getCatalogAllApi({
        goodsType:2
      })
      console.log(res);
    }
  },
  onLoad(options) {
    this.getCatalogAll()
  }
};
</script>

<style lang="less" scoped>
.background {
  width: 100%;
  height: 384upx;
  background: linear-gradient(181deg, #fa5151 1%, rgba(255, 143, 31, 0) 141%);

  .title {
    text-align: center;

    padding-top: 72upx;
    font-size: 32upx;
    font-weight: 500;

    color: #ffffff;
  }
  .top-title {
    padding-top: 40upx;
    text-align: center;
    font-size: 48upx;
    font-weight: 600;
    letter-spacing: 0.1em;
    background: linear-gradient(to bottom, #ffffff, #fff8c6);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .background1 {
    position: absolute;
    left: -1upx;
    top: 194upx;

    width: 100%;
    height: 115upx;
  }
  .background2 {
    position: absolute;
    left: 0upx;
    top: 246upx;
    width: 100%;
    height: 2012upx;
    border-radius: 40upx;
    background: #ffffff;

    .title-detail {
      display: flex;
      padding-top: 46upx;
      font-size: 24upx;
      justify-content: space-between;
      .text1 {
        padding-left: 30upx;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }
      .text2 {
        padding-left: 50upx;
        font-weight: 350;
        color: #3d3d3d;
      }
      .text3 {
        padding-left: 58upx;
        font-weight: 350;
        color: #3d3d3d;
      }
      .text4 {
        padding-left: 60upx;
        font-weight: 350;
        color: #3d3d3d;
      }
      .text5 {
        padding-left: 58upx;
        font-weight: 350;
        color: #3d3d3d;
      }
      .anniu {
        width: 34upx;
        height: 24upx;
        padding-right: 20upx;
      }
    }
    .goods-detail {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .left {
        .cailiao {
          padding-left: 48upx;
          padding-top: 56upx;
          width: 220upx;
          height: 220upx;
        }
      }
      .right {
        padding-right: 110upx;
        .goods-name {
          padding-top: 30upx;
          font-size: 24upx;
          font-weight: 500;
          color: #3d3d3d;
        }
        .geiqian {
          padding-top: 13upx;
          width: 140upx;
          height: 34upx;
        }
        .yishou {
          padding-top: 4upx;
          font-size: 24upx;
          color: rgba(0, 0, 0, 0.85);
        }
        .jiage {
          display: flex;
          .xianjia {
            padding-top: 6upx;
            font-size: 36upx;
            font-weight: 500;
            color: #fa5151;
          }
          .yuanjia {
            padding-top: 18upx;
            padding-left: 14upx;
            font-size: 20upx;
            color: #999999;
          }
        }
        .xiadan {
          .xiadan1 {
            padding-top: 14upx;
            padding-left: 13upx;
            font-size: 36upx;
            font-weight: 500;
            z-index: 100;
            position: absolute;
            color: #ffffff;
          }
          .juxing1 {
            position: absolute;
            padding-top: 6upx;
            width: 207upx;
            height: 62upx;
          }
          .juxing2 {
            position: absolute;
            padding-left: 176upx;
            padding-top: 6upx;
            width: 80upx;
            height: 62upx;
          }
        }
      }
    }
    .hotgoods{
      
    }
  }

  .fanhui {
    position: absolute;
    top: 78upx;
    left: 40upx;
    width: 48upx;
    height: 48upx;
  }
}
</style>