<template>
   <q-page padding>
      <div class="row justify-center" style="max-width: 800px">
         <q-calendar-month
            ref="calendar"
            v-model="selectedDate"
            view="month"
            locale="ko-kr"
            mini-mode="auto"
            breakpoint="sm"
            bordered
            :day-min-height="80"
            :day-height="0"
            :shortWeekdayLabel="true"
         >
            <template #day="{ scope: { timestamp } }">
               <div style="width: 100%; text-align: center">
                  <button class="bgBtn" :style="dayStyle(timestamp.day)">
                     {{ timestamp.day }}
                  </button>
               </div>
            </template>
         </q-calendar-month>
      </div>
   </q-page>
</template>

<script setup>
import { ref } from 'vue'

const selectedDate = ref('')
const dayStyle = (day) => {
   if (day % 3) {
      return {
         'background-image': 'url(/images/icons/1.png)',
      }
   } else {
      return {
         'background-image': 'url(/images/icons/2.png)',
      }
   }
}
</script>

<style lang="sass">
.q-calendar-month__day--content
  display: flex
  justify-content: center
.q-calendar-month__day--label__wrapper
  min-height: 0px !important
.q-calendar__button
  display: none !important

.bgBtn
  font-size: 13px
  width: 30px
  height: 30px
  //background-image: url(/images/icons/1.png)
  background-size: 30px 30px
  background-color: transparent
  background-repeat: no-repeat
  background-position: 0px 0px
  border: none
  cursor: pointer
</style>
