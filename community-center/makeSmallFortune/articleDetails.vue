<template>
    <view class="articleDetailsBox">
        <view class="containerHeader">
            <tui-icon color="#000" name="arrowleft" unit="rpx" :size="68"  @click="goBack"></tui-icon>
            <text class="headerTitle">文章详情</text>
        </view>
        <view class="Title">
            {{ textData.postTitle }}
        </view>
        <view class="PublisherInfo">
            <view class="PublisherInfoBox">
                <image v-if="textData.head" :src="textData.head" class="PublisherInfoAvatar"></image>
                <image v-else src="../../static/images/new-user/default-user-avatar.png" class="PublisherInfoAvatar"></image>
                <text class="PublisherName">{{ textData.username || '烧电焊的小黄鸭' }}</text>
            </view>
            <!-- <view class="PublishAddress">
                发表于广东
            </view> -->
        </view>
        <view class="PreviewItem" v-for="(item, index) in PreviewData" :key="index">
            <view v-if="item.text" class="content" v-html="item.text">
                <!-- {{ item.text }} -->
            </view>
            <view class="images" v-if="item.imgUrl">
                <img class="imageItem" :src="item.imgUrl" />
            </view>
        </view>
        <view class="guanggao" v-if="textData.redPacketInfo.link">
            <view class="gglink" @click="gotoGuangGao(textData.redPacketInfo.link)">广告链接</view>
        </view>
        <view class="lingquREDBook">
            <view class="cnmd isChkPick" v-if="!(textData.redPacketInfo.remainingPacket > 0)">
                已结束
            </view>
            <button class="cnmd isChkPick" v-else-if="isChkPick">
                已领取
            </button>
            <button class="cnmd isChkPick" v-else-if="!isOverTimer">
                {{  setTimeoutText +'秒后开启领取' }}
            </button>
            <button class="cnmd"
                     v-else-if="isOverTimer"
                    @click="lingqu">
                {{ (isChkPick?'已领取':textData.redPacketInfo.remainingPacket > 0?'领取奖励':'已结束')}}
            </button>
            <!-- <button class="cnmd isChkPick" v-if="isChkPick">
                已领取
            </button>
            <button class="cnmd isChkPick" v-else-if="!isOverTimer">
                {{  setTimeoutText +'秒后开启领取' }}
            </button>
            <button class="cnmd"
                     v-else-if="isOverTimer && !isChkPick"
                    :class="{isChkPick:!(!isChkPick && (textData.redPacketInfo.remainingPacket > 0))}" 
                    :disabled="!(!isChkPick && textData.redPacketInfo.remainingPacket > 0)" 
                    @click="lingqu">
                {{ (isChkPick?'已领取':textData.redPacketInfo.remainingPacket > 0?'领取奖励':'已结束')}}
            </button> -->
            <view class="tui-modal-mask" :class="[isMaske ? 'tui-mask-show' : '']" @click.prevent="isMaske = false">
									<view class="starts sta1">
										<tui-icon name="star-fill" color="#fce6ac" size="58" unit="rpx" margin="0" bold></tui-icon>
									</view>
									<view class="starts sta2">
										<tui-icon name="star-fill" color="#fce6ac" size="52" unit="rpx" margin="0" bold></tui-icon>
									</view>
									<view class="starts sta3">
										<tui-icon name="star-fill" color="#fce6ac" size="52" unit="rpx" margin="0" bold></tui-icon>
									</view>
									<view class="starts sta4">
										<tui-icon name="star-fill" color="#fce6ac" size="44" unit="rpx" margin="0" bold></tui-icon>
									</view>
									<view class="starts sta5">
										<tui-icon name="star-fill" color="#fce6ac" size="54" unit="rpx" margin="0" bold></tui-icon>
									</view>
                  <view class="RedEnvelope">
                    <view class="redTop" v-if="redPacketInfo">
                       {{ redPacketInfo.amount? ` 恭喜获得${numDelivery(redPacketInfo.amount)}元红包`:'没领到红包。。。' }}
                    </view>
                    <view class="redTop" v-else>
                       红包已领完
                    </view>
                    <image v-if="isMaske" class="Content" :src="common.seamingImgUrl('1715139665281-contant.png')"></image>
                    <image class="TopLayer" :src="common.seamingImgUrl('1715139746764-topimg.png')"></image>
                    <view class="text" v-if="redPacketInfo" style="padding: 18rpx 66rpx;background-color: #f6d497;border-radius: 16rpx;">
                        {{ redPacketInfo.amount? `开心收下`:'`(*>﹏<*)′' }}
                    </view>
                    <view class="text2">
                        零钱将自动存入代金券
                    </view>
                  </view>
            </view>
        </view>
        <view class="PublisherInfo bottomInfo">
            <view class="PublisherInfoBox">
                <image :src="textData.head" class="PublisherInfoAvatar"></image>
                <text class="PublisherName">{{ textData.username || '烧电焊的小黄鸭' }}</text>
            </view>
            <view class="ReleaseTime">
                <view class="fenxiang" @click="shares">
										<tui-icon name="share" :size="40" unit="rpx" color="#08377f"></tui-icon>
                    <text class="fxtxt">分享</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { getUserId } from '@/utils';
