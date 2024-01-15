<template>
   <q-table
      flat
      bordered
      ref="tableRef"
      :rows="rows"
      :columns="columnInfos"
      :row-key="rowKey"
      :selection="selection"
      :separator="separator"
      :loading="loading"
      v-model:selected="selected"
      :hide-header="hideHeader"
      :hide-bottom="hideBottom"
      :hide-pagination="false"
      :pagination.sync="pagination"
      :style="{ maxHeight: height + 'px', maxWidth: width + 'px' }"
      @selection="onSelect"
      @row-click="onRowClick"
      :wrap-cells="wrapCells"
      :table-style="'counter-reset: cssRowCounter ' + (pagination.page - 1) * pagination.rowsPerPage + ';'"
   >
      <template v-for="key in slotKeys" :key="key" v-slot:[key]="props">
         <slot :name="key" :props="props"></slot>
      </template>

      <template v-slot:body-cell-row-number="props">
         <q-td :props="props"><span class="rowNumber" /></q-td>
      </template>

      <template v-slot:body-cell-detail="props" v-if="isDetailBtn">
         <q-td :props="props">
            <div>
               <q-btn
                  :ripple="false"
                  unelevated
                  :label="detailBtnText"
                  @click="detail(props.row)"
                  class="btn_basic gray btn_icon edit"
               />
            </div>
         </q-td>
      </template>

      <template v-slot:body-cell-result="props" v-if="isResultBtn">
         <q-td :props="props">
            <div>
               <q-btn
                  :ripple="false"
                  unelevated
                  :label="detailBtnText"
                  @click="detail(props.row)"
                  class="btn_basic gray btn_icon detail"
               />
            </div>
         </q-td>
      </template>

      <template v-slot:body-cell-image="props" v-if="isImageBtn">
         <q-td :props="props">
            <a href="#" @click="image(props.row)">{{ props.value }}</a>
         </q-td>
      </template>

      <template v-slot:loading>
         <q-inner-loading showing color="primary"></q-inner-loading>
      </template>

      <template v-slot:no-data="{ icon, message, filter }">
         <div class="full-width row flex-center text-dark q-gutter-sm nodata">
            <span>{{ message }} </span>
            <!--q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon"></!--q-icon -->
         </div>
      </template>

      <template v-slot:bottom>
         <div class="full-width row flex-center">
            <div class="q-table__separator col"></div>
            <Pagination
               :page="pagination.page"
               :total="pagination.total"
               :size="pagination.size"
               :rowsPerPage="pagination.rowsPerPage"
               @pageChanged="pageChange"
               v-if="!hidePagination"
            >
            </Pagination>
            <q-btn
               :ripple="false"
               unelevated
               label="더보기"
               class="btn_basic gray btn_icon add mT20"
               @click="onMoreView"
               v-if="isMoreView"
            />
            <div class="q-table__separator col"></div>
         </div>
      </template>
   </q-table>
</template>

<script setup>
import { h, ref, toRef } from 'vue'
import { Quasar, useQuasar, date } from 'quasar'
import Pagination from '@/components/pagination/Pagination.vue'
import { computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSlots } from 'vue'
import { getCurrentInstance } from 'vue'
import { onUpdated } from 'vue'
import { createApp } from 'vue'
import tooltip from './tooltip.vue'

const el = ref(null)
const props = defineProps({
   title: {
      // board title
      type: String,
   },
   rows: {
      // datas
      type: Object,
   },
   rowKey: {
      // data key
      type: [String, Function],
   },
   columns: {
      // columns info
      type: Object,
   },
   selection: {
      // select  single, multiple, none
      type: String,
      default: 'none',
   },
   isDetailBtn: {
      // 상세보기 버튼 출력여부
      type: Boolean,
      default: false,
   },
   // 결과보기 버튼 출력여부
   isResultBtn: {
      type: Boolean,
      default: false,
   },
   detailBtnText: {
      // 상세보기 버튼 Text
      type: String,
      default: '상세보기',
   },
   hideHeader: {
      type: Boolean,
      default: false,
   },
   hideBottom: {
      type: Boolean,
      default: false,
   },
   hidePagination: {
      // 페이징 사용여부 (숨기기....)
      type: Boolean,
      default: false,
   },
   separator: {
      type: String, // horizontal, vertical, cell, none
      default: 'horizontal',
   },
   paginationInfo: {
      // 페이지 정보
      type: Object,
      default: () => {
         return { rowsPerPage: 10000 }
      },
   },
   height: {
      // 테이블 높이
      type: [String, Number],
      default: 650,
   },
   width: {
      type: [Number, String],
   },
   loading: {
      type: Boolean,
      default: false,
   },
   wrapCells: {
      type: Boolean, // 내용 줄바꿈
      default: false,
   },
   isRowClick: {
      // row click 여부
      type: Boolean,
      default: true,
   },
   isImageBtn: {
      // image button 클릭
      type: Boolean,
      default: false,
   },
   isMoreView: {
      // 더보기(paging 대신)
      type: Boolean,
      default: false,
   },
   selectedRow: {
      type: Array,
      default: [],
   },
})

