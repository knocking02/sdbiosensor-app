import { defineStore } from 'pinia'
import router from '../../router'
import { dialog } from '@/modules/utils/dialog'
import { ref } from 'vue'
import axios from '@/modules/axios/axios'

export const useAuthStore = defineStore(
   'useAuth',
   () => {
      const user = ref(null)

      /** 로그인 */
      async function login(id, password, authType) {
         remove()

         try {
            // TODO : axios api login check ==> get Token

            if (id !== 'admin' || password !== '1234') {
               dialog.open({
                  type: 'error',
                  message: 'Incorrect login ID or password',
               })
            } else {
               // 로그인 성공시 token 정보 get
               // const sampleToken =
               //    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdXNlci5jb20iLCJpYXQiOjE2Nzg5MjAxMjV9.7agGY4Sx7wWY0vZe25tfsrpIcDUHf5N6XP1W3MfxhWI'

               // // axios header 정보 셋팅
               // axios.setAuthTokens(sampleToken)

               // 사용자 정보 가져오기
               getUser(id, authType)

               // if (authType === 'admin') {
               //    router.push('/admin')
               // } else {
               //    router.push('/manager')
               // }
               router.push('/sample')
            }
         } catch (error) {
            console.log(error)
            dialog.open({
               type: 'alert',
               message: 'Incorrect login ID or password',
            })
         }
      }

      /** 로그아웃 */
      function logout() {
         remove()
         router.push('/login')
      }

      /** 로그인 정보 삭제 */
      function remove() {
         axios.removeAuthTokens()
         user.value = null
      }

      /** 사용자 정보 가져오기 */
      function getUser(id, authType) {
         // TODO : token 정보로 사용자 정보 가져오기
         user.value = {
            id: id,
            name: '홍길동',
            authType: authType,
         }
      }

      return { user, login, logout }
   },
   {
      persist: {
         storage: sessionStorage,
      },
   },
)
