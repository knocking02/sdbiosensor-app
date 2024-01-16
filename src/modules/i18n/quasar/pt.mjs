import langPT from 'quasar/lang/pt'
import _merge from 'lodash/merge'

// 변결할 내용 서술
const lang = {}

const service = _merge(langPT, lang)
export default service
