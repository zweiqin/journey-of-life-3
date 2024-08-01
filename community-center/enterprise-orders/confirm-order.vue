<template>
  <view class="confirm-order-container">
    <TuanPageHead title="订单详情" padding="0" weight="500">
      <block slot="left">
        <tui-icon :size="32" color="#999999" name="arrowleft" margin="30rpx 0" @click="handleBack"></tui-icon>
      </block>
    </TuanPageHead>
    <view class="pane" v-if="bDetailInfo">
      <view class="bar">
        <view class="title justify">公司名称</view>
        <view class="value title flex">{{ bDetailInfo.companyName }} <view class="tag">已认证</view>
        </view>
      </view>

      <view class="bar">
        <view class="title justify">联系人</view>
        <input class="input value title" v-model="orderForm.consigneeName" />
      </view>

      <view class="bar">
        <view class="title justify">联系电话</view>
        <input class="input value" v-model="orderForm.consigneeMobile" />
      </view>

      <view class="bar" @click="$refs.TuanCityRef && $refs.TuanCityRef.show()">
        <view class="title justify">公司地址</view>
        <input disabled readonly class="input value" v-model="orderForm.consigneeAddress" />
      </view>

      <view class="bar" style="display: block;">
        <view class="input title justify">公司详细地址</view>
        <view>
          <tui-textarea v-model="orderForm.consigneeAddressDetail" :maxlength="80" :marginTop="26" padding="20rpx" trim
            isCounter :size="26" backgroundColor="#F5F4F5" :borderTop="false" :borderBottom="false" height="50upx"
            min-height="50upx" autoHeight placeholder="请输入公司详细地址"></tui-textarea>
        </view>
      </view>

      <!-- <view class="bar">
        <view class="title justify">详细地址</view>
        <view class="value title">guangdong</view>
      </view> -->


      <view class="shop-choose">
        <view class="shop-name" v-if="shopSiteList.length">
          <view class="shop-name-text">{{ currentChooseShopInfo ? currentChooseShopInfo.shopNameSimple : '请选择服务网点' }}
          </view>
          <view class="tag">默认</view>
        </view>

        <view class="shop-name" v-else>
          暂无网点
        </view>
        <button class="uni-btn" @click="handleChooseSite"
          :style="{ opacity: shopSiteList.length ? '1' : '0.6' }">网点更换</button>
      </view>

      <view class="shop-address" v-if="currentChooseShopInfo">
        <view class="shop-address-text">
          <view class="tag">最近</view>
          {{ currentChooseShopInfo.shopAddress }}
        </view>
      </view>
    </view>

    <view class="pane">
      <view class="bar">
        <view class="title justify flex">已选服务：<text>{{ selectServerList.length }}项</text>
        </view>
        <view class="value title flex" @click="handleAddServe">
          添加服务
					<tui-icon name="plus" color="#222229" size="28" unit="rpx" margin="0 0 0 14rpx" bold></tui-icon>
        </view>
      </view>

      <view class="serve-pane" v-for="(item) in orderForm.extraInfo.serverInfo" :key="item.id">
        <view class="pane-header">
          <view class="left-title">
            <tui-icon margin="0 10upx 0 0" :size="20" name="circle-fill"></tui-icon>
            <view class="title">{{ item.serverName }}</view>
          </view>
          <view class="right-title">填写数量和上传图片</view>
        </view>

        <view class="count-price">
          <view class="item">
            <view class="item-title">数量</view>
            <view class="count-wrapper">
							<tui-icon @click="handleChangeNumber(-1, item)" name="reduce" color="#222229" size="28" unit="rpx" margin="0 28rpx 0 0" bold></tui-icon>
              <view class="count">{{ item.number }} {{ item.unit }}</view>
							<tui-icon @click="handleChangeNumber(1, item)" name="plus" color="#222229" size="28" unit="rpx" margin="0 0 0 28rpx" bold></tui-icon>
            </view>
          </view>
          <view class="item">
            <view class="item-title">金额</view>
            <view class="item-price">￥{{ item.serverPrice }}</view>
          </view>
        </view>

        <view class="img-list">
          <view class="uploader" @click="handleUploadImg(item)" v-show="item.images.length < 4">
            <tui-icon :size="20" marign="0 0 8upx 0" name="camera"></tui-icon>
            上传图片
          </view>
          <view class="img-wrapper" v-for="img in item.images" :key="img">
            <image class="img" :src="img"></image>
            <view class="delete-icon">
              <tui-icon @click="handleDeleteImg(img, item)" name="shut" :size="10" color="#fff"></tui-icon>
            </view>
          </view>
          <view v-show="item.images.length < 4" class="tip">最多上传4张</view>
        </view>
      </view>
    </view>

    <view class="pane">
      <view class="bar" @click="chooseTimeVisible = true">
        <view class="title justify flex">期望上门时间 <view class="required">必填</view>
        </view>
        <view class="value title flex">{{ orderForm.installDate || "请选择上门时间" }}
					<tui-icon name="arrowright" color="#222229" size="28" unit="rpx" margin="0 0 0 12rpx" bold></tui-icon>
        </view>
      </view>

      <view class="bar" @click="handleChoosePayMethod">
        <view class="title justify">付款方式
        </view>
        <view class="value title flex">{{ orderForm.extraInfo.payType === 1 ? '余额支付' : '微信支付' }}
					<tui-icon name="arrowright" color="#222229" size="28" unit="rpx" margin="0 0 0 12rpx" bold></tui-icon>
        </view>
      </view>
    </view>

    <view class="pane" style="margin-bottom: 280upx;">
      <view class="title">备注</view>
      <tui-textarea v-model="orderForm.remarks" :maxlength="80" :marginTop="26" padding="0" trim isCounter :size="26"
        :borderTop="false" autoHeight :borderBottom="false" height="50rpx" min-height="50rpx"
        placeholder="请输入订单备注"></tui-textarea>
    </view>

    <view class="footer">
      <view class="serve-detail">
        <view class="total-price">总计金额 <text class="price-text">￥{{ orderForm.actualPrice }}</text></view>
        <view class="serve-count">共计服务项目 {{ selectServerList.length }}项</view>
      </view>
      <button class="uni-btn" :loading="isCreateOrder" @click="handleSubmitOrder">提交订单</button>
    </view>

    <!-- 添加服务 -->
    <AddServe @confirm="handleConfirmChoose" ref="addServeRef"></AddServe>
    <!-- 选择网点 -->
    <ChooseShopSite @confirm="handleConfirmChooseSite" ref="chooseShopSiteRef"></ChooseShopSite>
    <!-- 选择期望上门时间 -->
    <ChooseTime @choose="handleChooseInstallTime" v-model="chooseTimeVisible"></ChooseTime>
    <!-- 选择支付方式 -->
    <PayMethods ref="payMethodRef" @confirm="handleChangePayType"></PayMethods>
    <!-- tip -->
    <tui-modal :show="isShowDeleteServeModal" title="提示" content="您要删除当前服务吗" @click="handleChangeServe"></tui-modal>
    <!-- toast -->
    <tui-toast ref="toast"></tui-toast>
    <!-- 选择地址 -->
    <TuanCity @confirm="handleConfirmAddress" ref="TuanCityRef"></TuanCity>
    <!-- 企业充值 -->
    <tui-modal :show="isShowRechargeModal" title="提示" content="您当前余额不足，是否去充值？" @click="handleOpRechargeModal"></tui-modal>
  </view>
