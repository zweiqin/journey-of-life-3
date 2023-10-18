<template>
    <view class="EditingPage">
        <view class="header">
            <text class="Cancel">取消</text>
            <view class="text">草稿将自动保存</view>
            <view class="btnBox">
                <view class="preview">预览</view>
                <view class="NextSteps">下一步</view>
            </view>
        </view>
        <view class="articlesTitle">
            <input type="text">
        </view>
    </view>
</template>

<script>
export default {
    name: 'EditingPage',
    data() {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
.EditingPage {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    .header {
        box-sizing: border-box;
        padding: 22rpx 30rpx;
        width: 750rpx;
        height: 88rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .Cancel {
            font-size: 28rpx;
            font-weight: normal;
            line-height: 44rpx;
            display: flex;
            align-items: center;
            color: #222229;
            &:active {
                color: rgb(201, 3, 3);
            }
        }
        .text {
            font-size: 28rpx;
            font-weight: normal;
            line-height: 44rpx;
            color: #C0BEC1;
        }
        .btnBox {
            width: 170rpx;
            height: 44rpx;
            display: flex;
            justify-content: space-between;
            font-size: 28rpx;
            color: #C0BEC1;
        }
    }
}
</style>