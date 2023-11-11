<template>
    <view class="main-menus-conatainer">
        <scroll-view
        scroll-x="true"
        :scroll-into-view="scrollIntoViewId"
        scroll-with-animation
        >
            <view class="wrapper">
                <view
                    class="item"
                    :class="{ active: value == item.classifyId }"
                    @click="handleClickOnceMenuItem(item)"
                    v-for="item in onceMenus"
                    :key="item.classifyId"
                    :id="`item_${item.classifyId}`"
                >
                <image :src="item.classifyImage" mode="" />
                <text>{{ item.classifyName }}</text>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import { getClaasifyProducts, getFirstClassifyApi } from '@/api/anotherTFInterface'
export default {
  props: {
    value: {
      type: [Number,String],
      required: true,
    },
  },
  mounted() {
    this.getGoodsTypes();
    this.$nextTick(() => {
      this.getItemId();
    });
  },

  data() {
    return {
      onceMenus: [],
      scrollIntoViewId: "item1",
    };
  },

  methods: {
    async getGoodsTypes() {
        getFirstClassifyApi({
          classifyId: '1160'
        })
        .then(res => {
            this.onceMenus = res.data
            console.log(res)
            // console.log(this.value);
        })
        .catch(err => console.log(err))
      // const res = await getGoodsTypesApi({
      //   goodsType: 1,
      // });

      // if (res.errno === 0) {
      //   this.onceMenus = res.data.categoryList.filter(
      //     (item) => item.desc === "搜家具"
      //   );
      // }
    },

    handleClickOnceMenuItem(item) {
      this.$emit("choose", item.classifyId);
      this.scrollIntoViewId = "item_" + item.classifyId;
    },

    getItemId() {
      setTimeout(() => {
        this.scrollIntoViewId = "item_" + this.value;
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .uni-scroll-view::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.main-menus-conatainer {
  padding: 20upx;
  background-color: #f3f3f3;
  position: relative;
  z-index: 100000000000;

  .wrapper {
    display: flex;
    align-items: center;
  }
}
.item {
  width: 130upx;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20upx 10upx;
  color: #000000;
  margin-right: 20upx;
  transition: transform 350ms;
  border-radius: 4px;

  image {
    width: 120upx;
    height: 120upx;
    object-fit: cover;
    margin-bottom: 10upx;
  }

  &.active {
    border: 1upx solid #e95d20;
  }
}
</style>