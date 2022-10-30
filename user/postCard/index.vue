<template>
  <view>
    <view class="background">
      <img
        src="	
https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/5yrh2paxxwv3r3xixlbz.png"
        alt=""
        class="title-img"
      />
      <view class="title-text">数 字 化 营 销 的 领 跑 者</view>
      <view class="newPostCard" @click="newpostcard">新建名片</view>
      <view class="myPostCard" @click="mypostcard">我的名片</view>
      <view class="back">退出</view>
    </view>
  </view>
</template>

<script>
export default {
    methods:{
        newpostcard(){
            uni.navigateTo({ url: './addPostCard' })
        },
        mypostcard(){
            uni.navigateTo({ url: './myPostCard' })
        }
    }
};
</script>

<style lang="less" scoped>
.background {
  width: 100%;
  height: 1600upx;
  background: #183869;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title-img {
    height: 520upx;
    width: 750upx;
  }
  .title-text {
    font-size: 48upx;
    font-weight: 400;
    color: white;
    position: relative;
    top: -170upx;
  }
  .newPostCard {
    color: white;
    font-size:36upx;
    font-weight:400;
    margin:10upx 0;
    border: 0.5px solid #999999;
    border-radius: 100upx;
    padding: 10upx 60upx;
}
  .myPostCard {
    color: white;
    font-size:36upx;
    font-weight:400;
    margin:10upx 0;
    border: 0.5px solid #999999;
    border-radius: 100upx;
    padding: 10upx 60upx;
}
  .back {
    color: white;
    font-size:36upx;
    font-weight:400;
    margin:10upx 0
}
}
</style>