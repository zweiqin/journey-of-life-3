<template>
    <view class="mainBox">
        <TuanPageHead title="社区套餐" style="background: #Fff;">
            <image slot="left" src="@/static/images/con-center/goBack.png" class="backIcon" mode="" >
            </image>
        </TuanPageHead>
        <GradationBackground></GradationBackground>
        <!-- 选择tab栏 -->
        <scroll-view :scroll-x="true" class="tabNavsContainer">
            <view class="selectClassBox">
                <view class="tabs-item" :class="{isActive: index == 0}" v-for="(item, index) in tabNavs" :key="index">
                    {{ item }}
                </view>
            </view>
        </scroll-view>

        <scroll-view :scroll-x="true" class="tabNavsContainer2">
            <view class="selectClassBox">
                <view class="tabs-item" :class="{isActive: index == 0}" v-for="(item, index) in tabNavs" :key="index">
                    {{ item }}
                </view>
            </view>
        </scroll-view>

        <view style="width: 100vw;display:flex;align-items: center;">
            <image class="servePages" src="@/static/images/con-center/communityPackage/servePagesImage.png" mode="" />
        </view>

        <view class="priceNumber">
            ￥<text>299</text>
        </view>

        <view class="moreTitles">
            <view class="title1">任选2台家电</view>
            <view class="title2">保护您和家人的健康享受更优质的生活</view>
            <view class="tagBox">
                <text class="tags" type="success">提升效能</text>
                <text class="tags" type="default">去除异味</text>
            </view>
            <view class="Share">
                <image src="@/static/images/con-center/communityPackage/fenxiang.png" mode="" />
            </view>
        </view>

        <view class="SelectiveConfiguration">
            <view class="title1">
                服务清单 <text>(2项)</text>
            </view>
            <view class="selectItem">
                <view class="line"></view>
                <view class="selectNumbers">可选服务<text>1</text>/{{ 2 }}</view>
                <view class="line"></view>
            </view>
            <view class="ServiceSelection">
                <view class="serverItems" :class="{isActive: index == 0}" v-for="(item, index) in 6" :key="index">
                    <image class="images" src="@/static/images/con-center/communityPackage/kongtiao.png" mode="" />
                    <view class="serverName">挂式空调清洗</view>
                    <view class="prices">￥<text>148</text></view>
                </view>
            </view>
        </view>

        <view class="buyNow">
            <view class="titles">
                <view class="prices">支付金额 ￥299</view>
                <view class="everyServe">共计服务项目：2项</view>
            </view>
            <button class="goBuy">立即购买</button>
        </view>
    </view>
</template>

