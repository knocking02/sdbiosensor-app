<template>
   <div>
      <q-card class="my-card">
         <q-card-section>
            <div class="text-h6">{{ title }} Tab</div>
            <div class="text-subtitle2">by John Doe</div>
         </q-card-section>

         <q-separator></q-separator>

         <q-card-actions vertical>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
         </q-card-actions>
      </q-card>
   </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
   title: {
      type: String,
   },
})
onMounted(() => {
   console.log('Address')
})
</script>

<style scoped></style>
