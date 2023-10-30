<template>
  <div class="shop"  :class="'terminal' + terminal">
    <swiper class="swiper" :indicator-dots="false" :autoplay="true" @change="swiperChange">
      <swiper-item class="shop-item" v-for="(item,index) in imgList" :key="index">
        <div class="shop-item-warp">
          <img class="img" :src="item.img" mode="widthFix">
          <div class="a-link" @click="jumpLink(item.linkObj)">
            进店逛逛<i class="iconfont icon-arrow-right"></i>
          </div>
        </div>
      </swiper-item>
    </swiper>
    <view class="swiper-dots" v-if="imgList && imgList.length">
      <text class="dot" :class="index === swiperCurrent  && 'dot-active'" v-for="(dot, index) in imgList.length"
            :key="index"></text>
    </view>
  </div>
</template>

<script>
// import { directive, Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
import {funMixin} from '../config/mixin'
export default {
  name: 'shop',
  mixins: [funMixin],
  data () {
    return {
      swiperCurrent: 0,
    }
  },
  methods:{
    swiperChange(e) {
      this.swiperCurrent = e.detail.current;
    }
  },
  props: {
    terminal: {
      type: Number,
      default: 4
    },
    componentContent: {
      type: Object
    }
  },
  // components: {
  //   Swiper,
  //   SwiperSlide
  // },
  // directives: {
  //   swiper: directive
  // },
  computed: {
    imgList: function () {
      return this.componentContent.imgTextData.filter(function (item) {
        return item.img
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shop{
  position: relative;
  .swiper{
    height: 460upx;
  }
  &-item{
    &-warp{
      position: relative;
      padding: 0 20upx;
      .img{
        width: 100%;
        height: 420upx;
      }
      .a-link{
        width: 220upx;
        height: 80upx;
        line-height: 80upx;
        background: linear-gradient(225deg, #585858 0%, #333333 100%);
        box-shadow: 0px 20upx 40upx rgba(0, 0, 0, 0.3);
        display: block;
        color: #fff;
        font-size: 28upx;
        text-align: center;
        position: absolute;
        right: 0;
        bottom: 30upx;
        .icon{
          margin-left: 20upx;
        }
      }
    }
  }
  //.pagination{
  //  display: flex;
  //  justify-content: center;
  //  padding:20upx 0;
  //  ::v-deep .swiper-pagination-bullet{
  //    width: 12upx;
  //    height: 12upx;
  //    background: #333333;
  //    border-radius: 50%;
  //    opacity: 0.2;
  //    margin: 0 10upx;
  //  }
  //  ::v-deep .swiper-pagination-bullet-active{
  //    width: 24upx;
  //    height: 12upx;
  //    background: #333333;
  //    opacity: 1;
  //    border-radius: 8upx;
  //  }
  //}
  //::v-deep .uni-swiper-dots{
  //  display: flex;
  //  justify-content: center;
  //  padding: 0upx 0;
  //  .uni-swiper-dot{
  //    width: 10upx;
  //    height: 10upx;
  //    background: #333333;
  //    opacity: 0.3;
  //    border-radius: 5upx;
  //    margin: 0 5upx;
  //    &-active{
  //      width: 20upx;
  //      height: 10upx;
  //      opacity: 1;
  //    }
  //  }
  //}
  .swiper-dots {
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 15rpx;
    z-index: 66;
    .dot {
      width: 10upx;
      height: 10upx;
      background: #333333;
      opacity: 0.3;
      border-radius: 5upx;
      margin: 0 10upx;
    }

    .dot-active {
      width: 20upx;
      opacity: 1;
    }
  }
}
</style>
