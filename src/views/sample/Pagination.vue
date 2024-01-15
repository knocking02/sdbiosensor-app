<template>
   <q-page padding>
      <Pagination
         :page="pagination.page"
         :total="pagination.total"
         :size="pagination.size"
         :rowsPerPage="pagination.rowsPerPage"
         @pageChanged="onPageChange"
      >
      </Pagination>
   </q-page>
</template>

<script setup>
import { ref } from 'vue'
import Pagination from '@/components/pagination/Pagination.vue'

const currentPage = ref(1)

const pagination = ref({
   page: currentPage.value,
   total: 211,
   size: 7,
   rowsPerPage: 10,
})

const onPageChange = (page) => {
   currentPage.value = page
}
</script>

<style scoped></style>
