<template>
   <div>
      <q-card class="my-card bg-secondary text-white">
         <q-card-section>
            <div class="text-h6">{{ title }} Tab</div>
            <div class="text-subtitle2">by John Doe</div>
         </q-card-section>

         <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
         </q-card-section>

         <q-separator dark></q-separator>

         <q-card-actions>
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
   console.log('Mail')
})
</script>

<style scoped></style>
