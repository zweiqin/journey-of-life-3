<template>
  <view class="regional-agent-container">
    <view class="regional-agent-title">
      <tui-icon @click="handleBack" name="arrowleft" color="#fff"></tui-icon>
    </view>
    <view class="main-area">
      <view class="title">区域代理申请</view>
      <view class="item">
        <view class="item-title">区域</view>
        <view class="field-wrapper">
          <!-- <input disabled readonly type="text" placeholder="请选择代理区域" /> -->
					<JAnyCity :text="cityText" @confirm="handleChooseCity"></JAnyCity>
          <tui-icon name="arrowdown" :size="24"></tui-icon>
        </view>
      </view>

      <view class="item">
        <view class="item-title">详细地址</view>
        <view class="field-wrapper">
          <input v-model.trim="form.companyAddress" type="text" placeholder="请填写您的详细地址" />
        </view>
      </view>

      <view class="item">
        <view class="item-title">姓名</view>
        <view class="field-wrapper">
          <input v-model.trim="form.legalPerson" type="text" placeholder="请填写您的姓名" />
        </view>
      </view>

      <view class="item">
        <view class="item-title">手机号</view>
        <view class="field-wrapper">
          <input v-model.trim="form.legalP" type="number" placeholder="请填写您的手机号" />
        </view>
      </view>

      <button @click="submit" class="uni-btn">确定申请</button>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import form from '../../../components/common/tui-validation/tui-validation'
const rules = [
  {
    name: 'legalPerson',
    rule: ['require'],
    msg: ['请填写您的姓名'],
  },
  {
    name: 'legalP',
    rule: ['required', 'isMobile'],
    msg: ['请输入手机号', '请输入正确的手机号'],
  },
  {
    name: 'companyAddress',
    rule: ['required'],
    msg: ['请填写您的详细地址'],
  },
  {
    name: 'agentCode',
    rule: ['required'],
    msg: ['请选择代理区域'],
  },
]
import { getUserId } from '../../../utils'
import {
  applyRegionagentApi,
  getApplyRegionagentStatusApi,
} from '../../../api/user'
export default {
  data() {
    return {
      form: {
        userId: getUserId(),
        legalPerson: '',
        legalP: '',
        agentCode: '',
        companyAddress: '',
      },
      cityText: '',
    }
  },

  onLoad() {
    this.getApplyRegionagentStatus()
  },

  methods: {
    handleChooseCity(data) {
      this.cityText = data.area
      this.form.agentCode = (data.county.code || data.city.code || data.province.code) + ''
    },

    // 提交申请
    async submit() {
      const vali = form.validation(this.form, rules)
      if (!vali) {
        try {
          await applyRegionagentApi(this.form)
          uni.showToast({
            title: '提交申请成功，请等待管理员审核',
            duration: 2000,
            icon: 'none',
          })
          this.form = {
            userId: getUserId(),
            legalPerson: '',
            legalP: '',
            agentCode: '',
            companyAddress: '',
          }
        } catch (error) {
          uni.showToast({
            title: error,
            duration: 2000,
            icon: 'none',
          })
        }
      } else {
        uni.showToast({
          title: vali,
          duration: 2000,
          icon: 'none',
        })
      }
    },

    async getApplyRegionagentStatus() {
      const { data } = await getApplyRegionagentStatusApi({
        userId: getUserId(),
      })

      console.log(data)
    },

    handleBack() {
      uni.switchTab({
        url: '/pages/user/user',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.regional-agent-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #ffdb52;
  background: url('../../../static/images/user/daili/bg.png') no-repeat;
  background-size: cover;
  box-sizing: border-box;
  padding-top: 200upx;

  .regional-agent-title {
    position: absolute;
    top: 40upx;
    left: 32upx;
  }

  .main-area {
    position: relative;
    width: 622upx;
    min-height: 500px;
    background-color: #fff;
    margin: 0 auto;
    padding: 112upx 32upx 40upx;
    box-sizing: border-box;
    border-radius: 24upx;

    .title {
      position: absolute;
      color: #fff;
      width: 502upx;
      height: 112upx;
      background: url('../../../static/images/user/daili/title-wrapper.png') no-repeat;
      background-size: cover;
      top: -26upx;
      left: 50%;
      transform: translateX(-50%);
      font-size: 42upx;
      font-weight: bold;
      text-align: center;
      line-height: 112upx;
    }

    .item {
      margin-bottom: 30upx;

      .item-title {
        color: #3a3629;
        font-size: 28upx;
        margin-bottom: 18upx;
      }

      .field-wrapper {
        width: 100%;
        background-color: #f6f6f5;
        height: 96upx;
        border-radius: 16upx;
        padding: 27upx 24upx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        input {
          flex: 1;
          font-size: 28upx;
        }
      }
    }

    .uni-btn {
      border-radius: 100px;
      height: 96upx;
      background-color: #ffd152;
      margin-top: 68upx;
      font-size: 28upx;
      color: #fff;
      line-height: 96upx;
      font-weight: 500;
    }
  }
}

/deep/ .diqu {
  height: auto !important;
}

/deep/ .j-city {
  width: 100%;
}

/deep/ .address .value {
  width: 100%;
  font-size: 28upx;
}
</style>
