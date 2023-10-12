<script setup>
import { useThemeStore } from './stores/theme.js'

const themeStore = useThemeStore()
</script>

<template>
  <div class="app" :class="themeStore.selectedTheme.mode"><router-view /></div>
</template>
