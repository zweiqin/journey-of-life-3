<template>
    <view class="container">
         <view class="selectInput">
            <!-- <input type="text"> -->
            <tui-input v-model="queryList.shopName" placeholder="请输入商家名字">
                <template slot="right">
                    <view class="selectBtn" @click="dataList = []; getList()">
                        搜索
                    </view>
                </template>
            </tui-input>
         </view>
         <view class="merchantList">
            <listItem v-for="datas in dataList" :key="datas.shopId" :datas="datas"></listItem>
         </view>
    </view>
</template>

<script>
import {
  getRechargeShopAllApi,
} from "@/api/anotherTFInterface";
import listItem from './listItem.vue'
export default {
    name: 'merchantList',
    components: {
        listItem
    },
    data() {
        return {
            queryList: {
                page: 1,
                pageSize: 10,
                shopName: '' // 商家名字
            },
            dataList: []
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            getRechargeShopAllApi(this.queryList).then(res => {
                res.data.records.forEach(item => {
                    this.dataList.push(item)
                })
                // console.log(this.dataList);
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