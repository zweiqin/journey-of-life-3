<template>
  <view class="select-serve-pane-contaiiner" v-if="serveData">
    <view class="select-header">
      <view class="title-wrapper" @click="collapse = !collapse">
        <view class="title">{{ serveData.serverNameTwo }}</view>
        <image :style="{ transform: collapse ? `rotate(180dey)` : '' }" class="collapse-icon" src="../../../../static//images/new-business/in/collapse.png"></image>
      </view>

      <view class="select-all" @click="$emit('choose', { data: allServeName, type: selectAllStatus ? 'remove' : 'add' })">
        <tui-icon margin="0 8upx 0 0" :size="16" :name="selectAllStatus ? 'circle-selected' : 'circle'" :color="selectAllStatus ? '#E02208' : '#08377f'"></tui-icon>
        全选
      </view>
    </view>

    <view class="detail-container" :class="{ collapse: collapse }">
      <view
        class="item"
        :class="{ active: currentSelectServe.includes(item.serverNameThree) }"
        @click="$emit('choose', { data: item.serverNameThree, type: 'item' })"
        v-for="item in serveData.children"
        :key="item.id"
      >
        {{ item.serverNameThree }}
      </view>
    </view>
  </view>
</template>

<script>
import { transform } from 'lodash-es';
import { isSubarray } from '../../../../utils';

export default {
  props: {
    serveData: {
      type: Object,
      required: true
    },

    currentSelectServe: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      allServeName: [],
      collapse: false
    };
  },

  methods: {
    getAllServeName(allServes) {
      if (!allServes.length) return;
      this.allServeName = allServes.map((serveInfo) => serveInfo.serverNameThree).flat(Infinity);
    }
  },

  watch: {
    serveData: {
      handler(newValue) {
        this.getAllServeName(newValue.children);
      },
      immediate: true,
      deep: true
    }
  },

  computed: {
    selectAllStatus() {
      return isSubarray(this.currentSelectServe, this.allServeName);
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes collapse-ani {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    height: 0;
    overflow: hidden;
  }
}
.select-serve-pane-contaiiner {
  margin-bottom: 60upx;
  .select-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40upx;

    .title-wrapper {
      display: flex;
      align-items: center;
      .title {
        color: #08377f;
        font-size: 32upx;
        font-weight: 500;
      }

      .collapse-icon {
        width: 21upx;
        height: 21upx;
        flex-shrink: 0;
        margin-left: 8upx;
        transition: all 350ms;
      }
    }

    .select-all {
      display: flex;
      align-items: center;
      font-size: 24upx;
      color: #08377f;
    }
  }

  .detail-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &.collapse {
      display: none;
    }

    .item {
      line-height: 1.5;
      white-space: nowrap;
      font-size: 24upx;
      color: #888;
      padding: 3upx 15upx;
      border: 1upx solid #888889;
      margin-right: 18upx;
      margin-bottom: 27upx;
      border-radius: 8upx;

      &.active {
        color: #3982f1;
        border-color: #3982f1;
      }
    }
  }
}
</style>
