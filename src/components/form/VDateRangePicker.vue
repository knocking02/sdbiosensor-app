<template>
   <div class="daterange">
      <q-field ref="toggle" v-model="diff" :rules="[validation]" borderless dense>
         <template v-slot:control>
            <div class="date_area w100per">
               <div class="inner">
                  <vue-date-picker
                     v-model="startDate"
                     :model-value="startDate"
                     locale="locale"
                     :placeholder="sLabel"
                     :hide-navigation="['time']"
                     @update:model-value="updateValue($event, 'startDate')"
                     class="calendar"
                     clearable
                     :format="format"
                     :disabled="disabled"
                     @open="arrowReplace"
                     :teleport-center="isCenter"
                     select-text="선택"
                     cancelText="취소"
                     :min-date="sMinDate"
                     :autoApply="true"
                  />
                  <!-- :alt-position="customPosition" -->
                  <span class="dash">~</span>
                  <vue-date-picker
                     v-model="endDate"
                     :model-value="endDate"
                     locale="locale"
                     :placeholder="eLabel"
                     :hide-navigation="['time']"
                     @update:model-value="updateValue($event, 'endDate')"
                     class="calendar"
                     clearable
                     :format="format"
                     :disabled="disabled"
                     @open="arrowReplace"
                     :max-date="maxDate"
                     :min-date="startDate"
                     :teleport-center="isCenter"
                     select-text="선택"
                     cancelText="취소"
                     :autoApply="true"
                  />
                  <!-- :alt-position="customPosition" -->
               </div>
            </div>
         </template>
      </q-field>
   </div>
</template>

<script setup>
import { ref, useAttrs, onMounted, reactive, computed, watch, getCurrentInstance } from 'vue'
import vueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { date } from 'quasar'

const props = defineProps({
   sDate: {
      type: [String, Object],
      default: '',
   },
   eDate: {
      type: [String, Object],
      default: '',
   },
   sLabel: {
      type: String,
      default: '시작일',
   },
   eLabel: {
      type: String,
      default: '종료일',
   },
   rangeType: {
      type: String,
      default: '', // days, months, years
   },
   range: {
      type: [String, Number],
      default: '', // 날짜 검색 diff (간격?) ex) 오늘기준 range 일/월/년
   },
   placeholder: {
      type: String,
   },
   required: {
      type: Boolean, // 필수값 여부... true 이면 validation 체크
      default: false,
   },
   disabled: {
      type: Boolean,
      default: false,
   },
   maxDate: {
      type: Date,
   },
   isCenter: {
      type: Boolean,
      default: true,
   },
   sMinDate: {
      type: Date,
   },
})

const { proxy } = getCurrentInstance()
const startDate = ref(null)
const endDate = ref(null)
const model = reactive({
   startDate: '',
   endDate: '',
})

const diff = computed(() => {
   return date.getDateDiff(proxy.$util.convertDate(model.endDate), proxy.$util.convertDate(model.startDate), 'days')
})

const validation = () => {
   if (props.required) {
      if (startDate.value === null || endDate.value === null) {
         return '날짜를 선택해주세요.'
      } else {
         return diff.value > -1 || '날짜 기간 선택이 잘못되었습니다.'
      }
   }
   return true
}

const emits = defineEmits(['update-value'])
const updateValue = (e, p) => {
   model[p] = date.formatDate(new Date(e), 'YYYYMMDD')
   if (model.startDate) model.startDate = model.startDate.replaceAll('.', '')
   if (model.endDate) model.endDate = model.endDate.replaceAll('.', '')
   emits('update-value', model)
}

const format = (date) => {
   const day = date.getDate()
   const month = date.getMonth() + 1
   const year = date.getFullYear()

   return `${year}.${month}.${day}`
}

const arrowReplace = () => {
   setTimeout(() => {
      if (isReplaceArror.value) {
         let x = document.getElementsByClassName('dp__arrow_top')
         if (x[0]) x[0].className = 'dp__arrow_bottom'
      }
   })
}
const isReplaceArror = ref(false)
const customPosition = (e) => {
   isReplaceArror.value = false
   let left = -46,
      top = 41,
      calendarWidth = 260,
      calendarHeight = 328
   let p = document.getElementsByClassName('pop_content')[0]

   if (p) {
      let pop = p.getBoundingClientRect()
      let att = e.getBoundingClientRect()

      if (att.left - pop.left < calendarWidth / 2) left = 0
      if (pop.height - (att.top - pop.top) < calendarHeight) {
         isReplaceArror.value = true
         top = -337
      }
   }

   return { left: left, top: top }
}

const reset = () => {
   model.startDate = ''
   model.endDate = ''
   startDate.value = ''
   endDate.value = ''
   emits('update-value', model)
}

const init = () => {
   if (props.sDate === '' && props.eDate === '') {
      if (props.rangeType !== '' && props.range !== '') {
         startDate.value = date.addToDate(Date.now(), { [props.rangeType]: -props.range })
         endDate.value = Date.now()
      }
   } else {
      const sss = proxy.$util.convertDateHy(props.sDate)
      const eee = proxy.$util.convertDateHy(props.eDate)
      startDate.value = new Date(sss)
      endDate.value = new Date(eee)
   }
   model.startDate = date.formatDate(startDate.value, 'YYYY.MM.DD')
   model.endDate = date.formatDate(endDate.value, 'YYYY.MM.DD')
}

const setStartDate = (start, end) => {
   startDate.value = new Date(proxy.$util.convertDateHy(start))
   model.startDate = date.formatDate(startDate.value, 'YYYY.MM.DD')

   if (end) {
      // endDate.value = end
      endDate.value = new Date(proxy.$util.convertDateHy(end))
      model.endDate = date.formatDate(endDate.value, 'YYYY.MM.DD')
   }
}

const setRangeDate = (range, rangeType, minDate) => {
   const s = date.formatDate(date.addToDate(Date.now(), { [rangeType]: -range }), 'YYYY-MM-DD')
   const m = minDate
   let sDate = s
   if (!!m) sDate = s > m ? s : m

   startDate.value = new Date(sDate)
   endDate.value = Date.now()

   model.startDate = date.formatDate(sDate, 'YYYYMMDD')
   model.endDate = date.formatDate(endDate.value, 'YYYYMMDD')
   emits('update-value', model)
}

onMounted(() => {
   setTimeout(init, 500)
})

defineExpose({
   reset,
   setStartDate,
   setRangeDate,
   init,
})
</script>

<style scoped></style>
