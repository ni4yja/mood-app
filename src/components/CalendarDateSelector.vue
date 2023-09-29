<script setup>
import dayjs from 'dayjs/esm/index.js'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  currentDate: String,
  selectedDate: Object,
  periodToChange: String
})

const emit = defineEmits(['dateSelected'])

const selectPrevious = () => {
  let newSelectedDate = dayjs(props.selectedDate).subtract(
    1,
    props.periodToChange
  )
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
    <BaseButton :text="'Prev'" @click="selectPrevious" />
    <BaseButton :text="'Today'" @click="selectCurrent" />
    <BaseButton :text="'Next'" @click="selectNext" />
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
