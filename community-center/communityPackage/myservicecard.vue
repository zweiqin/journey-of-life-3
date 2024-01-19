<template>
    <view class="mainBox">
        <TuanPageHead title="我的服务卡" style="background: #Fff;">
            <image slot="left" src="@/static/images/con-center/goBack.png" class="backIcon" mode="" >
            </image>
        </TuanPageHead>
        <!-- 背景颜色 -->
        <GradationBackground></GradationBackground>
        <view class="topBox">
            <view class="messageBox">
                <image class="bottomBackground" src="@/static/images/con-center/communityPackage/backgroundimg.png" mode="" />
                <view class="numberBox no1">
                    <view class="numbers"><text>5</text>张</view>
                    <view class="titles">已购套餐</view>
                </view>
                <view class="numberBox no2">
                    <view class="numbers"><text>5</text>张</view>
                    <view class="titles">当前剩余套餐</view>
                </view>
                <view class="AddService">
                    <image src="@/static/images/con-center/communityPackage/addserve.png" mode="" />
                </view>
            </view>
        </view>
                <!-- 选择tab栏 -->
        <scroll-view :scroll-x="true" class="tabNavsContainer">
            <view class="selectClassBox">
                <view class="tabs-item" :class="{isActive: index == 0}" v-for="(item, index) in tabNavs" :key="index">
                    {{ item }}
                </view>
            </view>
        </scroll-view>

        <view class="pagesList">
            <view class="PackagesItems" v-for="(item,index) in 5" :key="index">
                <view class="pagesImgBox" :style="{'background-color': backgrounds[index]}">
                    <image class="pagesImg" :src="require(`@/static/images/con-center/communityPackage/smallktqx${item}.png`)" mode="" />
                    <!-- <view class="SalesVolume">
                        已售 {{ 200 }} ++
                    </view> -->
                </view>
                <view class="pagesDetails">
                    <view class="names">挂式空调+柜式空调</view>
                    <view class="advantageTitle">保护您和家人的健康享受更优质的生活</view>
                    <view class="tagBox">
                        <text class="tags" type="success">提升效能</text>
                        <text class="tags" type="default">去除异味</text>
                    </view>
                    <view class="money">
                        <text class="nowMoney"><text style="font-size: 28rpx;">￥</text>{{ 299 }}</text> <text class="saveMoney">已省{{ 299 }} 元</text>
                    </view>
                    <button class="gotoUse" type="success">去使用</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import PageHead from 'pages/business-district/components/PageHead.vue'
import GradationBackground from './components/gradationBackground2'
export default {
    name: 'myservicecard',
    components: {
        GradationBackground,
        PageHead
    },
    data() {
        return {
            tabNavs: ['已购买','未支付','已使用','已失效'],
            backgrounds: ['#159AF2','#1D57D3','#F65455','#C60A2D','#F68F32']
        }
    }
}
</script>

