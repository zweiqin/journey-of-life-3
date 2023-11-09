<template>
  <view class="goods-detail-container" v-if="goodsDetail">
    <tui-toast ref="toast"></tui-toast>
        <!-- 轮播图 -->
    <view class="carousel-wrapper">
      <Carousel :list="goodsDetail.images.map(item => common.seamingImgUrl(item))" :height="390" :top="0" :radius="0"></Carousel>

      <view class="header-top" :style="{ opacity: !showTopNav ? 1 : 0 }">
        <view>
          <image @click="handleBack" src="../../static/images/detail/back.png" mode="" />
        </view>

        <view style="display: flex">
          <image style="margin-right: 20upx" @click="empty()" src="../../static/images/detail/brand.png" mode="" />

          <BeeWxShare @click="handleShareGoods" ref="beeWxShareRef">
            <image src="../../static/images/detail/share.png" mode="" />
          </BeeWxShare>
        </view>
      </view>

      <view
        class="scroll-top-nav"
        :style="{
          opacity: showTopNav && isShowTop ? 1 : 0,
          'z-index': showTopNav ? 100 : -1
        }"
      >
        <!-- #ifdef H5 -->
        <image @click="handleBack" src="../../static/images/detail/top-back.png" mode="" />
        <!-- #endif -->

        <view class="center">
          <view class="item" :class="{ active: currentMoveTag == 0 }" @click="moveToDetail(0)">商品</view>

          <view
            :class="{
              active: currentMoveTag == 1
            }"
            class="item"
            @click="moveToDetail(1)"
          >
            评价
          </view>
          <view
            class="item"
            :class="{
              active: currentMoveTag == 2
            }"
            @click="moveToDetail(2)"
            v-if="goodsDetail"
          >
            详情
          </view>
        </view>
      </view>
    </view>
    
    <view class="pane goods-info">
      <view class="detail-price">
        ￥
        <text class="price-text" style="letter-spacing: 2rpx;">
          <text style="margin-right: 10rpx;" v-show="goodsDetail.price">{{ goodsDetail.price }}</text>
          <text style="margin-right: 10rpx;" :class="{ normalPrice: goodsDetail.originalPrice }">{{ goodsDetail.originalPrice }}</text>
        </text>
        起
        <text
            v-if="voucherJudgment(goodsDetail)"
            style="height: 100%;padding: 6upx 12upx;margin-left: 20upx;background-color: #f0f0f0;border-radius: 22upx;vertical-align: middle;"
        >
            可使用{{ voucherJudgment(goodsDetail).voucherPrice }}元代金券抵扣
        </text>
        <!-- <text class="watch-vip-price" @click="handleWatchVipPrice">{{ vipPrice ? '隐藏' : '查看' }}会员价</text> -->
      </view>

      <view class="goods-name">{{ goodsDetail.productName }}</view>

      <view class="salsed">
        <text>月销100+</text>
        <!-- <image
          class="share-tran"
          src="../../static/images/detail/share-tran.png"
          mode=""
        /> -->
      </view>

      <view class="sub-info">
        <view class="item" v-for="(item, index) in subInfoConfig" :key="index">
          <image :src="item.icon" mode="" />
          <text>{{ item.label }}</text>
          <text class="attribute">{{ item.default }}</text>
        </view>
      </view>

      <view class="buy-info">
        <view class="item" v-for="(item, index) in goodsInfoConfig" :key="index" @click="handleClickMenu(item)">
          <image :src="item.icon" mode="" />
          <view>
            <view class="label">{{ selectForm[item.model] || item.label }}</view>
            <view class="desc" v-if="item.desc">{{ item.desc }}</view>
          </view>
        </view>
      </view>
      
      <view class="eval-wrapper">
        <view class="eval">
          <text>评价({{ goodsDetail.comments.length || 0 }})</text>
          <text v-if="goodsDetail.comments.length > 1">
            <text @click="handleViewAllEval(goodsDetail.comments)">查看全部</text>
            <image style="margin-bottom: -4upx" src="../../static/images/detail/right-arrow.png" mode="" />
          </text>
          <text v-else-if="goodsDetail.comments.length <= 0">暂无评价</text>
        </view>

        <view class="one-eval-container" v-if="goodsDetail.comments.length > 0">
          <view class="user-info">
            <image class="avatar" :src="goodsDetail.comments[0].avatar? common.seamingImgUrl(goodsDetail.comments[0].avatar) : require('../../static/images/user/weidian/no-goods.png')"></image>
            <view class="info">
              <view class="nickname">{{ goodsDetail.comments[0].nickname || '匿名用户' }} </view>
              <view class="eval-time">{{ goodsDetail.comments[0].addTime }}</view>
            </view>
          </view>
          <view class="comment-detail">
            <view class="content">
              {{ goodsDetail.comments[0].content }}
            </view>
            
            <view class="pic-list" v-if="goodsDetail.comments[0].picList">
              <image
                @click="handlePreviewImg(index, goodsDetail.comments[0].picList.split(',').map((item) => common.seamingImgUrl(item)))"
                class="img"
                v-for="(img, index) in goodsDetail.comments[0].picList.split(',').map((item) => common.seamingImgUrl(item))"
                :key="index"
                :src="img"
              ></image>
            </view>
          </view>
        </view>
      </view>

      <!-- 店铺信息 -->
      <view class="brand-wrapper" v-if="goodsDetail && goodsDetail.shopName && isShowBrand">
        <view class="top">
          <image class="image" :src="common.seamingImgUrl(goodsDetail.shopLogo)" mode="" v-if="goodsDetail.shopLogo" />
          <view v-else class="image image-avatar">{{ goodsDetail.shopName }}</view>

          <view class="brand-info">
            <view class="brand-name">{{ goodsDetail.shopName }}</view>
            <!-- <view class="brand-desc"></view> -->
            <view class="serve">
              <text>
                宝贝描述
                <text class="apponit">4.5</text>
              </text>
              <text>
                卖家服务
                <text class="apponit">4.8</text>
              </text>
              <text>
                物流服务
                <text class="apponit">4.7</text>
              </text>
            </view>
          </view>
        </view>
        <!-- TODO  -->
        <!-- <view class="bottom">
          <button class="uni-btn">进店逛逛</button>
          <button class="uni-btn">全部商品</button>
        </view> -->
      </view>

    </view>

        <!-- 宝贝详情 -->
    <view class="goods-detail" id="goods-detail" v-if="goodsDetail"><text>宝贝详情</text></view>

    <u-parse v-if="goodsDetail.text" :content="goodsDetail.text"></u-parse>

    <view class="recommd-container">
      <view class="goods-detail"><text>更多好物</text></view>
    </view>
    <!-- 店铺推荐 -->
    <view
        class="brand-recommend"
        v-if="goodsDetail.similarProducts && goodsDetail.similarProducts.length > 0"
      >
        <view class="sub-title">
          <text>店铺推荐</text>
          <image src="../../static/images/detail/right-arrow.png" mode="" />
        </view>

        <view class="wrapper">
          <view
            class="item"
            v-for="item in goodsDetail.similarProducts"
            @click="go('/pages/prod/prod?shopInfo=' + JSON.stringify(item) + '&detailInfo=' + voucherJudgment(item))"
            :key="item.shopId"
          >
            <image :src="common.seamingImgUrl(item.image)" mode="" />

            <view class="recommend-goods-name">{{ item.productName }}</view>

            <text class="recommend-goods-price">
              ￥
              <text>{{ item.originalPrice }}</text>
            </text>
          </view>
        </view>
    </view>
    <view class="footer">
      <view class="icon-wrapper">
        <view class="item" @click="go('/user/sever/shopCar/shopCar')">
          <image src="../../static/images/detail/shap-active.png" mode="" />
          <text>购物车</text>
          <view class="number" v-if="shopCarNumber">{{ shopCarNumber }}</view>
        </view>

        <!-- <view class="item" @click="handleChat"> -->
        <view class="item" @click="go('/user/sever/customer-service/customer-service')">
          <image src="../../static/images/detail/kefu.png" mode="" />
          <text>客服</text>
        </view>

        <view class="item">
            <!-- @click="handleCollect" -->
          <image :src="isCollect ? '../../static/images/detail/collection-active .png' : '../../static/images/detail/collection.png'" mode="" />
          <text>收藏</text>
        </view>
      </view>

      <view class="buttons">
        <button class="uni-btn" @click="addShopCar(selectInfo)">加入购物车</button>
        <button class="uni-btn" @click="fastBuy(selectInfo)">立即购买</button>
      </view>
    </view>
    <TSpecification :btn-text="btnStatus" @confirm="handleChooseSp" :data="goodsDetail" ref="specificationRef" :bottom="0" v-model="showSpecification"></TSpecification>

    <TuanChatKF ref="tuanChatKFRef"></TuanChatKF>

    <CommentListDrawer ref="commentListDrawerRef"></CommentListDrawer>

  </view>
