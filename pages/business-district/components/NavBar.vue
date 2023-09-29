<template>
  <view class="nav-bar-container">
    <swiper @change="handleSwiperChange" indicator-dots :style="{ height: swiperHeight }">
      <!-- <swiper @change="handleSwiperChange" indicator-dots style="height: 360upx;"> -->
      <swiper-item class="nav-item">
        <view class="item">
          <view class="menu-item" @click="$emit('view', item)" v-for="item in navbarOne" :key="item.name">
            <image class="menu-icon" :src="item.icon"></image>
            <text>{{ item.name }}</text>
            <img v-if="item.tag && item.tag === 'phone-bill'" class="phone-bil" :src="item.tagUrl" alt="">
            <img v-if="item.tag && item.tag === 'fix'" class="fix" :src="item.tagUrl" alt="">
          </view>
        </view>

        <view class="item item-next">
          <view @click="$emit('view', item)" class="menu-item" v-for="item in navbarTwo" :key="item.name">
            <image class="menu-icon" :src="item.icon"></image>
            <text>{{ item.name }}</text>
            <img v-if="item.tag && item.tag === 'sheng'" class="sheng" :src="item.tagUrl" alt="">
          </view>
        </view>
      </swiper-item>
      <swiper-item class="nav-item">
        <view class="item">
          <view @click="$emit('view', item)" class="menu-item" v-for="item in navbarOne" :key="item.name">
            <image class="menu-icon" :src="item.icon"></image>
            <text>{{ item.name }}</text>
            <img v-if="item.tag && item.tag === 'phone-bill'" class="phone-bil" :src="item.tagUrl" alt="">
            <img v-if="item.tag && item.tag === 'fix'" class="fix" :src="item.tagUrl" alt="">
          </view>
        </view>

        <view class="item item-next">
          <view @click="$emit('view', item)" class="menu-item" v-for="item in navbarTwo" :key="item.name">
            <image class="menu-icon" :src="item.icon"></image>
            <text>{{ item.name }}</text>
            <img v-if="item.tag && item.tag === 'sheng'" class="sheng" :src="item.tagUrl" alt="">
          </view>
        </view>

        <view class="item item-next">
          <view @click="$emit('view', item)" class="menu-item" v-for="item in navbarThree" :key="item.name">
            <image class="menu-icon" :src="item.icon"></image>
            <text>{{ item.name }}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { navbarOne, navbarTwo, navbarThree } from '../config'
export default {
  data() {
    return {
      navbarOne: Object.freeze(navbarOne),
      navbarTwo: Object.freeze(navbarTwo),
      navbarThree: Object.freeze(navbarThree),
      swiperHeight: '360upx'
    }
  },

  methods: {
    handleSwiperChange(e) {
      this.swiperHeight = e.detail.current === 1 ? '512upx' : "360upx"
    }
  },
}
</script>

<style lang="less" scoped>
/deep/ .uni-swiper-dot-active,
/deep/.uni-swiper-dot {
  width: 14upx;
  border-radius: 100px;
  height: 6upx;
  transition: all 350ms;
}

/deep/ .uni-swiper-dot-active {
  width: 47upx;
  background-color: #EF5511;
}

.nav-bar-container {
  width: 100%;
  background-color: #fff;
  margin: 24upx 0;
  border-radius: 20upx;

  .nav-item {
    padding: 15upx 27upx;
    box-sizing: border-box;

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &.item-next {
        margin-top: 20upx;
      }


      .menu-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 28upx;
        color: #222229;

        .menu-icon {
          width: 80upx;
          height: 80upx;
          margin-bottom: 15upx;
        }

        .phone-bil {
          position: absolute;
          width: 80upx;
          height: 28upx;
          top: -4upx;
          right: -46upx;
        }

        .fix {
          position: absolute;
          width: 38upx;
          height: 38upx;
          top: -14upx;
          right: -14upx;
        }

        .sheng {
          position: absolute;
          width: 42upx;
          height: 42upx;
          top: -14upx;
          right: -14upx;
        }
      }
    }
  }
}
</style>