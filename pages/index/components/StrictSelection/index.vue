<template>
  <div class="selection">
    <!-- <lqbCompany></lqbCompany> -->
    <lqbTitle
      v-for="item in panels"
      :key="item.label"
      :title="item.label"
      :englishTitle="item.english"
      :status="item.value"
      :companyTitle="item.title"
      :type="item.type"
    >
      <!-- <template v-if="item.value === 0">
        <view class="style">
          <view
            class="item"
            @click="handleViewStyle(item)"
            v-for="item in styleList"
            :key="item.id"
          >
            <view>
              <img class="img" :src="item.iconUrl" alt="" />
            </view>
            <text class="text">{{ item.name }}</text>
          </view>
        </view>
      </template> -->

      <template v-if="item.value === 1 && explosion">
        <view class="goods-list" v-if="explosion">
          <Goods
            v-for="item in goodlist1"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            :sname="item.brief"
            :url="item.picUrl"
            :price="item.retailPrice"
          ></Goods>
        </view>
      </template>

      <template v-if="item.value === 2 && discount">
        <view class="goods-list" v-if="discount">
          <Goods
            v-for="item in goodlist2"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            :sname="item.brief"
            :url="item.picUrl"
            :price="item.retailPrice"
          ></Goods>
        </view>
      </template>
      <template v-if="item.value === 3 && guessLike">
        <view class="goods-list" v-if="guessLike">
          <Goods
            v-for="item in goodlist3"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            :sname="item.brief"
            :url="item.picUrl"
            :price="item.retailPrice"
          ></Goods>
        </view>
      </template>
    </lqbTitle>
  </div>
</template>

<script>
import Panel from "../../../../components/panel/index.vue";
import Goods from "../../../../components/goods";
import lqbTitle from "../lqbTitle";
import lqbCompany from "../lqbCompany";
import { panels, mapStyleImg } from "./config";
import { STYLE_LIST } from "../../../../constant";

export default {
  components: {
    Panel,
    Goods,
    lqbTitle,
    lqbCompany,
  },
  props: {
    goodlist1:Array,
    goodlist2:Array,
    goodlist3:Array,
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
    brandList: {
      type: Array,
      required: true,
    },
    guessLike: {
      type: Array,
      required: true,
    },
    // hotGoodsList: {
    //   type: Array,
    //   required: true,
    // },
  },
  data() {
    return { panels, styleList: [] };
  },

  watch: {
    channel(value) {
      if (value && value.length) {
        this.styleList = value.filter((item) => {
          item.iconUrl = item.iconUrl || mapStyleImg[item.name];
          return item.name.includes("风格") || item.name.includes("画");
        });

        uni.setStorageSync(STYLE_LIST, this.styleList);
      }
    },
  },

  mounted() {
    // this.seebrandList();
  },

  methods: {
    // seebrandList() {
    //     //获得传输的数据
    //   console.log(this.brandList);
    // },
    handleViewStyle(item) {
      uni.navigateTo({
        url: "/home/styles?id=" + item.id,
      });
    },

    handleToDoodsDetail(item) {
      uni.navigateTo({
        url: "/pages/prod/prod?goodsId=" + item.id,
      });
    },
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
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      width: 0;
    }
    .item {
      position: relative;
      margin-right: 32upx;
      &:last-child {
        margin-right: 0;
      }

      .img {
        width: 300upx;
        height: 300upx;
        border-radius: 20upx;
        object-fit: cover;
      }

      .text {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 36upx;
        color: black;
      }
    }
  }
  .you-love {
    color: #3d3d3d;
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 30upx;
    padding-top: 10upx;
    padding-left: 10upx;
  }
  .goods-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 70upx;
  }
}
</style>