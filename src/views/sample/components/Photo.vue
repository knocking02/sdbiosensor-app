<template>
   <div>
      <q-card class="my-card">
         <q-card-section>
            <div class="text-h6">{{ title }} Tab</div>
            <div class="text-subtitle2">by John Doe</div>
         </q-card-section>

         <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
         </q-card-section>
      </q-card>

      <q-card class="my-card">
         <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom text-subtitle2 text-center">Title</div>
         </q-img>
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
