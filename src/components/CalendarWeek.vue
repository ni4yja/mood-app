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
  <h3>See your week stats</h3>
  <div class="calendar-week">
    <div class="calendar-week-header">
      <CalendarDateIndicator :selected-date="selectedDate" />
      <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
    </div>
    <CalendarWeekdays />
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
.days-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
</style>
