<template>
  <div class="selection">
    <Panel
      v-for="item in panels"
      :key="item.label"
      :title="item.label"
      :routeText="item.routeText"
      :route="item.route"
    >
      <template v-if="item.value === 0">
        <view class="style">
          <view class="item" v-for="item in styleList" :key="item.id">
            <img class="img" :src="item.styleUrl" alt="" />
            <text class="text">{{ item.styleName }}</text>
          </view>
        </view>
      </template>

      <template v-if="item.value === 1">
        <img
          class="explosion"
          src="../../../../static/images/index/explosion.webp"
          alt=""
        />
      </template>

      <template v-if="item.value === 2">
        <view class="explosion">
          <img
            class="img"
            src="../../../../static/images/index/explosion.webp"
            alt=""
          />
          <img
            class="img"
            src="../../../../static/images/index/explosion.webp"
            alt=""
          />
        </view>
      </template>
    </Panel>

    <view class="goods-list">
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods><Goods></Goods>
      <Goods></Goods>
    </view>
  </div>
</template>

<script>
import Panel from "../../../../components/panel/index.vue";
import Goods from "./components/Goods";
import http from "../../../../utils/http";
import { panels } from "./config";
export default {
  components: {
    Panel,
    Goods,
  },
  data() {
    return { panels, styleList: [] };
  },

  mounted() {
    http.request({
      url: "/wx/api/style/getDtsStyleList",
      method: "GET",
      callBack: (data) => {
        this.styleList = data.data;
      },
    });
  },
};
</script>

<style lang="less" scoped>
.selection {
  .explosion {
    width: 100%;
    height: 226upx;
    border-radius: 20upx;
  }

  .explosion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    box-sizing: border-box;

    .img {
      width: 55%;
      height: 300upx;
      border-radius: 20upx;

      &:nth-child(2) {
        box-sizing: border-box;
        width: 40%;
      }
    }
  }

  .style {
    display: flex;
    overflow: scroll;

    .item {
      position: relative;
      margin-right: 32upx;

      &:last-child {
        margin-right: 0;
      }

      .img {
        width: 232upx;
        height: 306upx;
        border-radius: 20upx;
      }

      .text {
        position: absolute;
        bottom: 18upx;
        left: 32upx;
        font-weight: bold;
        font-size: 36upx;
        color: #fff;
      }
    }
  }

  .goods-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>