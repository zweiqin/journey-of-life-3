<template>
  <view>
    <canvas
      canvas-id="jLHKlmFgiIiJagQSfHfikcpfzhFyNsIm1111"
      id="jLHKlmFgiIiJagQSfHfikcpfzhFyNsIm1111"
      class="charts"
      @touchend="tap"
    />
  </view>
</template>

<script>
import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js'
var uChartsInstance = {}
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cWidth: 750,
      cHeight: 500,
    }
  },
  mounted() {
    //这里的 750 对应 css .charts 的 width
    this.cWidth = uni.upx2px(700)
    //这里的 500 对应 css .charts 的 height
    this.cHeight = uni.upx2px(500)
    this.getServerData()
  },

  watch: {
    data: {
      handler(value) {
        this.getServerData(value)
      },

      immediate: true,
      deep: true,
    },
  },
  methods: {
    getServerData(value) {
      if (!Array.isArray(value)) return
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: [...value.map(item => item.typeName)],
          series: [
            {
              name: '佣金',
              data: [...value.map(item => item.orderIncome)],
            },
            {
              name: '用户',
              data: [...value.map(item => item.orderQuantity)],
            },
          ],
        }
        this.drawCharts('jLHKlmFgiIiJagQSfHfikcpfzhFyNsIm1111', res)
      }, 500)
    },
    drawCharts(id, data) {
      const ctx = uni.createCanvasContext(id, this)
      uChartsInstance[id] = new uCharts({
        type: 'column',
        context: ctx,
        width: this.cWidth,
        height: this.cHeight,
        categories: data.categories,
        series: data.series,
        animation: true,
        timing: 'easeOut',
        duration: 1000,
        rotate: false,
        rotateLock: false,
        background: '#FFFFFF',
        color: [
          '#165DFF',
          '#14C9C9',
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [15, 15, 0, 5],
        fontSize: 13,
        fontColor: '#666666',
        dataLabel: true,
        dataPointShape: true,
        dataPointShapeType: 'solid',
        touchMoveLimit: 60,
        enableScroll: false,
        enableMarkLine: false,
        legend: {
          show: true,
          position: 'top',
          flaot: 'top',
        },
        xAxis: {
          disableGrid: true,
          disabled: false,
          axisLine: true,
          axisLineColor: '#CCCCCC',
          calibration: false,
          fontColor: '#000',
          fontSize: 13,
          lineHeight: 20,
          marginTop: 0,
          rotateLabel: false,
          rotateAngle: 45,
          itemCount: 5,
          boundaryGap: 'center',
          splitNumber: 5,
          gridColor: '#CCCCCC',
          gridType: 'solid',
          dashLength: 4,
          gridEval: 1,
          scrollShow: false,
          scrollAlign: 'left',
          scrollColor: '#A6A6A6',
          scrollBackgroundColor: '#EFEBEF',
          title: '',
          titleFontSize: 13,
          titleOffsetY: 0,
          titleOffsetX: 0,
          titleFontColor: '#666666',
          formatter: '',
        },
        yAxis: {
          data: [
            {
              min: 0,
            },
          ],
          disabled: true,
          disableGrid: false,
          splitNumber: 5,
          gridType: 'dash',
          dashLength: 2,
          gridColor: '#D8D8D8',
          padding: 10,
          showTitle: false,
        },
        extra: {
          column: {
            type: 'group',
            width: 20,
            activeBgColor: '#000000',
            activeBgOpacity: 0.08,
            seriesGap: 2,
            categoryGap: 3,
            barBorderCircle: false,
            linearType: 'none',
            linearOpacity: 1,
            customColor: ['#999'],
            colorStop: 0,
            meterBorder: 1,
            meterFillColor: '#FFFFFF',
            labelPosition: 'outside',
          },
          tooltip: {
            showBox: true,
            showArrow: true,
            showCategory: false,
            borderWidth: 0,
            borderRadius: 0,
            borderColor: '#000000',
            borderOpacity: 0.7,
            bgColor: '#000000',
            bgOpacity: 0.7,
            gridType: 'solid',
            dashLength: 4,
            gridColor: '#CCCCCC',
            boxPadding: 3,
            fontSize: 13,
            lineHeight: 20,
            fontColor: '#FFFFFF',
            legendShow: true,
            legendShape: 'auto',
            splitLine: true,
            horizentalLine: false,
            xAxisLabel: false,
            yAxisLabel: false,
            labelBgColor: '#FFFFFF',
            labelBgOpacity: 0.7,
            labelFontColor: '#666666',
          },
          markLine: {
            type: 'solid',
            dashLength: 4,
            data: [],
          },
        },
      })
    },
    tap(e) {
      uChartsInstance[e.target.id].touchLegend(e)
      uChartsInstance[e.target.id].showToolTip(e)
    },
  },
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 500rpx;
}
</style>
