<template>
  <view class="detail-container">
    <view class="images">
      <image
        class="back"
        src="../../../../static/images/detail/back.png"
        mode=""
      />
      <Carousel
        @change="carouselCurrent = $event"
        :list="[
          'https://img0.baidu.com/it/u=3532200536,1980847042&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=960',
          'https://img2.baidu.com/it/u=2810821815,3283067086&fm=253&fmt=auto&app=120&f=JPEG?w=720&h=1280',
          'https://img0.baidu.com/it/u=4119637719,3772607746&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
        ]"
        :height="230"
        :top="0"
        :radius="0"
      ></Carousel>

      <view class="indicator">{{ carouselCurrent + 1 }}/12</view>
    </view>

    <view class="main">
      <view class="name-price">
        <view class="name">PF-全屋套餐</view>
        <view class="goods-price"><text class="icon">￥</text>21975</view>
      </view>

      <view class="pane"
        >套餐包含：沙发一套/电视柜一个/茶几一个/一桌四椅 床一张/床头柜一个</view
      >

      <view class="pane attributes">
        <view class="item" v-for="item in attributes" :key="item.label">
          <image :src="item.url" mode="" />
          <text class="attribute-name">{{ item.label }}</text>
          <text class="attribute-value">{{ item.field }}</text>
        </view>
      </view>
    </view>

    <line-title title="套餐详情"></line-title>
    <u-parse :content="goodsInfoDetail"></u-parse>

    <line-title title="更多套餐"></line-title>
    <view class="item" @click="handleViewDetail" v-for="item in 20" :key="item">
      <image
        src="https://img2.baidu.com/it/u=4126568663,2462169725&fm=253&fmt=auto&app=120&f=JPEG?w=420&h=640"
        mode=""
      />
      <view class="info">
        <view class="name">全屋套餐</view>
        <view class="price-text">15-20万</view>
        <view class="desc">
          <text>1室1房一厅 | </text>
          <text>轻奢 |</text>
          <text>80平</text>
        </view>
        <view class="tags">
          <view class="tag">精品热销</view>
          <view class="tag">百搭优选</view>
        </view>
      </view>
    </view>

    <view class="footer">
      <view class="left">
        <view class="btn-wrapper">
          <image src="../../../../static/images/index/home-fill.png" mode="" />
          <text style="color: #3190fd">首页</text>
        </view>
        <view class="btn-wrapper">
          <image
            src="../../../../static/images/index/share-forwardfill.png"
            mode=""
          />
          <text>分享</text>
        </view>
      </view>

      <view class="right">
        <button class="uni-btn">人工选配</button>
        <button class="uni-btn">立即预约</button>
      </view>
    </view>
  </view>
</template>

<script>
import Carousel from "../../../../components/carousel";
import { attributes } from "./config";
import uParse from "../../../../components/u-parse/u-parse.vue";
import { marked } from "marked";

