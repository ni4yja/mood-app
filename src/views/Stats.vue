<script setup>
import SidebarMenu from '../components/SidebarMenu.vue'
import WeeklyStats from '../components/WeeklyStats.vue'
</script>

<template>
  <div class="page-wrapper stats">
    <SidebarMenu />
    <div class="main-container">
      <h1>See your stats</h1>
      <WeeklyStats />
    </div>
    <div class="sidebar">This is sidebar</div>
  </div>
</template>
