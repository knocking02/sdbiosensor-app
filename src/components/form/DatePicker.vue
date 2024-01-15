<template>
   <vue-date-picker
      v-model="ddd"
      :format="format"
      locale="locale"
      :placeholder="placeholder"
      :hide-navigation="['time']"
      class="calendar"
      clearable
      :min-date="minDateModi"
      teleport-center
      select-text="선택"
      cancelText="취소"
      :autoApply="true"
   />
</template>

<script setup>
import { reactive, computed, getCurrentInstance } from 'vue'
import vueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ko } from 'date-fns/locale'
import { date } from 'quasar'

const { proxy } = getCurrentInstance()
const emits = defineEmits(['update-value'])

const props = defineProps({
   placeholder: {
      type: String,
      default: '날짜를 선택해주세요.',
   },
   modelValue: {
      type: Date,
      default: new Date(),
   },
   minDate: {
      // 최소 날짜 ex) new Date()
      type: Date,
      default: null,
   },
})

const ddd = computed({
   get() {
      return new Date(proxy.$util.convertDateHy(props.modelValue))
   },
   set(e) {
      const ddd = date.formatDate(new Date(e), 'YYYYMMDD')
      console.log(ddd)
      emits('update-value', ddd)
   },
})

const minDateModi = computed(() => {
   const day = props.minDate
   if (day) {
      day.setHours(0, 0, 0, 0)
      return day
   }
   return null
})

const format = (date) => {
   const day = date.getDate()
   const month = date.getMonth() + 1
   const year = date.getFullYear()

   return `${year}.${month}.${day}`
}

const locale = reactive(ko)
</script>
