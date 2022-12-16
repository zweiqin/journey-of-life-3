<template>
  <view class="newIndex">
    <view class="search1">
      <view class="search-bar">
        <view class="location" @click.stop="handleClick">
          <!-- <JIcon type="locale" width="34" height="40"></JIcon> -->
          <view class="text">{{ address }}</view>
          <image src="./image/arrow-down.png" class="down" mode="scaleToFill" />
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
          <input type="text" class="content" placeholder="输入你想搜索的产品" />
          <image src="./image/camera.png" class="carmera" mode="scaleToFill" />
        </view>
        <image class="message" src="./image/message.png" mode="scaleToFill" />
      </view>
    </view>
    <view class="head">
      <view class="headDetail" v-for="item in indexHead" :key="item.value">
        <view
          class="bottomName"
          :class="{ choseName: item.value == headIndex }"
          @click="headTouch(item.value)"
          >{{ item.label }}</view
        >
      </view>
    </view>
    <view class="furniture-background">
      <view class="furniture">
        <view
          class="furnitureDetail"
          v-for="item in furniture"
          :key="item.value"
        >
          <view class="navgetTo">
            <image :src="item.url" class="topImg" mode="scaleToFill" />
            <view class="furnitureText"> {{ item.label }}</view></view
          ></view
        >
      </view>
    </view>
    <view class="active-area">
      <view class="areaFor" v-for="item in active" :key="item.value">
        <image :src="item.img" class="activeImg" mode="scaleToFill" />
        <view class="rightText">
          <view class="activeTitle">
            <view class="textTop" :style="{ color: item.labelColor }">{{
              item.label
            }}</view>
            <view class="textTop" :style="{ color: item.color }">
              {{ item.text }}
            </view>
          </view>
          <view class="textBottom"> {{ item.little }} </view>
        </view>
      </view>
    </view>
    <goods></goods>
  </view>
</template>

<script>
import { getAdressDetailByLngLat } from "../../../utils/DWHutils";
import { furniture, indexHead, active } from "./config";
import goods from "./newGoods/index";
export default {
  components: {
    goods,
  },
  props: {},
  data() {
    return { address: "", furniture, indexHead, headIndex: 0, active };
  },
  computed: {},
  methods: {
    headTouch(e) {
      this.headIndex = e;
    },
    getLocation() {
      this.address = "定位中...";
      const _this = this;
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then((res) => {
              console.log("地址", res);
              if (res.status === "1") {
                const result = res.regeocode;
                _this.address = result.addressComponent.township;
                console.log("address", _this.address);
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
.newIndex {
  .search1 {
    width: 100%;
    height: 70upx;
    .search-bar {
      width: 100%;
      display: flex;
      align-items: center;
      .location {
        display: flex;
        align-items: center;

        .text {
          font-size: 36upx;
          font-weight: 500;
          font-family: auto;
        }
        .down {
          width: 32upx;
          height: 32upx;
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

      .message {
        width: 40upx;
        height: 40upx;
        margin: 0 20upx;
      }
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
    font-size: 28upx;
    margin: 40upx 30upx 30upx 30upx;
    .bottomName {
      &.choseName {
        color: #e95d20;
        border-bottom: 1px solid #e95d20;
        padding-bottom: 10upx;
      }
    }
  }
}
.furniture-background {
  background: #efefef;
  padding: 10upx 0 20upx 0;
  .furniture {
    display: flex;
    flex-wrap: wrap;
    background: white;
    padding: 20upx 0 20upx 0;
    .furnitureDetail {
      width: 25%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .navgetTo {
        margin: 10upx 0;
        .topImg {
          width: 110upx;
          height: 80upx;
        }
        .furnitureText {
          text-align: center;
          font-size: 28upx;
        }
      }
    }
  }
}
.active-area {
  height: 120upx;
  display: flex;
  .areaFor {
    align-items: center;
    display: flex;
    width: 50%;
    border-right: 2px solid #d8d8d8;
    margin: 15upx 0;
    &:last-child {
      border: none;
    }
    .activeImg {
      width: 120upx;
      height: 120upx;
    }

    .rightText {
      .activeTitle {
        display: flex;
        .textTop {
          font-size: 32upx;
          font-weight: 600;
        }
      }

      .textBottom {
        font-size: 24upx;
      }
    }
  }
}

.carmera {
  width: 40upx;
  height: 40upx;
}
</style>