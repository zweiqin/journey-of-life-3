<template>
  <view class="delivey-info">
    <!-- redirect="/community-center/vip-center/vip-detail" -->
    <Header bgc="#e95d20" title="完善服务信息"></Header>
    <!-- redirect="/pages/community-center/community-center" -->
    <view class="info">
      <view class="title">
        <text>客户信息</text>
        <button class="uni-btn" @click="go('/user/site/site-manage?appoint=true')">
          <tui-icon :size="20" name="addressbook"></tui-icon>
          <text class="select-wrapper">已有地址?<text class="select">去选择 -></text> </text>
        </button>
      </view>
      <!-- {{ consigneeForm }} -->
      <view class="main-wrapper">
        <Field @iconClick="handleOpenMapToChooseAddress" v-for="item in userInputMsg" :key="item.label"
          v-model="consigneeForm[item.field]" :data="item" class="field">
          <template v-if="item.select && item.field === 'consigneeAddress'">
            <!-- <PickRegions visible-muti @getRegion="handleGetRegionEnd">
              <input
                v-model="consigneeForm.consigneeAddress"
                type="text"
                class="uni-input"
                disabled
                placeholder="请选择目的地"
                adjust-position
                cursor-spacing="180"
              />
            </PickRegions> -->

            <view class="uni-input" @click="handleChooseAddress">{{ consigneeForm.consigneeAddress || '请选择上门地址' }}</view>
          </template>

          <template v-if="item.select && item.field === 'isElevator'">
            <picker :range="columns" style="width: 100%; height: 100%" @change="handleChooseElevator">
              <view class="elevator">{{ consigneeForm.isElevator }}</view>
            </picker>
          </template>
        </Field>

        <view v-show="showTip" class="tip-wrapper">
          <tui-alerts type="info" title="注意：你选择的区域不在接单范围内,只可享受网络服务"></tui-alerts>
        </view>

        <view class="remarks-container">
          <textarea v-model="consigneeForm.remarks" cols="30" rows="10" placeholder="请输入订单备注"></textarea>
        </view>
      </view>
    </view>

    <view class="info">
      <view class="title">已选服务</view>

      <view class="serve-name">
        <view v-for="(item, index) in serveData && serveData.serverContent.split(',')" :key="index"
          class="serve-item-name">
          <tui-icon margin="0 10rpx 0 0" color="rgb(255, 153, 0)" name="label-fill" :size="20"></tui-icon>
          {{ item }}
        </view>
      </view>
    </view>

    <Remarks style="margin-top: 20px" :is-distinguish="true"
      :distinguish="'输入姓名，电话，地址自动识别\n粘贴地址信息例如：马*明，135467****，广东省佛山市顺德区xxxxx'" @distinguish="handleDistinguish"></Remarks>

    <Button type="error" @click="confirm">确定</Button>

    <tui-toast ref="toast"></tui-toast>

    <TuanCity @confirm="handleConfirmAddress" ref="TuanCityRef"></TuanCity>
  </view>
</template>

<script>
import Field from './components/field.vue';
import PickRegions from '../components/pick-regions/pick-regions.vue';
import Button from './components/button.vue';
import Remarks from './components/remarks.vue';
import Header from './components/header.vue';
import { consigneeVipInfo } from './config';
import { getUserId, throttle, getAdressDetailByLngLat, isH5InWebview } from '../utils';
import { createRepairOrderApi, payOrderForBeeStewadApi, getIsOpenServerAreaApi, payOrderForBeeStewadAPPApi } from '../api/community-center';
import { getAddressListApi } from '../api/address';

import { T_COMMUNITY_ORDER_NO, T_SELECT_ADDRESS, SF_INVITE_CODE } from '../constant';

