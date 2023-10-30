<template>
  <div class="spike"  v-if="productData.products && productData.products.length>0">
    <div class="spike-card">
      <div class="spike-card-top">
        <h2 class="spike-card-top-title">
          <!-- #ifdef MP-WEIXIN -->
          <img class="title-img" src="../../../static/images/spike/img-title.png" alt="秒杀专区" mode="widthFix"/>
          <!-- #endif -->
          <!-- #ifdef H5 || APP-PLUS -->
          <image class="title-img" src="../../../static/images/spike/img-title.png" alt="秒杀专区" mode="widthFix"/>
          <!-- #endif -->
        </h2>
        <div class="spike-card-top-time" v-if="state===2">
          活动已结束
        </div>
        <div class="spike-card-top-time" v-if="state !==2 && count.length">
          距离{{count[0]}}还有 <div class="span">{{count[1]}}:{{count[2]}}:{{count[3]}}</div>
        </div>
        <a class="btn-more" @click="jumpSeckills(productData)">更多<i class="iconfont icon-arrow-right"></i></a>
      </div>
      <div class="spike-card-list">
        <div class="spike-card-item"  v-for='item in productData.products.slice(0,4)' :key='item.productId' @click="jumpProductDetail(item)">
          <div class="spike-card-item-img">
            <img :src="item.image" alt="">
          </div>
          <div class="spike-card-item-info">
            <h3 class="name">
              {{item.productName}}
            </h3>
            <div class="stock">
              还剩{{item.stockNumber}}件
            </div>
            <div class="price-warp">
              <div class="price">
                ¥ {{item.price}}
              </div>
              <!-- <div class="original-price">
                ¥ {{item.originalPrice}}
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {commonMixin} from '../mixin'
export default {
  mixins: [commonMixin]
}
</script>

<style lang="scss" scoped>
.spike{
  background: #F8F8F8;
  padding: 20upx;
  &-card{
    height: 430upx;
    background: #FFFFFF;
    border-radius: 20upx;
    &-top{
      position: relative;
      padding: 32upx 0 22upx;
      display: flex;
      &-title{
        padding: 9upx 20upx 9upx 30upx;
        .title-img{
          width: 204upx;
          display: block;
        }
      }
      &-time{
        padding: 0 18upx;
        height: 50upx;
        background: linear-gradient(90deg, #C83732 0%, #E25C44 100%);
        box-shadow: 0px 6upx 12upx rgba(233, 0, 0, 0.3);
        opacity: 1;
        border-radius: 26upx;
        font-size: 24upx;
        line-height: 50upx;
        color: #fff;
        text-align: center;
        .span{
          display: inline;
        }
      }
      .btn-more{
        position: absolute;
        right: 8upx;
        top: 40upx;
        line-height: 33upx;
        padding-right: 25upx;
        font-size: 24upx;
        color: #333;
        .iconfont{
          content: '';
          font-size: 26upx;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
    &-list{}
    &-item{
      width: 50%;
      border-top: 1px solid  #F3F4F5;
      border-left: 1px solid  #F3F4F5;
      float: left;
      align-items: center;
      box-sizing: border-box;
      &:nth-child(2n+1){
        border-left: 0px;
      }
      &-img{
        width: 162upx;
        height: 162upx;
        margin-right: 10upx;
        float: left;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      &-info{
        height: 100%;
        margin-left: 172upx;
        width: 168upx;
        .name{
          font-size: 24upx;
          line-height: 40upx;
          color: #333333;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .stock{
          padding: 0 8upx;
          height: 40upx;
          border: 2upx solid #E4E5E6;
          line-height: 40upx;
          margin: 10upx 0;
          display: inline-block;
          font-size: 20upx;
          color: #C5AA7B;
        }
        .price{
          font-size: 32upx;
          font-weight: bold;
          line-height: 44upx;
          color: #C83732;
          padding-right: 10upx;
          display: inline-block;
        }
        .original-price{
          font-size: 20upx;
          line-height: 28upx;
          color: #CCCCCC;
          display: inline-block;
        }
      }
    }
  }
}
</style>
