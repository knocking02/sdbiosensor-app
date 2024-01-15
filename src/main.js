import 'quasar/dist/quasar.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { Quasar, Notify, Dialog, Loading, Cookies, LocalStorage, SessionStorage } from 'quasar'
import ko from 'quasar/lang/ko-KR'
import i18n from './modules/i18n'
import Tr from './modules/i18n/translation'
import directives from './modules/directives'
import axios from './modules/axios'
import util from './modules/utils/util'
import constant from './modules/utils/constant'
import validator from './modules/utils/validator'
import dialog from './modules/utils/dialog'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

import Qcalendar from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/dist/index.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(Quasar, {
   lang: ko,
   plugins: {
      Notify,
      Dialog,
      Loading,
      Cookies,
      LocalStorage,
      SessionStorage,
   },
})
app.use(axios)
app.use(util)
app.use(constant)
app.use(validator)
app.use(dialog)
app.use(i18n)
app.use(Qcalendar)

directives(app)

// 공통코드 셋팅 (다국어 셋팅)
await app.config.globalProperties.$util.setCommonCodes().then((codeList) => {
   app.config.globalProperties.$codes = codeList
   app.use(Tr, { codeList })
})

app.config.globalProperties.$t = (key) => {
   return i18n.global.te(key) ? i18n.global.t(key) : ''
}

app.mount('#app')
