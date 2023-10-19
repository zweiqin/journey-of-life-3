<template>
    <view class="MakeSmallFortuneBox">
        <view class="containerHeader">
            <tui-icon color="#8a2a2a" name="arrowleft" unit="rpx" :size="88"  @click="goBack"></tui-icon>
            <text class="headerTitle">文章中心</text>
            <form @submit="getPostList">
            <view class="SearchBox">
                <input class="searchText" type="text" placeholder="看文章赚小钱" />
                <button class="submitBtn" form-type="submit">搜索</button>
            </view>
            </form>
        </view>
        <view class="TabMenus">
            <view class="tabItem" :class="{active:currentTab == index}" v-for="(item, index) in tabs" :key="index" @click="changeTab(index)">
                <image class="tabsIocn" :src="item.imgUrl"></image>
                <view class="tabName">{{ item.name }}</view>
            </view>
        </view>
        <view class="TabsToggle">
            <MakeSmallFortuneList v-if="currentTab == 0"></MakeSmallFortuneList>
        </view>
    </view>
</template>

<script>
import MakeSmallFortuneList from './components/MakeSmallFortuneList.vue'
export default {
    name: 'MakeSmallFortune',
    components: {
        MakeSmallFortuneList
    },
    data() {
        return {
            currentTab: 0,
            tabs: [{
                name: '赚小钱',
                imgUrl: require('@/static/images/new-community/home/book.png')
            },{
                name: '邻里互动',
                imgUrl: require('@/static/images/new-community/home/message.png')
            },{
                name: '去发布',
                imgUrl: require('@/static/images/new-community/home/ding.png')
            }]
        }
    },
    methods: {
        changeTab(index) {
            this.currentTab = index
            if (index == 2) {
                this.currentTab = 0
                uni.navigateTo({
                     url: '/community-center/makeSmallFortune/release'
                });
            }
        },
        getPostList() {
            console.log(123)
        },
        goBack() {
            uni.navigateBack();
        }
    }
}
</script>

<style lang="scss">
.MakeSmallFortuneBox {
    width: 100vw;
    min-height: 100vh;
    background: #F6F6F8;
    display: flex;
    flex-direction: column;
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
            font-size: 32rpx;
            font-weight: 600;
            line-height: 44rpx;
            text-align: center;
            letter-spacing: 0.32rpx;
            color: #222229;
        }
    }
    .TabMenus {
        background-color: #fff;
        width: 100vw;
        height: 187rpx;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .tabItem {
            position: relative;
            width: 128rpx;
            /* height: 100%; */
            display: flex;
            flex-direction: column;
            align-items: center;
            .tabsIocn {
                width: 98rpx;
                height: 98rpx;
            }
            .tabName {
                font-size: 28rpx;
                font-weight: normal;
                line-height: 38rpx;
                text-align: center;
                display: flex;
                align-items: center;
                letter-spacing: 0.32rpx;
                color: #222229;
            }
            &::before {
                position: absolute;
                content: '';
                width: 0;
                height: 4rpx;
                left: 50%;
                bottom: -12rpx;
                transition: all 350ms;
                transform: translateX(-50%);
                background-color: #EF530E;
            }
        }
        .active::before {
            width: 60%;
            transition: all 350ms;
        }
    }
    .TabsToggle {
        margin-top: 20rpx;
        width: 100%;
        background-color: #fff;
        flex: 1;
    }
}
.SearchBox {
    margin-left: 30rpx;
    width: 473rpx;
    height: 72rpx;
    border-radius: 50rpx;
    background: #FFFFFF;
    box-sizing: border-box;
    border: 1px solid #EF530E;
    display: flex;
    align-items: center;
    .searchText {
        margin-left: 20rpx;
    }
    .submitBtn {
        width: 112rpx;
        height: 55rpx;
        border-radius: 50rpx;
        background: linear-gradient(270deg, #EF530E 0%, #EE6C33 100%);
        font-size: 24rpx;
        font-weight: 500;
        line-height: 44rpx;
        display: flex;
        align-items: center;
        letter-spacing: 0.32rpx;
        color: #FFFFFF;
        margin-right: 20rpx;
    }
}
</style>