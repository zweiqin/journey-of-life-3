<template>
  <view class="head">
    <view class="search-bar">
      <view class="location" @click.stop="handleClick">
        <!-- <JIcon type="locale" width="34" height="40"></JIcon> -->
        <view class="text">{{ address }}</view>
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9ujhwq408rlpm9vsxn8w.png"
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
        <input type="text" class="content" :placeholder="placeholder" />
      </view>
    </view>
  </view>
</template>

<script>
import { getAdressDetailByLngLat } from "../../utils/DWHutils";

export default {
  name: "THeadSearch",
  props: {},
  data() {
    return { address: "" };
  },
  computed: {},
  methods: {
    getLocation() {
      this.address = "定位中...";
      const _this = this;
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then((res) => {
              console.log("地址", res);
              if (res.status === 0) {
                const result = res.result.address_reference;
                _this.address = result.town.title;
              }
            })
            .catch(() => {
              console.log("地址", res);
              _this.address = "定位失败";
            });
        },
      });
    },

    handleClick() {
      const _this = this;
      if (this.address === "定位失败" || this.address === "定位中...") {
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
  },
  watch: {},
  props: {
    placeholder: String,
  },
  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.getLocation();
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
.head {
  width: 100%;
  height: 70upx;
  .search-bar {
    position: absolute;
    width: 95%;
    left: 30upx;
    top: 30upx;
    display: flex;
    align-items: center;
    .location {
      display: flex;
      align-items: center;

      .text {
        font-size: 36upx;
        font-weight: 700;
        font-family: auto;
      }
      .show {
        width: 32upx;
        height: 32upx;
      }
    }
    .search-box {
      padding: 0upx 20upx;
      display: flex;
      border: 1px solid #999999;
      flex: 1;
      align-items: center;
      width: 540upx;
      height: 74upx;
      border-radius: 100upx;
      background: #ffffff;
      .search {
        width: 48upx;
        // height: 32upx;
        border-right: 2upx solid #d8d8d8;
        .img {
          width: 32upx;
          height: 32upx;
        }
      }
      .content {
        padding-left: 14upx;
        flex: 1;
        font-size: 24upx;
        font-weight: 400;
        color: #3d3d3d;
      }
    }
  }
}
</style>