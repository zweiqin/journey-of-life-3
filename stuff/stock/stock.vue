<template>
  <div>
    <view class="kucun">
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

      <view class="background2">《工厂直销，材料大放送》</view>
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

          <img
            class="anniu"
            src="../../static/images/stuff/Vector1.png"
            alt=""
          />
        </view>

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
  width: 100%;
  height: 380upx;
  background: linear-gradient(180deg, #fa5151 0%, rgba(255, 143, 31, 0) 136%);

  .title {
    text-align: center;
    padding-top: 68upx;
    font-size: 32upx;
    font-weight: 500;
    color: #ffffff;
  }
  .fanhui {
    position: absolute;
    top: 70upx;
    left: 40upx;
    width: 48upx;
    height: 48upx;
  }
  .background1 {
    position: absolute;
    top: 190upx;
    left: -0.5upx;
    width: 100%;
  }
  .background2 {
    padding-top: 40upx;
    text-align: center;
    font-size: 48upx;
    letter-spacing: 0.1em;
    background: linear-gradient(to bottom, #ffffff, #fff8c6);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .background3 {
    position: absolute;
    top: 240upx;
    width: 100%;
    border-radius: 20px;
    background: #ffffff;

    .title-list {
      display: flex;
      padding-top: 46upx;
      padding-left: 50upx;
      justify-content: space-between;
      .text {
        font-size: 24upx;
        font-weight: 350;
        color: #3d3d3d;
        &.active {
          font-weight: bold;
          color: #3d3d3d;
        }
      }
      .anniu {
        padding-right: 20upx;
        width: 34upx;
        height: 24upx;
      }
    }

    .goods-list {
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
              font-weight: normal;
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
    }
  }
}
</style>
