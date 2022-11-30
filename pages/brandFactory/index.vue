<template>
  <view class="brandFactory">
    <view class="titleBackground">
      <!-- <view class="title">
        <img
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/nkrijs42ry7sdxdedukv.png "
          class="titleImg"
          alt=""
          @click="back"
        />
        <view class="titleText">品牌工厂</view>
        <view class="titleImg"></view>
      </view> -->
      <view class="header">
        <img
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/nkrijs42ry7sdxdedukv.png "
          class="titleImg"
          alt=""
          @click="back" />
        <TLocale :color="true" :icon="false"></TLocale>
        <view class="search">
          <img
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/n9uvs8riv79g44w711bj.png "
            alt=""
          />
          <input
            type="text"
            placeholder="输入工厂名称，查找厂家"
            key=""
            placeholder-class="input-placeholder"
          />
    </view
      ></view>
    </view>
    <view class="style">
      <view
        class="styleDetail"
        v-for="item in styleList"
        :key="item.id"
        @click="choseStyle(item.id)"
      >
        <text
          class="styleDetail"
          :class="{ choseStyle: item.id === currentTab }"
        >
          {{ item.name }}</text
        >
      </view>
      <view class="screen" @click="openScreen">
        {{ choseStyleText }}
        <img
          v-if="screenType"
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/2kojpp94546ze5uuy9c2.png"
          class="styleImg"
          alt=""
        />
        <img
          v-else-if="!screenType"
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ym6r92gxq3xvkrg7ofp6.png"
          class="styleImg"
          alt=""
        />
      </view>
    </view>
    <view class="screenBoard" :class="{ openBoard: screenType == true }">
      <view
        @click="screenBoardChose(item.name)"
        class="screenBoradDetail"
        v-for="item in firstStyleList"
        :key="item.id"
      >
        {{ item.name }}
      </view>
    </view>
    <view class="shop">
      <brandShop
        v-for="item in BrandFactory"
        :key="item.id"
        :name="item.name"
        :picUrl="item.picUrl"
        :desc="item.desc"
        :address="item.address"
        :id="item.id"
        :textcolor="'white'"
        :backgroundcolor="'#E95D20'"
      ></brandShop
    ></view>
  </view>
</template>

<script>
import { getBrandStyleListApi, getBrandListApi } from "../../api/brand";
import brandShop from "./brandShop/index";
export default {
  name: "brandFactory",
  components: { brandShop },
  props: {},
  data() {
    return {
      styleList: [],
      firstStyleList: [],
      currentTab: 0,
      screenType: false,
      choseStyleText: "筛选",
      backgroundcolor: "",
      textcolor: "",
      BrandFactory: [],
    };
  },
  computed: {},
  methods: {
    back() {
      uni.switchTab({ url: "/pages/index/index" });
    },
    async getBrandFactory() {
      const res = await getBrandListApi({
        brandgenreId: 23,
        page: 1,
        size: 100,
      });
      // this.BrandFactory= res.data.brandList
      this.BrandFactory = res.data.brandList;
      console.log(this.BrandFactory);
    },
    chosecolor() {
      //十六进制颜色随机
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      var backgroundcolor =
        "#" + r.toString(16) + g.toString(16) + b.toString(16);
      var textcolor = "#" + b.toString(16) + g.toString(16) + r.toString(16);
      this.textcolor = textcolor;
      this.backgroundcolor = backgroundcolor;
      console.log("123");
    },
    screenBoardChose(item) {
      this.screenType = !this.screenType;
      this.choseStyleText = item;
    },
    openScreen() {
      this.screenType = !this.screenType;
    },
    choseStyle(tab) {
      this.currentTab = tab;
    },
    async getBrandStyleList() {
      const res = await getBrandStyleListApi({});
      console.log(res);
      this.firstStyleList = res.data.items;

      const a = [
        {
          id: 0,
          name: "推荐",
        },
        ...res.data.items,
      ];
      console.log(a);
      this.styleList = a;
      this.styleList = this.styleList.slice(0, 4);
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.chosecolor();
    this.getBrandStyleList();
    this.getBrandFactory();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
};
</script>

<style lang="less" scoped>
.brandFactory {
  background-color: #f1f2f6;
  .titleBackground {
    background-color: #e95d20;
    padding: 10upx 0 20upx 0;
    .title {
      justify-content: space-between;
      display: flex;

      .titleText {
        font-size: 36upx;
        font-weight: 700;
        color: white;
      }
    }
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 72upx;
      padding: 20upx 26upx 16upx 26upx;

      &.header-fixed {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;

        z-index: 100;
        padding: 26upx;
      }

      .img {
        width: 32upx;
        height: 40upx;
      }

      .loaction {
        margin: 0 20upx 0 10upx;
      }

      .search {
        flex: 1;
        display: flex;
        align-items: center;
        margin-right: 12upx;
        margin-left: 20upx;
        height: 100%;
        border-radius: 100px;
        padding: 0 34upx;
        background-color: #ffffff;

        img {
          width: 32upx;
          height: 32upx;
          margin-right: 30upx;
        }
        .input-placeholder{
          font-size: 24upx;
        }
      }
    }
  }
  .style {
    display: flex;
    background-color: white;
    width: 100%;
    padding: 20upx 0;
    .styleDetail {
      width: 20%;
      text-align: center;
      font-size: 28upx;

      &.choseStyle {
        font-size: 28upx;
        font-weight: 700;
        border-bottom: 2px solid #e95d20;
      }
    }
  }
  .screen {
    width: 20%;
    text-align: center;
    font-size: 28upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .styleImg {
      width: 36upx;
      height: 36upx;
    }
  }
  .screenBoard {
    width: 100%;
    height: 0upx;
    border-radius: 20upx;
    overflow: hidden;
    transition: all 400ms;
    display: flex;
    flex-wrap: wrap;
    font-size: 28upx;
    &.openBoard {
      padding-top: 30upx;
      height: 170upx;
      width: 100%;
    }
    .screenBoradDetail {
      width: 20%;
      text-align: center;
      height: 40upx;
      line-height: 40upx;
    }
  }
  .shop {
  }
  .titleImg {
    width: 48upx;
    height: 48upx;
  }
}
</style>