<template>
  <view>
    <l-echart ref="chart" custom-style="width: 100%" @finished="init"></l-echart
  ></view>
</template>

<script>
import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
export default {
  props: {
    data1: {
      type: Array,
      required: true,
    },
  },
  watch: {
    data1: {
      handler(value) {
        console.log(value)
      },

      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      option: {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          show: false,
        },
        grid: {
          left: '20',
          right: '20',
          bottom: '20',
          containLabel: false,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
            data: [...this.data1.map(item => item.typeName)],
          },
        ],
        yAxis: [
          {
            type: 'value',
            show: false,
          },
        ],
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)',
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [...this.data1.map(item => item.orderQuantity)],
          },
        ],
      },
    }
  },
  // 组件能被调用必须是组件的节点已经被渲染到页面上
  // 1、在页面mounted里调用，有时候mounted 组件也未必渲染完成
  mounted() {
    // init(echarts, theme?:string, opts?:{}, chart => {})
    // echarts 必填， 非nvue必填，nvue不用填
    // theme 可选，应用的主题，目前只支持名称，如：'dark'
    // opts = { // 可选
    //  locale?: string  // 从 `5.0.0` 开始支持
    // }
    // chart => {} ， callback 必填，返回图表实例
    this.$refs.chart.init(echarts, chart => {
      chart.setOption(this.option)
    })
  },
  // 2、或者使用组件的finished事件里调用
  methods: {
    init() {
      this.$refs.chart.init(echarts, chart => {
        chart.setOption(this.option)
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
