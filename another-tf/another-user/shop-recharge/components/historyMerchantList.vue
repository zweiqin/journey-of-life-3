<template>
    <view class="container">
         <view class="merchantList">
            <listItem v-for="datas in dataList" :key="datas.shopId" :datas="datas"></listItem>
         </view>
    </view>
</template>

<script>
import {
  getRechargeShopAll,
  getByShopAll,
} from "@/api/anotherTFInterface/merchantUp";
import listItem from './listItem.vue'
export default {
    name: 'historyMerchantList',
    components: {
        listItem
    },
    data() {
        return {
            dataList: []
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            getByShopAll().then(res => {
                res.data.forEach(item => {
                    this.dataList.push(item)
                })
                console.log(this.dataList);
            }).catch(err => {
                console.log(err);
            })
        },
        getMoreList() {
            this.queryList.page++
            this.getList()
        }
        
    }
}
</script>

<style lang="scss" scoped>
.selectBtn {
    font-size: 32rpx;
    font-weight: normal;
    line-height: normal;
    font-feature-settings: "kern" on;
    color: #EF520E;
}
.selectInput{
    margin-top: -30rpx;
}
.merchantList {

}
</style>