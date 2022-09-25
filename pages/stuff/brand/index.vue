<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-25 19:35:59
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-25 20:26:02
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\stuff\brand\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <view class="background">
      <view class="title">品牌</view>
      <img
        src="../../../static/images/stuff/家具材料排行榜.png"
        alt=""
        class="title-img"
      />
      <img
        src="../../../static/images/stuff/lasttitle.png"
        alt=""
        class="title-lastimg"
      />
      <view class="second-background">
        <view class="thistitle" v-for="(item, id) in nameList" :key="id">
          {{ item.name }}
        </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameList: [
        {
          id: 1,
          name: "品牌",
        },
        {
          id: 2,
          name: "店铺",
        },
        {
          id: 3,
          name: "销量",
        },
        {
          id: 4,
          name: "最热",
        },
        {
          id: 5,
          name: "材料",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.background {
  background-color: #3662ec;

  .title {
    padding-top: 74upx;
    color: white;
    font-size: 32upx;
    font-weight: 500;
  }
  .title-img {
    margin-top: 37upx;
    margin-left: 146upx;
    width: 460upx;
    height: 60upx;
  }
  .title-lastimg {
    margin-left: 146upx;
    width: 440upx;
    height: 220upx;
  }
  .second-background {
    background-color: white;
    border-radius: 20upx;
    width: 700upx;
    height: 10000upx;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: space-around;

    top: -52upx;
    .thistitle {
    }
  }
}
</style>