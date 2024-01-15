<template>
     <div class="move_attach_box">
        <div class="move_cont_area attch">
           <label class="lab_txt">동영상 첨부</label>
           <div class="move_cont">
              <input v-model="uploadName" placeholder="첨부파일" class="inp" readonly/>
              <label for="video" class="btn_search"><span>파일찾기</span></label>
              <input type="file" accept=".mov,.mp4" id="video" @change="changeEvent" :disabled="disabled" />
           </div>
           <p class="know_red_txt">*동영상은 최대 20MB까지 등록할 수 있습니다.</p>
        </div>
     </div>
</template>
<script setup>
import { ref, getCurrentInstance, computed } from 'vue'
import { useQuasar, date } from 'quasar';
import useStore from '@/stores'

const store = useStore()
const $q = useQuasar()
const { proxy } = getCurrentInstance()

const uploadName = computed({
   get() {
      return props.displayValue
   }
})

const props = defineProps({
  disabled: {
     type: Boolean,
     default: false,
  },
  displayValue: {
   type: String,
   default: ''
  }
})

const emits = defineEmits(['update-value', 'updateFileName'])

const fnGetFileSize = (filesize) => {
    var text = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(filesize) / Math.log(1024));
    return (filesize / Math.pow(1024, e)).toFixed(2) + " " + text[e];
}

const changeEvent = (e) => {
   const form = new FormData()
   var file = e.target.files[0]

   form.append('file', file)

   const size = fnGetFileSize(file.size)
   const num = Number(size.split(' ')[0])
 
   // if (num > 20) {
   //   $q.dialog({
   //     title: '유효성 검사',
   //     message: '20MB를 초과하였습니다.',
   //     html: false,
   //   })
 
   //   return
   // }
   
   const userId = store.auth.user.mngrInfo.mngrId
   const videoId = date.formatDate(new Date(), 'YYYYMMDDHHmmss') + '_' + userId
   proxy.$axios.common.uploadVideo(videoId, form)
   .then(res => {
      getVideoAddrEmit(videoId)
   })
}

const getVideoAddrEmit = (videoId) => {
   $q.loading.show()
   proxy.$axios.common.getVideoAddr({ videoSyncNo: videoId })
      .then(res => {
         $q.loading.hide()
         if (res.resCd === '200') {
            emits('update-value', res.data[0].fileUrlAddr)
            emits('updateFileName', res.data[0].localFileNm)
         } else {
            proxy.$dialog.open({
               type: 'error',
               message: res.resMsg
            })
         }
      })
}
</script>
<style scoped>
.filebox .upload-name {
  display: inline-block;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 78%;
  color: #999999;
}
.filebox label {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 40px;
  margin-left: 10px;
}
.filebox input[type='file'] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
.thumnail {
  width: 200px;
  height: 150px;
  border: 1px solid #ccc;
}
</style>
