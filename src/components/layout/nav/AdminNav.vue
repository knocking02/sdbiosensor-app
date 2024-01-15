<template>
   <q-drawer v-model="store.drawerOpen.isDrawerOpen" show-if-above bordered>
      <div class="q-pa-md" style="max-width: 350px">
         <q-list bordered separator>
            <q-item clickable v-ripple to="/admin">
               <q-item-section>
                  <q-item-label>Main</q-item-label>
               </q-item-section>
            </q-item>
         </q-list>
      </div>
   </q-drawer>
</template>
<script setup>
import useStore from '@/stores'

const store = useStore()
</script>
<style scoped></style>
