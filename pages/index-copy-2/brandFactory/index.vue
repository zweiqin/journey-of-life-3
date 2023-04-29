<template>
  <view class="brandFactory-container">
    <view class="filter-type fix-top" :style="{ top: height + 'px' }">
      <view class="main-pane">
        <view class="item">热销</view>
        <view class="item">新中式</view>
        <view class="item">北欧</view>
        <view class="item">极简</view>
        <view class="item">
          <text>筛选</text>
          <image src="../../../static/images/index/brand-filter.png" mode="" />
        </view>
      </view>
    </view>

    <Brand v-for="item in brandList" :key="item.id" :data="item"></Brand>
    <LoadingMore v-show="status !== 'none'" :status="status"></LoadingMore>
  </view>
</template>

<script>
import {
  getBrandStyleListApi,
  getBrandListBySelectApi,
} from '../../../api/brand'
import Brand from './components/brand.vue'
export default {
  mounted() {
    this.getBrandStyleList()
    this.getBrandList()
  },
  components: {
    Brand,
  },
  props: {
    height: {
      type: [Number, String],
    },
  },
  data() {
    return {
      totalPages: 0,
      brandList: [],
      queryInfo: {
        page: 1,
        limt: 10,
      },
      status: 'none',
    }
  },
  methods: {
    async getBrandStyleList() {
      const res = await getBrandStyleListApi({})
      if (res.errno === 0) {
        console.log(res.data.items)
      }
    },

    async getBrandList(isLoadMore) {
      this.status = 'loading'
      const res = await getBrandListBySelectApi({ ...this.queryInfo })
      this.status = 'none'
      if (res.errno === 0) {
        if (isLoadMore) {
          this.brandList.push(...res.data.brandList)
        } else {
          this.brandList = res.data.brandList
        }
        this.totalPages = res.data.totalPages
      } else {
        uni.showToast({
          title: '品牌工厂获取失败',
          icon: 'none',
        })
      }
    },

    reachBottom() {
      if (this.totalPages <= this.queryInfo.page) {
        this.status = 'no-more'
        return
      }

      if (this.brandList.length < this.queryInfo.size) {
        this.status = 'none'
        return
      }

      this.queryInfo.page++
      this.getBrandList(true)

      if (this.totalPages <= this.queryInfo.page) {
        this.status = 'no-more'
        return
      }
    },

    getPosition() {
      const query = uni.createSelectorQuery().in(this)
      return new Promise((resolve, reject) => {
        query
          .select('.main-pane')
          .boundingClientRect(position => {
            resolve(position.height)
          })
          .exec()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.filter-type {
  background-color: #fff;
  padding: 16upx 30upx;
  box-sizing: border-box;
  font-size: 28upx;
  transition: all 350ms;

  &.fix-top {
    position: fixed;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  .main-pane {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item {
      display: flex;
      align-items: center;

      image {
        width: 28upx;
        height: 28upx;
      }
    }
  }
}
</style>
