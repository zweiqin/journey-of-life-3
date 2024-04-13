<template>
    <view class="historyList">
        <view class="historyListItem" v-for="(item, index) in dataList" :key="item.rechargeOrderSn">
						<view class="itemImages" style="background-color: #ff380c;padding: 20rpx;font-size: 40rpx;color: #ffffff;font-weight: bold;line-height: 1;">
							充
						</view>
            <view class="texts">
                <text class="names">余额充值</text>
                <text class="timers">{{ item.createTime }}</text>
            </view>
            <view class="addNumber">
                + {{ item.rechargeBalance * 2 }} 元
            </view>
        </view>
    </view>
</template>

<script>
import { getByRechargeApi } from '@/api/anotherTFInterface'
export default {
    name: 'historyRecord',
    data() {
        return {
            dataList: []
        }
    },
    created() {
        getByRechargeApi({
            page: 1,
            pageSize: 100
        }).then(res => [
            this.dataList = res.data.records
        ])
    }
}
</script>

<style lang="scss" scoped>
.historyListItem {
    margin: 6rpx 0;
    position: relative;
    box-sizing: border-box;
    padding: 16rpx 32rpx;
    width: 100%;
    display: flex;
    align-items: center;
    .itemImages {
        border-radius: 50%;
    }
    .texts {
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        /* gap: 10rpx; */
        .names {
            font-family: Source Han Sans;
            font-size: 34rpx;
            font-weight: 600;
            line-height: 40rpx;
            color: #222229;
        }
        .timers {
            margin-top: 8rpx;
            font-family: Source Han Sans;
            font-size: 30rpx;
            font-weight: normal;
            line-height: 32rpx;
            color: #888889;
        }
    }
    .addNumber {
        position: absolute;
        right: 20rpx;
        font-family: Source Han Sans;
        font-size: 40rpx;
        font-weight: 500;
        line-height: 40rpx;
        color: #222229;
    }
}
</style>