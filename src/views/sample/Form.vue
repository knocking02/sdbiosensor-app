<template>
   <q-page padding>
      <div class="q-pa-md" style="max-width: 400px">
         <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <v-select :options="option" label="사업정보" @update-value="getValue" ref="selectRef" />
            <q-input
               filled
               v-model="id"
               label="ID *"
               hint="영문 숫자 조합 8자리 이상"
               lazy-rules
               :rules="validator.id"
            ></q-input>
            <q-input
               filled
               v-model="password"
               label="PASSWORD *"
               hint="영문 숫자 특수기호 조합 8자리 이상"
               lazy-rules
               :rules="validator.password"
            ></q-input>

            <q-input filled v-model="name" label="NAME *" lazy-rules :rules="validator.name"></q-input>
            <q-input filled v-model="email" label="EMAIL *" lazy-rules :rules="validator.email"></q-input>
            <q-input v-model="birth" filled type="date"></q-input>
            <q-input filled type="number" v-model="age" label="AGE *" lazy-rules :rules="validator.age"></q-input>
            <q-input v-model="mobile" filled type="tel" label="Mobile *" :rules="validator.mobile"></q-input>
            <q-toggle v-model="accept" label="I accept the license and terms"></q-toggle>

            <div>
               <q-btn label="Submit" type="submit" color="primary"></q-btn>
               <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
            </div>
         </q-form>
      </div>
   </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { getCurrentInstance, ref } from 'vue'
import VSelect from '@/components/form/Select.vue'

const { proxy } = getCurrentInstance()
const $q = useQuasar()
const name = ref(null)
const age = ref(null)
const accept = ref(false)
const id = ref(null)
const password = ref(null)
const email = ref(null)
const birth = ref(null)
const mobile = ref(null)

const selectRef = ref(null)
const option = [
   {
      label: 'Google',
      value: 'Google',
      description: 'Search engine',
      category: '1',
   },
   {
      label: 'Facebook',
      value: 'Facebook',
      description: 'Social media',
      category: '1',
   },
   {
      label: 'Twitter',
      value: 'Twitter',
      description: 'Quick updates',
      category: '2',
   },
   {
      label: 'Apple',
      value: 'Apple',
      description: 'iStuff',
      category: '2',
   },
   {
      label: 'Oracle',
      value: 'Oracle',
      disable: true,
      description: 'Databases',
      category: '3',
   },
]

const getValue = (value) => {
   console.log('selected', value)
}

const search = (value) => {
   console.log(value)
}
const validator = {
   id: [(val) => proxy.$validator.checkEmpty(val, 'Please input id'), (val) => proxy.$validator.checkId(val)],
   password: [
      (val) => proxy.$validator.checkEmpty(val, 'Please input password'),
      (val) => proxy.$validator.checkPassword(val),
   ],
   name: [(val) => proxy.$validator.checkEmpty(val, 'Please input name')],
   age: [
      (val) => proxy.$validator.checkEmpty(val, 'Please input age'),
      (val) => proxy.$validator.checkAge(val, 'Please type a real age'),
   ],
   email: [(val) => proxy.$validator.checkEmpty(val, 'Please input email'), (val) => proxy.$validator.checkEmail(val)],
   mobile: [
      (val) => proxy.$validator.checkEmpty(val, 'Please input mobile'),
      (val) => proxy.$validator.checkMobile(val),
   ],
}

const onSubmit = () => {
   if (accept.value !== true) {
      $q.notify({
         color: 'red-5',
         textColor: 'white',
         icon: 'warning',
         message: 'You need to accept the license and terms first',
      })
   } else {
      $q.notify({
         color: 'green-4',
         textColor: 'white',
         icon: 'cloud_done',
         message: 'Submitted',
      })
   }
}

const onReset = () => {
   name.value = null
   age.value = null
   accept.value = false
   id.value = null
   password.value = null
   birth.value = null
   email.value = null
   mobile.value = null
   selectRef.value.clear()
}
</script>

<style scoped></style>
