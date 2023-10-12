<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs/esm/index.js'
import relativeTime from 'dayjs/esm/index.js'
import { useCalendarStore } from '../stores/mood'
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
        <BaseButton
          :text="'Excellent'"
          :view="'excellent'"
          @click="setMoodStats(today, timestamp, 'Excellent', '')"
        />
        <BaseButton
          :text="'Good'"
          :view="'good'"
          @click="setMoodStats(today, timestamp, 'Good', '')"
        />
        <BaseButton
          :text="'Awful'"
          :view="'awful'"
          @click="setMoodStats(today, timestamp, 'Awful', '')"
        />
      </div>
      <div class="day-card today" :class="todayMood?.color">
        <div class="day-title">
          <h3>Today</h3>
          <p>{{ formattedDates.today }}</p>
        </div>
        <div class="card-content">
          <h2>{{ todayMood?.mood }}</h2>
          <BaseButton
            v-if="todayMood?.mood"
            class="note-button"
            title="Add a Note"
            :icon="'AddNoteIcon'"
            :view="'secondary'"
            @click="openModal()"
          />
        </div>
      </div>
      <AddNoteModal
        v-if="isModalOpen"
        :isModalOpen="isModalOpen"
        :todayRecord="todayMood"
        @hide-modal="closeModal"
      />
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
  border-radius: 8px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.light .day-card {
  background: var(--light-card-bg-color);
  border: 2px solid var(--light-card-border-color);
}

.dark .day-card {
  background: var(--dark-card-bg-color);
  border: 2px solid var(--dark-card-border-color);
}

.day-card.purple {
  background: var(--mood-excellent-primary);
  border-color: var(--mood-excellent-primary);
}

.day-card.green {
  background: var(--mood-good-primary);
  border-color: var(--mood-good-primary);
}

.day-card.red {
  background: var(--mood-awful-primary);
  border-color: var(--mood-awful-primary);
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
  position: absolute;
  right: 0;
  bottom: 0;
}

.view-stats {
  margin-top: 3rem;
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
