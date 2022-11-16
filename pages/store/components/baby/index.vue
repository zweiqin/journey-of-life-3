<template>
  <div class="baby-wrapper">
    <view class="navs">
      <view
        class="item"
        :class="{ active: currentTab === item.value }"
        v-for="item in filterCategoryList"
        :key="item.value"
        @click="switchNav(item.value)"
        >{{ item.label }}</view
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
    goodsList2: Array,
    goodsList1: Array,
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
    //分类获取商品
    // async goodsList() {
    //   const res = await goodsListApi({
    //     brandId: this.brandId,
    //     categoryId: this.categoryId,
    //   });
    //   console.log(res);
    //   this.brandgoodsList = res.data.goodsList;
    //   this.brandgoodsList.push(...res.data.brandgoodsList);
    // },

    switchNav(tab) {
      this.currentTab = tab;
      this.categoryId = tab;
      const categoryId = this.categoryId;
      if (categoryId == 0) {
        this.brandgoodsList = this.goodsList1;
      } else {
        // this.goodsList();
        this.brandgoodsList = this.goodsList1
      }
      this.$emit("categoryId", this.categoryId);
    },
    catchList() {
      // const a = {
      //   id: 0,
      //   name: "全部",
      // };
      console.log("this.allgoodsList", this.allgoodsList);
      console.log("纯商品", this.allgoodsList.goodsList);
      this.brandgoodsList = this.allgoodsList.goodsList;
      this.allgoodsList1 = this.allgoodsList.goodsList;
      console.log("纯商品分类", this.allgoodsList.filterCategoryList);
      this.filterCategoryList = this.allgoodsList.filterCategoryList;
      const fristId = this.filterCategoryList[0].value;
      if (fristId == 0) {
        // console.log(123);
      } else {
        this.filterCategoryList.unshift({
          value: 0,
          label: "全部",
        });
      }
    },
  },
  watch: {
    goodsList1: {
      handler(value) {
        console.log(value);
        this.brandgoodsList = value;
      },

      immediate: true,
      deep: true,
    },
    // goodsList2: {
    //   handler(value) {
    //     console.log(value);
    //     this.brandgoodsList = value;
    //   },

    //   immediate: true,
    //   deep: true,
    // },
  },
  mounted() {
    this.catchList();
    // this.goodsList();
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
      margin-bottom: 20upx;
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