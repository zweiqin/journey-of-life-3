<template>
    <view class="container">
        <p>{{ title }}</p>
        <view class="AmountSelection">
            <view class="selectionItem" v-for="(item, index) in amountData" :key="item">
                <p class="numbers">{{ item * 2  }}</p>
                <p class="title">{{index != amountData.length-1?'售价'+ item:'自定义金额'}}</p>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'AmountSelection',
    data() {
        return {
            title: '代金卷充值',
            amountData: [25, 50, 100, 1000, 2000, 0]
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin-top: 24rpx;
    box-sizing: border-box;
    padding: 21rpx 30rpx 32rpx 30rpx;
    width: 690rpx;
    border-radius: 20rpx;
    background: #FFFFFF;
    font-family: 思源黑体;
    > p {
        font-size: 32rpx;
        font-weight: 600;
        color: #222229;
    }
    .AmountSelection {
        margin-top: 23rpx;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 15rpx;
        .selectionItem {
            width: 200rpx;
            height: 200rpx;
            border-radius: 10rpx;
            background: #ff390c0d;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .numbers {
                font-size: 52rpx;
                font-weight: 500;
                line-height: 62rpx;
                font-feature-settings: "kern" on;
                color: #FF380C;
            }
            .title {
                margin-top: 18rpx;
                font-size: 28rpx;
                font-weight: normal;
                line-height: 42rpx;
                font-feature-settings: "kern" on;
                color: #9E9E9E;
            }
        }
    }
}
</style>