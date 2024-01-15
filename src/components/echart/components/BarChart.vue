<template>
   <v-chart
      ref="chart"
      class="chart"
      :option="option"
      :style="{ height: height + 'px' }"
      autoresize
      @click="onChartClick"
      @selectchanged="onChartSelect"
   />
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, MarkLineComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'
import _merge from 'lodash/merge'
import { toRef, watch } from 'vue'
import { getCurrentInstance } from 'vue'
import { onMounted } from 'vue'

use([
   CanvasRenderer,
   BarChart,
   LineChart,
   TitleComponent,
   TooltipComponent,
   LegendComponent,
   GridComponent,
   MarkLineComponent,
])

const { proxy } = getCurrentInstance()
const props = defineProps({
   options: {
      type: Object,
   },
   height: {
      type: [Number, String],
   },
})

const emits = defineEmits(['chartClick', 'chartSelect'])
const optionInfos = toRef(props, 'options')
const option = ref(null)

const chart = ref(null)

//provide(THEME_KEY, 'dark')

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
            return [point[0] - size.contentSize[0] / 2, '4%']
         },
      },
      grid: {
         top: 40,
         bottom: 40,
         right: 40,
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
         axisLine: {
            show: false,
         },
         axisTick: {
            show: false,
         },
         axisLabel: {
            color: 'gray',
            formatter: (value) => proxy.$util.getDayOfWeek(value),
         },
         data: [],
      },
      yAxis: {
         type: 'value',
         position: 'right',
         splitLine: {
            show: true,
         },
      },
      series: [],
   }
}

watch(optionInfos, (val) => {
   option.value = null
   option.value = _merge(getBasicOption(), val)
   option.value.xAxis.data = option.value.xAxis.data.map((value) => {
      return {
         value: value,
         textStyle: {
            color: '',
         },
      }
   })
})

const onChartClick = (params) => {
   toggleXAxisLabel(params)
   emits('chartClick', params)
}

const onChartSelect = (params) => {
   emits('chartSelect', params)
}

const action = (params) => {
   chart.value.dispatchAction({
      type: 'select',
      seriesIndex: params.seriesIndex || 0,
      dataIndex: params.dataIndex,
   })
   chart.value.dispatchAction({
      type: 'highlight',
      seriesIndex: params.seriesIndex || 0,
      dataIndex: params.dataIndex,
   })
   chart.value.dispatchAction({
      type: 'showTip',
      seriesIndex: params.seriesIndex || 0,
      dataIndex: params.dataIndex,
   })

   toggleXAxisLabel(params)
}

const toggleXAxisLabel = (params) => {
   option.value.xAxis.data.forEach((item, index) => {
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
   chart.value.setOption(option.value)
}

defineExpose({
   action,
})
</script>

<style scoped>
.chart {
   height: 40vh;
}
</style>
