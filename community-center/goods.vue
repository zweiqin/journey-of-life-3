<template>
  <view class="goods-info">
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
    <GoodsPanel
      @deleteItem="handleDelete"
      v-for="(item, index) in goodsList"
      :key="item.number"
      :index="index"
      v-model="goodsList[index]"
      @preview="isSwitchPage = $event"
    >
    </GoodsPanel>

    <!-- <Remarks v-model="remarks"></Remarks> -->

    <Button @click="submitGoods">确定</Button>
  </view>
</template>

<script>
import GoodsPanel from "./components/goods-panel.vue";
import Remarks from "./components/remarks.vue";
import Button from "./components/button.vue";
import { getGoodItem } from "./config";
import Header from "./components/header.vue";

export default {
  components: {
    GoodsPanel,
    Remarks,
    Button,
    Header,
  },
  data() {
    return {
      goodsList: [getGoodItem()],
      remarks: "",
      isSwitchPage: false,
    };
  },
  methods: {
    // 删除delete
    handleDelete(index) {
      if (this.goodsList.length === 1) {
        uni.showToast({
          title: "至少添加一个商品",
          icon: "none",
        });
        return;
      }
      this.goodsList.splice(index, 1);
    },

    // 新增
    handleAddGoodItem() {
      this.goodsList.push(getGoodItem());
    },

    // 提交
    submitGoods() {
      for (const item of this.goodsList) {
        if (!item.categoryName || !item.goodsType) {
          uni.showToast({
            title: "类型和品名是必填项",
            icon: "none",
          });

          return;
        }
      }

      uni.setStorageSync("ORDER_GOODS_LIST", JSON.stringify(this.goodsList));
      uni.redirectTo({
        url: "/community-center/delivery-install",
      });
    },
  },
  onShow() {
    if (!this.isSwitchPage) {
      const orderDetailList = uni.getStorageSync("ORDER_GOODS_LIST");
      if (orderDetailList) {
        this.goodsList = JSON.parse(orderDetailList);
      }
    }
  },

  destroyed() {
    this.isSwitchPage = false;
  },
};
</script>

<style lang="less" scoped>
.goods-info {
  padding-bottom: 170upx;
  .title {
    color: #888;
    margin: 47upx auto 12upx 30upx;
    font-size: 26upx;
  }
}
</style>
