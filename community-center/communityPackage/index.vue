<template>
    <view class="mainBox">
        <TuanPageHead title="社区套餐" style="background: #Fff;">
					<view slot="left">
						<tui-icon
							name="toleft" :size="68" unit="rpx"
							color="#2a2b23"
							margin="0 20rpx 0 0" @click="goBack"
						></tui-icon>
					</view>
        </TuanPageHead>

        <!-- 背景板 z-index == 0 -->
        <GradationBackground></GradationBackground>
        <view class="HeightBox">
            <!-- <view class="MySetMeal" @click="mySetMeal">
                我的套餐
            </view> -->
        </view>

        <!-- 选择tab栏 -->
        <scroll-view :scroll-x="true" class="tabNavsContainer">
            <view class="selectClassBox">
                <view class="tabs-item" :class="{isActive: index == 0}" v-for="(item, index) in tabNavs" :key="index">
                    {{ item.serverName }}
                    <image v-if="index == 0" class="activeIocn" src="@/static/images/con-center/communityPackage/wande.png" mode="" ></image>
                </view>
            </view>
        </scroll-view>

        <view class="PackageList">
            <!-- <view class="ListItem" v-for="(item, index) in childsTabNavs" :key="item.id">
                <view class="bigClass">
                    <image class="" :src="item.picUrl" mode="" />
                </view>
                <view class="smallPackages">
                    <view class="PackagesItems" v-for="(childItem, childIndex) in ConvertJSON(item.extraInfo).selectServetree" :key="index">
                        <view class="pagesImgBox" :style="{'background-color': backgrounds[index]}">
                            <image class="pagesImg" :src="childItem.children[0].serverInfoUrl" mode="" />
                            <view class="SalesVolume">
                                已售 {{ 200 }} ++
                            </view>
                        </view>
                        <view class="pagesDetails">
                            <view class="names">{{ childItem.serverTypeName }}</view>
                            <view class="advantageTitle">{{ childItem.children[0].serverIntroduction || '带给你全新的效果' }}</view>
                            <view class="tagBox">
                                <text class="tags" type="success">提升效能</text>
                                <text class="tags" type="default">去除异味</text>
                            </view>
                            <view class="money">
                                <text class="nowMoney"><text style="font-size: 28rpx;">￥</text>{{ 299 }}</text> <text class="saveMoney">已省{{ 299 }} 元</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view> -->

            <view class="ListItem">
                <view class="bigClass">
                    <image class="" src="@/static/images/con-center/communityPackage/kongtiaoqingxi3.png" mode="" />
                </view>
                <view class="smallPackages">
                    <view class="PackagesItems" v-for="(item,index) in 5" :key="index">
                        <view class="pagesImgBox" :style="{'background-color': backgrounds[index]}">
                            <image class="pagesImg" :src="require(`@/static/images/con-center/communityPackage/smallktqx${item}.png`)" mode="" />
                            <view class="SalesVolume">
                                已售 {{ 200 }} ++
                            </view>
                        </view>
                        <view class="pagesDetails">
                            <view class="names">挂式空调+柜式空调</view>
                            <view class="advantageTitle">保护您和家人的健康享受更优质的生活</view>
                            <view class="tagBox">
                                <text class="tags" type="success">提升效能</text>
                                <text class="tags" type="default">去除异味</text>
                            </view>
                            <view class="money">
                                <text class="nowMoney"><text style="font-size: 28rpx;">￥</text>{{ 299 }}</text> <text class="saveMoney">已省{{ 299 }} 元</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
// import PageHead from 'pages/business-district/components/PageHead.vue'
import GradationBackground from './components/gradationBackground'
import { getNextLevelPage, getServersByAddr,} from "@/api/community-center/communityPackage";

export default {
    components: { 
        // PageHead, 
        GradationBackground
    },
    name: 'communityPackage',
    data() {
        return {
            tabNavs: ['空调清洗套餐','空调清洗套餐','空调清洗套餐','空调清洗套餐'],
            childsTabNavs: [],
            tabCurrenIndex: 0,
            backgrounds: ['#159AF2','#1D57D3','#F65455','#C60A2D','#F68F32'],
            query: {
                pageNo: 1,
                pageSize: 10,
            },
            renderData: {},
            serverData: [],
        }
    },
    async onShow() {
        await this.getServeTabData()
        this.getServeCardData()
    },
    methods: {
        goBack() {
            uni.navigateBack();
        },
        async getServeTabData() { //! 获取tab栏数据
            let address =
                this.$store.getters.detailAddress || "广东省佛山市顺德区龙江镇";
            // if (!address) {
            //   uni.navigateTo({ url: "/pages/choose-location/choose-location" });
            // }
            this.tabNavs = (
                await getServersByAddr({
                pageNo: 1,
                pageSize: 10,
                pid: 0,
                srvTypeEnum: "5",
                address,
                })
            ).records;
            console.log('tabNavs', this.tabNavs);
        },
        async getServeCardData() { //! 初始化渲染数据的方法，为其添加控制选择效果的属性
            this.childsTabNavs = (
                await getNextLevelPage({
                ...this.query,
                pid: this.tabNavs[this.tabCurrenIndex].id,
                })
            ).records;
            console.log('childsTabNavs', this.childsTabNavs);
        },
        ConvertJSON(jsonData) {
            console.log(JSON.parse(jsonData));
            return JSON.parse(jsonData)
        }
    }
}
</script>

