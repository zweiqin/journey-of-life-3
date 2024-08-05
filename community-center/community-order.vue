<template>
  <view class="community-order-container">
    <TuanAppShim bg="#ffff"></TuanAppShim>
    <!-- 返回键 -->
    <view class="head">
      <tui-icon name="arrowleft" :size="42" unit="rpx" color="#000000" margin="0" @click="handleBack"></tui-icon>
    </view>

    <!-- 上门地址 -->
    <view class="choose-address-wrapper section animate" @click="go('/user/site/site-manage?appoint=true')">
      <view class="address-container" v-if="defualtAddress">
        <view class="address-1">{{ defualtAddress.detailedAddress.split(' ')[0] }}</view>
        <view class="address-2">{{ defualtAddress.detailedAddress.split(' ')[1] }}</view>
        <view class="user-info">
          <text class="user-name">{{ defualtAddress.name }}</text>
          <text class="user-mobile">{{ defualtAddress.mobile.slice(0, 3) + '****' + defualtAddress.mobile.slice(7) }}</text>
        </view>
      </view>

      <view v-else class="section-title">请添加上门地址</view>

      <view class="address-icon" style="display: flex; justify-content: center; align-items: center; border: 2rpx solid #605d52">
        <tui-icon name="gps" :size="42" unit="rpx" color="#605d52" margin="0"></tui-icon>
      </view>
    </view>

    <!-- <view v-if="!isExistCommunityStore" class="alert-wrapper section" style="padding: 0">
      <tui-alerts type="warn" title="您所在区域不在接单范围内"></tui-alerts>
    </view> -->

    <!-- 计价类型 -->
    <!-- <view class="serve-info section" v-if="isShowPriceMode === 1">
      <view class="title-wrapper">
        <view class="section-title">计价类型</view>
        <view class="radio-group">
          <view class="radio-item" @click="handleSwitchPricingType(item)" v-for="(item, index) in radioItems" :key="index">
            <tui-icon :size="18" :color="isByItNow == item.value ? '#ff7d27' : '#ccc'" :name="isByItNow == item.value ? 'circle-fill' : 'circle'"></tui-icon>
            <view class="label">{{ item.name }}</view>
          </view>
        </view>
      </view>
    </view> -->

    <!-- 服务项目 -->
    <view class="serve-info section">
      <view class="title-wrapper">
        <view class="section-title">服务类型</view>
        <view class="serve-name">
          {{ currentServeInfo.name }}
          <text class="serve-price" v-if="currentServeInfo.serverPrice && isByItNow === 1">
            <text
              :class="{
                del: !!calcServePrice && calcServePrice.newPrice
              }"
              class="price-text"
            >
              ￥{{ (calcServePrice && calcServePrice.oldPrice) || currentServeInfo.serverPrice }}
            </text>

            <text v-if="calcServePrice && calcServePrice.newPrice && calcServePrice.newPrice != 0" class="price-text">￥{{ (calcServePrice && calcServePrice.newPrice) || preferentialPrice }}</text>
            /{{ currentServeInfo.serverUnit }}
          </text>
        </view>
      </view>

      <view class="car-info">
        <image class="serve-img" :src="currentServeInfo.imgUrl"></image>
        <view class="number-control">
          <view @click="handleChangeServeNumber(-1)" class="item mult" :class="{ disabled: orderForm.quantity == 1 }">-</view>
          <view class="number item">{{ orderForm.quantity }}</view>

          <view @click="handleChangeServeNumber(1)" class="item add">+</view>
        </view>
      </view>
    </view>

    <!-- 期望上门时间 -->
    <view class="serve-time section animate" @click="chooseTimeVisible = true">
      <view class="header-wrapper">
        <view class="section-title">请选择期望上门时间</view>
        <view class="address-icon" style="display: flex; justify-content: center; align-items: center; border: 2rpx solid #605d52">
          <tui-icon name="clock" :size="42" unit="rpx" color="#605d52" margin="0"></tui-icon>
        </view>
      </view>

      <view class="choose-time">{{ orderForm.datetimerange }}</view>
    </view>

    <view v-if="communityList.length" class="serve-time section animate" @click="$refs.chooseCommunityRef && $refs.chooseCommunityRef.open(communityList)">
      <view class="header-wrapper">
        <view class="section-title" style="font-size: 28rpx">所属小区</view>
        <view class="address-icon" style="display: flex; justify-content: center; align-items: center; border: 2rpx solid #605d52">
          <tui-icon name="home-fill" :size="42" unit="rpx" color="#605d52" margin="0"></tui-icon>
        </view>
      </view>

      <view class="choose-time" v-if="chooseCommunityDetail">{{ chooseCommunityDetail.communityName }}</view>
    </view>

    <!-- 维修商品 -->
    <view class="serve-user-goods-info section">
      <view class="section-title">图片（选填）</view>
      <view class="image-list">
        <view class="add-img-icon item" v-for="item in orderForm.orderGoodsList" :key="item">
          <tui-icon v-show="!chooseTimeVisible" @click="handleDeleteImg(item)" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
          <image class="goods-img" mode="aspectFit" :src="item"></image>
        </view>

        <view class="add-img-icon item" @click="handleUploadImg">
          <view class="add-icon">
            <tui-icon name="add" :size="64" unit="rpx" color="#b3b2ad" margin="0"></tui-icon>
          </view>
        </view>
      </view>

      <view class="section-title">视频（选填）</view>
      <view class="image-list">
        <view class="add-img-icon item video-item" v-for="(item, index) in orderForm.videoList" :key="item">
          <tui-icon v-show="!chooseTimeVisible" @click="handleDeleteVideo(item)" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
          <video
            autoplay
            muted
            @fullscreenchange="handleFullscreenchange"
            @click="requestVideoScreen(index)"
            :id="'video_' + index"
            ref="videoListRef"
            :controls="isShowVideoControl"
            class="goods-img"
            mode="aspectFit"
            :src="item"
          ></video>
        </view>

        <view class="add-img-icon item" @click="handleUploadVideo">
          <view class="add-icon">
            <tui-icon name="add" :size="64" unit="rpx" background="#fff" color="#b3b2ad" margin="0"></tui-icon>
          </view>
        </view>
      </view>

      <view class="section-title">需求说明（选填）</view>

      <tui-textarea
        isCounter
        padding="20rpx"
        :size="28"
        radius="20"
        :borderTop="false"
        :borderBottom="false"
        backgroundColor="#F1F1F0"
        v-model.trim="orderForm.remarks"
        minHeight="247rpx"
        placeholder="请填写尺寸、体积、重量等信息,方便师傅带齐工具,并为您准确提供准确的报价(您上传的照片非常重要哦~)"
      ></tui-textarea>
    </view>

    <!-- 订单费用 -->
    <view class="section order-price" v-if="isByItNow === 1 && calcServePrice">
      <view class="section-title">订单费用</view>

      <view class="cost-order-list">
        <view class="cost-item">
          <view class="cost-title">订单总额</view>
          <view class="cost-value">￥{{ calcServePrice.sumPrice }}</view>
        </view>

        <!-- <view class="cost-item">
          <view class="cost-title">服务基本原价</view>
          <view class="cost-value">￥{{ calcServePrice.oldPrice }}</view>
        </view>

        <view class="cost-item">
          <view class="cost-title">服务基本优惠价</view>
          <view class="cost-value">￥{{ calcServePrice.newPrice }}</view>
        </view> -->

        <view class="cost-item">
          <view class="cost-title">优惠劵</view>
          <view class="cost-value none">暂无</view>
        </view>

        <!-- <view class="cost-item">
          <view class="cost-title">优惠金额</view>
          <view class="cost-value none">{{
            calcServePrice.discountsPrice
          }}</view>
        </view> -->

        <view class="cost-item">
          <view class="cost-title">优惠价</view>
          <view class="cost-value none">{{ calcServePrice.preferentialPrice }}</view>
        </view>

        <view class="cost-item">
          <view class="cost-title">应付</view>
          <view class="cost-value" style="color: #e95d20">￥{{ calcServePrice.oughtPrice }}</view>
        </view>
      </view>
    </view>

    <!-- 确认按钮 -->
    <view class="btn-wrapper">
      <view class="pay-price" v-if="isByItNow === 1 && calcServePrice">￥{{ calcServePrice.oughtPrice }}</view>
      <button :loading="isSubmitOrder" class="uni-btn" @click="handleConfirmOrder">
        {{ isOffer ? '获取价格中...' : '确认' }}
      </button>
    </view>

    <tui-popup
      :duration="500"
      :mode-class="['fade-in']"
      :styles="{ width: '100%', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '50rpx 28rpx 0', boxSizing: 'border-box' }"
      :show="showAuthPopupVisible"
      @click="showAuthPopupVisible = false"
    >
      <view style="display: flex; align-items: center; padding: 26upx; background-color: #ffffff; border-radius: 20upx">
        <tui-icon name="pic-fill" :size="60" unit="rpx" color="#e95d20" margin="0 20rpx 0 0"></tui-icon>
        <view style="flex: 1">
          <view>相机权限和相册权限使用说明：</view>
          <view style="margin-top: 12rpx">"{{ APPLY_NAME }}"想访问您的相机和相册，将根据你的上传的图片，用于上传需要清洗、维修、安装相关的物品图片等场景</view>
        </view>
      </view>
    </tui-popup>

    <ChooseTime @choose="onChooseTime" v-model="chooseTimeVisible"></ChooseTime>
    <tui-toast ref="toast"></tui-toast>
    <ChooseCommunity @confirm="handleChooseCommunity" ref="chooseCommunityRef"></ChooseCommunity>
    <!-- 预览视频 -->
    <TuanVideoPreview ref="tuanVideoPreviewRef"></TuanVideoPreview>
    <!-- 显示进度条 -->
    <TuanProgress :progress="videUploadProgress" :show="videUploadProgress !== 0 && videUploadProgress !== 100"></TuanProgress>
  </view>
