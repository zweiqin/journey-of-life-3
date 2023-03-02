<template>
  <tui-drawer mode="right" :visible="value" @close="closeDrawer">
    <view class="d-container">
      <view class="filter-item" v-if="catalogList.length">
        <view class="filter-title">全部分类</view>
        <view class="item-list">
          <view
            class="item"
            :class="{
              active: query['categoryId'] === item.id,
            }"
            @click="handleFilterMenu('categoryId', item.id)"
            v-for="item in catalogList"
            :key="item.id"
          >
            {{ item.name }}
          </view>
        </view>
      </view>

      <view class="filter-item" style="margin-top: 46upx">
        <view class="filter-title">价格</view>
        <view class="item-list">
          <view
            class="item"
            @click="handleFilterMenu('order', 'asc')"
            :class="{ active: query.order === 'asc' }"
            >从高到低</view
          >
          <view
            class="item"
            @click="handleFilterMenu('order', 'desc')"
            :class="{ active: query.order === 'desc' }"
            >从低到高</view
          >
        </view>
      </view>

      <view class="btns">
        <button class="uni-btn reset" @click="resetFilter">重置</button>
        <button class="uni-btn confirm" @click="handleConfirm">确认</button>
      </view>
    </view>
  </tui-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },

    catalogList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      query: {
        sort: 'retail_price',
        order: '',
      },
    }
  },

  methods: {
    closeDrawer() {
      this.$emit('input', false)
    },
    // 点击全部分类
    handleFilterMenu(key, value) {
      const currentValue = this.query[key]
      if (currentValue && currentValue === value) {
        this.query[key] = ''
      } else {
        this.query[key] = value
      }

      this.$forceUpdate()
    },

    // 重置
    resetFilter() {
      this.query = {
        sort: 'retail_price',
        order: '',
      }

      this.$emit('change', this.query)
    },

    // 确认
    handleConfirm() {
      this.$emit('change', this.query)
      this.closeDrawer()
    },
  },
}
</script>

<style lang="less" scoped>
.d-container {
  position: relative;
  width: 638upx;
  height: 100%;
  border-radius: 24upx 0 0 24upx;
  background-color: #fff;
  padding: 40upx 32upx;
  box-sizing: border-box;
  padding-bottom: 144upx;

  .filter-item {
    .filter-title {
      color: #141000;
      font-weight: 500;
      font-size: 32upx;
      margin-bottom: 32upx;
    }

    .item-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .item {
        color: #8f8d85;
        border: 2upx solid #f1f1f0;
        padding: 6upx 24upx;
        margin-right: 16upx;
        border-radius: 100px;
        font-size: 24upx;
        box-sizing: border-box;

        &.active {
          color: #ffc117;
          border-color: #ffc117;
          background: rgba(255, 193, 23, 0.08);
        }
      }
    }
  }

  .btns {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 32upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .uni-btn {
      width: 278upx;
      height: 80upx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28upx;
      font-weight: 500;
      border-radius: 100px;

      &.reset {
        border: 1upx solid #d5d4d1;
      }

      &.confirm {
        background-color: #ffc117;
      }
    }
  }
}
</style>
