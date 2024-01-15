<template>
   <q-page padding>
      <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
         <q-card-section>
            <div class="row items-center no-wrap">
               <div class="col-4">
                  <q-input filled v-model="search.str" label="주소 검색" @keyup.enter="searchAddress"></q-input>
               </div>
               <div class="col-8" style="padding-left: 20px">
                  <q-select
                     v-model="search.address"
                     :options="addressDatas"
                     @input="onChange"
                     label="검색결과"
                     @update:model-value="(opt) => onMovePoint(opt.coordinates[0], opt.coordinates[1])"
                  >
                  </q-select>
               </div>
            </div>
         </q-card-section>
         <q-separator></q-separator>
         <q-card-actions>
            <q-btn flat label="일반지도" @click="onMapChange('BASEMAP_GEN')"></q-btn>
            <q-btn flat label="위성지도" @click="onMapChange('BASEMAP_SATE')"></q-btn>
            <q-btn flat label="코스 삭제" @click="onRemoveCourse(0)"></q-btn>
            <q-btn flat label="마커 찍기" @click="mode = 'marker'"></q-btn>
            <q-btn flat label="코스 그리기" @click="mode = 'line'"></q-btn>
            <q-btn flat label="코스 불러오기" @click="onLoadCourse"></q-btn>
            <q-btn flat label="시청 이동" @click="onMovePoint(37.56649, 126.97831)"></q-btn>
            <q-btn flat label="마포 이동" @click="onMovePoint(37.55072253776177, 126.94952260676664)"></q-btn>
            <q-btn flat label="강동구 이동" @click="onMovePoint(37.52987418574927, 127.1327542516944)"></q-btn>
            <q-btn flat label="여의도 이동" @click="onMovePoint(37.52368305544433, 126.926996965973)"></q-btn>
         </q-card-actions>
      </q-card>
      <q-card class="q-mt-md q-mr-sm"></q-card>
      <div class="row">
         <div class="col-7">
            <div id="map_" style="height: 600px"></div>
         </div>
         <div class="col-5" style="padding-left: 10px">
            <q-card-section>
               <div class="text-h6">총거리 {{ totalDistant }}m, 총걸음 {{ totalWalkings.toFixed(1) }}</div>
               <div class="text-subtitle2">예상 시간 : {{ totalTimes }}분</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
               <q-virtual-scroll
                  type="table"
                  style="max-height: 53vh"
                  :virtual-scroll-item-size="48"
                  :virtual-scroll-sticky-size-start="48"
                  :virtual-scroll-sticky-size-end="32"
                  :items="selectedPoints"
               >
                  <template v-slot:before>
                     <thead class="thead-sticky text-left">
                        <tr>
                           <th class="text-center">번호</th>
                           <th class="text-center">좌표</th>
                           <th class="text-center">주소</th>
                           <th class="text-right">거리(m)</th>
                           <th class="text-right">예상걸음수</th>
                        </tr>
                     </thead>
                  </template>

                  <template v-slot:after>
                     <thead class="tfoot-sticky text-left">
                        <tr>
                           <th class="text-center">번호</th>
                           <th class="text-center">좌표</th>
                           <th class="text-center">주소</th>
                           <th class="text-right">거리(m)</th>
                           <th class="text-right">예상걸음수</th>
                        </tr>
                     </thead>
                  </template>
                  <template v-slot="{ item: point, index }">
                     <tr>
                        <td class="text-center">{{ index + 1 }}</td>
                        <td class="text-left">lat: {{ point.lat }}<br />lng: {{ point.lng }}</td>
                        <td class="text-left">{{ point.address.NEW_ADDR }}<br />{{ point.address.LEGAL_ADDR }}</td>
                        <td class="text-right">{{ point.dst.toFixed(1) }}</td>
                        <td class="text-right">{{ point.walkings }}</td>
                     </tr>
                  </template>
               </q-virtual-scroll>
            </q-card-section>
         </div>
      </div>
      <q-dialog v-model="popup">
         <q-card class="my-card">
            <q-card-section class="row items-center q-pb-none">
               <div class="text-h6">{{ detail.title }}</div>
               <q-space></q-space>
               <q-btn icon="close" flat round dense v-close-popup></q-btn>
            </q-card-section>

            <img src="https://cdn.quasar.dev/img/mountains.jpg" />

            <q-card-section>
               <div class="text-subtitle2">추천 관광지</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
               서울특별시 영등포구에 있는 하중도. 이름처럼 섬이지만, 지금은 섬의 정체성을 잃은 지 오래다. 섬과 육지
               사이는 거의 개울 수준이라서 샛강이라고도 한다. 하지만 올림픽대로로 인해 시가지가 격리되어 있어 섬으로서
               고립감은 어느 정도 유지되고 있다. 실제로 여의도 내[1]에서는 '영등포'라 하면 샛강 건너편에 있는 '영등포구
               본토(또는 영등포역 일대)'를 의미하는 경우가 많다.
            </q-card-section>
         </q-card>
      </q-dialog>
      <q-inner-loading
         :showing="isLoading"
         label="Please wait..."
         label-class="text-teal"
         label-style="font-size: 1.1em"
      ></q-inner-loading>
   </q-page>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, onUnmounted, ref, reactive, inject } from 'vue'
