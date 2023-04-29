<template>
  <div>
    <view class="background">
      <view class="title">
				<!-- #ifdef H5 -->
				<img
          class="back"
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/gzyrqkx0nekbiau7vivk.png"
          alt=""
          @click="back"
        />
				<!-- #endif -->
        
        <view></view>
        <view style="width: 48upx"></view>
      </view>
      <view class="top-title">《工厂直销，材料大放送》</view>

      <image
        class="background1"
        src="../../static/images/stuff/rexiao.png"
        alt=""
      />
      <view class="background2">
        <view class="title-detail">
          <view
            class="text1"
            v-for="item in stuffCategoryList"
            :key="item.value"
            :class="{ text2: item.value == currentTab }"
            @click="choseType(item.value)"
            >{{ item.label }}</view
          >
        </view>
        <view class="hotgoods" v-if="stuffGoodsList && stuffGoodsList.length">
          <view v-for="item in stuffGoodsList" :key="item.id">
            <hotGoods
              :name="item.name"
              :originalPrice="item.counterPrice"
              :currentPrice="item.retailPrice"
              :goodsId="item.id"
              :picUrl="item.picUrl"
              :sales="item.sales"
              :repertory="item.repertory"
            ></hotGoods>
          </view>
        </view>
        <view class="no-data" v-else>暂无商品</view>
      </view>
    </view>
  </div>
</template>

<script>
import hotGoods from "./stockGoods";
import { getCatalogAllApi } from "../../api/stuff";
import { goodsListApi } from "../../api/goods";
export default {
  components: {
    hotGoods,
  },
  data() {
    return {
      stuffGoodsList: [],
      stuffGoodsList1: [],
      stuffCategoryList: [],
      page: 1,
      totalPage: "",
      currentTab: 0,
      categoryId: "",
    };
  },
  methods: {
    choseType(item) {
      uni.showLoading();
      this.currentTab = item;
      this.categoryId = item;
      if (this.categoryId == 0) {
        this.stuffGoodsList = this.stuffGoodsList1;
      } else {
        this.getCateGoryGoodList();
      }

      uni.hideLoading();
    },
    handleBack() {
      uni.navigateBack();
    },
    async getCateGoryGoodList() {
      const res = await goodsListApi({
        categoryId: this.categoryId,
      });
      this.stuffGoodsList = res.data.goodsList;
    },
    async getCatalogAll() {
      const res = await getCatalogAllApi({
        goodsType: 2,
      });
      console.log(res);
    },
    async goodsList() {
      uni.showLoading();
      const res = await goodsListApi({
        goodsType: 2,
      });
      uni.hideLoading();
      this.totalPage = res.data.totalPages;
      console.log(res);
      this.stuffCategoryList = res.data.filterCategoryList;
      this.stuffCategoryList.unshift({
        value: 0,
        label: "全部",
      });
      this.stuffGoodsList = res.data.goodsList;
      this.stuffGoodsList1 = res.data.goodsList;
    },
    async addGoodsList() {
      const res = await goodsListApi({
        goodsType: 2,
        categoryId: "",
        page: this.page,
      });
      console.log(res.data.goodsList);
      this.stuffGoodsList.push(...res.data.goodsList);
      this.totalPage = res.data.totalPages;
    },
    back() {
      uni.navigateBack({});
    },
  },
  onLoad(options) {
    this.goodsList();
  },
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page >= this.totalPage) {
      uni.showToast({
        title: "加载完毕",
        icon: "success",
        mask: true,
      });
    } else {
      this.addGoodsList();
    }
  },
};
</script>

<style lang="less" scoped>
.background {
  width: 100%;
  height: 384upx;
  background: linear-gradient(181deg, #fa5151 1%, rgba(255, 143, 31, 0) 141%);

  .title {
    display: flex;
    text-align: center;
    padding-top: 10upx;
    font-size: 32upx;
    font-weight: 500;
    justify-content: space-between;
    color: #ffffff;
    .back {
      width: 48upx;
      height: 48upx;
    }
  }
  .top-title {
    padding-top: 40upx;
    text-align: center;
    font-size: 48upx;
    font-weight: 600;
    letter-spacing: 0.1em;
    background: linear-gradient(to bottom, #ffffff, #fff8c6);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .background1 {
    position: absolute;
    left: -1upx;
    top: 194upx;

    width: 100%;
    height: 115upx;
  }
  .background2 {
    position: absolute;
    left: 0upx;
    top: 246upx;
    width: 100%;
    height: 2012upx;
    border-radius: 40upx;
    background: #ffffff;

    .title-detail {
      display: flex;
      padding-top: 46upx;
      padding-left: 15upx;
      font-size: 28upx;
      overflow-x: scroll;
      white-space: nowrap;
      &::-webkit-scrollbar {
        width: 0 !important;
      }

      .text1 {
        margin-left: 40upx;
        font-weight: 500;
        color: #3d3d3d;
        &.text2 {
          margin-left: 40upx;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.85);
        }
      }

      .anniu {
        width: 34upx;
        height: 24upx;
        padding-right: 20upx;
      }
    }
    .goods-detail {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .left {
        .cailiao {
          padding-left: 48upx;
          padding-top: 56upx;
          width: 220upx;
          height: 220upx;
        }
      }
      .right {
        padding-right: 110upx;
        .goods-name {
          padding-top: 30upx;
          font-size: 24upx;
          font-weight: 500;
          color: #3d3d3d;
        }
        .geiqian {
          padding-top: 13upx;
          width: 140upx;
          height: 34upx;
        }
        .yishou {
          padding-top: 4upx;
          font-size: 24upx;
          color: rgba(0, 0, 0, 0.85);
        }
        .jiage {
          display: flex;
          .xianjia {
            padding-top: 6upx;
            font-size: 36upx;
            font-weight: 500;
            color: #fa5151;
          }
          .yuanjia {
            padding-top: 18upx;
            padding-left: 14upx;
            font-size: 20upx;
            color: #999999;
          }
        }
        .xiadan {
          .xiadan1 {
            padding-top: 14upx;
            padding-left: 13upx;
            font-size: 36upx;
            font-weight: 500;
            z-index: 100;
            position: absolute;
            color: #ffffff;
          }
          .juxing1 {
            position: absolute;
            padding-top: 6upx;
            width: 207upx;
            height: 62upx;
          }
          .juxing2 {
            position: absolute;
            padding-left: 176upx;
            padding-top: 6upx;
            width: 80upx;
            height: 62upx;
          }
        }
      }
    }
    .hotgoods {
    }
  }

  .fanhui {
    position: absolute;
    top: 78upx;
    left: 40upx;
    width: 48upx;
    height: 48upx;
  }
}

.no-data{
  width: 100%;
  height: 300upx;
  text-align: center;
  line-height: 300upx;
  color: #ccc;
}
</style>