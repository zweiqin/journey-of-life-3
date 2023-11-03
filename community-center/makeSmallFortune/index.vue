<template>
      <view class="MakeSmallFortuneBox">
        <view class="shop-header-container">
			<image class="back-icon" src="@/static/images/new-business/category/back.png" @click="goBack"></image>
			<view class="search-container">
				<text style="font-weight: bold;font-size: 36upx;">文章中心</text>
				<tui-input
					v-model="queryInfo.search" label="" placeholder="社区商圈"
					clearable is-fillet padding="6upx 10upx 6upx 26upx"
					style="flex: 1;margin-left: 16upx;border: 2upx solid #EF5511;"
				>
					<template #right>
                        <!-- @click="queryInfo.search && getNearByShopList(true)" -->
						<tui-button
							type="warning" width="120rpx" height="50rpx" shape="circle"
							style="background: #ee692f!important;"
						>
							搜索
						</tui-button>
					</template>
				</tui-input>
			</view>
		</view>
        <!-- <view class="containerHeader">
            <tui-icon color="#000" name="arrowleft" unit="rpx" :size="88"  @click="goBack"></tui-icon>
            <text class="headerTitle">文章中心</text>
            <form @submit="getPostList">
            <view class="SearchBox">
                <input class="searchText" type="text" placeholder="看文章赚小钱" />
                <button class="submitBtn" form-type="submit">搜索</button>
            </view>
            </form>
        </view> -->
        <view class="TabMenus">
            <view class="tabItem" :class="{active:currentTab == index}" v-for="(item, index) in tabs" :key="index" @click="changeTab(index)">
                <image class="tabsIocn" :src="item.imgUrl"></image>
                <view class="tabName">{{ item.name }}</view>
            </view>
        </view>
        <view class="TabsToggle">
            <MakeSmallFortuneList @isLoading="isLoading" ref="MakeSmallFortuneList" v-if="currentTab == 0"></MakeSmallFortuneList>
            <MyRelease @isLoading="isLoading" ref="MyRelease" v-if="currentTab == 2"></MyRelease>
        </view>
        <CoolLoding v-show="isLoding"></CoolLoding>
      </view>
</template>

<script>
import MakeSmallFortuneList from './components/MakeSmallFortuneList.vue'
import CoolLoding from './components/CoolLodingView.vue'
import MyRelease from './components/MyRelease.vue'
export default {
    name: 'MakeSmallFortune',
    components: {
        MakeSmallFortuneList,
        MyRelease,
        CoolLoding
    },
    data() {
        return {
            currentTab: 0,
            isLoding: false,
            queryInfo: {
                search: ''
            },
            tabs: [{
                name: '赚小钱',
                imgUrl: require('@/static/images/new-community/home/book.png')
            },{
                name: '邻里互动',
                imgUrl: require('@/static/images/new-community/home/message.png')
            },{
                name: '发布记录',
                imgUrl: require('@/static/images/new-community/home/wodefabu.png')
            },{
                name: '去发布',
                imgUrl: require('@/static/images/new-community/home/ding.png')
            }]
        }
    },
    onShow() {
        uni.setNavigationBarTitle({
				title: '赚小钱'
		})
    },
    methods: {
        changeTab(index) {
            this.currentTab = index
            uni.setNavigationBarTitle({
				title: this.tabs[this.currentTab].name
			})
            if (index == 3) {
                this.currentTab = 0
                uni.navigateTo({
                     url: '/community-center/makeSmallFortune/release'
                });
            }
        },
        goBack() {
            uni.navigateBack();
        },
        isLoading(value) {
            // console.log(value)
            this.isLoding = value
        }
    },
    onReachBottom(value) {
        this.isLoding = true
        this.$refs.MakeSmallFortuneList.getMoewPostList()
    }
}
</script>

<style lang="scss">
/deep/ .tui-dialog {
    z-index: 11 !important;
}
/deep/ .tui-dialog__mask {
    z-index: 10 !important;
}
.shop-header-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 108upx;
		width: 100vw;
		background-color: #fff;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		z-index: 9;

		.back-icon {
			width: 48upx;
			height: 48upx;
			flex-shrink: 0;
		}

		.search-container {
			flex: 1;
			display: flex;
			align-items: center;
		}
	}
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
        padding-top: 108rpx;
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
            /* &::before {
                position: absolute;
                content: '';
                width: 0;
                height: 4rpx;
                left: 50%;
                bottom: -12rpx;
                transition: all 350ms;
                transform: translateX(-50%);
                background-color: #EF530E;
            } */
        }
        /* .active::before {
            width: 60%;
            transition: all 350ms;
        } */
    }
    .TabsToggle {
        margin-top: 20rpx;
        width: 100%;
        background-color: #fff;
        flex: 1;
        overflow: hidden;
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