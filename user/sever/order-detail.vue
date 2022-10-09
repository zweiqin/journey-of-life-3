<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-29 17:31:49
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-10-05 16:40:12
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\user\sever\order-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="pre-order">
    <OrderPanel1></OrderPanel1>
  </view>
</template>

<script>
import OrderPanel1 from "../../components/order-panel1";
export default {
  components: {
    OrderPanel1,
  },
  data() {
    return {
      goodsDetail: [],
    };
  },
  methods: {
    goodsdetail() {},
  },

  onLoad: function (option) {
    const goodsDetail = uni.getStorageSync("CAR_GOODS_DETAIL");
    let goods = [];
    for (const item of goodsDetail) {
      goods = goods.concat(item.cartList)
    }

    console.log(goods);
    uni.setStorageSync('CAR_GOODS_DETAILS', goods)

  },
};
</script>

<style lang="less" scoped>
</style>