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
          <view class="item" v-for="item in channel" :key="item.id">
            <img class="img" :src="item.iconUrl" alt="" />
            <text class="text">{{ item.name }}</text>
          </view>
        </view>
      </template>

      <template v-if="item.value === 1">
        <img class="explosion" :src="explosion[0].picUrl" alt="" />
      </template>

      <template v-if="item.value === 2">
        <view class="explosion">
          <img class="img" :src="discount[9].picUrl" alt="" />
          <img class="img" :src="discount[8].picUrl" alt="" />
        </view>
      </template>
    </Panel>

    <view class="goods-list">
      <Goods
        v-for="item in discount"
        :key="item.id"
        :name="item.name"
        :sname="item.brief"
        :url="item.picUrl"
        :price="item.retailPrice"
      ></Goods>
    </view>
  </div>
</template>

<script>
import Panel from "../../../../components/panel/index.vue";
import Goods from "../../../../components/goods";
import http from "../../../../utils/http";
import { panels } from "./config";
export default {
  components: {
    Panel,
    Goods,
  },
  props: {
    channel: {
      type: Array,
      required: true,
    },
    explosion: {
      type: Array,
      required: true,
    },
    discount: {
      type: Array,
      required: true,
    },
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

  methods: {},
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
        // height: 306upx;
        border-radius: 20upx;
        object-fit: cover;
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
    padding-bottom: 70px;
  }
}
</style>