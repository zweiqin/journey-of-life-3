<template>
    <view class="gradationBackground">
        <image class="bigTitle" src="@/static/images/con-center/communityPackage/bigTitle.png"></image>
        <image class="car" src="@/static/images/con-center/communityPackage/car.png"></image>
        <image class="GoldCoin" src="@/static/images/con-center/communityPackage/GoldCoin.png"></image>
        <image class="GoldCoin2" src="@/static/images/con-center/communityPackage/GoldCoin2.png"></image>
        <image class="GoldCoin3" src="@/static/images/con-center/communityPackage/GoldCoin3.png"></image>
        <image class="line" src="@/static/images/con-center/communityPackage/line.png"></image>
    </view>
</template>

<style lang="scss" scoped>
.gradationBackground {
    position: absolute;
    top: 100rpx;
    left: 0;
    width: 100vw;
    height: 700rpx;
    background: linear-gradient(177deg, #19BBFC -10%, #2b7dd4 43%, #F5F5F5 95%);
    z-index: 0;
    .bigTitle {
        position: absolute;
        left: 47rpx;
        top: 81rpx;
        width: 294rpx;
        height: 164.5rpx;
        z-index: 1;
    }
    .car {
        position: absolute;
        left: 357rpx;
        top: -20rpx;
        width: 400rpx;
        height: 354rpx;
    }
    .line {
        position: absolute;
        left: 11rpx;
        top: 100.5rpx;
        width: 737rpx;
        height: 91.75rpx;
        z-index: 0;
    }
    .GoldCoin {
        position: absolute;
        top: 191rpx;
        left: -40rpx;
        width: 96.94rpx;
        height: 102.79rpx;
    }
    .GoldCoin2 {
        position: absolute;
        top: 46rpx;
        left: 94rpx;
        width: 30.46rpx;
        height: 31.1rpx;
    }
    .GoldCoin3 {
        position: absolute;
        top: 84rpx;
        left: 302rpx;
        width: 51.64rpx;
        height: 53.27rpx;
    }
}
</style>