import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTemporaryStorage = defineStore('useTemporaryStorage', () => {
   const storage = ref(new Map())

   function save(pageId, data) {
      storage.value.set(pageId, data)
   }

   function getData(pageId) {
      return storage.value.get(pageId)
   }

   function remove(pageId) {
      storage.value.delete(pageId)
   }

   function clear() {
      storage.value.clear()
   }

   return { getData, save, remove, storage }
})
