<template>
   <q-dialog v-model="model" :full-width="fullWidth" :full-height="fullHeight">
      <q-card class="column">
         <q-card-section>
            <div class="text-h6">{{ props.title }}</div>
         </q-card-section>

         <q-card-section class="col q-pt-none">
            <slot></slot>
            <slot name="body"></slot>
         </q-card-section>

         <q-card-actions align="right" class="bg-white text-teal">
            <slot name="footer"></slot>
         </q-card-actions>
      </q-card>
   </q-dialog>
</template>
<script setup>
import { ref } from 'vue'

const model = ref(false)

const props = defineProps({
   title: {
      type: String,
      default: '팝업',
   },
   fullWidth: {
      type: Boolean,
      default: false,
   },
   fullHeight: {
      type: Boolean,
      default: false,
   },
   model: {
      type: Boolean,
      default: false,
   }
})
const toggle = () => {
   model.value = !model.value
}

defineExpose({
   toggle,
})
</script>
<style scope></style>
