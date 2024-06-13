<template>
  <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="applyServePopupVisible" @close="handleClosePopup">
    <view class="popup-container">
      <view class="header">申请质保服务</view>
      <tui-form ref="tuiFormRef" :showMessage="false">
        <view class="main-wrapper">
          <view class="sub-title">问题反馈:</view>
          <tui-textarea
            v-model="applyServeForm.problemFeedback"
            isCounter
            placeholderStyle="color: #9E9E9E"
            :borderBottom="false"
            :borderTop="false"
            backgroundColor="#ebebeb"
            placeholder="请填写存在的问题"
          ></tui-textarea>
        </view>
      </tui-form>

      <view class="btn-wrapper flex-items flex-sp-between">
        <button class="uni-btn" @click="handleSubmit" :loading="loading">提交</button>
        <button class="uni-btn" @click="handleClosePopup">取消</button>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </tui-bottom-popup>
</template>

<script>
import { applyQualityAssuranceApi } from '../../../api/community-center'

const validateRules = [
  { name: 'qualityAssuranceCardSerialNumber', rule: ['required'], msg: ['质保卡编号为空'] },
  { name: 'problemFeedback', rule: ['required'], msg: ['请填写问题描述'] }
]

export default {
  data() {
    return {
      applyServePopupVisible: false,
      applyServeForm: {
        qualityAssuranceCardSerialNumber: '',
        problemFeedback: ''
      },
      loading: false
    }
  },

  methods: {
    // 打开弹框
    open(qualityAssuranceCardSerialNumber) {
      if (!qualityAssuranceCardSerialNumber) {
        this.ttoast({ type: 'fail', title: '质保卡编号为空' })
      }
      this.applyServePopupVisible = true
      this.applyServeForm.qualityAssuranceCardSerialNumber = qualityAssuranceCardSerialNumber
    },
    // 关闭弹框
    handleClosePopup() {
      this.applyServeForm.qualityAssuranceCardSerialNumber = ''
      this.applyServeForm.problemFeedback = ''
      this.applyServePopupVisible = false
    },

    async handleSubmit() {
      try {
        this.loading = true
        await this.$refs.tuiFormRef.validate(this.applyServeForm, validateRules)
        const res = await applyQualityAssuranceApi(this.applyServeForm)
        if (res.statusCode === 20000) {
          this.ttoast('提交成功')
          this.$emit('refresh')
          this.handleClosePopup()
        }else{
          throw new Error(res.statusMsg)
        }
      } catch (error) {
        this.ttoast({ type: 'fail', title: '提交失败', content: error.errorMsg || error.message })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .tui-textarea__wrap {
  border-radius: 10rpx;
}
.popup-container {
  width: 100vw;
  height: 646rpx;
  background-color: #fff;
  padding: 33rpx 49rpx 35rpx;
  box-sizing: border-box;

  .header {
    font-size: 35rpx;
    font-weight: bold;
    color: #000;
    text-align: center;
  }

  .main-wrapper {
    .sub-title {
      color: #000000;
      font-size: 30rpx;
      margin: 20rpx 0 30rpx 0;
    }
  }

  .btn-wrapper {
    margin-top: 56rpx;
    .uni-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      width: 300rpx;
      height: 100rpx;
      background-color: #979797;
      border-radius: 20rpx;
      transition: all 350ms;
      font-size: 35rpx;
      font-weight: bold;

      &:nth-child(1) {
        background-color: #ef530e;
      }

      &:active {
        opacity: 0.6;
      }
    }
  }
}
</style>
