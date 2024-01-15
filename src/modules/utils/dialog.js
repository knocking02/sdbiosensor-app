import { Dialog } from 'quasar'
import CustomDialog from '@/components/dialog/CustomDialog.vue'

export const dialog = {
   open({ ...options }) {
      return Dialog.create({
         component: CustomDialog,

         componentProps: {
            type: options.type,
            message: options.message,
         },
      })
         .onOk(() => {
            if (options.type == 'confirm' && typeof options.action === 'function') {
               options.action()
            }
         })
         .onCancel(() => {
            //console.log('Cancel')
         })
         .onDismiss(() => {
            //console.log('Called on OK or Cancel')
         })
   },
}

export default {
   install: (app) => {
      app.config.globalProperties.$dialog = dialog
   },
}
