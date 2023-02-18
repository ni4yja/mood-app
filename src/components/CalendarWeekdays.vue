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
  list-style: none;
  padding: 0;
}

.day-of-week>* {
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

@media (min-width: 768px) {
  .day-of-week {
    grid-template-columns: repeat(7, 1fr);
  }

  .day-of-week>* {
    min-height: auto;
  }
}
</style>
