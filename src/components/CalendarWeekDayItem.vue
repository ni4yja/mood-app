<script setup>
import dayjs from 'dayjs/esm/index.js'
import { ref, computed } from 'vue'
import { useCalendarStore } from '../stores/mood.js'

const props = defineProps({
  day: Object,
  isToday: Boolean
})

const calendarStore = useCalendarStore()

const label = computed(() => dayjs(props.day.date).subtract(1, 'days').format("D"))

const moodPerDay = computed(() => {
  let mood
  calendarStore.daysWithMoodColor.map((record) => {
    if (dayjs(record.date).format('dddd, D MMM YYYY') === dayjs(props.day.date).format('dddd, D MMM YYYY')) {
      mood = record
    }
  })
  return mood
})

const dayClasses = ref({
  'calendar-day--not-current': !props.day.isCurrentWeek,
  'ahaha': props.day.isCurrentWeek,
  'calendar-day--today': props.isToday,
  // 'calendar-day--excellent': moodPerDay.value?.color === 'purple',
  // 'calendar-day--good': moodPerDay.value?.color === 'green',
  // 'calendar-day--awful': moodPerDay.value?.color === 'red',
})

</script>

<template>
  <li class="calendar-day" :class="dayClasses">
    {{ day.date }}
    <!-- <span>{{ label }}</span> -->
  </li>
</template>

<style scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ahaha {
  background: orchid;
}

.calendar-day--not-current {
  background-color: antiquewhite;
}

.calendar-day--today {
  padding-top: 4px;
  /* background-color: #f9f9f9; */
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
  background: #fc3f21;
}
</style>
