<template>
    <view class="topUpContainer">
        <VoucherBalance :userAcount="userAcount"></VoucherBalance>
        <view v-show="isGift" class="selectAcount">
            <tui-form ref="giftForm">
                <tui-input :borderBottom="false" label="转增账号" placeholder="请输入用户的手机号" v-model="findUserId">
                    <button class="selectBtn" slot="right" @click="getUserInfo">查询</button>
                </tui-input>
                <view class="selectUserInfo" v-if="findUserInfo">
                    <image class="userAvatar" :src="findUserInfo.oldTF.avatarUrl"></image> <text class="userName">{{ findUserInfo.oldTF.nickName }}</text>
                </view>
                <tui-input @input="getCustomValue(amountData.length-1)" @focus="customNumber" type="number" :borderBottom="false" label="转增金额" min="0" max="20000" placeholder="请输入金额" v-model="amountData[amountData.length-1].value">
                    <button class="selectBtn" slot="right">充值</button>
                </tui-input>
            </tui-form>
            <view class="moneys">
                可用金额：{{ userAcount.number || '0.00' }} 元
            </view>
        </view>
        <AmountSelection ref="AmountSelection" v-bind="$props" @getCustomValue="getCustomValue" :amountData="amountData"></AmountSelection>
        <view class="VoucherService">
            <p class="title">代金卷服务</p>
            <view class="VoucherServiceBox">
                <view class="VoucherServiceItem">
                    <image class="icons" src="@/static/images/user/qianbao.png"></image>
                    <text class="texts">充值记录</text>
                </view>
                <view class="VoucherServiceItem">
                    <image class="icons" src="@/static/images/user/zhuanzheng.png"></image>
                    <text class="texts">转增记录</text>
                </view>
                <view class="VoucherServiceItem">
                    <image class="icons" src="@/static/images/user/shouyi.png"></image>
                    <text class="texts">收益记录</text>
                </view>
            </view>
        </view>
        <view class="footer">
            <view class="titles">
                <text>使用规则</text>|<text>常见问题</text>|<text>联系客服</text>
            </view>
            <view class="titles2">
                本服务由广东团蜂生活服务有限公司提供
            </view>
        </view>
        <view class="footerButton">
            <button class="fuckBtn" @click="submitVouchers" v-if="!isGift">￥{{ amount }}&nbsp;立即充值</button>
            <button class="fuckBtn" @click="giftVouchers" v-else>￥{{ amount }}&nbsp;立即转赠</button>
        </view>
    </view>
</template>

<script>
import { submitVouche, giftVoucher } from '@/api/user/voucher'
import VoucherBalance from '../cpns/VoucherBalance.vue'
import AmountSelection from '../cpns/AmountSelection.vue'
import { handleDoPay } from '@/utils/payUtil'
import { refrshUserInfoApi } from '@/api/user' // userID
import { getAnotherTFTokenApi } from '@/api/anotherTFInterface' // phone 电话号码

export default {
    components: {
        VoucherBalance,
        AmountSelection
    },
    props: {
        userAcount: {
            type: Object,
            default: {}
        },
        userInfo: {
            type : Object,
            default: {}
        },
        isGift: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            amountData: [{value: 50, price: 25}, 
            {value: 100, price: 50}, 
            {value: 200, price: 100}, 
            {value: 2000, price: 1000}, 
            {value: 4000, price: 2000}, 
            {value: 0, price: 0}],
            amount: 25,
            findUserId: '',
            findUserInfo: null
        }
    },
    methods: {
        getCustomValue(index) {
            // console.log(1);
            this.amountData[index].price = this.amountData[index].value/2
            this.amount = this.amountData[index].price
        },
        submitVouchers() {
            let {buyerUserId,token} = this.userInfo
            submitVouche({
                voucherId: '1',
                number: this.amount * 2,
                payGrade: this.amount,
                // token,
                // buyerUserId
            }).then(res => {
                handleDoPay({...res.data, paymentMode: 4, huabeiPeriod: -1}, 4)
            }).catch(err => {
                console.log(err);
            })
        },
        getUserInfo() {
            refrshUserInfoApi({ // 书写屎山 因为要查两遍 so。。。。 await简化后面再说
                userId: this.findUserId
            }).then(res => {
                let userData = res.data
                getAnotherTFTokenApi({ // 
                    phone: userData.phone
                }).then(res => {
                    this.findUserInfo = { oldTF: userData, newTF: res.data}
                }).catch(err => {
                    console.log(err);
                })
                // console.log(res);
            }).catch(err => {
                console.log(err);
            })
        },
        customNumber() {
            this.$refs.AmountSelection.active = this.amountData.length -1
        },
        giftVouchers() {
            if (!this.findUserInfo) return this.$showToast('请选择赠送对象')
            if (!this.amount || this.amount <= 0) return this.$showToast('赠送金额大于需大于0')
            giftVoucher({
                "buyerUserId": this.findUserInfo.newTF.buyerUserId,
                "voucherNum":this.amount
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.selectUserInfo {
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx;
    .userAvatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
    }
    .userName {
        margin-left: 36rpx;
        font-size: 42rpx;
    }
}
.selectBtn {
    width: 92rpx;
    height: 47rpx;
    border-radius: 50rpx;
    background: rgba(255, 56, 12, 0.8784);
    display: flex;
    justify-content: center;
    font-size: 28rpx;
    line-height: 47rpx;
    white-space: nowrap;
    color: #FFFFFF;
}
.topUpContainer {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    .VoucherService {
        margin-top: 24rpx;
        box-sizing: border-box;
        padding: 21rpx 30rpx 32rpx 30rpx;
        width: 690rpx;
        height: 238rpx;
        border-radius: 20rpx;
        background: #FFFFFF;
        .title {
            font-size: 32rpx;
            font-weight: 600;
            font-feature-settings: "kern" on;
            color: #222229;
        }
        .VoucherServiceBox {
            margin-top: 40rpx;
            display: flex;
            justify-content: space-around;
            .VoucherServiceItem {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                .icons {
                    width: 48rpx;
                    height: 48rpx;
                }
                .texts {
                    margin-top: 10rpx;
                    font-size: 28rpx;
                    color: #222229;
                }
            }
        }
    }
    .selectAcount {
        box-sizing: border-box;
        padding-top: 6rpx;
        padding-bottom: 30rpx;
        margin-top: 24rpx;
        width: 690rpx;
        /* height: 322rpx; */
        border-radius: 20rpx;
        background-color: #fff;
        overflow: hidden;
        .moneys {
            margin-top: 56rpx;
            float: right;
            margin-right: 30rpx;
            font-size: 32rpx;
            line-height: 32rpx;
            color: #222229;
        }
    }
    .footer {
        width: 690rpx;
        height: 196rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
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
    .footerButton {
        width: 100%;
        height: 120rpx;
        display: flex;
        align-items: center;
        background-color: #fff;
        padding-bottom: 40rpx;
        .fuckBtn {
            width: 690rpx;
            height: 88rpx;
            border-radius: 16rpx;
            padding: 20rpx 48rpx;
            gap: 19.999998092651367rpx;
            background: #FF380C;
            font-family: 思源黑体;
            font-size: 32rpx;
            line-height: 48rpx;
            color: #FFFFFF;
        }
    }
}
</style>