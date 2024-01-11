<template>
  <view class="intelligent-selection-container">
      <view class="backHeader">
        <image @click="handleBack" class="backIcon" src="@/static/index/convenient-services/return.png"></image>
        <text class="pageTitle">智能选配</text>
      </view>
      <Fields></Fields>
      <!-- 精选案例 -->
      <view class="SelectedCases" style="display: none;" hover-class="none" :hover-stop-propagation="false">
        <view class="title-wrapper">
          <view class="left-bar"></view>
          <view class="title-text">精选案例</view>
          <view class="right-bar"></view>
        </view>
        <view class="tabNavs">
          <view class="tabsItem" :class="{isActice:index == 0}" v-for="(item, index) in tabNavsData" :key="item">
            {{ item }}
          </view>
        </view>
        <view class="CasePresentation">
          <view class="PresentationBox">
            <view class="teps tpsL">
              改造前
            </view>
            <view class="teps tpsR">
              改造后
            </view>
            <view class="imgBox left">
            <!-- <view class="imgBox left" :class="{isLeft:isLeft,isRight:!isLeft}" @click="isOne=true;isLeft = !isLeft"> -->
              <image class="PresentationImage leftImg" :class="{isLeftSm:isLeft,isRightSm:!isLeft}" src="@/static/images/index/qian.png"></image>
              <view class="mask msleft">

              </view>
              <view class="PK leftPK">
                V
              </view>
            </view>
            <view class="imgBox right">
            <!-- <view class="imgBox right" @click="isOne=true;isLeft = !isLeft" :class="{issRight:isLeft,issLeft:!isLeft}"> -->
              <image class="PresentationImage rightImg" :class="{issRightSm:isLeft,issLeftSm:!isLeft}" src="@/static/images/index/hou.png"></image>
              <view class="mask msright">

              </view>
              <view class="PK rightPK">
                S
              </view>
            </view>
          </view>
          <view class="titles">
            <text class="titlesName">田林路厨房改造</text><text class="addres">佛山顺德</text>
          </view>
          <view class="titles2">
            <text class="textItem">地址：佛山市顺德区团蜂科技</text>
            <text class="textItem">面积：50平方米</text>
            <text class="textItem">工期：25天</text>
            <text class="textItem">价格：28000元</text>
          </view>
        </view>
      </view>
      <view class="main">
          <view class="styles" style="display: none;">
              <view class="stylesItem">
                  <image class="itemImage" src="@/static/images/new-index/taocan/styles1.png"></image>
                  <text class="itemText">新中式</text>
              </view>
              <view class="stylesItem">
                  <image class="itemImage" src="@/static/images/new-index/taocan/styles2.png"></image>
                  <text class="itemText">意式极简</text>
              </view>
              <view class="stylesItem">
                  <image class="itemImage" src="@/static/images/new-index/taocan/styles3.png"></image>
                  <text class="itemText">现代轻奢</text>
              </view>
              <view class="stylesItem">
                  <image class="itemImage" src="@/static/images/new-index/taocan/styles4.png"></image>
                  <text class="itemText">现代美式</text>
              </view>
          </view>
          <view class="screenTabs">
              <view class="tabNavs">
                  <text class="isActive">推荐</text>
                  <text>本月热销</text>
                  <text>新品套餐</text>
                  <text>限时抢购</text>
              </view>
              <view class="selectButton">
                筛选 <image class="selectIcon" src="@/static/images/new-index/taocan/selectIocn.png"></image>
              </view>
          </view>
          <view class="productList">
              <view v-for="(item, index) in listData" :key="item.classifyId" class="listItem" @click="gotoDetails(item)">
                  <image class="productImg" :src="item.image"></image>
                  <!-- <image class="productImg" src="@/static/images/new-index/taocan/shopIcn.png"></image> -->
                  <view class="titleBox">
                      <view class="title">
                        <text>
                          {{ item.productName }}12312
                        </text>
                          <!-- <text>{{ item.productName.split(' ')[0] }}</text>
                          <text>{{ item.productName.split(' ')[1] }}</text> -->
                      </view>
                      <view class="amount">
                          <text class="amountL">
                              <text class="daoler">￥</text>{{ item.price }}
                          </text>
                          <text class="amountR">￥{{ item.originalPrice }}</text>
                      </view>
                      <image class="ShoppingCart" src="@/static/images/new-index/taocan/shopcar.png"></image>
                  </view>
              </view>
          </view>
      </view>
  </view>
</template>

<script>
import Fields from './Fields.vue'
import Package from './Package.vue'
import { getClaasifyProductsApi, getCanvasApi, getFirstClassifyApi } from '@/api/anotherTFInterface';

