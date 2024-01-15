<template>
   <vue-scroll-picker
      :options="props.options"
      v-model="currentValue"
      :placeholder="props.placeholder"
      @update:modelValue="updateModel"
   />
</template>
<script setup>
import { VueScrollPicker } from 'vue-scroll-picker'
import { ref } from 'vue'

const currentValue = ref(null)

const props = defineProps({
   options: {
      type: Array,
      default: []
   },
   placeholder: {
      type: String,
      default: 'Select one'
   }
})

const emits = defineEmits(['updateValue'])
const updateModel = () => {
   emits('updateValue', currentValue.value)
}
</script>
<style src="vue-scroll-picker/lib/style.css"></style>