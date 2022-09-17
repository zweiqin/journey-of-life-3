<template>
  <ul class="price-container">
    <li class="active">不限</li>
    <li>低价优先</li>
    <li>高价优先</li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin";

.price-container {
  padding: 0;

  li {
    position: relative;
    font-size: @f10;
    color: @c3d;
    margin: 14upx 0;

    &.active {
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        width: 20upx;
        height: 16upx;
        background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/uu3e6ncj0fw28nnjamqm.png")
          no-repeat;
        background-size: cover;
      }
    }
  }
}
</style>