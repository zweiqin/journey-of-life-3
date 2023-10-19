<template>
    <view class="articleDetailsBox">
        <view class="containerHeader">
            <tui-icon color="#000" name="arrowleft" unit="rpx" :size="88"  @click="goBack"></tui-icon>
            <text class="headerTitle">文章详情</text>
        </view>
        <view class="Title">
            标题: {{ textData.postTitle }}
        </view>
        <view class="content">
            内容: {{ textData.postContent }}
        </view>
        <view class="images">
            <image class="imageItem" :src="textData.postCover"></image>
        </view>
    </view>
</template>

<script>
// lookPostRed({
//     redPacketId: this.formData.redPacketId,
//     uid: this.formData.uid
// }).then(res => {
//     console.log(res)
// })
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
        }).catch(err => {
            console.log('err')
        })
    },
    data() {
        return {
            textData: {
                postTitle: '1',
                postContent: '2',
                postCover: '3'
            },
            formData: {
                redPacketId: "",
                uid: ""
            }
        }
    },
    methods: {
        goBack() {
            uni.navigateBack();
        }
    }
}
</script>

<style lang="scss" scoped>
.containerHeader {
    box-sizing: border-box;
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
.Title {
    box-sizing: border-box;
    font-weight: 600;
    width: 100vw;
    font-size: 50rpx;
    padding: 30rpx;
    padding-bottom: 10rpx;
}
.content {
    box-sizing: border-box;
    /* font-weight: 600; */
    width: 100vw;
    font-size: 40rpx;
    padding: 30rpx;
    padding-top: 10rpx;
    padding-bottom: 10rpx;
}
.images {
     box-sizing: border-box;
     padding: 30rpx;
     padding-top: 10rpx;
     display: flex;
     flex-wrap: wrap;
     justify-content: space-between;
     align-items: center;
     .imageItem {
        width: 330rpx;
        height: 330rpx;
     }
}
</style>