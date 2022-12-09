<template>
  <!-- <view class="title">{{}}</view> -->
  <view class="form" @click="handeViewDetail">
    <view class="sub">
      <img
        :src="
          picUrl ||
          'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/lgu5io706xc02zrlkezh.png'
        "
        alt=""
        class="goods"
      />

      <view class="name">{{ name }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    detailList: Array,
    name: String,
    picUrl: String,
    id: [Number, String],
  },
  data() {
    return {};
  },
  methods: {
    // handeViewDetail() {
    //   if (!this.id) {
    //     return;
    //   }
    //   uni.navigateTo({
    //     url: `/pages/prod/prod?goodsId=${this.id}`,
    //   });
    // },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
// width: 100%;
// .title {
//   font-size: 32upx;
//   font-weight: bold;
//   color: #3d3d3d;
// }
.form {
  margin-top: 20upx;
  padding-right: 16upx;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .sub {
    width: 160upx;
    // margin-bottom: 70upx;
    margin-right: 16upx;
    .goods {
      width: 160upx;
      height: 160upx;
      border-radius: 20upx;
    }
    .name {
      font-size: 28upx;
      color: #3d3d3d;
      text-align: center;
      width: 160upx;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      // overflow: hidden;
      overflow: hidden;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
