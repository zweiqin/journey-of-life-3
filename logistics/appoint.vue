<template>
  <view class="appoint">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/store/chevron-states.png"
        alt=""
      />
      <view class="title">关注列表</view>
    </view>

    <view class="search">
      <input class="search-input" type="text" @input="search" />
      <img class="img" src="../static/images/store/search.png" alt="" />
    </view>

    <view class="wuliu-list" v-if="list.length">
      <view
        @click="handleToViewWuLiuDetail(item)"
        class="item"
        v-for="item in list"
        :key="item.id"
      >
        <img :src="item.logo" class="logo" alt="" />

        <view class="info">
          <view class="name">{{ item.name }}</view>
          <view class="end-city">{{ item.enddCities }}</view>
          <view class="op">
            <view class="views">
              <img
                class="icon"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6r9670baknyik5d6tyxk.png"
                alt=""
              />
              {{ item.clickNum }}
            </view>

            <view class="apponit" @click="handleSelectApponitWuliu(item)"
              >指定</view
            >
          </view>
        </view>
      </view>
    </view>

    <view v-else class="no-data">
      <view v-if="query.companyName"> 没有搜到您关注的物流~ </view>
      <view v-else
        >您还没有关注过物流公司~<text
          v-if="!isApponit"
          class="toFollow"
          @click="toFollowWuliu"
          >去关注</text
        ></view
      >
    </view>
  </view>
</template>

<script>
const { debounce } = require("../utils/util");
import { getFollowListApi } from "../api/logistics";
import { getUserId } from "../utils";
import { APPONIT_WULIU_QIYE_ID } from "../constant";

export default {
  data() {
    return {
      search: null,
      query: {
        userId: getUserId(),
        companyName: undefined,
      },

      list: [],
      isApponit: false,
    };
  },

  onLoad(options) {
    this.isApponit = !!options.apponit;
  },

  onShow() {
    this.search = debounce(this.searchWuliu, 500);
    this.getFollowList();
  },
  methods: {
    back() {
      uni.navigateBack();
    },

    /**
     * @description 搜索
     */
    searchWuliu(e) {
      this.query.companyName = e.target.value;
      this.getFollowList();
    },

    /**
     * 关注列表
     */
    async getFollowList() {
      try {
        const res = await getFollowListApi(this.query);
        if (res.statusCode === 20000) {
          this.list = res.data.map((item) => {
            if (item.endCity) {
              let cities = JSON.parse(item.endCity);
              item.enddCities =
                item.startCity +
                "->" +
                cities
                  .map((city) => {
                    return city[1] === "市辖区" ? city[0] : city[1];
                  })
                  .join("、");
            }
            return item;
          });
        } else {
          uni.showToast({
            title: res.statusMsg,
            duration: 2000,
            icon: "none",
          });
        }
      } catch (error) {
        uni.showToast({
          title: "关注列表获取失败",
          duration: 2000,
          icon: "none",
        });
      }
    },

    /**
     * 查看物流详情
     */
    handleToViewWuLiuDetail(info) {
      if (this.isApponit) {
        return;
      }
      uni.navigateTo({
        url: "/logistics/wuliu-detail?id=" + info.qiyeId,
      });
    },

    // 去找物流
    toFollowWuliu() {
      uni.navigateTo({
        url: "/logistics/find-logistics",
      });
    },

    // 点击指定
    handleSelectApponitWuliu(item) {
      uni.setStorageSync(APPONIT_WULIU_QIYE_ID, item.qiyeId);
      uni.navigateTo({
        url: "/logistics/mail",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.appoint {
  padding: 68upx 40upx;
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 52upx;

    .back {
      width: 44upx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      color: #000000;
      font-size: 32upx;
      font-weight: 500;
    }
  }

  .search {
    position: relative;
    width: 100%;
    height: 60upx;
    box-sizing: border-box;
    padding: 10upx 20upx 10upx 60upx;
    background-color: #efefef;
    border-radius: 30upx;

    .search-input {
      width: 100%;
      height: 100%;
    }

    .img {
      position: absolute;
      left: 16upx;
      top: 50%;
      transform: translateY(-50%);
      width: 32upx;
    }
  }

  .no-data {
    width: 100%;
    height: 600upx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999999;
    font-size: 32upx;

    .toFollow {
      color: #ff8f1f;
      font-size: 36upx;
    }
  }

  .wuliu-list {
    .item {
      padding: 10px 0;
      display: flex;
      font-size: 28upx;
      color: #000000;

      .logo {
        width: 214upx;
        height: 150upx;
        border-radius: 20upx;
        margin-right: 34upx;
      }

      .end-city {
        width: 412upx;
        margin: 20upx 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .views {
        font-size: 10px;
        .icon {
          width: 24upx;
          height: 18upx;
          margin-right: 5px;
        }
      }

      .op {
        display: flex;
        justify-content: space-between;

        .apponit {
          color: #3662ec;
        }
      }
    }
  }
}
</style>