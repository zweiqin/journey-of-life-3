<template>
  <view class="infomation-detail-container">
    <!-- #ifdef H5 -->
    <JHeader title=" "></JHeader>
    <!-- #endif -->

    <view class="main">
      <view class="article-title"> {{ articleInfo.title }}</view>
      <view class="bage">
        <view class="time">{{ articleInfo.updateTime }}</view>
        <view class="author">{{ articleInfo.author }}</view>
      </view>
      <!-- <Carousel height="78"></Carousel> -->
      <view class="article-main" v-html="articleInfo.content"> </view>
      <view class="other-acticle" v-if="recommonList.length">
        <view class="tag">相关阅读</view>
        <IndustryInformation
          v-for="item in recommonList"
          :key="item.id"
          :title="item.title"
          :time="item.updateTime"
          :img="item.imgUrl"
          :id="item.id"
        ></IndustryInformation>
      </view>
    </view>

    <tui-fab @click="handleClickBack" custom maskClosable :btnList="btnList">
      <tui-icon color="#fff" name="revoke"></tui-icon>
    </tui-fab>
  </view>
</template>

<script>
import Carousel from '../../components/carousel'
import IndustryInformation from '../../pages/stuff/components/industry-information-pane.vue'
import { getIndustryInformationDetalApi } from '../../api/stuff'
import { getIndustryInformationListApi } from '../../api/stuff'
import { btnList } from './data'

export default {
  components: {
    Carousel,
    IndustryInformation,
  },
  data() {
    return {
      id: '',
      articleInfo: {},
      recommonList: [],
      btnList,
    }
  },

  mounted() {
    this.getAboutArticleList()
  },

  methods: {
    async getArticleDetail() {
      const res = await getIndustryInformationDetalApi(this.id)
      if (res.errno === 0) {
        this.articleInfo = res.data
        uni.setNavigationBarTitle({
          title: res.data.title,
        })
      } else {
        uni.showToast({
          title: '文章详情获取失败',
          duration: 2000,
          icon: 'none',
        })

        uni.navigateBack()
      }
    },

    // 相关阅读
    async getAboutArticleList() {
      const _this = this
      const res = await getIndustryInformationListApi({
        page: 1,
        limit: 20,
      })

      if (res.errno === 0) {
        this.recommonList = res.data.items
          .slice(3, 9)
          .sort(() => {
            return Math.random() * 10 > 5
          })
          .filter(item => {
            return item.id !== _this.id
          })
      }
    },

    handleClickBack(info) {
      this.btnList[info.index].cb()
    },
  },

  onLoad(options) {
    this.id = options.id
    this.getArticleDetail()
  },
}
</script>

<style lang="less" scoped>
@import '../../style/var.less';
@import '../../style/mixin.less';

.main {
  padding: 20upx 30upx;
}

.article-title {
  font-size: 36upx;
  font-weight: bold;
  line-height: 1.5;
  color: @c3d;
}

.bage {
  display: flex;
  font-size: 20upx;
  color: @c9;
  margin: 28upx 8upx;

  .time {
    margin-right: 46upx;
  }
}

.article-main {
  text-indent: 2em;
  line-height: 1.5;
  margin: 10px 0;
  font-size: 18px;
  color: @c3d;
}

.p-container {
  &:not(:last-child) {
    border-bottom: 1upx solid #ccc;
  }
}

.other-acticle {
  margin-top: 20px;
  .tag {
    text-align: center;
    color: @cw;
    font-size: @f12;
    width: 140upx;
    height: 46upx;
    line-height: 46upx;
    background-color: #07b9b9;
  }
}
</style>
