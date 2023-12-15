<template>
    <view class="container">
        <view class="TotalRevenue">
            <view class="amountText">
                总收益 &nbsp;(元) &nbsp;:&nbsp; {{ acountNumbers['总收益'] }}
            </view>
        </view>
        <view class="MakeMoneyRecordsList">
            <scroll-view scroll-y="true" class="scrollY" @scrolltolower="getMore">
                <view class="listItem" v-for="(item, index) in dataList" :key="index">
                    <view class="itemIcon" style="background: #FF380C;">
                        <image class="Iconimg" src="@/static/images/user/zengsong.png"></image>
                    </view>
                    <text class="txt2">{{ item.number }}</text>
                    <view class="itemDetails">
                        <text class="txt1">代金卷{{ item.typeStrName }}</text>
                        <text class="txt3">{{ item.typeStrName }}  ID : {{ item.id }}</text>
                        <text class="txt3">{{ item.createTime }}</text>
                    </view>
                    <view style="display: flex; flex-direction: column; margin-left: 50upx; align-items: center;">
                        <image style="width: 80upx; height: 80upx; border-radius: 50%; border: 1upx solid #f3f3f3;"  :src="item.imgOne"></image>
                        <text style="font-size: 24upx;">{{ item.userNameOne }}</text>
                    </view>
                </view>
             </scroll-view>
        </view>
    </view>
</template>

<script>
import { transferLogs, getAll } from '@/api/user/voucher'
export default {
    name: 'RechargeRecord',
    props: {
        condition: {
            type: [Number, String],
            default: 5
        },
        acountNumbers: {
            type: Object,
            default: {
                ['总支出']: 0,
                '总收入': 0
            }
        }
    },
    data() {
        return {
            queryList: {
                page: 1,
                pageSize: 20,
                type: 3
            },
            dataList: []
        }
    },
    created() {
        this.getListData()
    },
    methods: {
        getListData() {
            transferLogs({
                ...this.queryList,
                condition: this.condition
            }).then(res => {
                if (res.data.records.length <= 0) {
                    uni.showToast({
                        title: '没有更多了',
                        icon: 'none'
                    });
                }
                for (let index = 0; index < res.data.records.length; index++) {
                    this.dataList.push(res.data.records[index])
                }
                // this.dataList = res.data.records;
                // console.log(res);
            }).catch(err => {
                console.log(err);
            })
        },
        getMore() {
            this.queryList.page++;
            this.getListData();
        },
    },
    watch: {
        condition(newVlaue, oldVlaue) {
            this.dataList = []
            this.getListData();
        }
    }
}
</script>

<style lang="scss" scoped>
.TotalRevenue {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 10rpx;
    /* height: 38rpx; */
    .amountText {
        /* display: flex;
        align-items: center; */
        margin: 20rpx 0rpx;
        font-family: 思源黑体;
        font-size: 32rpx;
        font-weight: normal;
        line-height: 32rpx;
        font-feature-settings: "kern" on;
        color: #222229;
    }
}
.scrollY {
    height: 100%;
}
.container {
    box-sizing: border-box;
    padding-bottom: 216rpx;
}
    .MakeMoneyRecordsList {
        height: 59vh;
        overflow: hidden auto;
        .listItem {
            margin-top: 50rpx;
            /* margin: 50rpx 0rpx; */
            width: 100%;
            height: 120rpx;
            display: flex;
            font-family: 思源黑体;
            position: relative;
            .itemIcon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 68rpx;
                height: 68rpx;
                border-radius: 8rpx;
                background: #49CE8B;
                .Iconimg {
                    width: 50rpx;
                    height: 50rpx;
                }
            }
            .txt2 {
                position: absolute;
                right: 20rpx;
                top: 30rpx;
                font-family: 思源黑体;
                font-size: 42rpx;
                line-height: 5rpx;
                color: #222229;
            }
            .itemDetails {
                margin-left: 20rpx;
                display: flex;
                flex-direction: column;
                font-size: 24rpx;
                .txt1 {
                    font-size: 28rpx;
                    font-weight: normal;
                    line-height: 32rpx;
                    color: #222229;
                }
                .txt3 {
                    margin-top: 10rpx;
                    font-size: 24rpx;
                    font-weight: normal;
                    line-height: 32rpx;
                    color: #888889;
                }
            }
        }
    }
</style>