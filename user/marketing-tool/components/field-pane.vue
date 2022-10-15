<template>
  <view class="field-pane-container">
    <view class="title">{{ title }}</view>
    <view class="item" v-for="item in fields" :key="item.label">
      <template>
        <view
          class="input-wrapper"
          :style="{
            'flex-direction': item.type === 'textarea' ? 'column' : '',
            'align-items': item.type === 'textarea' ? 'flex-start' : '',
          }"
        >
          <view class="sub-title">{{ item.label }}</view>
          <input
            v-if="item.type === 'input'"
            @input="handleInput(item.field, $event)"
            :value="form[item.field]"
            class="input"
            type="text"
            :placeholder="item.placeholder"
          />

          <textarea
            @input="handleInput(item.field, $event)"
            v-if="item.type === 'textarea'"
            class="textarea"
            :placeholder="item.placeholder"
          ></textarea>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },

    value: {
      type: Object,
      required: true,
    },

    title: String,
  },

  data() {
    return {
      form: {},
    };
  },

  methods: {
    handleInput(field, e) {
      this.form[field] = e.detail.value;
    },
  },

  watch: {
    fields: {
      handler(value) {
        if (value) {
          const form = {};
          for (const item of value) {
            form[item.field] = this.value[item.field];
          }
          this.form = form;
        }
      },

      immediate: true,
      deep: true,
    },

    form: {
      handler(value) {
        this.$emit("input", value);
      },

      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/var.less";
@import "../../../style/mixin.less";

.field-pane-container {
  margin-top: 30upx;
  .title {
    font-size: @f14;
    color: #fa5151;
    font-weight: bold;
  }

  .item {
    padding: 20upx 0;
    border-bottom: 1upx solid #d8d8d8;
    margin-top: 20upx;

    .input-wrapper {
      .flex();
      font-size: @f12;
      color: @c3d;

      .sub-title {
        margin-right: 20upx;
      }

      /deep/ .uni-input-placeholder,
      /deep/ .uni-textarea-placeholder {
        font-size: @f12;
        color: @c9;
      }

      .input {
        flex: 1;
        font-size: @f12;
      }

      .textarea {
        margin-top: 20upx;
        width: 100%;
        height: 100px;
      }
    }
  }
}
</style>