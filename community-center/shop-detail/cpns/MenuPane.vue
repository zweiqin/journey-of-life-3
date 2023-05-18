<template>
  <view class="menu-pane">
    <scroll-view scroll-x>
      <view class="menu-wrapper">
        <view class="item" @click="handleSwitchTab(item)" :class="{ active: currentTab === item.value }"
          v-for="item in menuList" :key="item.value">{{
            item.name }}</view>
      </view>
    </scroll-view>

    <view class="main">
      <ApponitList :data="activeData" v-show="currentTab === 0"></ApponitList>
      <ActivitySwiper v-show="currentTab === 1"></ActivitySwiper>
    </view>
  </view>
</template>

<script>
import { menuList } from '../config'
import ActivitySwiper from './ActivitySwiper.vue'
import ApponitList from './ApponitList.vue'

export default {
  components: {
    ApponitList,
    ActivitySwiper
  },
  props: {
    serveList: {
      type: Array,
      default: []
    },

    activeData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      menuList: Object.freeze(menuList),
      currentTab: 0
    }
  },

  methods: {
    handleSwitchTab(item) {
      this.currentTab = item.value
    }
  },
}
</script>

<style lang="less" scoped>
.menu-pane {
  padding: 33upx 38upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20upx;
  margin-top: 30upx;

  .menu-wrapper {
    display: flex;
    align-items: center;

    .item {
      line-height: 1.5;
      font-size: 28upx;
      color: #979797;
      margin-left: 40upx;

      &:nth-of-type(1) {
        margin-left: 0;
      }

      &.active {
        color: #3d3d3d;
        font-weight: 500;
      }
    }
  }

  .main {
    margin-top: 20upx;
  }
}
</style>