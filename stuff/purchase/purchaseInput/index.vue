<template>
  <div class="purchaseInput">
    <view v-for="item in fields" :key="item.value">
      <view class="w" :class="{ a: item.type != 'textArea' }">
        <view>{{ item.lable }}</view>
        <input
          v-if="item.type == 'input'"
          v-model="form[item.field]"
          type="text"
          class="input"
          placeholder="请输入内容"
          placeholder-class="input-placeholder"
        />
        <textarea
          v-else-if="item.type == 'textArea'"
          v-model="form[item.field]"
          class="textarea"
          type="text"
          placeholder="请输入求购描述"
          placeholder-class="input-placeholder1"
        />
        <view v-else-if="item.type == 'choseTime'" class="time">
          <uni-datetime-picker v-model="form[item.field]">
            <view style="display: flex; justify-content: flex-end">
              <view style="display: flex; justify-content: flex-end">{{
                form[item.field]
              }}</view>
              <img
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/0q0wv8gjzcw6syygzpk6.png "
                alt=""
                class="timeImg" /></view
          ></uni-datetime-picker>
        </view>
      </view>
      <view class="border"></view>
    </view>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  computed: {},
  methods: {},
  watch: {
    form: {
      handler(value) {
        console.log(value);
        this.$emit("input", value);
      },

      immediate: true,
      deep: true,
    },
  },
  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
.purchaseInput {
  font-size: 26upx;
  .w {
    margin: 20upx 0;
  }
  .border {
    border: 0.5px solid #d8d8d8;
  }
  .a {
    display: flex;
    justify-content: space-between;
  }
  .input-placeholder {
    display: flex;
    font-size: 26upx;
    justify-content: flex-end;
  }
  .input-placeholder1 {
    font-size: 26upx;
  }
  .time {
    display: flex;
    width: 400upx;

    .timeImg {
      width: 48upx;
      font-size: 48upx;
    }
  }
  .input {
    display: flex;
    justify-content: space-between;
  }
  .textarea {
    background-color: #efefef;
    padding: 20upx;
    width: 95%;
    display: flex;
    justify-content: space-between;
    border-radius: 20upx;
    margin-top: 20upx;
    height: 280upx;
  }
}
</style>