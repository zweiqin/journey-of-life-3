<template>
  <view class="value-added-services">
    <view class="header">
			<tui-icon
				name="arrowleft" :size="32" unit="rpx"
				color="#ffffff"
				margin="0" @click="back"
			></tui-icon>
      <view class="title">佛山-全国</view>
    </view>

    <view class="main">
      <view class="find-wuliu">
        <view class="search">
          <view class="from">佛山</view>
					<tui-icon :size="72" unit="rpx" color="#fd7433" name="explore-fill" margin="0 110rpx"></tui-icon>
          <view
            class="to desc form_address_input"
            @click="() => (visibleMuti = true)"
          >
            <pick-regions
              :visibleMuti.sync="visibleMuti"
              @getRegion="cityChange"
            >
              <input
                type="text"
                class="uni-input"
                disabled
                v-model="toAddress"
                placeholder="选择到达"
                placeholder-class="size"
                adjust-position
                cursor-spacing="180"
              />
            </pick-regions>
          </view>
        </view>

        <button class="find-btn" @click="handleFindWuliu">查找物流</button>
      </view>
      <view class="wuliu-list" v-if="list && list.length">
        <img
          v-for="item in list"
          :key="item.qiyeId"
          @click="toDetail(item.qiyeId)"
          class="img"
          :src="item.image"
          alt=""
        />
      </view>

			<view v-else>
				<tui-no-data :fixed="false" style="padding-top: 100rpx;">暂无数据</tui-no-data>
			</view>
    </view>
  </view>
</template>

<script>
import {
  findAdLogisticsSpaceByPageApi,
  increamentClickNumApi,
} from "../api/logistics";
import PickRegions from "../components/pick-regions/pick-regions.vue";

export default {
  components: {
    PickRegions,
  },
  data() {
    return {
      query: {
        pageNo: 1,
        pageSize: 10,
      },

      list: [],
      visibleMuti: false,
      toAddress: "",
    };
  },
  created() {
    this.findAdLogisticsSpaceByPage();
  },
  methods: {
    // 返回
    back() {
      uni.navigateTo({
        url: "/pages/logistics/logistics",
      });
    },

    // 去物流详情
    async toDetail(id) {
      try {
        await increamentClickNumApi({
          qiyeId: id,
        });
      } finally {
        uni.navigateTo({
          url: "/logistics/wuliu-detail?id=" + id,
        });
      }
    },

    /**
     * @description 点击搜索物流
     */
    handleFindWuliu() {
      const _this = this
      uni.navigateTo({
        url: "/logistics/search-wuliu?to=" + _this.toAddress,
      });
    },

    // 获取物流工厂列表
    async findAdLogisticsSpaceByPage(isoadingMore) {
      const res = await findAdLogisticsSpaceByPageApi(this.query);
      if (res.statusCode === 20000) {
        this.list = res.data.records;
        console.log(res.data);
      } else {
        uni.showToast({
          title: res.statusMsg,
          duration: 2000,
          icon: "none",
        });
      }
    },

    // 选择
    cityChange(value) {
      this.toAddress = value[1].name
    },
  },
};
</script>

<style lang="less" scoped>
.value-added-services {
  padding: 60rpx 26rpx;
  box-sizing: border-box;
  min-height: 100vh;
  background: linear-gradient(180deg, #07b9b9 0%, #ffffff 100%);

  .header {
    display: flex;
    align-items: center;

    .back {
      width: 16rpx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 32rpx;
    }
  }

  .main {
    background-color: #fff;
    padding: 30rpx;
    border-radius: 20rpx;
    margin-top: 40rpx;

    .find-wuliu {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-bottom: 1rpx solid #d8d8d8;

      .search {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3d3d3d;
        font-size: 36rpx;
        font-weight: bold;

        .from{
          flex-shrink: 0;
          flex: 1;
          text-align: right;
        }

        .icon {
          width: 72rpx;
          margin: 0 110rpx;
        }

        .desc {
          color: #999999;
          flex: 1;
        }
      }

      .find-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 260rpx;
        height: 72rpx;
        border-radius: 20rpx;
        background-color: #07b9b9;
        color: #fff;
        margin: 40rpx 0;
      }
    }

    .wuliu-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .img {
        width: 300rpx;
        height: 136rpx;
        margin: 32rpx 0;
      }
    }
  }
}
</style>
