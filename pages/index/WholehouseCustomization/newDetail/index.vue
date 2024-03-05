<template>
    <view class="detailsBox">
        <view class="backHeader">
						<tui-icon
							name="arrowleft" :size="60" unit="rpx"
							color="#000000"
							margin="0" @click="goBack"
						></tui-icon>
            <text class="pageTitle">全屋快装</text>
        </view>
        <view class="detailBanner">
            <image class="BannerImg" src="@/static/images/new-index/taocan/bigBanner.png"></image>
        </view>
        <view class="main">
            <view class="Detailamount">
                <view class="title">
                    <text>意式极简</text>
                    <text>B1搭配效果(一房一厅)</text>
                </view>
                <view class="amount">
                    <text class="amountL">
                        <text class="daoler">￥</text>52220<text style="font-weight: 400;font-size: 24rpx;color: #979797;">/套</text>
                    </text>
                </view>
                <text class="amountR">市场价￥62200/套</text>
                <view class="btnGroup">
                    <view class="groupItem">
                        <image class="Icon" src="@/static/images/new-index/taocan/love.png"></image>收藏
                    </view>
                    <view class="groupItem">
                        <image class="Icon" src="@/static/images/new-index/taocan/fenxiang.png"></image>分享
                    </view>
                </view>
            </view>
            <view class="PurchaseQuantity">
                <view class="titles">
                    购买数量
                </view>
                <view class="quantity">
                    <image class="btnIcon" src="@/static/images/new-index/taocan/add.png" @click="amount++"></image>
                    <view class="numbers">
                        {{ amount }}
                    </view>
                    <image class="btnIcon" src="@/static/images/new-index/taocan/subtract.png" @click="amount--"></image>
                </view>
            </view>
            <view class="ConfigurationInformation">
                <view class="Configtitle">
                    全屋配套
                </view>
                <view class="Configtitle2">
                    沙发1套 / 电视柜1个 / 茶几1个 / 床头柜1个
                </view>
                <view class="configIcon">
                    <view class="configItem">
                        <image class="ItemImage" src="@/static/images/new-index/taocan/icon1.png"></image>
                        <text>1房一厅</text>
                    </view>
                    <view class="configItem">
                        <image class="ItemImage" src="@/static/images/new-index/taocan/icon2.png"></image>
                        <text>100平方米</text>
                    </view>
                    <view class="configItem">
                        <image class="ItemImage" src="@/static/images/new-index/taocan/icon3.png"></image>
                        <text>意式极简</text>
                    </view>
                </view>
            </view>
            <view class="title-wrapper">
                <view class="left-bar"></view>
                <view class="title-text">套餐详情</view>
                <view class="right-bar"></view>
            </view>
            <view class="detailImgArray">
                <image class="detailImgArrays" src="@/static/images/new-index/taocan/details.png"></image>
            </view>
        </view>
        <view class="footer">
            <image class="kefu" src="@/static/images/new-index/taocan/kefu.png"></image>
            <button class="addCar">加入购物车</button>
            <button class="nowPrice">立即购买</button>
        </view>
    </view>
</template>

<script>
export default {
    name: 'Starboy',
    data() {
        return {
            amount: 0
        }
    },
    methods: {
        goBack() {
            uni.navigateBack();
        }
    }
}
</script>

