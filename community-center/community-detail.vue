<template>
  <view class="community-detail">
    <TuanAppShim bg="#ffff"></TuanAppShim>
    <view class="head">
      <!-- 顶部区域 -->
      <JHeader :title="title" width="50" height="50">
        <template #ftFn>
          <view style="display: flex; align-items: center; justify-content: space-between; padding-right: 18rpx">
            <tui-icon name="gps" :size="20" color="#2b2b2b"></tui-icon>
            <TuanLocation>
              <text class="locale">
                {{ $store.getters.currentCity || '定位失败' }}
              </text>
            </TuanLocation>
          </view>
        </template>
      </JHeader>

      <!-- 轮播图 -->
      <view class="goods">
        <Carousel ref="carouselRef" :is-lazy-load="false" :list="serverUrls.length == 0 ? [serverUrl] : serverUrls" class="img" :radius="0" :height="270" :top="-40"></Carousel>
        <image src="../static/images/con-center/imagebg.png" @click="handlePrev" mode="" class="imagebg" />
        <view class="goods-name">{{ title }}</view>
        <view class="price-name">{{ isArtificial ? '优惠价' : '起步价' }}</view>
        <view v-if="!isArtificial" class="goods-price">
          <view class="logo">
            ￥
            <text>{{ startPrice || '30' }}</text>
          </view>
          /起
        </view>
        <view v-if="isArtificial" class="goods-price">
          <view class="logo">
            ￥
            <text>{{ preferentialPrice || serverPrice }}</text>
          </view>
        </view>
      </view>

      <!-- 服务名称和介绍 -->
      <view class="name-list">
        <view class="name-detail">
          <view class="name">{{ title }}</view>

          <view class="content">{{ serverIntroduction }}</view>
        </view>
        <view class="a">
          <BeeWxShare ref="beeWxShareRef" @click="handleClickShare">
            <view class="share">
              <tui-icon name="share-fill" :size="40" unit="rpx" color="#999999"></tui-icon>
              <view class="text">分享</view>
            </view>
          </BeeWxShare>
        </view>
      </view>

      <!-- 报价形式 -->
      <view v-if="isArtificial" class="type">一口价</view>
      <view v-if="!isArtificial" class="type">人工报价</view>

      <!-- 服务4级分类的一口价 -->
      <view v-if="isArtificial">
        <scroll-view scroll-x="true">
          <view ref="price-list" class="price-list">
            <Item
              v-for="item in serviceDetail"
              :key="item.id"
              :class="{ active: item.id == currentTab }"
              :server-info-name="item.serverInfoName"
              :server-price="item.serverPrice"
              :server-unit="item.serverUnit"
              :is-artificial="item.isArtificial"
              :preferential-price="item.preferentialPrice + ''"
              @choose="switchTab(item)"
            ></Item>
          </view>
        </scroll-view>
      </view>

      <!-- 服务4级分类的人工报价 -->
      <view v-if="!isArtificial" class="start-price">
        ￥
        <text>{{ startPrice || '30' }}</text>
        /起
      </view>
    </view>

    <tui-alerts
      @click="go('/pages/choose-location/choose-location')"
      style="margin: 30rpx 0"
      type="clear"
      :title="'您当前定位【' + $store.getters.currentCity + '】是否准确？'"
      desc="为了对您精准服务，请确认当前定位是否准确！点击可修改当前定位"
    ></tui-alerts>

    <!-- 服务地址自动定位和选择 -->
    <view class="add">
      <view class="add-list" @click="handleToAddress">
        <view class="left">
          <tui-icon name="gps" :size="32" unit="rpx" color="#e95d20" margin="0"></tui-icon>
          <view class="left-address">{{ addressDetail || '请添加服务地址' }}</view>
        </view>
        <view class="right">
          <tui-icon name="arrowright" :size="32" unit="rpx" color="#9a9a9a" margin="0"></tui-icon>
        </view>
      </view>
      <view class="kaitong">
        <view
          class="open"
          style="
            padding-right: 24rpx;
            text-align: right;
            font-size: 28rpx;
            color: #ff1717;
            font-weight: bold;
            background-color: #feebe9;
            clip-path: polygon(0rpx 50%, 18% 0, 100% 0, 100% 100%, 18% 100%);
          "
        >
          服务已开通
        </view>
      </view>
    </view>

    <!-- 保障 -->
    <view class="mid">
      <view class="text-list">
        <view class="ensure">保障</view>
        <view class="poster">
          <text>保修60天</text>
          <text>快速响应</text>
          <text>计价器报价</text>
        </view>

        <!-- #ifdef H5 -->
        <tui-icon :size="32" unit="rpx" color="#999999" name="arrowright" margin="0"></tui-icon>
        <!-- #endif -->
      </view>
    </view>

    <view id="norm" class="body">
      <!-- 收费标准,服务内容,用户评价 -->
      <view class="top-list">
        <view class="item" :class="{ active: currentMoveTab === 0 }" @click="toJump(0)">收费标准</view>
        <view class="item" :class="{ active: currentMoveTab === 2 }" @click="toJump(2)">用户评价</view>
        <view class="item" :class="{ active: currentMoveTab === 1 }" @click="toJump(1)">服务内容</view>
      </view>

      <!-- 收费标准 -->
      <Charge :data="serviceDetail.chargeDetailsList"></Charge>

      <!-- 收费说明 -->
      <view v-if="chargeDescription" class="explain">
        <view class="explain-title">收费说明:</view>
        <view class="explain-text">
          {{ chargeDescription || '工程师上门后，因用户个人原因取消订单，需支付30元上门费；价格信息仅供参考，具体收费以工程师上门检测和用户沟通后报价为准。' }}
        </view>
      </view>

      <!-- 用户评价 -->
      <view class="comment-list">
        <CommentList :id="serverTypeId" :comments="commentList || []"></CommentList>
      </view>

      <!-- 服务详情内容 -->
      <view v-if="serverInfo !== '<p><br></p>' && serverInfo !== '<p><br></p><p><br></p>'" id="detail" class="case-show">
        <view class="show-img">
          <UParse v-if="serverInfo" :content="goodsInfoDetail"></UParse>
        </view>
      </view>
    </view>
    <!-- 其他服务 -->
    <view class="other">
      <view v-for="item in [{ value: 1, name: '更多服务' }]" :key="item.value" class="other-service" @click="handleToServiceListHome(item)">
        <view class="text">其他服务</view>
        <tui-icon :size="40" unit="rpx" color="#999999" name="arrowright" margin="0"></tui-icon>
      </view>
    </view>

    <!-- 底部在线咨询和立即下单和预约 -->
    <view class="foot">
      <view class="list">
        <view class="online" @click="handleOpenCustomerService">
          <tui-icon :size="48" unit="rpx" color="#e95e20" name="kefu" margin="0"></tui-icon>
          <view class="name">在线咨询</view>
        </view>
        <view class="order-list">
          <!-- <view class="join">加入需求清单</view> -->
          <view class="order" :style="{ opacity: !this.serverTypeId || !this.detailId ? '0.5' : '1' }" @click="handleToServiceOrderHome">{{ isArtificial ? '立即下单' : '立即预约' }}</view>
        </view>
      </view>
    </view>

    <!-- 生成二维码 -->
    <uqrcode
      ref="uqrcode"
      class="generate-code-container"
      canvas-id="qrcode"
      :value="`${rootUrl}/#/pages/jump/jump?userId=${userId}&type=bindCommunityService&code=${serverTypeId}~${title}~${serverUrl}`"
      @complete="handleCompleteCode"
    ></uqrcode>

    <!-- 分享活动邀请码 -->
    <CommunityDetailPoster ref="communityDetailPosterRef"></CommunityDetailPoster>

    <tui-bottom-popup :show="isShowCustomerServicePopup" @close="isShowCustomerServicePopup = false">
      <ATFCustomerService shop-id="" :data="customerServiceList"></ATFCustomerService>
    </tui-bottom-popup>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { A_TF_MAIN } from '../config'