// import { tempData } from './data'
export default {
  components: {
    Fields,
    Package
  },

  data() {
    return {
      // tempData: Object.freeze(tempData),
      tabNavsData: ['客厅翻新','卧室翻新','餐厅翻新','全屋整装'],
      isLeft: false,
      isOne: false,
      query: {
        classifyId: '1440', // 分类ID 1160 备用ID 978 1163
        search: '',
        type: 1, // 价格升降序
        volume: 0, // 销量升降序
        page: 1,
        pageSize: 24
      },
      listData: []
	  // tempData: tempData,
	  // show: 0
    }
  },
  onLoad() {
    this.getProductList()
  },
  methods: {
      handleBack() {
        uni.navigateBack()
      },
      getProductList(isUpLoading = false) {
        getClaasifyProductsApi(this.query).then(res => {
          if (isUpLoading) {
            this.listData = [...this.listData,...res.data.list]
          }else {
            this.listData = res.data.list
          }
          // console.log(this.listData);
        })
      },
      gotoDetails(shopItem) {
        uni.navigateTo({
          //  url: `/pages/prod/prod?shopInfo=${JSON.stringify(this.goods)}&detailInfo=${JSON.stringify(this.voucherJudgment(this.goods))}`
          url: `/another-tf/another-serve/goodsDetails/index?shopId=${shopItem.shopId}&productId=${shopItem.productId}&skuId=${shopItem.skuId}`
        });
            // uni.navigateTo({
            //      url: '/pages/index/WholehouseCustomization/newDetail/index'
            // });
      },
  }
}
</script>

