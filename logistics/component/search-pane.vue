<template>
  <view class="search-pane" v-if="searchValue && value">
    <scroll-view scroll-y="true">
      <view class="search-result" v-if="searchResult.length">
        <view
          @click="handleChoose(item)"
          class="item"
          v-for="(item, index) in searchResult"
          :key="index"
          v-html="
            item.label.replaceAll(
              searchValue,
              `<span style='color: #ff8f1f '>${searchValue}</span>`
            ) +
            `<span style='font-size: 12px;color: #ccc; transform: scale(0.8)'>(${item.parentNode})</span>`
          "
        ></view>
      </view>

      <view class="no-data" v-else>无结果</view>
    </scroll-view>
  </view>
</template>

<script>
import { commoditySelect } from "../config";
export default {
  props: {
    searchValue: {
      type: String,
      required: true,
    },
    value: { type: Boolean, required: true },
  },
  data() {
    return {
      commoditySelect,
      searchResult: [],
    };
  },

  watch: {
    searchValue(newValue) {
      this.search(newValue);
    },
  },

  methods: {
    search(value) {
      let result = [];
      if (!value) return;
      // for (const mainType in this.commoditySelect) {
      //   if (mainType.includes(value)) {
      //     result.push({
      //       parentNode: mainType,
      //     });
      //   }

      //   result = [
      //     ...result,
      //     ...this.commoditySelect[mainType].filter((item) =>
      //       item.label.includes(value)
      //     ),
      //   ];
      // }

      // this.searchResult = result;

      // console.log(this.commoditySelect);

      for (const item of this.commoditySelect) {
        result = [
          ...result,
          ...item.itemList.filter((goods) => {
            return goods.label.includes(value);
          }),
        ];
      }

      this.searchResult = result;
      console.log(result);
    },

    handleChoose(item) {
      console.log(11111);
      this.$emit("search", item);
    },
  },
};
</script>

<style lang="less" scoped>
.search-pane {
  position: absolute;
  top: 110upx;
  left: 0;
  width: 100vw;
  max-height: 400upx;
  background-color: rgb(255, 255, 255);
  z-index: 100;
  overflow: scroll;
  padding: 20upx;
  box-sizing: border-box;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);

  .search-result {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }

  .item {
    width: 50%;
    height: 100upx;
    line-height: 100upx;
    padding-left: 30upx;
    box-sizing: border-box;
  }
}

.no-data {
  text-align: center;
  height: 100upx;
  line-height: 100upx;
  color: #ccc;
}
</style>