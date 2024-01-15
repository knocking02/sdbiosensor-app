<template>
   <v-chart
      class="chart"
      :option="option"
      autoresize
      :style="{ height: height + 'px', width: width + 'px' }"
      @click="onChartClick"
   />
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, toRef, watch } from 'vue'
import _merge from 'lodash/merge'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

const props = defineProps({
   options: {
      type: Object,
   },
   height: {
      type: [Number, String],
   },
   width: {
      type: [Number, String],
   },
})

const emits = defineEmits(['chartClick'])
const optionInfos = toRef(props, 'options')
const option = ref(null)

//provide(THEME_KEY, 'dark')

watch(optionInfos, (val) => {
   option.value = val
})

const onChartClick = (params) => {
   emits('chartClick', params)
}
</script>

<style scoped>
.chart {
   height: 40vh;
}
</style>
