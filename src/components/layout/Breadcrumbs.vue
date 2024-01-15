<template>
   <q-breadcrumbs style="padding: 13px 0px 0px 30px">
      <q-breadcrumbs-el label="Home" icon="home" :to="'/' + `${homepath}`"></q-breadcrumbs-el>
      <template v-for="(matched, index) in router.matched" :key="index">
         <q-breadcrumbs-el :label="matched.meta.name" v-if="index > 0" :to="matched.path"></q-breadcrumbs-el>
      </template>
   </q-breadcrumbs>
</template>

<script setup>
import { useRoute } from 'vue-router'

defineProps(['homepath'])
const router = useRoute()
</script>

<style scoped></style>
