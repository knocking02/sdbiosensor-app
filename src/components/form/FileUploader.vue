<template>
   <div class="">
      <div class="row">
         <q-file
            filled
            v-model="files"
            :counter="counter"
            :max-files="maxFiles"
            :multiple="multiple"
            @update:model-value="updateFile"
            ref="fileRef"
            :rules="rules"
            :disable="disable"
            :accept="accept"
            :display-value="displayTxt"
            lazy-rules="ondemand"
            :max-file-size="maxFileSize"
            @rejected="onRejected"
         >
            <template v-slot:append>
               <q-icon name="close" @click.stop.prevent="removeFile" class="cursor-pointer" />
            </template>

            <template v-slot:after>
               <q-btn
                  @click="findFile"
                  unelevated
                  :disable="disable"
                  label="파일 찾기"
                  class="btn_basic gray btn_icon search"
               />
            </template>
         </q-file>
      </div>
   </div>
</template>
<script setup>
import { computed, getCurrentInstance, ref, reactive } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const files = ref(null)
const fileRef = ref(null)

const props = defineProps({
   maxFiles: {
      type: Number,
      default: 1,
   },
   multiple: {
      type: Boolean,
      default: false,
   },
   counter: {
      type: Boolean,
      default: false,
   },
   rules: {
      type: Array,
      default: [],
   },
   disable: {
      type: Boolean,
      default: false,
   },
   accept: {
      type: String,
      default: null,
   },
   displayValue: {
      type: String,
      default: '',
   },
   maxFileSizeMb: {
      type: [String, Number],
      default: 30,
   },
})

const isRemoved = ref(false)

const attachFileNo = reactive({ fileNo: '' })

const maxFileSize = ref(props.maxFileSizeMb * 1048576)

const displayTxt = computed({
   get() {
      if (props.displayValue) {
         if (isRemoved.value) return files.value?.name || ''
         else return files.value?.name || props.displayValue
      }
   },
})

const { proxy } = getCurrentInstance()
const emits = defineEmits(['updateFile', 'updateFileName', 'updateFileValue', 'removeFile'])

const updateFile = (value) => {
   let form = new FormData()
   form.append('uploadFiles', value)

   $q.loading.show()
   proxy.$axios.common.uploadFile(form, attachFileNo).then((res) => {
      $q.loading.hide()
      if (res.resCd === '200') {
         attachFileNo.fileNo = res.data[0].fileNo
         emits('updateFile', res.data[0].fileNo)
         emits('updateFileName', res.data[0].localFileNm)
         emits('updateFileValue', value)
      } else {
         proxy.$dialog.open({
            type: 'error',
            message: res.resMsg,
         })
      }
   })
}

const removeFile = () => {
   files.value = null
   emits('updateFile', null)
   emits('updateFileName', null)
   isRemoved.value = true
}

const findFile = () => {
   fileRef.value.pickFiles()
}

const onRejected = (e) => {
   let errMsg = []
   e.forEach((i) => {
      switch (i.failedPropValidation) {
         case 'max-file-size':
            errMsg.push(`[${i.file.name}]<br/>파일 사이즈가 너무 큽니다.`)
            break
         case 'accept':
            errMsg.push(`[${i.file.name}]<br/>파일 확장자를 확인해 주세요.`)
            break
         case 'max-total-size':
            errMsg.push(`[${i.file.name}]<br/>파일 사이즈가 너무 큽니다.`)
            break
         case 'filter':
            errMsg.push(`[${i.file.name}]<br/>파일 업로드 규칙을 확인해 주세요.`)
            break
         default:
            errMsg.push(`[${i.name}]<br/>${i.failedPropValidation}`)
            break
      }
   })

   return proxy.$dialog.open({
      type: 'error',
      message: errMsg.join('<br/><br/>'),
   })
}
</script>
<style></style>
