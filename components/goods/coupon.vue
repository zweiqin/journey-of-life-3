<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-21 18:44:16
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-21 19:17:42
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\components\goods\coupon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="background">
    <view class="top-title">热销推荐</view>
    <img
      class="middle-img"
      :src="
        url ||
        'https://img2.baidu.com/it/u=1766258309,950066704&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=305'
      "
      alt=""
    />
    <view class="bottom">
      <view class="name">{{ name || "GLOSTAD" }}</view>
      <view class="detail">{{ sname || "二人沙发" }}</view>
      <view class="money">
        <view class="left">
          <text class="icon">￥</text>
          <text class="price">{{ price || "1562.0" }}</text>
        </view>
      </view>
      <view class="button">立即购买</view>
    </view>
  </view>
</template>

<script>

export default {};
</script>

<style lang="less" scoped>
.background {
  border-radius: 20upx;
  background: linear-gradient(180deg, #fefbfb 0%, #f1dfdf 100%);
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
}
</style>