<template>
   <q-page padding>
      <div class="q-pa-md">
         <div>총 : {{ $util.comma(totalCount) }}건</div>
         <table-list
            ref="tableRef"
            title=""
            :rows="rows"
            :columns="columns"
            :paginationInfo="paginationInfo"
            rowKey="pntPlcySn"
            selection="multiple"
            :hide-pagination="false"
            separator="horizontal"
            :loading="loading"
            isDetailBtn
            detailBtnText="수정"
            @onPageChange="onPageChange"
            @onDetail="showPopup"
         >
            <template v-slot:body-cell-pntSeCd="props">
               <q-td>
                  <div class="tbEllipsis" style="text-align: left; padding: 0px 3px 0px 3px">
                     {{ props.props.row.pntSeCd === 'BSI1301' ? '일반적립' : '특별적립' }}
                  </div>
               </q-td>
            </template>
         </table-list>
      </div>
   </q-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import usePagination from '@/composables/usePagination'
import TableList from '@/components/table/TableList.vue'

const { proxy } = getCurrentInstance()

const parameter = ref({})

const { totalCount, rows, paginationInfo, loading, onPageChange, getDatas, onDetail } = usePagination({
   object: 'sample',
   method: 'getPointList',
   parameter: parameter.value,
   pageSizeNum: 5,
   pageRowsPerPage: 10,
})

const columns = [
   { name: 'row-number', align: 'center', label: 'No.', headerStyle: 'width: 2%' },
   { name: 'pntSeCd', align: 'center', label: '구분', field: 'pntSeCd' },
   { name: 'pntKndCd', align: 'center', label: '종류', field: 'pntKndCd', type: 'code' },
   { name: 'pntPlcyNm', align: 'center', label: '정책명', field: 'pntPlcyNm' },
   { name: 'saveExhsPnt', align: 'center', label: '포인트', field: 'saveExhsPnt', type: 'number' },
   {
      name: 'ymd',
      align: 'center',
      label: '정책기간',
      field: 'ymd',
      format: (_, row) => `${proxy.$util.formatDate(row.plcyBgngYmd)} ~ ${proxy.$util.formatDate(row.plcyEndYmd)}`,
      headerStyle: 'width: 10%',
   },
   {
      name: 'maxGiveCnt',
      align: 'center',
      label: '최대횟수',
      field: 'maxGiveCnt',
      format: (val, row) => (row.giveLmtYn === 'N' ? '제한 없음' : proxy.$util.comma(val)),
   },
   {
      name: 'vldWeekCycl',
      align: 'center',
      label: '유효일',
      field: 'vldWeekCycl',
      format: (val) => (val === null ? '-' : `${val} 주`),
   },
   { name: 'regId', align: 'center', label: '등록자', field: 'regId' },
   { name: 'regDt', align: 'center', label: '등록일', field: 'regDt', type: 'date' },
   { name: 'chgDt', align: 'center', label: '최종변경일', field: 'chgDt', type: 'date' },
   { name: 'rmrkCn', align: 'center', label: '비고', field: 'rmrkCn' },
]

const showPopup = () => {
   proxy.$dialog.open({
      type: 'alert',
      message: '상세보기....',
   })
}
</script>

<style scoped></style>
