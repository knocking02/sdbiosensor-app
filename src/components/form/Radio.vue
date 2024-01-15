<template>
   <div class="optionGroupEach">
      <q-radio
         v-model="model"
         v-for="(item, idx) of list"
         :key="idx"
         :val="item.value"
         :label="item.label"
         @update:model-value="changeValue"
         :disable="disable"
         class="radio_item"
         color="green"
      ></q-radio>
   </div>
</template>
<script setup>
import { useAttrs, computed } from 'vue'

const model = computed({
   get() {
      return attrs.modelValue
   },
   set(e) {
      emits('updateValue', e)
   },
})
const props = defineProps({
   list: {
      type: Array,
      default: [],
   },
   disable: {
      type: Boolean,
      default: false,
   },
})

const attrs = useAttrs()

const emits = defineEmits(['updateValue'])

const changeValue = (value) => {
   emits('updateValue', value)
}
</script>
<style></style>
