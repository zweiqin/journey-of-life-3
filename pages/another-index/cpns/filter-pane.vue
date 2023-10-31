<template>
  <view class="filter-pane-container">
    <view id="wrapper">
      <view
        v-for="(item, index) in filterMenus"
        :key="index"
        class="filter-item"
        @click="handleFilter(item.ename)"
      >
        <text>{{ formLabel[item.key] || item.label }}</text>
        <image src="../../../static/images/common/tag.png" mode="" />
      </view>
    </view>

    <!-- 新的弹出 -->
    <tui-top-dropdown
      :show="isShowPane"
      style="left: 0"
      :translatey="translatey"
      @close="cloasePopup"
      :maskZIndex="10"
      :height="0"
    >
      <view class="filter-wrapper">
        <view class="filter-values">
          <view
            v-for="item in data"
            :key="item.value"
            class="fllter-item"
            @click="handleOrder(item)"
          >
            {{ item[keyValus['label']] }}
            <tui-icon
              margin="0 30upx 0 0"
              :class="{
                active:
                  form[formMap[currentFilterCategory]] == item[keyValus.value],
              }"
              name="circle-fill"
              :color="
                form[formMap[currentFilterCategory]] == item[keyValus.value]
                  ? '#e95d20'
                  : '#fff'
              "
              :size="20"
            ></tui-icon
          ></view>
        </view>
      </view>
    </tui-top-dropdown>
  </view>
</template>

<script>
import {
  getGoodsTextureListApi,
  getStyleListApi,
  getProductPlaceList,
} from '../../../api/goods'

import { filrMenus, orderPrice, formMap, mapSearchPaneKes } from './config'

export default {
  props: {
    scrollTop: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      orderPrice: Object.freeze(orderPrice),
      filterMenus: Object.freeze(filrMenus),
      currentFilterCategory: 'retail_price',
      filrData: {
        retail_price: orderPrice,
        texture: [],
        styleId: [],
        productPlace: [],
      },
      isShowPane: false,
      form: {
        sort: '',
        styleId: '',
        productPlace: '',
        texture: '',
        sort: 'retail_price',
      },
      formLabel: {
        order: '',
        styleId: '',
        productPlace: '',
        texture: '',
      },
      formMap: Object.freeze(formMap),
    }
  },
  mounted() {
    this.initFilterData()
  },
  methods: {
    resetData() {
      this.form = {
        sort: '',
        styleId: '',
        productPlace: '',
        texture: '',
        sort: 'retail_price',
      }
      this.formLabel = {
        order: '',
        styleId: '',
        productPlace: '',
        texture: '',
      }
    },
    initFilterData() {
      getGoodsTextureListApi().then(({ data }) => {
        this.filrData.texture = data.data
        this.filrData.texture.unshift({
          desc: '不限',
          code: '',
        })
      })

      getStyleListApi().then(({ data }) => {
        this.filrData.styleId = data.data
        this.filrData.styleId.unshift({
          value: '不限',
          id: '',
        })
      })

      getProductPlaceList().then(({ data }) => {
        this.filrData.productPlace = data.data
        this.filrData.productPlace.unshift({
          desc: '不限',
          code: '',
        })
      })
    },
    // 点击筛选
    handleFilter(key) {
      this.currentFilterCategory = key
      this.isShowPane = true
    },

    // 关闭
    cloasePopup() {
      this.isShowPane = false
    },

    // 点击item
    handleOrder(value) {
      this.form[formMap[this.currentFilterCategory]] =
        value[this.keyValus.value]
      this.formLabel[formMap[this.currentFilterCategory]] =
        value[this.keyValus.label]
      this.$emit('confirm', { ...this.form })
      this.isShowPane = false

      console.log(this.formLabel)
    },
  },

  computed: {
    data() {
      return this.filrData[this.currentFilterCategory]
    },

    keyValus() {
      const a = filrMenus.find(item => {
        return item.ename === this.currentFilterCategory
      })

      return mapSearchPaneKes[a.key]
    },

    translatey() {
      if (this.scrollTop > 200) {
        return 78
      } else {
        return 440 - this.scrollTop * 2
      }
    },
  },
}
</script>

<style lang="less" scoped>
.filter-pane-container {
  width: 100%;
  // background-color: aqua;

  position: relative;
  background-color: #fff;
  // z-index: 10000000000;

  #wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    height: 100%;
    padding: 26upx 20upx 20upx 20upx;
    box-sizing: border-box;
  }

  .filter-item {
    display: flex;
    align-items: center;
  }

  image {
    width: 18upx;
    height: 9upx;
    margin-left: 10upx;
    margin-top: 4upx;
  }

  .filter-container {
    position: absolute;
    top: 65px;
    background-color: #fff;
    width: 100%;
    z-index: 1000;
    left: 0;
    transform: scaleY(0);
    transform-origin: top center;
    transition: all 200ms;
    padding: 20upx;
    box-sizing: border-box;
  }
}

#wrapper {
  position: relative;
  z-index: 1000000;
  background: #fff;
}

/deep/ .tui-popup-list {
  width: 100% !important;
  background-color: #fff;
  height: 100px;
}

.main-popup {
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 30upx;
  box-sizing: border-box;
  overflow: auto;

  .main-title {
    text-align: center;
    font-size: 32upx;
  }

  .filter-values {
    display: flex;
    align-items: center;
    margin: 30upx 0 40upx 0;
    flex-wrap: wrap;

    .fllter-item {
      width: 50%;
      padding: 20upx 30upx;
      border-radius: 100px;
      background-color: #ececec;
      margin-right: 20upx;
      flex-shrink: 0;
      margin-bottom: 20upx;

      &.active {
        border: 1upx solid #e95d20;
        background-color: #ffe9df;
      }
    }
  }
}

/deep/ .tui-btn {
  background: linear-gradient(45deg, #ffcc03, #fe773e) !important;
}

/deep/ .tui-top-dropdown {
  left: 0;
  max-height: 600upx;
  overflow: scroll;
  padding-bottom: 20upx;
}

.filter-wrapper {
  width: 100%;
  // height: 100%;
  border-top: 1upx solid #f9f9f9;

  background-color: #fff;
  overflow: scroll;
  padding-top: 20upx;

  .filter-values {
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;

    .fllter-item {
      width: 100%;
      height: 80upx;
      line-height: 80upx;
      padding: 0 20upx;
      box-sizing: border-box;
      border-bottom: 1upx solid #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // background-color: #f1f1f1;
      box-sizing: border-box;
    }
  }
}
</style>
