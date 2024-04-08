<template>
    <view class="WholehouseCustomization">
        <view class="backHeader">
						<tui-icon
							name="arrowleft" :size="60" unit="rpx"
							color="#000000"
							margin="0" @click="goBack"
						></tui-icon>
            <text class="pageTitle">全屋套餐</text>
        </view>
        <view class="containerBanner">
            <image class="textImg" src="@/static/images/new-index/taocan/bgText.png"></image>
            <image class="bgImg" src="@/static/images/new-index/taocan/bgBottom.png"></image>
            <image class="buttonImg" src="@/static/images/new-index/taocan/bgButton.png"></image>
        </view>
        <view class="main">
            <view class="styles">
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
                    <text class="isActive">
											<!-- #ifdef APP -->
												新品
											<!-- #endif -->
											<!-- #ifndef APP -->
												推荐
											<!-- #endif -->
										</text>
                    <text>本月热销</text>
                    <text>新品套餐</text>
                    <text>限时抢购</text>
                </view>
                <view class="selectButton">
                 筛选 <image class="selectIcon" src="@/static/images/new-index/taocan/selectIocn.png"></image>
                </view>
            </view>
            <view class="productList">
                <view class="listItem" @click="gotoDetails">
                    <image class="productImg" src="@/static/images/new-index/taocan/shopIcn.png"></image>
                    <view class="titleBox">
                        <view class="title">
                            <text>意式极简</text>
                            <text>B1搭配效果(一房一厅)</text>
                        </view>
                        <view class="amount">
                            <text class="amountL">
                                <text class="daoler">￥</text>52220
                            </text>
                            <text class="amountR">￥62200</text>
                        </view>
                        <image class="ShoppingCart" src="@/static/images/new-index/taocan/shopcar.png"></image>
                    </view>
                </view>
                <view class="listItem" @click="gotoDetails">
                    <image class="productImg" src="@/static/images/new-index/taocan/shopIcn.png"></image>
                    <view class="titleBox">
                        <view class="title">
                            <text>意式极简</text>
                            <text>B1搭配效果(一房一厅)</text>
                        </view>
                        <view class="amount">
                            <text class="amountL">
                                <text class="daoler">￥</text>52220
                            </text>
                            <text class="amountR">￥62200</text>
                        </view>
                        <image class="ShoppingCart" src="@/static/images/new-index/taocan/shopcar.png"></image>
                    </view>
                </view>
                <view class="listItem" @click="gotoDetails">
                    <image class="productImg" src="@/static/images/new-index/taocan/shopIcn.png"></image>
                    <view class="titleBox">
                        <view class="title">
                            <text>意式极简</text>
                            <text>B1搭配效果(一房一厅)</text>
                        </view>
                        <view class="amount">
                            <text class="amountL">
                                <text class="daoler">￥</text>52220
                            </text>
                            <text class="amountR">￥62200</text>
                        </view>
                        <image class="ShoppingCart" src="@/static/images/new-index/taocan/shopcar.png"></image>
                    </view>
                </view>
                <view class="listItem" @click="gotoDetails">
                    <image class="productImg" src="@/static/images/new-index/taocan/shopIcn.png"></image>
                    <view class="titleBox">
                        <view class="title">
                            <text>意式极简</text>
                            <text>B1搭配效果(一房一厅)</text>
                        </view>
                        <view class="amount">
                            <text class="amountL">
                                <text class="daoler">￥</text>52220
                            </text>
                            <text class="amountR">￥62200</text>
                        </view>
                        <image class="ShoppingCart" src="@/static/images/new-index/taocan/shopcar.png"></image>
                    </view>
                </view>
            </view>
        </view>
        <!-- <view class="footer">

        </view> -->
    </view>
</template>

<script>
export default {
    name: 'Return false',
    data() {
        return {

        }
    },
    methods: {
        gotoDetails() {
            uni.navigateTo({
                 url: '/pages/index/WholehouseCustomization/newDetail/index'
            });
        },
        goBack() {
            uni.navigateBack();
        }
    }
}
</script>

<style lang="scss" scoped>
.WholehouseCustomization {
    width: 100vw;
    min-height: 100vh;
    background: #F6F6F8;
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
    .containerBanner {
        position: relative;
        width: 100%;
        height: 302rpx;
        background: url('@/static/images/new-index/taocan/background.png') no-repeat center;
        background-size: 100vw 302rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .textImg {
            width: 579rpx;
            height: 130rpx;
        }
        .bgImg {
            position: absolute;
            bottom: 0;
            width: 579rpx;
            height: 82rpx;
        }
        .buttonImg {
            position: absolute;
            bottom: -40rpx;
            width: 690rpx;
            height: 72rpx;
            border-radius: 20rpx;
        }
    }
    .main {
        box-sizing: border-box;
        width: 100%;
        padding: 50rpx 30rpx;
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
            .listItem {
                margin: 24rpx 0;
                width: 100%;
                height: 538rpx;
                background-color: #fff;
                border-radius: 20rpx;
                .productImg {
                    width: 690rpx;
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
                        top: 65rpx;
                        right: 35rpx;
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}
</style>