<template>
  <view class="titleTop" v-if="type">
    <view class="left">
      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/uxyw2n475hb5hjrds4w7.png"
        alt=""
        class="leftImg"
      />
      <view class="title1">团蜂科技</view>
      <view class="setTitle">{{ title }}</view>
    </view>
    <img
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/rpzfezso0q481zrfv62s.png"
      class="rightImg"
    />
  </view>
</template>

<script>
export default {
  props: { title: String, type: Boolean },
  data() {
    return {
    };
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
.titleTop {
  display: flex;
  justify-content: space-between;
  padding: 40upx 0;
  .left {
    display: flex;
    align-items: center;
    width: 45%;
    justify-content: space-between;

    .leftImg {
      width: 40upx;
      height: 40upx;
    }
    .title1 {
      font-size: 28upx;
  font-family: auto;
  font-weight: 700;
      color: black;
    }
    .setTitle {
  font-family: auto;
  font-size: 26upx;
      font-weight: 500;
      color: #999;
    }
  }
  .rightImg {
    width: 40upx;
    height: 40upx;
  }
}
</style>