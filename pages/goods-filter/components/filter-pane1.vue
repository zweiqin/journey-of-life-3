<template>
  <view class="filter-pane-container">
    <view id="wrapper">
      <view class="filter-item" @click="handleFilter">
        <text>价格</text>
        <image src="../../../static/images/common/tag.png" mode="" />
      </view>
      <view class="filter-item" @click="handleFilter">
        <text>风格</text>
        <image src="../../../static/images/common/tag.png" mode="" />
      </view>
      <view class="filter-item" @click="handleFilter">
        <text>产地</text>
        <image src="../../../static/images/common/tag.png" mode="" />
      </view>
      <view class="filter-item" @click="handleFilter">
        <text>材质</text>
        <image src="../../../static/images/common/tag.png" mode="" />
      </view>
    </view>

    <!-- 新的弹出 -->
    <tui-top-dropdown
      :show="isShowPane"
      :paddingbtm="110"
      style="left: 0"
      :translatey="440"
      @close="cloasePopup"
      :maskZIndex="10"
    >
      <view class="filter-wrapper">
        <view class="filter-values">
          <view
            v-for="item in orderPrice"
            :key="item.value"
            class="fllter-item"
            :class="{ active: order === '' }"
            @click="handleOrder('')"
          >
            <tui-icon name="circle-fill" color="#fa5151" :size="20"></tui-icon>
            默认</view
          >
        </view>
      </view>
    </tui-top-dropdown>

   
      backgroundColor="transparent"
      :height="900"
      :show="isShowPane"
      @close="cloasePopup"
    >
      <view class="main-popup">
        <view class="main-title">全部筛选</view>
        <view class="filter-title">价格</view>
        <view class="filter-values">
          <view
            class="fllter-item"
            :class="{ active: order === 'desc' }"
            @click="handleOrder('desc')"
            >由高到低</view
          >
          <view
            class="fllter-item"
            :class="{ active: order === 'asc' }"
            @click="handleOrder('asc')"
            >由低到高</view
          >
        </view>
        <view class="filter-title">风格</view>
        <view class="filter-values">
          <view
            @click="handleSetStyle(item.id)"
            :class="{ active: currentStyle === item.id }"
            class="fllter-item"
            v-for="item in styleList"
            :key="item.id"
            >{{ item.value }}</view
          >
        </view>
        <view class="filter-title">产地</view>
        <view class="filter-values">
          <view
            class="fllter-item"
            @click="handleSetCity(item.code)"
            :class="{
              active: currentCity === item.code,
            }"
            v-for="item in citiList"
            :key="item.code"
            >{{ item.desc }}</view
          >
        </view>

        <tui-button shape="circle" @click="handleConfirm">确定</tui-button>
      </view>
    </tui-bottom-popup> -->
  </view>
</template>

<script>
import {
  getGoodsTextureListApi,
  getStyleListApi,
  getProductPlaceList,
} from '../../../api/goods'

const orderPrice = [
  {
    name: '默认',
    value: '',
  },
  {
    name: '由高到低',
    value: 'desc',
  },
  {
    name: '由低到高',
    value: 'asc',
  },
]
export default {
  data() {
    return {
      position: 0,
      isShowPane: false,
      styleList: [],
      citiList: [],
      currentStyle: null,
      currentCity: null,
      sort: 'retail_price',
      order: '',
      dropShow: false,

      // new
      orderPrice: Object.freeze(orderPrice),
    }
  },
  mounted() {
    this.setTop()
    this.initFilterData()
  },
  methods: {
    setTop() {
      const _this = this
      const query = uni.createSelectorQuery().in(this)
      query
        .select('#wrapper')
        .boundingClientRect(data => {
          _this.position = data.height + data.top / 2
        })
        .exec()
    },

    handleFilter() {
      this.isShowPane = true
    },

    cloasePopup() {
      this.isShowPane = false
    },

    async initFilterData() {
      const _this = this
      getStyleListApi().then(({ data }) => {
        _this.styleList = data.data
      })

      getProductPlaceList().then(({ data }) => {
        _this.citiList = data.data
      })
    },

    handleConfirm() {
      this.$emit('confirm', {
        styleId: this.currentStyle,
        productPlace: this.currentCity,
        sort: this.sort,
        order: this.order,
      })
      this.isShowPane = false
    },

    handleOrder(desc) {
      this.order = desc === this.order ? '' : desc
      this.isShowPane = false
      this.handleConfirm()
    },

    handleSetStyle(id) {
      this.currentStyle = this.currentStyle === id ? null : id
    },

    handleSetCity(code) {
      this.currentCity = this.currentCity === code ? null : code
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
}

.filter-wrapper {
  width: 100%;
  padding: 20upx;
  box-sizing: border-box;

  .filter-values {
    .fllter-item {
      width: 100%;
      height: 80upx;
      line-height: 80upx;
      border-bottom: 1upx solid #f9f9f9;
    }
  }
}
</style>
