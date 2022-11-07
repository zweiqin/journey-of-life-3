<template>
  <view class="title">
    <img
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/nhmcr5vmidiujek9l3dt.png"
      class="back"
      @click="back"
    />
    <view class="text">{{ title }}</view>
    <view v-if="search">
    <img
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/l4syvc2hz42parggqf0o.png"
      alt=""
      class="search"
    />
</view>
    <view class="search" v-else></view>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    search:Boolean,
  },
  methods: {
    back(){
        uni.navigateBack()
    }
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
  .search{
    width: 40upx;
    height: 40upx;
  }
}
</style>>