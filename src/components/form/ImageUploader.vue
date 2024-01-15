<template>
   <div class="img_uploader">
      <q-uploader
         ref="uploadRef"
         :multiple="multiple"
         accept="image/*"
         :max-files="15"
         @added="changeFile"
         @onRejected="onRejected"
         :disable="disabled"
         hide-upload-btn
      >
         <template v-slot:list="scope">
            <q-list separator>
               <q-item v-for="(file, idx) in fileList" :key="idx">
                  <q-item-section v-if="file.fileUrlAddr" thumbnail class="gt-xs">
                     <img :src="`${file.fileUrlAddr}?_=${+new Date()}`" style="width: 100px" @click="preview(file)" />
                  </q-item-section>

                  <q-item-section v-if="file.fileUrlAddr">
                     <img :src="`${file.fileUrlAddr}?_=${+new Date()}`" style="width: 100px" @click="preview(file)" />
                  </q-item-section>

                  <q-item-section top side>
                     <q-btn class="gt-xs" size="12px" flat round icon="delete" @click="removeFile(file, idx)" />
                  </q-item-section>
               </q-item>
            </q-list>
         </template>
      </q-uploader>
      <q-btn type="button" @click="clickFile" label="파일 업로드" />
   </div>
</template>
<script setup>
import { useQuasar } from 'quasar'
import { getCurrentInstance, ref, computed } from 'vue'

const { proxy } = getCurrentInstance()
const $q = useQuasar()

const uploadRef = ref(null)

const props = defineProps({
   disabled: {
      type: Boolean,
      default: false,
   },
   list: {
      type: Array,
      default: [],
   },
   filesList: {
      type: Array,
      default: [],
   },
   maxFiles: {
      type: Number,
      default: 1,
   },
   multiple: {
      type: Boolean,
      default: false,
   },
})

const fileList = computed({
   get() {
      return props.filesList
   },
})

const emits = defineEmits(['update-value', 'remove-value', 'update-file-name'])

const clickFile = (evt) => {
   uploadRef.value.pickFiles()
}

const onRejected = (rejectedEntries) => {
   $q.notify({
      type: 'negative',
      message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
   })
   return { onRejected }
}

const removeFile = (file, idx) => {
   uploadRef.value.removeFile(file)
   proxy.$axios.common
      .deleteFile({ fileNo: props.filesList[idx].fileNo, fileDtlSn: props.filesList[idx].fileDtlSn })
      .then((res) => {
         if (res.resCd === '200') {
            emits('remove-value', idx)
         } else {
            proxy.$dialog.open({
               type: 'error',
               message: res.resMsg,
            })
         }
      })
}

const preview = (item) => {
   // $q.dialog({
   //    component: ImagePreview,
   //    componentProps: {
   //       imgSrc: item.__img?.src || item.fileUrlAddr,
   //    },
   // })
}

const changeFile = (files) => {
   uploadRef.value.reset()

   let form = new FormData()
   for (let item of files) {
      form.append('uploadFiles', item)
   }

   let params = { fileNo: '' }

   // for (let item of props.filesList) {
   //   if (item.fileNo) {
   //     params.fileNo = item.fileNo
   //   }
   // }

   $q.loading.show()
   proxy.$axios.common.uploadFile(form, params).then((res) => {
      $q.loading.hide()
      if (res.resCd === '200') {
         emits('update-value', res.data[0].fileNo)
         emits('update-file-name', res.data)
         console.log(uploadRef.value)
      } else {
         proxy.$dialog.open({
            type: 'error',
            message: res.resMsg,
         })
      }
   })
}
</script>
