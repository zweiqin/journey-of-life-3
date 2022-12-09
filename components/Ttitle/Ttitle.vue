<template>
  <view class="title">
    <img
      src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
      class="back"
      @click="back"
    />
    <view class="text">{{ title }}</view>
    <view v-if="search">
      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/l4syvc2hz42parggqf0o.png"
        alt=""
        class="search"
        @click="openInput"
      />
      <!-- <input type="text" class="input" @input="handleinput" :value="value" /> -->
    </view>
    <view class="search" v-else></view>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    search: Boolean,
    // value: {
    //   type: Object,
    //   required: true,
    // },
  },
  methods: {
    back() {
      uni.navigateBack();
    },
    openInput() {},
    handleinput(event) {
      //父组件在绑定v-model时，其实就绑定的input事件，因此父组件不需要再声明事件了
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  .back {
    width: 48upx;
    height: 48upx;
  }
  .text {
    font-size: 32upx;
    font-weight: 600;
  }
  .search {
    width: 40upx;
    height: 40upx;
  }
}
</style>>