<template>
  <view class="table-container">
    <view class="item">
      <view class="header"></view>
      
    </view>
  </view>
</template>

<script>
import { supply, pcToday } from "./config";
import { getStuffListApi, getPcTodayListApi } from "../../../api/stuff";

export default {
  props: {
    type: {
      type: String,
    },

    data: Array,
    size: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {};
  },

  watch: {
    type: {
      handler(value) {
        console.log(value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>