import { loadScript, unloadScript } from 'vue-plugin-load-script'
import { useSmap } from './smap/useSmap'
import _findIndex from 'lodash/findIndex'
import { nextTick } from 'vue'

const isLoading = ref(false)
const { proxy } = getCurrentInstance()
const { createMarkerOld, createPolylineOld, getDistance, getWalkings } = useSmap()

const currentPosition = ref([37.56649, 126.97831]) // 사용자 현재 위치. default: 서울시청
const selectedPoints = ref([]) // 마커 좌표..
const drawedLines = ref([])
const totalDistant = ref(0) // 마커 총 거리
const totalWalkings = ref(0) // 예상 걸음
const popup = ref(false)
const detail = ref(null)
const isShowContextMenu = ref(false)

const totalTimes = computed(() => ((totalDistant.value / 4000) * 60).toFixed(1)) // 에상 시간(분)
// 1.4 km
/** S-MAP 불러오기 */
let map = null // map 객체
let markers = [] // marker
let mode = null
let polylineLayer = null // polyline 객체

/** 주소 검색  Start */
const search = ref({
   str: '',
   address: '',
})
const addressDatas = ref([])

const onChange = (e) => {
   console.log('e', e)
}

const searchAddress = () => {
   search.value.address = ''
   addressDatas.value = []
   if (search.value.str.length === 0) return

   proxy.$axios.smap.getGeocoding(search.value.str).then((res) => {
      if (res.body.geojson) {
         let options = res.body.geojson.features.map((item) => {
            return {
               label: item.properties.name,
               value: item.properties.hcode,
               coordinates: item.geometry.coordinates,
            }
         })
         addressDatas.value = options

         search.value.address = addressDatas.value[0]
      }
   })
}
/** 주소 검색 End */

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

         map.setView(currentPosition.value, 9) //지도 좌표 이동

         BaseMapChange(map, L.Dawul.BASEMAP_GEN) // 일반지도

         // 스케일바
         var scaleBar = new L.Control.Scale({ position: 'bottomright' })
         map.addControl(scaleBar)

         // 레벨바
         var slider = new L.Control.Zoomslider({ position: 'topright' })
         map.addControl(slider)

         map.on('click', onClickMap)

         isLoading.value = false
      })
      .catch((error) => {
         isLoading.value = false
         console.log(error)
      })
}

/** 일반지도, 위성지도 Change */
const onMapChange = (mapType) => BaseMapChange(map, L.Dawul[mapType])

/** 마커 팝업 버튼 이벤트 처리 */
const onMarkerPopupEvent = (type, point, marker) => {
   console.log(markers)
   if (type === 'create') {
      proxy.$dialog.open({
         type: 'alert',
         message: '준비중.....',
      })
   } else if (type === 'detail') {
      // 상세보기
      detail.value = {
         title: point.address.NEW_ADDR,
      }
      popup.value = true
   } else if (type === 'remove') {
      const index = _findIndex(markers, { id: marker.id })

      onRemoveCourse(index)

      // polyline 다시 그리기
      polylineLayer = createPolylineOld(map, selectedPoints.value)
   }
}

