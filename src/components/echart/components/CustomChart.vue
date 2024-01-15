<template>
   <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import * as echarts from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { CustomChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([CanvasRenderer, CustomChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

var data = []
var startTime = +new Date()
var categories = ['categoryA', 'categoryB', 'categoryC']
var types = [
   { name: '깊은 수면', color: '#3d4ae1' },
   { name: '얕은 수면', color: '#afb3e5' },
   { name: '깨어있는 시간', color: '#e5114c' },
]
// Generate mock data

categories.forEach(function (category, index) {
   var baseTime = startTime
   var dataCount = 10
   for (var i = 0; i < dataCount; i++) {
      var duration = Math.round(Math.random() * 10000)
      data.push({
         name: types[index].name,
         value: [index, baseTime, (baseTime += duration), duration],
         itemStyle: {
            color: types[index].color,
         },
      })
      baseTime += Math.round(Math.random() * 2000)
   }
})

function renderItem(params, api) {
   var categoryIndex = api.value(0)
   var start = api.coord([api.value(1), categoryIndex])
   var end = api.coord([api.value(2), categoryIndex])
   var height = api.size([0, 1])[1] * 0.6
   var rectShape = echarts.graphic.clipRectByRect(
      {
         x: start[0],
         y: start[1] - height / 2,
         width: end[0] - start[0],
         height: height,
      },
      {
         x: params.coordSys.x,
         y: params.coordSys.y,
         width: params.coordSys.width,
         height: params.coordSys.height,
      },
   )
   //console.log(rectShape)
   return (
      rectShape && {
         type: 'rect',
         transition: ['shape'],
         shape: rectShape,
         style: {
            fill: api.visual('color'),
         },
      }
   )
}

const option = {
   tooltip: {
      formatter: function (params) {
         return params.marker + params.name + ': ' + params.value[3]
      },
   },
   grid: {
      top: 10,
      height: 300,
   },
   xAxis: {
      min: startTime,
      scale: true,
      show: false,
   },
   yAxis: {
      show: false,
      data: categories,
   },
   series: [
      {
         type: 'custom',
         renderItem: renderItem,
         itemStyle: {
            opacity: 0.8,
         },
         encode: {
            x: [1, 2],
            y: 0,
         },
         data: data,
      },
   ],
}
</script>

<style scoped>
.chart {
   height: 40vh;
}
</style>
