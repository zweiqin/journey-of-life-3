<template>
  <view class="enroll-container">
    <view class="user-info-field">
      <tui-form ref="form" backgroundColor="transparent">
        <tui-input
          class="name-wrapper"
          required
          label="姓名"
          borderTop
          placeholder="请输入姓名"
          v-model="form.customerName"
        ></tui-input>
        <tui-input
        disabled
          readonly
          required
          @click="sexVisible = true"
          label="性别"
          :lineLeft="false"
          placeholder="请选择您的性别"
          :value="form.customerGender === 1 ? '男' : '女'"
        ></tui-input>
        <tui-input
          required
          label="手机号"
          :lineLeft="false"
          placeholder="请输入手机号"
          v-model="form.customerPhone"
        ></tui-input>

        <tui-input
          label="公司名称"
          borderTop
          placeholder="请输入公司名称"
          v-model="form.companyName"
        ></tui-input>

        <tui-input
          label="职位"
          borderTop
          placeholder="请输入您的职位"
          v-model="form.customerPosition"
        ></tui-input>

        <tui-input
          type="number"
          label="参会人数"
          borderTop
          placeholder="请输入参会人数"
          v-model.number="form.participantsNumber"
        ></tui-input>

        <tui-input
          label="邀约人"
          borderTop
          placeholder="请输入邀约人"
          v-model="form.invite"
        ></tui-input>

        <tui-textarea
          label="备注"
          v-model="form.remarks"
          placeholder="请输入内容"
        ></tui-textarea>

        <button class="sunmit" @click="handleSubmint">确认报名</button>
      </tui-form>
    </view>

    <tui-select
      :list="['男', '女']"
      :show="sexVisible"
      @confirm="handleChooseSex"
      @close="sexVisible = false"
    ></tui-select>

    <tui-toast ref="toast"></tui-toast>

    <tui-popup
      :duration="500"
      :modeClass="['fade']"
      :styles="styles"
      :show="showPopupVisible"
    >
      <view class="success-wrapper">
        <tui-alerts type="success" title="报名成功"></tui-alerts>
        <image src="../../static/bc6d669b811f5a9f31805595a187514.png" mode="" />

        <view style="margin-top: 30rpx"
          ><tui-icon
            @click="showPopupVisible = false"
            color="#fff"
            name="close"
          ></tui-icon
        ></view>
      </view>
    </tui-popup>
  </view>
</template>

<script>
import { enrollApi } from '../../api/app'
import { yunxingRule } from './rules'
export default {
  onLoad() {
    this.reurl()
  },
  data() {
    return {
      form: {
        customerName: '',
        customerGender: 1,
        customerPhone: '',
        companyName: '',
        participantsNumber: '',
        customerPosition: '',
        invite: '',
        remarks: '',
      },

      sexVisible: false,
      sexValue: '男',
      showPopupVisible: false,
      styles: Object.freeze({
        position: 'fixed',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'background-color': 'rgba(0, 0, 0,0.6)',
      }),
    }
  },
  methods: {
    handleSubmint() {
      if (
        this.form.participantsNumber &&
        typeof this.form.participantsNumber !== 'number'
      ) {
        this.ttoast({
          title: '请输入正确的人数',
          type: 'fail',
        })

        return
      }
      const _this = this
      this.$refs.form
        .validate(this.form, yunxingRule)
        .then(async () => {
          try {
            await enrollApi(this.form)
            // _this.ttoast('报名成功')
            _this.form.customerName = ''
            _this.form.customerPhone = ''
            _this.form.companyName = ''
            _this.form.participantsNumber = ''
            _this.form.customerPosition = ''
            _this.form.invite = ''
            _this.form.remarks = ''

            uni.showLoading({
              title: '加载中',
            })

            setTimeout(() => {
              _this.showPopupVisible = true
              uni.hideLoading()
            }, 1000)
          } catch (error) {
            _this.ttoast({
              type: 'fail',
              title: '报名失败',
              content: '请稍后重新报名',
            })
          }
        })
        .catch(errors => {})
    },

    handleChooseSex(e) {
      const { options, index } = e
      this.form.customerGender = index + 1
      this.sexValue = options
      this.sexVisible = false
    },

    reurl() {
      let url = location.href

      var times = url.split('?')
      console.log(times)

      if (times[times.length - 1] != 1) {
        url += '?1'
        setTimeout(function () {
          self.location.replace(url)
        }, 1000)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.enroll-container {
  width: 100vw;
  min-height: 100vh;
  background: url('../../static/69bebd8e28f1910959a7a5c280f2e97.png') no-repeat;
  background-size: cover;
  padding-top: 608upx;
  box-sizing: border-box;
  background-color: #4c28d0;

  .user-info-field {
    padding: 40upx;
    box-sizing: border-box;

    .sunmit {
      margin-top: 30upx;
      // background: linear-gradient(to right, #880959, #5d4ac5);
      background-color: #00c4cd;
      color: #fff;
    }
  }

  /deep/ .tui-textarea__wrap {
    align-items: flex-start;
  }

  .success-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    image {
      border-radius: 0 0 6upx 6upx;
    }
  }

  .name-wrapper {
    /deep/ .tui-input__wrap {
      border-radius: 10rpx 10rpx 0 0;
    }
  }

  /deep/ .tui-textarea__wrap {
    border-radius: 0 0 10rpx 10rpx;
  }
}
</style>
