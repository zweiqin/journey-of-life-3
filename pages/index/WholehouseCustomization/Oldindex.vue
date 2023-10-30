<template>
  <view class="Wholehouse-customization-container">
    <view class="filter">
      <view
        class="item"
        v-for="item in filters"
        @click="handleFilter(item)"
        :key="item.value"
      >
        <text
          :style="{
            color: visible[item.key] ? '#FFC117' : '',
          }"
          >{{ item.label }}</text
        >

        <tui-icon
          :class="{ rotate: item.isAnimate && visible[item.key] }"
          :size="20"
          :name="item.icon"
        ></tui-icon>
      </view>
    </view>

    <view class="company-container">
      <DesignCompany
        v-for="item in tempData"
        :key="item.name"
        :data="item"
      ></DesignCompany>
      <LoadingMore status="no-more"></LoadingMore>
    </view>

    <PricePopup
      :scrollTop="scrollTop"
      v-model="visible.pricePopupVisible"
    ></PricePopup>
    <ServiceScopePopup
      :scrollTop="scrollTop"
      v-model="visible.servePopupVisible"
    ></ServiceScopePopup>
    <AllFilter
      :scrollTop="scrollTop"
      v-model="visible.allPopupVisible"
    ></AllFilter>
  </view>
</template>

<script>
import { filters, tempData } from './data'
import DesignCompany from './cpns/DesignCompany.vue'
import PricePopup from './cpns/PricePopup.vue'
import ServiceScopePopup from './cpns/ServiceScopePopup.vue'
import AllFilter from './cpns/ALLFilter.vue'
export default {
  components: {
    DesignCompany,
    PricePopup,
    ServiceScopePopup,
    AllFilter,
  },
  props: {
    scrollTop: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      filters: Object.freeze(filters),
      tempData: Object.freeze(tempData),
      visible: {
        pricePopupVisible: false,
        servePopupVisible: false,
        allPopupVisible: false,
      },
    }
  },

  methods: {
    handleFilter(item) {
      this.visible.pricePopupVisible = false
      this.visible.servePopupVisible = false
      this.visible.allPopupVisible = false

      this.visible[item.key] = true
    },
  },
}
</script>

<style lang="less" scoped>
.Wholehouse-customization-container {
  .filter {
    display: flex;
    align-items: center;
    background-color: #fff;
    height: 70upx;
    border-radius: 0 0 24upx 24upx;
    position: relative;
    z-index: 10000;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 33%;
      text-align: center;
      color: #3a3629;
      font-size: 28upx;

      .rotate {
        transform: rotate(180deg);
      }
    }
  }

  .company-container {
    padding: 20upx;
    box-sizing: border-box;
  }
}
</style>
