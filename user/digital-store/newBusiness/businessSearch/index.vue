<template>
  <view class="businessSearch">
    <image
      src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/2iru69wqtidchb8m7oy1.png"
      class="searchImg"
      mode="scaleToFill"
    />
    <input
      class="searchInput"
      @input="importInput"
      placeholder="输入手机号或昵称搜索"
      placeholder-class="input-placeholder"
    />
  </view>
</template>

<script>
import { handleDebounce } from "../../../../utils";
export default {
  name: "businessSearch",
  props: {},
  data() {
    return { searchText: "", importInput: "" };
  },
  computed: {},
  methods: {
    search(e) {
      console.log(e.detail.value);
      this.searchText = e.detail.value
      this.$emit("select", this.searchText);
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.importInput = handleDebounce(this.search, 500);
  },
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
.businessSearch {
  display: flex;
  background: #efefef;
  border-radius: 40upx;
  padding: 16upx 0;
  .searchImg {
    margin: 0 32upx;
    height: 40upx;
    width: 40upx;
  }
  .searchInput {
    flex: 1;
    font-size: 28upx;
  }
  .input-placeholder {
    font-size: 28upx;
  }
}
</style>