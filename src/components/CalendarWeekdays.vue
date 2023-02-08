<script setup>
import { ref, computed } from 'vue'
const WEEKDAYS = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])

const weekdays = computed(() => WEEKDAYS.value)
</script>

<template>
  <ol class="day-of-week">
    <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
  </ol>
</template>

<style scoped>
.day-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
}

.day-of-week > * {
  text-align: center;
}
</style>
