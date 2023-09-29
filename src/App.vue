<script setup>
import { useThemeStore } from './stores/theme.js'

const themeStore = useThemeStore()
</script>

<template>
  <div class="app" :class="themeStore.selectedTheme.mode"><router-view /></div>
</template>


<style>
.app.light {
  background: #fff;
  color: #242424;
}

.app.dark {
  background: #242424;
  color: #fff;
}
</style>