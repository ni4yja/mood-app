<script setup>
import dayjs from 'dayjs/esm/index.js'
import weekday from 'dayjs/plugin/weekday.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'
import { ref, computed, onMounted } from 'vue'
import CalendarDateIndicator from './CalendarDateIndicator.vue'
import CalendarDateSelector from './CalendarDateSelector.vue'
import CalendarWeekdays from './CalendarWeekdays.vue'
import CalendarWeekDayItem from './CalendarWeekDayItem.vue'

let selectedDate = ref(dayjs())

const selectDate = (newSelectedDate) => {
  selectedDate.value = newSelectedDate
}

dayjs.extend(weekday)
dayjs.extend(weekOfYear)

const today = computed(() => dayjs().format('YYYY-MM-DD'))
const calendarDay = computed(() => Number(selectedDate.value.format('DD')))
const month = computed(() => Number(selectedDate.value.format('M')))
const year = computed(() => Number(selectedDate.value.format('YYYY')))

const currentWeekDays = computed(() => {
  return [...Array(7)].map((day, index) => {
    return {
      date: dayjs(`${year.value}-${month.value}-${calendarDay.value + index}`).format('YYYY-MM-DD'),
      isCurrentWeek: true
    }
  })
})

const getWeekday = (date) => dayjs(date).weekday()

const daysBeforeSelectedDate = computed(() => {
  const firstDayOfTheWeekDay = getWeekday(currentWeekDays.value[0].date)
  const visibleNumberOfDaysFromPreviousWeek = firstDayOfTheWeekDay ? firstDayOfTheWeekDay - 1 : 6
  const previousWeekMondayDate = dayjs(currentWeekDays.value[0].date)
    .subtract(visibleNumberOfDaysFromPreviousWeek, 'days')
    .format('YYYY-MM-DD')
  return [...Array(visibleNumberOfDaysFromPreviousWeek)].map(
    (day, index) => {
      return {
        date: dayjs(
          `${dayjs(previousWeekMondayDate).add(index + 1, 'days')}`
        )
      }
    }
  )
})

const daysAfterSelectedDate = computed(() => {
  const currentWeek = dayjs(`${year.value}-${month.value}-${calendarDay.value}`)
  const nextWeekMonth = currentWeek.add(1, 'week').format('MM')
  const lastDayOfTheWeekDay = getWeekday(currentWeekDays.value[6].date)
  const daysTillTheEndOfTheWeek = lastDayOfTheWeekDay ? 7 - lastDayOfTheWeekDay : lastDayOfTheWeekDay
  const currentWeekSundayDate = dayjs(currentWeekDays.value[6].date)
    .add(daysTillTheEndOfTheWeek - 1, 'day')
    .date()
  return [...Array(daysTillTheEndOfTheWeek)].map(
    (day, index) => {
      const daysCounter = () => {
        let dayNumber = ''
        if (currentWeekSundayDate - daysTillTheEndOfTheWeek <= 0) {
          dayNumber = calendarDay.value + index
        }
        else {
          dayNumber = `${currentWeekSundayDate - daysTillTheEndOfTheWeek + index + 1}`
        }
        return dayNumber
      }
      return {
        date: dayjs(
          `${currentWeek.year()}-${nextWeekMonth}-${daysCounter()}`)
          .format('YYYY-MM-DD')
      }
    }
  )
})

const days = computed(() => [
  ...daysBeforeSelectedDate.value,
  //...currentWeekDays.value,
  // ...daysAfterSelectedDate.value
])

onMounted(() => {
  // console.log(days.value)
  // console.log(daysAfterSelectedDate.value)
}) 
</script>

<template>
  <h3>See your week stats</h3>
  <div class="calendar-week">
    <div class="calendar-week-header">
      <CalendarDateIndicator :selected-date="selectedDate" />
      <CalendarDateSelector :current-date="today" :selected-date="selectedDate" @dateSelected="selectDate" />
    </div>
    <CalendarWeekdays />
    <ol class="days-grid">
      <CalendarWeekDayItem v-for="day in days" :key="day.date" :day="day" :is-today="day.date === today" />
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