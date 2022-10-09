<template>
  <div>
    <view class="kucun">
      <img
        class="background"
        src="../../static/images/stuff/background.png"
        alt=""
      />
      <view class="title">库存</view>
      <img
        class="fanhui"
        src="../../static/images/stuff/chevron-states 1.png"
        @click="handleBack"
        alt=""
      />
      <img
        class="background1"
        src="../../static/images/stuff/热销.png"
        alt=""
      />
      <img
        class="background2"
        src="../../static/images/stuff/《工厂直销，材料大放送》.png"
        alt=""
      />
      <view class="background3">
        <view class="title-list">
          <view
            @click="changeTab(0)"
            :class="{ active: currentTab == 0 }"
            class="text"
            >推荐</view
          >
          <view class="text">功能配件</view>
          <view class="text">五金配件</view>
          <view class="text">沙发材料</view>
          <view class="text">椅类配件</view>
        </view>
        <img class="anniu" src="../../static/images/stuff/Vector1.png" alt="" />
        <view class="goods-list">
          <view class="goods-detail">
            <view class="left">
              <img
                class="cailiao"
                src="../../static/images/stuff/材料.png"
                alt=""
              />
            </view>
            <view class="right">
              <view class="goods-name">革沙布料真皮荔枝纹皮料子</view>
              <img
                class="geiqian"
                src="../../static/images/stuff/买贵必赔.png"
                alt=""
              />
              <view class="yishou">已售1000+</view>
              <view class="jiage">
                <view class="xianjia">￥19.9</view>
                <view class="yuanjia">原价:￥39.9</view>
              </view>
              <view class="xiadan">
                <view class="xiadan1">立即下单</view>
                <img
                  class="juxing1"
                  src="../../static/images/stuff/下单1.png"
                  alt=""
                />
                <img
                  class="juxing2"
                  src="../../static/images/stuff/下单2.png"
                  alt=""
                />
              </view>
            </view>
          </view>
          <view class="goods-detail">
            <view class="left">
              <img
                class="cailiao"
                src="../../static/images/stuff/材料.png"
                alt=""
              />
            </view>
            <view class="right">
              <view class="goods-name">革沙布料真皮荔枝纹皮料子</view>
              <img
                class="geiqian"
                src="../../static/images/stuff/买贵必赔.png"
                alt=""
              />
              <view class="yishou">已售1000+</view>
              <view class="jiage">
                <view class="xianjia">￥19.9</view>
                <view class="yuanjia">原价:￥39.9</view>
              </view>
              <view class="xiadan">
                <view class="xiadan1">立即下单</view>
                <img
                  class="juxing1"
                  src="../../static/images/stuff/下单1.png"
                  alt=""
                />
                <img
                  class="juxing2"
                  src="../../static/images/stuff/下单2.png"
                  alt=""
                />
              </view>
            </view>
          </view>
          <view class="goods-detail">
            <view class="left">
              <img
                class="cailiao"
                src="../../static/images/stuff/材料.png"
                alt=""
              />
            </view>
            <view class="right">
              <view class="goods-name">革沙布料真皮荔枝纹皮料子</view>
              <img
                class="geiqian"
                src="../../static/images/stuff/买贵必赔.png"
                alt=""
              />
              <view class="yishou">已售1000+</view>
              <view class="jiage">
                <view class="xianjia">￥19.9</view>
                <view class="yuanjia">原价:￥39.9</view>
              </view>
              <view class="xiadan">
                <view class="xiadan1">立即下单</view>
                <img
                  class="juxing1"
                  src="../../static/images/stuff/下单1.png"
                  alt=""
                />
                <img
                  class="juxing2"
                  src="../../static/images/stuff/下单2.png"
                  alt=""
                />
              </view>
            </view>
          </view>
          <view class="goods-detail">
            <view class="left">
              <img
                class="cailiao"
                src="../../static/images/stuff/材料.png"
                alt=""
              />
            </view>
            <view class="right">
              <view class="goods-name">革沙布料真皮荔枝纹皮料子</view>
              <img
                class="geiqian"
                src="../../static/images/stuff/买贵必赔.png"
                alt=""
              />
              <view class="yishou">已售1000+</view>
              <view class="jiage">
                <view class="xianjia">￥19.9</view>
                <view class="yuanjia">原价:￥39.9</view>
              </view>
              <view class="xiadan">
                <view class="xiadan1">立即下单</view>
                <img
                  class="juxing1"
                  src="../../static/images/stuff/下单1.png"
                  alt=""
                />
                <img
                  class="juxing2"
                  src="../../static/images/stuff/下单2.png"
                  alt=""
                />
              </view>
            </view>
          </view>
          <view class="goods-detail">
            <view class="left">
              <img
                class="cailiao"
                src="../../static/images/stuff/材料.png"
                alt=""
              />
            </view>
            <view class="right">
              <view class="goods-name">革沙布料真皮荔枝纹皮料子</view>
              <img
                class="geiqian"
                src="../../static/images/stuff/买贵必赔.png"
                alt=""
              />
              <view class="yishou">已售1000+</view>
              <view class="jiage">
                <view class="xianjia">￥19.9</view>
                <view class="yuanjia">原价:￥39.9</view>
              </view>
              <view class="xiadan">
                <view class="xiadan1">立即下单</view>
                <img
                  class="juxing1"
                  src="../../static/images/stuff/下单1.png"
                  alt=""
                />
                <img
                  class="juxing2"
                  src="../../static/images/stuff/下单2.png"
                  alt=""
                />
              </view>
            </view>
          </view>
          <view class="goods-detail">
            <view class="left">
              <img
                class="cailiao"
                src="../../static/images/stuff/材料.png"
                alt=""
              />
            </view>
            <view class="right">
              <view class="goods-name">革沙布料真皮荔枝纹皮料子</view>
              <img
                class="geiqian"
                src="../../static/images/stuff/买贵必赔.png"
                alt=""
              />
              <view class="yishou">已售1000+</view>
              <view class="jiage">
                <view class="xianjia">￥19.9</view>
                <view class="yuanjia">原价:￥39.9</view>
              </view>
              <view class="xiadan">
                <view class="xiadan1">立即下单</view>
                <img
                  class="juxing1"
                  src="../../static/images/stuff/下单1.png"
                  alt=""
                />
                <img
                  class="juxing2"
                  src="../../static/images/stuff/下单2.png"
                  alt=""
                />
              </view>
            </view>
          </view>
          <view class="goods-detail">
            <view class="left">
              <img
                class="cailiao"
                src="../../static/images/stuff/材料.png"
                alt=""
              />
            </view>
            <view class="right">
              <view class="goods-name">革沙布料真皮荔枝纹皮料子</view>
              <img
                class="geiqian"
                src="../../static/images/stuff/买贵必赔.png"
                alt=""
              />
              <view class="yishou">已售1000+</view>
              <view class="jiage">
                <view class="xianjia">￥19.9</view>
                <view class="yuanjia">原价:￥39.9</view>
              </view>
              <view class="xiadan">
                <view class="xiadan1">立即下单</view>
                <img
                  class="juxing1"
                  src="../../static/images/stuff/下单1.png"
                  alt=""
                />
                <img
                  class="juxing2"
                  src="../../static/images/stuff/下单2.png"
                  alt=""
                />
              </view>
            </view>
          </view>
        </view>
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
    changeTab(tab) {
      console.log(this.currentTab);
      this.currentTab = tab;
      console.log(this.currentTab);
    },
  },
};
</script>





