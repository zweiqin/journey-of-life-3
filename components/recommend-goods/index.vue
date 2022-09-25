<template>
  <view
    class="recommend-goods-container"
    :style="
       {
        padding: padding + 'px'
      }
    "
  >
    <view class="title" v-if="showTitle"></view>
    <ul>
      <li v-for="item in list" :key="item.id">
        <Goods
          :id="item.id"
          :name="item.name"
          :sname="item.brief"
          :url="item.picUrl"
          :price="item.retailPrice"
        ></Goods>
      </li>
    </ul>
  </view>
</template>

<script>
import Goods from "../goods";
import { everyLookApi } from "../../api/goods";
export default {
  props: {
    id: {
      type: [Number, String],
      default: 14,
    },

    showTitle: {
      type: Boolean,
      default: true,
    },

    padding: [Number, String]
  },

  components: {
    Goods,
  },

  data() {
    return {
      list: [],
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      const res = await everyLookApi(this.id);
      if (res.errno === 0) {
        this.list = res.data.goodsList;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.recommend-goods-container {
  padding: 15px;
}

.title {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 1px;
  border-top: 1upx solid black;
  margin: 20px 0 20px 0;

  &::before {
    position: absolute;
    content: "大家都在看";
    display: block;
    background-color: @cw;
    padding: 0 20px;
    top: -10px;
    left: 50%;
    font-size: @f14;
    white-space: nowrap;
    transform: translateX(-50%);
  }
}

ul {
  padding: 0;
  .flex();
  flex-wrap: wrap;
}
</style>