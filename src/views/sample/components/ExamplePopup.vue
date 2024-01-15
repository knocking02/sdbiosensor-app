<template>
    <q-dialog :model-value="model" :full-width="fullWidth" :full-height="fullHeight">
       <q-card class="column popUp_Layer pop_basic">
          <!--  
             popup 종류
             800size : pop_basic,
             1400size : pop_lager
          -->
          <q-card-section class="pop_header">
             <h3 class="pop_tit">특별모집 등록/수정</h3>
             <q-btn flat label="닫기" v-close-popup square class="btn_icon_nT icon_close" sq />
          </q-card-section>
 
          <q-card-section class="col pop_content">
             <!-- inp_item_area(특별모집군) // -->
             <div class="inp_item_area type2">
                <div class="inp_item_box">
                   <label class="lab_txt">특별모집군</label>
                   <v-select
                      :options="option"
                      label="선택해주세요."
                      @update-value="onChangeValue"
                      ref="selectRef"
                      square
                   />
                </div>
             </div>
             <!-- // inp_item_area(특별모집군)  -->
 
             <!-- inp_item_area(모집방법) // -->
             <div class="inp_item_area type2">
                <div class="inp_item_box">
                   <label class="lab_txt">모집방법</label>
                   <q-input v-model="text" placeholder="텍스트를 입력하세요." outlined square />
                </div>
             </div>
             <!-- inp_item_area(모집방법) // -->
 
             <!-- inp_item_area(모집인원) // -->
             <div class="inp_item_area type2">
                <div class="inp_item_box">
                   <label class="lab_txt">모집인원</label>
                   <q-input v-model="text" placeholder="목표수" outlined square />
                </div>
             </div>
             <!-- inp_item_area(모집방법) // -->
 
             <!-- inp_item_area(모집기관) // -->
             <div class="inp_item_area type2">
                <div class="inp_item_box">
                   <label class="lab_txt">모집기관</label>
                   <q-input v-model="text" placeholder="기관명" outlined square />
                </div>
             </div>
             <!-- inp_item_area(모집기관) // -->
 
             <!-- inp_item_area(모집코드) // -->
             <div class="inp_item_area type2">
                <div class="inp_item_box">
                   <label class="lab_txt">모집기관</label>
                   <q-input v-model="text" placeholder="코드를 입력하세요." outlined square />
                </div>
             </div>
 
             <div class="inp_item_area type2">
                <div class="inp_item_box">
                   <label class="lab_txt">비고</label>
                   <q-input v-model="text" outlined square />
                </div>
             </div>
          </q-card-section>
 
          <q-card-actions align="right" class="bg-white pop_footer">
             <q-btn flat label="저장" v-close-popup :ripple="false" rounded unelevated class="btn_large primary" />
             <q-btn flat label="삭제" v-close-popup :ripple="false" rounded unelevated class="btn_large gray" />
          </q-card-actions>
       </q-card>
    </q-dialog>
 </template>
 
 <script setup>
 import { ref } from 'vue'
 import VSelect from '@/components/form/Select.vue'
 const text = ref('')
 
 const props = defineProps({
    model: {
       type: Boolean,
       default: false,
    },
    fullWidth: {
       type: Boolean,
       default: false,
    },
    fullHeight: {
       type: Boolean,
       default: false,
    },
 })
 
 const option = [
    {
       label: 'Google',
       value: 'Google',
       description: 'Search engine',
       category: '1',
    },
    {
       label: 'Facebook',
       value: 'Facebook',
       description: 'Social media',
       category: '1',
    },
    {
       label: 'Twitter',
       value: 'Twitter',
       description: 'Quick updates',
       category: '2',
    },
    {
       label: 'Apple',
       value: 'Apple',
       description: 'iStuff',
       category: '2',
    },
    {
       label: 'Oracle',
       value: 'Oracle',
       disable: true,
       description: 'Databases',
       category: '3',
    },
 ]
 
 const onChangeValue = (value) => {
    businessNo.value = value.businessNo
 }
 </script>
 <style></style>
 