<template>
  <view class="main-menu-container">
    <tui-grid :unlined="false">
      <block v-for="(item, index) in menus" :key="index">
        <tui-grid-item
          :border="false"
          :bottom-line="false"
          :cell="4"
          @click="handleto(item)"
        >
          <view class="tui-grid-icon">
            <image class="icon" :src="item.iconUrl" mode="" />
          </view>
          <text class="tui-grid-label">{{ item.name }}</text>
        </tui-grid-item>
      </block>
    </tui-grid>
  </view>
</template>

<script>
import { getGoodsTypesApi } from '../../../../api/home'
export default {
  data() {
    return {
      menus: [],
    }
  },

  mounted() {
    this.getCategoryList()
  },

  methods: {
    // 获取nav
    async getCategoryList() {
      const { data } = await getGoodsTypesApi({
        goodsType: 2,
      })
      this.menus = data.categoryList.filter(item => item.iconUrl)
    },

    // 点击item
    handleto(item) {
      uni.navigateTo({
        url: '/stuff/stuffGoods/index?id=' + item.id,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.main-menu-container {
  width: 100%;
  background-color: #fff;
  border-radius: 44upx;
  overflow: hidden;

  .icon {
    width: 88upx;
    height: 88upx;
    border-radius: 50%;
  }

  /deep/ .tui-grid-bg {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  /deep/ .tui-grid-icon {
    text-align: center;
  }

  /deep/ .tui-grid-label {
    font-size: 26upx;
    line-height: 40upx;
  }
}
</style>
