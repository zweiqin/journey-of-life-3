<template><div id="bar" style="width: 750upx; height: 400px"></div></template>

<script>
//局部或全局定义

export default {
  data() {
    return {};
  },
  methods: {
    barEcharts() {
      var myChart = this.$echarts.init(document.getElementById("bar"));
      // 配置图表
      var option = {
        title: {
          text: "标题",
        },
        //提示框
        tooltip: {},
        legend: {
          data: ["销量", "销售额"],
        },
        //x轴显示种类
        xAxis: {
          data: ["种类一", "种类二", "种类三", "种类四", "种类五", "种类六"],
        },
        //y轴可填数值等
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            //y轴数值
            data: [
              5,
              {
                value: 20,
                itemStyle: {
                  color: "#FFB5C5",
                },
              },
              36,
              10,
              10,
              20,
            ],
          },
          {
            name: "销售额",
            type: "bar",
            data: [
              3,
              {
                value: 12,
                itemStyle: {
                  color: "#FFB5C5",
                },
              },
              36,
              10,
              10,
              20,
            ],
          },
          {
            name: "昨日",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  //设置
  mounted() {
    this.barEcharts();
  },
};
</script>

<style lang="less" scoped>
</style>