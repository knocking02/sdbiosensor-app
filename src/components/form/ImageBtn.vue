<template>
   <q-btn
      v-for="(file, index) in files"
      :key="index"
      @click="downloadFile(file.fileDtlSn, file.localFileNm)"
      :ripple="false"
      unelevated
      :label="file.localFileNm || 'loading...'"
      class="btn_basic btn_txt"
   />
</template>

<script setup>
import { ref, defineProps, getCurrentInstance, watch, onMounted } from 'vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
   fileNo: {
      type: Number,
      required: true,
   },
})

const files = ref([{}])

const getFileInfo = async (fileNo) => {
   files.value = [{}]
   await proxy.$axios.common.getFile({ fileNo }).then((res) => {
      if (res.resCd === '200') {
         files.value = res.data
      }
   })
}

const downloadFile = async (fileDtlSn, fileNm) => {
   await proxy.$axios.common.downloadFile({ fileNo: props.fileNo, fileDtlSn }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileNm)
      document.body.appendChild(link)
      link.click()
   })
}

watch(
   () => props.fileNo,
   (val) => {
      if (!!props.fileNo) getFileInfo(val)
   },
)

onMounted(() => {
   if (!!props.fileNo) getFileInfo(props.fileNo)
})
</script>
