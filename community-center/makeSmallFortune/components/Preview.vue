<template>
    <view class="articleDetailsBox">
        <view class="containerHeader">
            <tui-icon color="#000" name="arrowleft" unit="rpx" :size="68"  @click="$emit('checkoutCurrent', 0, true)"></tui-icon>
            <text class="headerTitle">文章详情</text>
        </view>
        <view class="Title">
            {{ textData.postTitle }}
        </view>
        <view class="PublisherInfo">
            <view class="PublisherInfoBox">
                <image v-if="textData.header" :src="textData.header" class="PublisherInfoAvatar"></image>
                <image v-else src="../../../static/images/new-user/default-user-avatar.png" class="PublisherInfoAvatar"></image>
                <text class="PublisherName">{{ textData.username }}</text>
            </view>
        </view>
        <view class="PreviewItem" v-for="(item, index) in PreviewData" :key="index">
            <view v-if="item.text" class="content" v-html="item.text"></view>
            <view class="images" v-if="item.imgUrl">
                <img class="imageItem" :src="item.imgUrl" />
            </view>
        </view>
        <!-- <view class="images">
            <image class="imageItem" v-if="textData.postCover" :src="textData.postCover"></image>
        </view>
        <view class="content">
            内容: {{ textData.postContent }}
        </view> -->
        <view class="guanggao">
            <view class="gglink" @click="gotoGuangGao(textData.redPacketInfo.link)">广告链接</view>
        </view>
        <view class="lingquREDBook">
            <button class="cnmd" @click="lingqu">领取奖励</button>
        </view>
                <view class="PublisherInfo">
            <view class="PublisherInfoBox">
                <image :src="textData.header" class="PublisherInfoAvatar"></image>
                <text class="PublisherName">{{ textData.username }}</text>
            </view>
            <view class="ReleaseTime">
                <view class="fenxiang">
										<tui-icon name="share" :size="40" unit="rpx" color="#08377f"></tui-icon>
                    <text class="fxtxt">分享</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'articleDetails',
    props: {
        textData: {
            type: Object,
            default: {}
        }
    },
    created(options) {
        this.PreviewData = JSON.parse(this.textData.postContent)
        this.PreviewData.forEach((item, index) => {
            item.text = item.text.replace(/\n|\r/g, "<br/>&nbsp;&nbsp;&nbsp;&nbsp;")
        })
        // console.log(this.PreviewData)
        // console.log(this.PreviewData)
    },
    data() {
        return {
            PreviewData: [],
        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.articleDetailsBox {
    height: 100vh;
    overflow-y: auto;
}
.lingquREDBook {
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
        display: flex;
            .PublisherInfoAvatar {
                width: 48rpx;
                height: 48rpx;
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
            margin-left: 300rpx;
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
        /* height: 800rpx; */
        /* max-height: 800rpx; */
     }
     /deep/ uni-image {
        width: auto;
        min-width: 330rpx !important;
        min-height: 330rpx !important;
        max-width: 642rpx !important;
        /* height: 800rpx; */
        /* max-height: 800rpx !important; */
    }
}
</style>