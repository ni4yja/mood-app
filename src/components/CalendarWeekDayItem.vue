<script setup>
import dayjs from 'dayjs/esm/index.js'
import { computed, ref } from 'vue'
import { useCalendarStore } from '../stores/mood.js'
import MemoryIcon from './icons/MemoryIcon.vue'

const props = defineProps({
  day: Object,
  isToday: Boolean
})

const calendarStore = useCalendarStore()

const label = computed(() => dayjs(props.day.date).format('DD.MM.'))
const weekday = computed(() => dayjs(props.day.date).format('ddd'))

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
  'calendar-day--awful': moodPerDay.value?.color === 'red',
  'calendar-day--hidden': isMemoryVisible,
  'calendar-day--slide-right': weekday.value === 'Mon' || weekday.value === 'Tue',
  'calendar-day--slide-left': weekday.value === 'Sat' || weekday.value === 'Sun'
}))

const animationNames = computed(() => {
  if (weekday.value === "Tue") {
    return 'slide--right'
  } else if (weekday.value === "Sun") {
    return 'slide--left'
  }
}
)

const isMemoryVisible = ref(false)

const toggleMemory = () => {
  isMemoryVisible.value = !isMemoryVisible.value
}

</script>

<template>
  <li class="calendar-day" :class="dayClasses">
    <button v-if="moodPerDay?.memory" title="View Memory" class="view-btn" @click="toggleMemory">
      <MemoryIcon />
    </button>
    <span>{{ label }}</span>
    <Transition :name="animationNames">
      <div v-if="isMemoryVisible" class="memory-card">
        <p>{{ moodPerDay?.memory }}</p>
      </div>
    </Transition>
  </li>
</template>

<style scoped>
.calendar-day {
  box-sizing: border-box;
  position: relative;
  min-height: 50px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-day--hidden span {
  position: relative;
  z-index: 0;
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

.view-btn {
  background: none;
  padding: 0.2rem 0.4rem;
  border-radius: 0;
  position: absolute;
  top: 10px;
  right: 10px;
}

.memory-card {
  box-sizing: border-box;
  background: inherit;
  height: 110px;
  min-width: 330px;
  position: absolute;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.memory-card p {
  font-family: 'Alegreya', serif;
  font-size: 1.1rem;
  box-sizing: border-box;
  height: 110px;
  padding: 7px;
}

.calendar-day--slide-left .memory-card {
  right: 110px;
}

.calendar-day--slide-right .memory-card {
  left: 110px;
}

.slide--right-enter-active,
.slide--left-enter-active {
  transition: all 0.3s ease-out;
}

.slide--right-leave-active,
.slide--left-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide--right-enter-from,
.slide--right-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

.slide--left-enter-from,
.slide--left-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

@media (min-width: 768px) {
  .calendar-day {
    min-height: 110px;
    min-width: 110px;
  }
}
</style>
