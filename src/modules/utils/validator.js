import { util } from './util'

const onlyKor = /^[가-힣]+$/
const onlyEng = /^[a-zA-Z]+$/
const onlyNum = /^[0-9]*$/
const onlyUpperEng = /^[A-Z]*$/

const validator = {
   checkEmpty: (val, message) => !util.isEmpty(val) || message,
   checkId: (val, message) => {
      let regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/
      return regPass.test(val) || '영문, 숫자 조합으로 8~20자리 입력해주세요'
   },
   checkCode: (val, message) => {
      let regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,20}$/
      return regPass.test(val) || '영문, 숫자 조합으로 4~20자리 입력해주세요'
   },
   check4UpperCaseCode: (val, message) => {
      let regPass = /^[A-Z]{4}$/
      return regPass.test(val) || '영문 대문자 4자리로 입력해주세요'
   },
   checkPassword: (val, message) => {
      let regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,30}$/
      return regPass.test(val) || '영문, 숫자, 특수기호 조합으로 9~30자리 입력해주세요'
   },
   checkEmail: (val, message) => {
      let regPass = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
      return regPass.test(val) || '이메일 형식이 아닙니다.'
   },
   checkAge: (val, message) => (val > 0 && val < 100) || message,
   checkMobile: (val, message) => {
      let regPass = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
      return regPass.test(val) || '핸드폰 번호 형식이 아닙니다.'
   },
   onlyKor: (val, message) => onlyKor.test(val) || '한글만 입력해주세요.',
   onlyEng: (val, message) => onlyEng.test(val) || '영문만 입력해주세요.',
   onlyNum: (val, message) => onlyNum.test(val) || message || '숫자만 입력해주세요.',
   onlyUpperEng: (val, message) => onlyUpperEng.test(val) || '영문 대문자만 입력해주세요.',

   checkCorporateRegiNumber: (number) => {
      let result = false
      const numberMap = number.split('').map(function (d) {
         return parseInt(d, 10)
      })
      if (numberMap.length == 10) {
         const keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5]
         let chk = 0
         keyArr.forEach((d, i) => {
            chk += d * numberMap[i]
         })
         chk += parseInt((keyArr[8] * numberMap[8]) / 10, 10)
         result = Math.floor(numberMap[9]) === (10 - (chk % 10)) % 10
      }
      return result || '사업자등록번호가 유효하지 않습니다.'
   },
}

export default {
   install: (app) => {
      app.config.globalProperties.$validator = validator
   },
}
