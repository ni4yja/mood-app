import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import dayjs from 'dayjs/esm/index.js'

export const useCalendarStore = defineStore({
  id: 'main',
  state: () => ({
    totalRecords: useStorage('recordList', [
      {
        date: dayjs('2023-02-28 17:00').format('YYYY-MM-DD HH:mm'),
        memory: 'Who owns my heart',
        mood: 'Excellent',
        timestamp: 1677596401.045
      },
      {
        date: dayjs('2023-03-01 09:44').format('YYYY-MM-DD HH:mm'),
        memory: 'Check this',
        mood: 'Good',
        timestamp: 1677656669.045
      },
      {
        date: dayjs('2023-03-02 09:44').format('YYYY-MM-DD HH:mm'),
        memory: 'What should I do',
        mood: 'Awful',
        timestamp: 1677165970.045
      },
      {
        date: dayjs('2023-03-03 14:00').format('YYYY-MM-DD HH:mm'),
        memory: 'Friday I am in love',
        mood: 'Excellent',
        timestamp: 1677844800.045
      }
    ])
  }),
  actions: {
    setTodayMood(date, timestamp, mood, memory) {
      this.totalRecords = [
        {
          date: dayjs(date).format('YYYY-MM-DD HH:mm'),
          timestamp,
          mood,
          memory
        },
        ...this.totalRecords
      ]
    },
    setMemories(todayRecord, note) {
      this.totalRecords = this.totalRecords.map((day) => {
        if (day.timestamp === todayRecord.timestamp) {
          day = {
            ...day,
            memory: note
          }
        }
        return day
      })
    }
  },
  getters: {
    calendar(state) {
      const moodEventsMap = new Map()
      // iterate over each mood event in the state.moodEvents array
      state.totalRecords.forEach((record) => {
        const dateStr = dayjs(record.date).format('YYYY-MM-DD')
        const existingMoodEvent = moodEventsMap.get(dateStr)
        // if a mood event for the current date already exists and has a later timestamp, ignore the new mood event
        if (
          existingMoodEvent &&
          existingMoodEvent.timestamp >= record.timestamp
        ) {
          return
        }
        // otherwise, update the map with the new mood event for the current date
        moodEventsMap.set(dateStr, record)
      })
      // convert the map to an array and sort by date
      const moodEvents = [...moodEventsMap.values()].sort(
        (a, b) => dayjs(b.date) - dayjs(a.date)
      )
      return moodEvents
    },
    daysWithMoodColor(getters) {
      const colorMap = {
        Excellent: 'purple',
        Good: 'green',
        Awful: 'red'
      }
      return getters.calendar.map((day) => ({
        ...day,
        color: colorMap[day.mood] || null
      }))
    }
  }
})
