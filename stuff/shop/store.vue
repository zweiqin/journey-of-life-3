<template>
  <div>
    <view class="store">
      <view class="top-title"></view>
			<!-- #ifdef H5 -->
			 <image
        src="../../static/images/stuff/Vector8.png"
        alt=""
        class="fanhui"
        @click="handleBack"
      />
			<!-- #endif -->
     
      <!-- <view class="title-list">
        <view class="text">综合</view>
        <view class="text">功能配件</view>
        <view class="text">五金配件</view>
        <view class="text">沙发材料</view>
        <view class="text">椅类配件</view>
      </view> -->
      <view class="navs2" ref="navs2Ref">
        <view
          class="item"
          v-for="item in navs2"
          :class="{ active: item.id === currentTab }"
          :key="item.storeName"
          @click="switchTab(item.id)"
          >{{ item.storeName }}</view
        >

        <!-- <view class="modal" ref="modalRef">
          <view
            class="item"
            :class="{ active: item.value === currentTab }"
            v-for="item in navs2"
            :key="item.label"
            @click="switchTab(item.value)"
            >{{ item.label }}</view
          >
        </view> -->
      </view>
      <view class="goods-list">
        <Store
          v-for="item in brandList"
          :key="item.id"
          :name="item.name"
          :picUrl="item.picUrl"
          :desc="item.desc"
          :id="item.id"
        ></Store>
        <!-- <Store></Store>
        <Store></Store>
        <Store></Store>
        <Store></Store>
        <Store></Store>
        <Store></Store>
        <Store></Store> -->
      </view>
    </view>
  </div>
</template>









<script>
import { navs2 } from "../../pages/stuff/config";

import Store from "../../pages/stuff/components/stuff-store.vue";
import { getBrandListApi, getBrandTypeApi } from "../../api/brand";
export default {
  // name: "Shop",
  components: {
    Store,
  },
  props: {},
  data() {
    return {
      brandList: [],
      page: 1,
      navs2: [],
      currentTab: 0,
      brandgenreId: "",
      length: "",
      picUrl:"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/mu11ydme6t73slzqkjgc.png",
      text:"暂无门店"
    };
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
    switchTab(brandgenreId) {
      console.log(brandgenreId);
      this.currentTab = brandgenreId;

      this.brandgenreId = brandgenreId;
      this.getBrandList();

      // const currentNavs = this.$refs.navs2Ref.$el.querySelector(".item.active");
      // const local = currentNavs.getBoundingClientRect();
    },

    //门店列表接口
    //首先调用getBrandListApi方法 从接口中拿到后台给的数据 给到res中
    //随后打印res 得知brandList(门店列表的数据)路径为 res（自己定义的）.data.brandList
    //this.brandList 是在data（vue中定义的data，存储数据，可以看成后端的int a = 1 或者 string a = xxx）中定义的brandList ((可以省略))
    //将res.data.brandList赋值给this.brandList
    //       <Store
    // v-for="item in brandList"          brandList中的数据赋值给item
    //           :name="item.name"
    //           :url="item.picUrl"
    //           :desc="item.desc"
    //           :id="item.id"          id的路径是 brandList.id 因为brandList赋值给了item，所以路径为item.id
    //         ></Store>
    // 随后根据路径找到组件位置。
    //item.id是后台给到的数据路径，如果需要的id叫 狗屎 我们的路径就是item.狗屎
    async getBrandList() {
      const res = await getBrandListApi({
        brandgenreId: this.brandgenreId,
        page: this.page,
        size: 100,
      });
      console.log(res);
      // let shoplist = res.data.brandList;
      // this.brandList.push(shoplist)
      this.brandList = res.data.brandList;
      this.brandList = this.brandList.filter(item=>item.brandgenre !== 23)
      this.length = res.data.brandList.length;
      // b = a;
      // this.brandList = this.brandList.push.apply(b,a)
      // const c = b.concat(a);
      // console.log(c);
    },
    //门店类型接口
    async getBrandType() {
      const res = await getBrandTypeApi({
        storeName: "",
        page: "",
        limit: "",
        sort: "",
        order: "",
      });
      console.log(res);
      this.navs2 = res.data.items;
      console.log(this.navs2);
      this.navs2.unshift({ storeName: "全部", id: 0 });
      const a = this.navs2.findIndex((item) => {
        return item.storeName == "品牌工厂";
      });
      // console.log(a);
      const b = this.navs2.splice(a, 1);
    },
  },

  created() {},
  onLoad() {
    this.getBrandList();
    this.getBrandType();
  },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {
  //   this.page = this.page + 1;
  //   this.getBrandList();
  // },
};
</script>











<style lang="scss" scoped>
.store {
  .top-title {
    text-align: center;
    font-size: 32upx;
    margin: 10upx 0upx 48upx 0upx;
  }
  .fanhui {
    width: 24upx;
    height: 32upx;
    margin-left: 30upx;
  }

  // .title-list {
  //   display: flex;
  //   font-size: 24upx;

  //   .text {
  //     padding-top: 48upx;
  //     padding-left: 50upx;
  //   }
  //   .menu {
  //     padding-top: 48upx;
  //   }
  // }
  .navs2 {
    margin-left: 30upx;
    position: relative;
    display: flex;
    align-items: center;
    overflow-x: scroll;

    .modal {
      position: fixed;
      width: 375px;
      left: 0;
      background-color: rgb(255, 255, 255);
      transform: scaleY(0);
      transform-origin: top center;
      transition: all 200ms;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 20upx;
      box-sizing: border-box;
      z-index: 300;

      .item {
        border: none;
        width: 24%;

        .active {
        }
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }

    .item {
      font-size: 28upx;
      color: #3d3d3d;
      margin-right: 60upx;
      white-space: nowrap;
      padding: 10upx 0;
      border-bottom: 4upx solid transparent;
      transition: all 350ms;

      &.active {
        color: #3662ec;
        border-bottom-color: #3662ec;
      }
    }
  }

  .goods-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    padding: 20upx;

    box-sizing: border-box;
  }
}
</style>
