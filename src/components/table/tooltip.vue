<template>
   <q-tooltip anchor="center right" self="center left" style="font-size: 13px; font-weight: 500" :offset="[-10, 10]">{{
      message
   }}</q-tooltip>
</template>

<script setup>
const props = defineProps({
   message: {
      type: String,
   },
})
</script>

<style scoped></style>
