<template>
  <view class="d-field">
    <view class="main">
      <view
        v-if="data.label"
        class="title"
        :class="data.require ? 'require' : ''"
        :style="{ 'padding-left': data.require ? '' : 0 }"
      >
        {{ data.label }}
      </view>
      <view style="flex: 1">
        <slot>
          <input
            v-if="!data.select"
            class="field"
            v-model="userValue"
            type="text"
            :placeholder="data.placeholder"
          />
          <view
            v-else
            class="field"
            style="color: #b2b2b2"
            @click="handleSelect(data.field)"
          >
            {{ data.placeholder }}
          </view>
        </slot>
      </view>
      <img
        class="img"
        :style="{
          width: data.width + 'px',
          height: data.height + 'px',
        }"
        :src="data.icon"
        alt=""
      />
    </view>

    <view class="name-slot">
      <slot name="row"></slot>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userValue: "",
    };
  },
  methods: {
    handleSelect(value) {
      this.$emit("select", value);
    },
  },
  watch: {
    value: {
      handler(newValue) {
        this.userValue = newValue;
      },
      immediate: true,
    },
    userValue: {
      handler() {
        this.$emit("input", this.userValue);
      },
    },
  },
};
</script>
<style scoped lang="less">
.d-field {
  .name-slot {
    display: flex;
    align-items: center;
    padding: 10upx 34upx;
  }
  .main {
    display: flex;
    padding: 30upx 34upx;
    align-items: center;

    .title {
      color: #000;
      font-size: 34upx;
      padding: 0 30upx 0 24upx;

      &.require {
        position: relative;
        padding-left: 20upx;
        &::before {
          content: "*";
          display: block;
          position: absolute;
          top: -15%;
          left: 0;
          color: red;
        }
      }
    }

    .field {
      font-size: 34upx;

      &::placeholder {
        color: #b2b2b2;
      }
    }
  }
}
</style>