export default {
  components: {
    Field,
    PickRegions,
    Button,
    Remarks,
    Header
  },
  data() {
    return {
      consigneeForm: {
        consigneeName: '',
        consigneeMobile: '',
        consigneeAddress: '',
        consigneeAddressDetail: '',
        isElevator: '有',
        floor: '1',
        remarks: ''
      },
      userInputMsg: [],
      columns: ['有', '无'],
      cacheName: 'CONSIGNEE_',
      showTip: false,
      loading: false,
      confirm: () => { }
    };
  },

  onShow() {
    this.getAddressList();
    this.confirm = throttle(this.handleCreateOrder, 1000);
    const consigneeInfo = uni.getStorageSync(`${this.cacheName}INFO`);
    const orderNo = uni.getStorageSync(T_COMMUNITY_ORDER_NO) || '';
    if (orderNo) {
      // uni.redirectTo({
      //   url: "/community-center/order",
      // });
      uni.switchTab({
        url: '/pages/order/order'
      });

      return;
    }

    if (consigneeInfo) {
      this.consigneeForm.consigneeName = consigneeInfo.consigneeName;
      this.consigneeForm.consigneeMobile = consigneeInfo.consigneeMobile;
      this.consigneeForm.consigneeAddress = consigneeInfo.consigneeAddress;
      this.consigneeForm.consigneeAddressDetail = consigneeInfo.consigneeAddressDetail;
      this.consigneeForm.floor = consigneeInfo.floor + '';
      this.consigneeForm.isElevator = consigneeInfo.isElevator ? '有' : '无';
    }
  },
  onLoad(option) {
    this.serveData = option.data;
    try {
      if (this.serveData) {
        this.serveData = JSON.parse(option.data);
      } else {
        uni.showToast({
          title: '未选择服务，请选择服务',
          duration: 2000,
          icon: 'none'
        });

        setTimeout(() => {
          uni.redirectTo({
            url: '/community-center/vip-center/vip-detail'
          });
        }, 2000);
      }
    } catch (error) {
      this.ttoast({
        title: '活动不存在',
        type: 'fail'
      });

      setTimeout(() => {
        uni.switchTab({
          url: '/'
        });
      }, 1000);
    }

    if (option.repair) {
      this.cacheName = 'REPAIR_';
    }

    this.filterDate();
  },
  methods: {
    // 点击确定
    async handleCreateOrder() {
      try {
        if (this.loading) {
          this.ttoast({
            title: '操作太快了',
            type: 'info'
          });

          return;
        }
        const _this = this;
        this.loading = true;
        uni.showLoading({
          title: '下单中...'
        });

        if (
          !this.consigneeForm.consigneeName ||
          !this.consigneeForm.consigneeMobile ||
          !this.consigneeForm.consigneeAddress ||
          !this.consigneeForm.consigneeAddressDetail
        ) {
          uni.showToast({
            title: '请填写完提货信息',
            icon: 'none'
          });
          this.loading = false;

          return;
        }

        if (this.consigneeForm.consigneeMobile.length !== 11) {
          uni.showToast({
            title: '手机号不合法',
            icon: 'none'
          });
          this.loading = false;

          return;
        }

        const partnerCode = uni.getStorageSync(SF_INVITE_CODE) || null;
        const data = {
          isVipSetmeal: 1,
          userId: getUserId(),
          // userId: 263,
          orderType: 1,
          pricingType: 1,
          paymentMethod: 1,
          deliveryType: 4,
          price: this.serveData.serverPrice,
          actualPrice: this.serveData.serverPrice,
          dictName: this.serveData.serverType === 1 ? this.serveData.serverName : this.serveData.serverContent,
          serverId: this.serveData.id,
          consigneeAddress: this.consigneeForm.consigneeAddress,
          consigneeAddressDetail: this.consigneeForm.consigneeAddressDetail,
          remarks: this.consigneeForm.remarks,
          consigneeName: this.consigneeForm.consigneeName,
          consigneeMobile: this.consigneeForm.consigneeMobile
        };

        if (partnerCode) {
          data.partnerCode = partnerCode;
          data.spotOrder = 1;
        }

        if (data.dictName === '空调清洗') {
          data.serverTypeId = 313;
        }

        const createOrderRes = await createRepairOrderApi(data);
        uni.setStorageSync(T_COMMUNITY_ORDER_NO, createOrderRes.data);
        if (createOrderRes.statusMsg.includes('购买一次')) {
          this.ttoast({
            type: 'fail',
            title: '购买失败',
            content: createOrderRes.statusMsg
          });
          uni.hideLoading();
          this.loading = false;
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/order/order'
            });
          }, 2000);
          return;
        }
        if (createOrderRes.statusCode == 20000) {
          if (this.$store.state.app.isInMiniProgram || isH5InWebview()) {
            const payAppesult = await payOrderForBeeStewadAPPApi({
              userId: getUserId(),
              orderNo: createOrderRes.data
            });

            uni.hideLoading();
            _this.loading = false;

            if (payAppesult.statusCode === 20000) {
              let query = '';
              for (const key in payAppesult.data) {
                query += key + '=' + payAppesult.data[key] + '&';
              }

              wx.miniProgram.navigateTo({
                url: '/pages/loading/loading?' + query + 'orderNo=' + createOrderRes.data + '&userId=' + getUserId(),
                fail: async () => {
                  // uni.redirectTo({
                  //   url: `/community-center/order`,
                  // });

                  if (!isH5InWebview()) {
                    const payResult = await payOrderForBeeStewadApi({
                      userId: getUserId(),
                      orderNo: createOrderRes.data
                    });

                    uni.hideLoading();
                    _this.loading = false;
                    uni.removeStorageSync(SF_INVITE_CODE);

                    if (payResult.statusCode === 20000) {
                      _this.address = '';
                      uni.removeStorageSync(`${this.cacheName}INFO`);
                      const res = JSON.parse(payResult.data);
                      const form = document.createElement('form');
                      form.setAttribute('action', res.url);
                      form.setAttribute('method', 'POST');

                      const data = JSON.parse(res.data);
                      let input;
                      for (const key in data) {
                        input = document.createElement('input');
                        input.name = key;
                        input.value = data[key];
                        form.appendChild(input);
                      }

                      document.body.appendChild(form);
                      form.submit();
                      document.body.removeChild(form);
                    } else {
                      uni.showToast({
                        title: '支付失败',
                        duration: 2000,
                        icon: 'none'
                      });
                    }
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
          } else {
            // #ifdef H5
            const payResult = await payOrderForBeeStewadApi({
              userId: getUserId(),
              orderNo: createOrderRes.data
            });

            uni.hideLoading();
            _this.loading = false;
            uni.removeStorageSync(SF_INVITE_CODE);

            if (payResult.statusCode === 20000) {
              _this.address = '';
              uni.removeStorageSync(`${this.cacheName}INFO`);
              const res = JSON.parse(payResult.data);
              const form = document.createElement('form');
              form.setAttribute('action', res.url);
              form.setAttribute('method', 'POST');

              const data = JSON.parse(res.data);
              let input;
              for (const key in data) {
                input = document.createElement('input');
                input.name = key;
                input.value = data[key];
                form.appendChild(input);
              }

              document.body.appendChild(form);
              form.submit();
              document.body.removeChild(form);
            } else {
              uni.showToast({
                title: '支付失败',
                duration: 2000,
                icon: 'none'
              });
            }
            // #endif

            // #ifdef APP
            const payAppesult = await payOrderForBeeStewadAPPApi({
              userId: getUserId(),
              orderNo: createOrderRes.data
            });

            uni.hideLoading();
            _this.loading = false;

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
        } else {
          uni.showToast({
            title: createOrderRes.statusMsg,
            duration: 2000,
            icon: 'none'
          });
          this.loading = false;
          uni.hideLoading();
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '下单失败',
          content: error
        });
        uni.hideLoading();
        this.loading = false;
      }
    },
    // 选择省市区
    async handleGetRegionEnd(region) {
      this.consigneeForm.consigneeAddress = region.map((item) => item.name).join('');

      const res = await getIsOpenServerAreaApi({
        address: this.consigneeForm.consigneeAddress
      });

      this.showTip = !res.data;
    },
    // 点击识别
    handleDistinguish(result) {
      this.consigneeForm.consigneeName = result.person;
      this.consigneeForm.consigneeMobile = result.phonenum;
      this.consigneeForm.consigneeAddress = result.province + result.city + result.county;
      this.consigneeForm.consigneeAddressDetail = result.detail;
    },

    // 点击选择有无电梯
    handleChooseElevator(e) {
      this.consigneeForm.isElevator = e.detail.value + '' == 1 ? '无' : '有';
      console.log(e.detail.value, this.consigneeForm);
    },

    // 过滤列表
    filterDate() {
      let data = consigneeVipInfo;
      if (this.cacheName === 'REPAIR_') {
        data = data.filter((item) => {
          return item.field !== 'isElevator' && item.field !== 'floor';
        });
      }
      this.userInputMsg = data;
    },

    // 点击选择地址
    async handleConfirmAddress(selectInfo) {
      this.consigneeForm.consigneeAddress = selectInfo.formatAddress4;
      const res = await getIsOpenServerAreaApi({
        address: this.consigneeForm.consigneeAddress
      });

      this.showTip = !res.data;
    },

    handleChooseAddress() {
      this.$refs.TuanCityRef.show();
    },

    // 获取地址
    async getAddressList() {
      const choosedAddress = uni.getStorageSync(T_SELECT_ADDRESS);
      if (choosedAddress) {
        this.setConsigneeInfo(choosedAddress);
        return;
      }
      const { data } = await getAddressListApi({
        userId: getUserId()
      });

      if (data.length) {
        const defaultAddress = data.find((item) => item.isDefault);
        if (defaultAddress) {
          this.setConsigneeInfo(defaultAddress);
        } else {
          this.setConsigneeInfo(data[0]);
        }
      }

      if (this.defualtAddress) {
        // this.checkAreaExistCommunitStore();
      }
    },

    setConsigneeInfo(choosedAddress) {
      choosedAddress.name && (this.consigneeForm.consigneeName = choosedAddress.name || '');
      choosedAddress.mobile && (this.consigneeForm.consigneeMobile = choosedAddress.mobile || '');
      this.consigneeForm.consigneeAddress = choosedAddress.detailedAddress.split(' ')[0];
      this.consigneeForm.consigneeAddressDetail = choosedAddress.detailedAddress.split(' ')[1];
    },

    handleOpenMapToChooseAddress() {
      const _this = this;
      uni.chooseLocation({
        success(res) {
          try {
            getAdressDetailByLngLat(res.latitude, res.longitude).then((parseRes) => {
              const { city, province, district, township } = parseRes.regeocode.addressComponent;
              const data1 = province + city + district;

              const level1 = data1 + township;
              let splitLen = data1.length;
              if (res.address.includes('街道') || res.address.includes('镇')) {
                splitLen += district.length;
              }
              const level2 = res.address.slice(splitLen) + res.name;

              _this.setConsigneeInfo({
                detailedAddress: level1 + ' ' + level2
              });
            });
          } catch (error) { }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.delivey-info {
  padding-bottom: 170upx;

  .info {
    .title {
      color: #888;
      margin: 47upx 30upx 12upx 30upx;
      font-size: 26upx;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .uni-btn {
        font-size: 28upx;
        display: flex;
        align-items: center;

        .select-wrapper {
          margin-left: 10upx;
          color: #3b3b3b;

          .select {
            color: rgb(233, 93, 32);
          }
        }
      }
    }

    .main-wrapper {
      background-color: #fff;
    }

    .field {
      border-bottom: 1upx solid rgb(228, 228, 228);
    }
  }

  .elevator {
    color: #111;
    font-size: 34upx;
  }

  .serve-name,
  .remarks-container {
    padding: 30upx 34upx;
  }

  .serve-item-name {
    color: #3d3d3d;
    font-size: 32upx;
    line-height: 2;
  }

  uni-textarea {
    height: 100upx;
    width: 100%;
  }

  .tip-wrapper {
    padding: 20upx;
    box-sizing: border-box;

    /deep/ .tui-alert__wrap {
      background-color: #bababa !important;
    }
  }
}
</style>
