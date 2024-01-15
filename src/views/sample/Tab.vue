<template>
<tabs
   :tabs="tabs"
   ></tabs>
</template>

<script setup>
import { ref, watch } from 'vue'
import Mail from './components/Mail.vue'
import Alarm from './components/Alarm.vue'
import Address from './components/Address.vue'
import Movie from './components/Movie.vue'
import Photo from './components/Photo.vue'
import Video from './components/Video.vue'
import _findIndex from 'lodash/findIndex'

import Tabs from '@/components/tab/Tab.vue'

const tabsDefinition = [
   { name: 'mails', label: 'Mails', component: Mail },
   { name: 'alarms', label: 'Alarms', component: Alarm },
   { name: 'movies', label: 'Movies', component: Movie },
   { name: 'photos', label: 'Photos', component: Photo },
   { name: 'videos', label: 'Videos', component: Video },
   { name: 'addressbook', label: 'Address Book', component: Address },
]

const tabs = ref(tabsDefinition)

</script>

<style scoped></style>
