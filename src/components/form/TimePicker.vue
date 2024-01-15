<template>
   <el-time-picker
      v-model="value1"
      @change="updateValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :disabled-hours="disabledHour"
      :disabled-minutes="disabledMin"
      :disabled-seconds="disabledSec"
   />
</template>
<script setup>
import { ref } from 'vue'
import { ElTimePicker } from 'element-plus'

const value1 = ref()

const props = defineProps({
   placeholder: {
      type: String,
      default: '시간 선택'
   },
   disabled: {
      type: Boolean,
      default: false,
   },
   disabledHour: {
      type: Array,
      default: []
   },
   disabledMin: {
      type: Array,
      default: []
   },
   disabledSec: {
      type: Array,
      default: []
   },
})

const emits = defineEmits(['updateValue'])

const updateValue = () => {
   emits('updateValue', value1.value)
}
const disabledHour = () => {
 return props.disabledHour
}

const disabledMin = () => {
   return props.disabledMin
}

const disabledSec = () => {
   return props.disabledSec
}


</script>
<style>
</style>