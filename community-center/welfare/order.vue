<template>
  <view class="order-container">
    <TuanPageHead :scroll-top="scrollTop" fixed title="完善信息" background="#fff">
      <tui-icon slot="left" name="arrowleft" color="#3d3d3d" @click="handleBack"></tui-icon>
    </TuanPageHead>

    <!-- 选择地址 -->
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

    <!-- 服务时间 -->
    <view class="serve-time section animate" @click="chooseTimeVisible = true">
      <view class="header-wrapper">
        <view class="section-title">请选择期望服务时间</view>
        <view class="address-icon" style="display: flex; justify-content: center; align-items: center; border: 2rpx solid #605d52">
          <tui-icon name="clock" :size="42" unit="rpx" color="#605d52" margin="0"></tui-icon>
        </view>
      </view>

      <view class="choose-time">{{ orderForm.installDate }}</view>
    </view>

    <!-- 服务内容 -->
    <!-- 维修商品 -->
    <view class="serve-user-goods-info section">
      <view class="section-title">清洗空调图片（选填）</view>
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

      <view style="margin-bottom: 20upx" class="section-title">需求说明（选填）</view>

      <tui-textarea
        isCounter
        padding="20rpx"
        margin="20rpx 0 0 "
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

    <!-- 确认按钮 -->
    <view class="op-container">
      <button :loading="isLoading" @click="handleConfirmOrder" class="confirm-btn uni-btn">确认下单</button>
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
          <view style="margin-top: 12rpx">"{{ APPLY_NAME }}"想访问您的相机和相册，将根据你的上传的图片，用于上传清洗、维修、安装的服务图片等场景</view>
        </view>
      </view>
    </tui-popup>

    <!-- 选择时间 -->
    <ChooseTime @choose="onChooseTime" v-model="chooseTimeVisible"></ChooseTime>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { T_SELECT_ADDRESS, T_COMMUNITY_ORDER_NO, T_STORAGE_KEY } from '../../constant'
import { getAddressListApi } from '../../api/address'
import ChooseTime from '../componts/choose-time.vue'
import { APPLY_NAME, ANOTHER_TF_UPLOAD } from '../../config'
import { getUserId } from '../../utils'
import { createActivityOrderApi, getServiceOrderPayApi, payOrderForBeeStewadAPPApi } from '../../api/community-center'

