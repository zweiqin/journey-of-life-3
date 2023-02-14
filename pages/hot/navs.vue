<template>
  <view>
    <view class="navs">
      <view class="item title">全部爆款</view>
      <view class="item" @click="handleFilter">
        <text>分类</text>
        <tui-icon name="arrowdown" :size="20"></tui-icon>
      </view>
    </view>

    <tui-top-dropdown :show="dropShow" @close="btnCloseDrop">
      <view class="main-area">
        <view class="filter-title"> 商品分类 </view>
        <view class="menu-wrapper">
          <view
            class="item"
            @click="handleClick(item)"
            v-for="item in categoryList"
            :key="item.id"
            >{{ item.name }}</view
          >
        </view>
      </view>
    </tui-top-dropdown>
  </view>
</template>

<script>
import { getGoodsTypesApi } from '../../api/home'
export default {
  mounted() {
    this.getGoodsType()
  },
  data() {
    return {
      dropShow: false,
      categoryList: [],
    }
  },
  methods: {
    handleFilter() {
      this.dropShow = true
    },

    async getGoodsType() {
      const { data } = await getGoodsTypesApi({
        goodsType: 1,
      })

      this.categoryList = data.categoryList
    },

    btnCloseDrop() {
      this.dropShow = false
    },

    handleClick(item){
      this.$emit('click', item)
      this.dropShow = false
    }
  },
}
</script>

<style lang="less" scoped>
.navs {
  font-size: 28upx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-weight: 500;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}

/deep/ .tui-top-dropdown {
  left: 0;
}

.main-area {
  padding: 20upx;

  .menu-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background-color: #f7f7f7;
    margin-top: 20upx;
  }

  .item {
    padding: 20upx 40upx;
    margin-right: 20upx;
    background-color: #fff;
    margin-bottom: 20upx;
    border-radius: 10upx;
    font-size: 28upx;
  }
}
</style>
