<template>
  <view class="apply-type-container vip-container">
    <view class="pane-title"> 申请信息填写 </view>

    <view class="pane-container">
      <view class="form-item" @click="chooseCityVisible = true">
        <view class="label">区域</view>
        <view class="wrapper">
          <JCity
            style="flex: 1; paddingTop: 46upx"
            @confirm="handleChooseAddress"
            :text="form.area"
          ></JCity>
          <tui-icon class="arrowdown" :size="26" name="arrowdown"></tui-icon>
        </view>
      </view>

      <view class="form-item">
        <view class="label">业务责任人</view>
        <view class="wrapper">
          <tui-input
            style="width: 100%"
            padding="0"
            v-model="form.personLiable"
            :size="28"
            disabled
            :borderBottom="false"
            placeholder="请选责任人"
          ></tui-input>
          <tui-icon class="arrowdown" :size="26" name="arrowdown"></tui-icon>
        </view>
      </view>

      <view class="form-item" v-show="type === 'sup-partner'">
        <view class="label">帐号</view>
        <view class="wrapper">
          <tui-input
            style="width: 100%"
            padding="0"
            v-model="form.username"
            :size="28"
            :borderBottom="false"
            placeholder="请填写帐号"
          ></tui-input>
        </view>
      </view>

      <view class="form-item" v-show="type === 'sup-partner'">
        <view class="label">密码</view>
        <view class="wrapper">
          <tui-input
            style="width: 100%"
            padding="0"
            v-model="form.password"
            :size="28"
            :borderBottom="false"
            placeholder="请填写密码"
          ></tui-input>
        </view>
      </view>
    </view>

    <!-- <ChooseCity
      @confirm="handleChooseAddress"
      v-model="chooseCityVisible"
    ></ChooseCity> -->
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },

    value: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      chooseCityVisible: false,
      form: {},
    }
  },

  methods: {
    handleChooseAddress(data) {
      console.log(data)
      this.form.area = data.area
      this.chooseCityVisible = false
      this.$emit('input', this.form)
    },
  },

  watch: {
    value: {
      handler(value) {
        this.form = value
      },

      deep: true,
      immediate: true,
    },

    type(value) {
      if (value === 'sup-partner') {
        this.form.username = null
        this.form.password = null
        this.$emit('input', this.form)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@color: #424890;
/deep/ .address{
  .value{
    font-size: 30upx;
    color: #cfcccf;
  }
}
.apply-type-container {
  width: 100%;
  .pane-container {
    margin-top: 20upx;
    margin-bottom: 20upx;
    width: 100%;

    .form-item {
      margin: 20upx 0;
      .wrapper {
        margin: 20upx 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 60upx;
        border-radius: 10upx;
        border: 1upx solid #fdc041;
        padding-right: 50upx;
        padding-left: 6upx;
        box-sizing: border-box;

        .arrowdown {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 2upx;
        }
      }
    }
  }
}
</style>
