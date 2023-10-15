<template>
  <view class="formBox">
    <view class="FormContainer">
      <view class="formHeader">门店业务</view>
      <tui-form ref="form">
        <view class="inputBox">
          <view class="moreSlectItem" @click="personalInformation.current = 1">
            <tui-input readonly label-color="#526787" label="业务范围" background-color="none" v-model="storeBusinessForm.businessScope" :borderBottom="false" placeholder="请输选择业务范围" disabled>
              <template #right>
                <image style="width: 30rpx; height: 30rpx; margin-right: 20rpx" src="@/static/images/entryOfMerchants/youjiantou.png" mode=""></image>
              </template>
            </tui-input>
          </view>
          <view class="moreSlectItem" @click="handleChooseLabels">
            <tui-input v-model="storeBusinessForm.businessLabel" readonly label-color="#526787" label="经营标签" background-color="none" :borderBottom="false" placeholder="请选择经营标签" disabled>
              <template #right>
                <image style="width: 30rpx; height: 30rpx; margin-right: 20rpx" src="@/static/images/entryOfMerchants/youjiantou.png" mode=""></image>
              </template>
            </tui-input>

            <view class="label-list" style="padding: 0 30upx 26upx; box-sizing: border-box; display: flex; align-items: center; flex-wrap: wrap; font-size: 24upx">
              <view
                class="item"
                style="border-radius: 8upx; color: #526787; padding: 3upx 15upx; border: 1rpx solid #526787; margin-right: 22upx; margin-bottom: 20upx"
                v-for="label in selectBusinessLabels"
                :key="label.id"
              >
                {{ label.labelName }}</view
              >
            </view>
          </view>
        </view>
      </tui-form>
    </view>
    <view class="nextSteps">
      <tui-button :loading="isLoading" @click="saveForm">确认提交</tui-button>
    </view>

    <tui-toast ref="toast"></tui-toast>
    <ChooseStylePopup @confirm="handleConfirmChooseLabels" ref="chooseStylePopupRef"></ChooseStylePopup>
  </view>
</template>

<script>
import { getShopStyleListApi, saveStoreBusinessApi } from '../../../../api/community-center';
import ChooseStylePopup from '../componrnts/ChooseStylePopup.vue';
import { getUserId } from '../../../../utils';
import { getAccountInfo, getBusinessInformation } from '../../../../api/community-center/merchantSettlement';

