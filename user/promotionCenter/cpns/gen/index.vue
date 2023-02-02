<template>
  <Pane style="border-radius: 40upx 40upx 0 0" type="gen" text="收益情报">
    <block slot="right">
      <Buttons v-model="currentType"></Buttons>
    </block>

    <view class="main">
      <MSwitch v-model="currentData"></MSwitch>

      <view class="profit-wrapper">
        <view class="count">0.00</view>
        <view>昨日收益(元)</view>
      </view>

      <Tab></Tab>

      <view class="echarts-wrapper">
        <Charts1 ref="chartRef" v-show="currentType == 'chart'"></Charts1>
        <Form v-show="currentType === 'form'"></Form>
      </view>
    </view>
  </Pane>
</template>

<script>
import Pane from "../pane.vue";
import Buttons from "./buttons.vue";
import MSwitch from "./switch.vue";
import Tab from "./tab.vue";
import Charts1 from "./charts1.vue";
import Form from "./form.vue";

export default {
  components: {
    Pane,
    Buttons,
    MSwitch,
    Tab,
    Charts1,
    Form,
  },

  data() {
    return {
      currentType: "form",
      currentData: "order",
    };
  },

  watch: {
    currentType(value) {
      if (value === "chart") {
        this.$refs.chartRef.getServerData();
      }
    },
  },

  methods: {},
};
</script>

<style lang="less" scoped>
/deep/ .switch-container {
  margin: 34upx 0 20upx 0;
}

/deep/ .tui-yAxis__val {
  display: none;
}

/deep/ .tui-column__bar {
  background-color: #e95d20 !important;
}

.profit-wrapper {
  color: #777;
  font-size: 24upx;
  padding-bottom: 10upx;
  border-bottom: 1upx solid #d8d8d8;

  .count {
    font-size: 34upx;
    font-weight: 500;
    margin: 20upx 0;
  }
}
</style>