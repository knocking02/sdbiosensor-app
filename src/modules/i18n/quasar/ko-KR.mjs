import langKO from 'quasar/lang/ko-KR'
import _merge from 'lodash/merge'

// 변결할 내용 서술
const lang = {
   table: {
      noData: '목록이 없습니다.',
   },
}

const service = _merge(langKO, lang)
export default service