</template>

<script>
import AddServe from './components/AddServe.vue'
import ChooseShopSite from './components/ChooseShopSite.vue'
import ChooseTime from '../componts/choose-time.vue'
import PayMethods from './components/PayMethods.vue'
import { getBAuthInfoApi, getOrderQuotationApi, getShopSiteListApi, createRepairOrderApi, getServiceOrderPayApi, payOrderForBeeStewadAPPApi, orderPayH5PabUseBlanceApi } from '../../api/community-center'
import { USER_INFO, ENTERPRISE_ORDERS_NO, T_STORAGE_KEY } from '../../constant'
import { getBuServeListApi } from '../../api/community-center'
import { getUserId } from '@/utils';
import { ANOTHER_TF_UPLOAD } from '../../config';
import { validateOrderForm } from './data'

export default {
  components: {
    AddServe,
    ChooseShopSite,
    ChooseTime,
    PayMethods
  },

  data() {
    return {
      chooseTimeVisible: false,
      bDetailInfo: null,
      selectServerList: [],
      serveList: [],
      isShowDeleteServeModal: false,
      isShowRechargeModal: false,
      shopSiteList: [],
      currentChooseShopInfo: null,
      isQuotation: false,
      isCreateOrder: false,
      orderForm: {
        orderGoodsList: [],
        dictName: "企业订单",
        consigneeName: '',
        consigneeMobile: '',
        consigneeAddress: '',
        consigneeAddressDetail: '',
        userId: getUserId(),
        spotOrder: 0,
        pullIn: 1,
        pricingType: 1,
        paymentMethod: 1,
        orderType: 1,
        isVipSetmral: 0,
        deliveryType: 4,
        price: "",
        actualPrice: "",
        serverTypeId: null,
        remarks: '',
        shopId: '',
        installDate: '', // 安装时间
        bizType: 3,
        extraInfo: {
          companyId: '',
          payType: 2, // 1余额，2通联
          serverInfo: []
        }
      }
    }
  },

  onShow() {
    this.getShopSiteList()
    this.getBuServeList()
    const preOrderNo = uni.getStorageSync(ENTERPRISE_ORDERS_NO)
    if (preOrderNo) {
      uni.switchTab({
        url: '/pages/order/order'
      });
    }
  },

  onLoad(params) {
    const serverIds = params.serverIds
    if (serverIds) {
      this.selectServerList = serverIds.split(',').map(item => item * 1)
    }
    this.getBAuthInfo()
  },

  methods: {
    handleBack() {
      uni.navigateBack()
    },

    handleAddServe() {
      this.$refs.addServeRef.show(this.selectServerList, this.serveList)
    },

    handleConfirmAddress(selectAddressInfo) {
      this.orderForm.consigneeAddress = selectAddressInfo.formatAddress4
    },

    handleChooseSite() {
      if (this.shopSiteList.length) {
        this.$refs.chooseShopSiteRef.show(this.shopSiteList, this.orderForm.shopId)
      } else {
        this.ttoast({
          type: 'info',
          title: "您所在的区域暂无服务网点~"
        })
      }
    },

    handleChoosePayMethod() {
      this.$refs.payMethodRef.show(this.orderForm.extraInfo.payType)
    },

    // 获取企业认证信息
    async getBAuthInfo() {
      const res = await getBAuthInfoApi({
        phone: uni.getStorageSync(USER_INFO).phone
      })

      if (res.statusCode === 20000) {
        this.bDetailInfo = res.data.company
        const companyAddressInfo = this.bDetailInfo.companyAddress.split(' ')
        this.orderForm.consigneeName = this.bDetailInfo.companyDelegate
        this.orderForm.consigneeMobile = this.bDetailInfo.delegatePhoneNumber
        this.orderForm.consigneeAddress = companyAddressInfo[0]
        this.orderForm.consigneeAddressDetail = companyAddressInfo[1]
        this.orderForm.extraInfo.companyId = this.bDetailInfo.id
        this.$store.dispatch('auth/refrshUserInfoAction')
      } else {
        this.ttoast({
          type: 'fail',
          title: '企业信息获取失败'
        })
      }
    },

    async getBuServeList() {
      const address = this.$store.getters.detailAddress
      if (!address) {
        uni.navigateTo({ url: "/pages/choose-location/choose-location" })
        return
      }

      const res = await getBuServeListApi({
        address: address
      })

      if (res.statusCode === 20000) {
        this.serveList = res.data
        if (res.data && res.data.length) {
          const fullRow = Math.floor(res.data.length / 3)
          const buCount = 3 - (res.data.length - 3 * fullRow)
          for (let i = 0; i < buCount; i++) {
            this.serveList.push({
              id: Math.random() + Date.now(),
              serveName: "xxx"
            })
          }

          this.initServeForm(this.selectServerList)
        }
      } else {
        this.ttoast({
          type: "fail",
          title: "获取服务列表失败"
        })
      }
    },

    initServeForm(currentSelect) {
      for (let i = 0; i < currentSelect.length; i++) {
        const currentId = currentSelect[i]
        const existingServerInfo = this.orderForm.extraInfo.serverInfo.find(item => item.id === currentId)
        const currentServeInfo = this.serveList.find(item => item.id === currentId)
        if (!existingServerInfo && currentServeInfo) {
          const { serverName, serverPrice, id, unit } = currentServeInfo;
          this.orderForm.extraInfo.serverInfo.push({
            id,
            serverName,
            serverPrice,
            images: [],
            number: 2,
            unit
          })
        }
      }
      this.handleGetOrderQuotation()
    },

    // 服务发生变化
    handleConfirmChoose(selectIds) {
      this.orderForm.extraInfo.serverInfo = this.orderForm.extraInfo.serverInfo.filter(item => selectIds.includes(item.id))
      const currentSelectServerIds = this.orderForm.extraInfo.serverInfo.map(item => item.id)
      selectIds.forEach(id => {
        if (!currentSelectServerIds.includes(id)) {
          const currentServeInfo = this.serveList.find(item => item.id === id)
          if (currentServeInfo) {
            const { serverName, serverPrice, id, unit } = currentServeInfo;
            this.orderForm.extraInfo.serverInfo.push({
              id,
              serverName,
              serverPrice,
              images: [],
              number: 2,
              unit
            })
          }
        }
      });

      // 如果只剩下一个服务，并且这个服务的number小于等于1，那就要把它变成2，保证总的服务个数是2
      if (this.orderForm.extraInfo.serverInfo.length === 1 && this.orderForm.extraInfo.serverInfo[0].number <= 1) {
        this.orderForm.extraInfo.serverInfo[0].number = 2
      }

      this.selectServerList = selectIds
      this.handleGetOrderQuotation()
    },

    // 修改服务数量
    handleChangeNumber(changeNum, target) {
      if (changeNum > 0) {
        target.number += changeNum
        this.handleGetOrderQuotation()
      } else if (changeNum < 0 && target.number > 2) {
        target.number += changeNum
        this.handleGetOrderQuotation()
      } else if (changeNum < 0 && target.number === 2) {
        if (this.orderForm.extraInfo.serverInfo && this.orderForm.extraInfo.serverInfo.length >= 2) {
          target.number += changeNum
          this.handleGetOrderQuotation()
        }
      }
    },

    handleChangeServe({ index }) {
      if (index) {
        this.orderForm.extraInfo.serverInfo = this.orderForm.extraInfo.serverInfo.filter(item => item.id != this.opTarget.id)
        this.selectServerList = this.orderForm.extraInfo.serverInfo.map(item => item.id)
        this.handleGetOrderQuotation()
      }

      this.isShowDeleteServeModal = false
      this.opTarget = null
    },

    // 点击上传图片
    handleUploadImg(target) {
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
                target.images.push(JSON.parse(uploadFileRes.data).data.url)
                this.ttoast('上传成功')
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

    // 删除图片
    handleDeleteImg(img, target) {
      target.images = target.images.filter(originImg => originImg !== img)
    },

    // 获取订单报价
    async handleGetOrderQuotation() {
      if (!this.orderForm.extraInfo.serverInfo.length) {
        this.orderForm.price = 0
        this.orderForm.actualPrice = 0
        return
      }

      try {
        uni.showLoading({
          title: '报价中'
        });
        this.isQuotation = true
        const serverInfo = this.orderForm.extraInfo.serverInfo.map(item => ({
          number: item.number,
          id: item.id
        }))
        const res = await getOrderQuotationApi({ serverInfo })
        if (res.statusCode === 20000) {
          const cost = res.data
          this.orderForm.price = cost
          this.orderForm.actualPrice = cost
        } else {
          this.ttoast({
            type: "fail",
            title: "报价失败"
          })
        }
      } catch (error) {
        this.ttoast({
          type: "fail",
          title: "报价失败",
          content: error
        })
      } finally {
        uni.hideLoading();
        this.isQuotation = false
      }
    },

    // 选择上门时间
    handleChooseInstallTime(time) {
      this.orderForm.installDate = time
    },

    // 选择支付方式
    handleChangePayType(newPayType) {
      if (this.orderForm.extraInfo.payType !== newPayType) {
        this.orderForm.extraInfo.payType = newPayType
      }
    },

    // 获取网点信息
    async getShopSiteList() {
      const address = this.$store.getters.detailAddress
      if (!address) {
        uni.navigateTo({ url: "/pages/choose-location/choose-location" })
        return
      }

      const res = await getShopSiteListApi({
        address: address
      })

      if (res.statusCode === 20000) {
        this.shopSiteList = res.data
        if (this.shopSiteList.length) {
          this.chooseSite(this.shopSiteList[0])
        }
      } else {
        this.ttoast({
          type: "fail",
          title: "获取门店列表失败"
        })
      }
    },

    // 选择网点
    chooseSite(siteInfo) {
      if (this.orderForm.shopId === siteInfo.id) {
        return
      }
      this.currentChooseShopInfo = siteInfo
      this.orderForm.shopId = siteInfo.id
    },

    // 提交订单
    async handleSubmitOrder() {
      if (this.isQuotation) {
        this.ttoast({
          type: 'info',
          title: "订单报价中...",
          content: "请稍后操作"
        })
        return
      }

      if (this.isCreateOrder) {
        this.ttoast({
          type: 'info',
          title: "订单提交中...",
          content: "请勿重复提交"
        })
        return
      }

      if (!this.isAllServerNumerEqualToTwo()) {
        this.ttoast({
          type: "info",
          title: "总服务数应大于等于2"
        })
        return
      }

      const validMsg = validateOrderForm(this.orderForm)
      if (validMsg) {
        this.ttoast({
          type: "fail",
          title: validMsg
        })
        return
      }
      try {
        this.isCreateOrder = true
        const extraInfo = JSON.stringify(this.orderForm.extraInfo)
        const res = await createRepairOrderApi({ ...this.orderForm, extraInfo })

        if (res.statusCode === 20000) {
          const orderNo = res.data
          uni.setStorageSync(ENTERPRISE_ORDERS_NO, orderNo)

          if (this.orderForm.extraInfo.payType === 1) {
            const res = await orderPayH5PabUseBlanceApi({
              orderNo: orderNo,
              userId: getUserId()
            })

            if (res.statusCode === 20000) {
              this.ttoast('支付成功')
              setTimeout(() => {
                uni.switchTab({
                  url: '/pages/order/order'
                })
              }, 2000);
            } else {
              this.ttoast({
                type: "fail",
                title: res.statusMsg
              })
            }
          } else {
            if (this.$store.state.app.isInMiniProgram) {
              try {
                const payAppesult = await payOrderForBeeStewadAPPApi({
                  userId: getUserId(),
                  orderNo: orderNo
                });

                if (payAppesult.statusCode === 20000) {
                  let query = '';
                  for (const key in payAppesult.data) {
                    query += key + '=' + payAppesult.data[key] + '&';
                  }
                  wx.miniProgram.navigateTo({
                    url: '/pages/loading/loading?' + query + 'orderNo=' + this.orderNo + '&userId=' + getUserId(),
                    fail: async () => {
                      if (!this.$store.state.app.isInMiniProgram) {
                        let res = await getServiceOrderPayApi({
                          orderNo: orderNo,
                          userId: getUserId()
                        });

                        res = JSON.parse(res.data);
                        const form = document.createElement('form');
                        form.setAttribute('action', res.url);
                        form.setAttribute('method', 'POST');

                        const data1 = JSON.parse(res.data);
                        let input;
                        for (const key in data1) {
                          input = document.createElement('input');
                          input.name = key;
                          input.value = data1[key];
                          form.appendChild(input);
                        }

                        document.body.appendChild(form);
                        form.submit();
                        document.body.removeChild(form);
                      } else {
                        _this.ttoast({
                          type: "fail",
                          title: error,
                        });

                        setTimeout(() => {
                          uni.switchTab({
                            url: "/pages/order/order",
                          });
                        }, 3000);
                      }
                    }
                  });
                }
              } catch (error) {
                console.log(error);
              }
            } else {
              // #ifdef H5
              let res = await getServiceOrderPayApi({
                orderNo: orderNo,
                userId: getUserId()
              });



              res = JSON.parse(res.data);

              const form = document.createElement('form');
              form.setAttribute('action', res.url);
              form.setAttribute('method', 'POST');

              const data1 = JSON.parse(res.data);
              let input;
              for (const key in data1) {
                input = document.createElement('input');
                input.name = key;
                input.value = data1[key];
                form.appendChild(input);
              }

              document.body.appendChild(form);
              form.submit();
              document.body.removeChild(form);
              // #endif

              // #ifdef APP
              const payAppesult = await payOrderForBeeStewadAPPApi({
                userId: getUserId(),
                orderNo: orderNo
              });

              if (payAppesult.statusCode === 20000) {
                let query = '';
                for (const key in payAppesult.data) {
                  query += key + '=' + payAppesult.data[key] + '&';
                }

                plus.share.getServices(
                  function (res) {
                    let sweixin = null;
                    for (let i in res) {
                      if (res[i].id == 'weixin') {
                        sweixin = res[i];
                      }
                    }
                    console.log(sweixin);
                    if (sweixin) {
                      sweixin.launchMiniProgram({
                        id: 'gh_e64a1a89a0ad',
                        type: 0,
                        path: 'pages/orderDetail/orderDetail?' + query
                      });
                    }
                  },
                  function (e) {
                    console.log('获取分享服务列表失败：' + e.message);
                  }
                );
              }
              // #endif
            }
          }
        } else {

          if (res.statusMsg.includes('余额不足')) {
            this.isShowRechargeModal = true
          } else {
            this.ttoast({
              type: 'fail',
              title: res.statusMsg
            })
            setTimeout(() => {
              if (this.orderForm.extraInfo.payType === 1) {
                uni.switchTab({
                  url: "/pages/order/order"
                })
              }
            }, 2000);
          }
        }
      } catch (error) {
        console.log("企业下单报错", error);
      } finally {
        this.isCreateOrder = false
      }
    },

    // 选择网点
    handleConfirmChooseSite(id) {
      if (!id) {
        this.currentChooseShopInfo = null
        this.orderForm.shopId = ''
      } else {
        const currentSiteInfo = this.shopSiteList.find(itme => itme.id === id)
        if (currentSiteInfo) {
          this.chooseSite(currentSiteInfo)
        }
      }
    },

    // 余额充值模态框
    handleOpRechargeModal() {
      // if (index) {
      //   this.ttoast("跳转平台支付")
      // } else {
      //   uni.switchTab({
      //     url: "/pages/order/order"
      //   })
      // }

      this.isShowRechargeModal = false
      uni.switchTab({
        url: "/pages/order/order"
      })
    },

    // 总服务数是否是2
    isAllServerNumerEqualToTwo() {
      if (!this.orderForm.extraInfo.serverInfo.length) {
        return false
      }
      let number = 0
      this.orderForm.extraInfo.serverInfo.forEach(serveInfo => {
        number += serveInfo.number
      })
      return number >= 2
    }
  },
}
</script>

<style lang="less" scoped>
.confirm-order-container {
  min-height: 100vh;
  background-color: #F5F5F5;
  padding: 24upx;
  box-sizing: border-box;

  .pane {
    background-color: #fff;
    padding: 32upx 24upx;
    box-sizing: border-box;
    border-radius: 24upx;
    margin-bottom: 24upx;

    .serve-pane {
      padding: 32upx 0;
      box-sizing: border-box;

      .pane-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left-title {
          display: flex;
          align-items: center;

        }

        .right-title {
          color: #888889;
          font-size: 26upx;
        }
      }

      .img-list {
        display: flex;
        align-items: center;

        .uploader {
          width: 105upx;
          height: 118upx;
          border-radius: 10upx;
          background-color: #F5F4F5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-size: 18upx;
          color: #888889;
          transition: all 350ms;
          margin-right: 24upx;

          &:active {
            opacity: 0.7;
          }
        }

        .img-wrapper {
          position: relative;
          width: 105upx;
          height: 118upx;
          margin-right: 10upx;
          border-radius: 10upx;
          background: #f3f3f3;
          overflow: hidden;

          .delete-icon {
            position: absolute;
            width: 40upx;
            height: 40upx;
            top: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0 0 0 60upx;
            box-sizing: border-box;
            padding: 6upx 6upx 0 0;
            justify-content: flex-end;
            align-items: flex-start;
          }

          .img {
            width: 100%;
            height: 100%;
          }
        }



        .tip {
          color: #D1D1D1;
          font-size: 24upx;
        }
      }

      .count-price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 24upx 0;

        .item {
          width: 315upx;
          height: 96upx;
          background-color: #F5F4F5;
          border-radius: 16upx;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 26upx;
          color: #888889;
          padding: 0 24upx;
          box-sizing: border-box;

          .item-price {
            font-weight: 500;
            color: #000;
          }

          .count-wrapper {
            display: flex;
            align-items: center;


            .dis {
              width: 24upx;
              height: 6upx;
              flex-shrink: 0;
              margin-right: 28upx;

            }

            .add {
              width: 24upx;
              height: 24upx;
              flex-shrink: 0;
              margin-left: 28upx;
            }

            .count {
              color: #000000;
              font-size: 26upx;
              font-weight: 500;
            }
          }


        }
      }
    }

    .title {
      font-size: 28upx;
      font-weight: 500;
      color: #000000;
      margin-right: 72upx;
      white-space: nowrap;

      &.flex {
        display: flex;
        align-items: center;

        .required {
          padding: 4upx 14upx;
          border: 1upx solid #EF530E;
          font-size: 18upx;
          color: #EF530E;
          margin-left: 6upx;
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      &.justify {
        width: 112upx;
        text-align-last: justify;
      }
    }

    .value {
      color: #222229;
      margin-right: 0 !important;

      .address-icon {
        width: 21upx;
        height: 21upx;
        flex-shrink: 0;
        margin-left: 14upx;
      }


      .tag {
        padding: 4upx 14upx;
        border-radius: 100px;
        font-size: 18upx;
        color: #fff;
        background-color: #4972FE;
        margin-left: 5upx;
      }



      &.flex {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
    }

    .bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 104upx;

      .input {
        flex: 1;
        text-align: end;
      }
    }

    .shop-choose {
      padding: 20upx 24upx;
      border-radius: 16upx;
      background-color: #F5F4F5;
      margin: 32upx 0 20upx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .shop-name {
        display: flex;
        align-items: center;

        &-text {
          max-width: 244upx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .tag {
          text-align: center;
          line-height: 32upx;
          width: 64upx;
          height: 32upx;
          border-radius: 100upx;
          font-size: 18upx;
          color: #888889;
          border: 1upx solid #888889;
          margin-left: 22upx;
        }
      }



      .uni-btn {
        width: 160upx;
        height: 56upx;
        border-radius: 100px;
        background-color: #EF530E;
        font-size: 24upx;
        color: #fff;
        font-weight: 500;
        text-align: center;
        line-height: 56upx;
      }
    }
  }

  .shop-address {
    padding: 20upx 24upx;
    border-radius: 16upx;
    background-color: #F5F4F5;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .shop-address-text {
      flex: 1;
      font-size: 26upx;
      color: #000000;
      line-height: 1.5;
      margin-right: 104upx;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;

      .tag {
        display: inline-flex;
        width: 56upx;
        height: 28upx;
        background-color: #49CE8B;
        font-size: 18upx;
        color: #fff;
        align-items: center;
        justify-content: center;
        border-radius: 100px;
        margin-right: 8upx;
      }
    }

    .distance {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .tag {
        width: 24upx;
        height: 24upx;
      }

      .distance-text {
        padding: 4upx 6upx;
        background-color: #49CE8B;
        color: #fff;
        font-size: 24upx;
        border-radius: 100px;
        margin-top: 8upx;

      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 240upx;
    background-color: #fff;
    padding: 50upx 24upx 102upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28upx;
    color: #222229;
    font-weight: 500;

    .price-text {
      font-weight: bold;
      font-weight: 32upx;
    }

    .serve-count {
      font-size: 22upx;
      color: #888889;
      line-height: 1.5;
      margin-top: 4upx;
    }

    .uni-btn {
      width: 248upx;
      height: 88upx;
      background-color: #EF530E;
      border-radius: 100px;
      text-align: center;
      line-height: 88upx;
      font-weight: 500;
      font-size: 32upx;
      color: #fff;
      transition: all 350ms;

      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>