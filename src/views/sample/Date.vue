<template>
   <q-page padding>
      <h6>Quasar Date Picker</h6>
      <div class="q-pa-md" style="max-width: 300px">
         <q-input filled v-model="calendarDate1">
            <template v-slot:append>
               <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                     <q-date v-model="calendarDate1" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                           <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                     </q-date>
                  </q-popup-proxy>
               </q-icon>
            </template>
         </q-input>
      </div>

      <div class="q-pa-md" style="max-width: 300px">
         <q-input filled v-model="calendarDate2">
            <template v-slot:prepend>
               <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                     <q-date v-model="calendarDate2" mask="YYYY-MM-DD HH:mm">
                        <div class="row items-center justify-end">
                           <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                        </div>
                     </q-date>
                  </q-popup-proxy>
               </q-icon>
            </template>

            <template v-slot:append>
               <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                     <q-time v-model="calendarDate2" mask="YYYY-MM-DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                           <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                        </div>
                     </q-time>
                  </q-popup-proxy>
               </q-icon>
            </template>
         </q-input>
      </div>
      <div class="q-pa-md">
         <DateRangePicker rangeType="date" :range="1"></DateRangePicker>
      </div>

      <div class="q-pa-md" style="max-width: 300px">
         <q-input filled :model-value="`${dateRange.from} - ${dateRange.to}`">
            <template v-slot:append>
               <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                     <q-date v-model="dateRange" range>
                        <div class="row items-center justify-end">
                           <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                     </q-date>
                  </q-popup-proxy>
               </q-icon>
            </template>
         </q-input>
      </div>

      <div class="q-pa-md">
         <q-date v-model="calendarDate3" range></q-date>
      </div>

      <h6>Vue Datepicker</h6>
      <div class="q-pa-md">
         <date-picker @update-value="getValue($event)" placeholder="날짜를 선택해주세요" :min-date="new Date()" />
      </div>

      <div class="q-pa-md">
         <VDateRangePicker required @update-value="getValue($event)" :isCenter="false"></VDateRangePicker>
      </div>

      <div class="q-pa-md">
         <el-date-range-picker
            start-placeholder="시작 날짜"
            end-placeholder="끝 날짜"
            range-separator="에서"
            @update-value="getValue"
         />
      </div>

      <!-- <div class="q-pa-md">
         <time-picker
            :disabled-hour="[1, 2, 3, 4, 5]"
            placeholder="Arbitrary time"
            @update-value="getValue"
            :disabled-date="disabledDate"
         />
      </div> -->

      <div class="q-pa-md"></div>
   </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { date } from 'quasar'
import DateRangePicker from '@/components/form/DateRangePicker.vue'
import DatePicker from '@/components/form/DatePicker.vue'
import VDateRangePicker from '@/components/form/VDateRangePicker.vue'
import ElDateRangePicker from '@/components/form/ElDateRangePicker.vue'

const timestamp = Date.now()
const calendarDate1 = ref(date.formatDate(timestamp, 'YYYY-MM-DD'))
const calendarDate2 = ref(date.formatDate(timestamp, 'YYYY-MM-DD HH:mm'))
const calendarDate3 = ref({ from: '2023/06/08', to: '2023/06/17' })
const dateRange = ref({ from: '2022/01/01', to: '2022/01/05' })

const value1 = ref()

const value2 = ref < [Date, Date] > [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
const options = ref(['0kg', '1kg', '2kg', '3kg', '4kg'])

const updateValue = (value) => {
   console.log(value)
}
const getValue = (value) => {
   console.log(value)
}

const disabledDate = (time) => {
   const date = new Date()
   return time.getTime() > date.now()
}
</script>
