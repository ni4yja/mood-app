<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs/esm/index.js'
import relativeTime from 'dayjs/esm/index.js'
import { useCalendarStore } from './stores/mood'
import CalendarWeek from './components/CalendarWeek.vue'

const calendarStore = useCalendarStore()

dayjs.extend(relativeTime)

const today = dayjs()
const timestamp = new Date().getTime() / 1000

const formattedDates = ref({
  today: dayjs().format('dddd, D MMM YYYY'),
  yesterday: dayjs().subtract(1, 'days').format('dddd, D MMM YYYY'),
  tomorrow: dayjs().add(1, 'days').format('dddd, D MMM YYYY')
})

const setMoodStats = (date, timestamp, mood) => {
  calendarStore.setTodayMood(date, timestamp, mood)
  //console.log(calendarStore.daysWithMoodColor)
}

const todayMood = computed(() => {
  const allDaysSorted = calendarStore.daysWithMoodColor.sort((dayOne, dayTwo) => {
    dayTwo.timestamp - dayOne.timestamp
  })
  return allDaysSorted[allDaysSorted.length - 1]
})

</script>

<template>
  <h1>How do you feel today?</h1>
  <div class="mood-options">
    <button class="excellent" @click="setMoodStats(today, timestamp, 'Excellent')">Excellent</button>
    <button class="good" @click="setMoodStats(today, timestamp, 'Good')">Good</button>
    <button class="awful" @click="setMoodStats(today, timestamp, 'Awful')">Awful</button>
  </div>
  <div class="today-mood">
    <div class="view-more yesterday">
      <div class="day-title">
        <h3>Yesterday</h3>
        <p>{{ formattedDates.yesterday }}</p>
      </div>
    </div>
    <div class="day-card today" :class="todayMood?.color">
      <div class="day-title">
        <h3>Today</h3>
        <p>{{ formattedDates.today }}</p>
      </div>
      <div class="card-content">
        <h2>{{ todayMood?.mood }}</h2>
      </div>
    </div>
    <div class="view-more tomorrow">
      <div class="day-title">
        <h3>Tomorrow</h3>
        <p>{{ formattedDates.tomorrow }}</p>
      </div>
    </div>
  </div>
  <CalendarWeek />
</template>

<style scoped>
.mood-options {
  max-width: 40%;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-around;
}

.mood-options button {
  font-family: 'Alegreya', serif;
  font-weight: 700;
}

button.excellent {
  border-color: #aea2f0;
}

button.excellent:hover {
  background: #aea2f0;
}

button.good {
  border-color: #1bb476;
}

button.good:hover {
  background: #1bb476;
}

button.awful {
  border-color: #fc3f21;
}

button.awful:hover {
  background: #fc3f21;
}

.today-mood {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.day-card {
  min-width: 20rem;
  min-height: 20rem;
  margin: 1rem;
  background-color: #f9f9f9;
  border: 2px solid #222362;
  border-radius: 8px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.day-card.purple {
  background: #aea2f0;
  border-color: #aea2f0;
}

.day-card.green {
  background: #1bb476;
  border-color: #1bb476;
}

.day-card.red {
  background: #fc3f21;
  border-color: #fc3f21;
}

.view-more {
  position: relative;
  min-width: 20rem;
  min-height: 4rem;
}

.day-title {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>