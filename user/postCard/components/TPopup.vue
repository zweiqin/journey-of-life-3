<template>
  <view>
    <uni-popup ref="popup" :type="type" @change="windowAlter">
      <slot></slot>
    </uni-popup>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "center",
      //默认值
    },
    value: {
      type: Boolean,
      required: true,
      //required代表必传这个属性
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    windowAlter(e) {
      const a = e.show;
      //   const { show } = e;
      // 从e中拿出show 定义show = e.show
      if (!a) {
        this.$emit("input", false);
      }
    },
  },
  watch: {
    value: {
      handler(value) {
        if (value) {
          this.$refs.popup.open();
        } else {
          this.$refs.popup.close();
        }
      },
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
</style>