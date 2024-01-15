<template>
   <v-chart
      ref="chart"
      class="chart"
      :option="option"
      autoresize
      :style="{ height: height + 'px' }"
      @click="onChartClick"
   />
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent, GridComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref } from 'vue'
import _merge from 'lodash/merge'

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent, GridComponent])

const props = defineProps({
   options: {
      type: Object,
   },
   height: {
      type: [Number, String],
   },
})

const emits = defineEmits(['chartClick'])
const chart = ref(null)

const getBasicOption = () => {
   return {
      tooltip: {
         confine: true,
         trigger: 'axis',
         backgroundColor: '#000',
         textStyle: {
            color: '#fff',
            fontSize: 12,
         },
         formatter: function (params) {
            return params[0].axisValueLabel
         },
         position: function (point, params, dom, rect, size) {
            return [point[0] - size.contentSize[0] / 2, '5%']
         },
      },
      xAxis: {
         type: 'category',
         axisPointer: {
            type: 'line',
            lineStyle: {
               color: 'gray',
               type: 'solid',
            },
         },
      },
      yAxis: {
         type: 'value',
      },
      series: [],
   }
}

const option = _merge(getBasicOption(), props.options)

const onChartClick = (params) => {
   option.xAxis.data.forEach((item, index) => {
      if (params.dataIndex === index) {
         item.textStyle = {
            color: '#000',
            fontWeight: 'bold',
         }
      } else {
         item.textStyle = {
            color: 'gray',
            fontWeight: 'normal',
         }
      }
   })
   chart.value.setOption(option)
   emits('chartClick', params)
}
</script>

<style scoped>
.chart {
   height: 40vh;
}
</style>
