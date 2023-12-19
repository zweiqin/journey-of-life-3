<template>
    <view class="merchantItem">
        <view class="itemHeader">
            <image :src="common.seamingImgUrl(datas.shopLogo)" mode="" class="avatar"></image>
            <text class="topTitle">{{ datas.shopName }}</text>
            <view class="openMerchanDetail" @click="gotoMerchan">
                <text class="gotoUse">立即使用</text><image class="useMoney" src="@/static/images/entryOfMerchants/youjiantou.png"></image>
            </view>
        </view>
        <view class="numberTitle">
            <text class="titlesItem">
                余额: {{ datas.balance }}元
            </text>
            <text class="titlesItem">
                赠送金额: {{ datas.giveBalance }}元
            </text>
        </view>
        <view class="newTimer">
            <view class="newMarkers">
                最近
            </view>
            <text class="timeText">充值时间：2022-11-08 28:55:39</text>
            <button class="upBtn" @click="gotoUpMoney">
                充值
            </button>
        </view>
    </view>
</template>

<script>
export default {
    name: 'listItem',
    props: {
        datas: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {

        }
    },
    methods: {
        gotoMerchan() {
            uni.navigateTo({
                 url: `/community-center/shop/shop-detail?shopId=${this.datas.shopId}`
            });
        },
        gotoUpMoney() {
            if (this.datas.switchRecharge !== 1) {
                return uni.showToast({
                    title: '该商家未开通充值',
                    icon: 'none'
                });
            }
            uni.navigateTo({
                    url: `/another-tf/another-user/shop-recharge/shop-recharge?shopInfo=${JSON.stringify(this.datas)}`
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.numberTitle {
    margin-top: 10rpx;
    width: 100%;
    display: flex;
    align-items: center;
    height: 60rpx;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 60rpx;
    .titlesItem {
        letter-spacing: 2rpx;
        /* margin-right: 90rpx; */
        font-family: Source Han Sans;
        font-size: 32rpx;
        font-weight: normal;
        line-height: 32rpx;
        font-feature-settings: "kern" on;
        color: #222229;
    }
}
.merchantItem {
    position: relative;
    overflow: hidden;
    width: 100%;
    /* height: 281rpx; */
    background-color: #fff;
    border-radius: 24rpx;
    box-sizing: border-box;
    padding: 32rpx;
    margin: 20rpx 0rpx;
    .itemHeader {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        ::before {
            content: '';
            width: 100%;
            height: 2rpx;
            position: absolute;
            bottom: -10rpx;
            left: 0;
            background-color: #F3F3F3;
        }
        .avatar {
            width: 60rpx;
            height: 60rpx;
            border-radius: 50%;
        }
        .topTitle {
            margin-left: 12rpx;
            justify-self: flex-start;
            width: 353rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 32rpx;
            font-weight: 600;
            line-height: 40rpx;
            color: #262F40;
        }
        .openMerchanDetail {
            position: absolute;
            right: 0;
            .gotoUse {
                font-size: 26rpx;
                font-weight: normal;
                line-height: 32rpx;
                color: #888889;
                margin-right: 10rpx;
            }
            .useMoney {
                width: 18rpx;
                height: 24rpx;
            }
        }
    }
    .newTimer {
        margin-top: 20rpx;
        position: relative;
        width: 100%;
        height: 66rpx;
        border-radius: 12rpx;
        background: #FFF0EA;
        box-sizing: border-box;
        padding: 12rpx 46rpx;
        display: flex;
        align-items: center;
        .newMarkers {
            position: absolute;
            top: -10rpx;
            left: -30rpx;
            width: 64rpx;
            height: 36rpx;
            transform: scale(0.8);
            border-radius: 24rpx 0px 24rpx 0px;
            padding: 4rpx 12rpx;
            text-align: center;
            background: #49CE8B;
            font-family: Source Han Sans;
            font-size: 20rpx;
            font-weight: normal;
            line-height: 36rpx;
            color: #FFFFFF;
        }
        .timeText {
            font-family: Source Han Sans;
            font-size: 24rpx;
            font-weight: normal;
            line-height: 32rpx;
            font-feature-settings: "kern" on;
            color: #888889;
        }
        .upBtn {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 116rpx;
            height: 66rpx;
            border-radius: 12rpx;
            background: #EF530E;
            font-size: 26rpx;
            line-height: 66rpx;
            color: #FFFFFF;
        }
    }
}
</style>