import Carousel from '../components/carousel'
import uParse from '../components/u-parse/u-parse.vue'
import CommunityDetailPoster from './components/CommunityDetailPoster.vue'
import { marked } from 'marked'
import { splitProject } from './componts/utile'
import item from '../community-center/componts/item'
import charge from '../community-center/componts/charge'
import { getServiceDetailApi, getServeCommentListApi, getIsOpenServerAreaApi } from '../api/community-center'
import { getUserId, getAdressDetailByLngLat } from '../utils'
import CommentList from './components/CommentList.vue'
import { T_SELECTED_ADDRESS } from '../constant'

/**
 * 这个页面我tm，好恶心
 * 心累啊，艹
 */

export default {
  name: 'CommunityDetail',
  components: {
    Item: item,
    Charge: charge,
    UParse: uParse,
    Carousel,
    CommunityDetailPoster,
    CommentList
  },
  props: {},
  data() {
    return {
      rootUrl: A_TF_MAIN,
      currentMoveTab: 0,
      address: '',
      serviceDetail: [],
      id: '',
      serverTypeId: '',
      serverInfoName: '',
      serverInfoUrl: '',
      serverIntroduction: '',
      isArtificial: '',
      serverPrice: '',
      title: '',
      serverImageUrl: '',
      serverUnit: '',
      currentTab: '',
      length: '',
      serverUrl: '',
      serverUrls: [],
      index: '',
      priceType: '',
      startPrice: '',
      chargeDescription: '',
      serverInfo: '',
      chargeDetailsList: [],
      serverContent: '',
      addressDetail: '',
      type: '',
      addressInfo: '',

      bindServiceId: null,
      userId: '',
      shareCode: '',
      preferentialPrice: 0,
      commentList: [],
      cardId: '',

      // 客服
      isShowCustomerServicePopup: false,
      customerServiceList: []
    }
  },

  computed: {
    goodsInfoDetail() {
      return this.serverInfo ? marked(this.serverInfo) : ''
    }
  },

  created() {},
  onLoad(options) {
    this.userId = getUserId() || ''

    this.serverTypeId = options.id * 1
    this.serverImageUrl = options.serverImageUrl
    this.title = options.serverNameThree
    this.cardId = options.cardId || ''
    this.getCommentList()
    uni.setNavigationBarTitle({
      title: this.title
    })
    // this.serverUrl = options.serverImageUrl
    this.getIsOpenServerArea()
    // #ifdef H5
    this.$nextTick(() => {
      this.handleShareServe(true)
    })
    // #endif
  },
  onShow() {
    this.getServiceDetail()
    const info = uni.getStorageSync('guawyi8sa')
    if (info.address && info.addressDetail) {
      this.addressInfo = info.address + info.addressDetail
    }
    this.addressDetail = this.addressInfo
    // console.log('addressDetail', this.addressDetail);
    this.address = info.address
    // console.log('address', this.address);
    // this.a();
  },
  methods: {
    splitProject,
    // 获取评论列表
    async getCommentList() {
      try {
        const commentList = await getServeCommentListApi({ serverTypeId: this.serverTypeId })
        this.commentList = commentList
      } catch (error) {
        console.log(error)
      }
    },
    handleToServiceListHome(item) {
      uni.navigateTo({
        url: `/community-center/service-sort/index?value=${item.value}&name=${item.name}`
      })
    },
    handleToAddress() {
      uni.navigateTo({ url: '/community-center/add-address' })
    },

    handleToServiceOrderHome() {
      // 需要传 图片 价格 名称 单位
      // uni.navigateTo({ url: "../community-center/community-order" });
      // const let var

      if (!this.serverTypeId) {
        return uni.showToast({
          title: '请选择服务类型',
          icon: 'none',
          duration: 2000
        })
      }

      if (!this.serverTypeId || !this.detailId) {
        return this.ttoast({ type: 'info', title: '数据加载中，请稍后重试' })
      }

      if (!this.isArtificial) {
        uni.navigateTo({
          url: `/community-center/community-order?name=${this.title}&id=${this.serverTypeId}&priceType=${this.isArtificial}&imgUrl=${this.serverUrl}&detailId=${this.detailId}&cardId=${this.cardId}`
        })
      } else if (!this.serverPrice == 0) {
        uni.navigateTo({
          url: `/community-center/community-order?serverInfoUrl=${this.serverInfoUrl}&serverPrice=${this.serverPrice}&serverInfoName=${this.serverInfoName}&serverUnit=${this.serverUnit}&name=${this.title}&id=${this.serverTypeId}&priceType=${this.isArtificial}&detailId=${this.detailId}&imgUrl=${this.serverUrl}&preferentialPrice=${this.preferentialPrice}&cardId=${this.cardId}`
        })
      } else {
        console.log('sb kuaixuan')
      }
    },

    toJump(index) {
      this.currentMoveTab = index
      if (this.currentMoveTab == 0) {
        document.getElementById('norm').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      } else if (this.currentMoveTab == 1) {
        document.getElementById('detail').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    },

    switchTab(item1) {
      // console.log('12345', item1)
      this.currentTab = item1.id
      this.serverTypeId = item1.serverTypeId
      this.serverPrice = item1.serverPrice
      this.serverInfoName = item1.serverInfoName
      this.serverUnit = item1.serverUnit
      this.serverIntroduction = item1.serverIntroduction
      this.detailId = item1.id
      this.preferentialPrice = item1.preferentialPrice
      // console.log('详情id', this.detailId)
    },

    // 社区服务详情
    async getServiceDetail() {
      try {
        uni.showLoading({
          title: '数据加载中...'
        })
        // this.serverTypeId=this.serviceDetail.serverTypeId;
        const res = await getServiceDetailApi({
          // serverTypeId: 109,
          serverTypeId: this.serverTypeId
        })

        // console.log(this.$store.getters);
        const dzAttribute = await this.$store.dispatch('community/getMyAttribute', this.$store.getters.detailAddress)
        if (dzAttribute && Array.isArray(dzAttribute) && dzAttribute.length) {
          res.data.forEach((origin) => {
            dzAttribute.forEach((attr) => {
              if (attr.correspondServerInfoId === origin.id) {
                origin.serverInfoName = attr.serverInfoName
                origin.serverPrice = attr.serverPrice
                origin.serverUnit = attr.serverUnit
                origin.preferentialPrice = attr.preferentialPrice
              }
            })
          })
        }
        this.serviceDetail = res.data
        this.serviceDetail.chargeDetailsList = splitProject(res.data[0].chargeDetailsList)
        // console.log('chargeDetailsList', this.serviceDetail.chargeDetailsList);
        this.currentTab = res.data[0].id
        this.switchTab(this.serviceDetail[0])
        // console.log('666', this.serviceDetail)

        this.serverInfo = this.serviceDetail[0].serverInfo
        // console.log('服务详情内容', this.serverInfo)

        this.isArtificial = this.serviceDetail[0].isArtificial
        this.length = this.serviceDetail.length
        // console.log('是否一口价', this.isArtificial)
        // const type = this.isArtificial
        // console.log('type', type)
        // if (type === 'true') {
        // 	this.a = 1
        // } else {
        // 	this.a = 2
        // }

        this.serverIntroduction = this.serviceDetail[0].serverIntroduction
        // console.log('介绍', this.serverIntroduction)

        this.serverUrl = this.serviceDetail[0].serverImageUrl.split(',').find((item) => item)
        // console.log('图片', this.serverUrl)

        this.serverUrls = this.serviceDetail[0].serverImageUrl.split(',').slice(1)
        // console.log('轮播图', this.serverUrls)

        this.startPrice = this.serviceDetail[0].startPrice
        // console.log('起步价', this.startPrice);

        this.chargeDescription = this.serviceDetail[0].chargeDescription
        // console.log('收费说明', this.chargeDescription);

        this.serverContent = this.serviceDetail[0].serverContent.split('，')
        // console.log('服务具体内容', this.serverContent);
      } finally {
        uni.hideLoading()
      }

      // this.serverInfo = this.serviceDetail[0].serverInfo
      // console.log('服务详情', this.serverInfo);

      // this.chargeDetailsList = this.serviceDetail[0].chargeDetailsList
      // console.log('项目数据', this.chargeDetailsList);
    },

    async getIsOpenServerArea() {
      // #ifdef APP
      const lastAddress = uni.getStorageSync(T_SELECTED_ADDRESS) || { data: {} }
      const currentAddress = (lastAddress.data.province || '') + (lastAddress.data.city || '') + (lastAddress.data.district || '')
      this.address = currentAddress
      // this.a()
      this.addressDetail = lastAddress.data.detailAddress || ''
      // #endif
      // #ifndef APP
      await this.$store.dispatch('location/getCurrentLocation', (data) => {
        this.address = data.province + data.city + data.district
        this.a()
        this.addressDetail = data.detailAddress
      })
      // #endif
    },

    async a() {
      const res = await getIsOpenServerAreaApi({
        address: this.address
      })
      this.tips = res.data
      this.type = this.tips ? 1 : 2
    },

    // 预览图
    handlePrev() {
      this.$refs.carouselRef.prev()
    },

    previewImage(index) {
      // console.log(index)
      const imgsArray = []
      imgsArray[0] = index

      uni.previewImage({
        urls: imgsArray,
        current: 0
      })
    },

    // 点击分享
    async handleClickShare() {
      await this.handleShareServe()
      this.handleShare()
    },

    // 微信分享
    async handleShareServe(isQuit) {
      const _this = this
      let desc
      if (_this.serverTypeId === 313) {
        desc = '想要空调风大省电制冷效果好，空调清洗少不了。现在清洗空调，最低只需58元/台。每户同时清洗3台空调以上，免费赠送价值336元床垫清洗除螨一张。'
      } else {
        desc = '售后质保·服务专业·极速退款·意外承包'
      }
      const data = {
        data: {
          title: _this.title,
          desc,
          link: `${A_TF_MAIN}/#/pages/jump/jump?userId=${_this.userId}&type=bindCommunityService&code=${_this.serverTypeId}~${_this.title}~${_this.serverUrl}`,
          imageUrl: _this.serverUrl
        },
        successCb: () => {},
        failCb: () => {}
      }
      await this.$refs.beeWxShareRef.share(data, isQuit)
    },

    // 点击分享
    handleShare() {
      uni.showLoading({
        title: '活动邀请码生成中...'
      })
      const _this = this
      let topDesc
      let downDesc
      if (_this.serverTypeId === 313) {
        topDesc = `想要空调风大省电制冷效果好，空调清洗少不了。现在清洗空调，最低只需58元/台。每户同时清洗3台空调以上，免费赠送价值336元床垫清洗除螨一张。`
        downDesc = `把优惠推荐给亲朋好友，下单清洗空调每满3台，免费赠送价值336元床垫清洗除螨一张或沙发清洗一个位的兑换券一张，可直接下单兑换。`
      } else {
        topDesc = '售后质保·服务专业·极速退款·意外承包'
        downDesc = `-----------`
      }
      this.$refs.uqrcode.make({
        success: () => {
          uni.hideLoading()
          _this.$refs.communityDetailPosterRef.show({
            shareCode: this.shareCode,
            logo: this.serverUrl || this.serverImageUrl,
            headerTitle: `${this.title}`,
            topDesc,
            downDesc
          })
        }
      })
    },

    // 完成
    handleCompleteCode(e) {
      const _this = this
      if (e.success) {
        this.$refs.uqrcode.toTempFilePath({
          success: (res) => {
            if (!_this.shareCode) {
              _this.shareCode = res.tempFilePath
            }
          }
        })
      }
    },

    // 打开客服
    async handleOpenCustomerService() {
      const res = await this.$store.dispatch('app/getCustomerServiceAction', {
        shopId: ''
      })
      this.customerServiceList = res.data.filter((item) => item.name === '社区服务')
      if (!this.customerServiceList.length) this.$showToast('暂无客服')
      else this.isShowCustomerServicePopup = true
    }
  }
}
</script>

<style lang="less" scoped>
.community-detail {
  background: #f7f8fa;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 20rpx;
	}

  /deep/ .tui-popup-class.tui-bottom-popup {
    height: 85vh !important;
  }

  .head {
    background: #ffffff;
    // padding-right: 20rpx;
    box-sizing: border-box;

    .goods {
      // margin: 0rpx 82rpx;
      width: 100%;
      height: 640rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .img {
        width: 100%;
        // height: 340rpx;
        position: absolute;
        z-index: 0;

        /deep/.tui-lazyload__box {
          background-color: #ffffff !important;
        }
      }

      .imagebg {
        width: 100%;
        height: 100%;
      }

      .goods-name {
        white-space: nowrap;
        position: absolute;
        bottom: 28rpx;
        left: 68rpx;
        font-size: 42rpx;
        font-weight: bold;
        color: #ffffff;
        width: 380rpx;
        height: 94rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .price-name {
        position: absolute;
        bottom: 112rpx;
        right: 74rpx;
        font-size: 28rpx;
        font-weight: bold;
        color: #0519d4;
        width: 150rpx;
        height: 40rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .goods-price {
        position: absolute;
        display: flex;
        align-items: baseline;
        justify-content: center;
        white-space: nowrap;
        color: #ffffff;
        font-size: 24rpx;
        font-weight: bold;
        right: 80rpx;
        bottom: 20rpx;
        width: 150rpx;
        height: 84rpx;

        .logo {
          font-size: 42rpx;
        }

        text {
          font-size: 52rpx;
        }
      }
    }

    .range {
      font-size: 46rpx;
      font-weight: bold;
      line-height: 70rpx;
      color: #fc4023;
      padding: 18rpx 0 0 24rpx;
      border-top: 2rpx solid #f1f1f0;
    }

    .name-list {
      display: flex;
      justify-content: space-between;
      padding-left: 30rpx;
      padding-top: 30rpx;

      .name-detail {
        .name {
          font-size: 32rpx;
          font-weight: bold;
          color: #141000;
        }

        .content {
          padding-top: 12rpx;
          font-size: 28rpx;
          line-height: 36rpx;
          color: #8f8d85;
        }
      }

      .a {
        width: 120rpx;
        height: 80rpx;
        display: flex;
        align-items: flex-end;

        .share {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100rpx 0rpx 0rpx 100rpx;
          background: #f7f8fa;
          width: 120rpx;
          height: 50rpx;

          .image {
            width: 40rpx;
            height: 40rpx;
          }

          .text {
            font-size: 28rpx;
            color: #3d3d3d;
          }
        }
      }
    }

    .type {
      margin-left: 30rpx;
      padding-bottom: 20rpx;
      padding-top: 10rpx;
      font-size: 28rpx;
      font-weight: bold;
      color: #3d3d3d;
      border-bottom: 1px solid #f1f1f0;
    }

    .price-list {
      padding-top: 30rpx;
      padding-left: 30rpx;
      padding-right: 30rpx;
      padding-bottom: 30rpx;
      white-space: nowrap;
      display: flex;
      // flex-wrap: wrap;
      // .item {
      //   margin-right: 10rpx;
      //   margin-bottom: 40rpx;
      //   width: 210rpx;
      //   height: 70rpx;
      //   border-radius: 10rpx;
      //   border: 2rpx solid #999999;
      //   &.active {
      //     background: #fa5151;
      //     color: #fa5151;
      //   }

      //   .m {
      //     padding-left: 6rpx;
      //     width: 210rpx;
      //     height: 70rpx;
      //     display: flex;
      //     flex-direction: column;
      //     justify-content: center;
      //     .first {
      //       font-size: 28rpx;
      //       font-weight: 400;
      //       color: #999999;
      //     }
      //     .second {
      //       // margin-top: 4rpx;
      //       .row {
      //         display: flex;
      //         align-items: center;
      //         .specs {
      //           font-size: 24rpx;
      //           font-weight: 400;
      //           color: #999999;
      //         }
      //         .number {
      //           font-size: 28rpx;
      //           font-weight: 400;
      //           color: #999999;
      //         }
      //         .money {
      //           font-size: 24rpx;
      //           font-weight: 400;
      //           color: #999999;
      //         }
      //         .unit {
      //           font-size: 24rpx;
      //           font-weight: 400;
      //           color: #999999;
      //         }
      //         .qi {
      //           font-size: 24rpx;
      //           font-weight: 400;
      //           color: #999999;
      //         }
      //       }
      //     }
      //   }
      // }
    }

    .start-price {
      margin-left: 30rpx;
      padding-top: 16rpx;
      padding-bottom: 30rpx;
      color: #fc4023;
      font-size: 30rpx;
      font-weight: 500;

      text {
        font-size: 60rpx;
        font-weight: bold;
      }
    }
  }

  .add {
    background: #ffffff;
    // height: 104rpx;
    margin-top: 10rpx;
    display: flex;
    flex-direction: column;
    padding: 26rpx 0rpx 20rpx 0rpx;

    .add-list {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 0rpx 20rpx 0rpx 36rpx;

      .left {
        display: flex;

        .left-logo {
          width: 32rpx;
          height: 32rpx;
        }

        .left-address {
          width: 450rpx;
          font-size: 28rpx;
          font-weight: 500;
          color: #3d3d3d;
          padding-left: 10rpx;
        }
      }

      .right {
        .jump {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }

    .kaitong {
      display: flex;
      justify-content: flex-end;
      padding-top: 10rpx;

      .open {
        width: 200rpx;
        height: 48rpx;
        line-height: 48rpx;
      }

      .close {
        width: 200rpx;
        height: 48rpx;
        line-height: 48rpx;
      }
    }
  }

  .mid {
    display: flex;
    align-items: center;
    height: 104rpx;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    background: #ffffff;

    .text-list {
      display: flex;
      flex: 1;
      align-items: center;
      // justify-content: space-between;
      padding: 0rpx 20rpx 0rpx 30rpx;

      .ensure {
        font-size: 28rpx;
        font-weight: bold;
        color: #3d3d3d;
      }

      .poster {
        font-size: 24rpx;
        color: #3d3d3d;
        flex: 1;
        padding-left: 30rpx;
        display: flex;
        gap: 0rpx 40rpx;
      }

      .more {
        width: 32rpx;
        height: 32rpx;
      }
    }
  }

  .body {
    background: #ffffff;

    .top {
      .top-img {
        // width: 752rpx;
        // height: 760rpx;
        width: 100%;
      }
    }

    .top-list {
      padding: 30rpx 80rpx 0 80rpx;
      display: flex;
      justify-content: space-between;

      .item {
        font-size: 32rpx;
        color: #b3b2ad;
        position: relative;

        &.active {
          font-size: 32rpx;
          font-weight: bold;
          color: #e95d20;

          &::after {
            width: 56rpx;
          }
        }

        &::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -12rpx;
          width: 0;
          height: 4rpx;
          border-radius: 10rpx;
          background-color: #e95d20;
          transition: all 350ms ease-in;
        }
      }
    }

    .explain {
      padding: 0rpx 30rpx 40rpx 30rpx;

      .explain-title {
        font-size: 28rpx;
        font-weight: bold;
      }

      .explain-text {
        font-size: 28rpx;
        color: #8f8d85;
        padding-top: 10rpx;
      }
    }

    .background {
      position: relative;
      width: 100%;

      .bg {
        width: 100%;
        height: 850rpx;
      }

      .bg-logo {
        width: 360rpx;
        height: 70rpx;
        position: absolute;
        top: 60rpx;
        left: 44rpx;
      }

      .bg-text {
        width: 100%;
        position: absolute;
        top: 174rpx;
        left: 0rpx;
        font-size: 64rpx;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        white-space: nowrap;
      }

      .bg-image {
        display: flex;
        // justify-content: center;
        position: absolute;
        top: 400rpx;
        left: 0;
        width: 100%;

        .bg-img {
          width: 516rpx;
          height: 258rpx;
        }
      }

      .girl-img {
        width: 450rpx;
        height: 492rpx;
        position: absolute;
        top: 348rpx;
        right: 0;
      }
    }

    .mid-content {
      padding-top: 40rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 144rpx;
      font-size: 48rpx;
      font-weight: bold;
      color: #e95d20;
      white-space: nowrap;

      .mid-text {
      }

      text {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -14rpx;
          width: 160rpx;
          height: 4rpx;
          border-radius: 10rpx;
          background-color: #e95d20;
          transition: all 350ms ease-in;
        }
      }
    }

    .serverContent-list {
      padding: 88rpx 56rpx 0rpx 56rpx;
      gap: 20rpx 0rpx;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .serverContent {
        width: 200rpx;
        height: 140rpx;
        border-radius: 20rpx;
        background: #fff6ef;
        border: 2rpx solid #e95d20;
        font-size: 36rpx;
        font-weight: bold;
        color: #e95d20;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .middle {
      width: 100%;
      height: 1928rpx;

      .mid-img {
        width: 100%;
        height: 1928rpx;
      }
    }

    .process {
      width: 100%;
      height: 480rpx;

      .process-img {
        width: 100%;
        height: 480rpx;
      }
    }

    .tips {
      .img-tips {
        width: 100%;
      }
    }

    .case-show {
      // padding: 40rpx 0;

      .text {
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 74rpx;

        .text1 {
          font-size: 48rpx;
          font-weight: bold;
          color: #3d3d3d;
        }

        .text2 {
          font-size: 48rpx;
          font-weight: bold;
          color: #ea6f3a;
        }
      }

      .show-img {
        // padding: 40rpx 0rpx 54rpx 0rpx;

        .img1 {
          width: 100%;
          height: 810rpx;
        }

        .img2 {
          width: 100%;
          height: 514rpx;
        }

        .img3 {
          width: 100%;
          height: 344rpx;
        }
      }
    }
  }

  .other {
    // margin-top: 20rpx;
    background: #ffffff;
    width: 100%;
    height: 280rpx;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .other-service {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10rpx;
      width: 200rpx;

      .text {
        font-size: 32rpx;
        color: #3d3d3d;
      }

      .show {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }

  .foot {
    background: #ffffff;
    padding: 30rpx 30rpx 30rpx 30rpx;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    border-top: 8rpx solid #f7f8fa;
    z-index: 100;

    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 82rpx;

      .online {
        width: 96rpx;
        height: 82rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .seek {
          width: 48rpx;
          height: 48rpx;
        }

        .name {
          font-size: 24rpx;
          white-space: nowrap;
        }
      }

      .order-list {
        display: flex;
        justify-content: flex-end;
        width: 75%;

        .join {
          font-size: 32rpx;
          width: 270rpx;
          height: 80rpx;
          border-radius: 100rpx;
          border: 2rpx solid #999999;
          color: #999999;
          text-align: center;
          line-height: 78rpx;
        }

        .order {
          font-size: 32rpx;
          color: #ffffff;
          width: 220rpx;
          height: 80rpx;
          border-radius: 100rpx;
          background: linear-gradient(270deg, #e95d20 0%, #ff8f1f 100%);
          text-align: center;
          line-height: 78rpx;

          &.disabled {
            opacity: 0.6;
          }
        }
      }
    }
  }

  .generate-code-container {
    position: absolute;
    top: -10000rpx;
  }
}
</style>
