<template>
  <view class="j-city">
    <view class="address">
      <view class="diqu"></view>
      <view class="value" :style="{
        color: text ? textColor : 'gray',
      }" @click="open">{{ text || '选择城市' }}</view>
    </view>
    <uni-popup @change="onPopupStatusChange" ref="popup" type="bottom">
      <view class="city-wrapper">
        <view class="header">
          <view class="citys">
            <view class="item" @click="change('province')" :class="{
              active: current === 'province',
            }">{{ areaInfo.province.text || '省份' }}</view>
            <view class="item" :class="{
              active: current === 'city',
            }" @click="change('city')">{{ areaInfo.city.text || '城市' }}</view>
            <view class="item" @click="change('county')" :class="{
              active: current === 'county',
            }">{{ areaInfo.county.text || '区县' }}</view>
          </view>
          <button class="confirm" :style="{
            color: areaInfo.county.text ? '#fa5151' : '#8b8b8b',
          }" @click="handleConfirmArea">
            确定
          </button>
        </view>

        <view class="body">
          <ul>
            <li :class="{
              active: item.id === areaInfo[current].id,
            }" v-for="item in data" :key="item.id" @click="chooseCity(item)">
              {{ item.name }}
            </li>
          </ul>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { getCitiesApi } from '../../api/user'

export default {
  props: {
    text: String,
    textColor: String,
    control: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      current: 'province',
      data: [],
      areaInfo: {
        province: {
          text: '',
          id: null,
        },
        city: {
          text: '',
          id: null,
        },
        county: {
          text: '',
          id: null,
        },
      },
      areaString: '',

    }
  },
  methods: {
    // 打开popup
    open() {
      this.$refs.popup.open('bottom')
    },

    // 切换区域
    change(field) {
      if (this.current === field) {
        return
      }

      if (field === 'city' && !this.areaInfo.province.id) {
        return
      }

      if (field === 'county' && !this.areaInfo.city.id) {
        return
      }

      if (field === 'province') {
        this.getCity({
          pid: 0,
        })
      } else if (field === 'city') {
        this.getCity({
          pid: this.areaInfo.province.id,
        })
      } else if (field === 'county') {
        this.getCity({
          pid: this.areaInfo.city.id,
        })
      }

      this.current = field
    },

    // 获取地址信息
    getCity(data) {
      getCitiesApi(data).then(res => {
        this.data = res.data
      })
    },

    // 选择区域
    chooseCity(cityInfo) {
      this.areaInfo[this.current]['text'] = cityInfo.name
      this.areaInfo[this.current]['id'] = cityInfo.id
      this.areaInfo[this.current]['code'] = cityInfo.code

      if (this.current !== 'county') {
        this.getCity({
          pid: cityInfo.id,
        })
      }

      if (this.current === 'province') {
        this.current = 'city'
        this.areaInfo.city = {
          text: '',
          id: '',
        }

        this.areaInfo.county = {
          text: '',
          id: '',
        }
      } else if (this.current === 'city') {
        this.current = 'county'
        this.areaInfo.county = {
          text: '',
          id: '',
        }
      }
    },

    // 监控popup的状态发生改变
    onPopupStatusChange(e) {
      this.current = 'province'
      this.getCity({
        pid: 0,
      })
      if (!e.show) {
        this.areaInfo = {
          province: {
            text: '',
            id: null,
            code: null
          },
          city: {
            text: '',
            id: null,
            code: null
          },
          county: {
            text: '',
            id: null,
            code: null
          },
        }
      }
    },

    // 点击确定按钮
    handleConfirmArea() {
      if (this.control) {
        if (!this.areaInfo.county.text) {
          return
        }
      }

      this.areaString =
        this.areaInfo.province.text +
        this.areaInfo.city.text +
        this.areaInfo.county.text

      console.log("来了", this.areaString);
      this.$emit('confirm', { ...this.areaInfo, area: this.areaString })
      this.$refs.popup.close()
    },
  },

  mounted() {
    this.getCity({ pid: 0 })
  },
}
</script>

<style lang="less" scoped>
@import '../../style/mixin.less';

.j-city {

  // padding-left: 0upx;
  // margin-top: 30upx;
  .active {
    color: #fa5151;
  }

  .address {
    display: flex;

    // justify-content: space-between;
    .diqu {
      height: 90upx;
      display: flex;
      align-items: center;
      font-size: 32upx;
      font-weight: bold;
      color: #000000;
    }

    .value {
      // line-height: 60upx;

      // margin-left: 0upx;
      // display: flex;
      // align-items: center;
      // width: 78%;
      // height: 90upx;
      // border-radius: 20upx;
      // background: #f1f2f6;
      // padding-left: 20upx;
      // box-sizing: border-box;
      // font-size: 30upx;
    }
  }

  .city-wrapper {
    background-color: #fff;
    height: 600upx;
    padding: 40upx;
    box-sizing: border-box;
    .flex();
    flex-direction: column;

    .header {
      width: 100%;
      .flex();
      border-bottom: 1upx solid #ccc;
      padding-bottom: 10upx;
      height: 40upx;

      .citys {
        .flex(center, flex-start);
        color: #8b8b8b;

        .item {
          width: 120upx;
          margin-right: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: all 350ms;
        }
      }

      .confirm {
        padding: 0 2upx;
        line-height: 1;
        margin: 0;
        font-size: 32upx;
        color: #fa5151;
        transition: all 350ms;

        &::after {
          border: none;
        }
      }
    }

    .body {
      flex: 1;
      width: 100%;
      // background: #fa5151;
      overflow: scroll;

      ul {
        margin: 0;
        padding: 0;

        li {
          margin: 0;
          padding: 20upx 0;
          transition: all 350ms;

          &.active {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
