<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, watch } from 'vue'

const val = ref({ text: 222 })
watch(val.value, () => {
  console.log(val.value)
})
</script>

<template>
  {{ val }}
  <input v-model="val" />
  <RouterView />
</template>

<style scoped></style>
