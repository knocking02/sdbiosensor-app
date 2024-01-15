<template>
   <q-layout view="lHh Lpr lFf">
      <SampleHeader title="Sample" @navOpen="open" class="bg-secondary"></SampleHeader>
      <SampleNav :leftDrawerOpen="leftDrawerOpen"></SampleNav>

      <q-page-container>
         <Breadcrumbs homepath="sample"></Breadcrumbs>
         <slot></slot>
      </q-page-container>

      <Footer></Footer>
   </q-layout>
</template>

<script setup>
import SampleHeader from '@/components/layout/header/SampleHeader.vue'
import SampleNav from '../nav/SampleNav.vue'
import Footer from '../footer/Footer.vue'
import Breadcrumbs from '../Breadcrumbs.vue'
import { ref } from 'vue'

const leftDrawerOpen = ref(true)
const open = (val) => {
   leftDrawerOpen.value = val
}
</script>
