<script setup>
import dayjs from 'dayjs/esm/index.js'
import { computed, ref } from 'vue'
import { useCalendarStore } from '../stores/mood.js'
import BaseButton from './BaseButton.vue'

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
  'calendar-day--slide-right calendar-day--slide-down':
    weekday.value === 'Mon' ||
    weekday.value === 'Tue' ||
    weekday.value === 'Wed' ||
    weekday.value === 'Thu',
  'calendar-day--slide-left calendar-day--slide-up':
    weekday.value === 'Fri' ||
    weekday.value === 'Sat' ||
    weekday.value === 'Sun'
}))

const animationNames = computed(() => {
  if (window.innerWidth > 767) {
    if (
      weekday.value === 'Mon' ||
      weekday.value === 'Tue' ||
      weekday.value === 'Wed' ||
      weekday.value === 'Thu'
    ) {
      return 'slide--right'
    } else if (
      weekday.value === 'Fri' ||
      weekday.value === 'Sat' ||
      weekday.value === 'Sun'
    ) {
      return 'slide--left'
    }
  } else {
    if (
      weekday.value === 'Mon' ||
      weekday.value === 'Tue' ||
      weekday.value === 'Wed' ||
      weekday.value === 'Thu'
    ) {
      return 'slide--down'
    } else if (
      weekday.value === 'Fri' ||
      weekday.value === 'Sat' ||
      weekday.value === 'Sun'
    ) {
      return 'slide--up'
    }
  }
})

const isMemoryVisible = ref(false)

const toggleMemory = () => {
  isMemoryVisible.value = !isMemoryVisible.value
}
</script>

<template>
  <li class="calendar-day" :class="dayClasses">
    <BaseButton
      v-if="moodPerDay?.memory"
      title="View Memory"
      :icon="'MemoryIcon'"
      :view="'secondary'"
      :size="'small'"
      class="view-button"
      @click="toggleMemory"
    />
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
  border: 2px solid transparent;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-day--today {
  padding-top: 4px;
}

.light .calendar-day--today {
  background: var(--light-card-bg-color);
  border: 2px solid var(--light-card-border-color);
}

.dark .calendar-day--today {
  background: var(--dark-card-bg-color);
  border: 2px solid var(--dark-card-border-color);
}

.calendar-day--excellent {
  background: var(--mood-excellent-primary);
}

.calendar-day--good {
  background: var(--mood-good-primary);
}

.calendar-day--awful {
  background: var(--mood-awful-primary);
}

.calendar-day--extended {
  flex-direction: column;
}

.view-button {
  position: absolute;
  top: 5px;
  right: 0;
}

.memory-card {
  position: absolute;
  z-index: 10;
  box-sizing: border-box;
  background: inherit;
  border: 2px solid transparent;
  left: -2px;
  right: -2px;
}

.light .calendar-day--today .memory-card {
  border: 2px solid var(--light-card-border-color);
}

.dark .calendar-day--today .memory-card {
  border: 2px solid var(--dark-card-border-color);
}

.calendar-day--slide-down .memory-card {
  top: 56px;
}

.calendar-day--slide-up .memory-card {
  bottom: 56px;
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
    width: 110px;
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
