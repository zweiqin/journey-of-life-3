<template>
  <view class="header-container" :class="{ fixed: scrollTop > 200 }">
    <view class="search-ontainer">
      <tui-icon @click="handleBack" name="arrowleft"></tui-icon>
      <view class="search-container">
        <image
          class="search-icon"
          src="../../../static/images/new-brand/index/search-icon.png"
          mode=""
        />

        <input
          v-model="serachValue"
          @confirm="$emit('search', serachValue)"
          confirm-type="search"
          type="text"
          :placeholder="placeholder"
        />
      </view>
    </view>

    <scroll-view v-if="!isCustorm" scroll-x="true">
      <view class="menus">
        <view
          @click="$emit('change', item.id)"
          class="item"
          :class="{ active: current == item.id }"
          v-for="item in menus"
          :key="item.id"
        >
          {{ item.styleName }}</view
        >
      </view>
    </scroll-view>

    <view v-else>
      <slot></slot>
    </view>
  </view>
</template>

<script>
import { getMaterialBrandStyleListApi } from '../../../api/brand'
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索内容',
    },

    current: {
      type: [Number, String],
      required: true,
    },

    scrollTop: {
      type: Number,
      default: 0,
    },
    isCustorm: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      menus: [],
      serachValue: '',
    }
  },

  mounted() {
    this.getMenus()
  },

  watch: {
    serachValue(value) {
      if (!value) {
        this.$emit('search', '')
      }
    },
  },

  methods: {
    async getMenus() {
      const { data } = await getMaterialBrandStyleListApi({
        page: 1,
        limit: 100,
      })

      console.log(data)
      this.menus = [
        {
          createTime: '2023-03-17 08:18:12',
          id: -100,
          isDelete: false,
          styleName: '综合',
          updateTime: '2023-03-17 08:18:12',
        },
        ...data.items,
      ]
    },

    handleBack() {
      uni.switchTab({
        url: '/pages/stuff/stuff',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.header-container {
  padding: 24upx 20upx;
  background-color: #fff;
  border-radius: 0px 0px 24px 24px;
  padding-bottom: 0;

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .search-ontainer {
    display: flex;
    align-items: center;

    .search-container {
      display: flex;
      align-items: center;
      height: 72upx;
      flex: 1;
      background-color: #f6f6f5;
      border-radius: 100px;
      padding: 20upx 24upx;
      box-sizing: border-box;

      .search-icon {
        width: 32upx;
        height: 32upx;
        margin-right: 16upx;
        padding-right: 16upx;
        border-right: 1upx solid #d5d4d1;
      }

      input {
        font-size: 28upx;
        flex: 1;
      }
    }
  }

  .menus {
    display: flex;
    white-space: nowrap;
    margin: 32upx 0 38upx 0;

    .item {
      position: relative;
      margin-right: 40upx;
      line-height: 48upx;
      font-size: 28upx;
      color: #141000;
      transition: all 50ms;

      &::after {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        content: '';
        display: block;
        width: 0;
        height: 8upx;
        background-color: #ffc117;
        border-radius: 100px;
        transition: all 350ms;
      }

      &.active {
        font-size: 34upx;
        line-height: 52upx;
        font-weight: bold;

        &::after {
          width: 40upx;
        }
      }
    }
  }
}

/deep/ .uni-scroll-view {
  &::-webkit-scrollbar {
    display: none !important;
  }
}
</style>
