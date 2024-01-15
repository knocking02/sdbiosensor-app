<template>
   <q-select
      square
      outlined
      v-model="model"
      :options="optionInfos"
      :label="labelText"
      @update:model-value="changeValue"
      :rules="rules"
      :disable="disable"
      :emit-value="emitValue"
      :map-options="mapOptions"
      :display-value="displayValueLabelText"
      :option-label="customLabel"
      :option-value="customValue"
      :multiple="multiple"
      menu-self="top left"
   >
      <template v-slot:option="{ itemProps, label, opt, selected, toggleOption }" v-if="props.multiple">
         <q-item v-bind="itemProps">
            <q-item-section side>
               <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)"></q-checkbox>
            </q-item-section>
            <q-item-section>
               <q-item-label v-text="label"></q-item-label>
            </q-item-section>
         </q-item>
      </template>
   </q-select>
</template>
<script setup>
import { useAttrs } from 'vue'
import { ref, computed, onMounted, toRef, watch } from 'vue'
import _findIndex from 'lodash/findIndex'
import useCode from '@/composables/useCode'

const props = defineProps({
   options: {
      type: Array,
      default: [],
   },
   label: {
      type: String,
      default: '', //'선택해주세요.',
   },
   rules: {
      type: Array,
      default: [],
   },
   disable: {
      type: Boolean,
      default: false,
   },
   code: {
      // 그룹코드 값 (코드그룹값이 있으면 코드 데이타 자동 조회)
      type: String,
   },
   dataType: {
      type: String, // ex) business : 사업차수 목록
   },
   isAll: {
      type: Boolean,
      default: false,
   },
   emitValue: {
      // 선택시 value 값만
      type: Boolean,
      default: true,
   },
   mapOptions: {
      // 선택시 value 값만
      type: Boolean,
      default: true,
   },
   displayValueLabel: {
      // 선택시 보여지는 custom 텍스트
      type: String,
   },
   customLabel: {
      // Custom prop name - label
      type: String,
      default: 'label',
   },
   customValue: {
      // Custom prop name - value
      type: String,
      default: 'value',
   },
   multiple: {
      type: Boolean,
      default: false,
   },
})

const emits = defineEmits(['updateValue', 'clearValue'])
const attrs = useAttrs()

let model = ref(null)
const { optionInfos } = useCode({
   dataType: props.dataType || 'code',
   param: props.code,
})
const optionProps = toRef(props, 'options')
let selected = ref(null) // 선택한 Object

// 라벨 숨기기
const labelText = computed(() => {
   if (props.multiple) {
      return (model.value && model.value.length == 0) || attrs.modelValue.length == 0 ? props.label : ''
   } else {
      return model.value || attrs.modelValue ? '' : props.label
   }
})

// 선택시 보여주는 label Text
const displayValueLabelText = computed(() => {
   if (props.displayValueLabel) {
      return `${props.displayValueLabel}: ${selected.value ? selected.value.label : '전체'}`
   }
})

const changeValue = (value) => {
   if (!props.multiple) {
      setSelected(value)
      emits('updateValue', selected.value)
   } else {
      emits('updateValue', value)
   }
}

// 선택값 초기화
const clear = () => {
   model.value = ''
   selected.value = null
}

watch(optionProps, (val) => {
   makeOptions()
})

const makeOptions = () => {
   if (!props.code) {
      optionInfos.value = optionProps.value
   }
   if (props.isAll) {
      optionInfos.value = [{ label: '전체', value: '' }, ...optionInfos.value]
   }
}

const setSelected = (value) => {
   if (!props.multiple) {
      const index = _findIndex(optionInfos.value, { [props.customValue]: value })
      selected.value = optionInfos.value[index]
   }
}

onMounted(async () => {
   if (props.multiple) {
      model = ref([])
   } else {
      model.value = attrs.modelValue
   }
   //setTimeout(makeOptions, 500)
   makeOptions()
   setSelected(model.value)
})

defineExpose({
   clear,
})
</script>

<style scope></style>
