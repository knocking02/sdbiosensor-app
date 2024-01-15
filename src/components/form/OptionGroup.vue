<template>
   <div class="optionGroup">
      <q-field ref="toggle" v-model="group" borderless dense :rules="rules">
         <template v-slot:control>
            <q-option-group
               v-model="all"
               :options="[{ label: '전체', value: 'ALL' }]"
               color="green"
               :type="type"
               inline
               v-if="isAll"
               @update:model-value="onIsAll"
               class="first"
            ></q-option-group>
            <q-option-group
               v-model="group"
               :options="optionInfos"
               color="green"
               :type="type"
               inline
               :disable="disable"
               class="second"
            ></q-option-group>
         </template>
      </q-field>
   </div>
</template>

<script setup>
import { watch } from 'vue'
import { ref, toRef, onMounted, computed } from 'vue'
import useCode from '@/composables/useCode'

const props = defineProps({
   options: {
      type: Array,
      default: [],
   },
   type: {
      type: String,
      default: 'radio', // or 'checkbox'
   },
   code: {
      // 그룹코드 값 (코드그룹값이 있으면 코드 데이타 자동 조회)
      type: String,
   },
   rules: {
      type: Object,
   },
   modelValue: {
      type: [Array, String],
   },
   disable: {
      type: Boolean,
      default: false,
   },
   isAll: {
      // 전체선택 추가
      type: Boolean,
      default: false,
   },
})

const emits = defineEmits(['update:modelValue'])

const group = computed({
   get() {
      return props.modelValue
   },
   set(value) {
      emits('update:modelValue', value)
   },
})

const all = props.type === 'radio' ? ref('') : ref([])

const { optionInfos } = useCode({
   dataType: props.dataType || 'code',
   param: props.code,
})

const optionProps = toRef(props, 'options')

watch(optionProps, (val) => {
   makeOptions()
})
const makeOptions = () => {
   if (!props.code) {
      optionInfos.value = optionProps.value
   }
}

const onIsAll = (val) => {
   if (props.type === 'radio') {
      if (val === 'ALL') group.value = ''
   } else {
      if (val === true || val.length > 0) {
         group.value = optionInfos.value.map((m) => m.value)
      } else {
         group.value = []
      }
   }
}

watch(group, (val) => {
   if (props.type === 'radio') {
      if (val) all.value = null
   } else {
      if (optionInfos.value.length === group.value.length) {
         all.value = ['ALL']
      } else {
         all.value = null
      }
   }
})

onMounted(async () => {
   makeOptions()
})
</script>

<style scoped>
.q-field {
   border: 0px;
}
</style>
