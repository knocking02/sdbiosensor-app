<template>
   <q-dialog ref="dialogRef" @hide="onDialogHide" :position="pos">
      <q-card style="width: 500px">
         <q-card-section :class="headerVariant">
            <div class="text-h6">{{ $t('label.' + type) }}</div>
         </q-card-section>

         <q-card-section class="pop_content">
            <p class="pop_mainTxt" v-html="message"></p>
            <!-- <p class="pop_subTxt">관리자에게 문의해주세요.</p>
            <a href="#" class="line_txt tel"><span>1811-9988</span></a> -->
         </q-card-section>

         <q-card-actions class="bg-white pop_footer">
            <q-btn
               flat
               label="확인"
               @click="onOKClick"
               :ripple="false"
               rounded
               unelevated
               class="btn_large"
               :class="btnClass"
            />
            <q-btn
               flat
               label="취소"
               @click="onDialogCancel"
               v-if="isCancelShow"
               :ripple="false"
               rounded
               unelevated
               class="btn_large gray"
            />
         </q-card-actions>
      </q-card>
   </q-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { useDialogPluginComponent } from 'quasar'

const props = defineProps({
   type: {
      type: String,
      default: 'alert',
   },
   message: {
      type: String,
   },
   pos: {
      //standard top right bottom left
      type: String,
      default: 'standard',
   },
})

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const isCancelShow = computed(() => props.type === 'confirm')

const headerVariant = computed(() => {
   let variant = ''
   switch (props.type) {
      case 'alert':
         variant = 'text-primary'
         break
      case 'confirm':
         variant = 'text-secondary'
         break
      case 'error':
         variant = 'text-deep-orange'
         break
      default:
         variant = 'text-light'
   }
   return variant
})

const btnClass = computed(() => {
   if (props.type === 'alert') {
      return 'blue'
   } else if (props.type === 'confirm') {
      return 'primary'
   } else if (props.type === 'error') {
      return 'red'
   }
})

function onOKClick() {
   //console.log('ok')
   // on OK, it is REQUIRED to
   // call onDialogOK (with optional payload)
   onDialogOK()
   // or with payload: onDialogOK({ ... })
   // ...and it will also hide the dialog automatically
}
</script>
