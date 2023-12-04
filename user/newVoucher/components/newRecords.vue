<template>
    <view class="MakeMoneyRecordsBox">
        <view class="tabNavs">
            <view style="display:flex;">
                <view class="tabNavsItem" @click="chekoutCurrent(index)" :class="{active: currentIndex==index}" v-for="(item, index) in tabNavs" :key="item.name">
                    {{ item.name }}
                </view>
            </view>
            <view class="dateSelection">
                 <view class="dateSetItem" @click="chekoutDateSelection(index)" :class="{activeDate: dateIndex==index}" v-for="(item, index) in dateSelection" :key="item.name">
                    {{ item.name }}
                 </view>
            </view>
        </view>
        <view class="listMain">
            <keep-alive>
                <RecordsEvery :acountNumbers="acountNumbers" ref="RecordsEvery" :condition="dateValue" v-if="currentIndex == 0"></RecordsEvery>
                <RechargeRecord :acountNumbers="acountNumbers" ref="RechargeRecord" :condition="dateValue" v-if="currentIndex == 1"></RechargeRecord>
                <IncrementRecord :acountNumbers="acountNumbers" ref="IncrementRecord" :condition="dateValue" v-if="currentIndex == 2"></IncrementRecord>
            </keep-alive>
        </view>
        <view class="footer">
            <view class="titles">
                <text>使用规则</text>|<text>常见问题</text>|<text>联系客服</text>
            </view>
            <view class="titles2">
                本服务由广东团蜂生活服务有限公司提供
            </view>
        </view>
    </view>
</template>

<script>
import RecordsEvery from '../cpns/RecordsEvery.vue'
import RechargeRecord from '../cpns/RechargeRecord.vue'
import IncrementRecord from '../cpns/IncrementRecord.vue'
import { getTotal } from '@/api/user/voucher'
export default {
    name: 'Records',
    components: {
        RecordsEvery,
        RechargeRecord,
        IncrementRecord
    },
    data() {
        return {
            tabNavs: [{name: '收益记录'},{name: '支出记录'},{name: '充值记录'}],
            currentIndex: 0,
            dateSelection: [{name: '年', value: 5}, { name: '月', value: 4 }, { name: '日', value: 1 }],
            dateIndex: 0,
            dateValue: 0,
            acountNumbers: null
        }
    },
    created() {
        this.getAcountNumber()
    },
    methods: {
        getAcountNumber() {
            getTotal({
                type: 3 - this.currentIndex,
                condition: this.dateValue
            }).then(res => {
                console.log(res);
                this.acountNumbers = res.data
            }).catch(err => {
                console.log(err);
            })
        },
        chekoutCurrent(index) {
            this.currentIndex = index
            this.getAcountNumber()
        },
        chekoutDateSelection(index) {
            if (index == this.dateIndex) {
                this.dateIndex = -1
                this.dateValue = 0
            }else {
                this.dateIndex = index
                this.dateValue = this.dateSelection[index].value
            }
            this.getAcountNumber()
        },
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
        justify-content: space-between;
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
         .dateSelection {
            width: 152rpx;
            height: 46rpx;
            border: 2rpx solid #FF380C;
            border-radius: 10rpx;
            display: flex;
            .dateSetItem {
                text-align: center;
                line-height: 46rpx;
                flex: 1;
                color: #FF380C;
            }
            .activeDate {
                font-size: 32rpx;
                color: #fff;
                background: #FF380C;
            }
        }
    }
    .listMain {
        width: 100%;
        flex: 1;
        /* height: 1360rpx; */
        overflow: hidden;
    }
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 196rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #F4F3F8;
        .titles {
            margin-top: 54rpx;
            width: 432rpx;
            height: 32rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #D8D8D8;
            > text {
                /* margin-top: 4rpx; */
                font-size: 24rpx;
                font-weight: 350;
                line-height: 30rpx;
                color: #222229;
            }
        }
        .titles2 {
            margin-top: 24rpx;
            position: relative;
            font-size: 24rpx;
            font-weight: 350;
            line-height: 32rpx;
            color: #888889;
            &::before {
                content: '';
                width: 93rpx;
                height: 2rpx;
                position: absolute;
                background-color: #888889;
                left: -110rpx;
                top: 50%;
            }
            &::after {
                content: '';
                width: 93rpx;
                height: 2rpx;
                position: absolute;
                background-color: #888889;
                right: -110rpx;
                top: 50%;
            }
        }
    }
}
</style>