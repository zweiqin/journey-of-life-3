<template>
  <view class="furniture">
    <!-- <Ttitle :title="''" style="padding-top: 20upx;padding-bottom: 20upx" /> -->
    <view class="head">
      <view class="search-bar">
        <view class="location">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
            alt=""
            class="return"
            @click="handleBack"
          />
          <view class="text">{{ addressDetail }}</view>
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/6hqerqcab0sqrsp0j72h.png"
            alt=""
            class="show"
            @click.stop="handleClick"
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
            placeholder="输入你想搜索的品类/单品/品牌"
            @click="goToSearch"
          />
        </view>
      </view>
    </view>
    <view class="body" :style="{ height: scrollHeight + 'px' }">
      <view class="navbar" ref="nav-barRef">
        <view
          class="item"
          v-for="item in navbar"
          :class="{ active: item.id == currentTab }"
          :key="item.id"
          @click="switchTab(item.id)"
          >{{ item.name }}</view
        >
      </view>

      <view class="main">
        <view class="mid" v-if="sub.length">
          <sort
            category
            v-for="item1 in sub"
            :key="item1.id"
            :name="item1.name"
            :id="item1.id"
            :picUrl="item1.picUrl"
            @item-click="handleClickCategory"
          >
          </sort>
        </view>

        <view class="no-data" v-else> 暂无分类 </view>
      </view>
    </view>
  </view>
</template>

<script>
import sort from "../../components/subs/subs.vue";
import { getAdressDetailByLngLat } from "../../utils/DWHutils";
import { getGoodsTypesApi, getTypeDetailList } from "../../api/home";

export default {
  components: {
    sort,
  },
  data() {
    return {
      navbar: [],
      sub: [],
      currentTab: null,
      scrollHeight: 667,
      picUrl: "",
    };
  },
  computed: {},
  methods: {
    handleBack() {
      uni.switchTab({ url: "/pages/index/index" });
    },

    handleClick() {
      const _this = this;
      if (
        this.addressDetail === "定位失败" ||
        this.addressDetail === "定位中..."
      ) {
        uni.showModal({
          title: "提示",
          confirmText: "我已打开定位",
          content: "请确认您已开启了定位",
          success: function (res) {
            if (res.confirm) {
              _this.getLocation();
            }
          },
        });
      }
    },

    getLocation() {
      this.addressDetail = "定位中...";
      const _this = this;
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then((res) => {
              if (res.status === "1") {
                const result = res.regeocode;
                _this.addressDetail = result.addressComponent.township;
                console.log("addressDetail", _this.addressDetail);
              }
            })
            .catch(() => {
              _this.addressDetail = "定位失败";
            });
        },
      });
    },

    //获取商品列表接口
    async stuffGoodsList() {
      const res = await getGoodsTypesApi({
        goodsType: 1,
      });

      if (res.errno === 0) {
        const categories = res.data.categoryList.filter(
          (item) => item.desc === "搜家具"
        );
        this.navbar = categories;
        if (this.currentTab==='null') {
          this.currentTab = this.navbar[0].id;
        }
        this.stuffGoodsSort();
      }
    },

    //获取商品分类接口
    async stuffGoodsSort() {
      uni.showLoading({
        title: "加载中",
      });
      const res = await getTypeDetailList({
        id: this.currentTab,
      });
      uni.hideLoading();

      if (res.errno === 0) {
        this.sub = res.data.currentSubCategory;
      } else {
        this.sub = [];
      }
    },

    switchTab(index) {
      this.currentTab = index * 1;
      this.id = index;
      this.stuffGoodsSort();
    },

    handleClickCategory(id) {
      uni.navigateTo({
        url:
          "/pages/goods-filter/goods-filter?id=" +
          this.currentTab +
          "&sub=" +
          id,
      });
    },
  },

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.currentTab = options.id;
    const _this = this;
    uni.getSystemInfo({
      success(res) {
        _this.scrollHeight = res.safeArea.height - 60;
      },
    });
    this.stuffGoodsList();
    this.getLocation();
  },
};
</script>

<style lang="less" scoped>
uni-page-body {
  overflow: hidden;
  height: auto;
}

.no-data {
  width: 100%;
  height: 300px;
  line-height: 300px;
  text-align: center;
  color: #999;
}

.furniture {
  .head {
    width: 100%;
    height: 120upx;
    line-height: 120upx;
    background: #ffffff;
    padding-left: 16upx;
    padding-right: 26upx;
    box-sizing: border-box;
    // position: fixed;
    .search-bar {
      width: 100%;
      // left: 3%;
      // top: 80upx;
      display: flex;
      align-items: center;
      .location {
        display: flex;
        align-items: center;
        // margin: 0 20upx;
        margin-right: 5px;
        .return {
          width: 48upx;
          height: 48upx;
        }
        .text {
          font-size: 32upx;
          font-weight: bold;
          color: #3d3d3d;
        }
        .show {
          width: 32upx;
          height: 32upx;
        }
      }
      .search-box {
        padding: 0upx 16upx;
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
          font-weight: 400;
          color: #3d3d3d;
          border-left: 2upx solid #d8d8d8;
        }
      }
      .example-body {
        background: #f1f2f6;
        border-radius: 100upx;
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
        transition: all 100ms;
        &.active {
          background: linear-gradient(270deg, #e95d20 0%, #faae63 99%);
          color: #ffffff;
        }
      }
    }

    .main {
      width: 80%;
      border-radius: 20upx 0upx 0upx 0upx;
      // background: #f1f2f6;
      overflow: scroll;
      border-top: 16upx solid #f1f2f6;
      border-left: 12upx solid #f1f2f6;
      &::-webkit-scrollbar {
        display: none;
      }

      // position: fixed;
      // right: 0upx;
      // top: 172upx;
      .mid {
        padding-left: 20upx;
        // margin: 18upx 0upx 0upx 12upx;
        border-radius: 10upx 0upx 0upx 0upx;
        background: #ffffff;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>