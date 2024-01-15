<template>
   <q-dialog v-model="isOpen" position="left">
      <q-card class="my-card" style="width: 400px">
         <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">챌린지 코스 등록</div>
            <q-space></q-space>
            <q-btn icon="close" flat round dense v-close-popup></q-btn>
         </q-card-section>

         <q-card-section>
            <div class="text-subtitle1">
               <q-input filled v-model="title" label="코스 제목" :model-value="selectedTheme.COT_CONTS_NAME"></q-input>
               <q-scroll-area style="height: 600px; width: 380px">
                  <q-markup-table>
                     <thead>
                        <tr>
                           <th class="text-center" style="width: 50px"></th>
                           <th class="text-left"><b>경유 목적지 셋팅</b></th>
                        </tr>
                     </thead>

                     <tbody>
                        <tr v-for="(points, i) in selectedTheme.COT_COORD_DATA" :key="i">
                           <td class="text-center">
                              <q-toggle
                                 color="blue"
                                 v-model="chkPoints"
                                 :val="points[0]"
                                 @update:model-value="(val, evt) => onClickPoints(val, points)"
                              />
                           </td>
                           <td class="text-left">{{ points[0] }}, {{ points[1] }}</td>
                        </tr>
                     </tbody>
                  </q-markup-table>
               </q-scroll-area>
            </div>
         </q-card-section>

         <q-card-section class="q-pt-none">
            <q-list separator>
               <q-item>
                  <q-item-section><q-btn label="Submit" type="submit" color="primary"></q-btn></q-item-section>
               </q-item>
            </q-list>
         </q-card-section>
      </q-card>
   </q-dialog>
</template>

<script setup>
import { ref, toRef, watch } from 'vue'

const props = defineProps({
   isCreatePopup: {
      type: Boolean,
      default: false,
   },
   selectedTheme: {
      type: Object,
      default: {},
   },
})

const emits = defineEmits(['onClickPoints'])

const isOpen = ref(false)
const isCreatePopup = toRef(props, 'isCreatePopup')
watch(isCreatePopup, (val) => {
   isOpen.value = val
})

const title = ref('')
const chkPoints = ref([])

const onClickPoints = (val, point) => {
   emits('onClickPoints', point)
}
</script>

<style scoped></style>
