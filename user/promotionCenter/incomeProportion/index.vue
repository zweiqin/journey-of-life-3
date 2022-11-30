<template>
  <div class="MonthsCon">
    <div id="MonthsConChart" style="height: 600upx"></div>
  </div>
</template>

<script>
import { number } from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  props: {
    showTime: Array,
  },
  methods: {
    initMap() {
      var myChart = this.$echarts.init(
        document.getElementById("MonthsConChart")
      );
      const option = {
        // title:{
        //   text:"每日涨幅"
        // },
        legend: {
          icon: "rect", //形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 10, // 设置宽度
          itemHeight: 4, // 设置高度
          itemGap: 24, // 设置间距
          //文字居下
          x: "center",
          // y: "bottom",
          // xdata: ["昨天", "今天"],
          // data: ["昨天涨幅", "今天涨幅", "整体涨幅"],
          textStyle: {
            //文字样式
            color: "#c1dafc",
            fontSize: "12",
          },
          right: "30%",
        },
        // dataZoom: [
        //   {
        //     xAxisIndex: 0, //这里是从X轴的0刻度开始
        //     show: true,
        //     startValue: 0, // 从头开始。
        //     endValue: 5, // 一次性展示6个
        //   },
        // ],
        // xAxis: [
        //   {
        //     data: [...this.showTime],
        //     axisPointer: {
        //       type: "shadow",
        //     },
        //   },
        // ],
        // yAxis: [
        //   {
        //     type: "value",
        //     name: "金额",
        //     interval: 10,
        //     axisLabel: {
        //       formatter: "{value}",
        //     },
        //   },
        //   {
        //     type: "value",
        //     name: "笔数",
        //     interval: 5,
        //     axisLabel: {
        //       formatter: "{value}",
        //     },
        //   },
        // ],
        tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
        series: [
          {
            type: "pie",
            data: [
              {
                value: 335,
                name: "直接访问",
              },
              {
                value: 234,
                name: "联盟广告",
              },
              {
                value: 1548,
                name: "搜索引擎",
              },
            ],
            // roseType: "area",
          },
        ],
        // color: ["#b1de6a", "#4ab0ee"],
      };

      myChart.setOption(option);
    },
  },
};
</script>
