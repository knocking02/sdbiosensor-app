<template>
   <vue-date-picker 
   v-model="date" 
   range
   :format="format"
   :hide-navigation="['time']"
   class="calendar"
   @update:model-value="updateValue"
   :min-date="new Date()" 
    />
</template>

<script setup>
import { ref, onMounted, useAttrs } from 'vue';
import vueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref();
const attrs = useAttrs()
const emits = defineEmits(['update-value'])

const format = ([date1, date2]) => {
   let day1, month1, year1
   let day2, month2, year2

   if (date1) {
      day1 = date1.getDate();
      month1 = date1.getMonth() + 1;
      year1 = date1.getFullYear();
   }

   if (date2) {
      day2 = date2.getDate();
      month2 = date2.getMonth() + 1;
      year2 = date2.getFullYear();
   }

  return `${year1}.${month1}.${day1} - ${year2}.${month2}.${day2}`;
}

const updateValue = (e) => {
   let event = format(e)
   emits('update-value', event.split(' - '))
}

onMounted(() => {
   const startDate = new Date();
   const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
   date.value = [startDate, endDate];
})
</script>