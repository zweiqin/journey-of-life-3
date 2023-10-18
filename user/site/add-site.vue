<template>
  <view class="add-site-container">
    <view class="header">
      <!-- <JBack dark width="50" height="50"></JBack> -->
      <!-- <h2>添加新的地址</h2> -->
      <image src="../../static/images/user/back.png" mode="scaleToFill" class="return" @click="handleBack" />
    </view>

    <view class="add-site-content">
      <view class="item-wrapper">
        <view class="add-site-title">收货人</view>
        <view class="add-site-value"
          ><input v-model="form.name" type="text" class="common-text" placeholder="请填写姓名" style="padding-bottom: 32upx" />
        </view>
      </view>

      <view class="item-wrapper">
        <view class="add-site-title">手机号码</view>
        <view class="add-site-value"
          ><input v-model="form.mobile" type="text" class="common-text" placeholder="请填写电话" style="padding-bottom: 32upx"
        /></view>
      </view>

      <view class="item-wrapper">
        <view class="add-site-title">所在地区</view>
        <view @click="handleChooseAddress" class="add-site-value" style="display: flex; justify-content: space-between">
          <view
            style="flex: 1; min-height: 1.4em; padding-bottom: 32upx; font-size: 28upx; margin-right: 10upx"
            :style="{ color: form.detailedAddress ? '' : 'gray' }"
            >{{ form.detailedAddress || '请选择区域' }}</view
          >

          <!-- <JIcon style="margin-top: 18upx" type="fill-down-triangle" width="24" height="12"></JIcon> -->

          <image style="margin-top: 18upx; width: 24upx; height: 12upx" src="../../static/images/user/site/5teywnd193jbmcvm6prp.png"></image>
        </view>
      </view>

      <view class="item-wrapper">
        <view class="add-site-title">详细地址</view>
        <view class="add-site-value" style="display: flex; justify-content: space-between">
          <textarea v-model="address" class="common-text" placeholder="请填写详细地址" style="padding-right: 40upx" />
          <!-- <JIcon @click="handleOpenMapToChooseAddress" type="locale" width="32" height="32"></JIcon> -->
          <image @click="handleOpenMapToChooseAddress" src="../../static/images/user/site/7s4uqrs9xyfodsurird6.png" style="width: 32upx; height: 32upx"></image>
        </view>
      </view>

      <view class="item-wrapper" style="align-items: center">
        <view class="add-site-title add-site-title-checked">设为默认地址</view>

        <switch style="transform: scale(0.5) translateX(50%)" :checked="!!form.isDefault" @change="handleChangeIsDefaultAddress" />
      </view>
    </view>

    <view class="intelligent-recognition-wrapper">
      <view class="add-site-title">智能识别</view>
      <view class="placeholder"> 复制收货信息马上自动识别 </view>
      <tui-textarea
        padding="20upx 0"
        :size="28"
        placeholder="请输入收货地址信息，即可快速识别，如广东省佛山市顺德区乐从镇和乐电商园1座李小明17000989898, (140字以内)"
        v-model="addressInfo"
      ></tui-textarea>
      <view class="identify-wrapper">
        <button class="uni-btn" :style="{ opacity: addressInfo ? 1 : 0.6 }" @click="hanldeIdentify" :disabled="!addressInfo">识别</button>
      </view>
    </view>

    <view class="foot">
      <button class="btn" @click="handleAddSite">保存</button>
    </view>

    <TuanCity @confirm="handleConfirmAddress" ref="TuanCityRef"></TuanCity>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getAddressSaveApi, getAddressDetailApi, updateAddressApi } from '../../api/address';
import { getUserId, getAdressDetailByLngLat } from '../../utils';
import { addressIntelligentRecogApi } from '../../api/logistics';

