<template>
  <view class="tuan-city">
    <tui-bottom-popup :height="500" :zIndex="1002" :maskZIndex="1001" :show="popupVisiable" @close="handleClosePopup">
      <view class="city-pane">
        <view class="header">
          <button class="uni-btn">取消</button>
          <button :loading="loading" class="uni-btn confirm" @click="handleConfirm">
            <text v-show="!loading">确定</text>
          </button>
        </view>
        <view class="cityList">
          <!-- <view class="loading">
            <tui-loading v-if="addressLoading"></tui-loading>
          </view> -->

          <!-- <picker-view indicator-style="color: orange" v-if="!addressLoading" :value="currentValue" -->
          <picker-view @pickstart="isScroll = true" @pickend="isScroll = false"
            indicator-style="color: orange; height: 64rpx" :value="currentValue" @change="handleChangeColumn"
            class="picker-view">
            <picker-view-column>
              <view class="item" :style="{ width: itemColumnWidth }" v-for="(item, index) in cityData" :key="index">{{
                item.name }}</view>
            </picker-view-column>

            <picker-view-column>
              <view class="item" :style="{ width: itemColumnWidth }" v-for="(item, index) in pickerData.data_2"
                :key="index">{{ item.name }}</view>
            </picker-view-column>

            <picker-view-column>
              <view class="item" :style="{ width: itemColumnWidth }" v-for="(item, index) in pickerData.data_3"
                :key="index">{{ item.name }}</view>
            </picker-view-column>

            <picker-view-column v-if="layer === 4">
              <view class="item" :style="{ width: itemColumnWidth }" v-for="(item, index) in pickerData.data_4"
                :key="index">{{ item.name }}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </tui-bottom-popup>
  </view>
</template>

<script>
export default {
  props: {
    layer: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      popupVisiable: false,
      addressLoading: true,
      cityData: [],
      currentValue: [],
      pickerData: {
        data_2: [],
        data_3: [],
        data_4: [],
      },
      loading: false,
      isScroll: false
    }
  },
  computed: {
    itemColumnWidth() {
      return this.layer === 3 ? '250rpx' : "186rpx"
    }
  },
  methods: {
    // 显示
    show() {
      import('./pcas-code.json').then(res => {
        for (const key in res) {
          if (!Array.isArray(res[key])) {
            this.cityData.push(res[key])
          }
        }
        this.addressLoading = false
        this.initData()
      })
      this.popupVisiable = true
    },
    // 初始化数据
    initData() {
      this.pickerData.data_2 = this.cityData[0].children
      this.pickerData.data_3 = this.cityData[0].children[0].children
      if (this.layer === 4) {
        this.pickerData.data_4 = this.cityData[0].children[0].children[0].children
      }
      this.$forceUpdate()
    },
    // 关闭
    close() {
      this.currentValue = [0, 0, 0, 0]
      this.loading = false
      this.popupVisiable = false
    },
    handleClosePopup() {
      this.popupVisiable = false
    },
    // 发生了滚动
    handleChangeColumn(e) {
      const newValue = e.detail.value
      const change = this.diffValueChange(this.currentValue, newValue)
      this.currentValue = newValue
      this.setColumnData(change)
    },
    // 比对修改的地方
    diffValueChange(oldValue, newValue) {
      for (let i = 0; i < newValue.length; i++) {
        if (newValue[i] !== oldValue[i] && newValue[i] !== '空白') {
          return i
        }
      }
    },
    // 设置数据
    setColumnData(changeTag) {
      const _this = this
      switch (changeTag) {
        case 0:
          _this.pickerData.data_2 = _this.cityData[_this.currentValue[0]].children
          _this.pickerData.data_3 = _this.pickerData.data_2[0].children
          _this.currentValue = [_this.currentValue[0], 0, 0, 0]
          if (_this.layer === 4) {
            _this.pickerData.data_4 = _this.pickerData.data_2[0].children[0].children
          }
          break

        case 1:
          _this.pickerData.data_3 = _this.pickerData.data_2[_this.currentValue[1]].children
          _this.currentValue = [_this.currentValue[0], _this.currentValue[1], 0, 0]
          if (_this.layer === 4) {
            _this.pickerData.data_4 = _this.pickerData.data_3[0].children
          }
          break
        case 2:
          _this.currentValue = [_this.currentValue[0], _this.currentValue[1], _this.currentValue[2], 0]
          if (_this.layer === 4) {
            _this.pickerData.data_4 = _this.pickerData.data_3[_this.currentValue[2]].children
          }
          break
      }
      this.$forceUpdate()
    },
    // 点击确认
    handleConfirm() {
      // TODO: 要不要加一个滑动时点击确定的提示
      // if (this.isScroll) {
      //   console.log("操作太快了");
      // }
      this.loading = true
      const data = {
        index: this.currentValue,
        detail: {
          province: this.cityData[this.currentValue[0]].name,
          city: this.pickerData.data_2[this.currentValue[1]].name,
          town: this.pickerData.data_3[this.currentValue[2]].name,
          county: this.pickerData.data_4[this.currentValue[3]].name,
        },
        formatAddress3: this.cityData[this.currentValue[0]].name + this.pickerData.data_2[this.currentValue[1]].name + this.pickerData.data_3[this.currentValue[2]].name,
        formatAddress4: this.cityData[this.currentValue[0]].name + this.pickerData.data_2[this.currentValue[1]].name + this.pickerData.data_3[this.currentValue[2]].name + this.pickerData.data_4[this.currentValue[3]].name
      }
      this.$emit('confirm', data)
      this.close()
    }
  },
}
</script>

<style lang="less" scoped>
.city-pane {
  width: 100%;
  height: 100%;

  .header {
    padding: 20upx 30upx;
    box-sizing: border-box;
    height: 100upx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .uni-btn {
      font-size: 30upx;
      color: #ccc;

      &.confirm {
        color: orange;
      }
    }
  }

  /deep/ .uni-picker-view-indicator {
    background-color: #f5f5f515;
  }

  .item {
    width: 250upx;
    height: 64upx;
    text-align: center;
    line-height: 64upx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 32upx;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }


  .loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cityList {
    height: 100%;

    .picker-view {
      height: 100%;
    }
  }
}
</style>