export default {
  name: 'StoreBusiness',
  components: {
    ChooseStylePopup
  },
  props: {
    personalInformation: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      originShopStyleList: [],
      shopStyleList: [],
      selectBusinessLabels: [],
      isLoading: false
    };
  },
  created() {
    this.getShopStyleList();
    this.getPrevPageInfo();
  },
  methods: {
    async getShopStyleList() {
      try {
        this.isLoading = true;
        const res = await getShopStyleListApi();
        this.originShopStyleList = JSON.parse(JSON.stringify(res));
        this.shopStyleList = res;
        const row = Math.ceil(res.length / 5);
        const emptyObjCount = 5 * row - res.length;
        for (let i = 0; i < emptyObjCount; i++) {
          this.shopStyleList.push({});
        }
        this.initBusinessLabel();
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: error,
          message: '行业标签获取失败'
        });
      } finally {
        this.isLoading = false;
      }
    },

    // 映射
    initBusinessLabel(isClear) {
      if (isClear) {
        this.selectBusinessLabels = [];
      }
      const labels = this.personalInformation.serviceInformation.businessLabel.split(',');

      if (Array.isArray(labels)) {
        labels.forEach((selectLabel) => {
          this.originShopStyleList.forEach((item) => {
            if (item.id == selectLabel) {
              this.selectBusinessLabels.push(item);
            }
          }, this);
        }, this);
      }
    },

    handleChooseLabels() {
      this.$refs.chooseStylePopupRef.show(this.personalInformation.serviceInformation.businessLabel.split(','), this.shopStyleList);
    },

    handleConfirmChooseLabels(selectLabels) {
      this.personalInformation.serviceInformation.businessLabel = selectLabels.join(',');
      this.initBusinessLabel(true);
    },

    // 获取account id
    async getPrevPageInfo() {
      if (!this.personalInformation.serviceInformation.accountId) {
        try {
          const accountInfo = await getAccountInfo({
            userId: getUserId()
          });

          this.personalInformation.serviceInformation.accountId = accountInfo.accountId;
        } catch (error) {
          this.ttoast({
            type: 'fail',
            title: '账户信息获取失败'
          });
        }
      }

      this.getBusinessInformation();
    },

    async getBusinessInformation() {
      const res = await getBusinessInformation({
        accountId: this.personalInformation.serviceInformation.accountId
      });

      this.personalInformation.serviceInformation.businessLabel = res.shopLabel;
      this.personalInformation.serviceInformation.scopeBusiness = res.skillExpertise && typeof res.skillExpertise === 'string' ?  res.skillExpertise.split(',') : res.skillExpertise
    },

    async saveForm() {
      if (this.isLoading) {
        return;
      }
      if (!this.personalInformation.serviceInformation.scopeBusiness.length) {
        this.ttoast({
          type: 'info',
          title: '请选择业务范围'
        });
        return;
      }

      if (!this.personalInformation.serviceInformation.businessLabel) {
        this.ttoast({
          type: 'info',
          title: '请选择经营标签'
        });
        return;
      }

      try {
        this.isLoading = true;
        await saveStoreBusinessApi({
          accountId: this.personalInformation.serviceInformation.accountId,
          skillExpertise: this.personalInformation.serviceInformation.scopeBusiness.join(','),
          shopLabel: this.personalInformation.serviceInformation.businessLabel
        });

        this.ttoast('提交成功，请等待管理员审核');
        setTimeout(() => {
          uni.switchTab({ url: '/pages/user/user' });
        }, 2000);
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: error,
          content: '提交失败'
        });
      } finally {
        this.isLoading = false;
      }
    }
  },
  computed: {
    storeBusinessForm() {
      const scopeBusinessCount = this.personalInformation.serviceInformation.scopeBusiness.length;
      return {
        businessScope: scopeBusinessCount ? `已选${scopeBusinessCount}个` : '',
        businessLabel: this.selectBusinessLabels.length ? `已选${this.selectBusinessLabels.length}个` : ''
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.moreSlectItem:active {
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);
}
.formBox {
  position: relative;
  box-sizing: border-box;
  padding: 10rpx 30rpx 180rpx 30rpx;
  width: 100vw;
  height: auto;
  flex: 1;
  .FormContainer {
    overflow: hidden; // 清除浮动
    width: 100%;
    /* height: 733rpx; */
    background-color: #fff;
    border-radius: 20rpx;
    .formHeader {
      font-weight: 600;
      font-size: 32rpx;
      margin-left: 30rpx;
      margin-top: 39rpx;
      color: #08377f;
    }
  }
  .imgFilesUpload {
    box-sizing: border-box;
    padding: 40rpx 30rpx;
    margin-top: 24rpx;
    .upload_Item {
      /* margin-top: 38rpx;
      margin-left: 30rpx; */
      .subtitle {
        font-size: 28rpx;
        font-weight: normal;
        line-height: 38rpx;
        color: #526787;
      }
      .uploadBox {
        display: flex;
        margin-top: 24rpx;
        width: auto;
        .ExampleImg {
          margin-left: 20rpx;
          position: relative;
          width: 220rpx;
          height: 226rpx;
          background: #f7fbff;
          border-radius: 12rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          .cnmd {
            width: 100%;
            height: 226rpx;
          }
          .gallery {
            border-radius: 12rpx;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            color: #f7fbff;
            text-align: center;
            font-size: 24rpx;
            font-weight: normal;
            line-height: 38rpx;
            background: #3982f1;
          }
          .avatarImg {
            margin-left: 20rpx;
            width: 100%;
            height: 100%;
            border-radius: 12rpx;
          }
        }
        .add-img-icon {
          margin-left: 20rpx;
          .add-icon {
            width: 60rpx;
            height: 60rpx;
          }
        }
        .bigExample {
          position: relative;
          width: 100%;
          height: 228rpx;
          background: #f7fbff;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .expItem {
            background: #f7fbff;
            width: 276.34rpx;
            height: 174.91rpx;
          }
          .gallery {
            border-radius: 12rpx;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            color: #f7fbff;
            text-align: center;
            font-size: 24rpx;
            font-weight: normal;
            line-height: 38rpx;
            background: #3982f1;
          }
        }
      }
      .uploadBig {
        margin-top: 38rpx;
        width: 100%;
        display: flex;
        justify-content: space-around;
        .add-img-icon {
          position: relative;
          display: flex;
          align-items: center;
          width: 305rpx;
          height: 184rpx;
          border-radius: 12rpx;
          justify-content: center;
          background: #f7fbff;
          .add-icon {
            width: 60rpx;
            height: 60rpx;
          }
          .big-img-icon {
            width: 305rpx;
            height: 184rpx;
          }
          .big-img-icon2 {
            width: 630rpx;
            height: 227rpx;
          }
        }
      }
    }
  }
  .nextSteps {
    box-sizing: border-box;
    position: absolute;
    padding: 18rpx 30rpx 50rpx 30rpx;
    bottom: 0;
    left: 0;
    /* margin-top: 128rpx; */
    width: 100%;
    height: 150rpx;
    background-color: #fff;
  }
}
.inputBox {
  width: 100%;
  height: 460rpx;
  display: flex;
  flex-direction: column;
}
.close-icon {
  position: absolute;
  top: -10upx;
  right: -10upx;
  width: 34upx;
  height: 34upx;
  z-index: 10;
}
</style>
