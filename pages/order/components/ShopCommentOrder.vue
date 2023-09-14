<template>
  <view class="shop-comment-order-container">
    <view class="order-no-status comment-wrapper">
      <view class="comment">
        <text class="comment-title">我的评论：</text>
        {{ item.content }}
      </view>
      <view class="comment" v-if="item.commentGoods1">
        <text class="comment-title">我的追评：</text>
        {{ item.commentGoods1 && item.commentGoods1.content }}</view
      >
      <view class="comment" v-if="item.commentGoods2">
        <text class="comment-title">商家回复：</text>
        {{ item.commentGoods2.content }}</view
      >
    </view>

    <view class="goods-list" @click="handleToViewOrderDetail(item)">
      <view class="goods-item" style="margin-bottom: 0">
        <image class="goods-img" :src="item.dtsTfGoods.picUrl" mode="" />

        <view class="info">
          <view class="name">{{ item.dtsTfGoods.name }}</view>

          <view class="good-sp-pr">
            <view class="pr"
              >￥{{ item.dtsTfGoods.counterPrice }} <text v-if="item.dtsTfGoods.unit">/ {{ item.dtsTfGoods.unit }}</text></view
            >
          </view>
        </view>
      </view>
    </view>

    <view class="goods-ops" style="justify-content: flex-end">
      <view class="btns">
        <button v-if="!item.commentGoods1" @click="handleCommentAgain(item)" class="uni-btn">追加评价</button>
        <button v-else class="uni-btn" style="background-color: transparent; color: #3d3d3d">已追评</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
