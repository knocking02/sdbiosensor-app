import { getCurrentInstance, onMounted, ref } from 'vue'
import _mapValues from 'lodash/mapValues'

export default ({ dataType = 'code', param }) => {
   const { proxy } = getCurrentInstance()
   const optionInfos = ref([])

   // 공통코드 조회
   const getCodes = (group) => {
      const codes = proxy.$util.getCodes(group)
      optionInfos.value = proxy.$util.convertObjectKey(codes, { label: 'sclsfNm', value: 'sclsfCd' })
   }

   onMounted(async () => {
      if (dataType === 'code' && param) {
         await getCodes(param)
      } else if (dataType === 'yesNo') {
         setTimeout(() => {
            optionInfos.value = [
               { label: '예', value: 'Y' },
               { label: '아니오', value: 'N' },
            ]
         })
      }
   })

   return {
      optionInfos,
      getCodes,
   }
}
