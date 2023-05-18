<template>
  <view class="shop-detail">
    <!-- 头部导航 -->

    <Head></Head>

    <!-- 背景 -->
    <image class="bg-img" src="../../static/images/con-center/shop-detail/bg-shop.png"></image>

    <view class="main-area">
      <!-- 店铺信息 -->
      <ShopInfo :data="shopDetail"></ShopInfo>

      <!-- menu-list -->
      <MenuPane :activeData="apponitList" :serveList="allServeList"></MenuPane>

      <tui-divider width="50%" color="#333" backgroundColor="#f1f1f0" bold :size="36"
        dividerColor="#333">服务推荐</tui-divider>

      <!-- 服务项目 -->
      <ServerPane titleBg="linear-gradient(0deg, #FFF6DC 0%, #FFEBE3 100%)" margin="0 0 40upx" :id="item.id"
        v-for="(item, index) in servePaneList" :key="index" :title="item.title" :list="item.children">
      </ServerPane>
    </view>

  </view>
</template>

<script>
import Head from './cpns/Head.vue'
import ShopInfo from './cpns/ShopInfo.vue'
import MenuPane from './cpns/MenuPane.vue'
import { getServiceSortApi } from '../../api/community-center'
import ServerPane from '../../pages/community-center/cpns/ServerPane.vue'
export default {
  components: {
    Head,
    ShopInfo,
    MenuPane,
    ServerPane
  },

  data() {
    return {
      allServeList: [],
      servePaneList: [],
      apponitList: [],
      shopDetail: {}
    }
  },

  onLoad() {
    this.getAllServeList()
  },

  onShow() {
    this.shopDetail = this.$store.getters.homeCommunityStore
    console.log(this.shopDetail);
  },

  methods: {
    // 获取所有分类
    async getAllServeList() {
      const res = await getServiceSortApi({})
      if (res.statusCode === 20000) {
        console.log(res.data);
        this.allServeList = res.data
        for (const item of res.data) {
          let list = item.children[0].children
          if (list.length < 6 && item.children[1] && item.children[1].children.length >= 6) {
            list = item.children[1].children
          }
          if (item.serverNameOne === '家电清洗') {
            this.apponitList = item.children[0].children
            console.log(this.apponitList);
            continue
          }
          if (list.length % 3 === 0) {
            this.servePaneList.push({
              id: item.id,
              title: item.serverNameOne,
              children: list
            })
          }
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.shop-detail {
  min-height: 100vh;
  background-color: #f1f1f0;
  padding-bottom: 40upx;

  .bg-img {

    width: 100%;
    height: 427upx;
    margin-bottom: -170upx;
  }

  .main-area {
    position: relative;
    z-index: 1;
    padding: 0 30upx;
    box-sizing: border-box;
  }
}
</style>