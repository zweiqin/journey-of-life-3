<template>
  <view class="stuff-store-container" @click="handleToStoreHome(id)">
    <img
      class="store-img"
      :src="
        picUrl ||
        'https://img2.baidu.com/it/u=2083830934,4008812075&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=640'
      "
      alt=""
    />

    <view class="name">{{ name || "团蜂家具材料店" }}</view>
    <view class="tags">
      <text class="tag">材料供应商</text>
      <text class="tag">品质保证</text>
    </view>

    <view class="footer">
      <img
        :src="
          picUrl ||
          'https://img2.baidu.com/it/u=3949966856,2992083594&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
        "
        alt=""
        class="avatar"
      />
      <view class="sub-name">{{ desc || "团蜂家具材料商" }}</view>
    </view>
  </view>
</template>

<script>
import { getBrandListApi } from "../../../api/brand";
export default {
  // props: ["url"],
  data() {
    return {};
  },
  props: {
    name: String,
    picUrl: String,
    desc: String,
    id: Number,
  },
  // <view class="stuff-store-container"  @click="handleToStoreHome(id)">
  // 通过点击事件handleToStoreHome 拿到item.id的值。
  //id是在组件使用的界面拿到，并且传递到组件内的。
  //组件内没有id 全靠组件外传递
  //能拿到的不是查到的 是已经获取到的
  methods: {
    handleToStoreHome(id) {
      console.log("门店详情", id);
      uni.navigateTo({
        url: "/stuff/store/index?id=" + id,
      });
    },
    async getBrandList() {
      const res = await getBrandListApi({});
      console.log("stuff", res.data.brandList);
      this.brandList = res.data.brandList;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/var.less";
@import "../../../style/mixin.less";

.stuff-store-container {
  width: 340upx;
  border-radius: 20upx 20upx 0 0;
  // overflow: hidden;
  margin-bottom: 22upx;

  .store-img {
    width: 100%;
    height: 300upx;
    object-fit: cover;
    border-radius: 20upx 20upx 0 0;
  }

  .name {
    font-size: @f14;
    color: @c3d;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tags {
    margin: 10px 0;

    .tag {
      font-size: @f10;
      color: #ff8f1f;
      padding: 8upx 10upx;
      border: 1upx solid #ff8f1f;
      border-radius: 5px;
      margin-right: 10px;
    }
  }

  .footer {
    display: flex;
    margin-top: 10px;
    align-items: center;
    .avatar {
      .img(40upx, 50%);
    }

    .sub-name {
      color: @c9;
      font-size: @f10;
      margin-left: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>