const slots = useSlots()
const slotKeys = computed(() => Object.keys(slots))

const $q = useQuasar()
const { t } = useI18n()
const emits = defineEmits([
   'onDetail',
   'onPageChange',
   'onRowClick',
   'update.pagination',
   'onSelect',
   'onImage',
   'onMoreView',
])
const { proxy } = getCurrentInstance()
const tableRef = ref(null)

// colum 공통 format : code, date ....
const columnInfos = props.columns.map((column) => {
   switch (column.type) {
      case 'code':
         column.format = (val) => t('code.' + val)
         break
      case 'useYn':
         column.format = (val) => (val === 'Y' ? '사용' : '미사용')
         break
      case 'yseNo':
         column.format = (val) => (val === 'Y' ? '예' : '아니오')
         break
      case 'sttsYn':
         column.format = (val) => (val === 'Y' ? '완료' : '미확인')
         break
      case 'reqYn':
         column.format = (val) => (val === 'Y' ? '신청' : '미신청')
         break
      case 'number':
         column.format = (val) => proxy.$util.comma(val)
         break
      case 'date':
         column.format = (val) => (val ? date.formatDate(new Date(val), 'YYYY.MM.DD') : '')
         break
      case 'dateTime':
         column.format = (val) => (val ? date.formatDate(new Date(val), 'YYYY.MM.DD HH:mm') : '')
         break
      case 'dateTimes':
         column.format = (val) => (val ? date.formatDate(new Date(val), 'YYYY.MM.DD HH:mm:ss') : '')
         break
      case 'time':
         column.format = (val) => (val ? date.formatDate(new Date(val), 'HH:mm') : '')
         break
      case 'dateNoSpace':
         column.format = (val) => (val ? proxy.$util.convertDate(val) : '')
         break
         break
      default:
         break
   }
   return column
})

if (props.isDetailBtn) {
   columnInfos.push({ name: 'detail', align: 'center', label: '', headerStyle: 'width: 120px' })
}

if (props.isResultBtn) {
   columnInfos.push({ name: 'result', align: 'center', label: props.detailBtnText, headerStyle: 'width: 120px' })
}

const selected = ref([])
const selectedRow = toRef(props, 'selectedRow')
const paginationInfo = toRef(props, 'paginationInfo')
const pagination = computed({
   get() {
      if (props.hideBottom || props.hidePagination) paginationInfo.value.rowsPerPage = 10000
      return paginationInfo.value
   },
   set(pagination) {
      emits('update.pagination', pagination)
   },
})

// row selected event
const onSelect = (rows) => {
   console.log(rows)
   emits('onSelect', rows)
}

const onRowClick = (evt, row, index) => {
   if (props.isRowClick && (evt.target.nodeName === 'TD' || evt.target.nodeName === 'DIV')) {
      //if (props.selection === 'none') selected.value = [row]
      selected.value = [row]
      emits('onRowClick', row)
   }
}

const clearSelection = () => {
   tableRef.value.clearSelection()
}

// 상세 보기
const detail = (row) => {
   emits('onDetail', row)
}

// Pagination event
const pageChange = (page) => {
   emits('onPageChange', page)
}

// More view event
const onMoreView = () => {
   emits('onMoreView')
}

watch(selectedRow, (val) => {
   selected.value = selectedRow.value
})

onUpdated(() => {
   /** column 툴팁 추가 */
   const tableClass = tableRef.value.$el.getElementsByClassName('q-table')[0]
   const tbody = tableClass.querySelector('tbody')
   const tds = tbody.querySelectorAll('td')
   tds.forEach((td, index) => {
      if (td.textContent.length > 0) {
         let scrollWidth = 0,
            clientWidth = 0

         if (td.querySelectorAll('div').length > 0) {
            scrollWidth = td.querySelectorAll('div')[0].scrollWidth
            clientWidth = td.querySelectorAll('div')[0].clientWidth
         } else {
            scrollWidth = td.scrollWidth
            clientWidth = td.clientWidth
         }

         if (scrollWidth > clientWidth) {
            const wrapper = document.createElement('div')
            const instance = createApp(tooltip, {
               message: td.textContent,
            })
            instance.use(Quasar)
            const mounted = instance.mount(wrapper)
            td.append(mounted.$el)
         }
      }
   })
})

defineExpose({
   selected,
   clearSelection,
})
</script>

<style scoped>
.rowNumber::before {
   counter-increment: cssRowCounter;
   content: counter(cssRowCounter);
}
.q-table--bordered {
   border: 0px;
}
</style>
