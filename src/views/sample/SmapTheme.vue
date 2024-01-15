<template>
   <q-page padding>
      <div class="row">
         <div class="col-3" style="padding-right: 10px">
            <ThemeSearch @themeSelect="onThemeSelect"></ThemeSearch>
         </div>
         <div class="col-9">
            <div id="map_" style="height: 700px"></div>
         </div>
      </div>
      <ThemeDetailPopup
         :selectedTheme="selectedTheme"
         :isDetailPopup="isDetailPopup"
         @openCreatePopup="openCreatePopup"
      ></ThemeDetailPopup>
      <TrackingCreatePopup
         :selectedTheme="selectedTheme"
         :isCreatePopup="isCreatePopup"
         @onClickPoints="onClickPoints"
      ></TrackingCreatePopup>
   </q-page>
</template>

<script setup>
import { getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'
import { loadScript, unloadScript } from 'vue-plugin-load-script'
import { useSmap } from './smap/useSmap'
import _findIndex from 'lodash/findIndex'
import useStore from '@/stores'
import ThemeSearch from './smap/ThemeSearch.vue'
import ThemeDetailPopup from './smap/ThemeDetailPopup.vue'
import TrackingCreatePopup from './smap/TrackingCreatePopup.vue'

const store = useStore()
const isLoading = ref(false)
const { proxy } = getCurrentInstance()
const { createDefaultMarker, createMarker, createPolyline, getDistance, getWalkings } = useSmap()

const currentPosition = ref([37.56649, 126.97831]) // 사용자 현재 위치. default: 서울시청
const isDetailPopup = ref(false) // 상세 정보 팝업
const selectedTheme = ref({}) // 선택 테마
const isCreatePopup = ref(false)

// 1.4 km
/** S-MAP 불러오기 */
let map = null // map 객체
let markers = [] // marker
let polylineLayer = null // polyline 객체

const createMap = () => {
   isLoading.value = true
   loadScript('http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapJs&key=' + proxy.$const.SMAP_API_KEY)
      .then(() => {
         map = L.map('map_', {
            continuousWorld: true,
            worldCopyJump: false,
            zoomControl: false, // zoomControl바 출력여부
            zoomAnimation: true,
            fadeAnimation: true,
            inertia: false,
            closePopupOnClick: false,
            attributionControl: true,
            minZoom: 2, // 지도 최소 레벨
         })

         map.setView(currentPosition.value, 7) //지도 좌표 이동

         BaseMapChange(map, L.Dawul.BASEMAP_GEN) // 일반지도
         //OverMapChange(map, L.Dawul.OVERMAP_JIJUK)
         setOldMapOpacity(1)

         // 스케일바
         var scaleBar = new L.Control.Scale({ position: 'bottomright' })
         map.addControl(scaleBar)

         // 레벨바
         var slider = new L.Control.Zoomslider({ position: 'topright' })
         map.addControl(slider)

         // map.on('click', onClickMap)

         isLoading.value = false
      })
      .catch((error) => {
         isLoading.value = false
         console.log(error)
      })
}

// 테마 선택 Events
const onThemeSelect = async (item) => {
   // 마커 그리기
   let marker = await createMarker(map, item.theme, item.icon, onMarkerPopupEvent)
   markers.push(marker)

   // polyline 그리기
   polylineLayer = createPolyline(map, item.theme)
}

/** 마커 팝업 버튼 이벤트 처리 */
const onMarkerPopupEvent = (type, theme, marker) => {
   isDetailPopup.value = false
   isCreatePopup.value = false
   selectedTheme.value = theme
   if (type === 'create') {
      proxy.$dialog.open({
         type: 'alert',
         message: '준비중.....',
      })
   } else if (type === 'detail') {
      getThemeContentsDetail(theme)
   } else if (type === 'remove') {
      const index = _findIndex(markers, { id: marker.id })

      onRemoveCourse(index)

      // polyline 다시 그리기
      polylineLayer = createPolylineOld(map, selectedPoints.value)
   }
}

/** 테마 정보 상세 */
const getThemeContentsDetail = (theme) => {
   // THM_THEME_NAME
   proxy.$axios.smap.getThemeContentsDetail(theme.COT_THEME_ID, theme.COT_CONTS_ID).then((res) => {
      selectedTheme.value = res.body[0]
      selectedTheme.value.THM_THEME_NAME = theme.THM_THEME_NAME
      isDetailPopup.value = true
   })
}

/** 코스 생성 팝업 오픈 */
const openCreatePopup = () => {
   isCreatePopup.value = true
}

/** 테마 포인트 클릭 */
const onClickPoints = (points) => {
   // 마커 그리기
   let marker = createDefaultMarker(map, points[1], points[0])
   markers.push(marker)
}

onMounted(async () => {
   store.drawerOpen.changeDrawerOpen(false)
   await createMap()
})

onUnmounted(() => {
   // 지도 개체 해제, 관련 모든 이벤트 제거
   if (map) map.remove()

   // load된 script 제거
   unloadScript('http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapJs&key=')
      .then(() => {
         console.log('map unload')
      })
      .catch((error) => {
         console.log(error)
      })
})
</script>

<style scoped>
@import 'http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapCss';
.marker_popup {
   background-color: bisque;
   padding: 1em;
   border: solid thin black;
}

.marker_menu {
   list-style-type: none;
   display: flex;
   padding: 0;
   margin-bottom: 0;
   gap: 1em;
}
</style>

<style lang="sass" scoped>
.thead-sticky tr > *,
.tfoot-sticky tr > *
  position: sticky
  opacity: 1
  z-index: 1
  background: gray !important
  color: white

.thead-sticky tr:last-child > *
  top: 0

.tfoot-sticky tr:first-child > *
  bottom: 0
</style>
