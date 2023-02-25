<template>
  <view class="detail-container" v-if="detailInfo">
    <view class="bg">
      <OpContainer></OpContainer>
    </view>

    <view class="main-area">
      <BrandInfo :data="detailInfo"></BrandInfo>

      <view class="main-nav">
        <view
          class="item"
          v-for="item in navs"
          :key="item.value"
          @click="handleSwitchTab(item)"
          :class="{ active: currentNav === item.value }"
          >{{ item.label }}</view
        >
      </view>

      <CasePresentation :data="detailInfo.taoImgs"></CasePresentation>
      <ProductPresentation :data="detailInfo.images"></ProductPresentation>
      <Evaluate></Evaluate>
      <OpFooter></OpFooter>
    </view>
  </view>
</template>

<script>
import OpContainer from './cpns/OpCntainer.vue'
import BrandInfo from './cpns/BrandInfo.vue'
import CasePresentation from './cpns/CasePresentation.vue'
import ProductPresentation from './cpns/ProductPresentation.vue'
import OpFooter from './cpns/OpFooter.vue'
import Evaluate from './cpns/Evaluate.vue'
import { tempData } from '../data'

export default {
  components: {
    OpContainer,
    BrandInfo,
    CasePresentation,
    ProductPresentation,
    OpFooter,
    Evaluate,
  },
  data() {
    return {
      navs: [
        {
          label: '案例',
          value: 0,
        },
        {
          label: '设计产品',
          value: 1,
        },
        {
          label: '评价',
          value: 2,
        },
      ],
      currentNav: 0,
      tempData: Object.freeze(tempData),
      detailInfo: null,
    }
  },

  onLoad(params) {
    uni.showLoading({
      title: '加载中',
    })
    this.detailInfo = tempData.find(item => item.id == params.id)
    console.log(this.detailInfo)
    uni.hideLoading()
  },

  methods: {
    handleSwitchTab(item) {
      this.currentNav = item.value
    },
  },
}
</script>

<style lang="less" scoped>
.detail-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f5;
  padding-bottom: 130upx;

  .bg {
    position: relative;
    width: 100%;
    height: 336upx;
    background-size: cover;
    background: url(https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00624-707.jpg)
      no-repeat;

    .op-container {
      position: absolute;
    }
  }

  .main-area {
    position: relative;
    z-index: 19;
    background-color: #f6f6f5;
    padding: 20upx;
    box-sizing: border-box;

    .main-nav {
      display: flex;
      align-items: center;
      padding: 30upx 0;

      .item {
        position: relative;
        font-size: 28upx;
        color: #8f8d85;
        margin-right: 48upx;
        line-height: 64upx;

        &::after {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          content: '';
          width: 0;
          height: 8upx;
          border-radius: 100px;
          background-color: #ffc117;
          bottom: 0;
        }

        &.active {
          color: #141000;
          font-size: 34upx;
          font-weight: bold;
          &::after {
            width: 40upx;
          }
        }
      }
    }
  }
}
</style>
