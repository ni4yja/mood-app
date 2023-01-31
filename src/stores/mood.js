import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import dayjs from 'dayjs/esm/index.js'

export const useCalendarStore = defineStore({
  id: 'main',
  state: () => ({
    daysWithMood: [
      {
        date: dayjs().subtract(1, 'days'),
        timestamp: new Date().setDate(new Date().getDate() - 1) / 1000,
        mood: 'Excellent'
      },
      {
        date: dayjs().subtract(2, 'days'),
        timestamp: new Date().setDate(new Date().getDate() - 2) / 1000,
        mood: 'Good'
      }
    ],
    currentDay: {},
    totalRecords: useStorage('dayList', []),
  }),
  actions: {
    setTodayMood(date, timestamp, mood) {
      const dataSet = {
        date,
        timestamp,
        mood
      }
      let uniqueRecordsSet = new Set().add(dataSet)
      
      const record = [...uniqueRecordsSet.keys()]
      this.totalRecords = [...this.daysWithMood, record[0]]
    }
  },
  getters: {
    daysWithMoodColor(state) {
      const days = [...state.totalRecords]
      return days.map((day) => {
        if (day.mood === 'Excellent') {
          day = {
            ...day,
            color: 'purple'
          }
          return day
        }
        if (day.mood === 'Good') {
          day = {
            ...day,
            color: 'green'
          }
          return day
        }
        if (day.mood === 'Awful') {
          day = {
            ...day,
            color: 'red'
          }
          return day
        }
      })
    }
  }
})