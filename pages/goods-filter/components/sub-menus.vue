<template>
  <view class="sub-menus-container">
    <scroll-view scroll-x="true"
      ><view class="tags">
        <view
          class="tag"
          :class="{ active: item.id === currentId }"
          v-for="item in data"
          :key="item.id"
          @click="$emit('change', item.id)"
          >{{ item.name }}</view
        >
      </view></scroll-view
    >
  </view>
</template>

<script>
import { getTypeDetailList } from "../../../api/home";
export default {
  props: {
    currentId: Number,
  },
  data() {
    return {
      data: [],
    };
  },
  methods: {
    async getSubMenus(id) {
      const res = await getTypeDetailList({ id });
      if (res.errno === 0) {
        this.data = res.data.currentSubCategory;
        this.data.unshift({ id: -1, name: "全部" });
        const isExtire = this.data.every((item) => this.currentId !== item.id);
        isExtire
          ? this.$emit("change", -1)
          : this.$emit("change", this.currentId);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tags {
  display: flex;
  padding: 34upx 20upx 26upx 20upx;
  box-sizing: border-box;
  background-color: #fff;
  .tag {
    line-height: 1.5;
    padding: 0 20upx;
    background-color: #f1f2f6;
    margin-right: 34upx;
    border-radius: 4px;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #e95d20;
    }
  }
}
</style>