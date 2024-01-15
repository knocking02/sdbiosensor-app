<template>
   <div style="display: flex">
      <div :style="{ width: width + 'px' }">
         <q-input filled v-model="startDate" :rules="validator.date">
            <template v-slot:prepend>
               <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                     <q-date v-model="startDate" mask="YYYY-MM-DD" :options="startDateOption">
                        <div class="row items-center justify-end">
                           <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                     </q-date>
                  </q-popup-proxy>
               </q-icon>
            </template>
            <template v-slot:append v-if="rangeType === 'dateHour'">
               <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                     <q-time v-model="startDate" mask="YYYY-MM-DD" format24h>
                        <div class="row items-center justify-end">
                           <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                     </q-time>
                  </q-popup-proxy>
               </q-icon>
            </template>
         </q-input>
      </div>
      <div class="bar">~</div>
      <div :style="{ width: width + 'px' }">
         <q-input filled v-model="endDate" :rules="validator.date">
            <template v-slot:prepend>
               <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                     <q-date v-model="endDate" mask="YYYY-MM-DD" :options="endDateOption">
                        <div class="row items-center justify-end">
                           <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                     </q-date>
                  </q-popup-proxy>
               </q-icon>
            </template>
            <template v-slot:append v-if="rangeType === 'dateHour'">
               <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                     <q-time v-model="endDate" mask="YYYY-MM-DD" format24h>
                        <div class="row items-center justify-end">
                           <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                     </q-time>
                  </q-popup-proxy>
               </q-icon>
            </template>
         </q-input>
      </div>
   </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { date, is } from 'quasar'

const props = defineProps({
   rangeType: {
      type: String,
      default: 'date', // date: 날짜검색, dateHour : 날짜 시간 검색
   },
   range: {
      type: Number,
      default: 0, // 날짜 검색 diff (간격?) ex) 오늘기준 range 일
   },
})

const validator = {
   date: [
      (val) => {
         return date.getDateDiff(endDate.value, startDate.value, 'days') >= 0
      },
   ],
}

const timestamp = Date.now()
const formatPattern = computed(() => (props.rangeType === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'))

const sDate = ref(date.formatDate(date.addToDate(timestamp, { days: -props.range }), formatPattern.value))
const nowDate = ref(date.formatDate(timestamp, formatPattern.value))

const startDate = ref(sDate)
const endDate = ref(nowDate)
const width = computed(() => (props.rangeType === 'date' ? 170 : 210))

const startDateOption = (d) => {
   return date.formatDate(d, formatPattern.value) <= endDate.value
}

const endDateOption = (d) => {
   return date.formatDate(d, formatPattern.value) >= startDate.value
}
</script>

<style scoped>
.bar {
   width: 12px;
   text-align: center;
   height: 56px;
   padding-top: 19px;
   font-weight: 500;
}
</style>
