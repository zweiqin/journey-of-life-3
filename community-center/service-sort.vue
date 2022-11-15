<template>
  <view class="service-sort">
    <view class="head">
      <view class="search-bar">
        <view class="location">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
            alt=""
            class="return"
            @click="handleBack"
          />
          <view class="text">佛山市</view>
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/6hqerqcab0sqrsp0j72h.png"
            alt=""
            class="show"
          />
        </view>
        <view class="search-box">
          <view class="search">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/2qpjht84e85rhmt6y1ce.png"
              alt=""
              class="img"
            />
          </view>
          <input
            type="text"
            class="content"
            placeholder="搜索社区服务，一站式解决家居问题"
          />
        </view>
      </view>
    </view>
    <view class="body" :style="{ height: scrollHeight + 'px' }">
      <view class="navbar" ref="nav-barRef">
        <view
          class="item"
          v-for="item in navbar"
          :class="{ active: item.id === currentTab }"
          :key="item.serverNameOne"
          @click="switchTab(item.id)"
          >{{ item.serverNameOne }}</view
        >
      </view>

      <view class="main">
        <view class="mid">
          <sort
            v-for="item1 in sort.children"
            :key="item1.id"
            :serverNameTwo="item1.serverNameTwo"
            :id="item1.id"
            :pid="item1.pid"
            :detailList="item1.children"
          >
          </sort>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getServiceSortApi } from "../api/community-center";
import sort from "../community-center/componts";
export default {
  name: "Service-sort",
  components: {
    sort,
  },
  props: {},
  data() {
    return {
      navbar: [],
      currentTab: 1,
      sort: [],
      id: "",
      serverNameOne: "",
      // data: [],
      scrollHeight: 667,
    };
  },
  methods: {
    switchTab(index) {
      this.currentTab = index;
      this.sort = this.data.find((item) => item.id === index);
    },
    // handleBack() {
    //   uni.navigateBack();
    // },

    handleBack(){
      uni.switchTab({ url:'/pages/community-center/community-centerr' });
    },
    

    // handleToServiceDetail(id) {
    //   console.log("服务详情",id);
    //   uni.navigateTo({ url: "../community-center/community-detail?id=" + id });

    //   uni.navigateTo({
    //     url: `/community-center/community-detail?id=${id}&name=   `
    //   })
    // },

    //查询社区服务分类接口
    async getServiceSort() {
      const res = await getServiceSortApi({
        id: this.id,
      });

      // console.log();
      console.log(res);

      this.navbar = res.data;
      this.sort = res.data[0];
      this.data = res.data;
      console.log(res.data[0]);
    },
  },
  mounted() {},
  onLoad() {
    this.getServiceSort();
    const _this = this;
    uni.getSystemInfo({
      success(res) {
        _this.scrollHeight = res.safeArea.height - 60;
      },
    });
  },
};
</script>

<style lang="less" scoped>
uni-page-body {
  overflow: hidden;
  height: auto;
}
.service-sort {
  .head {
    width: 100%;
    height: 120upx;
    line-height: 120upx;
    background: #ffffff;
    // position: fixed;
    .search-bar {
      width: 95%;
      left: 3%;
      top: 80upx;
      display: flex;
      align-items: center;
      .location {
        display: flex;
        align-items: center;
        margin: 0 20upx;
        .return {
          width: 48upx;
          height: 48upx;
        }
        .text {
          font-size: 36upx;
          font-weight: bold;
          color: #3d3d3d;
        }
        .show {
          width: 32upx;
          height: 32upx;
        }
      }
      .search-box {
        padding: 0upx 24upx;
        display: flex;
        flex: 1;
        align-items: center;
        width: 540upx;
        height: 74upx;
        border-radius: 100upx;
        background: #f1f2f6;
        .search {
          width: 48upx;
          height: 74upx;
          line-height: 74upx;
          display: flex;
          justify-content: center;
          align-items: center;

          .img {
            width: 30upx;
            height: 30upx;
          }
        }
        .content {
          padding-left: 14upx;
          flex: 1;
          font-size: 24upx;
          font-weight: 500;
          color: #999999;
        }
      }
    }
  }

  .body {
    display: flex;
    overflow: scroll;
    overflow: scroll;

    .navbar {
      // margin-top: 28upx;
      width: 22%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }

      .item {
        width: 130upx;
        height: 52upx;
        border-radius: 10upx;
        font-size: 28upx;
        font-weight: 500;
        color: #3d3d3d;
        text-align: center;
        line-height: 52upx;
        margin-bottom: 62upx;
        &.active {
          background: linear-gradient(270deg, #e95d20 0%, #faae63 99%);
          color: #ffffff;
        }
      }
    }

    display: flex;
    .main {
      width: 78%;
      border-radius: 10upx 0upx 0upx 0upx;
      background: #f1f2f6;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }

      // position: fixed;
      // right: 0upx;
      // top: 172upx;
      .mid {
        margin: 18upx 0upx 0upx 12upx;
        border-radius: 10upx 0upx 0upx 0upx;
        background: #ffffff;
      }
    }
  }
}
</style>
