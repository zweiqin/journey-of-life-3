<template>
    <view class="MakeMoneyRecordsBox">
        <view class="tabNavs">
            <view class="tabNavsItem" @click="chekoutCurrent(index)" :class="{active: currentIndex==index}" v-for="(item, index) in tabNavs" :key="item.name">
                {{ item.name }}
            </view>
        </view>
        <view class="TotalRevenue">
            <view class="amountText">
                {{ MakeMoneyRecordsTitle[currentIndex] }} &nbsp;(元) &nbsp;:&nbsp; {{ currentIndex == 0?myRenderList.userRedIncome:everyDisburse }}
            </view>
            <view class="amountText" v-if="currentIndex == 1">
                已被领取额度 &nbsp;(元) &nbsp;:&nbsp; {{ beClaimedDisburse }}
            </view>
        </view>
        <view class="MakeMoneyRecordsList" v-if="currentIndex == 0">
            <scroll-view scroll-y="true" class="scrollY" @scrolltolower="pushList">
            <tui-swipe-action :operateWidth="140" v-for="(item, index) in myRenderList.recordList" :key="index">
                <template v-slot:content>
                    <view class="listItem">
                        <view class="itemIcon">
														<tui-icon
															name="bag" :size="50" unit="rpx"
															color="#fffefe"
															margin="0"
														></tui-icon>
                        </view>
                        <text class="txt2">{{ item.amount }}</text>
                        <view class="itemDetails">
                            <text class="txt1">代金卷收益</text>
                            <text class="txt3">赚小钱文章收益</text>
                            <text class="txt3">{{ item.createTime }}</text>
                        </view>
                    </view>
                </template>
                <template v-slot:button>
                    <view class="UserMessage">
                        <image class="userIcon" :src="item.user.avatar"></image>
                        <view class="userNmae">
                            {{ item.user.username }}
                        </view>
                    </view>
                </template>
            </tui-swipe-action>
            <!-- <view class="listItem" v-for="(item, index) in myRenderList.recordList" :key="index">
                
                <view class="itemIcon">
									<tui-icon
										name="bag" :size="50" unit="rpx"
										color="#fffefe"
										margin="0"
									></tui-icon>
                </view>
                <text class="txt2">{{ item.amount }}</text>
                <view class="itemDetails">
                    <text class="txt1">代金卷收益</text>
                    <text class="txt3">赚小钱文章收益</text>
                    <text class="txt3">{{ item.createTime }}</text>
                </view>
            </view> -->
            </scroll-view>
        </view>
        <view class="MakeMoneyRecordsList" v-else>
            <scroll-view scroll-y="true" class="scrollY" @scrolltolower="pushList">
                <tui-swipe-action :operateWidth="140" v-for="(item, index) in filterList" :key="index">
                <template v-slot:content>
                    <view class="listItem">
                        <view class="itemIcon" style="background: #FF380C;">
														<tui-icon
															name="strategy" :size="50" unit="rpx"
															color="#fffefe"
															margin="0"
														></tui-icon>
                        </view>
                        <text class="txt2">{{ item.amount }}</text>
                        <view class="itemDetails">
                            <text class="txt1">代金卷支出</text>
                            <text class="txt3">赚小钱文章支出</text>
                            <text class="txt3">{{ item.createTime }}</text>
                        </view>
                    </view>
                </template>
                <template v-slot:button>
                    <view class="UserMessage">
                        <image class="userIcon" :src="item.imgUrl"></image>
                        <view class="userNmae">
                            {{ item.nickName }}
                        </view>
                    </view>
                </template>
            </tui-swipe-action>
                <!-- <view class="listItem" v-for="(item, index) in filterList" :key="index">
                    <view class="itemIcon" style="background: #FF380C;">
											<tui-icon
												name="strategy" :size="50" unit="rpx"
												color="#fffefe"
												margin="0"
											></tui-icon>
                    </view>
                    <text class="txt2">{{ item.amount }}</text>
                    <view class="itemDetails">
                        <text class="txt1">代金卷收益</text>
                        <text class="txt3">赚小钱文章收益</text>
                        <text class="txt3">{{ item.createTime }}</text>
                    </view>
                </view> -->
            </scroll-view>
        </view>
    </view>
</template>

<script>
export default {
    name: "MakeMoneyRecords",
    props: {
        disburseRenderList: {
            type: Object,
            default: null
        },
        myRenderList: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            currentIndex: 0,
            tabNavs: [{name: '收益记录'},{name: '支出记录'}],
            MakeMoneyRecordsTitle: ['收益','支出'],
            query: {
                pageSize: 20
            },
            filterList: null // 过滤后的领取红包人数的数据
        }
    },
    created() {

    },
    computed: {
        everyDisburse: {
            get() {
                let number = 0;
                if (this.disburseRenderList) {
                    this.disburseRenderList.dtsPostRedPacketInfo.map((item, index) => {
                        number += item.totalAmount
                        return item
                    })
                }
                return Number(number.toString().match(/^\d+(?:\.\d{0,2})?/))
            }
        },
        beClaimedDisburse: {
            get() {
                let number = 0;
                if (this.disburseRenderList) {
                    this.disburseRenderList.recordList.map((item, index) => {
                        if (item.isReceive == 1) {
                            number += item.amount
                        }
                        return item
                    })
                    this.filterList = this.disburseRenderList.recordList.filter((item) => item.isReceive == 1)
                    console.log(this.filterList)
                }
                return Number(number.toString().match(/^\d+(?:\.\d{0,2})?/))
            }
        }
    },
    methods :{
        chekoutCurrent(index) {
            this.currentIndex = index
        },
        pushList() {
            console.log(1232)
        }
    }
}
</script>

<style lang="scss" scoped>
.UserMessage {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #bcb8b81f;
    box-sizing: border-box;
    padding: 15rpx;
    .userIcon {
        /* margin-left: 20rpx; */
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
    }
    .userNmae {
        margin-left: 15rpx;
        font-size: 32rpx;
        max-width: 150rpx;
        max-height: 130rpx;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
.scrollY {
    height: 100%;
}
.MakeMoneyRecordsBox {
    box-sizing: border-box;
    flex: 1;
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
    .TotalRevenue {
        width: 100%;
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
    .MakeMoneyRecordsList {
        flex: 1;
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
}
</style>