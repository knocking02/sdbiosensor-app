<template>
   <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'" style="max-width: 450px">
      <!--q-card-section>
         <div class="row items-center no-wrap">
            <div class="col-4" style="padding-right: 10px"></div>
            <div class="col-8" style="padding-left: 20px"></div>
         </div>
      </q-card-section>
      <q-separator></q-separator -->
      <q-card-actions>
         <q-list style="max-width: 400px; height: 630px">
            <q-item
               v-for="theme in themeList"
               :key="theme.THM_THEME_ID"
               class="q-my-sm"
               clickable
               v-ripple
               @click.stop="onThemeClick(theme)"
            >
               <q-item-section avatar>
                  <q-avatar>
                     <img :src="`https://map.seoul.go.kr${theme.THM_IMG_MAIN_URI2}`" />
                  </q-avatar>
               </q-item-section>

               <q-item-section>
                  <q-item-label>{{ theme.THM_THEME_NAME }}</q-item-label>
                  <q-item-label caption lines="1" class="ellipsis-2-lines">{{ theme.THM_THEME_DETAIL }}</q-item-label>
               </q-item-section>
               <q-menu>
                  <div class="row no-wrap q-pa-md">
                     <div class="column">
                        <q-list>
                           <q-item
                              v-for="subcate in theme.SUBCATE"
                              :key="subcate.SUB_CATE_ID"
                              class="q-my-sm"
                              clickable
                              v-ripple
                           >
                              <q-item-section avatar>
                                 <q-avatar>
                                    <img :src="`https://map.seoul.go.kr${subcate.SUB_CATE_IMG_URI}`" />
                                 </q-avatar>
                              </q-item-section>

                              <q-item-section>
                                 <q-toggle
                                    color="blue"
                                    v-model="subcateChks"
                                    :label="subcate.SUB_CATE_NAME"
                                    :val="subcate.SUB_CATE_ID"
                                    @update:model-value="onThemeSubcateClick(theme)"
                                 />
                                 <q-item-label caption lines="1" class="ellipsis-2-lines"></q-item-label>
                              </q-item-section>
                           </q-item>
                        </q-list>
                     </div>

                     <q-separator vertical inset class="q-mx-lg" />

                     <div class="column">
                        <q-list>
                           <q-item
                              v-for="contents in themeContentsList"
                              :key="contents.COT_CONTS_ID"
                              class="q-my-sm"
                              clickable
                              v-ripple
                           >
                              <q-item-section avatar>
                                 <q-avatar v-if="contents.COT_IMG_MAIN_URL">
                                    <img :src="`https://map.seoul.go.kr${contents.COT_IMG_MAIN_URL}`" />
                                 </q-avatar>
                              </q-item-section>

                              <q-item-section>
                                 <q-toggle
                                    color="blue"
                                    v-model="contentsChk"
                                    :label="contents.COT_CONTS_NAME"
                                    :val="contents.COT_CONTS_ID"
                                    @update:model-value="onThemeContentsClick(contents)"
                                 />
                                 <q-item-label caption lines="1" class="ellipsis-2-lines"></q-item-label>
                              </q-item-section>
                           </q-item>
                        </q-list>
                     </div>
                  </div>
               </q-menu>
            </q-item>
         </q-list>
         <q-inner-loading
            :showing="isLoading"
            label="Please wait..."
            label-class="text-teal"
            label-style="font-size: 1.1em"
         />
      </q-card-actions>
      <q-card-actions vertical>
         <Pagination
            :page="pagination.page"
            :total="pagination.total"
            :size="pagination.size"
            :rowsPerPage="pagination.rowsPerPage"
            @pageChanged="onPageChange"
         >
         </Pagination>
      </q-card-actions>
   </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getCurrentInstance } from 'vue'
import { onMounted } from 'vue'
import Pagination from '@/components/pagination/Pagination.vue'
import _mapValues from 'lodash/mapValues'
import _findIndex from 'lodash/findIndex'

const emits = defineEmits(['themeSelect'])
const { proxy } = getCurrentInstance()
const isLoading = ref(false)

const currentPage = ref(7)
const totalCount = ref(0)
const pagination = computed(() => {
   return {
      page: currentPage.value,
      total: totalCount.value,
      size: 8,
      rowsPerPage: 9,
   }
})

// 테마 목록 정보 가져오기
const themeList = ref({})
const selectedTheme = ref(null)
const subcateChks = ref([])
const getThemeList = () => {
   isLoading.value = true
   proxy.$axios.smap.getThemeList(currentPage.value).then((res) => {
      if (res) {
         totalCount.value = res.head.TOTAL_COUNT
         themeList.value = res.body
      }

      isLoading.value = false
   })
}

/** 테마 클릭 */
const onThemeClick = (item) => {
   selectedTheme.value = item
   const ids = item.SUBCATE.map((item) => item.SUB_CATE_ID)
   subcateChks.value = ids
   let subcate_id = item.THM_THEME_ID + ',' + ids.join(',')
   getThemeContentsList(item.THM_THEME_ID, subcate_id)
}

/** 테마 하위 카테고리 클릭 */
const onThemeSubcateClick = (item) => {
   let subcate_id = item.THM_THEME_ID + ',' + subcateChks.value.join(',')
   getThemeContentsList(item.THM_THEME_ID, subcate_id)
}

/** 테마 콘텐츠 목록 가져오기 */
const themeContentsList = ref([])
const contentsChk = ref([])
const getThemeContentsList = (theme_id, subcate_id) => {
   let param = {
      coord_x: 126.9752884,
      coord_y: 37.5649732,
      distance: 3000,
      search_type: 0,
      search_name: '',
      theme_id: theme_id,
      subcate_id: subcate_id,
   }
   proxy.$axios.smap.getThemeContentsList(param).then((res) => {
      themeContentsList.value = res.body
   })
}

/** 테마 컨텐츠 클릭 */
const onThemeContentsClick = (contents, icon) => {
   const i = _findIndex(selectedTheme.value.SUBCATE, { SUB_CATE_ID: contents.COT_THEME_SUB_ID })

   emits('themeSelect', {
      theme: contents,
      icon: selectedTheme.value.SUBCATE[i].SUB_CATE_IMG_URI,
   })
}

const onPageChange = (page) => {
   currentPage.value = page
   getThemeList(page)
}

onMounted(() => {
   getThemeList()
})
</script>

<style scoped></style>
