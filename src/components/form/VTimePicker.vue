<template>
   <vue-date-picker class="timer" v-model="time" time-picker @update:model-value="updateValue" />
</template>

<script setup>
import { ref, defineEmits, defineProps, watch, onMounted } from 'vue'
import vueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const emits = defineEmits(['update-value'])
const props = defineProps({
   t: {
      type: Object,
   },
})

const time = ref({
   hours: new Date().getHours(),
   minutes: new Date().getMinutes(),
})
const updateValue = (e) => {
   console.log(e)
   emits('update-value', e)
}

watch(
   () => props.t,
   (val) => {
      time.value = val
   },
)

onMounted(() => {
   if (!!props.t) time.value = props.t
})
</script>
