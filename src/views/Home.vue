<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs/esm/index.js'
import relativeTime from 'dayjs/esm/index.js'
import { useCalendarStore } from '../stores/mood'
import AddNoteIcon from '../components/icons/AddNoteIcon.vue'
import AddNoteModal from '../components/AddNoteModal.vue'
import CalendarWeek from '../components/CalendarWeek.vue'
import SidebarMenu from '../components/SidebarMenu.vue'
import BaseButton from '../components/BaseButton.vue'

const calendarStore = useCalendarStore()

dayjs.extend(relativeTime)

const today = ref(dayjs())
const timestamp = new Date().getTime(today.value) / 1000

const formattedDates = ref({
  today: dayjs().format('dddd, D MMM YYYY')
})

const setMoodStats = (date, timestamp, mood, memory) => {
  calendarStore.setTodayMood(date, timestamp, mood, memory)
}

const todayMood = computed(() => {
  const moodList = calendarStore.daysWithMoodColor.filter(
    (day) =>
      dayjs(day.date).format('dddd, D MMM YYYY') === formattedDates.value.today
  )
  return moodList.length ? moodList[moodList.length - 1] : {}
})

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
  <div class="page-wrapper home">
    <SidebarMenu />
    <div class="main-container">
      <h1>How do you feel today?</h1>
      <div class="mood-options">
        <BaseButton :text="'Excellent'" :view="'excellent'" @click="setMoodStats(today, timestamp, 'Excellent', '')" />
        <BaseButton :text="'Good'" :view="'good'" @click="setMoodStats(today, timestamp, 'Good', '')" />
        <BaseButton :text="'Awful'" :view="'awful'" @click="setMoodStats(today, timestamp, 'Awful', '')" />
      </div>
      <div class=" day-card today" :class="todayMood?.color">
        <div class="day-title">
          <h3>Today</h3>
          <p>{{ formattedDates.today }}</p>
        </div>
        <div class="card-content">
          <h2>{{ todayMood?.mood }}</h2>
          <button v-if="todayMood?.mood" title="Add a Note" class="note-button" @click="openModal()">
            <AddNoteIcon />
          </button>
        </div>
      </div>
      <AddNoteModal v-if="isModalOpen" :isModalOpen="isModalOpen" :todayRecord="todayMood"
        @hide-modal="closeModal" />
      <CalendarWeek />
    </div>
  </div>
</template>

<style scoped>
.mood-options {
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-around;
}

.day-card {
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
  background: #eb6862;
  border-color: #eb6862;
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

.note-button {
  background: transparent;
  padding: 0.4rem 0.6rem;
  position: absolute;
  right: 20px;
  bottom: 20px;
}

.note-button:hover,
.note-button:focus {
  color: #fbf7ff;
}

.view-stats {
  margin-top: 3rem;
}

.note-button:focus {
  outline-color: #fbf7ff;
}

@media (min-width: 768px) {
  .mood-options {
    justify-content: center;
  }

  .mood-options button {
    margin: 0 1rem;
  }

  .day-card {
    max-width: 20rem;
    margin: 0 auto;
  }
}
</style>