<style lang="scss" scoped>
.mainBox {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    /* height: 3812rpx; */
    background-color: #F5F5F5;
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    .backIcon {
        margin-left: 20rpx;
        width: 34.08rpx;
        height: 30rpx;
    }
    .HeightBox {
        width: 750rpx;
        height: 304rpx;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .MySetMeal {
            margin-right: -10rpx;
            position: relative;
            box-sizing: border-box;
            padding: 10rpx 24rpx;
            font-size: 26rpx;
            width: 154rpx;
            height: 52rpx;
            border-radius: 50rpx 0px 0px 50rpx;
            background: #DEECF9;
        }
    }
    .tabNavsContainer {
        width: 100vw;
        height: 60rpx;
        white-space: nowrap;
        .selectClassBox {
            display: flex;
            .tabs-item {
                position: relative;
                margin-left: 20rpx;
                font-family: Source Han Sans;
                font-size: 32rpx;
                font-weight: 500;
                line-height: 40rpx;
                font-feature-settings: "kern" on;
                color: rgba(255, 255, 255, 0.8);
                .activeIocn {
                    position: absolute;
                    bottom: -14rpx;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 74rpx;
                    height: 14rpx;
                }
            }
            .isActive {
                color: #fff;
            }
        }
    }
    .PackageList {
        position: relative;
        width: 100vw;
        height: auto;
        box-sizing: border-box;
        padding: 32rpx;
        display: flex;
        flex-direction: column;
        gap: 24rpx;
        .ListItem {
            width: 100%;
            box-sizing: border-box;
            background: #FFFFFF;
            padding: 32rpx 24rpx;
            border-radius: 24rpx;
            .bigClass {
                > image {
                    width: 638rpx;
                    height: 236rpx;
                    border-radius: 16rpx;
                    overflow: hidden;
                }
            }
            .smallPackages {
                display: flex;
                flex-direction: column;
                gap: 20rpx;
                .PackagesItems {
                    display: flex;
                    .pagesImgBox {
                        position: relative;
                        width: 188rpx;
                        height: 142rpx;
                        border-radius: 8rpx;
                        display: flex;
                        align-items: center;
                        background: #C60A2D;
                         .pagesImg {
                            width: 188rpx;
                            height: 71rpx;
                            border-radius: 8rpx;
                        }
                        .SalesVolume {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 188rpx;
                            height: 44rpx;
                            background: rgba(34, 34, 41, 0.5);
                            text-align: center;
                            line-height: 44rpx;
                            font-size: 24rpx;
                            /* line-height: 32rpx; */
                            color: #FFFFFF;
                        }
                    }
                    .pagesDetails {
                        margin-left: 20rpx;
                        display: flex;
                        flex-direction: column;
                        gap: 10rpx;
                        .names {
                            font-size: 32rpx;
                            font-weight: 550;
                            line-height: 40rpx;
                            letter-spacing: 0px;
                            font-feature-settings: "kern" on;
                            color: #222229;
                        }
                        .advantageTitle {
                            font-family: Source Han Sans;
                            font-size: 24rpx;
                            font-weight: normal;
                            line-height: 32rpx;
                            color: #888889;
                        }
                        .tagBox {
                            display: flex;
                            gap: 20rpx;
                            .tags {
                                /* width: 104rpx; */
                                height: 36rpx;
                                border-radius: 8rpx;
                                padding: 4rpx 12rpx;
                                box-sizing: border-box;
                                font-size: 20rpx;
                                font-weight: normal;
                                line-height: 28rpx;
                            }
                            .tags[type = "default"] {
                                color: #FE2F29;
                                border: 1rpx solid #FE2F29;
                            }
                            .tags[type = "success"] {
                                color: #00C980;
                                border: 1px solid #00C980;
                            }
                        }
                        .money {
                            .nowMoney {
                                font-size: 32rpx;
                                font-weight: normal;
                                line-height: 40rpx;
                                color: #EF530E;
                            }
                            .saveMoney {
                                margin-left: 10rpx;
                                font-size: 20rpx;
                                font-weight: normal;
                                line-height: 28rpx;
                                color: #888889;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>