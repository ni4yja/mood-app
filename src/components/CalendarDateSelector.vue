<script setup>
import dayjs from 'dayjs/esm/index.js'

const props = defineProps({
  currentDate: String,
  selectedDate: Object,
  periodToChange: String,
})

const emit = defineEmits(['dateSelected'])

const selectPrevious = () => {
  let newSelectedDate = dayjs(props.selectedDate).subtract(1, props.periodToChange)
  emit('dateSelected', newSelectedDate)
}

const selectCurrent = () => {
  let newSelectedDate = dayjs(props.currentDate)
  emit('dateSelected', newSelectedDate)
}

const selectNext = () => {
  let newSelectedDate = dayjs(props.selectedDate).add(1, props.periodToChange)
  emit('dateSelected', newSelectedDate)
}
</script>

<template>
  <div class="calendar-date-selector">
    <button @click="selectPrevious">Prev</button>
    <button @click="selectCurrent">Today</button>
    <button @click="selectNext">Next</button>
  </div>
</template>

<style>
.calendar-date-selector {
  display: flex;
  gap: 1rem;
}

.home .calendar-date-selector {
  justify-content: center;
}

@media (min-width: 768px) {
  .home .calendar-date-selector {
    max-width: 40%;
  }
}
</style>
