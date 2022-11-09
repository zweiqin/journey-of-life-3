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
    lastMoney: Number,
    money: Number,
    viewPicture: String,
    status: String,
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
        dataZoom: [
          {
            xAxisIndex: 0, //这里是从X轴的0刻度开始
            show: true,
            startValue: 0, // 从头开始。
            endValue: 5, // 一次性展示6个
          },
        ],
        xAxis: [
          {
  
            data: [
              "春天",
              "夏天",
              "秋天",
              "冬天",
              "春天",
              "夏天",
              "秋天",
              "冬天",
              "春天",
              "夏天",
              "秋天",
              "冬天",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "价格",
            interval: 10,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "涨幅",
            interval: 5,
            axisLabel: {
              formatter: "{value}%",
            },
          },
        ],
        series: [
          {
            name: "今天涨幅",
            type: "line",
            yAxisIndex: 1,
            barWidth: "10%",
            data: [1, 9, 5, 7],
          },
          {
            name: "昨天涨幅",
            type: "line",
            yAxisIndex: 1,
            barWidth: "10%",
            data: [3, 8, 1, 7],
          },
          {
            name: "整体涨幅",
            type: "line",
            yAxisIndex: 1,
            barWidth: "10%",
            data: [2, 2, 3, 4],
          },
          {
            name: "今天",
            type: "bar",
            barWidth: "10%",
            yAxisIndex: 0,
            data: [20, 20, 30, 40],
          },
          {
            name: "昨天",
            type: "bar",
            barWidth: "10%",
            yAxisIndex: 0,
            data: [20, 20, 30, 40],
          },
        ],
        // color: ["#b1de6a", "#4ab0ee"],
      };

      myChart.setOption(option);
    },
  },
};
</script>