<style lang="scss" scoped>
.intelligent-selection-container {
  width: 100vw;
  min-height: 100vh;
  background: #F6F6F8;
  box-sizing: border-box;
  padding-bottom: 40rpx;
  .backHeader {
      position: relative;
      width: 750rpx;
      height: 88rpx;
      background-color: #fff;
      display: flex;
      align-items: center;
    .backIcon {
      width: 60rpx;
      height: 60rpx;
    }
    .pageTitle {
      font-family: 思源黑体;
      font-size: 32rpx;
      font-weight: 600;
      line-height: 44rpx;
      letter-spacing: 0.32rpx;
      color: #222229;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .headerTabBox {
    width: 750rpx;
    height: 200rpx;
    box-sizing: border-box;
    padding: 0 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .typeClass {
      height: 136rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .items {
        width: 68rpx;
        height: 68rpx;
        background-color: #fff;
        padding: 12rpx;
      }
    }
  }
  .SelectedCases {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 31rpx;
    .tabNavs {
      width: 100%;
      height: 52rpx;
      display: flex;
      flex-direction: row;
      gap: 81rpx;
      .tabsItem {
        position: relative;
        width: 112rpx;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 48rpx;
        text-align: center;
        display: flex;
        align-items: center;
        font-feature-settings: "kern" on;
      }
      .isActice {
        font-weight: 600;
        color: #EF530E;
      }
      .isActice::before {
        position: absolute;
        content: '';
        width: 46px;
        height: 4px;
        background-color: #EF530E;
        bottom: -6rpx;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .CasePresentation {
      box-sizing: border-box;
      padding: 45rpx 26rpx;
      margin-top: 40rpx;
      width: 100%;
      height: 682rpx;
      border-radius: 20rpx;
      background: #FFFFFF;
      .PresentationBox {
        position: relative;
        width: 100%;
        height: 389rpx;
        overflow: hidden;
        border-radius: 20rpx;
        .teps {
          position: absolute;
          width: 120rpx;
          height: 48rpx;
          padding: 0px 18rpx;
          z-index: 5;
          text-align: center;
          font-size: 28rpx;
          font-weight: normal;
          line-height: 48rpx;
          font-feature-settings: "kern" on;
          color: #FFFFFF;
        }
        .tpsL {
          border-radius: 20rpx 0px 20rpx 0px;
          background: #222229c4;
          top: 0;
          left: 0;
        }
        .tpsR {
          border-radius: 0rpx 20rpx 0rpx 20rpx;
          background: #ef530ed1;
          top: 0;
          right: 0;
        }
        .imgBox {
          position: absolute;
          width: 100%;
          height: 389rpx;
          overflow: hidden;
          transform: skewX(165deg);
          background-color: #fff;
          .PK {
            position: absolute;
            top: 50%;
            width: 56rpx;
            height: 56rpx;
            border-radius: 50%;
            font-size: 32rpx;
            font-weight: normal;
            line-height: 56rpx;
            text-align: center;
            color: #FFFFFF;
            z-index: 6;
            transform: skewX(-165deg) translateY(-50%);
          }
          .leftPK {
            right: 26rpx;
            background: rgba(34, 34, 41, 0.8);
          }
          .rightPK {
            left: 26rpx;
            background: rgba(239, 83, 14, 0.7);
          }
          .PresentationImage {
            position: absolute;
            top: 0;
            transform: skewX(-165deg);
            width: 100%;
            height: 389rpx;
          }
          .mask {
            position: absolute;
            top: 0;
            width: 20rpx;
            height: 398rpx;
            background-color: #fff;
            transform: skewX(180deg);
          }
          .msleft {
            right: 0;
          }
          .msright {
            left: 0;
          }
          .leftImg {
            right: -140rpx;
          }
          .rightImg {
            left: -140rpx;
          }
        }
        .left {
          top: 0;
          left: -304rpx;
          z-index: 1;
        }
        .right {
          top: 0;
          right: -304rpx;
          z-index: 2;
        }
      }
    }
    .titles {
      margin-top: 30rpx;
      width: 100%;
      .titlesName {
        font-size: 34rpx;
        font-weight: 600;
        line-height: 48rpx;
        text-align: center;
        color: #222229;
      }
      .addres {
        width: 131rpx;
        height: 48rpx;
        border-radius: 8rpx;
        box-sizing: border-box;
        padding: 0rpx 10rpx;
        border: 1px solid #EF530E;
        margin-left: 20rpx;
        font-family: 思源黑体;
        font-size: 28rpx;
        font-weight: normal;
        line-height: 48rpx;
        text-align: center;
        color: #EF530E;
      }
    }
    .titles2 {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .textItem {
        margin: 10rpx;
        min-width: 40%;
        max-width: 48%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 28rpx;
        font-weight: normal;
        line-height: 32rpx;
        color: #888889;
      }
    }
  }
  .main {
        box-sizing: border-box;
        width: 100%;
        padding: 10rpx 30rpx 50rpx 30rpx;
        /* padding: 50rpx 30rpx; */
        .styles {
            box-sizing: border-box;
            padding: 20rpx 18rpx;
            width: 100%;
            height: 253rpx;
            border-radius: 20rpx;
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            .stylesItem {
                width: 150rpx;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .itemImage {
                    width: 150rpx;
                    height: 164rpx;
                    border-radius: 10rpx;
                }
                .itemText {
                    margin-top: 10rpx;
                    font-size: 32rpx;
                    font-weight: normal;
                    line-height: 38rpx;
                    text-align: center;
                    letter-spacing: 0.32rpx;
                    color: #000000;
                }
            }
        }
        .screenTabs {
            width: 100%;
            height: 46rpx;
            display: flex;
            align-items: center;
            margin: 30rpx 0 20rpx 0;
            .tabNavs {
                width: 530rpx;
                font-family: 思源黑体;
                font-size: 28rpx;
                font-weight: normal;
                line-height: 36rpx;
                color: #222229;
                display: flex;
                justify-content: space-between;
                .isActive {
                    font-size: 32rpx;
                    font-weight: bold;
                }
            }
            .selectButton {
                box-sizing: border-box;
                padding-left: 10rpx;
                margin-left: 55rpx;
                font-size: 28rpx;
                font-weight: normal;
                line-height: 36rpx;
                border-left: 2rpx solid #454141;
                .selectIcon {
                    margin-left: 5rpx;
                    width: 24rpx;
                    height: 24rpx;
                    border-radius: 50%;
                }
            }
        }
        .productList {
            width: 100%;
            height: auto;
            display: flex;
            flex-wrap: wrap;
            gap: 20rpx;
            justify-content: space-between;
            .listItem {
                margin: 6rpx 0;
                width: 48%;
                height: 538rpx;
                background-color: #fff;
                border-radius: 20rpx;
                .productImg {
                    width: 100%;
                    height: 380rpx;
                    border-radius: 20rpx;
                    border-bottom: 2rpx solid #bcbcbc;
                } 
                .titleBox {
                    position: relative;
                    box-sizing: border-box;
                    padding: 23rpx 25rpx 33rpx 25rpx;
                    width: 100%;
                    height: 158rpx;
                    .title {  
                        display: flex;
                        gap: 40rpx;
                        font-size: 32rpx;
                        font-weight: 600;
                        line-height: 36rpx;
                        color: #222229;
                        > text {
                          white-space: nowrap;
                          max-width: 100%;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        }
                    }
                    .amount {
                        margin-top: 24rpx;
                        .amountL {
                            font-size: 36rpx;
                            font-weight: 500;
                            line-height: 42rpx;
                            color: #E02208;
                            .daoler {
                                font-size: 28rpx;
                            }
                        }
                        .amountR {
                            margin-left: 10rpx;
                            font-size: 24rpx;
                            font-weight: normal;
                            line-height: 32rpx;
                            text-decoration: line-through;
                            color: #979797;
                        }
                    }
                    .ShoppingCart {
                        position: absolute;
                        bottom: 30rpx;
                        right: 10rpx;
                        width: 50rpx;
                        height: 50rpx;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}
.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40upx 0;

  .left-bar {
    width: 94upx;
    height: 4upx;
    background-color: #ef530e;
    background: linear-gradient(to right, #fff, #0e1e37);
  }

  .title-text {
    color: #08377f;
    font-size: 37upx;
    font-weight: bold;
    margin: 0 29upx;
  }

  .right-bar {
    width: 94upx;
    height: 4upx;
    background-color: #ef530e;
    background: linear-gradient(to right, #0e1e37, #fff);
  }
}
</style>
