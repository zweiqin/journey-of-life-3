<template>
  <div class="notice-list" :class="'terminal'+terminal" :style="{backgroundColor:componentContent.bgColor}">
    <swiper class="swiper-wrapper" :circular="true" :indicator-dots="false" :autoplay="true" :vertical="true">
      <swiper-item class="swiper-slide" v-for="(item,index) in noticesList" :key="index">
        <div class="a-link" @click="jumpNoticeDetail(item)" :style="{color:componentContent.titColor}"><span>{{item.noticeTitle}}</span></div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import api from '../config/api'
import { funMixin } from '../config/mixin'
import { directive, Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: "noticeComponent",
  mixins: [funMixin],
  data () {
    return {
      noticesList: [],
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
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const _ = this
      let _url = `${api.getNotices}`
      const params = {
        method: 'GET',
        url: _url,
      }
      this.sendReq(params, (res) => {
        _.noticesList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.notice-list{
  height: 60upx;
  line-height: 60upx;
  overflow: hidden;
  .a-link{
    // display: block;
    cursor: pointer;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin: 0 20upx;
    span{
      display: inline-block;
      padding-left: 50upx;
      font-size: 24upx;
      background: url("../static/images/notice/ico_notice2.png") no-repeat left center;
      background-size: 30upx 30upx;
    }
  }
  &.terminal4{
    height: 50upx;
    line-height: 50upx;
    padding: 0;
    .swiper-container{
      height: 100%;
      width: 1200upx;
      max-width: 100%;
      margin: 0 auto;
    }
    .a-link{
      cursor: pointer;
      display: block;
      text-align: left;
      margin: 0 20upx;
      span{
        display: block;
        padding-left: 25upx;
        font-size: 14upx;
        background: url("../static/images/notice/ico_notice.png") no-repeat left center;
      }
    }
  }
}
</style>
