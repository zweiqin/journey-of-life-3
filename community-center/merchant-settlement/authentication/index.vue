<template>
  <view class="authenticationPage">
      <swiper class="swiper" :current="0" :indicator-dots="false" :autoplay="false" :disable-touch="true">
        <swiper-item>
          <Personal></Personal>
        </swiper-item>
        <swiper-item>
          <Service></Service>
        </swiper-item>
      </swiper>
  </view>
</template>

<script>
import Personal from "./childrenPage/Personal.vue"
import Service from "./childrenPage/Service.vue"
export default {
  name: 'SbXuRuiLi_And_ZhonWeiQing',
  components: {
    Personal,
    Service
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  width: 100vw;
  height: 100vh;
  /* overflow: hidden; */
  overflow-y: auto;
}
</style>