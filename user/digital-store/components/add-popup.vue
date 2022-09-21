<template>
  <uni-popup ref="popup" type="bottom">
    <view class="add-popup-cintainer">
      <view class="title">转化设置</view>
      <view class="item">
        <view class="sub-title">报警时间</view>
        <view class="value">
          <input type="number" v-model.number="form.time" class="input" />
        </view>
      </view>

      <view class="item">
        <view class="sub-title">客户姓名</view>
        <view
          :style="{
            color: form.userName ? '#3d3d3d' : '#cccc',
          }"
          class="value"
          @click="chooseCusName"
        >
          {{ form.userName ? form.userName : "请选择转化的客户" }}
        </view>
      </view>

      <view class="item">
        <view class="sub-title">话术选择</view>
        <view
          :style="{
            color: form.words ? '#3d3d3d' : '#cccc',
          }"
          class="value"
          @click="chooseWords"
        >
          {{ form.words ? form.words : "请选择话术" }}
        </view>
      </view>

      <view class="item">
        <view class="sub-title">报警前后</view>

        <view class="value" style="flex: 1">
          <radio-group @change="radioChange">
            <label class="uni-list-cell uni-list-cell-pd">
              <view>
                <radio value="报警前" />
              </view>
              <view>报警前</view>
            </label>

            <label class="uni-list-cell uni-list-cell-pd">
              <view>
                <radio value="报警后" />
              </view>
              <view>报警后</view>
            </label>
          </radio-group>
        </view>
      </view>

      <view class="btn" @click="submit">提交</view>
    </view>
  </uni-popup>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },

    type: {
      type: Number,
      required: true,
    },

    words: {
      type: String,
    },
  },
  data() {
    return {
      form: {
        time: 7,
        userName: "",
        words: "",
        trigger: "",
      },
    };
  },
  methods: {
    open() {
      this.$refs.popup.open("center");
    },

    close() {
      this.$refs.popup.close();
    },

    clear(){
      this.form.userName = ''
      this.form.trigger = ''
      this.form.words = ''
    },

    /**
     * @description 点击选择客户姓名
     */
    chooseCusName() {
      const _this = this;
      const userList = this.list.length
        ? this.list.map((item) => item.userName)
        : ["无客户信息"];

      uni.showActionSheet({
        itemList: userList,
        success: function (res) {
          _this.form.userName = userList[res.tapIndex];
        },
        fail: function (res) {},
      });
    },

    /**
     * @description 点击选择话术
     */
    chooseWords() {
      uni.navigateTo({
        url:
          "/user/digital-store/choose-words?type=" + this.type + "&select=true",
      });
    },

    /**
     * @description 切换radio
     */
    radioChange(value) {
      this.form.trigger = value.detail.value;
    },

    /**
     * @description 提交
     */
    submit() {
      for (let key in this.form) {
        if (!this.form[key]) {
          uni.showToast({
            title: "请完善设置信息再提交",
            duration: 2000,
            icon: "none",
          });

          return;
        }
      }
      this.close();

      uni.showToast({
        title: "设置成功",
        duration: 2000,
      });
    },
  },

  watch: {
    words: {
      handler(value) {
        this.form.words = value;
      },

      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .uni-list-cell {
  display: flex;
  margin: 10px 0;
}

.add-popup-cintainer {
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;

  .title {
    text-align: center;
    font-weight: bold;
  }

  .item {
    display: flex;
    margin: 30upx 0;
    font-size: 14px;

    .sub-title {
      margin-right: 20px;
    }

    .input {
      text-align: center;
      border: 1px solid rgb(219, 219, 219);
      border-radius: 5px;
    }
  }

  .btn {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-top: 1upx solid #ccc;
    color: #02adff;
    padding: 20upx 0;
  }
}
</style>