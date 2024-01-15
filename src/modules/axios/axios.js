import axios from 'axios'
import { SessionStorage, LocalStorage } from 'quasar'

const seviceAxios = {
   process(axiosFunc) {
      // 로딩바 Start
      return new Promise((resolve, reject) => {
         axiosFunc
            .then((res) => {
               resolve(res.data)
            })
            .catch((error) => {
               reject(error)
            })
            .finally(() => {
               // 로딩바 End
            })
      })
   },

   get(url, param = {}, isAuth = true) {
      this.setHeaders(isAuth)
      return this.process(axios.get(url, { params: param }), isAuth)
   },

   post(url, param = {}, isAuth = true, ext = {}) {
      this.setHeaders(isAuth)
      return this.process(axios.post(url, param, ext))
   },

   put(url, param = {}, isAuth = true) {
      this.setHeaders(isAuth)
      return this.process(axios.put(url, param))
   },

   delete(url, param = {}, isAuth = true) {
      this.setHeaders(isAuth)
      return this.process(axios.delete(url, { params: param }))
   },

   // header 정보 추가
   setHeaders(isAuth) {
      if (isAuth && LocalStorage.getItem('authToken'))
         axios.defaults.headers.common['Authorization'] = `Bearer ${LocalStorage.getItem('authToken')}`
      else delete axios.defaults.headers.common.Authorization
   },

   // header 토큰 정보 추가
   setAuthTokens(token) {
      if (token) {
         LocalStorage.set('authToken', token)
         axios.defaults.headers.common['Authorization'] = `Bearer ${LocalStorage.getItem('authToken')}`
      } else {
         this.removeAuthTokens()
      }
   },

   setUserInfo(user) {
      SessionStorage.set('user', user)
   },

   // header 토근 정보 삭제
   removeAuthTokens(token) {
      LocalStorage.remove('authToken')
      SessionStorage.remove('user')
      delete axios.defaults.headers.common.Authorization
   },
}

export default seviceAxios
