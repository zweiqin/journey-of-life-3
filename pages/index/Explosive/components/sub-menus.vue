<template>
  <view class="sub-menus-container">
    <scroll-view scroll-x="true"
      ><view class="tags">
        <view
          class="tag"
          :class="{ active: item.classifyId == currentId }"
          v-for="item in data"
          :key="item.classifyId"
          @click="$emit('change', item.classifyId)"
          >{{ item.classifyName }}</view
        >
      </view></scroll-view
    >
  </view>
</template>

<script>
// import { getTypeDetailList } from '../../../api/home'
import { getFirstClassifyApi } from '@/api/anotherTFInterface'
export default {
  props: {
    currentId: [Number,String],
  },
  data() {
    return {
      data: [],
    }
  },
  methods: {
    async getSubMenus(id) {
      const res = await getFirstClassifyApi({ classifyId: id })
        this.data = res.data
        this.data.unshift({ classifyId: id, classifyName: '全部' })
        // console.log(this.data);
        const isExtire = this.data.every(item => this.currentId !== item.classifyId)
        isExtire
          ? this.$emit('change', this.data[0].classifyId)
          : this.$emit('change', this.currentId)
    },
  },
}
</script>

<style lang="less" scoped>
.tags {
  display: flex;
  padding: 30upx 20upx 26upx 20upx;
  box-sizing: border-box;
  background-color: #fff;

  &::-webkit-scrollbar {
    display: none;
  }

  .tag {
    line-height: 1.5;
    padding: 0 20upx;
    background-color: #f1f2f6;
    margin-right: 34upx;
    border-radius: 4px;
    white-space: nowrap;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #e95d20;
    }
  }
}
</style>
