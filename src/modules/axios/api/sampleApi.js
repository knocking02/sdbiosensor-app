import axios from '../axios'
import { constant } from '@/modules/utils/constant'

const sample = {
   getPointList() {
      return axios.get('/json/point.json')
   },

   getTableDatas() {
      return axios.get('https://jsonplaceholder.typicode.com/todos')
   },

   // 서울시 등록 휴대폰 조회
   getMemberPhoneNum(id) {
      let param = {
         ServiceKey: 'FJLJKNHST',
         userId: id,
      }
      return axios.get('https://www.seoul.go.kr/member/info/api/getMemberPhoneNum.do', param, false)
   },
}

export default { sample }
