<template>
   <q-dialog v-model="isOpen">
      <q-card class="my-card">
         <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">{{ selectedTheme.THM_THEME_NAME }}</div>
            <q-space></q-space>
            <q-btn icon="close" flat round dense v-close-popup></q-btn>
         </q-card-section>

         <img :src="`https://map.seoul.go.kr${selectedTheme.COT_IMG_MAIN_URL}`" />

         <q-card-section>
            <div class="text-subtitle1">
               <b>{{ selectedTheme.COT_CONTS_NAME }}</b>
               &nbsp;<q-btn size="10px" color="primary" label="코스 등록" @click="openCreatePopup" />
            </div>
         </q-card-section>

         <q-card-section class="q-pt-none">
            {{ selectedTheme.COT_VALUE_01 }}
            <div style="height: 10px"></div>
            <q-list separator>
               <q-item>
                  <q-item-section>{{ selectedTheme.COT_NAME_02 }} : {{ selectedTheme.COT_VALUE_02 }}</q-item-section>
               </q-item>
               <q-item>
                  <q-item-section>{{ selectedTheme.COT_NAME_03 }} : {{ selectedTheme.COT_VALUE_03 }}</q-item-section>
               </q-item>
               <q-item>
                  <q-item-section>{{ selectedTheme.COT_NAME_04 }} : {{ selectedTheme.COT_VALUE_04 }}</q-item-section>
               </q-item>
               <q-item>
                  <q-item-section>{{ selectedTheme.COT_NAME_05 }} : {{ selectedTheme.COT_VALUE_05 }}</q-item-section>
               </q-item>
               <q-item>
                  <q-item-section>{{ selectedTheme.COT_NAME_06 }} : {{ selectedTheme.COT_VALUE_06 }}</q-item-section>
               </q-item>
               <q-item>
                  <q-item-section>{{ selectedTheme.COT_NAME_07 }} : {{ selectedTheme.COT_VALUE_07 }}</q-item-section>
               </q-item>
               <q-item>
                  <q-item-section>{{ selectedTheme.COT_NAME_08 }} : {{ selectedTheme.COT_VALUE_08 }}</q-item-section>
               </q-item>
            </q-list>
         </q-card-section>
      </q-card>
   </q-dialog>
</template>

<script setup>
import { ref, toRef, watch } from 'vue'

const props = defineProps({
   isDetailPopup: {
      type: Boolean,
      default: false,
   },
   selectedTheme: {
      type: Object,
   },
})

const emits = defineEmits(['openCreatePopup'])

const isOpen = ref(false)
const isDetailPopup = toRef(props, 'isDetailPopup')
watch(isDetailPopup, (val) => {
   isOpen.value = val
})

const openCreatePopup = () => {
   isOpen.value = false
   emits('openCreatePopup')
}
</script>

<style scoped></style>
