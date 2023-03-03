<template>
  <view class="pane-container">
    <view class="pane-title-container">
      <view
        class="item"
        @click="handleChnageTab(0)"
        :class="{ active: currentMenu === 0 }"
        >供需大厅</view
      >
      <view
        class="item"
        @click="handleChnageTab(1)"
        :class="{ active: currentMenu === 1 }"
        >行业资讯</view
      >
    </view>

    <view class="container">
      <swiper
        class="swiper"
        :current="currentMenu"
        @change="handleSwiperChangeItem"
      >
        <swiper-item class="swiper-item">
          <tui-table borderWidth="0" class="tui-table">
            <tui-tr borderWidth="0">
              <tui-td
                borderWidth="0"
                textAlign="center"
                :size="24"
                v-for="(item, index) in supplyListHeader"
                :key="index"
                :span="item.span"
                >{{ item.title }}</tui-td
              >
            </tui-tr>

            <tui-tr
              borderWidth="0"
              @click="$emit('click', $event)"
              v-for="(item, index) in supplyList"
              :key="index"
              :index="index"
            >
              <tui-td
                @click="go('/stuff/gongqiu/gongqiu')"
                borderWidth="0"
                :color="obj.color"
                ellipsis
                :size="24"
                :span="obj.span"
                v-for="(obj, idx) in supplyListHeader"
                :key="idx"
                :keys="obj.key"
                :index="idx"
                >{{ item[obj.key] }}</tui-td
              >
            </tui-tr>
          </tui-table>
        </swiper-item>

        <swiper-item class="swiper-item">
          <ArticleItem
            v-for="article in articleList"
            :key="article.id"
            :data="article"
          ></ArticleItem>
        </swiper-item>
      </swiper>

      <button class="uni-btn look-more" @click="handleViewMore">
        查看更多
      </button>
    </view>
  </view>
</template>

<script>
import {
  getSupplyListApi,
  getIndustryInformationListApi,
} from '../../../../api/stuff'
import { supplyListHeader } from '../../config'
import ArticleItem from '../article.vue'
export default {
  components: {
    ArticleItem,
  },
  data() {
    return {
      currentMenu: 0,
      supplyList: [],
      supplyListHeader,
      articleList: [],
    }
  },

  mounted() {
    this.getSupplyList()
    this.getIndustryInformationList()
  },

  methods: {
    // 切换nav
    handleChnageTab(index) {
      this.currentMenu = index
    },

    // 获取供应列表
    async getSupplyList() {
      const { data } = await getSupplyListApi()
      this.supplyList = data.items
    },
    // 滑动切换
    handleSwiperChangeItem(e) {
      this.currentMenu = e.detail.current
    },

    async getIndustryInformationList() {
      const { data } = await getIndustryInformationListApi({
        page: 1,
        limit: 5,
      })

      this.articleList = data.items
    },

    handleViewMore() {
      this.go(this.currentMenu ? '/stuff/industry/infomation-list' : '/stuff/gongqiu/gongqiu')
    },
  },
}
</script>

<style lang="less" scoped>
.pane-container {
  background-color: #f6f6f5;

  .pane-title-container {
    display: flex;
    align-items: center;

    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 22upx 0;
      color: #8f8d85;
      font-size: 28upx;
      transition: all 350ms;

      &.active {
        background-color: #fff;
        border-radius: 24upx 24upx 0 0;
        font-weight: bold;
        color: #141000;
      }
    }
  }

  .container {
    padding: 32upx;
    box-sizing: border-box;
    background-color: #fff;

    .swiper{
      height: 174upx;
    }

    .swiper-item {
      height: 400upx;
      overflow-y: scroll;
    }
  }

  .look-more {
    text-align: center;
    color: #8f8d85;
    font-size: 26upx;
    margin-top: 32upx;
  }
}
</style>
