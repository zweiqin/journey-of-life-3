<template>
  <view id="pie1" class="pie1">
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <view
      id="main1"
      style=" width: 100%; height: 600upx"
      class="pie"
    />
  </view>
</template>

<script>
const echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
import { number } from "echarts";
export default {
  data() {
    return {
      max: "",
      incomeData: [
        {
          value: 1095,
          name: "门店提现",
          itemStyle: { color: "#00B578" },
          label: { color: "#666666" },
          labelLine: { lineStyle: { color: "#666666" } },
        },
        { value: 682, name: "经销分红", itemStyle: { color: "#FA5151" } },
        { value: 1, name: "微店分红", itemStyle: { color: "#8A38F5" } },
        { value: 213, name: "其他", itemStyle: { color: "#07B9B9" } },
        { value: 358, name: "发现视频", itemStyle: { color: "#0256FF" } },
      ],
    };
  },
  mounted() {
    this.initData();
  },
  props: {
    showTime: Array,
  },
  methods: {
    // disposeData() {},
    initData() {
      var pieData = this.incomeData; //data为接口请求回来的值
      var sumNumber = 0;
      pieData.forEach((item) => {
        sumNumber += item.value;
        if (item.value >= this.max) this.max = item.value; //记录一个最大值
      });
      // 放大规则
      let number_sure = Math.round(this.max * 0.5);
      this.incomeData = pieData.map((item) => {
        return {
          value: number_sure + item.value,
          name: item.name,
        };
      });
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById("main1"));
      myChart.setOption({
        legend: {
          icon: "circle", //形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          // itemWidth: 10, // 设置宽度
          // itemHeight: 4, // 设置高度
          itemGap: 24, // 设置间距
          //文字居下
          // x: "center",
          // y: "bottom",
          // xdata: ["昨天", "今天"],
          // data: ["昨天涨幅", "今天涨幅", "整体涨幅"],
          textStyle: {
            //文字样式
            color: "#c1dafc",
            fontSize: "12",
          },
          // right: "30%",
        },

        //还原值

        tooltip: {
          trigger: "item",
          formatter: function (param) {
            //还原正常值
            return (
              param.name +
              ": " +
              (param.value - number_sure) +
              " " +
              (((param.value - number_sure) / sumNumber) * 100).toFixed(2) +
              "%"
            );
          },
        },

        // tooltip: {
        //   trigger: "item",
        //   formatter: "{a} <br/>{b} : {c} ({d}%)", // 具体a b c d 代表的属性看下面注释啦
        // },
        series: [
          {
            name: "访问来源", // formatter 中的a
            type: "pie",
            radius: "50%",
            center: ["50%", "60%"],
            data: this.incomeData, // data 中的name为formatter中的 b；data中的value呢就是formatter中c；
            // 至于d就是Echarts计算出来的百分比啦；itemStyle:为饼图每个扇形的颜色；
            // label为指示线后面的文字的样式，labelLine为指示线的颜色
            roseType: "area",
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontWeight: 400,
                  fontSize: 12, // 文字的字体大小
                },
                // formatter: function (param) {
                //   //还原正常值
                //   return (
                //     param.name +
                //     ": " +
                //     (param.value - number_sure) +
                //     " " +
                //     (((param.value - number_sure) / sumNumber) * 100).toFixed(
                //       2
                //     ) +
                //     "%"
                //   ); \n
                // },
                formatter: function (param) {
                  //还原正常值
                  return param.name + "\n" + (param.value - number_sure) + "元";
                }, // 这里为指示线后面的提示信息，这里的换行要用\n 与上面tooltips中的formatter换行不同滴
              },
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      window.onresize = myChart.resize; //自适应浏览器窗口的大小
    },
  },
};
</script>
<style lang="less" scoped>
.pie {
  border: 1px solid #d8d8d8;
  border-radius: 20upx;
}
.pie1 {
  margin-top: 20upx;
}
</style>
