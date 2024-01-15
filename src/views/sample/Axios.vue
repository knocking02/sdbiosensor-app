<template>
   <q-page padding>
      <div class="column">
         <div class="col">
            <div class="text-h5" style="padding-bottom: 20px">Axios Test</div>
            <div class="text-h7">서울시 등록 휴대폰 조회</div>
            <div class="q-pa-md" style="width: 500px; height: 500px">
               <textarea rows="15" cols="60">{{ data }}</textarea>
            </div>
         </div>
      </div>
   </q-page>
</template>

<script setup>
import { getCurrentInstance, inject, onMounted, ref } from 'vue'

//const axios = inject('$axios')
const { proxy } = getCurrentInstance()
const data = ref([])

// const getData = () => {
//    proxy.$axios.sample
//       .getSampleDatas()
//       .then((res) => {
//          data.value = res
//       })
//       .catch((error) => {
//          console.log(error)
//       })
// }

const userPhoneCheck = (id) => {
   proxy.$axios.sample.getMemberPhoneNum(id).then((res) => {
      data.value = res
   })
}

onMounted(() => {
   //getData()
   userPhoneCheck('knocking01')
})
</script>

<style></style>
