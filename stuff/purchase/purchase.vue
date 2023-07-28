<template>
  <view class="purchase-container">
    <NewHeader
      :class="{ fixed: scrollTop > 200 }"
      @back="handleBack"
      title="需求发布"
      position="left"
      top="61%"
      padding="40upx 60upx 20upx 12upx"
      tabbar="/pages/stuff/stuff"
    >
    </NewHeader>

    <view class="main-area">
      <view class="item">
        <view class="item-title">采购类型</view>
        <view class="item-value" @click="typeSelectVisible = true">
          <text>{{ form.type }}</text>
          <tui-icon name="arrowdown" :size="20"></tui-icon>
        </view>

        <tui-select maskClosable :list="typeList" :show="typeSelectVisible" @confirm="handleChooseType" @close="typeSelectVisible = false"></tui-select>
      </view>

      <view class="item">
        <view class="item-title">名称</view>
        <view class="item-value">
          <input type="text" v-model="form.name" placeholder="请填写材料名称" />
        </view>
      </view>

      <view class="item">
        <view class="item-title">数量</view>
        <view class="item-value">
          <view class="subtract op" :style="{ background: form.number > 1 ? '#ffc117' : '' }" @click="opNumber(-1)">-</view>
          <input type="text" readonly disabled class="number-input" v-model="form.number" />
          <view class="add op" @click="opNumber(1)">+</view>
        </view>
      </view>

      <view class="item">
        <view class="item-title">价格</view>
        <view class="item-value">
          <input type="number" v-model.number="form.price" />
        </view>
      </view>

      <view class="item">
        <view class="item-title">规格</view>
        <view class="item-value">
          <input type="text" v-model="form.sps" placeholder="请填写规格" />
        </view>
      </view>

      <view class="item">
        <view class="item-title">颜色</view>
        <view class="item-value">
          <input type="text" v-model="form.color" placeholder="请填写颜色" />
        </view>
      </view>

      <view class="item">
        <view class="item-title">日期</view>
        <view class="item-value select" @click="handleChooseDate">
          <input type="text" readonly disabled v-model="form.date" placeholder="请选择采购日期" />
          <tui-icon name="arrowdown" :size="20"></tui-icon>
        </view>

        <tui-calendar
          ref="calendar"
          lunar
          isFixed
          :type="2"
          activeBgColor="#ffc117"
          rangeBgColor="rgba(255,193,23,0.21)"
          @change="handleConfirmDate"
        ></tui-calendar>
      </view>

      <view class="item">
        <view class="item-title">备注</view>
        <view class="item-value">
          <input type="text" v-model="form.remark" placeholder="请填写您要备注的信息 (选填)" />
        </view>
      </view>

      <view class="item video-container">
        <view class="item-title">上床图片/视频</view>
        <view class="video">
          <view class="add-icon">
            <text>+</text>
            <view>图片</view>
          </view>

          <view class="add-icon">
            <text>+</text>
            <view>视频</view>
          </view>
        </view>
      </view>

      <view class="item">
        <view class="item-title">姓名</view>
        <view class="item-value">
          <input type="text" v-model="form.username" placeholder="请填写姓名" />
        </view>
      </view>

      <view class="item">
        <view class="item-title">电话</view>
        <view class="item-value">
          <input type="text" v-model="form.username" placeholder="请填写电话" />
        </view>
      </view>

      <view class="item">
        <view class="item-title">地址</view>
        <view class="item-value">
          <input type="text" v-model="form.username" placeholder="请填写地址" />
        </view>
      </view>
    </view>

    <button class="uni-btn submit">确定并发布</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        type: '求购材料',
        name: '',
        number: 1,
        price: 0.0,
        sps: '',
        color: '',
        date: '',
        remark: '',
        username: ''
      },

      scrollTop: 0,

      typeSelectVisible: false,
      typeList: ['求购材料', '同城急送', '紧急求购', '材料定制', '最新需求', '紧急需求', '长期需求']
    };
  },

  methods: {
    // 选择类型
    handleChooseType(e) {
      this.form.type = e.options;
      this.typeSelectVisible = false;
    },

    // 加减数量
    opNumber(temp) {
      if (this.form.number === 1 && temp === -1) {
        return;
      }

      this.form.number += temp;
    },

    // 选择日期
    handleChooseDate() {
      this.$refs.calendar.show();
    },

    // 确定选择
    handleConfirmDate(e) {
      this.form.date = e.startDate + '-' + e.endDate;
    },
    handleBack() {
      uni.navigateTo({
        url: '/pages/stuff/stuff'
      });
    }
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  }
};
</script>

<style lang="less" scoped>
/deep/ .tui-btn,
/deep/ .tui-select--btn {
  background-color: #ffc117 !important;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 10000;
}

.purchase-container {
  padding-bottom: 60upx;
}

.main-area {
  padding: 32upx;
  box-sizing: border-box;

  .item {
    display: flex;
    align-items: center;
    margin-bottom: 32upx;

    &.video-container {
      flex-direction: column;
      align-items: flex-start;

      .video {
        display: flex;
      }

      .add-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 168upx;
        height: 168upx;
        background-color: #f6f6f5;
        border-radius: 16upx;
        margin-top: 24upx;
        color: #d5d4d1;
        font-size: 28upx;
        line-height: 42upx;
        margin-right: 20upx;

        text {
          font-size: 70upx;
          margin-bottom: 10upx;
        }
      }
    }

    .item-title {
      width: 120upx;
      text-align: left;
      font-size: 28upx;
      line-height: 42upx;
      margin-right: 24upx;
      white-space: nowrap;
    }

    .item-value {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 96upx;
      background-color: #f6f6f5;
      border-radius: 16upx;
      padding: 27upx 24upx;
      box-sizing: border-box;

      &.select {
        display: flex;
        align-items: center;
      }

      input {
        flex: 1;
      }

      .number-input {
        text-align: center;
      }

      .op {
        width: 56upx;
        height: 48upx;
        border-radius: 8upx;
        text-align: center;
        color: #fff;
        font-size: 32upx;
        font-weight: bold;

        &.subtract {
          background-color: #e8e7e4;
        }

        &.add {
          background-color: #ffc117;
        }
      }
    }
  }
}

.submit {
  text-align: center;
  line-height: 96upx;
  width: 686upx;
  height: 96upx;
  font-size: 28upx;
  color: #fff;
  background-color: #ffe6a2;
  margin: 60upx auto;
  border-radius: 100px;
}
</style>