import { lookPostRed, getPostDetails } from '@/api/community-center/makeSmallFortune'
export default {
    name: 'articleDetails',
    onLoad(options) {
        this.formData.uid = getUserId()
        // this.formData.redPacketId = options.data.redPacketInfo.redPacketId
        getPostDetails({
            postId: options.id
        }).then(res => {
            this.textData = res.data
            this.formData.redPacketId = res.data.redPacketInfo.redPacketId
            this.PreviewData = JSON.parse(this.textData.postContent)
            this.PreviewData.forEach((item, index) => {
                item.text = item.text.replace(/\n|\r/g, "<br/>&nbsp;&nbsp;&nbsp;&nbsp;")
            })
            // console.log(this.PreviewData);
            lookPostRed({
                redPacketId: this.formData.redPacketId,
                uid: this.formData.uid,
                isChkPick: 1
            }).then(res => {
                this.isChkPick = res.data
                this.isOverTimer = res.data
                if (!this.isOverTimer) {
                        setInterval(()=> {
                            this.setTimeoutText--
                            if (this.setTimeoutText == 0) {
                                this.isOverTimer = true
                            }
                        },1000)
                    }
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log('err')
        })
    },
    data() {
        return {
            isMaske: false,
            PreviewData: [],
            isChkPick: false,
            textData: {
                postTitle: '劲爆！0元可在附近就能开店快速落地！',
                postContent: '且夫水之积也不厚，则其负大舟也无力。覆杯水于 坳堂之上，则芥为之舟。置杯焉则胶，水浅而舟大 也。风之积也不厚，则其负大翼也无力。故九万里 则风斯在下矣，而后乃今培风；背负青天而莫之夭 阏者，而后乃今将图南。',
                postCover: '',
                header: '',
                username: '--',
            		redPacketInfo: {},
            },
            formData: {
                redPacketId: "",
                uid: ""
            },
            isOverTimer: false,
            setTimeoutText: 10,
            redPacketInfo: {},
        }
    },
    methods: {
        goBack() {
            uni.navigateBack();
        },
        gotoGuangGao(url) {
            window.open(url)
        },
        lingqu() {
            // this.isMaske = true
            lookPostRed({
                redPacketId: this.formData.redPacketId,
                uid: this.formData.uid,
            }).then(res => {
                if(res.errno == -1) {
                    uni.showToast({
                        title: res.errmsg,
                        icon: 'none',
                    })
                }else {
                    this.redPacketInfo = res.data
                    this.isMaske = true
                    this.isChkPick = true
                }
            }).catch(err => {
                console.log(err)
            })
        },
        shares() {
            uni.showToast({
                title: "点击右上角手动分享",
                icon: 'none',
                success: function (res) {
                this.exeRet = "success:" + JSON.stringify(res) + new Date()
                },
                fail: function (res) {
                this.exeRet = "fail:" + JSON.stringify(res)
                },
            })
            // uni.share({
            // provider: "weixin",
            // scene: "WXSceneSession",
            // type: 1,
            // summary: "快来和我一起领红包!!!!",
            // success: function (res) {
            //     console.log("success:" + JSON.stringify(res));
            // },
            // fail: function (err) {
            //     console.log("fail:" + JSON.stringify(err));
            // }
            // });
        },
        numDelivery(num) {
            var result = parseFloat(num);
            if (isNaN(result)) {
                return 0;
            }
            result = Math.round(num * 100) / 100;
            return result;
        },
    }
}
</script>

<style lang="scss" scoped>
.isChkPick {
    background-color: #888889 !important;
}
@keyframes rotateStar {
  0% {
    transform: rotate(0) scale(0);
  }

  50% {
    transform: rotate(180deg) scale(1.2);
  }

  100% {
    transform: rotate(360deg) scale(0);
  }
}
.starts {
    position: fixed;
    z-index: 1;
}
.sta1 {
    left: 606.62rpx;
    top: 594rpx;
    width: 68rpx;
    height: 72rpx;
    animation: rotateStar 2.4s linear infinite;
}
.sta2 {
    left: 498.62rpx;
    top: 405rpx;
    width: 62rpx;
    height: 65rpx;
    animation: rotateStar 2.4s linear infinite;
}
.sta3 {
    left: 498.62rpx;
    left: 66.62rpx;
    width: 62rpx;
    height: 65rpx;
    animation: rotateStar 3.4s linear infinite;
}
.sta4 {
    left: 548.62rpx;
    top: 704rpx;
    width: 62rpx;
    height: 55rpx;
    animation: rotateStar 1.9s linear infinite;
}
.sta5 {
    left: 40rpx;
    top: 566.68rpx;
    width: 62rpx;
    height: 65rpx;
    opacity: 1;
    animation: rotateStar 2.4s linear infinite;
}
.RedEnvelope {
    position: relative;
    width: 522rpx;
    height: 721rpx;
    border-radius: 36rpx;
    background: linear-gradient(180deg, #EB592D 0%, #D13717 100%);
    overflow: hidden;
    flex-direction: column;
    display: flex;
    align-items: center;
    .redTop {
        margin-top: 60rpx;
        font-size: 48rpx;
        font-weight: 500;
        line-height: 52rpx;
        text-align: center;
        font-feature-settings: "kern" on;
        color: #FFFFFF;
    }
    .Content {
        position: absolute;
        top: 140rpx;
        /* top: 600rpx; */
        width: 320rpx;
        height: 404rpx;
        animation: goToTop 650ms;
    }
    .TopLayer {
        position: absolute;
        width: 668.51rpx;
        height: 535.71rpx;
        bottom: -62rpx;
        left: -75rpx;
    }
    .btn {
        position: absolute;
        bottom: 80rpx;
        width: 322rpx;
        height: 80rpx;
    }
    .text {
        position: absolute;
        bottom: 100rpx;
        font-family: Source Han Sans CN;
        font-size: 32rpx;
        font-weight: bold;
        line-height: 48rpx;
        text-align: center;
        letter-spacing: 0px;
        font-feature-settings: "kern" on;
        color: #8D2104;
    }
    .text2 {
        position: absolute;
        bottom: 20rpx;
        font-size: 24rpx;
        font-weight: 350;
        line-height: 44rpx;
        letter-spacing: 1.2rpx;
        color: #F8DBB0;
    }
}
@keyframes goToTop {
    0% {
        opacity: 0.4;
        top: 600rpx;
    }
    100% {
        opacity: 1;
        top: 140rpx
    }
}
.articleDetailsBox {
    box-sizing: border-box;
    position: relative;
    height: 100vh;
    overflow-y: auto;
    /* padding-bottom: 260rpx; */
}
.lingquREDBook {
    background-color: #fff;
    /* position: fixed;
    bottom: 160rpx; */
    margin-top: 30rpx;
    width: 100vw;
    height: 90rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .cnmd {
        width: 642rpx;
        height: 85rpx;
        border-radius: 16px;
        opacity: 1;
        background: #FF380C;
        line-height: 85rpx;
        color: #Fff;
        text-align: center;
    }
}
.guanggao {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    .gglink {
        font-family: Source Han Sans CN;
        font-size: 28rpx;
        font-weight: normal;
        line-height: 32rpx;
        display: flex;
        align-items: center;
        letter-spacing: 0rpx;
        font-feature-settings: "kern" on;
        color: #5B79FB;
    }
}
.containerHeader {
    box-sizing: border-box;
    padding-left: 30rpx;
    padding-top: 10rpx;
    padding-bottom: 10rpx;
    width: 750rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    background-color: #fff;
    .headerTitle {
        margin-left: 230rpx;
        font-size: 32rpx;
        font-weight: 600;
        line-height: 44rpx;
        text-align: center;
        letter-spacing: 0.32rpx;
        color: #222229;
    }
}
.PublisherInfo {
    box-sizing: border-box;
    width: 100vw;
    padding: 30rpx 50rpx 30rpx 50rpx;
    display: flex;
    align-items: center;
    .PublisherInfoBox {
        min-width: 300rpx;
        display: flex;
            .PublisherInfoAvatar {
                width: 48rpx;
                height: 48rpx;
                border-radius: 50%;
            }
            .PublisherName {
                margin-left: 20rpx;
                font-size: 28rpx;
                font-weight: normal;
                line-height: 44rpx;
                display: flex;
                align-items: center;
                color: #222229;
            }
    }
    .ReleaseTime {
        margin-left: 100rpx;
        font-size: 28rpx;
        font-weight: normal;
        line-height: 44rpx;
        display: flex;
        align-items: center;
        letter-spacing: 1.2rpx;
        font-feature-settings: "kern" on;
        color: #888889;
        .fenxiang {
            margin-left: 180rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            /* width: 48rpx; */
            height: 64rpx;
            .fenxiangimg {
                width: 25rpx;
                height: 25rpx;
            }
            .fxtxt {
                margin-top: 6rpx;
                width: 60rpx;
                font-size: 24rpx;
                font-weight: 350;
                line-height: 32rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                font-feature-settings: "kern" on;
                color: #08377F;
            }
        }
    }
}
.Title {
    box-sizing: border-box;
    font-weight: 600;
    width: 100vw;
    font-size: 42rpx;
    padding: 54rpx;
    padding-top: 30rpx;
    padding-bottom: 10rpx;
}
.content {
    box-sizing: border-box;
    /* font-weight: 600; */
    width: 100vw;
    font-size: 32rpx;
    padding: 54rpx;
    letter-spacing: 4rpx;
    line-height: 48rpx;
    padding-top: 10rpx;
    padding-bottom: 20rpx;
    text-indent: 2em;
    line-height: 1.5;
}
.images {
     box-sizing: border-box;
     padding: 30rpx;
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     align-items: center;
     .imageItem {
        min-width: 330rpx;
        min-height: 330rpx;
        max-width: 642px;
     }
}
.tui-modal-mask {
    position: relative;
    z-index: 99999;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
	transition: all 0.3s ease-in-out;
	opacity: 0;
	visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tui-mask-show {
	visibility: visible;
	opacity: 1;
}
/* .bottomInfo {
    background-color: #fff;
    position: fixed;
    bottom: 30rpx;
    left: 0;
} */
</style>