const onClickMap = async (e) => {
   map.closePopup()
   // 포인트 정보 셋팅
   let point = await getSelectedPointInfo(e.latlng)
   selectedPoints.value.push(point)

   if (mode === 'marker') {
      // 마커 그리기
      let marker = await createMarkerOld(map, point, onMarkerPopupEvent)
      markers.push(marker)
   } else if (mode === 'line') {
      // polyline 그리기
      if (polylineLayer) map.removeLayer(polylineLayer)
      polylineLayer = await createPolylineOld(map, selectedPoints.value)
   }
}

/** 좌표 정보로 거리 계산 및 정보 저장 */
const getSelectedPointInfo = async ({ lat, lng }, cmd) => {
   let distance = 0
   let walkings = 0
   let address = null
   if (selectedPoints.value.length > 0) {
      let selectedPoint = selectedPoints.value[selectedPoints.value.length - 1]
      distance = getDistance([selectedPoint.lat, selectedPoint.lng], [lat, lng])
      totalDistant.value += distance
      walkings = getWalkings(distance)
      totalWalkings.value += walkings
   } else {
      totalDistant.value = 0
      distance = 0
      totalWalkings.value = 0
      walkings = 0
   }

   isLoading.value = true

   isLoading.value = true
   await proxy.$axios.smap
      .getReverseGeocoding(lat, lng)
      .then((res) => {
         address = res.head
      })
      .catch((error) => {
         console.log('error', error)
      })
      .finally(() => {
         isLoading.value = false
      })

   return {
      lat: lat,
      lng: lng,
      address: address || {},
      dst: distance,
      walkings: walkings,
   }
}

/** 바운드 테스트 */
const testBound = () => {
   let southwest = L.latLng(40.712, -74.227)
   let northEast = L.latLng(40.774, -74.125)
   let bounds = L.latLngBounds(southwest, northEast)
   console.log(bounds.getWest())
   console.log(bounds.getEast())
}

// 코스 정보 삭제
const onRemoveCourse = (index = 0) => {
   if (selectedPoints.value.length > 0) {
      console.log(index)
      // 포인트 정보 삭제
      selectedPoints.value.splice(index, selectedPoints.value.length)

      // 마커 정보 삭제
      for (i = index; i < markers.length; i++) {
         map.removeLayer(markers[i])
      }
      markers.splice(index, markers.length)

      // Polyline 정보 삭제
      map.removeLayer(polylineLayer)
      polylineLayer = null
   }
}

/** 저장된 point 정보 불러와 marker, polyline 그리기 */
const onLoadCourse = async () => {
   // 기존 코스 정보 삭제
   onRemoveCourse(0)

   // 포인트 정보 가져오기
   await proxy.$axios.smap.getPointInfos().then((res) => {
      selectedPoints.value = res
   })

   // marker 생성
   selectedPoints.value.forEach((point) => {
      let marker = createMarkerOld(map, point, onMarkerPopupEvent)
      markers.push(marker)
   })

   // pollyline 생성
   polylineLayer = await createPolylineOld(map, selectedPoints.value)

   // 첫번째 포인트로 지도 이동
   map.setView([selectedPoints.value[0].lat, selectedPoints.value[1].lng], 9)
}

// 지도 point 이동
const onMovePoint = (lat, lng) => {
   let zoom = 9
   currentPosition.value = [lat, lng]

   // 코스 정보가 있으면
   // 현재 위치 포인트와 코스 첫번째 포인트로 거리를 환산하여 zoom level 조정한다. TODO : 공식 다시 작성
   if (selectedPoints.value.length > 0) {
      const distance = getDistance([selectedPoints.value[0].lat, selectedPoints.value[1].lng], [lat, lng])
      if (distance > 1000) zoom = 8
      if (distance > 3000) zoom = 7
      if (distance > 7000) zoom = 6
      if (distance > 16000) zoom = 5
      if (distance > 50000) zoom = 4
      if (distance > 100000) zoom = 3
      console.log(distance, zoom)
   }

   map.setView([lat, lng], zoom) //지도 좌표 이동
}

// 현재 자신의 위치 정보 가져오기
const getCurrentPosition = () => {
   navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
         currentPosition.value = [position.coords.latitude, position.coords.longitude]
         console.log('자신 위치 정보', currentPosition.value)
      }
   })
}

onMounted(async () => {
   await getCurrentPosition()
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
