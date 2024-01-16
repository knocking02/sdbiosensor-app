import { createI18n } from 'vue-i18n'
import ko from './locales/ko.json'
import en from './locales/en.json'
import hi from './locales/hi.json'
import pt from './locales/pt.json'
import numberFormats from './rules/number'
import datetimeFormats from './rules/datetime'

const i18n = createI18n({
   locale: import.meta.env.VITE_DEFAULT_LOCALE,
   fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
   legacy: false,
   globalInjection: true,
   messages: { ko, en, hi, pt },
   numberFormats,
   datetimeFormats,
   missingWarn: false, // 번역 오류시  console warning 비활성화
   fallbackWarn: false, // 번역 오류시  console warning 비활성화
})

// key가 존재 하지 않을시 '' 표시
// i18n.global.t = (key) => {
//    return i18n.global.te(key) ? i18n.global.tm(key) : ''
// }

export default i18n