export default {
  components: {
    Carousel,
    uParse,
  },

  data() {
    return {
      carouselCurrent: 0,
      attributes,
    };
  },

  computed: {
    goodsInfoDetail() {
      return marked(
        '<p><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/brlgr7vm77tyw4q2nv2z.jpg" alt="" width="750" height="829" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6df27s9lgiwpzxnx9ihg.jpg" alt="" width="750" height="984" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/zg4livbngwqyas6ke2gj.jpg" alt="" width="750" height="1094" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/r0smtlcd627gh039owbk.jpg" alt="" width="750" height="1014" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/d388qmldj9aps1syc4j3.jpg" alt="" width="750" height="829" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/9iedyzwcy9fuwzre5oq7.jpg" alt="" width="750" height="1139" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/9c46ub3medm53ngw2qei.jpg" alt="" width="750" height="1114" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/nzls4djvcumkgyjatgqo.jpg" alt="" width="750" height="1150" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6tzvn5pzgca2y5kds4ap.gif" alt="" width="750" height="1000" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/bdky0zr6fdk67u2afd8a.jpg" alt="" width="750" height="961" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/s6vzw71uwrydybcwp5l8.jpg" alt="" width="750" height="864" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/mnv5qdajaood5313yuw4.jpg" alt="" width="750" height="1129" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/bgkfvqedjvr7wmk2bfvw.jpg" alt="" width="750" height="1109" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/3bx5pc01qoo5q30kxdpg.jpg" alt="" width="750" height="874" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/d6hxluondo547txj66cg.jpg" alt="" width="750" height="734" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/jhe58a30fmhyuflxfu33.jpg" alt="" width="750" height="1054" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/fpbyjbal9u0ui5mwfpmj.jpg" alt="" width="750" height="1004" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/18tgyb1x5b8y6if2upmi.jpg" alt="" width="750" height="1149" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/2xf0kfdyfhmad21n7120.jpg" alt="" width="750" height="1049" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/f6v2m7t8k2r5syrqnuuj.jpg" alt="" width="750" height="1049" /><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/fu91royw8v42onolbhfw.jpg" alt="" width="750" height="984" /></p>'
      );
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ img {
  display: block;
}

/deep/ image {
  display: block;
}

.detail-container {
  font-size: 28upx;
  padding-bottom: 100upx;
  .images {
    position: relative;
    .back {
      width: 60upx;
      height: 60upx;
      position: absolute;
      left: 40upx;
      top: 86upx;
      z-index: 100;
    }
    .indicator {
      position: absolute;
      color: #fff;
      padding: 4upx 16upx;
      background-color: #71716f;
      border-radius: 500px;
      bottom: 30upx;
      right: 30upx;
    }
  }

  .pane {
    background-color: #f9f9f9;
    padding: 30upx;
    box-sizing: border-box;
    width: 100%;
    margin-top: 24upx;
  }

  .main {
    padding: 20upx 26upx;
    box-sizing: border-box;

    .name-price {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .name {
        font-size: 34upx;
        font-weight: bold;
      }

      .goods-price {
        font-size: 36upx;
        color: #fa5151;
        font-weight: bold;

        .icon {
          font-size: 28upx;
          font-weight: normal;
        }
      }
    }

    .attributes {
      display: flex;
      justify-content: space-between;

      .item {
        display: flex;
        align-items: center;
        flex-direction: column;
        flex: 1;
        image {
          width: 60upx;
          height: 60upx;
          object-fit: cover;
          margin-right: 0;
        }

        .attribute-name {
          font-size: 24upx;
          margin: 10upx 0;
          white-space: nowrap;
        }

        .attribute-value {
          color: #000;
          font-weight: 500;
          white-space: nowrap;
        }
      }
    }
  }

  .item {
    display: flex;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 10upx;
    margin-bottom: 14upx;
    padding: 20upx;

    image {
      width: 250upx;
      height: 180upx;
      object-fit: cover;
      border-radius: 20upx;
      flex-shrink: 0;
      margin-right: 32upx;
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name {
        font-size: 32upx;
        color: #3d3d3d;
        font-weight: bold;
      }

      .price-text {
        color: #fa5151;
        font-size: 32upx;
        font-weight: 500;
      }

      .desc {
        font-size: 24upx;
        color: #999999;
      }

      .tags {
        display: flex;
        align-items: center;

        .tag {
          font-size: 24upx;
          line-height: 1.5;
          color: #767676;
          padding: 2upx 12upx;
          background-color: #f1f2f6;
          margin-right: 10upx;
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100upx;
    background-color: #fff;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 34upx;
    box-sizing: border-box;

    .left {
      display: flex;
      align-items: center;

      .btn-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 24upx;
        margin-right: 44upx;
      }

      image {
        width: 40upx;
        height: 40upx;
      }
    }

    .right {
      flex: 1;
      height: 80upx;
      display: flex;
      justify-content: flex-end;

      .uni-btn {
        width: 220upx;
        height: 100%;
        border-radius: 0;
        line-height: 80upx;

        &:nth-child(1) {
          background-color: #d9ebff;
          color: #3190fd;
          border-radius: 100upx 0 0 100upx;
        }

        &:nth-child(2) {
          background-color: #318dfc;
          color: #fff;
          border-radius: 0 100upx 100upx 0;
        }
      }
    }
  }
}
</style>