<style lang="scss" scoped>
.mainBox {
    position: relative;
    width: 750rpx;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .backIcon {
        margin-left: 20rpx;
        width: 34.08rpx;
        height: 30rpx;
    }
    .topBox {
        position: relative;
        margin: 64rpx 32rpx 24rpx 32rpx;
        width: 686rpx;
        height: 363rpx;
        border-radius: 24rpx 24rpx 0rpx 0rpx;
        background: linear-gradient(180deg, #FFFFFF 0%, #DAE4F7 123%);
        box-sizing: border-box;
        padding: 40rpx 24rpx;
        .messageBox{
            position: relative;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #4398F5 0%, #56BFF9 81%);
            .bottomBackground {
                position: absolute;
                top: 182rpx;
                left: 50%;
                transform: translateX(-50%);
                width: 674rpx;
                height: 134rpx;
            }
            .numberBox {
                display: flex;
                flex-direction: column;
                align-items: center;
                .numbers {
                    letter-spacing: 3rpx;
                    font-size: 24rpx;
                    line-height: 40rpx;
                    text-align: center;
                    font-feature-settings: "kern" on;
                    color: #FFFFFF;
                    > text {
                        font-size: 40rpx;
                    }
                }
                .titles {
                    font-size: 24rpx;
                    font-weight: normal;
                    line-height: 40rpx;
                    font-feature-settings: "kern" on;
                    color: #B9E5FD;
                }
            }
            .no1 {
                position: absolute;
                top: 55rpx;
                left: 55rpx;
            }
            .no2 {
                position: absolute;
                top: 55rpx;
                left: 204rpx;
            }
            .AddService {
                position: absolute;
                top: -8rpx;
                right: 25rpx;
                width: 88rpx;
                height: 116rpx;
                border-radius: 0px 0px 50rpx 50rpx;
                background: #FFFFFF;
                box-sizing: border-box;
                padding: 20rpx;
                > image {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .tabNavsContainer {
        width: 100vw;
        height: 60rpx;
        white-space: nowrap;
        .selectClassBox {
            padding-left: 32rpx;
            display: flex;
            gap: 52rpx;
            .tabs-item {
                font-size: 28rpx;
                font-weight: normal;
                line-height: 40rpx;
                color: #888889;
            }
            .isActive {
                font-size: 30rpx;
                font-weight: 500;
                line-height: 40rpx;
                text-align: center;
                color: #222229;
            }
        }
    }
    .pagesList {
        position: relative;
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 24rpx 32rpx;
        display: flex;
        flex-direction: column;
        gap: 24rpx;
        .PackagesItems {
            box-sizing: border-box;
            padding: 24rpx 34rpx;
            width: 100%;
            background: #fff;
            display: flex;
            border-radius: 24rpx;
            .pagesImgBox {
                position: relative;
                width: 188rpx;
                height: 142rpx;
                border-radius: 8rpx;
                display: flex;
                align-items: center;
                background: #C60A2D;
                    .pagesImg {
                    width: 188rpx;
                    height: 71rpx;
                    border-radius: 8rpx;
                }
                .SalesVolume {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 188rpx;
                    height: 44rpx;
                    background: rgba(34, 34, 41, 0.5);
                    text-align: center;
                    line-height: 44rpx;
                    font-size: 24rpx;
                    /* line-height: 32rpx; */
                    color: #FFFFFF;
                }
            }
            .pagesDetails {
                position: relative;
                margin-left: 20rpx;
                display: flex;
                flex-direction: column;
                gap: 10rpx;
                .names {
                    font-size: 32rpx;
                    font-weight: 550;
                    line-height: 40rpx;
                    letter-spacing: 0px;
                    font-feature-settings: "kern" on;
                    color: #222229;
                }
                .advantageTitle {
                    font-family: Source Han Sans;
                    font-size: 24rpx;
                    font-weight: normal;
                    line-height: 32rpx;
                    color: #888889;
                }
                .tagBox {
                    display: flex;
                    gap: 20rpx;
                    .tags {
                        /* width: 104rpx; */
                        height: 36rpx;
                        border-radius: 8rpx;
                        padding: 4rpx 12rpx;
                        box-sizing: border-box;
                        font-size: 20rpx;
                        font-weight: normal;
                        line-height: 28rpx;
                    }
                    .tags[type = "default"] {
                        color: #FE2F29;
                        border: 1rpx solid #FE2F29;
                    }
                    .tags[type = "success"] {
                        color: #00C980;
                        border: 1px solid #00C980;
                    }
                }
                .money {
                    .nowMoney {
                        font-size: 32rpx;
                        font-weight: normal;
                        line-height: 40rpx;
                        color: #EF530E;
                    }
                    .saveMoney {
                        margin-left: 10rpx;
                        font-size: 20rpx;
                        font-weight: normal;
                        line-height: 28rpx;
                        color: #888889;
                    }
                }
                .gotoUse {
                    position: absolute;
                    white-space: nowrap;
                    z-index: 2;
                    width: auto;
                    top: 137rpx;
                    left: 288rpx;
                    /* width: 120rpx; */
                    height: 52rpx;
                    border-radius: 50rpx;
                    font-size: 24rpx;
                    font-weight: normal;
                    line-height: 52rpx;
                    color: #FFFFFF;
                }
                .gotoUse[type = "success"] {
                    background: #0ECC3B;
                }
            }
        }
    }
}
</style>