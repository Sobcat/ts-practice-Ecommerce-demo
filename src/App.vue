<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, watch, watchEffect } from 'vue'

const val = ref({ text: 222 })
watch(
  () => val.value,
  () => {
    console.log(val.value)
  }
)
</script>

<template>
  {{ val.text }}
  <input v-model="val.text" />
  <el-button>Default</el-button>
  <RouterView />
</template>

<style scoped></style>
