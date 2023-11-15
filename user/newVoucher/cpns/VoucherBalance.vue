<template>
    <view class="container">
        <p class="titles-one">代金卷余额</p>
        <view class="titles-two">
            <text class="number">0.00</text>元
        </view>
        <button class="btns">可兑换</button>
    </view>
</template>

<script>
export default {
    name: 'VoucherBalance'
}
</script>

<style lang="scss" scoped>
.container {
    width: 690rpx;
    height: 284rpx;
    border-radius: 20px;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    font-family: 思源黑体;
    .titles-one {
        font-size: 28rpx;
        color: #888889;
    }
    .titles-two {
        color: #222229;
        font-weight: 400;
        font-size: 32rpx;
        .number {
            font-weight: 400;
            font-size: 68rpx;
        }
    }
    .btns {
        width: 222rpx;
        height: 59rpx;
        border-radius: 50rpx;
        display: flex;
        flex-direction: column;
        padding: 9rpx 69rpx;
        font-size: 28rpx;
        line-height: 49rpx;
        color: #fff;
        background: linear-gradient(270deg, rgba(255, 56, 12, 0.41) 0%, #FF380C 70%);
    }
}
</style>