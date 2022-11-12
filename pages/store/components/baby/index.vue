<template>
  <div class="baby-wrapper">
    <view class="navs">
      <view
        class="item"
        :class="{ active: currentTab === item.id }"
        v-for="item in filterCategoryList"
        :key="item.id"
        @click="switchNav(item.id)"
        >{{ item.name }}</view
      >
      <!-- {{ filterCategoryList }} -->
    </view>

    <view class="main">
      <Goods
        v-for="item in brandgoodsList"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :price="item.retailPrice"
        :payNumber="100"
        :url="item.picUrl"
        :sname="item.goodsSn"
      ></Goods>
      <!-- <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods> -->
    </view>
  </div>
</template>

<script>
import Goods from "../../../../components/goods/index.vue";
import { goodsListApi } from "../../../../api/goods";
export default {
  components: {
    Goods,
    name: "",
    sname: "",
    price: "",
    payNumber: 100,
    url: "",
    id: "",
  },
  props: {
    allgoodsList: Object,
    brandId: [Number, String],
  },
  data() {
    return {
      navs: [
        {
          label: "综合",
          value: 0,
        },
        {
          label: "销量",
          value: 1,
        },
        {
          label: "新品",
          value: 2,
        },
      ],
      currentTab: 0,
      brandgoodsList: [],
      allgoodsList1: [],
      filterCategoryList: [],
    };
  },
  methods: {
    async goodsList() {
      const res = await goodsListApi({
        brandId: this.brandId,
        categoryId: this.categoryId,
      });
      console.log(res);
      this.brandgoodsList = res.data.goodsList;
    },
    switchNav(tab) {
      this.currentTab = tab;
      this.categoryId = tab;
      const categoryId = this.categoryId;
      if (categoryId == 0) {
        this.brandgoodsList = this.allgoodsList1;
      } else {
        this.goodsList();
      }
    },
    catchList() {
      // const a = {
      //   id: 0,
      //   name: "全部",
      // };
      console.log("纯商品", this.allgoodsList.goodsList);
      this.brandgoodsList = this.allgoodsList.goodsList;
      this.allgoodsList1 = this.allgoodsList.goodsList;
      console.log("纯商品分类", this.allgoodsList.filterCategoryList);
      this.filterCategoryList = this.allgoodsList.filterCategoryList;
      const fristId = this.filterCategoryList[0].id;
      if (fristId == 0) {
        console.log(123);
      } else {
        this.filterCategoryList.unshift({
          id: 0,
          name: "全部",
        });
      }
    },
  },
  mounted() {
    this.catchList();
    this.goodsList();
  },
};
</script>

<style lang="less" scoped>
.baby-wrapper {
  .navs {
    display: flex;
    align-items: center;
    margin: 20upx 0 0 0;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    .item {
      font-size: 20upx;
      margin-right: 36upx;
      font-size: 24upx;
      transition: all 200ms linear;
      white-space: nowrap;
      &.active {
        color: #ff8f1f;
      }
    }
  }

  .main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>