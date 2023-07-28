<template>
  <view class="industry-container">
    <view class="header-back" :class="{ fixed: scrollTop > 200 }">
      <tui-icon @click="handleBack" name="arrowleft"></tui-icon>
    </view>

    <ul class="list">
      <li v-for="item in articleList" :key="item.id">
        <Article :data="item"></Article>
      </li>
    </ul>

    <LoadingMore v-show="status !== 'none'" :status="status"></LoadingMore>
  </view>
</template>

<script>
import Article from '../../pages/stuff/cpns/article.vue';
import { getIndustryInformationListApi } from '../../api/stuff';
export default {
  components: {
    Article
  },

  data() {
    return {
      query: {
        page: 1,
        limit: 20
      },

      total: 0,
      articleList: [],
      status: 'none',
      scrollTop: 0
    };
  },

  methods: {
    handleBack() {
      uni.navigateTo({
        url: '/pages/stuff/stuff'
      });
    },

    async getArticleList(isLoadmore) {
      this.status = 'loading';
      const { data } = await getIndustryInformationListApi(this.query);
      this.total = data.total;
      if (isLoadmore) {
        this.articleList.push(...data.items);
      } else {
        this.articleList = data.items;
      }

      this.status = 'none';
      console.log(data);
    }
  },

  onLoad() {
    this.getArticleList();
  },

  onReachBottom() {
    if (this.query.limit > this.articleList.length) {
      this.status = 'none';
      return;
    }

    if (this.articleList.length >= this.total) {
      this.status = 'no-more';
      return;
    }

    this.query.page++;
    this.getArticleList(true);
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  }
};
</script>

<style lang="less" scoped>
.industry-container {
  .header-back {
    padding: 30upx 0;
    border-bottom: 1upx solid #f1f1f0;

    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      z-index: 1000;
    }
  }

  ul {
    padding: 0;

    li {
      padding: 17upx;
      box-sizing: border-box;
      // border-bottom: 1upx solid #f1f1f0;

      /deep/ .article-container {
        margin-bottom: 0;
      }
    }
  }
}
</style>