export default {
  components: { ChooseTime },
  data() {
    return {
			APPLY_NAME,
      showAuthPopupVisible: false,
      isLoading: false,
      scrollTop: 0,
      defualtAddress: null,
      chooseTimeVisible: false,
      orderForm: {
        userId: getUserId(),
        activityId: '',
        customerName: '',
        mobile: '',
        consigneeAddress: '',
        consigneeAddressDetail: '',
        installDate: '',
        remarks: '',
        orderGoodsList: []
      }
    }
  },
  onShow() {
    if (uni.getStorageSync(T_COMMUNITY_ORDER_NO)) {
      uni.switchTab({ url: '/pages/order/order' })
    }
    this.getAddressList()
  },
  onLoad(params) {
    this.orderForm.activityId = params.id
  },
  methods: {
    async getAddressList() {
      const choosedAddress = uni.getStorageSync(T_SELECT_ADDRESS)
      if (choosedAddress) {
        this.defualtAddress = choosedAddress
        return
      }
      const { data } = await getAddressListApi({
        userId: getUserId()
      })

      if (data.length) {
        const defaultAddress = data.find((item) => item.isDefault)
        if (defaultAddress) {
          this.defualtAddress = defaultAddress
        } else {
          this.defualtAddress = data[0]
        }
      }
    },

    // 获取选择的上门时间
    onChooseTime(time) {
      this.orderForm.installDate = time
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

    // 点击删除图片
    handleDeleteImg(img) {
      this.orderForm.orderGoodsList = this.orderForm.orderGoodsList.filter((item) => item !== img)
    },

    handleBack() {
      uni.navigateBack()
    },

    /**
     * 创建订单
     */
    async handleConfirmOrder() {
      if (!this.defualtAddress) {
        return this.ttoast({ type: 'fail', title: '请选择服务地址' })
      }
      if (!this.orderForm.installDate) {
        this.chooseTimeVisible = true
        return this.ttoast({ type: 'fail', title: '请选择期望服务时间' })
      }
      const { name, mobile, detailedAddress } = this.defualtAddress
      const submitData = JSON.parse(JSON.stringify(this.orderForm))
      submitData.consigneeAddress = detailedAddress.split(' ')[0]
      submitData.consigneeAddressDetail = detailedAddress.split(' ')[1]
      submitData.customerName = name
      submitData.mobile = mobile
      submitData.orderGoodsList = submitData.orderGoodsList.length ? submitData.orderGoodsList.map((goodsUrl) => ({ goodsUrl, goodsType: '团蜂' })) : []
      submitData.individualAccount = this.$store.state.auth && this.$store.state.auth.userInfo ? this.$store.state.auth.userInfo.phone : ''
      try {
        this.isLoading = true
        const createOrderRes = await createActivityOrderApi(submitData)
        if (createOrderRes.statusCode === 20000) {
          this.ttoast('订单创建成功')
          uni.setStorageSync(T_COMMUNITY_ORDER_NO, createOrderRes.data.orderNo)
          this.handlePay(createOrderRes.data.orderNo)
        } else {
          this.ttoast({ type: 'fail', title: '下单失败', content: createOrderRes.statusMsg })
        }
      } catch (error) {
        this.ttoast({ type: 'fail', title: '下单失败', content: error })
      } finally {
        this.isLoading = false
      }
    },

    // 支付
    async handlePay(orderNo) {
      uni.setStorageSync(T_COMMUNITY_ORDER_NO, orderNo)
      const _this = this
      if (this.$store.state.app.isInMiniProgram) {
        try {
          const payAppesult = await payOrderForBeeStewadAPPApi({
            userId: getUserId(),
            orderNo: orderNo
          })

          if (payAppesult.statusCode === 20000) {
            let query = ''
            for (const key in payAppesult.data) {
              query += key + '=' + payAppesult.data[key] + '&'
            }
            wx.miniProgram.navigateTo({
              url: '/pages/loading/loading?' + query + 'orderNo=' + orderNo + '&userId=' + getUserId(),
              fail: async () => {
                if (!this.$store.state.app.isInMiniProgram) {
                  let res = await getServiceOrderPayApi({
                    orderNo: orderNo,
                    userId: getUserId()
                  })

                  res = JSON.parse(res.data)
                  const form = document.createElement('form')
                  form.setAttribute('action', res.url)
                  form.setAttribute('method', 'POST')

                  const data1 = JSON.parse(res.data)
                  let input
                  for (const key in data1) {
                    input = document.createElement('input')
                    input.name = key
                    input.value = data1[key]
                    form.appendChild(input)
                  }

                  document.body.appendChild(form)
                  form.submit()
                  document.body.removeChild(form)
                } else {
                  _this.ttoast({
                    type: 'fail',
                    title: error
                  })

                  setTimeout(() => {
                    uni.switchTab({
                      url: '/pages/order/order'
                    })
                  }, 3000)
                }
              }
            })
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        // #ifdef H5
        let res = await getServiceOrderPayApi({
          orderNo: orderNo,
          userId: getUserId()
        })

        res = JSON.parse(res.data)

        const form = document.createElement('form')
        form.setAttribute('action', res.url)
        form.setAttribute('method', 'POST')

        const data1 = JSON.parse(res.data)
        let input
        for (const key in data1) {
          input = document.createElement('input')
          input.name = key
          input.value = data1[key]
          form.appendChild(input)
        }

        document.body.appendChild(form)
        form.submit()
        document.body.removeChild(form)
        // #endif

        // #ifdef APP
        const payAppesult = await payOrderForBeeStewadAPPApi({
          userId: getUserId(),
          orderNo: orderNo
        })

        if (payAppesult.statusCode === 20000) {
          let query = ''
          for (const key in payAppesult.data) {
            query += key + '=' + payAppesult.data[key] + '&'
          }

          plus.share.getServices(
            function (res) {
              let sweixin = null
              for (let i in res) {
                if (res[i].id == 'weixin') {
                  sweixin = res[i]
                }
              }
              console.log(sweixin)
              if (sweixin) {
                sweixin.launchMiniProgram({
                  id: 'gh_e64a1a89a0ad',
                  type: 0,
                  path: 'pages/orderDetail/orderDetail?' + query
                })
              }
            },
            function (e) {
              console.log('获取分享服务列表失败：' + e.message)
            }
          )
        }
        // #endif
      }
    }
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  }
}
</script>

<style lang="scss" scoped>
.order-container {
  min-height: 100vh;
  background-color: #f6f6f6;
  padding-bottom: 130rpx;

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

  .op-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100rpx;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;

    .confirm-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 702rpx;
      height: 80rpx;
      color: #fff;
      background-color: #e95d20;
      font-size: 28rpx;

      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
