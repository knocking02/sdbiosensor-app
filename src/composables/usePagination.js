import { computed, ref, onMounted, getCurrentInstance } from 'vue'
import { useQuasar } from 'quasar'

export default ({
   object,
   method,
   parameter = {},
   pageSizeNum = 10,
   pageRowsPerPage = 15,
   deleteMtd,
   deleteParam,
   callBackFn,
   cancel,
   searchTxt,
   isMoreView = false,
}) => {
   const { proxy } = getCurrentInstance()

   const loading = ref(false)
   const rows = ref([])

   const $q = useQuasar()
   const currentPage = ref(1)
   const totalCount = ref(0)
   const pageSize = ref(pageSizeNum)
   const rowsPerPage = ref(pageRowsPerPage)

   const tableRef = ref(null)
   const moreViewParams = ref({
      nextKeys: '',
      prevKeys: '',
   })

   const paginationInfo = computed(() => {
      return {
         page: currentPage.value,
         total: totalCount.value,
         size: pageSize.value,
         rowsPerPage: rowsPerPage.value,
      }
   })

   const onPageChange = (page) => {
      currentPage.value = page
      // totalCount.value += page * 5
      getDatas(tempParameter.value)
   }

   const onMoreView = (param) => {
      getDatas(tempParameter.value)
   }

   // 상세보기 팝업 or view page 이동
   const isDetailPopup = ref(false)
   const contents = ref('')
   const onDetail = (row) => {
      isDetailPopup.value = true
      contents.value = row.title
   }

   const resData = ref({})
   const tempParameter = ref('')

   // 데이타 가져오기
   const getDatas = (row = parameter, pageNo = currentPage.value) => {
      loading.value = true
      tempParameter.value = Object.assign({}, row)
      const params = {
         pageNo: pageNo,
         rowCount: rowsPerPage.value,
         ...row,
      }

      if (isMoreView) {
         params.nextKeys = moreViewParams.value.nextKeys
      }

      proxy.$axios[object][method](params).then((res) => {
         resData.value = res.data

         if (res.resCd === '200') {
            const datas = res.data.list || res.data

            if (isMoreView) {
               rows.value = moreViewParams.value.nextKeys === '' ? datas : [...rows.value, ...datas]
               moreViewParams.value.nextKeys = res.data.nextKeys
            } else {
               rows.value = datas
            }

            currentPage.value = res.data.pageNo
            totalCount.value = res.data.totalCount || rows.value.length

            if (object === 'dashboard') {
               currentPage.value = res.data.counselingVOPage.pageNo
               totalCount.value = res.data.counselingVOPage.totalCount
               rows.value = res.data.counselingVOPage.list
            }
         } else if (res.resCd === '204') {
            rows.value = []
            totalCount.value = 0
         }
         loading.value = false
      })
   }

   const deleteItem = () => {
      let selectedArr = tableRef.value.selected

      if (selectedArr.length) {
         let params = {}
         params[deleteParam.name] = []

         for (let item of selectedArr) {
            params[deleteParam.name].push(item[deleteParam.data])
         }

         proxy.$axios[object][deleteMtd](params).then((res) => {
            tableRef.value.clearSelection()
            proxy.$dialog.open({
               type: 'alert',
               message: '삭제하였습니다',
            })
            getDatas()
            if (typeof callBackFn === 'function') callBackFn()
         })
      } else {
         proxy.$dialog.open({
            type: 'alert',
            message: '게시글을 선택해주세요.',
         })
      }
   }

   const clearMoreViewParams = () => {
      moreViewParams.value = {
         nextKeys: '',
         prevKeys: '',
      }
   }

   onMounted(() => {
      // 날짜 조회가 필요없는 경우
      if (!cancel) {
         getDatas(parameter)
      }
   })

   return {
      rows,
      paginationInfo,
      loading,
      onDetail,
      onPageChange,
      getDatas,
      totalCount,
      deleteItem,
      tableRef,
      resData,
      onMoreView,
      clearMoreViewParams,
   }
}
