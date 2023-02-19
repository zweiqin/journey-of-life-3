<template>
  <Pane name="gen" title="收益情报">
    <block slot="right">
      <SwitchBtns
        type="legend"
        :btns="['图表', '表单']"
        v-model="currentLegend"
      ></SwitchBtns>
    </block>

    <SwitchBtns
      :btns="['订单', '粉丝']"
      type="category"
      v-model="currentCategory"
    ></SwitchBtns>

    <view class="total">
      <view class="total-count">{{
        !currentCategory ? yesterdayIncome : yesterdayVermicelli
      }}</view>
      <view class="tip">{{
        !currentCategory ? '昨日收益（元）' : '昨日新增粉丝数'
      }}</view>
    </view>

    <view v-if="!currentCategory">
      <Tabs
        padding="0"
        isShowScrollBar
        :currentIndex="currentNav"
        :data="tabs"
      ></Tabs>

      <view v-show="currentLegend === 0">
        <Charts :data1="data" ref="chartsRef"></Charts>
      </view>

      <view v-show="currentLegend === 1">
        <FormPane :data2="data"></FormPane>
      </view>
    </view>

    <view v-else>
      <FansCharts
        :data1="vermicelliVoList"
        v-show="currentLegend === 0"
      ></FansCharts>
      <FansTable
        v-show="currentLegend === 1"
        :data="vermicelliVoList"
      ></FansTable>
    </view>
  </Pane>
</template>

<script>
import Pane from '../pane.vue'
import SwitchBtns from './cpns/switch.vue'
import FormPane from './cpns/form-pane.vue'
import Charts from './cpns/charts.vue'
import FansTable from './cpns/FansTable.vue'
import FansCharts from './cpns/FansCharts.vue'

export default {
  components: {
    Pane,
    SwitchBtns,
    FormPane,
    Charts,
    FansTable,
    FansCharts,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    yesterdayIncome: {
      type: Number,
      required: true,
    },
    yesterdayVermicelli: {
      type: Number,
      required: true,
    },
    vermicelliVoList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentLegend: 1,
      currentCategory: 0,
      currentNav: 0,

      // trmplate
      currentTab: 0,
      tabs: Object.freeze([
        {
          label: '月收益',
        },
        {
          label: '周收益',
        },
        {
          label: '日收益',
        },
        {
          label: '累计收益',
        },
      ]),
    }
  },

  watch: {
    currentLegend(value) {
      if (!value && !this.currentCategory) {
        this.$refs.chartsRef.init()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.total {
  padding: 20upx 0;
  border-bottom: 1upx solid #d8d8d8;
  font-size: 24upx;

  .total-count {
    font-size: 34upx;
    color: #777;
    font-weight: bold;
  }

  .tip {
    color: #777;
  }
}

.wrapper {
  display: flex;
}
</style>
