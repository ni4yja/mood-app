<script setup>
import dayjs from 'dayjs/esm/index.js'
import { computed } from 'vue'
import { useCalendarStore } from '../stores/mood.js'

const props = defineProps({
  day: Object,
  isToday: Boolean
})

const calendarStore = useCalendarStore()

const label = computed(() => dayjs(props.day.date).format('DD.MM.'))

const memory = computed(() => {
  let memoryRecord
  calendarStore.memoryCards.map((card) => {
    if (
      dayjs(card.date).format('dddd, D MMM YYYY') ===
      dayjs(props.day.date).format('dddd, D MMM YYYY')
    ) {
      memoryRecord = card.memory
    }
  })
  return memoryRecord
})

const moodPerDay = computed(() => {
  let mood
  calendarStore.daysWithMoodColor.map((record) => {
    if (
      dayjs(record.date).format('dddd, D MMM YYYY') ===
      dayjs(props.day.date).format('dddd, D MMM YYYY')
    ) {
      mood = record
    }
  })
  return mood
})

const dayClasses = computed(() => ({
  'calendar-day--today': props.isToday,
  'calendar-day--excellent': moodPerDay.value?.color === 'purple',
  'calendar-day--good': moodPerDay.value?.color === 'green',
  'calendar-day--awful': moodPerDay.value?.color === 'red'
}))
</script>

<template>
  <li class="calendar-day" :class="dayClasses">
    <span>{{ label }}</span>
    <code>{{ memory }}</code>
  </li>
</template>

<style scoped>
.calendar-day {
  position: relative;
  min-height: 50px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-day--today {
  padding-top: 4px;
  background-color: #f9f9f9;
  box-shadow: inset 0px 0px 0 2px #222362;
  border-radius: 4px;
}

.calendar-day--excellent {
  background: #aea2f0;
}

.calendar-day--good {
  background: #1bb476;
}

.calendar-day--awful {
  background: #eb6862;
}

@media (min-width: 768px) {
  .calendar-day {
    min-height: 100px;
    min-width: 100px;
  }
}
</style>