<style lang="less" scoped>
.kucun {
  .title {
    top: 68upx;
    left: 342upx;
    position: absolute;
    font-family: SourceHanSansCN-Medium;
    font-size: 32upx;
    font-weight: 500;
    color: #ffffff;
  }
  .fanhui {
    position: absolute;
    top: 78upx;
    left: 40upx;
  }
  .background1 {
    position: absolute;
    top: 190upx;
    left: -0.5upx;
  }
  .background2 {
    position: absolute;
    left: 102upx;
    top: 166upx;
  }
  .background3 {
    position: absolute;
    top: 240upx;
    width: 750upx;
    height: 2012upx;
    border-radius: 20px;
    background: #ffffff;

    .title-list {
      display: flex;
      padding-top: 46upx;
      padding-left: 32upx;
      .text {
        padding-right: 56upx;
        font-family: SourceHanSansCN-Normal;
        font-size: 24upx;
        font-weight: 350;
        color: #3d3d3d;
        &.active {
          font-weight: bold;
          color: #3d3d3d;
        }
      }
    }
    .anniu {
      top: 50upx;
      right: 44upx;
      position: absolute;
      width: 16.67px;
      height: 11.67px;
    }
    .goods-list {
      .goods-detail {
        display: flex;
        .left {
          .cailiao {
            padding-left: 48upx;
            padding-top: 56upx;
            padding-right: 78upx;
            width: 220upx;
            height: 220upx;
          }
        }
        .right {
          .goods-name {
            padding-top: 30upx;
            font-family: SourceHanSansCN-Medium;
            font-size: 24upx;
            font-weight: 500;
            letter-spacing: 0em;
            color: #3d3d3d;
          }
          .geiqian {
            padding-top: 13upx;
            width: 140upx;
            height: 34upx;
          }
          .yishou {
            padding-top: 4upx;
            font-family: SourceHanSansCN-Regular;
            font-size: 24upx;
            font-weight: normal;
            letter-spacing: 0em;
            color: rgba(0, 0, 0, 0.85);
          }
          .jiage {
            display: flex;
            .xianjia {
              padding-top: 6upx;
              font-size: 18px;
              font-weight: 500;
              font-family: SourceHanSansCN-Medium;
              letter-spacing: 0em;
              color: #fa5151;
            }
            .yuanjia {
              padding-top: 18upx;
              padding-left: 14upx;
              font-size: 10px;
              font-weight: normal;
              color: #999999;
            }
          }
          .xiadan {
            .xiadan1 {
              padding-top: 14upx;
              padding-left: 13upx;
              font-size: 18px;
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
    }
  }
}
</style>