</template>

<script>
import { A_TF_MAIN } from '../../config'
import Carousel from '../../components/carousel';
import { subInfoConfig, goodsInfoConfig } from './config';
import uParse from '../../components/u-parse/u-parse.vue';
import RecommendGoods from '../../components/recommend-goods';
import CommentListDrawer from './components/CommentListDrawer.vue';
import { getProductDetailsByIdApi, getSearchProductsApi } from '@/api/anotherTFInterface';

import {
  getCarShopNumberApi
} from '../../api/goods';

export default {
  components: {
    Carousel,
    uParse,
    RecommendGoods,
    CommentListDrawer
  },
  data() {
    return {
        shopCarNumber: 0, // 购物车数量
        subInfoConfig,
        goodsInfoConfig,
        shopingInfo: null,
        detailInfomation: null,
        goodsDetail: null,
        showTopNav: false, // !这一块都是用于判定样式的变量
        isShowTop: false,
        currentMoveTag: 0,
        evalPosition: 0,
        detailPosition: 0,
        scrollTop: 0, // 到此结束
        selectForm: {
            spsStr: ''
        },
        isShowBrand: true,
    };
  },
  onLoad(options) {
        this.detailInfomation = JSON.parse(options.shopInfo);
        this.shopingInfo = JSON.parse(options.detailInfo);
        console.log(this.shopingInfo);
        getProductDetailsByIdApi({
            shopId: this.detailInfomation.shopId,
            productId: this.detailInfomation.productId,
            skuId: this.detailInfomation.skuId,
            terminal: '3'
        }).then(res => {
            this.goodsDetail = res.data
            console.log(res);
        })
        this.getCarShopNumber()
        // console.log(this.detailInfomation);
  },

  methods: {
    voucherJudgment(Item) {
      if (!Item.map || Item.map.length <= 0) {
        return false
      }
      let returnData = null
      for(let Key in Item.map) {
        if(Item.map[Key].skuId == Item.skuId) returnData = Item.map[Key]
      }
      return returnData
    },
    handleBack() {
      uni.navigateBack();
    },
    // 分享
    handleShareGoods(isQuit) {
      const _this = this;
      const data = {
        data: {
          title: _this.goodsDetail.productName,
          desc: 'xxxxx',

          link: `${A_TF_MAIN}/#/pages/prod/prod?goodsId=` + JSON.stringify(_this.detailInfomation),
          imageUrl: this.common.seamingImgUrl(_this.goodsDetail.images[0]) || this.common.seamingImgUrl(_this.goodsDetail.image)
        },
        successCb: () => {},
        failCb: () => {}
      };

      this.$refs.beeWxShareRef.share(data, isQuit, '/pages/prod/prod?goodsId' + this.goodsId);
    },
     // 点击移动到对应的位置
    moveToDetail(tag) {
      const _this = this;
      // this.currentMoveTag = tag;
      switch (tag) {
        case 0:
          uni.pageScrollTo({
            scrollTop: 0,
            duration: 200
          });
          break;
        case 1:
          uni.pageScrollTo({
            scrollTop: _this.evalPosition,
            duration: 200
          });
          break;

        case 2:
          uni.pageScrollTo({
            scrollTop: _this.detailPosition,
            duration: 200
          });
          break;
      }
    },
    /*
     * @param {Object, Array} Item 商品对象
     * @param {String} Item.skuId 商品id
     * @return {Boolean} 是否可使用代金券
     * 判断是否可使用代金券
     */
    voucherJudgment(Item) {
      if (!Item.map || Item.map.length <= 0) {
        return false
      }
      let returnData = null
      for(let Key in Item.map) {
        if(Item.map[Key].skuId == Item.skuId) returnData = Item.map[Key]
      }
      return returnData
    },
        // 获取购物车数量
    async getCarShopNumber() {
      const res = await getCarShopNumberApi();
      if (res.errno === 0) {
        this.shopCarNumber = res.data;
      }
    },
  },
    onPageScroll(e) {
    this.showTopNav = !!e.scrollTop;
    this.scrollTop = e.scrollTop;
    if (this.detailPosition) {
      if (e.scrollTop < this.evalPosition - 60) {
        this.currentMoveTag = 0;
      } else if (e.scrollTop >= this.evalPosition - 60 && e.scrollTop < this.detailPosition - 60) {
        this.currentMoveTag = 1;
      } else if (e.scrollTop > this.detailPosition - 60) {
        this.currentMoveTag = 2;
      }
    } else {
      if (e.scrollTop < this.evalPosition - 60) {
        this.currentMoveTag = 0;
      } else if (e.scrollTop >= this.evalPosition - 60) {
        this.currentMoveTag = 1;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.goods-detail-container {
  overflow-x: hidden;
  font-size: 28upx;
  padding-bottom: 100upx;
}

/deep/ .wxParse {
  image,
  img {
    display: block;
  }
}

.watch-vip-price {
  margin-left: 20upx;
  color: #3d3d3d;
}

.pane {
  padding: 16upx 30upx;
  box-sizing: border-box;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 780upx;

  .header-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 34upx 20upx;
    box-sizing: border-box;

    image {
      width: 64upx;
      height: 64upx;

      &:last-child {
        margin-left: 20upx;
      }
    }
  }

  .scroll-top-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100upx;
    padding: 0 18upx;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 28upx;
    transition: opacity 350ms;

    image {
      position: absolute;
      top: 50%;
      left: 36upx;
      transform: translateY(-50%);
      height: 28upx;
      width: 16upx;
    }

    .center {
      display: flex;
      align-items: flex-end;

      .item {
        width: 160upx;
        height: 100upx;
        line-height: 100upx;
        text-align: center;
        box-sizing: border-box;
        border-bottom: 6upx solid transparent;
        transition: all 300ms;

        &.active {
          border-bottom-color: #fe9f21;
        }
      }
    }
  }
}

//
.sub-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 26upx;
  padding-top: 26upx;
  box-sizing: border-box;
  font-weight: bold;

  image {
    width: 32upx;
    height: 32upx;
  }
}

// 商品信息
.goods-info {
  /* #ifdef APP */
  margin-top: 30upx;
  /* #endif */

  /* #ifdef H5 */
//   margin-top: -34upx;
  /* #endif */

  .detail-price {
    color: #fa5151;

    .price-text {
      font-weight: bold;
      font-size: 48upx;
      margin: 0 4upx;
    }

    .normalPrice {
      color: #3d3d3d;
      font-size: 28upx;
      text-decoration: line-through;
    }
  }

  .goods-name {
    font-weight: bold;
    color: #000;
    font-size: 32upx;
    margin-top: 10upx;
  }

  .salsed {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #999;
    margin-top: 10upx;

    image {
      width: 40upx;
      height: 40upx;
      object-fit: cover;
    }
  }

  .sub-info {
    display: flex;
    justify-content: space-around;
    margin-top: 30upx;
    font-size: 24upx;
    color: #3d3d3d;
    padding: 34upx 0;
    background-color: #f9f9f9;

    image {
      width: 48upx;
      height: 48upx;
      object-fit: cover;
    }

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    text {
      margin: 8upx 0 18upx 0;
    }

    .attribute {
      font-weight: bold;
      font-size: 28upx;
      margin: 0;
    }
  }

  .buy-info {
    padding: 40upx 28upx;
    box-sizing: border-box;
    margin-top: 20upx;
    background-color: #f9f9f9;

    .item {
      display: flex;
      align-items: flex-start;
      color: #3d3d3d;
      margin-bottom: 66upx;

      &:last-child {
        margin-bottom: 0;
      }
    }

    image {
      width: 48upx;
      height: 48upx;
      object-fit: cover;
      margin-right: 20upx;
    }
  }

  .eval-wrapper {
    background-color: #f9f9f9;
    .eval {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 26upx;
      box-sizing: border-box;
      background-color: #f9f9f9;
      margin-top: 24upx;

      image {
        width: 32upx;
        height: 32upx;
        object-fit: cover;
      }
    }

    .one-eval-container {
      padding: 26upx 26upx;
      .user-info {
        display: flex;
        align-items: flex-start;

        .avatar {
          width: 70upx;
          height: 70upx;
          border-radius: 50%;
          margin-right: 20upx;
          flex-shrink: 0;
        }

        .info {
          .nickname {
            font-size: 28upx;
            font-weight: 500;
            color: #000;
          }

          .eval-time {
            color: #ccc;
            font-size: 24upx;
          }
        }
      }

      .comment-detail {
        margin: 20upx 0;
        color: #3e3e3e;

        .pic-list {
          margin-top: 20upx;

          .img {
            width: 160upx;
            height: 160upx;
            margin-right: 30upx;
            border-radius: 10upx;
          }
        }
      }
    }
  }

  .brand-wrapper {
    margin-top: 24upx;
    background-color: #f9f9f9;

    .top {
      display: flex;
      padding: 30upx 12upx;
      box-sizing: border-box;

      .image {
        width: 160upx;
        height: 160upx;
        object-fit: cover;
        border-radius: 10upx;
        flex-shrink: 1;
        margin-right: 20upx;
      }

      .image-avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: #fff;
        background-color: #e95d20;
      }

      .brand-info {
        flex: 1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;

        .brand-name {
          font-weight: bold;
          font-size: 36upx;
          width: 480upx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .brand-desc {
          margin: 10upx 0;
          width: 480upx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .serve {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .apponit {
            color: #fa5151;
          }
        }
      }
    }

    .bottom {
      display: flex;
      border-top: 1upx solid #eee;

      .uni-btn {
        flex: 1;
        padding: 24upx;
        font-size: 28upx;
        border-radius: 0;
        // font-weight: 500;

        &::after {
          border: none;
        }

        &:first-child {
          border-right: 1upx solid #eee;
        }
      }
    }
  }
}
.brand-recommend {
box-sizing: border-box;
padding: 0rpx 20rpx;
margin-top: 24upx;

// background-color: #f9f9f9;
.sub-title {
    font-size: 32rpx;
    width: 100%;
    height: 60rpx;
    padding: 0;
}

.wrapper {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-top: 12upx;

    .item {
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20upx;

    image {
        width: 324upx;
        height: 324upx;
        border-radius: 10upx;
    }

    .recommend-goods-name {
        width: 310upx;
        font-size: 34upx;
        margin: 4upx 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .recommend-goods-price {
        width: 100%;
        font-size: 24upx;
        color: #fa5151;

        text {
        font-weight: 500;
        font-size: 36upx;
        }
    }
    }
}
}

.goods-detail {
  position: relative;
  width: 100%;
  height: 65upx;
  background-color: #f1f2f6;
  display: flex;
  justify-content: center;
  align-items: center;

  text {
    position: relative;
    z-index: 2;
    background-color: #f1f2f6;
    padding: 0 4px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 400upx;
    height: 1upx;
    background-color: #d8d8d8;
    top: 50%;
    z-index: 1;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.recommd-container {
  .goods-detail {
    text {
      color: #e95d20;
    }

    &::after {
      background-color: #e95d20;
    }
  }
}

.footer {
  left: 0;
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 100upx;
  background-color: #fff;
  padding: 0 20upx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  z-index: 10000000;

  .icon-wrapper {
    display: flex;
    flex: 1;
    justify-content: space-between;

    .item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-right: 40upx;
      font-size: 24upx;
      white-space: nowrap;

      .number {
        width: 40upx;
        height: 40upx;
        text-align: center;
        line-height: 40upx;
        color: #fff;
        border-radius: 50%;
        position: absolute;
        background-color: #e95d20;
        top: -20upx;
        right: -16upx;
      }
    }

    image {
      width: 40upx;
      height: 40upx;
      object-fit: cover;
    }
  }

  .buttons {
    width: 440upx;
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, #ffd100, #fe753f);
    border-radius: 100px;
    overflow: hidden;

    .uni-btn {
      width: 220upx;
      font-size: 28upx;
      color: #fff;
      font-weight: bold;
      height: 80upx;
      text-align: center;
      line-height: 80upx;
    }
  }
}
</style>