<script>
import { getNextLevelPage } from '@/api/community-center/communityPackage'
import GradationBackground from './components/gradationBackground3'
// import PageHead from 'pages/business-district/components/PageHead.vue'
export default {
    name: 'serviceCard',
    components: {
        // PageHead
        GradationBackground
    },
    created() {
        getNextLevelPage({
            pageNo: 1,
            pageSize: 10,
            pid: 0
        }).then(res => { 
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    data() {
        return {
            tabNavs: ['家电清洗随心搭','家电清洗随心搭','家电清洗随心搭','家电清洗随心搭'],
            tabNavs2:['任选2台家电','任选3台家电','任选4台家电','任选5台家电','任选8台家电']
        }
    }
}
</script>

<style lang="scss" scoped>
.mainBox {
    position: relative;
    width: 100vw;
    min-height: 00vh;
    padding-bottom: 180rpx;
    /* height: 3812rpx; */
    background-color: #F5F5F5;
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    .backIcon {
        margin-left: 20rpx;
        width: 34.08rpx;
        height: 30rpx;
    }
    .tabNavsContainer {
        /* width: 100vw; */
        height: 90rpx;
        box-sizing: border-box;
        padding: 0 32rpx;
        white-space: nowrap;
        .selectClassBox {
            position: relative;
            width: auto;
            display: flex;
            gap: 42rpx;
            height: 100%;
            .tabs-item {
                position: relative;
                width: auto;
                height: 100%;
                font-size: 28rpx;
                font-weight: normal;
                line-height: 80rpx;
                color: #888889;
                .activeIocn {
                    
                }
            }
            .isActive {
                font-size: 32rpx;
                line-height: 80rpx;
                font-weight: 500;
                color: #222229;
            }
            .isActive::before {
                content: '';
                width: 50rpx;
                height: 2rpx;
                border: 6rpx solid #222229;
                background-color: #222229;
                border-radius: 50rpx;
                position: absolute;
                bottom: 10rpx;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
    .tabNavsContainer2 {
        white-space: nowrap;
        min-height: 72rpx;
        box-sizing: border-box;
        padding: 10rpx 32rpx;
        .selectClassBox {
            display: flex;
            gap: 20rpx;
            .tabs-item {
                color: #888889;
                /* width: 182px; */
                box-sizing: border-box;
                height: 52rpx;
                font-size: 24rpx;
                line-height: 32rpx;
                border-radius: 24prx;
                padding: 10rpx 24rpx;
                background: #d2e0ea;
                border-radius: 24rpx;
            }
            .isActive {
                color: #222229;
                background: #FFFFFF;
            }
        }
    }
    .servePages {
        margin: 0 auto;
        margin-top: 55rpx;
        width: 686rpx;
        height: 258rpx;
        border-radius: 24rpx 24rpx 0px 0px;
    }
    .priceNumber {
        position: relative;
        width: 750rpx;
        height: 104rpx;
        box-sizing: border-box;
        padding: 32rpx;
        font-size: 28rpx;
        color: #EF530E;
        border-radius: 24rpx 24rpx 0px 0px;
        background-color: #ffffff;
        > text {
            font-size: 52rpx;
        }
    }
    .moreTitles {
        position: relative;
        background-color: #fff;
        box-sizing: border-box;
        padding: 32rpx;
        display: flex;
        flex-direction: column;
        gap: 10rpx;
        .title1 {
            font-size: 36rpx;
            font-weight: 550;
            line-height: 40rpx;
            color: #222229;
        }
        .title2 {
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
        .Share {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            width: 140rpx;
            height: 64rpx;
            > image {
                width: 100%;
                height: 100%;
            }
        }
    }
    .SelectiveConfiguration {
        position: relative;
        margin-top: 12rpx;
        box-sizing: border-box;
        padding: 32rpx;
        background-color: #fff;
        .title1 {
            font-size: 36rpx;
            font-weight: 500;
            line-height: 40rpx;
            color: #222229;
            > text {
                margin-left: 20rpx;
                font-size: 28rpx;
            }
        }
        .selectItem {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 28rpx;
            height: 68rpx;
            .selectNumbers {
                font-size: 26rpx;
                line-height: 40rpx;
                color: #888889;
                letter-spacing: 2rpx;
                > text {
                    color: #EF530E
                }
            }
            .line {
                width: 73rpx;
                height: 0rpx;
                opacity: 1;
                border: 1rpx solid #D8D8D8;
            }
        }
        .ServiceSelection {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            .serverItems {
                width: 33.3333%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .images {
                    width: 192rpx;
                    height: 192rpx;
                    border-radius: 16rpx;
                }
                .serverName {
                    font-size: 24rpx;
                    font-weight: normal;
                    /* line-height: 32px; */
                    text-align: center;
                    letter-spacing: 0px;
                }
                .prices {
                    color: #EF530E;
                    font-size: 24rpx;
                    font-weight: normal;
                    line-height: 32px;
                    text-align: center;
                    letter-spacing: 0px;
                    > text {
                        font-size: 32rpx;
                    }
                }
            }
        }
    }
    .buyNow {
        width: 100vw;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 2;
        box-sizing: border-box;
        padding: 40rpx 24rpx;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        .titles {
            .prices {
                margin-top: 10rpx;
                font-size: 28rpx;
                font-weight: 500;
                line-height: 40rpx;
                color: #222229;
            }
            .everyServe {
                font-family: Source Han Sans;
                font-size: 22rpx;
                font-weight: normal;
                line-height: 40rpx;
                color: #888889;
            }
        }
        .goBuy {
            margin: 0;
            width: 248rpx;
            height: 88rpx;
            border-radius: 50rpx;
            background: #EF530E;
            font-size: 32rpx;
            font-weight: 500;
            line-height: 80rpx;
            color: #FFFFFF;
        }
    }
}
</style>