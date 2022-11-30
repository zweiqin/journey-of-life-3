<template>
  <view class="brandShop" @click="gotoMyBrand">
    <view style="display: flex">
      <view class="brandLogo">
        <view
          v-if="!picUrl"
          class="LogoBackground"
          :style="{ 'background-color': backgroundcolor }"
        >
          <text class="LogoText" :style="{ color: textcolor }">{{
            name.slice(0, 4)
          }}</text>
        </view>
        <img class="logoImg" :src="picUrl" alt="" v-else-if="picUrl" />
      </view>
      <view class="right">
        <view class="top">
          <view class="brandName">{{ name }}</view>
          <view class="gotoBrand">进入展厅</view>
        </view>
        <img
          class="grade"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/pzsclu2sjzgt8pgglwpd.png "
          alt=""
        />
        <div class="desc">{{ desc || "暂无简介" }}</div>
        <view class="bottom">
          <view class="bottomLeft">
            <img
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/tk3ayg0sglz44lavgru6.png "
              alt=""
              class="badgeImg"
            />
            <view class="redBrand">品牌工厂</view>
            <view class="blueLable">官方直营</view>
          </view>
          <view class="address">
            <img
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/a3yly03zvayfnjs2ao32.png "
              alt=""
              class="addressImg"
            />
            <view class="addressText">{{ address.slice(0, 6) }}</view>
          </view>
        </view>
      </view></view
    >
    <view class="brandGoods">
      <img
        class="goodsImg"
        :src="item.picUrl"
        v-for="item in goodsList"
        :key="item.id"
      />
    </view>
  </view>
</template>

<script>
import { goodsListApi } from "../../../api/goods";
export default {
  name: "brandShop",
  props: {
    backgroundcolor: String,
    textcolor: String,
    BrandFactory: Array,
    name: String,
    picUrl: String,
    desc: String,
    id: Number,
    address: String,
  },
  data() {
    return {
      goodsList: [],
    };
  },
  computed: {},
  methods: {
    gotoMyBrand() {
      uni.navigateTo({ url: "/pages/brandFactory/myBrand?id="+this.id });
    },
    async getgoodsList() {
      const res = await goodsListApi({
        brandId: this.id,
      });
      this.goodsList = res.data.goodsList;
      this.goodsList = this.goodsList.slice(0, 3);
      console.log(this.goodsList);
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.getgoodsList();
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
.brandShop {
  background: white;
  padding: 20upx 30upx;
  margin: 30upx 0;
  .brandLogo {
    padding-right: 16upx;
    .LogoBackground {
      width: 120upx;
      height: 120upx;
      border-radius: 10upx;
      .LogoText {
        width: 120upx;
        font-size: 28upx;
        font-weight: 500;
        line-height: 120upx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        justify-content: center;
      }
    }
    .logoImg {
      width: 120upx;
      border-radius: 10upx;
      height: 120upx;
    }
  }
  .right {
    flex: 1;
    .top {
      display: flex;
      width: 100%;
      .brandName {
        flex: 1;
        width: 400upx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 30upx;
        font-weight: 500;
      }
      .gotoBrand {
        color: #e95d20;
        font-size: 28upx;
      }
    }

    .grade {
      width: 130upx;
      height: 27upx;
    }
    .desc {
      font-size: 28upx;
      height: 77upx;
      font-weight: 400;
      color: #999999;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .bottom {
      display: flex;
      color: white;
      font-size: 28upx;
      font-weight: 700;
      .bottomLeft {
        display: flex;
        .badgeImg {
          width: 48upx;
          margin: 20upx 0upx;
          height: 48upx;
        }
        .redBrand {
          padding: 5upx 15upx;
          margin: 20upx 15upx;
          font-size: 26upx;
          border-radius: 10upx;
          background: linear-gradient(270deg, #e95d20 0%, #fa5151 100%);
        }
        .blueLable {
          margin: 20upx 0;
          border-radius: 10upx;
          font-size: 26upx;
          padding: 5upx 15upx;
          background: linear-gradient(90deg, #3588e2 0%, #3662ec 98%);
        }
      }

      .address {
        flex: 1;
        justify-content: flex-end;
        display: flex;
        align-items: center;
        .addressImg {
          height: 28upx;
          width: 28upx;
        }
        .addressText {
          font-weight: 500;
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .brandGoods {
    display: flex;
    justify-content: space-between;
    padding: 20upx 0;
    .goodsImg {
      width: 220upx;
      height: 220upx;
      border-radius: 10upx;
    }
  }
}
</style>