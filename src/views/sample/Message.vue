<template>
   <q-page padding>
      <h4>공통 Message</h4>
      <br />
      <div class="q-pa-md q-gutter-sm">
         <q-btn color="primary" label="Alert" @click="alertDialog"></q-btn>
         <q-btn color="secondary" label="Confirm" @click="confirm"></q-btn>
         <q-btn color="deep-orange" glossy label="Error" @click="error"></q-btn>
         <q-btn color="primary" label="커스텀 팝업" @click="showPopup"></q-btn>
      </div>

   </q-page>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
import { useQuasar } from 'quasar'
import ExamplePopup from './components/ExamplePopup.vue'

const $q = useQuasar()

const proxy = getCurrentInstance().proxy
console.log(proxy)

const showPopup = () => {
   $q.dialog({
      component: ExamplePopup,
      componentProps: {
         model: true,
      }
   }).onOk(() => {
    console.log('OK')
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}

const alertDialog = () => {
   proxy.$dialog.open({
      type: 'alert',
      message: 'Some message..',
   })
}

const createMember = () => {
   alert('success')
}

const confirm = () => {
   proxy.$dialog.open({
      type: 'confirm',
      message: 'Would you like to turn on the wifi?',
      action: createMember,
   })
}

const error = () => {
   proxy.$dialog.open({
      type: 'error',
      message: '403 Error',
   })
}
</script>

<style></style>
