<template>
  <!-- <view class="title">{{}}</view> -->
  <view class="form" @click="handeViewDetail">
    <view class="sub">
      <img
        :src="
          picUrl ||
          require('../../static/images/new-user/default-user-avatar.png')
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
  name: "sort",
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
    handeViewDetail() {
      if (!this.id) {
        return;
      }
      uni.navigateTo({
        url: `/pages/prod/prod?goodsId=${this.id}`,
      });
    },
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
  padding-right: 10upx;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-bottom: 6upx;
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
