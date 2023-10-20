<template>
  <view class="infomation-detail-container">
    <!-- #ifdef H5 -->
    <JHeader title="文章详情"></JHeader>
    <!-- #endif -->

     <view class="main">
      <view class="article-title"> {{ articleDetail.title }}</view>
      <view class="bage">
        <view class="time">{{ articleDetail.updateTime }}</view>
        <view class="author">{{ articleDetail.author }}</view>
      </view>
      <view class="article-main" v-html="articleDetail.content"> </view>
    </view>

   <tui-fab @click="handleClickBack" custom maskClosable :btnList="btnList">
      <tui-icon color="#fff" name="revoke"></tui-icon>
    </tui-fab>
  </view>
</template>

<script>
import { getArticleListApi } from '../api/community-center'
export default {
  data() {
    return {
      id: '',
      articleInfo: {},
      recommonList: [],
      articleDetail: {},
      btnList: Object.freeze([
        {
          bgColor: '#16C2C2',
          //名称
          text: '返回',
          //字体大小
          fontSize: 28,
          //字体颜色
          color: '#fff',
          cb: () => {
            uni.navigateBack()
          },
        },
        {
          bgColor: '#64B532',
          //名称
          text: '首页',
          //字体大小
          fontSize: 28,
          //字体颜色
          color: '#fff',
          cb: () => {
            uni.switchTab({
              url: '/pages/community-center/community-centerr',
            })
          },
        },
      ]
      ),
    }
  },

  onLoad(options) {
    this.getArticleList(options)
  },

  methods: {
    async getArticleList(options) {
      const { data } = await getArticleListApi({
        type: options.type * 1
      })
      if (data && data.length > 0) {
        const articleDetail = data.find(item => item.id === options.id * 1)
        this.articleDetail = articleDetail
      }
    },

    handleClickBack(info) {
      this.btnList[info.index].cb()
    },
  },
}
</script>

<style lang="less" scoped>
@import '../style/var.less';
@import '../style/mixin.less';

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
