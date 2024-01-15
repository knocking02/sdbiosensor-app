import { date, format } from 'quasar'
import axios from 'axios'
import { getCurrentInstance } from 'vue'
import _orderBy from 'lodash/orderBy'
import _mapValues from 'lodash/mapValues'
import { constant } from './constant'
import { LocalStorage } from 'quasar'

import ko_code from '../i18n/codes/ko-code.json'
import en_code from '../i18n/codes/en-code.json'

const { pad } = format

export const util = {
   /** 공통 코드 셋팅 */
   setCommonCodes() {
      /*
      let codeList = LocalStorage.getItem('code-list')
      let params =
         !codeList || codeList.length === 0
            ? {}
            : {
                 headers: {
                    'If-Modified-Since': LocalStorage.getItem('code-last-modified'),
                 },
              }
      return new Promise((resolve, reject) => {
         axios
            .get('/adm/common/code/v1/downloadAllCodes.do', params)
            .then((res) => {
               if (res.status === 200) {
                  codeList = res.data
                  LocalStorage.set('code-list', codeList)
                  LocalStorage.set('code-last-modified', res.headers['last-modified'])
                  resolve(codeList)
               }
            })
            .catch((error) => {
               resolve(codeList)
            })
      }) */

      return new Promise((resolve, reject) => {
         LocalStorage.set('code-list', ko_code)
         resolve(ko_code)
      })
   },

   /** 공통 코드 조회 */
   getCodes(group, reference, proxy2) {
      const proxy = getCurrentInstance() ? getCurrentInstance().proxy : proxy2
      let codes = proxy.$codes[group]

      // 참조 코드
      if (reference) {
         codes = codes.filter((code) => code.rfrncCol1Cn === reference)
      }

      if (codes && codes.length > 0) {
         // useYn == 'Y', sortOrd 로 정렬
         return _orderBy(
            codes.filter((code) => code.useYn === 'Y' && code.pstgYn === 'Y'),
            ['sortOrd'],
            ['asc'],
         )
      } else {
         return []
      }
   },

   /** 공통코드 조회 (exceptionCode :일정코드 제외) */
   getConvertCodes(group, exceptionCode) {
      let codes = this.getCodes(group)
      if (exceptionCode !== '') codes = codes.filter((code) => code.sclsfCd !== exceptionCode)
      codes = this.convertObjectKey(codes, { label: 'sclsfNm', value: 'sclsfCd' })

      return codes
   },

   /** 첫글자 대문자 변환 */
   capitalize(str) {
      return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
   },

   isEmpty(str) {
      return str === null || str === undefined || str === ''
   },

   comma(val) {
      if (!val) return '0'

      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
   },

   convertObjectKey(arr, target) {
      arr.forEach((item) => {
         Object.keys(target).forEach((key) => {
            item[key] = item[target[key]]
         })
      })
      return arr
   },

   /** 날짜 포맷 변경 */
   formatDate(strDate, format) {
      if (!strDate) return ''

      //strDate = strDate.replace(/\s/gi, '')
      let formatDate =
         new Date(strDate) == 'Invalid Date' && strDate.length == 8
            ? strDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
            : strDate

      const formatStr = format ? format : 'YYYY.MM.DD'
      return date.formatDate(new Date(formatDate), formatStr)
   },

   /** 요일 구하기 ex) getDayOfWeek('2023-09-11') */
   getDayOfWeek(dateStr) {
      const week = ['일', '월', '화', '수', '목', '금', '토']
      const dayOfWeek = week[new Date(dateStr).getDay()]
      return dayOfWeek
   },

   /** 시간, 분 format */
   getHourMinStr(min) {
      let v = Number(min)
      if (v === 0) return '0분'
      let h = Math.floor(v / 60),
         m = Math.round(v % 60)
      let str = ''
      if (h > 0) str += h + '시간 '
      if (m > 0) str += m + '분'
      return str
   },

   /** 시간, 분 format */
   getHourMinStrHtml(min) {
      let v = Number(min)
      if (v === 0) return '<span class="num">0<span class="unit">분</span></span>'
      let h = Math.floor(v / 60),
         m = Math.round(v % 60)
      let str = ''
      if (h > 0) str += '<span class="num">' + h + '<span class="unit">시간</span></span>'
      if (m > 0) str += '<span class="num">' + m + '<span class="unit">분</span></span>'
      return str
   },

   getFullYmdStr(dateStr) {
      var format = /[12][0-9]{3}-[0-9]{2}-[0-9]{2}/
      if (dateStr.search(format) == -1) return dateStr

      var _year = dateStr.substr(0, 4)
      var _month = dateStr.substr(5, 2)
      var _day = dateStr.substr(8, 2)

      return _year + '년 ' + _month + '월 ' + _day + '일 (' + this.getDayOfWeek(dateStr) + ')'
   },

   convertYN(code) {
      if (!code) {
         return ''
      }
      return code === 'Y' ? '예' : '아니오'
   },

   // 20220523 -> 2022.05.23
   convertDate(dateArg) {
      if (dateArg && dateArg.length !== 8) return dateArg
      return typeof dateArg === 'string' ? `${dateArg.slice(0, 4)}.${dateArg.slice(4, 6)}.${dateArg.slice(6, 8)}` : ''
   },

   // 20220523 -> 2022-05-23
   convertDateHy(dateArg) {
      if (dateArg && dateArg.length !== 8) return dateArg
      return typeof dateArg === 'string'
         ? `${dateArg.slice(0, 4)}-${dateArg.slice(4, 6)}-${dateArg.slice(6, 8)}`
         : new Date()
   },

   convertTimeStampToDate(timeStamp) {
      if (!timeStamp) {
         return ''
      }
      let ddd = new Date(timeStamp)
      return date.formatDate(ddd, 'YYYY.MM.DD')
   },

   convertTimeStampToDateTime(timeStamp) {
      if (!timeStamp) {
         return ''
      }
      let ddd = new Date(timeStamp)
      return date.formatDate(ddd, 'YYYY.MM.DD HH:mm:ss')
   },

   // 만 나이 계산
   getWesternAge(birthday) {
      if (!birthday) return ''
      let today = new Date()
      let birthDay = new Date(this.convertDate(birthday))
      let age = today.getFullYear() - birthDay.getFullYear()

      let todayMonth = today.getMonth() + 1
      let birthMonth = birthDay.getMonth() + 1

      if (birthMonth > todayMonth || (birthMonth === todayMonth && birthDay.getDate() >= today.getDate())) {
         age--
      }
      return age > -1 ? age : 0
   },

   downloadExcelFile(url, params, method = 'get') {
      const config = {
         method: method,
         url: url,
         responseType: 'blob',
      }

      if (method === 'get') {
         config.params = params
      } else {
         config.data = params
      }

      axios(config).then((res) => {
         console.log(res)

         const url = window.URL.createObjectURL(new Blob([res.data], { type: 'ms-vnd/excel' }))
         const link = document.createElement('a')
         link.href = url
         link.setAttribute('download', decodeURI(res.headers['content-disposition'].split('=')[1].replace(/"/gi, '')))
         document.body.appendChild(link)
         link.click()
      })
   },

   convertCodeToTxt(code) {
      if (!code) {
         return ''
      }
      return contentCode[code]
   },

   convertTarget(list, codeType) {
      if (!list || !list.length) {
         return ''
      }

      if (codeType === 'COM0901') {
         return '전체'
      }
      const total = list.length - 1

      if (total === 0) {
         return list[0].userNm
      } else {
         return list[0].userNm + ' 외 ' + (list.length - 1) + '명'
      }
   },

   convertTxtToDate(dateArg) {
      if (!dateArg) {
         return null
      }
      return new Date(`${dateArg.slice(0, 4)}-${dateArg.slice(4, 6)}-${dateArg.slice(6, 8)}`)
   },

   convertTimeTengTeng(time) {
      return time.slice(0, 2) + ':' + time.slice(2, 4)
   },

   // new Date() -> 2023.10.22
   convertDateToDot(ddd = new Date()) {
      return date.formatDate(ddd, 'YYYY.MM.DD')
   },

   // new Date() -> 2023.10.22 00:00:00
   convertDateTimeToDot(ddd = new Date()) {
      return date.formatDate(ddd, 'YYYY.MM.DD HH:mm:ss')
   },

   // code에 맞는 문자 출력 ex... SYS2401 -> 서비스 이용약관
   getCodeString(groupCode, code) {
      const { proxy } = getCurrentInstance()
      const arr = proxy.$util.getCodes(groupCode)
      for (let item of arr) {
         if (code === item.sclsfCd) {
            return item.sclsfNm
         }
      }

      return ''
   },

   // 1305 -> 13시05분
   getKorHourMin(fourStr) {
      return `${fourStr.slice(0, 2)}시${fourStr.slice(2, 4)}분`
   },

   // 핸드폰 앞자리 번호들
   getMobilePhoneNumberTypes() {
      return ['010', '011', '016', '019']
   },

   // 예, 아니오 options datas
   getYNoptionsList() {
      return [
         { label: '예', value: 'Y' },
         { label: '아니오', value: 'N' },
      ]
   },

   // 전화번호에 하이픈(-)을 추가하여 반환한다.
   phoneNumber(phoneNumber) {
      if (!phoneNumber) return ''
      return phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3')
   },

   // Text 개행 처리
   textReplaceBr(str) {
      if (!str) return ''
      return str.replace(/\n/g, '<br/>')
   },

   // 지정한(width) 자리수로 만들어줌 09,008...
   pad(n, width) {
      n = n + ''
      return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
   },

   // 0시~23시
   getHourList() {
      const arr = []
      for (let i = 0; i <= 23; i++) {
         arr.push(pad(i, 2))
      }
      return arr
   },

   // 0분~55분 - 5분 단위
   getMinList() {
      const arr = []
      for (let i = 0; i < 60; i += 5) {
         arr.push(pad(i, 2))
      }
      return arr
   },

   strToDate(dateStr) {
      return date.extractDate(dateStr, 'YYYYMMDD')
   },

   // 차트 툴팁
   tooltipFormatter(flag, value) {
      if (flag === 'D') {
         return this.getFullYmdStr(value)
      } else if (flag === 'W') {
         const d = value.split('월')
         return d[0] + '월 ' + d[1]
      } else if (flag === 'M') {
         const d = value.split('-')
         return d[0] + '년 ' + d[1] + '월'
      } else {
         return value
      }
   },

   // 요일 구하기 (ex) 이번주 월요일)
   getBeginOfWeek(date = new Date(), startOfWeek = 1) {
      const result = new Date(date)
      while (result.getDay() !== startOfWeek) {
         result.setDate(result.getDate() - 1)
      }
      return result
   },

   // html 태그 제거
   removeHtmlTag(str) {
      if (!str) return ''
      return str.replace(/<[^>]*>?/g, '')
   },

   getExtensionOfFilename(fileVal) {
      const fileLength = fileVal.length
      const fileDot = fileVal.lastIndexOf('.')
      const fileType = fileVal.substring(fileDot + 1, fileLength).toLowerCase()
      return fileType
   },

   // 차트 색상값 생성
   getColors() {
      const colors = []
      for (let i = 0; i <= 50; i++) {
         colors.push(this.createHex())
      }

      return [...constant.CHART_COLOR, ...colors]
   },

   // 동적 색상값(HEX) 얻기
   createHex() {
      let hex = '#'
      for (let i = 0; i < 6; i++) {
         const val = Math.round(Math.random() * 0xf).toString(16)
         hex += val
      }

      return hex
   },

   /** 필요한 공통합수 서술 */
}

export default {
   install: (app) => {
      app.config.globalProperties.$util = util
   },
}
