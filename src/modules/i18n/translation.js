import { LocalStorage } from 'quasar'
import i18n from '.'
import { Quasar } from 'quasar'
import _mapValues from 'lodash/mapValues'

let thisApp = null
export const Trans = {
   get defaultLocale() {
      return import.meta.env.VITE_DEFAULT_LOCALE
   },

   get supportedLocales() {
      return import.meta.env.VITE_SUPPORTED_LOCALES.split(',')
   },

   set currentLocale(newLocale) {
      i18n.global.locale.value = newLocale
   },

   getQuasarLocale(locale) {
      if (locale === 'ko') {
         return 'ko-KR'
      } else if (locale === 'en') {
         return 'en-US'
      }
   },

   getConvertCodes(codes) {
      const _preCodes = []
      _mapValues(codes, (codes) => {
         _preCodes.push(...codes)
      })
      const result = Object.assign(
         {},
         ..._preCodes.map((code) => {
            return { [code.sclsfCd]: code.sclsfNm }
         }),
      )
      return { code: result }
   },

   async switchLanguage(newLocale) {
      Trans.currentLocale = newLocale

      try {
         // quasar language setting
         await import(`./quasar/${Trans.getQuasarLocale(newLocale)}.mjs`).then((language) => {
            Quasar.lang.set(language.default)
         })
      } catch (error) {}

      LocalStorage.set('user-locale', newLocale)
   },

   isLocaleSupported(locale) {
      return Trans.supportedLocales.includes(locale)
   },

   getUserLocale() {
      const locale = Trans.getPersistedLocale()
      return locale ? locale : Trans.defaultLocale
   },

   getPersistedLocale() {
      const persistedLocale = LocalStorage.getItem('user-locale')
      if (Trans.isLocaleSupported(persistedLocale)) {
         return persistedLocale
      } else {
         return null
      }
   },
}
export default {
   install: async (app, options) => {
      thisApp = app
      await Trans.switchLanguage(Trans.getUserLocale())
      const message = Trans.getConvertCodes(options.codeList)
      i18n.global.mergeLocaleMessage(Trans.getUserLocale(), message)
   },
}
