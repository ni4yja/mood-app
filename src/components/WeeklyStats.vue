<script setup>
import dayjs from 'dayjs/esm/index.js'
import en from 'dayjs/locale/en.js'
import { ref, computed } from 'vue'
import CalendarDateIndicator from './CalendarDateIndicator.vue'
import CalendarDateSelector from './CalendarDateSelector.vue'
import { useCalendarStore } from '../stores/mood.js'
import useMoodCounter from '../helpers/days-with-mood-counter.js'
import DayCardStats from './DayCardStats.vue'

const calendarStore = useCalendarStore()
const { countDaysWithMood } = useMoodCounter()

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

const daysWithExcellentMood = computed(() => {
  return countDaysWithMood(weekdays.value, calendarStore.calendar, 'Excellent')
})

const daysWithGoodMood = computed(() => {
  return countDaysWithMood(weekdays.value, calendarStore.calendar, 'Good')
})

const daysWithAwfulMood = computed(() => {
  return countDaysWithMood(weekdays.value, calendarStore.calendar, 'Awful')
})

const chartOptions = ref({
  chart: {
    width: 380,
    type: 'pie'
  },
  labels: ['Excellent', 'Good', 'Awful', 'No mood'],
  colors: ['#aea2f0', '#1bb476', '#eb6862', '#ADA9BB']
})

const series = computed(() => [
  daysWithExcellentMood.value * 0.07,
  daysWithGoodMood.value * 0.07,
  daysWithAwfulMood.value * 0.07,
  (7 -
    daysWithExcellentMood.value -
    daysWithGoodMood.value -
    daysWithAwfulMood.value) *
  0.07
])
</script>

<template>
  <DayCardStats :mood="'Excellent'" :count="daysWithExcellentMood" />
  <DayCardStats :mood="'Good'" :count="daysWithGoodMood" />
  <DayCardStats :mood="'Awful'" :count="daysWithAwfulMood" />
  <div class="calendar-week">
    <div class="calendar-week-header">
      <CalendarDateIndicator :selected-date="selectedDate" :period-to-show="'week'" />
      <CalendarDateSelector :current-date="today" :selected-date="selectedDate" :period-to-change="'week'"
        @dateSelected="selectDate" />
    </div>
  </div>
  <div id="chart" class="chart">
    <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
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

.calendar-week>.calendar-week-header {
  grid-area: head;
}

.calendar-week>.weekdays-grid {
  grid-area: weekdays;
}

.calendar-week>.days-grid {
  list-style: none;
  padding: 0;
  grid-area: days;
  display: grid;
}

@media (min-width: 768px) {
  .calendar-week {
    display: block;
  }

  .days-grid {
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
