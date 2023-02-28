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
  'calendar-day--extended': isMemoryVisible,
  'calendar-day--slide-right calendar-day--slide-down': weekday.value === 'Mon' || weekday.value === 'Tue' || weekday.value === 'Wed' || weekday.value === 'Thu',
  'calendar-day--slide-left calendar-day--slide-up': weekday.value === 'Fri' || weekday.value === 'Sat' || weekday.value === 'Sun'
}))

const animationNames = computed(() => {
  if (window.innerWidth > 767) {
    if (weekday.value === 'Mon' || weekday.value === 'Tue' || weekday.value === 'Wed' || weekday.value === 'Thu') {
      return 'slide--right'
    } else if (weekday.value === 'Fri' || weekday.value === 'Sat' || weekday.value === 'Sun') {
      return 'slide--left'
    }
  } else {
    if (weekday.value === 'Mon' || weekday.value === 'Tue' || weekday.value === 'Wed' || weekday.value === 'Thu') {
      return 'slide--down'
    } else if (weekday.value === 'Fri' || weekday.value === 'Sat' || weekday.value === 'Sun') {
      return 'slide--up'
    }
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
  min-width: 210px;
  border: 2px solid transparent;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-day--today {
  padding-top: 4px;
  background-color: #f9f9f9;
  border: 2px solid #222362;
  /* border-radius: 4px; */
}

.calendar-day--today.calendar-day--slide-left .memory-card {
  border-right: 0;
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

.calendar-day--extended {
  flex-direction: column;
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
  width: 100%;
  position: absolute;
  z-index: 10;
  box-sizing: border-box;
  background: inherit;
  border: 2px solid transparent;
}

.calendar-day--today .memory-card {
  border: 2px solid #222362;
}

.calendar-day--slide-down .memory-card {
  top: 50px;
}

.calendar-day--slide-up .memory-card {
  bottom: 50px;
  left: 0;
  right: 0;
}

.memory-card p {
  font-family: 'Alegreya', serif;
  font-size: 1.2rem;
  box-sizing: border-box;
  padding: 7px;
  margin: 0;
  height: 180px;
}

.slide--up-enter-active,
.slide--down-enter-active {
  transition: all 0.3s ease-out;
}

.slide--up-enter-active span,
.slide--up-leave-active span {
  position: absolute;
  top: 0;
}

.slide--up-leave-active,
.slide--down-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide--up-enter-from,
.slide--up-leave-to {
  transform: translateY(60px);
  opacity: 0;
}

.slide--up-enter-from,
.slide--up-leave-to {
  flex-direction: column-reverse;
}

.slide--down-enter-from,
.slide--down-leave-to {
  transform: translateY(-60px);
  opacity: 0;
}

@media (min-width: 768px) {
  .calendar-day {
    min-height: 110px;
    min-width: 110px;
  }

  .memory-card {
    height: 110px;
    min-width: 330px;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .memory-card p {
    height: 110px;
    font-size: 1.1rem;
  }

  .calendar-day--slide-left .memory-card {
    right: 106px;
    left: auto;
  }

  .calendar-day--slide-right .memory-card {
    left: 106px;
    right: auto;
  }

  .calendar-day--slide-down .memory-card {
    top: -2px;
    bottom: auto;
  }

  .calendar-day--slide-up .memory-card {
    top: -2px;
    bottom: auto;
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
}
</style>