<style lang="scss" scoped>
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
    .detailsBox {
        width: 100vw;
        min-height: 100vh;
        background: #F6F6F8;
        padding-bottom: 165rpx;
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
            font-weight: 500;
            line-height: 44rpx;
            letter-spacing: 0.32rpx;
            color: #222229;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .detailBanner {
        width: 100%;
        height: 533rpx;
        .BannerImg {
            width: 100%;
            height: 100%;
        }
    }
    .main {
        box-sizing: border-box;
        width: 100%;
        padding: 24rpx 30rpx 30rpx 30rpx;
        .Detailamount {
            position: relative;
            box-sizing: border-box;
            padding: 28rpx 28rpx 15rpx 28rpx;
            width: 690rpx;
            height: 225rpx;
            background-color: #fff;
            border-radius: 20rpx;
            .title {  
                display: flex;
                gap: 40rpx;
                font-size: 32rpx;
                font-weight: 600;
                line-height: 36rpx;
                color: #222229;
            }
            .amount {
                margin-top: 34rpx;
                .amountL {
                    font-size: 36rpx;
                    font-weight: 500;
                    line-height: 42rpx;
                    color: #E02208;
                    .daoler {
                        font-size: 28rpx;
                    }
                }
            }
            .amountR {
                display: block;
                margin-top: 15rpx;
                margin-left: 10rpx;
                font-size: 24rpx;
                font-weight: normal;
                line-height: 32rpx;
                text-decoration: line-through;
                color: #979797;
            }
            .btnGroup {
                position: absolute;
                top: 160rpx;
                left: 472rpx;
                width: 230rpx;
                height: 32rpx;
                display: flex;
                gap: 20rpx;
                .groupItem {
                    display: flex;
                    align-items: center;
                    width: 100rpx;
                    font-size: 24rpx;
                    font-weight: normal;
                    line-height: 32rpx;
                    color: #979797;
                    .Icon {
                        margin-right: 4rpx;
                        width: 28rpx;
                        height: 28rpx;
                    }
                }
            }
        }
        .PurchaseQuantity {
            margin: 24rpx 0;
            box-sizing: border-box;
            padding: 32rpx 27rpx;
            width: 100%;
            height: 109rpx;
            background-color: #fff;
            border-radius: 20rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .titles {
                font-size: 32rpx;
                font-weight: 500;
                line-height: 42rpx;
                color: #222229;
            }
            .quantity {
                width: 200rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .btnIcon {
                    width: 50rpx;
                    height: 50rpx;
                    border-radius: 9.98rpx;
                }
                .numbers {
                    font-family: Source Han Sans;
                    font-size: 30rpx;
                    font-weight: 500;
                    line-height: 42rpx;
                    letter-spacing: 1.5rpx;
                }
            }
        }
        .ConfigurationInformation {
            width: 100%;
            height: 357rpx;
            box-sizing: border-box;
            padding: 28rpx 27rpx 32rpx 27rpx;
            background-color: #fff;
            border-radius: 20rpx;
            .Configtitle {
                font-size: 32rpx;
                font-weight: 600;
                line-height: 42rpx;
                color: #222229;
            }
            .Configtitle2 {
                margin-top: 19rpx;
                margin-bottom: 28rpx;
                font-size: 28rpx;
                font-weight: normal;
                line-height: 32rpx;
                color: #222229;
            }
            .configIcon {
                width: 100%;
                height: 176rpx;
                background: #F3F3F3;
                border-radius: 10rpx;
                display: flex;
                .configItem {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text {
                        margin-top: 12rpx;
                        font-size: 28rpx;
                        font-weight: normal;
                        line-height: 32rpx;
                        text-align: center;
                        color: #222229;
                    }
                    .ItemImage {
                        width: 48rpx;
                        height: 84rpx;
                    }

                }
            }
        }
        .detailImgArray {
            width: 100%;
            min-height: 300rpx;
            border-radius: 20rpx;
            background-color: #fff;
            .detailImgArrays {
                width: 690rpx;
                height: 1425rpx;
                border-radius: 20rpx;
            }
        }
    }
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 750rpx;
        height: 165rpx;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #fff;
        button {
            margin: 0;
        }
        .kefu {
            width: 92rpx;
            height: 93rpx;
            border-radius: 16rpx;
        }
        .addCar {
            width: 275rpx;
            height: 93rpx;
            border-radius: 16rpx;
            box-sizing: border-box;
            border: 1px solid #222229;
        }
        .nowPrice {
            width: 275rpx;
            height: 92rpx;
            border-radius: 16rpx;
            background: #222229;
            color: #fff;
        }
    }
}
</style>