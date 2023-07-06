<script setup>
import dayjs from 'dayjs/esm/index.js'
import en from 'dayjs/locale/en.js'
import { ref, computed } from 'vue'
import CalendarDateIndicator from './CalendarDateIndicator.vue'
import CalendarDateSelector from './CalendarDateSelector.vue'
import CalendarWeekdays from './CalendarWeekdays.vue'
import CalendarWeekDayItem from './CalendarWeekDayItem.vue'

dayjs.locale({
  ...en,
  weekStart: 1
})

let selectedDate = ref(dayjs())

const selectDate = (newSelectedDate) => {
  selectedDate.value = newSelectedDate
}

const startOfWeek = computed(() => dayjs(selectedDate.value).startOf('week'))
const weekdays = computed(() =>
  [...Array(7)].fill(startOfWeek.value).map((day, index) => {
    return {
      date: day.add(index, 'day').format('YYYY-MM-DD')
    }
  })
)

const today = computed(() => dayjs().format('YYYY-MM-DD'))
</script>

<template>
  <div class="calendar-week">
    <div class="calendar-week-header">
      <CalendarDateIndicator
        :selected-date="selectedDate"
        :period-to-show="'week'"
      />
      <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate"
        :period-to-change="'week'"
        @dateSelected="selectDate"
      />
    </div>
    <div class="weekdays-grid">
      <CalendarWeekdays />
    </div>
    <ol class="days-grid">
      <CalendarWeekDayItem
        v-for="day in weekdays"
        :key="day.date"
        :day="day"
        :is-today="day.date === today"
      />
    </ol>
  </div>
</template>

<style>
.calendar-week {
  display: grid;
  grid-template-areas:
    'head head head'
    'weekdays days days'
    'weekdays days days';
}

.calendar-week > .calendar-week-header {
  grid-area: head;
  margin-bottom: 1rem;
}

.calendar-week > .weekdays-grid {
  grid-area: weekdays;
}

.calendar-week > .days-grid {
  list-style: none;
  padding: 0;
  grid-area: days;
  display: grid;
}

@media (min-width: 768px) {
  .calendar-week {
    display: block;
    max-width: 770px;
    margin: 0 auto;
  }

  .calendar-week > .calendar-week-header {
    margin-bottom: 0;
  }

  .days-grid {
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
