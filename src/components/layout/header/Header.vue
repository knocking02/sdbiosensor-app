<template>
   <q-header elevated class="header" height-hint="80">
      <!-- 2023-08-18 클래스 부분 수정 -->
      <div @click="router.push('/admin')" style="cursor: pointer">
         <q-toolbar>
            <q-toolbar-title> 손목닥터9988 로고</q-toolbar-title>
         </q-toolbar>
      </div>

      <div class="right">
         <!-- <q-btn :label="btnDarkLabel" @click="onChangeMode"></q-btn>-->
         <q-btn
            unelevated
            type="button"
            label="Logout"
            @click="onLogout('general')"
            class="btn_basic btn_txt btn_login"
         ></q-btn>
      </div>

      <q-tabs align="left">
         <!-- <q-route-tab to="/admin/business" label="사업관리" v-role="`ADMMENU0001`" />
         <q-route-tab to="/admin/member" label="회원관리" v-role="`ADMMENU0002`" />
         <q-route-tab to="/admin/point" label="포인트관리" v-role="`ADMMENU0003`" />
         <q-route-tab to="/admin/contents" label="콘텐츠관리" v-role="`ADMMENU0004`" />
         <q-route-tab to="/admin/community" label="커뮤니티관리" v-role="`ADMMENU0005`" />
         <q-route-tab to="/admin/counseling" label="상담/민원/메시지" v-role="`ADMMENU0006`" />
         <q-route-tab to="/admin/manager" label="관리자계정" v-role="`ADMMENU0007`" />
         <q-route-tab to="/admin/linkage" label="연동신청" v-role="`ADMMENU0008`" />
         <q-route-tab to="/admin/status" label="현황통계" v-role="`ADMMENU0009`" />
         <q-route-tab to="/admin/service" label="서비스관리" v-role="`ADMMENU0010`" /> -->
      </q-tabs>
   </q-header>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import useStore from '@/stores'

const store = useStore()
const router = useRouter()
const $q = useQuasar()

const mngrInfo = store.auth.user ? store.auth.user.mngrInfo : {}

const onLogout = (type) => {
   stop()
   store.auth.logout(type)
}
</script>

<style scoped></style>
