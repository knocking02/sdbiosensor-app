<template>
   <q-btn :ripple="false" unelevated :label="label" class="btn_basic btn_icon line down" @click="download" />
</template>
<script setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
const props = defineProps({
   label: {
      type: String,
      default: '엑셀 다운로드',
   },
   url: {
      type: String,
      default: '',
   },
   params: {
      type: Object,
   },
})
const download = () => {
   proxy.$util.downloadExcelFile(props.url, props.params)
}
</script>
<style></style>
