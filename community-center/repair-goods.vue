<template>
  <view class="repair-goods-page">
    <Header title="商品信息"></Header>
    <view class="title">
      <span>商品信息</span>
			<tui-button
				width="130rpx" height="42rpx" :size="26" plain
				type="blue" margin="0 20upx 0 0" shape="square"
				style="float: right;" @click="handleAddGoodItem"
			>
				<view style="display: flex;align-items: center;">
					<tui-icon name="add-fill" :size="18" color="#3fbef8"></tui-icon>
					<text style="margin-left: 10upx;">新增</text>
				</view>
			</tui-button>
    </view>
    <RepairGoodsItem
      @preview="isSwitchPage = $event"
      @delete="handleDelete"
      v-for="(item, index) in orderGoddsList"
      :key="item.id"
      :index="index"
      v-model="orderGoddsList[index]"
    ></RepairGoodsItem>

    <Button @click="handleSaveFixGoodsList">确定</Button>
  </view>
</template>

<script>
import RepairGoodsItem from "./components/repair-goods-item.vue";
import Button from "./components/button.vue";
import Header from "./components/header.vue";

const getGoodsItem = () => {
  return {
    categoryName: "",
    goodsUrl: [],
    id: new Date().getTime(),
  };
};

export default {
  components: {
    RepairGoodsItem,
    Button,
    Header,
  },
  data() {
    return {
      orderGoddsList: [],
      isSwitchPage: false,
    };
  },
  methods: {
    /**
     * @description 删除商品
     */
    handleDelete(index) {
      if (this.orderGoddsList.length === 1) {
        uni.showToast({
          title: "必须有一个商品",
          icon: "none",
        });
        return;
      }
      this.orderGoddsList.splice(index, 1);
    },

    /**
     * @description 点击新增
     */
    handleAddGoodItem() {
      this.orderGoddsList.push(getGoodsItem());
    },

    /**
     * @description 确定维修商品
     */
    handleSaveFixGoodsList() {
      console.log(this.orderGoddsList);
      for (const item of this.orderGoddsList) {
        if (!item.categoryName) {
          uni.showToast({
            title: "请确保填完所有的品名",
            icon: "none",
          });

          return;
        }

        if (!item.goodsUrl || item.goodsUrl.length === 0) {
          uni.showToast({
            title: "请确保上传了图片",
            icon: "none",
          });
        }

        uni.setStorageSync("REPAIR_GOODS", this.orderGoddsList);
        uni.reLaunch({
          url: "/community-center/repair",
          animationType: "pop-in",
          animationDuration: 200,
        });
      }
    },
  },

  onShow() {
    // if (!this.isSwitchPage) {
    //   this.orderGoddsList = uni.getStorageSync("REPAIR_GOODS") || [
    //     getGoodsItem(),
    //   ];
    // }
  },

  onLoad() {
    if (!this.isSwitchPage) {
      this.orderGoddsList = uni.getStorageSync("REPAIR_GOODS") || [
        getGoodsItem(),
      ];
    }
  },

  destroyed() {
    this.isSwitchPage = false;
  },
};
</script>

<style lang="less" scoped>
.repair-goods-page {
  padding-bottom: 180upx;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888;
    margin: 47upx auto 12upx 30upx;
    font-size: 30upx;
  }
}
</style>