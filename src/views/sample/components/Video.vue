<template>
   <div>
      <q-card class="my-card bg-purple text-white">
         <q-card-section>
            <div class="text-h6">{{ title }} Tab</div>
            <div class="text-subtitle2">by John Doe</div>
         </q-card-section>

         <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
         </q-card-actions>
      </q-card>
   </div>
</template>

<script setup>
const props = defineProps({
   title: {
      type: String,
   },
})
</script>

<style scoped></style>
