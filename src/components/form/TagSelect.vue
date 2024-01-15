<template>
   <div class="lineBtn_box">
      <div class="line_type_box juC_between">
         {{ txt ? txt : `우측 '추가'버튼을 통해 대상자를 추가해 주세요.` }}
      </div>
      <q-btn unelevated label="추가" class="btn_basic gray btn_icon add" @click="addChip" :disable="disable" />
   </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, watch } from 'vue'
import { useQuasar } from 'quasar'
import TargetMemberSearch from '@/views/common/TargetMemberSearch.vue'

const { proxy } = getCurrentInstance()
const txt = ref('')
const $q = useQuasar()
const props = defineProps({
   modelValue: {
      type: Array,
      default: [],
   },
   trprChcCd: {
      type: String,
   },
   disable: {
      type: Boolean,
      default: false,
   },
})
const emits = defineEmits(['update-value', 'update-txt'])

const addChip = () => {
   $q.dialog({
      component: TargetMemberSearch,
   }).onOk((res) => {
      console.log(res)
      txt.value = res.desc

      if (res.code === 'COM0901') {
         emits('update-value', res)
      } else {
         emits('update-value', res)
      }
      emits('update-txt', res.desc)
   })
}

watch(
   () => props.modelValue,
   (newVal) => {
      if (newVal) {
         if (props.trprChcCd === 'COM0901') {
            txt.value = '전체'
         } else if (typeof props.modelValue[0] === 'object') {
            txt.value = proxy.$util.convertTarget(props.modelValue)
         } else {
            // txt.value = props.modelValue
         }
      }
   },
)

onMounted(() => {
   if (props.modelValue.length) {
   }
})
</script>
<style></style>
