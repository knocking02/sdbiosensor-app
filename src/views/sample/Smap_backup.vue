<template>
   <q-page padding>
      <div class="row">
         <div class="col"></div>
      </div>
      <div class="row">
         <div class="col-7">
            <div id="map_" style="height: 600px"></div>
         </div>
      </div>
      <q-inner-loading
         :showing="isLoading"
         label="Please wait..."
         label-class="text-teal"
         label-style="font-size: 1.1em"
      ></q-inner-loading>
   </q-page>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'
import { loadScript, unloadScript } from 'vue-plugin-load-script'

const isLoading = ref(false)
const { proxy } = getCurrentInstance()

const currentPosition = ref([37.56649, 126.97831]) // 사용자 현재 위치. default: 서울시청
const selectedPoints = ref({
   points: [], // 선택한 좌표(마커)
   totalDistant: [], // 총거리
   totalWalkings: [], // 총 예상걸음
})
const totalTimes = computed(() => ((totalDistant.value / 4000) * 60).toFixed(1)) // 에상 시간(분)

/** S-MAP 불러오기 */
let map = null // map 객체
let markers = [] // marker
let lineLayer = null // polyline 객체
let polylineLayers = [] // polyline 객체

const createMap = () => {
   isLoading.value = true
   loadScript('http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapJs&key=')
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

         map.on('click', async (e) => {
            //await setSelectedPoints(e.latlng)
            createMarker(e.latlng)
         })

         isLoading.value = false
      })
      .catch((error) => {
         isLoading.value = false
         console.log(error)
      })
}

const updateSelectedPoints = async ({ lat, lng }) => {
   let distance = 0
   let walkings = 0
   let address = null

   if (selectedPoints.value.points.length > 0) {
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
   await proxy.$axios.smap
      .useGetAddress(lat, lng)
      .then((res) => {
         address = res.head
      })
      .catch((error) => {
         console.log('error', error)
      })
      .finally(() => {
         isLoading.value = false
      })
   //address = (await getAddressInfo(lat, lng)) || {}
   //console.log(address)

   selectedPoints.value.push({
      lat: lat,
      lng: lng,
      address: address || {},
      dst: distance,
      walkings: walkings,
   })
}

/** Marker 생성 */
const createMarker = ({ lat, lng }) => {
   let pointInfo = selectedPoints.value[selectedPoints.value.length - 1]
   let content = pointInfo.dst + 'm<br/>총 : ' + totalDistant.value + 'm'
   let marker = new L.Marker(new L.LatLng(lat, lng), {
      icon: new L.Icon({
         iconUrl: '/images/icons/pin_2.png',
         iconAnchor: [11, 30], // 오프셋 (핀의 끝이 좌표로 매칭하기 위해 적용)
      }),
      title: content,
   }).addTo(map)

   marker.bindPopup(content, { minWidth: 20, offset: [0, -30] })
   marker.togglePopup()
   marker.on('click', function (e) {
      detail.value = {
         title: pointInfo.address.NEW_ADDR,
      }
      popup.value = true
   })

   markers.push(marker)

   //testBound()

   createPolyline()
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

// 거리 구하기
const getDistance = (a, b) => {
   var lat1 = a[0]
   var lng1 = a[1]
   var lat2 = b[0]
   var lng2 = b[1]

   function deg2rad(deg) {
      return deg * (Math.PI / 180)
   }
   var r = 6371 //지구의 반지름(km)
   var dLat = deg2rad(lat2 - lat1)
   var dLon = deg2rad(lng2 - lng1)
   var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
   var d = r * c // Distance in km
   return Math.round(d * 1000)
}

/** 예상 걸음수 */
const getWalkings = (dst) => {
   return (1400 * dst) / 1000
}

onMounted(async () => {
   await getCurrentPosition()
   await createMap()
})
</script>

<style scoped>
@import 'http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapCss';
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
