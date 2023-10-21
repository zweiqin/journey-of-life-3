<template>
    <view class="container">
        <swiper class="swiper" :current="current" :disable-touch="true" duration="200" :autoplay="false">
            <swiper-item>
                <EditingPage @checkoutCurrent="checkoutCurrent" :formData="formData"></EditingPage>
            </swiper-item>
            <swiper-item>
                <RewardPage v-if="isTesps" :formData="formData" @back="() => current = 0"></RewardPage>
                <Preview :textData="formData" v-else @checkoutCurrent="checkoutCurrent"></Preview>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
import EditingPage from './components/EditingPage.vue'
import RewardPage from './components/RewardPage.vue'
import Preview from './components/Preview.vue'
import { getUserId } from '@/utils';
export default {
    name: 'release',
    components: {
        EditingPage,
        RewardPage,
        Preview
    },
    onLoad() {
        this.region = uni.getStorageSync('ADDRES_REGION')
        this.formData.publishUserId = getUserId();
    },
    data() {
        return {
            current: 0,
            isTesps: true,
            formData: {
                postCover: require('@/static/images/new-community/home/bagayalu.png'),
                header: require('@/static/images/new-community/home/avatar1.png'),
                username: '蔡徐坤',
                region: '440606',
                publishUserId: "", // 发布者id
                postTitle: "", // 文章标题
                postContent:"", // 文章内容
                postCategoryId:"", // 文章分类id
                postType:"", // 文章类型：1-图文（1张封面）2-纯文字
                postCover:"", // 文章封面post_type=1是储存
                redPacketInfo: {
                        totalAmount:"", // 红包总金额
                        totalPacket:"", // 红包总个数
                        link:"" // 广告链接
                    }
            }
        }
    },
    created() {

    },
    methods: {
        checkoutCurrent(value, fuck) {
            this.current = value
            this.isTesps = fuck
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .swiper {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
}
</style>