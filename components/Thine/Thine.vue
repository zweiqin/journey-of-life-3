<template>
  <div>
    <view class="Thine">
      <img
        :src= "picUrl || 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/mu11ydme6t73slzqkjgc.png'  "
        alt=""
        class="hineImg"
      />
    </view>
    <view class="Thine">{{text || "暂无数据"}}</view>
  </div>
</template>

<script>
export default {
  name: "Thine",
  props: {
    picUrl:{
      type:String
      
    } ,
    text: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},

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
.Thine {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20upx;
  color: #999;
}
</style>