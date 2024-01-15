<template>
   <q-pagination
      v-model="current"
      :max="max"
      direction-links
      boundary-links
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
      color="grey-8"
      active-design="push"
      active-color="blue-grey-4"
      :max-pages="size"
      :ellipses="false"
      :boundary-numbers="false"
      @update:model-value="onChangePage"
   ></q-pagination>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
   page: {
      type: [String, Number],
      default: 1,
   },
   total: {
      type: [String, Number],
      default: 0,
   },
   size: {
      type: Number,
      default: 5,
   },
   rowsPerPage: {
      type: Number,
      default: 10,
   },
})

const emit = defineEmits(['pageChanged'])

const current = computed({
   get() {
      return props.page
   },
   set() {
      
   }
})
const max = computed(() => {
   return Math.ceil(props.total / props.rowsPerPage)
})

const onChangePage = (page) => {
   emit('pageChanged', page)
}
</script>

<style scoped></style>
