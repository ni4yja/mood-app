<script setup>
import dayjs from 'dayjs/esm/index.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'
import { computed } from 'vue'

dayjs.extend(weekOfYear)

const props = defineProps({
  selectedDate: Object
})

const selectedWeek = computed(
  () =>
    `Week ${dayjs(props.selectedDate).week()}, ${props.selectedDate.format(
      'MMMM YYYY'
    )}`
)
</script>

<template>
  <div class="calendar-date-indicator">{{ selectedWeek }}</div>
</template>
