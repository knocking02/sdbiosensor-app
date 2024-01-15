<template>
<q-checkbox 
    v-for="(item, idx) of selection"
    :key="idx"
    v-model="selection"
    :label="item.label"
    :val="item.value"
 />
</template>
<script setup>
import { ref } from 'vue'

const selection = ref([])

const props = defineProps({
    options: {
        type: Array,
        default: []
    }
})

defineExpose({
    
})
</script>
<style scoped>

</style>