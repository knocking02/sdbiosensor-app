<template>
   <v-select v-model="dateRange" :options="deteOpt" label="기간설정" square @update-value="setSearchDate" />
   <v-date-range-picker ref="datePic" @update-value="updateValue" :isCenter="isCenter" />
</template>

<script setup>
import VSelect from '@/components/form/Select.vue'
import VDateRangePicker from '@/components/form/VDateRangePicker.vue'

import { ref, defineProps, defineEmits, onMounted, defineExpose } from 'vue'

const emits = defineEmits(['update-value'])

const props = defineProps({
   dateOptions: {
      type: Array,
      default: [
         { label: '1개월', value: { range: 1, rangeType: 'months' } },
         { label: '3개월', value: { range: 3, rangeType: 'months' } },
         { label: '6개월', value: { range: 6, rangeType: 'months' } },
      ],
   },
   defaultOption: {
      // range : Number
      // rangeType : String - days / months / years
      // ex) {value : { range: 1, rangeType: 'months',  } }
      type: Object,
   },
   isCenter: {
      type: Boolean,
      default: true,
   },
})

const datePic = ref()
const deteOpt = [{ label: '전체', value: 'all' }]

const updateValue = (e) => {
   emits('update-value', e)
}

const dateRange = ref('all')

const setSearchDate = (e) => {
   if (e.value === 'all') datePic.value.reset()
   else {
      const { rangeType, range } = { ...e.value }
      datePic.value.setRangeDate(range, rangeType)
   }
}

const onReset = () => {
   if (props.defaultOption) {
      setSearchDate(props.defaultOption)
      dateRange.value = props.defaultOption.value
   } else {
      setSearchDate({ label: '전체', value: 'all' })
      dateRange.value = 'all'
   }
}

onMounted(() => {
   props.dateOptions.forEach((i) => deteOpt.push(i))
   if (props.defaultOption) {
      setSearchDate(props.defaultOption)
      dateRange.value = props.defaultOption.value
   }
})

defineExpose({
   onReset,
})
</script>
