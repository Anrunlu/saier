<template>
  <div :class="className" :style="{height:400,width:width}" class="chart-container"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    },
    setOptions({ title, x, y, color }) {
      this.chart.setOption({
        title: {
          text: title,
          left: 'center',
          top: 20,
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: [{
          type: 'category',
          data: x,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0
          },
          boundaryGap: true
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [
          {
            name: '完成作业人数',
            type: 'bar',
            barWidth: '50%',
            barMaxWidth: 40,
            data: y,
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [color]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  border-radius: 4px;
  height: 400px;
  background: #fff;
  box-shadow: 0 1px 10px 2px rgba(182, 191, 196, 0.5);
  padding: 20px;
}
</style>
