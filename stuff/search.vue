<template>
  <view>
    <view class="search-box">
      <uni-search-bar
        @input="input"
        :radius="100"
        placeholder="搜索"
        cancelButton="none"
        style="width: 100%"
      ></uni-search-bar>
      <view class="text" @click="cancel">取消</view>
    </view>

    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view
        class="sugg-item"
        v-for="item in searchResults"
        :key="item.id"
        :id="item.id"
        @click="gotoDetail(item.id)"
      >
        <view class="goods-name">{{ item.name }}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag
          :text="item"
          v-for="item in histories"
          :key="item.serverTypeId"
          @click="gotoGoodsList(item.serverTypeId)"
        ></uni-tag>
      </view>
    </view>
  </view>
</template>




<script>
import { goodsListApi } from "../api/goods";
import { getUserId } from "../utils";
export default {
  data() {
    return {
      timer: null,
      kw: "",
      searchName: "",
      keyword: "",
      // 搜索的结果列表
      searchResults: [],
      // 搜索历史的数组
      historyList: [],
      serverTypeId: "",
    };
  },
  onLoad() {
    if (uni.getStorageSync("keyword")) {
      this.historyList = uni.getStorageSync("keyword") || [];
    }
  },
  methods: {
    // input 输入事件的处理函数
    input(e) {
      // 清除 timer 对应的延时器
      clearTimeout(this.timer);
      // 重新启动一个延时器，并把 timerId 赋值给 this.timer
      this.timer = setTimeout(() => {
        // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
        this.keyword = e;
        this.getSearchList();
      }, 800);
    },

    cancel() {
      uni.navigateTo({
        url:"/stuff/stuffGoods/index"
      });
    },

    //搜索查询
    async getSearchList() {
      // 判断搜索关键词是否为空
      if (this.keyword.length === 0) {
        this.searchResults = [];
        return;
      }

      const res = await goodsListApi({
        keyword: this.keyword,
        goodsType: 2,
        userId: getUserId(),
      });
      // this.searchResults = res.data.map(item => item.serverTypeName);
      this.searchResults = res.data.goodsList;
      console.log("123", this.searchResults);
      this.saveSearchHistory();
    },
    gotoDetail(e) {
      console.log("id", e);
      uni.navigateTo({
        url: "/pages/prod/prod?goodsId=" + e,
      });
    },

    saveSearchHistory() {
      // this.historyList.push(this.kw)

      const set = new Set(this.historyList);
      set.delete(this.keyword);
      set.add(this.keyword);

      this.historyList = Array.from(set);

      // 对搜索数据的储存
      uni.setStorageSync("keyword", this.historyList);
    },
    // 清空搜索历史
    clean() {
      this.historyList = [];
      uni.setStorageSync("keyword", []);
    },
    // gotoGoodsList(e) {
    //   console.log("id", e);
    //   uni.navigateTo({
    //     url: "/community-center/community-detail?id=" + e,
    //   });
    // },
  },
  computed: {
    histories() {
      return [...this.historyList].reverse();
    },
  },
};
</script>





<style lang="scss" scoped>
/* 吸顶效果 */
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    white-space: nowrap;
    padding-right: 20upx;
    font-size: 28upx;
  }
}
.sugg-list {
  padding: 0 10upx;
  .sugg-item {
    font-size: 24upx;
    padding: 26upx 0;
    border-bottom: 2upx solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 6upx;
    }
  }
}

.history-box {
  padding: 0 10upx;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80upx;
    font-size: 26upx;
    border-bottom: 2upx solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 10upx;
      margin-right: 10upx;
    }
  }
}
</style>
