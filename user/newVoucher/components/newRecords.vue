<template>
    <view class="MakeMoneyRecordsBox">
        <view class="tabNavs">
            <view class="tabNavsItem" @click="chekoutCurrent(index)" :class="{active: currentIndex==index}" v-for="(item, index) in tabNavs" :key="item.name">
                {{ item.name }}
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'Records',
    data() {
        return {
            tabNavs: [{name: '转增记录'},{name: '收益记录'},{name: '充值记录'}],
            currentIndex: 0,
            dateSelection: [{name: '全部', value: 0}, { name: '本年', value: 5 }, { name: '本月', value: 4 }],
            dateIndex: 0,
        }
    }
}
</script>

<style lang="scss" scoped>
.MakeMoneyRecordsBox {
    flex: 1;
    width: 100vw;
    /* min-height: 84.6vh; */
    box-sizing: border-box;
    background-color: #ffffff;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    overflow: hidden auto;
    padding: 30rpx;
    display: flex;
    flex-direction: column;
    .tabNavs {
        width: 100%;
        height: 84rpx;
        display: flex;
        align-items: center;
        background-color: #fff;
        .tabNavsItem {
            box-sizing: border-box;
            text-align: center;
            padding: 0rpx 10rpx;
            /* width: 132rpx; */
            height: 51rpx;
            border-radius: 10rpx;
            font-family: 思源黑体;
            font-size: 28rpx;
            font-weight: normal;
            line-height: 51rpx;
            color: #222229;
            margin-right: 20rpx;
        }
        .active {
            background: #FF380C;
            color: #fff;
        }
    }
}
</style>