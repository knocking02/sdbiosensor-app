import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrawerOpenStore = defineStore('useDrawerOpen', () => {
   const isDrawerOpen = ref(true)

   const changeDrawerOpen = (is) => (isDrawerOpen.value = is || !isDrawerOpen.value)

   return { isDrawerOpen, changeDrawerOpen }
})
