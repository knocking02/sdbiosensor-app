<template>
   <q-page padding>
      <div class="column">
         <div class="col">
            <div class="text-h5">UTIL Test</div>
            <div class="column" style="height: 150px">
               <div class="col">CONSTANT TEST : {{ $const.SITE_NAME }}</div>
               <div class="col">util TEST : {{ $util.capitalize(title) }}</div>
               <div class="col">CONSTANT TEST : lodash TEST : {{ lodashTest }}</div>
            </div>
         </div>
      </div>
   </q-page>
</template>

<script setup>
import _range from 'lodash/range'
import { ref } from 'vue'

const title = 'hello~~~~'
const lodashTest = _range(1, 3)
const password = ref('abcdefg01234')
</script>

<style></style>
