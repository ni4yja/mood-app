<script setup>
import dayjs from 'dayjs/esm/index.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'
import { computed } from 'vue'

dayjs.extend(weekOfYear)

const props = defineProps({
  selectedDate: Object,
  periodToShow: String,
})

const selectedWeek = computed(
  () =>
    `Week ${dayjs(props.selectedDate).week()}, ${props.selectedDate.format(
      'MMMM YYYY'
    )}`
)

const selectedMonth = computed(
  () =>
    props.selectedDate.format(
      'MMMM YYYY'
    )
)
</script>

<template>
  <div class="calendar-date-indicator" v-if="periodToShow === 'week'">
    <h3>{{ selectedWeek }}</h3>
  </div>
  <div class="calendar-date-indicator" v-if="periodToShow === 'month'">
    <h3>{{ selectedMonth }}</h3>
  </div>
</template>

<style scoped>
.calendar-date-indicator h3 {
  font-family: 'Alegreya', serif;
  font-size: 2rem;
  font-weight: 700;
}
</style>
