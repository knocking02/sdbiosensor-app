<template>
   <q-page padding>
      <div class="q-pa-md">
         <div class="column">
            <div class="col" style="padding: 15px">
               <v-option-group v-model="radioModel" type="radio" code="BSI36" isAll></v-option-group>
            </div>
            <q-separator></q-separator>
            <div class="col" style="padding: 15px">
               <v-option-group v-model="checkboxModels" type="checkbox" :options="options" isAll></v-option-group>
            </div>
            <q-separator></q-separator>
            <div class="col" style="padding: 15px">
               <v-select v-model="selectModel" label="선택하세요." :options="options" />
               <v-select v-model="selectModels" label="선택하세요." code="BSI36" multiple />
            </div>
            <q-separator></q-separator>
         </div>
      </div>
   </q-page>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import VSelect from '@/components/form/Select.vue'
import VOptionGroup from '@/components/form/OptionGroup.vue'

const radioModel = ref('BSI3601')
const checkboxModels = ref(['BSI3601'])
const selectModel = ref('')
const selectModels = ref(['BSI3602'])
const options = [
   { value: 'BSI3601', label: '사업종료' },
   { value: 'BSI3602', label: '참여유형변경' },
   { value: 'BSI3603', label: '분실/파손' },
   { value: 'BSI3604', label: '기타(특이사항)' },
]
</script>

<style scoped></style>
