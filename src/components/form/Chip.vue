<template>
   <q-chip
      :removable="removable"
      v-model="model"
      @remove="deleteChip(props.name)"
      :color="color"
      :text-color="textColor"
      :disable="disable"
      :icon="props.icon"
   >
      {{ name }}
   </q-chip>
</template>
<script setup>
import { ref } from 'vue'

const model = ref(true)

const props = defineProps({
   color: {
      type: String,
      default: 'teal',
   },
   textColor: {
      type: String,
      default: 'white',
   },
   icon: {
      type: String,
      default: 'cake',
   },
   name: {
      type: String,
      default: 'chip',
   },
   disable: {
      type: Boolean,
      default: false,
   },
   removable: {
      type: Boolean,
      default: true,
   },
})

const emits = defineEmits(['deleteValue'])

const deleteChip = () => {
   emits('deleteValue')
}

defineExpose({
   model,
})
</script>
<style></style>
