<template>
  <tui-top-dropdown
    :height="0"
    :show="value"
    :translatey="transDis"
    @close="btnCloseDrop"
  >
    <view class="popup-container">
      <view class="cao">
        <view
          class="filter-wrapper"
          v-for="(item, index) in allFilters"
          :key="index"
        >
          <view class="filter-title">{{ item.title }}</view>
          <view class="item-wrapper">
            <view
              class="item"
              v-for="(item, index) in item.items"
              :key="index"
              >{{ item }}</view
            >
          </view>
        </view>
      </view>

      <view class="btns">
        <button class="uni-btn reset">重置</button>
        <button class="uni-btn confirm">确定</button>
      </view>
    </view>
  </tui-top-dropdown>
</template>

<script>
import { allFilters } from '../data'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },

    scrollTop: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      allFilters: Object.freeze(allFilters),
    }
  },

  methods: {
    btnCloseDrop() {
      this.$emit('input', false)
    },
  },

  computed: {
    transDis() {
      return 260 - this.scrollTop * 2
    },
  },
}
</script>

<style lang="less" scoped>
.popup-container {
  padding: 46upx 20upx 40upx;
  background-color: #fff;
  width: 100%;
  min-height: 240upx;
  max-height: 800upx;
  box-sizing: border-box;

  .filter-title {
    font-size: 28upx;
    font-weight: bold;
    color: #3a3629;
    margin-bottom: 16upx;
  }

  .cao {
    height: 600upx;
    overflow: scroll;
  }

  .item-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 226upx;
      height: 64upx;
      border-radius: 100upx;
      background-color: #f6f6f5;
      font-size: 28upx;
      margin-right: 14upx;
      margin-bottom: 16upx;
      color: #605d52;

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  .btns {
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20upx;

    .uni-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 347upx;
      height: 88upx;
      font-size: 32upx;
      border-radius: 100px;
    }

    .reset {
      color: #8f8d85;
      border: 2upx solid #d5d4d1;
    }

    .confirm {
      background-color: #ffc117;
      color: #fff;
    }
  }
}
</style>
