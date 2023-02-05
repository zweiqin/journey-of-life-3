<template>
  <view class="apply-type-container vip-container">
    <view class="pane-title"> 申请信息填写 </view>

    <view class="pane-container">
      <view class="form-item" @click="chooseCityVisible = true">
        <view class="label">区域</view>
        <view class="wrapper">
          <JCity
            textColor="#000"
            style="flex: 1; paddingtop: 46upx"
            @confirm="handleChooseAddress"
            :text="form.area"
          ></JCity>
          <tui-icon class="arrowdown" :size="26" name="arrowdown"></tui-icon>
        </view>
      </view>

      <view class="form-item" @click="popupShow = true">
        <view class="label">业务责任人</view>
        <view class="wrapper">
          <tui-input
            placeholderStyle="color: gray"
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
        <view class="label">后台帐号</view>
        <view class="wrapper">
          <tui-input
            style="width: 100%"
            padding="0"
            v-model="form.username"
            :size="28"
            :borderBottom="false"
            placeholder="请填写后台帐号"
          ></tui-input>
        </view>
      </view>

      <view class="form-item" v-show="type === 'sup-partner'">
        <view class="label">后台密码</view>
        <view class="wrapper">
          <tui-input
            style="width: 100%"
            padding="0"
            v-model="form.password"
            :size="28"
            :borderBottom="false"
            placeholder="请填写后台密码"
          ></tui-input>
        </view>
      </view>
    </view>

    <tui-bottom-popup
      backgroundColor="transparent"
      :height="800"
      :show="popupShow"
      @close="closePopup"
    >
      <view class="businessResponsible-person-container">
        <view class="search-wrapper">
          <tui-input
            v-model="userName"
            style="flex: 1"
            :size="28"
            padding="20upx 0"
            placeholder="请输入业务负责人姓名"
          ></tui-input>
          <button class="uni-btn" @click="getBusinessResponsiblePersonList">
            搜索
          </button>
        </view>
        <view class="list">
          <scroll-view style="height: 700upx" scroll-y="true">
            <view
              @click="handlChoose(item)"
              class="item"
              v-for="item in businessResponsiblePersonList"
              :key="item.id"
            >
              <text>{{ item.userName }}</text>
              <text>{{ item.userLevelDesc }}</text>
            </view>
          </scroll-view>
        </view>
      </view>
    </tui-bottom-popup>
  </view>
</template>

<script>
import { getBusinessResponsiblePersonListApi } from '../../../../api/user'

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

  mounted() {
    this.getBusinessResponsiblePersonList()
  },

  data() {
    return {
      chooseCityVisible: false,
      form: {},
      popupShow: false,
      businessResponsiblePersonList: [],
      userName: '',
      currentBusinessPerson: {},
    }
  },

  methods: {
    handleChooseAddress(data) {
      console.log(data)
      this.form.area = data.area
      this.chooseCityVisible = false
      this.$emit('input', this.form)
      this.$emit('chooseCity', data)
    },

    // 获取业务责任人列表
    getBusinessResponsiblePersonList() {
      uni.showLoading({
        title: '加载中',
      })
      getBusinessResponsiblePersonListApi({
        userName: this.userName,
      }).then(({ data }) => {
        this.businessResponsiblePersonList = data
        uni.hideLoading()
      })
    },

    // 关闭popup
    closePopup() {
      this.popupShow = false
    },

    // 选择业务责任人
    handlChoose(item) {
      this.currentBusinessPerson = item
      this.form.personLiable = item.userName
      this.popupShow = false
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
/deep/ .address {
  .value {
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
      position: relative;
      margin: 20upx 0;

      .label{
        position: relative;
        padding-left: 10upx;

        &::after{
          content: "*";
          position: absolute;
          top: 0;
          left: -10upx;
          color: red;
        }
      }

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

        /deep/ .address {
          flex: 0 0 580upx;
          padding-top: 50upx;

          .value {
            width: 100%;
          }
        }
      }
    }
  }
}

.businessResponsible-person-container {
  width: 100%;
  height: 100%;
  background-color: #fff;

  .search-wrapper {
    width: 100%;
    height: 100upx;
    // background-color: aqua;
    display: flex;
    align-items: center;
    padding: 20upx;
    box-sizing: border-box;
    justify-content: space-between;

    .uni-btn {
      margin-left: 20upx;
      color: #fdc041;
      font-size: 28upx;
    }
  }

  .list {
    padding: 20upx 20upx;
    box-sizing: border-box;
    height: 700upx;
    // overflow: scroll;

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20upx 0;
      font-size: 28upx;
      border-bottom: 1upx solid rgb(246, 246, 246);

      text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:nth-child(1) {
          width: 400upx;
        }

        &:nth-child(2) {
          width: 288upx;
          text-align: right;
        }
      }
    }
  }
}
</style>