export default {
  data() {
    return {
      form: {
        name: '',
        mobile: '',
        userId: getUserId(),
        isDefault: 0,
        id: '',
        detailedAddress: ''
      },
      area: '',
      timer: null,
      editId: null,
      address: '',
      addressInfo: ''
    };
  },

  onLoad(options) {
    if (options.addressInfo) {
      const editAddress = JSON.parse(options.addressInfo);
      this.form.name = editAddress.name;
      this.form.mobile = editAddress.mobile;
      this.form.isDefault = editAddress.isDefault ? 1 : 0;
      this.form.id = editAddress.id;
      this.form.detailedAddress = editAddress.detailedAddress.split(' ')[0];
      this.address = editAddress.detailedAddress.split(' ')[1];
    }
  },

  methods: {
    handleBack() {
      uni.navigateBack();
    },

    // 点击确定选择地区
    handleChooseCity(area) {
      this.area = area.area;
      this.form.provinceId = area.province.id;
      this.form.cityId = area.city.id;
      this.form.areaId = area.county.id;
    },

    // 点击提交
    handleAddSite() {
      if (!this.form.name) {
        this.$showToast('请填写姓名');
        return;
      }

      if (this.form.mobile.length !== 11) {
        this.$showToast('电话格式错误');
        return;
      }

      if (!this.form.detailedAddress) {
        this.$showToast('请选择地区');
        return;
      }

      if (!this.address) {
        this.$showToast('请填写详细地址');
        return;
      }

      const _this = this;
      // console.log(_this.form);

      const data = JSON.parse(JSON.stringify(this.form));
      data.detailedAddress += ' ' + this.address;

      const api = data.id ? updateAddressApi : getAddressSaveApi;

      api(data).then((res) => {
        if (res.errno == '0') {
          _this.$showToast(_this.form.id ? '修改成功' : '添加成功', 'success');
          this.form = {
            name: '',
            mobile: '',
            isDefault: 0,
            id: '',
            detailedAddress: ''
          };
          this.address = '';
          _this.timer = setTimeout(() => {
            uni.navigateBack();
          }, 1000);
        } else {
          this.ttoast({
            type: 'fail',
            title: res.errmsg || '操作失败'
          });
        }
      });
    },

    // 切换是否是默认地址
    handleChangeIsDefaultAddress(e) {
      this.form.isDefault = e.detail.value ? 1 : 0;
    },

    // 获取地址详情
    getAddressDetail() {
      const _this = this;
      getAddressDetailApi({
        userId: getUserId(),
        id: this.editId
      }).then(({ data }) => {
        _this.form.name = data.name;
        _this.form.mobile = data.mobile;
        _this.form.address = data.address;
        _this.area = data.provinceName + data.cityName + data.areaName;
        _this.form.provinceId = data.provinceId;
        _this.form.cityId = data.cityId;
        _this.form.areaId = data.areaId;
        _this.form.id = data.id;
      });
    },

    handleConfirmAddress(selectInfo) {
      // console.log(selectInfo)
      this.form.detailedAddress = selectInfo.formatAddress4;
    },

    handleChooseAddress() {
      this.$refs.TuanCityRef.show();
    },

    // 点击选择位置
    handleOpenMapToChooseAddress() {
      const _this = this;
      uni.chooseLocation({
        success(res) {
          try {
            getAdressDetailByLngLat(res.latitude, res.longitude).then((parseRes) => {
              const { city, province, district, township } = parseRes.regeocode.addressComponent;
              const data1 = province + city + district;
              _this.form.detailedAddress = data1 + township;
              let splitLen = data1.length;
              if (res.address.includes('街道') || res.address.includes('镇')) {
                splitLen += district.length;
              }
              _this.address = res.address.slice(splitLen) + res.name;
            });
          } catch (error) {}
        }
      });
    },

    // 点击智能识别
    async hanldeIdentify() {
      try {
        uni.showLoading({
          title: '识别中'
        });
        const res = await addressIntelligentRecogApi(this.addressInfo);
        if (res.statusCode === 20000 && res.data) {
          const result = res.data;
          this.form.name = result.person;
          this.form.mobile = result.phonenum;
          this.form.detailedAddress = result.province + result.city + result.county + result.town;
          this.address = result.detail;
        } else {
          this.ttoast({
            type: 'fail',
            title: '智能识别失败',
            content: res.statusMsg
          });
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '智能识别失败'
        });
      } finally {
        uni.hideLoading();
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../style/mixin.less';

.add-site-title {
  flex: 0 0 140upx;
  text-align: left;
  font-size: 28upx;
  color: #141000;

  // font-weight: bold;
  // height: 100%;
  &.add-site-title-checked {
    white-space: nowrap;
    width: auto;
  }
}

.add-site-container {
  // padding: 72upx 96upx 44upx 56upx;
  box-sizing: border-box;
  // .flex(flex-start, flex-start);
  // flex-direction: column;
  // height: 100%;
  background-color: #f6f6f6;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 150upx;

  .header {
    padding-top: 36upx;
    padding-left: 40upx;

    // .flex(center, flex-start);
    .return {
      width: 24upx;
      height: 48upx;
    }

    // .j-back-container {
    // 	margin-top: 10upx;
    // }

    // h2 {
    // 	font-size: 36upx;
    // 	font-weight: bold;
    // 	margin-left: 34upx;
    // }
  }

  .add-site-content {
    // flex: 1;
    // width: 100%;
    background: #ffffff;
    border-radius: 24upx;
    margin: 36upx 20upx 0 20upx;
    padding: 32upx 32upx 0 32upx;

    .item-wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      // margin-top: 46upx;
      // width: 100%;
      // height: 74upx;
      padding-bottom: 32upx;

      .uni-input-placeholder {
        font-size: 28upx;
        color: gray;
      }

      .common-text {
        color: #141000;
        font-size: 28upx;
        // padding-bottom: 20upx;
      }

      .add-site-value {
        flex: 1;
        // max-width: 340upx;
        // margin-right: 96upx;
        width: 100%;
        // height: 100%;
        border-bottom: 1px solid #f1f1f0;
      }

      textarea {
        width: 100%;
        height: 140upx;
      }

      .j-city {
        /deep/ .value {
          font-size: 28upx;
        }
      }
    }
  }

  .intelligent-recognition-wrapper {
    background: #ffffff;
    border-radius: 24upx;
    margin: 36upx 20upx 0 20upx;
    padding: 32upx 32upx 0 32upx;

    .placeholder {
      color: #8b8b8b;
      font-size: 28upx;
      margin: 10upx 0;
    }

    .identify-wrapper {
      text-align: right;
      padding: 30upx 0;

      .uni-btn {
        display: inline-block;
        padding: 10upx 20upx;
        font-size: 28upx;
        border-radius: 100px;
        background-color: #ffcb05;
        color: #ffffff;
      }
    }
  }

  /deep/ .uni-switch-input {
    &::before {
      background-color: #bebebe;
    }
  }

  /deep/.uni-switch-input.uni-switch-input-checked {
    background-color: #ffcb05 !important;
    border-color: #ffcb05 !important;
  }

  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 24upx 24upx 0upx 0upx;
    background: #ffffff;
    height: 120upx;

    .btn {
      // width: 380upx;
      // height: 73upx;
      .flex(center, center);
      font-size: 32upx;
      font-weight: 500;
      color: #fff;
      background-color: #ffcb05;
      border-radius: 44upx;
      margin: 0 32upx;
      margin-top: 18upx;
    }
  }
}
</style>
