<template>
  <view class="application-container">
    <TuanPageHead title="邀请" background="#fff">
      <tui-icon @click="handleBack" style="margin-left: -28upx" slot="left" color="#000" :size="28" name="arrowleft"></tui-icon>
    </TuanPageHead>

    <view class="application-content">
      客家话参加考试单据号说法很大萨卡打卡机说法合计广大司机GV会更大号成绩单GV结果登记序号较大选举初级中初级中级车甲AH就好几次干啥子精细化工成绩在干哈成绩干哈最喜欢就不错就这些更好成绩中间件吃饺子HC建筑工程直接
    </view>

    <view class="footer">
      <button :loading="isLoading === '1'" class="uni-btn confirm" @click="handleClickBtn('1')">同意</button>
      <button :loading="isLoading === '2'" class="uni-btn" @click="handleClickBtn('2')">拒绝</button>
    </view>

    <tui-modal :show="modalVisible" title="提示" :content="modalContent" @click="handleClick"></tui-modal>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { shareholderApprStoreBindApplicationApi } from '../../../api/community-center'
import { USER_ID } from '../../../constant'
export default {
  data() {
    return {
      modalVisible: false,
      applicationForm: {
        applicationId: undefined,
        approveAct: undefined // 1: 同意, 2：拒绝
      },
      isLoading: ''
    }
  },

  onLoad(options) {
    this.applicationForm.applicationId = options.id
    if (!options.id) {
      this.home()
    }
    if (!uni.getStorageSync(USER_ID)) {
      uni.redirectTo({ url: `/pages/login/login?to=/user/sever/application/application?id=${options.id}` })
    }
  },

  methods: {
    handleBack() {
      getCurrentPages().length <= 1 ? this.home() : uni.navigateBack()
    },
    async handleClick(e) {
      if (!e.index) {
        this.applicationForm.approveAct = ''
        this.modalVisible = false
      } else {
        try {
          this.isLoading = this.applicationForm.approveAct
          this.modalVisible = false
          const res = await shareholderApprStoreBindApplicationApi(this.applicationForm)
          if (res.statusCode === 20000) {
            this.ttoast('操作成功')
            setTimeout(() => {
              this.home()
            }, 2000)
          } else {
            throw new Error(res.statusMsg)
          }
        } catch (error) {
          this.ttoast({ type: 'fail', title: '操作失败', content: error.message || error })
        } finally {
          this.isLoading = ''
        }
      }
    },
    handleClickBtn(e) {
      this.applicationForm.approveAct = e
      this.modalVisible = true
    },

    home() {
      uni.switchTab({ url: '/' })
    }
  },

  computed: {
    modalContent() {
      return this.applicationForm.approveAct === '1' ? '确认同意成为股东?' : this.applicationForm.approveAct === '2' ? '确认拒绝成为股东？' : ''
    }
  }
}
</script>

<style lang="less" scoped>
.application-container {
  width: 100%;
  min-height: 100vh;
  background-color: #ffece5;

  .application-content {
    width: 93vw;
    margin: 20rpx auto 0;
    background-color: #fff;
    padding: 20rpx;
    border-radius: 20rpx;
    box-sizing: border-box;
    font-size: 30rpx;
    color: #3d3d3d;
    line-height: 1.5;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    background-color: #fff;

    .uni-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 88rpx;
      border-radius: 10rpx;
      background-color: #ccc;
      font-size: 28rpx;
      color: #fff;

      &.confirm {
        background-color: #fa5e2a;
        margin-right: 20rpx;
        font-weight: 500;
      }
    }
  }
}
</style>
