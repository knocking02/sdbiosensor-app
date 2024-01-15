<template>
   <q-layout view="hHh lpR fFf">
      <q-page-container>
         <q-page class="bg-light-green window-height window-width row justify-center items-center">
            <div class="column">
               <div class="row">
                  <h5 class="text-h5 text-white q-my-md">Login</h5>
               </div>
               <div class="row">
                  <q-card square bordered class="q-pa-lg shadow-1">
                     <q-card-section>
                        <q-form class="q-gutter-md">
                           <q-input square filled clearable v-model="id" type="text" label="id" />
                           <q-input square filled clearable v-model="password" type="password" label="password" />
                           <q-radio v-model="authType" val="admin" label="Administrator"></q-radio>
                           <q-radio v-model="authType" val="manager" label="Manager"></q-radio>
                        </q-form>
                     </q-card-section>
                     <q-card-actions class="q-px-md">
                        <q-btn
                           unelevated
                           color="light-green-7"
                           size="lg"
                           class="full-width"
                           label="Login"
                           @click="login"
                        />
                     </q-card-actions>
                     <q-card-section class="text-center q-pa-none">
                        <p class="text-grey-6">Not reigistered? Created an Account</p>
                     </q-card-section>
                  </q-card>
               </div>
            </div>
         </q-page>
      </q-page-container>
   </q-layout>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import useStore from '../../stores'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const { proxy } = getCurrentInstance()
const id = ref('admin')
const password = ref('1234')
const authType = ref('admin')

const login = async () => {
   const store = useStore()
   await store.auth.login(id.value, password.value, authType.value)
}
</script>

<style scoped></style>
