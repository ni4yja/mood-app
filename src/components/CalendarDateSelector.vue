<script setup>
import dayjs from 'dayjs/esm/index.js'

const props = defineProps({
  currentDate: String,
  selectedDate: Object
})

const emit = defineEmits(['dateSelected'])

const selectPrevious = () => {
  let newSelectedDate = dayjs(props.selectedDate).subtract(1, 'week')
  emit('dateSelected', newSelectedDate)
}

const selectCurrent = () => {
  let newSelectedDate = dayjs(props.currentDate)
  emit('dateSelected', newSelectedDate)
}

const selectNext = () => {
  let newSelectedDate = dayjs(props.selectedDate).add(1, 'week')
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
  margin: 1rem auto;
  display: flex;
  justify-content: space-around;
}

@media (min-width: 768px) {
  .calendar-date-selector {
    max-width: 40%;
  }
}
</style>