</template>

<script>
import { getUserId } from 'utils'
import { debounce } from 'lodash-es'
import { getAddressListApi, getAreaIdByAddressApi } from '../api/address'
import { T_SELECT_ADDRESS, SF_INVITE_CODE, T_STORAGE_KEY } from '../constant'
import { APPLY_NAME, ANOTHER_TF_UPLOAD } from '../config'
import ChooseTime from './componts/choose-time.vue'
import { getServicePriceApi, getServiceOrderApi, getIsOpenServerAreaApi, getCommunityListApi, getAreaDetailInfoApi } from '../api/community-center'
import { updateDeleteRedisCardHolderApi } from '../api/anotherTFInterface'
import ChooseCommunity from './components/ChooseCommunity.vue'

export default {
  components: { ChooseTime, ChooseCommunity },
  data() {
    return {
      APPLY_NAME,
      showAuthPopupVisible: false,
      // 收货地址
      defualtAddress: null,
      // 当前选中的服务信息
      currentServeInfo: {},
      // 表单信息
      orderForm: {
        datetimerange: '', // 期望上门时间
        quantity: 1, // 数量
        orderGoodsList: [], // 图片
        remarks: '', // 备注信息
        videoList: []
      },
      chooseTimeVisible: false,
      changeNumberFn: () => {},
      calcServePrice: null,
      isExistCommunityStore: true,
      isSubmitOrder: false,
      preferentialPrice: 0, // "优惠价",
      isOffer: false,
      radioItems: [
        {
          name: '一口价',
          value: 1
        },
        {
          name: '店长报价',
          value: 2
        }
      ],
      isShowPriceMode: 1,
      communityList: [], // 小区列表
      chooseCommunityDetail: null,
      cardId: '',
      videoContextObj: {},
      isShowVideoControl: false,
      videUploadProgress: 0
    }
  },

  mounted() {},

  onLoad(options) {
    this.currentServeInfo = options
    this.isByItNow = options.priceType === 'true' ? 1 : 2
    this.isShowPriceMode = this.isByItNow
    this.preferentialPrice = options.preferentialPrice === 'null' ? null : options.preferentialPrice * 1
    this.cardId = options.cardId || ''
    // this.getCommunityList()
  },

  onShow() {
    this.getAddressList()
  },

  methods: {
    // 选择小区
    handleChooseCommunity(data) {
      this.chooseCommunityDetail = data
    },
    // 返回
    handleBack() {
      uni.navigateBack()
    },
    // 获取收货地址
    async getAddressList() {
      const choosedAddress = uni.getStorageSync(T_SELECT_ADDRESS)
      if (choosedAddress) {
        const originSelectAddress = this.defualtAddress ? JSON.parse(JSON.stringify(this.defualtAddress)) : ''
        this.defualtAddress = choosedAddress
        if (!originSelectAddress || (originSelectAddress && originSelectAddress.detailedAddress !== choosedAddress.detailedAddress)) {
          this.getCommunityList()
        }

        // this.checkAreaExistCommunitStore();
        this.handleGetOrderPrice()
        return
      }
      const { data } = await getAddressListApi({
        userId: getUserId()
      })

      // if (data.length) {
      //   this.defualtAddress = data.find((item) => item.isDefault);
      // } else {
      //   this.defualtAddress = data[0];
      // }

      if (data.length) {
        const defaultAddress = data.find((item) => item.isDefault)
        if (defaultAddress) {
          this.defualtAddress = defaultAddress
        } else {
          this.defualtAddress = data[0]
        }
        this.getCommunityList()
        this.handleGetOrderPrice()
      }

      if (this.defualtAddress) {
        // this.checkAreaExistCommunitStore();
      }
    },

    // 获取选择的上门时间
    onChooseTime(time) {
      this.orderForm.datetimerange = time
    },

    // 修改服务数量
    handleChangeServeNumber(number) {
      if (number < 0 && this.orderForm.quantity == 1) {
        this.ttoast({
          type: 'fail',
          title: '最小服务单位是1'
        })
        return
      }
      this.orderForm.quantity += number
    },

    // 获取订单报价
    async handleGetOrderPrice() {
      if (this.isByItNow === 2 || !this.defualtAddress) {
        return
      }

      try {
        this.isOffer = true
        const res = await getServicePriceApi({
          userId: getUserId(),
          serverInfoId: this.currentServeInfo.detailId,
          quantity: this.orderForm.quantity,
          address: this.defualtAddress.detailedAddress
          // price: this.preferentialPrice || this.currentServeInfo.serverPrice,
          // // actualPrice: this.preferentialPrice,
        })

        if (res.statusCode === 20000) {
          this.calcServePrice = res.data
        } else {
          this.ttoast({
            type: 'fail',
            title: '报价失败'
          })
        }
      } finally {
        this.isOffer = false
      }
    },

    // 判断该区域是否开通了店长
    async checkAreaExistCommunitStore() {
      const res = await getIsOpenServerAreaApi({
        address: this.defualtAddress.detailedAddress && this.defualtAddress.detailedAddress.replace(' ', '')
      })
      if (res.statusCode === 20000) {
        this.isExistCommunityStore = res.data
      }
    },

    handleUploadImg() {
      // #ifdef APP
      const appAuthorizeSetting = uni.getAppAuthorizeSetting()
      if (appAuthorizeSetting.albumAuthorized !== 'authorized') {
        this.showAuthPopupVisible = true
        this.handleChooseImage()
      } else {
        this.handleChooseImage()
      }
      // #endif
      // #ifndef APP
      this.handleChooseImage()
      // #endif
    },
    handleChooseImage() {
			uni.chooseImage({
				extension: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'],
				success: (chooseImageRes) => {
          for (const imgFile of chooseImageRes.tempFiles) {
            uni.showLoading()
						uni.uploadFile({
							url: ANOTHER_TF_UPLOAD,
							filePath: imgFile.path,
							name: 'file',
							header: {
								Authorization: (uni.getStorageSync(T_STORAGE_KEY) || {}).token
							},
							formData: {
								'folderId': -1
							},
							success: (uploadFileRes) => {
                uni.hideLoading()
                this.orderForm.orderGoodsList.push(JSON.parse(uploadFileRes.data).data.url)
							},
              fail: (error) => {
                uni.hideLoading()
                this.ttoast({
                  type: 'fail',
                  title: '图片上传失败',
                  content: error
                })
              }
						})
					}
				}
			})
    },

    // 上传视频
    handleUploadVideo() {
      const _this = this
      uni.chooseVideo({
        maxDuration: 15,
        success: (data) => {
          const { size, tempFilePath } = data
          let templateSize = size / 1024
          templateSize = templateSize / 1024
          if (templateSize > 50) {
            return _this.ttoast({
              type: 'fail',
              title: '视频大小不能超过50M',
              content: error
            })
          }
          // uni.showLoading({ title: '视频上传中...' })
          const uploadTask = uni.uploadFile({
            url: ANOTHER_TF_UPLOAD,
            filePath: tempFilePath,
            name: 'file',
            header: {
              Authorization: (uni.getStorageSync(T_STORAGE_KEY) || {}).token
            },
            formData: {
              folderId: -1
            },
            success: (uploadFileRes) => {
              _this.orderForm.videoList.push(JSON.parse(uploadFileRes.data).data.url)
              _this.videUploadProgress = 100
              // uni.hideLoading()
              _this.ttoast('上传成功')

            },
            fail: (fail) => {
              // uni.hideLoading()
              _this.ttoast({
                type: 'fail',
                title: '上传失败',
                content: fail
              })
            }
          })
          uploadTask.onProgressUpdate((res) => {
            if (res.progress !== 100) {
              this.videUploadProgress = res.progress
            }
          })
        }
      })
    },

    // 点击删除图片
    handleDeleteImg(img) {
      this.orderForm.orderGoodsList = this.orderForm.orderGoodsList.filter((item) => item !== img)
    },

    // 点击删除图片
    handleDeleteVideo(video) {
      this.orderForm.videoList = this.orderForm.videoList.filter((item) => item !== video)
    },

    // 确认提交订单
    async handleConfirmOrder() {
      if (this.isOffer) {
        this.ttoast({
          type: 'info',
          title: '获取订单价格中...'
        })
        return
      }

      if (this.isSubmitOrder) {
        this.ttoast({
          type: 'info',
          title: '请稍后...',
          content: '订单创建中'
        })

        return
      }

      if (!this.defualtAddress || !this.defualtAddress.name) {
        this.ttoast({
          type: 'fail',
          title: '请选择上门地址'
        })
        return
      }

      if (!this.orderForm.datetimerange) {
        this.ttoast({
          type: 'info',
          title: '请选择期望上门时间'
        })

        this.chooseTimeVisible = true
        return
      }

      // if (!this.orderForm.orderGoodsList.length) {
      //   const name = this.currentServeInfo.name;
      //   if (!name.includes('维修') && !name.includes('修') && !name.includes('保') && !name.includes('补')) {
      //     this.ttoast({
      //       type: 'info',
      //       title: '请上传服务物品图片'
      //     });

      //     return;
      //   }
      // }
      this.isSubmitOrder = true

      try {
        const { remarks, orderGoodsList, datetimerange, videoList } = this.orderForm
        const tempSource = [...videoList, ...orderGoodsList]
        const partnerCode = uni.getStorageSync(SF_INVITE_CODE) || null
        const payOrderPrice = (this.calcServePrice && this.calcServePrice.oughtPrice) || ''
        const subOrderData = {
          userId: getUserId(),
          remarks: remarks || '',
          orderGoodsList: tempSource.map((item) => ({
            goodsType: '团蜂',
            goodsUrl: item
          })),
          dictName: this.currentServeInfo.name,
          installDate: datetimerange,
          consigneeName: this.defualtAddress.name,
          consigneeMobile: this.defualtAddress.mobile,
          consigneeAddress: this.defualtAddress.detailedAddress.split(' ')[0],
          consigneeAddressDetail: this.defualtAddress.detailedAddress.split(' ')[1],
          spotOrder: 0,
          pullIn: this.currentServeInfo.name === '空调清洗服务' ? 2 : 1,
          pricingType: this.isByItNow,
          paymentMethod: 1,
          orderType: 1,
          isVipSetmral: 0,
          deliveryType: 4,
          price: (this.calcServePrice && this.calcServePrice.sumPrice) || '',
          actualPrice: (this.calcServePrice && this.calcServePrice.oughtPrice) || '',
          serverTypeId: this.currentServeInfo.id !== 'undefined' ? this.currentServeInfo.id : undefined,
          serverId: this.currentServeInfo.detailId !== 'undefined' ? this.currentServeInfo.detailId : undefined,
          bizType: 1,
          individualAccount: this.$store.state.auth && this.$store.state.auth.userInfo ? this.$store.state.auth.userInfo.phone : '',
          communityId: this.chooseCommunityDetail ? this.chooseCommunityDetail.id : undefined
        }

        // 判断是否是师傅现场下单
        if (partnerCode) {
          subOrderData.partnerCode = partnerCode
          subOrderData.spotOrder = 1
        }

        const res = await getServiceOrderApi(subOrderData)
        if (res.statusCode === 20000) {
          this.ttoast('订单创建成功')
          uni.removeStorageSync(SF_INVITE_CODE)
          uni.setStorageSync('communityOrder', res.data)
          if (this.cardId) updateDeleteRedisCardHolderApi({ cardId: this.cardId })
          setTimeout(() => {
            uni.redirectTo({
              url: `/community-center/confirm-order?name1=${this.currentServeInfo.name}&oughtPrice=${payOrderPrice}&content=${this.orderForm.remarks}
        &consigneeName=${this.defualtAddress.name}&consigneeMobile=${this.defualtAddress.mobile}&consigneeAddress=${this.defualtAddress.detailedAddress.split(' ')[0]}&consigneeAddressDetail=${
                this.defualtAddress.detailedAddress.split(' ')[1]
              }
        &installDate=${this.orderForm.datetimerange}&pricingType=${this.isByItNow}&images=${JSON.stringify(this.orderForm.orderGoodsList)}&data=${res.data}`
            })
          }, 500)
        } else {
          throw new Error(res.statusMsg)
        }
      } catch (error) {
        console.log('订单创建报错啦', error)
        this.ttoast({
          type: 'fail',
          title: '订单创建失败',
          content: '请联系管理员'
        })
      } finally {
        this.isSubmitOrder = false
      }
    },

    // 修改报价模式
    handleSwitchPricingType(itemInfo) {
      this.isByItNow = itemInfo.value
      this.handleGetOrderPrice()
      this.$forceUpdate()
    },

    // 获取小区列表
    async getCommunityList() {
      try {
        this.chooseCommunityDetail = null
        const { detailedAddress } = this.defualtAddress || {}
        if (!detailedAddress) return
        const getAreaIdRes = await getAreaIdByAddressApi({
          detailAddress: detailedAddress
        })
        if (getAreaIdRes.statusCode !== 20000) return

        const res = await getCommunityListApi({
          pageNo: 1,
          pageSize: 10000,
          counCode: getAreaIdRes.data,
          isCommunityAccount: 1
        })

        if (res.statusCode === 20000) {
          uni.showLoading({ title: '加载中...' })
          this.communityList = res.data.records
          const codeTownsStr = this.communityList.map((item) => item.areaId).join(',')
          const addressDetailList = await getAreaDetailInfoApi({
            codeTownsStr: codeTownsStr,
            pageNo: 1,
            pageSize: 1000
          })

          if (addressDetailList.statusCode === 20000 && addressDetailList.data.records && Array.isArray(addressDetailList.data.records)) {
            addressDetailList.data.records.forEach((item) => {
              const { codeTown, nameCity, nameCoun, nameProv, nameTown } = item
              const curretData = this.communityList.find((data) => data.areaId == codeTown)
              if (curretData) {
                curretData.areaAddress = nameProv + nameCity + nameCoun + nameTown
              }
            })
          }
        } else {
          this.ttoast({
            title: '小区列表获取失败',
            type: 'fail'
          })
        }
      } catch (error) {
        console.log(error)
        this.ttoast({
          type: 'fail',
          title: '小区列表获取失败',
          content: error
        })
      } finally {
        uni.hideLoading()
      }
    },

    // 全屏播放
    requestVideoScreen(index) {
      const key = 'video_' + index
      let videoContext = this.videoContextObj[key]
      if (!videoContext) {
        videoContext = uni.createVideoContext(key)
        this.videoContextObj[key] = videoContext
      }
      videoContext.requestFullScreen()
      this.isShowVideoControl = true
      videoContext.pause()
      setTimeout(() => {
        videoContext.play()
      }, 500)
    },

    // 全屏发生变化
    handleFullscreenchange(e) {
      this.isShowVideoControl = e.detail.fullScreen
    }
  },

  watch: {
    'orderForm.quantity': {
      handler: debounce(function () {
        this.handleGetOrderPrice()
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .uni-video-cover {
  display: none !important;
}
.community-order-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f6;
  padding-bottom: 160upx;

  .head {
    height: 120upx;
    padding: 13upx 42upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0 0 24upx 24upx;
    display: flex;
    align-items: center;

    .back-icon {
      width: 18upx;
      height: 34upx;
    }
  }

  .section {
    padding: 40upx 30upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 24upx;
    margin-top: 20upx;
    margin: 20upx 20upx 0;
    transition: all 350ms;

    &.animate {
      &:active {
        background-color: #d3d3d3;
      }
    }

    &-title {
      color: #605d52;
      font-size: 32upx;
      font-weight: 500;
    }
  }

  .serve-time {
    .header-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      .section-title {
        flex: 1;
      }
    }
    .choose-time {
      color: #e95d20;
      font-size: 32upx;
    }
    .address-icon {
      width: 64upx;
      height: 64upx;
      border-radius: 50%;
      flex-shrink: 0;
      margin-left: 10upx;
    }
  }

  .choose-address-wrapper {
    display: flex;
    align-items: center;

    .address-icon {
      width: 64upx;
      height: 64upx;
      border-radius: 50%;
      flex-shrink: 0;
      margin-left: 10upx;
    }

    .section-title {
      flex: 1;
    }

    .address-container {
      flex: 1;

      .address-1 {
        color: #605d52;
        font-size: 28upx;
      }

      .address-2 {
        color: #141000;
        font-weight: 500;
        margin: 4upx 0 24upx 0;
      }
    }
  }

  .serve-info {
    .title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .serve-name {
        color: #000;
        font-size: 28upx;
      }

      .serve-price {
        margin-left: 10upx;

        .price-text {
          font-weight: bold;
          font-size: 32upx;
          color: #ff5917;

          &.del {
            font-size: 24upx;
            color: #3d3d3d;
            text-decoration: line-through;
          }
        }
      }
    }

    .car-info {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 30upx;

      .serve-img {
        width: 150upx;
        height: 120upx;
        border-radius: 12upx;
      }

      .number-control {
        display: flex;
        align-items: center;
        width: 200upx;
        border: 2upx solid #f1f1f0;
        border-radius: 100px;
        overflow: hidden;

        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24upx;
          color: #141000;

          &.disabled {
            background-color: #f0f0f0;
          }

          &:nth-of-type(1) {
            border-right: 1upx solid #f1f1f0;
          }

          &:nth-of-type(3) {
            border-left: 1upx solid #f1f1f0;
          }
        }

        .number {
          flex: 1;
        }

        .add,
        .mult {
          width: 56upx;
          height: 48upx;
        }
      }
    }
  }

  .serve-user-goods-info {
    .image-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin: 30upx 0;

      .item {
        position: relative;

        width: 180upx;
        height: 180upx;
        border-radius: 12upx;
        background-color: #f1f1f0;
        margin-right: 54upx;
        margin-bottom: 30upx;
        flex-shrink: 0;

        .close-icon {
          position: absolute;
          top: -10upx;
          right: -10upx;
          width: 34upx;
          height: 34upx;
          z-index: 10;
        }

        &:nth-of-type(3n) {
          margin-right: 0;
        }

        .goods-img {
          width: 100%;
          height: 100%;
          border: 1upx solid #f0f0f0;
          border-radius: 20upx;
          background-color: #f1f1f0;
        }

        &.add-img-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          &.video-item {
          }

          &:active {
            .add-icon {
              transform: scale(1.3);
            }
          }
        }

        .add-icon {
          width: 64upx;
          height: 64upx;
          transition: all 350ms;
        }
      }
    }
  }

  .order-price {
    .cost-order-list {
      margin-top: 30upx;
      .cost-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20upx;
        font-size: 28upx;

        .cost-title {
          font-size: 30upx;
          font-weight: 500;
        }

        .cost-value {
          font-size: 32upx;
          font-weight: bold;
        }

        .none {
          color: #ccc;
          font-size: 28upx;
        }
      }
    }
  }
}

/deep/ .tui-textarea__wrap {
  border-radius: 10upx;
  margin-top: 20upx;
}

.btn-wrapper {
  height: 120upx;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000000;

  .pay-price {
    font-size: 48upx;
    color: #e95d20;
    font-weight: bold;
    margin-right: 40upx;
  }

  .uni-btn {
    width: 552upx;
    height: 88upx;
    border-radius: 100px;
    background: linear-gradient(90deg, #ff8c2e 3%, #ff5917 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.radio-group {
  display: flex;
  align-items: center;

  .radio-item {
    display: flex;
    align-items: center;
    margin-left: 30upx;

    .label {
      font-size: 28upx;
      color: #3d3d3d;
      margin-left: 6upx;
    }
  }
}
</style>
